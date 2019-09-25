export interface IUser {
    readonly id?: string;
    readonly email?: string;
    readonly passwordHash?: string;
    readonly creationDate?: Date;
    readonly updateDate?: Date;
}
