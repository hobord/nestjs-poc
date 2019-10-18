export interface IUser {
  readonly id?: string;
  email?: string;
  name?: string;
  roles?: string[];
  passwordHash?: string;
  readonly createAt?: Date;
  updateAt?: Date;
}
