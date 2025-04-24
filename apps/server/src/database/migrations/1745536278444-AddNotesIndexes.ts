import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotesIndexes1745536278444 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS pg_trgm');
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS idx_notes_title ON notes USING gin (title gin_trgm_ops)',
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS idx_notes_content ON notes USING gin (content gin_trgm_ops)',
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
