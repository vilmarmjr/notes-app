import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameRefreshTokensToSessions1745086014976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('refresh_tokens', 'sessions');
    await queryRunner.renameColumn('sessions', 'token', 'refresh_token');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
