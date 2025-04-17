import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateSignInMethod1744759049149 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      DO $$ BEGIN
        CREATE TYPE sign_in_method_enum AS ENUM('EMAIL_AND_PASSWORD', 'GOOGLE');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      `,
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'sign_in_method',
        type: 'sign_in_method_enum',
        isNullable: true,
      }),
    );
    await queryRunner.query(
      `UPDATE users SET sign_in_method = 'EMAIL_AND_PASSWORD' WHERE sign_in_method IS NULL`,
    );
    await queryRunner.query(`ALTER TABLE users ALTER COLUMN sign_in_method SET NOT NULL`);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
