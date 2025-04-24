import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class AddIndexes1745452359486 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Notes
    await queryRunner.createIndex(
      'notes',
      new TableIndex({
        name: 'idx_notes_user_id',
        columnNames: ['user_id'],
      }),
    );
    await queryRunner.createIndex(
      'notes',
      new TableIndex({
        name: 'idx_notes_archived',
        columnNames: ['archived'],
      }),
    );
    await queryRunner.createIndex(
      'notes',
      new TableIndex({
        name: 'idx_notes_created_at',
        columnNames: ['created_at'],
      }),
    );

    // Sessions
    await queryRunner.createIndex(
      'sessions',
      new TableIndex({
        name: 'idx_sessions_user_id',
        columnNames: ['user_id'],
      }),
    );
    await queryRunner.createIndex(
      'sessions',
      new TableIndex({
        name: 'idx_sessions_refresh_token',
        columnNames: ['refresh_token'],
      }),
    );
    await queryRunner.createIndex(
      'sessions',
      new TableIndex({
        name: 'idx_sessions_one_time_token',
        columnNames: ['one_time_token'],
      }),
    );

    // Settings
    await queryRunner.createIndex(
      'settings',
      new TableIndex({
        name: 'idx_settings_user_id',
        columnNames: ['user_id'],
      }),
    );

    // Tags
    await queryRunner.createIndex(
      'tags',
      new TableIndex({
        name: 'idx_tags_note_id',
        columnNames: ['note_id'],
      }),
    );
    await queryRunner.createIndex(
      'tags',
      new TableIndex({
        name: 'idx_tags_name',
        columnNames: ['name'],
      }),
    );

    // Users
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'idx_users_email',
        columnNames: ['email'],
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
