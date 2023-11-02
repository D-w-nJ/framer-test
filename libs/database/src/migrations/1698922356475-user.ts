import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1698922356475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'USER',
			columns: [
				{
					name: 'id',
					type: 'int',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'email',
					type: 'varchar',
					length: '30',
					isUnique: true
				},
				{
					name: 'password',
					type: 'varchar',
					length: '256'
				},
				{
					name: 'name',
					type: 'varchar',
					length: '10'
				},
				{
					name: 'nickname',
					type: 'varchar',
					length: '20',
					isNullable: true,
					default: null,
					isUnique: true
				},
				{
					name: 'smsReception',
					type: 'datetime',
					isNullable: true,
					default: null
				},
				{
					name: 'emailReception',
					type: 'datetime',
					isNullable: true,
					default: null
				},
        {
          name: 'level',
          type: 'enum',
          enum: ['ADMIN', 'MEMBER'],
          default: '"MEMBER"'
        },
				{
					name: 'createdAt',
					type: 'datetime',
					default: 'now()'
				},
				{
					name: 'updatedAt',
					type: 'datetime',
					default: 'now()',
					onUpdate: 'now()'
				},
				{
					name: 'deletedAt',
					type: 'datetime',
					isNullable: true,
					default: null
				}
			]
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('USER');
	}
}
