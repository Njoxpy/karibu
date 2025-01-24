// urls.js

export const BASE_URL = "http://localhost:5000/";

export const PAGE_CATEGORIES = [
  "printing",
  "fresh-oil",
  "hardware",
  "animal-feeding",
  "godown",
  "stationery",
];

export const getContext = (category) => {
  if (!PAGE_CATEGORIES.includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  return {
    products: `${BASE_URL}${category}/products`,
    orders: `${BASE_URL}${category}/orders`,
  };
};
