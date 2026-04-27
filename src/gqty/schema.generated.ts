/**
 * GQty AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { type ScalarsEnumsHash } from "gqty";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
}

export const scalarsEnumsHash: ScalarsEnumsHash = {
  Boolean: true,
  ID: true,
  String: true,
};
export const generatedSchema = {
  Session: { __typename: { __type: "String!" }, user: { __type: "User" } },
  User: {
    __typename: { __type: "String!" },
    id: { __type: "ID!" },
    name: { __type: "String!" },
  },
  mutation: {},
  query: {
    __typename: { __type: "String!" },
    mirror: { __type: "String!", __args: { input: "String!" } },
    sessions: { __type: "[Session!]!" },
    throw: { __type: "String!" },
  },
  subscription: {},
} as const;

export interface Session {
  __typename?: "Session";
  user?: Maybe<User>;
}

export interface User {
  __typename?: "User";
  id?: Scalars["ID"]["output"];
  name?: Scalars["String"]["output"];
}

export interface Mutation {
  __typename?: "Mutation";
}

export interface Query {
  __typename?: "Query";
  mirror: (args: {
    input: Scalars["String"]["input"];
  }) => Scalars["String"]["output"];
  sessions: Array<Session>;
  throw?: Scalars["String"]["output"];
}

export interface Subscription {
  __typename?: "Subscription";
}

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}
