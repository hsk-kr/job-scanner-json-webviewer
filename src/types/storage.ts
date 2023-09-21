import { IndeedJobInfo } from './indeed';

type IndeedJonInfoType = ['jobinfo', IndeedJobInfo[]];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StoreValueFunc<T> = T extends [string, any]
  ? (key: T[0], value: T[1]) => void
  : never;

export type StoreValue = StoreValueFunc<IndeedJonInfoType>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RetrieveValueFunc<T> = T extends [string, any]
  ? (key: T[0]) => T[1] | null
  : never;

export type RetrieveValue = RetrieveValueFunc<IndeedJonInfoType>;
