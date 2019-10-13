import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitUsers1570696694274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userTable = new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'passwordHash',
          type: 'datetime',
        },
        {
          name: 'creationDate',
          type: 'varchar',
        },
        {
          name: 'updateDate',
          type: 'datetime',
        },
      ],
    });
    await queryRunner.createTable(userTable, true);

    const userRolesTable = new Table({
      name: 'user_roles',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
        },
        {
          name: 'userId',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'roleName',
          type: 'varchar',
        },
        {
          name: 'creationDate',
          type: 'varchar',
        },
      ],
    });
    await queryRunner.createTable(userRolesTable, true);

    return null;
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable('user', true, true, true);
    return null;
  }
}
