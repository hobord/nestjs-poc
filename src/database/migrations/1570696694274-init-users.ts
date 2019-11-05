import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableUnique, TableIndex } from 'typeorm';

export class InitUsers1570696694274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userTable = new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'char',
          length: '36',
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
          type: 'varchar',
        },
        {
          name: 'createAt',
          type: 'datetime',
        },
        {
          name: 'updateAt',
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
          type: 'char',
          length: '36',
          isPrimary: true,
        },
        {
          name: 'userID',
          type: 'char',
          length: '36',
          isNullable: false,
        },
        {
          name: 'roleName',
          type: 'varchar',
        },
        {
          name: 'createAt',
          type: 'datetime',
        },
      ],
    });
    await queryRunner.createTable(userRolesTable, true);

    await queryRunner.createForeignKey('user_roles', new TableForeignKey({
      columnNames: ['userID'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE',
    }));

    return null;
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable('user_roles', true, true, true);
    queryRunner.dropTable('user', true, true, true);
    return null;
  }
}
