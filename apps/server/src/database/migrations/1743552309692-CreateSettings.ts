import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateSettings1743552309692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"settings_font_theme_enum\" AS ENUM('SANS_SERIF', 'SERIF', 'MONOSPACE')",
    );
    await queryRunner.query(
      "CREATE TYPE \"settings_color_theme_enum\" AS ENUM('LIGHT', 'DARK', 'SYSTEM')",
    );

    await queryRunner.createTable(
      new Table({
        name: 'settings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'font_theme',
            type: 'settings_font_theme_enum',
            isNullable: true,
          },
          {
            name: 'color_theme',
            type: 'settings_color_theme_enum',
            isNullable: true,
          },
          {
            name: 'user_id',
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
      'settings',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
