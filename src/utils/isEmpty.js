export const isEmpty = (value) => {
  if ((value && value.length == 0) || value == '' || value == null) return true;
  else return false;
};

