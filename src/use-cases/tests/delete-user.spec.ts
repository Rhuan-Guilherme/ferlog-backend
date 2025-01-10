import { describe, expect, test, beforeEach } from 'vitest';
import { InMomoryUserRepository } from '@/repositories/im-memory/in-memory-user-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-errors';
import { hash } from 'bcryptjs';
import { DeleteUserUseCase } from '../delete-user';

let userRepository: InMomoryUserRepository;
let sup: DeleteUserUseCase;

describe('Teste para deletar usuário.', () => {
  beforeEach(() => {
    userRepository = new InMomoryUserRepository();
    sup = new DeleteUserUseCase(userRepository);
  });

  test('Deve ser possível deletar um usuário.', async () => {
    const user = await userRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password_hash: await hash('teste123', 6),
      cargo: 'Tech',
    });

    await userRepository.create({
      name: 'Teste2',
      email: 'teste2@teste.com',
      password_hash: await hash('teste123', 6),
      cargo: 'Tech',
    });

    const users = await sup.execute({ id: user.id });

    expect(users.user.email).to.equal('teste@teste.com')
    expect(userRepository.user).toHaveLength(1)
  });
});
