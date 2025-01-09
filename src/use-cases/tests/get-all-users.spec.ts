import { describe, expect, test, beforeEach } from 'vitest';
import { InMomoryUserRepository } from '@/repositories/im-memory/in-memory-user-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-errors';
import { hash } from 'bcryptjs';
import { GetAllUserUseCase } from '../get-all-users';

let userRepository: InMomoryUserRepository;
let sup: GetAllUserUseCase;

describe('Teste para obter daddos do usuário.', () => {
  beforeEach(() => {
    userRepository = new InMomoryUserRepository();
    sup = new GetAllUserUseCase(userRepository);
  });

  test('Deve ser possível obter os dados de um usuário.', async () => {
    await userRepository.create({
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

    const users = await sup.execute();
    console.log(users)

    expect(users.user).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String), // ID deve ser uma string
          name: 'Teste',
          email: 'teste@teste.com',
          cargo: 'Tech',
          role: 'MEMBER',
          password_hash: expect.any(String), // Hash deve ser uma string
        }),
        expect.objectContaining({
          id: expect.any(String), // ID deve ser uma string
          name: 'Teste2',
          email: 'teste2@teste.com',
          cargo: 'Tech',
          role: 'MEMBER',
          password_hash: expect.any(String), // Hash deve ser uma string
        }),
    ]))
  });
});
