import { type CreateUserInputData } from 'entities/authentication/CreateUserInputData';
import { type SingInInputData } from 'entities/authentication/SignInInputData';

export interface AuthenticationRepository {
  createUser: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export class AuthenticationUseCase {
  private readonly authRepository: AuthenticationRepository;
  constructor(authRepository: AuthenticationRepository) {
    this.authRepository = authRepository;
  }

  signIn = async (data: SingInInputData) => {
    await this.authRepository.signIn(data.email, data.password);
  };

  signOut = async () => {
    await this.authRepository.signOut();
  };

  createUserWithEmailAndPassword = async (data: CreateUserInputData) => {
    await this.authRepository.createUser(data.email, data.password);
  };

  resetPassword = async (email: string) => {
    await this.authRepository.resetPassword(email);
  };
}
