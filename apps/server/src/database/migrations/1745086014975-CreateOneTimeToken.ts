import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateOneTimeToken1745086014975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'refresh_tokens',
      new TableColumn({
        name: 'one_time_token',
        type: 'varchar',
        length: '512',
        isNullable: true,
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
