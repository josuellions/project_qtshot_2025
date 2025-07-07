/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.sql(`
    CREATE EXTENSION IF NOT EXISTS "pgcrypto";

    CREATE TABLE IF NOT EXISTS participants (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      dateAt TIMESTAMPTZ NOT NULL,
      dateUp TIMESTAMPTZ NOT NULL,
      fileName TEXT NOT NULL,
      imageBase64 TEXT NOT NULL,
      qrcodeBase64 TEXT NOT NULL
    )
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = () => {};
