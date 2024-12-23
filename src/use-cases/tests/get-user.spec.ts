import { describe, expect, test, beforeEach } from 'vitest';
import { InMomoryUserRepository } from '@/repositories/im-memory/in-memory-user-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-errors';
import { hash } from 'bcryptjs';
import { GetUseerUseCase } from '../get-user';

let userRepository: InMomoryUserRepository;
let sup: GetUseerUseCase;

describe('Teste para obter daddos do usuário.', () => {
  beforeEach(() => {
    userRepository = new InMomoryUserRepository();
    sup = new GetUseerUseCase(userRepository);
  });

  test('Deve ser possível obter os dados de um usuário.', async () => {
    const newUser = await userRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password_hash: await hash('teste123', 6),
    });

    const { user } = await sup.execute({
      id: newUser.id,
    });

    expect(user.id).to.equal(newUser.id);
    expect(user.name).to.equal('Teste');
    expect(user.email).to.equal('teste@teste.com');
  });

  test('Não deve ser possível resgatar dados de um usuário com senha ou e-mail errados.', async () => {
    expect(() =>
      sup.execute({
        id: 'not-id',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
