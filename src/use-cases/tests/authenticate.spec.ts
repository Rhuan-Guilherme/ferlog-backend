import { describe, expect, test, beforeEach } from 'vitest';
import { InMomoryUserRepository } from '@/repositories/im-memory/in-memory-user-repository';
import { AuthenticateUseCase } from '../authenticate';
import { InvalidCredentialsError } from '../errors/invalid-credentials-errors';
import { hash } from 'bcryptjs';

let userRepository: InMomoryUserRepository;
let sup: AuthenticateUseCase;

describe('Teste para obter daddos do usuário.', () => {
  beforeEach(() => {
    userRepository = new InMomoryUserRepository();
    sup = new AuthenticateUseCase(userRepository);
  });

  test('Deve ser possível autenticar um usuário.', async () => {
    const newUser = await userRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password_hash: await hash('teste123', 6),
    });

    const { user } = await sup.execute({
      email: 'teste@teste.com',
      password: 'teste123',
    });

    expect(user.id).to.equal(newUser.id);
    expect(user.name).to.equal('Teste');
    expect(user.email).to.equal('teste@teste.com');
  });

  test('Não deve ser possível autenticar um usuário com senha ou e-mail errados.', async () => {
    expect(() =>
      sup.execute({
        email: 'teste@teste.com',
        password: 'teste123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
