const currencyFormatter = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

export default currencyFormatter