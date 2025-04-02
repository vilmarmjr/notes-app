import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTags1743552101817 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tags',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'note_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'tags',
      new TableForeignKey({
        columnNames: ['note_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'notes',
        onDelete: 'CASCADE',
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
