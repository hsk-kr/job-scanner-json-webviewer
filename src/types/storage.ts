import { JobInfo } from './job';

type JonInfoType = ['jobinfo', JobInfo[]];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StoreValueFunc<T> = T extends [string, any]
  ? (key: T[0], value: T[1]) => void
  : never;

export type StoreValue = StoreValueFunc<JonInfoType>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RetrieveValueFunc<T> = T extends [string, any]
  ? (key: T[0]) => T[1] | null //! null is ignorated from the type.
  : never;

export type RetrieveValue = RetrieveValueFunc<JonInfoType>;
