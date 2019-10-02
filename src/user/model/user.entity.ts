import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { UserService } from '../user.service';

@Entity({name: 'user'})
export class UserModel implements IUser {
  @ObjectIdColumn()
  id?: string;

  @Column({ unique: true })
  readonly email: string;

  @Column()
  passwordHash: string;

  @Column()
  readonly creationDate: Date;

  @Column()
  readonly updateDate: Date;
}
