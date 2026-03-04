import { pgTable, serial, text, timestamp, index, unique } from 'drizzle-orm/pg-core';

export const shortenedLinks = pgTable(
  'shortened_links',
  {
    id: serial('id').primaryKey(),
    clerkUserId: text('clerk_user_id').notNull(),
    url: text('url').notNull(),
    shortCode: text('short_code').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index('idx_clerk_user_id').on(table.clerkUserId),
    index('idx_short_code').on(table.shortCode),
    unique('uq_short_code').on(table.shortCode),
  ]
);
