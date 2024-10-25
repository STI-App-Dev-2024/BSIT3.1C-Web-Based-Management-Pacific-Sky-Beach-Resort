const undefinedValidator = (oldData, newData) => {
  if (newData === undefined || newData === oldData) {
    return oldData;
  }
  return newData;
};

export default undefinedValidator;
