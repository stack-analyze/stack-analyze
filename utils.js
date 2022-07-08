const listFormat = new Intl.ListFormat("en", {
  style: "short",
  type: "conjunction"
});

const currency = Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD"
});

export {
  listFormat,
  currency
};

