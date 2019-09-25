import { Injectable, Inject, Logger } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserInput } from './dto/input-user.input';
import { UserRepository } from './model/user.repository';
import { IUserRepository } from './interfaces/user-repository.interface';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
    private logger = new Logger(UserService.name);

    constructor(
        @Inject(UserRepository) private readonly repository: IUserRepository,
    ) {}

    async create(createUserDto: UserInput): Promise<IUser> {
        createUserDto.passwordHash = await this.getHash(createUserDto.password);

        // clear  password as we don't persist passwords
        createUserDto.password = undefined;
        return await this.repository.create(createUserDto);
    }

    async findAll(): Promise<IUser[]> {
        return await this.repository.findAll();
    }

    async findOne(id: string): Promise<IUser> {
        return await this.repository.findOne(id);
    }

    async getByEmail(email: string): Promise<IUser> {
        return  await this.repository.getByEmail(email);
    }

    async delete(id: string) {
        return await this.repository.delete(id);
    }

    async update(id: string, userInput: UserInput): Promise<IUser> {
        return await this.repository.update(id, userInput);
    }

    private async getHash(password: string | undefined): Promise<string> {
        return argon2.hash(password);
    }

    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        try {
            if (await argon2.verify(hash, password)) {
                this.logger.log('verification of user sucessful');
                return true;
            } else {
                this.logger.log('verification failed');
                return false;
            }
        } catch (err) {
            this.logger.log('argon2 error');
            return false;
        }
    }

}
