const parseType = (type) => {
  const isType = ['work', 'home', 'personal'].includes(type);
  if (isType) return type;
};

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  return { true: true, false: false }[value] ?? undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
