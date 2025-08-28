interface StorageValues {
  accessToken: { name: string };
}

type StorageKeys = keyof StorageValues;

export type { StorageKeys, StorageValues };
