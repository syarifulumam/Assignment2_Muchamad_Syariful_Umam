export const getCurrency = (ObjKey) => {
  return Object.keys(ObjKey).map((item) => {
    return ObjKey[item].name;
  });
};

export const getLanguage = (ObjKey) => {
  return Object.keys(ObjKey).map((item) => {
    return ObjKey[item];
  });
};
