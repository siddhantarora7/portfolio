// Anything not yet confirmed is written as TODO("what's missing").
// TODOs render as a visible note in dev and preview deploys, and are
// hidden on the production deploy so the live site never shows them.
export const TODO_PREFIX = "TODO:";

export const TODO = (note: string): string => `${TODO_PREFIX} ${note}`;

export const isTodo = (value: unknown): value is string =>
  typeof value === "string" && value.trimStart().startsWith(TODO_PREFIX);

export const todoText = (value: string): string =>
  value.trimStart().slice(TODO_PREFIX.length).trim();

export const showTodos = process.env.VERCEL_ENV !== "production";
