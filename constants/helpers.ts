export const createObjectFromArray = <T extends readonly string[]>(
  keys: T
): { [K in T[number]]: K } => {
  return keys.reduce(
    (acc, key) => {
      acc[key as T[number]] = key;
      return acc;
    },
    {} as { [K in T[number]]: K }
  );
};
