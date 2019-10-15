import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../user.service';

@Entity({ name: 'user' })
export class UserModel implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  readonly email: string;

  @Column()
  name: string;

  @Column()
  passwordHash: string;

  @Column()
  readonly createAt: Date;

  @Column()
  updateAt: Date;
}
