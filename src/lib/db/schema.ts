import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 255 }),
  proficiency: integer("proficiency").notNull().default(0),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  techStack: jsonb("tech_stack").$type<string[]>().notNull().default([]),
  liveUrl: varchar("live_url", { length: 500 }),
  githubUrl: varchar("github_url", { length: 500 }),
  image: varchar("image", { length: 500 }),
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  company: varchar("company", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  startDate: varchar("start_date", { length: 50 }).notNull(),
  endDate: varchar("end_date", { length: 50 }),
  description: text("description").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pushSubscriptions = pgTable("push_subscriptions", {
  id: serial("id").primaryKey(),
  endpoint: varchar("endpoint", { length: 500 }).notNull(),
  p256dh: varchar("p256dh", { length: 500 }).notNull(),
  auth: varchar("auth", { length: 500 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 255 }).primaryKey(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
