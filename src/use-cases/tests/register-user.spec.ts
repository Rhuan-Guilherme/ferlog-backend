import { describe, expect, test, beforeEach } from 'vitest';
import { RegisterUserUseCase } from '../register-user';
import { InMomoryUserRepository } from '@/repositories/im-memory/in-memory-user-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { compare } from 'bcryptjs';

let userRepository: InMomoryUserRepository;
let sup: RegisterUserUseCase;

describe('Teste para a criação de novos usuários.', () => {
  beforeEach(() => {
    userRepository = new InMomoryUserRepository();
    sup = new RegisterUserUseCase(userRepository);
  });

  test('Deve ser possível criar um novo usuário.', async () => {
    const { user } = await sup.execute({
      name: 'Teste',
      email: 'teste@teste.com',
      password: 'teste123',
      cargo: 'Desenvolvedor',
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.email).toEqual('teste@teste.com');
  });

  test('Não deve ser possível criar um novo usário com um email duplicado.', async () => {
    await sup.execute({
      name: 'Teste',
      email: 'teste@teste.com',
      password: 'teste123',
      cargo: 'Desenvolvedor',

    });

    expect(() =>
      sup.execute({
        name: 'Teste',
        email: 'teste@teste.com',
        password: 'teste123',
        cargo: 'Desenvolvedor',

      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
  test('Deve ser possível que a senha do usuário seja criptografada.', async () => {
    const { user } = await sup.execute({
      name: 'Teste',
      email: 'teste@teste.com',
      password: 'teste123',
      cargo: 'Desenvolvedor',
    });

    const passwordIsHashed = await compare('teste123', user.password_hash);

    expect(passwordIsHashed).toEqual(true);
  });
});
