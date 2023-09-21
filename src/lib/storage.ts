import { RetrieveValue, StoreValue } from '../types/storage';

const storeValue: StoreValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const retrieveValue: RetrieveValue = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null');
  } catch {
    return null;
  }
};

export { storeValue, retrieveValue };
