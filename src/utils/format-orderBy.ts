export const formatOrderBy = (field: string, direction: string): any => {
  const properties = field.split('.');
  let jsonObject = {};

  properties.reduceRight((nestedObject, property) => {
    jsonObject = { [property]: nestedObject };
    return jsonObject;
  }, direction);

  return jsonObject;
};
