import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1673577291247 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'USER',
			columns: [
				{
					name: 'id',
					type: 'integer', /* int in MySQL */
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
				/* {
					name: 'loginType',
					type: 'enum',
					enum: ['CHAEDITOR', 'GOOGLE', 'NAVER', 'KAKAO'],
					default: '"CHAEDITOR"'
				}, */
				{
					name: 'snsId',
					type: 'varchar',
					length: '256',
					isNullable: true,
					default: null,
					isUnique: true
				},
				{
					name: 'password',
					type: 'varchar',
					length: '256',
					isNullable: true,
					default: null
				},
				{
					name: 'phone',
					type: 'varchar',
					length: '11',
					isUnique: true
				},
				{
					name: 'thumbnail',
					type: 'varchar',
					isNullable: true,
					default: null
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
					name: 'birthDate',
					type: 'date',
					isNullable: true
				},
				/* {
					name: 'gender',
					type: 'enum',
					enum: ['NONE', 'MALE', 'FEMALE'],
					default: '"NONE"'
				}, */
				/* {
					name: 'level',
					type: 'enum',
					enum: ['ADMIN', 'MEMBER'],
					default: '"MEMBER"'
				}, */
				/* {
					name: 'onboarding',
					type: 'json',
					isNullable: true,
					default: null
				}, */
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
