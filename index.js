const readFileSync = require("fs").readFileSync;
const {
  combineProducts,
  filterByPrice,
  filterProducts,
  getMinMaxPrice,
  weirdArrayTransform,
} = require("./functions");

const file = JSON.parse(readFileSync("input.txt", "utf8"));

const { selectedFilters, products, colors, sizes } = file;
// products: { id: Number, price: Number}
// colors: { id: Number, value: String }
// sizes: { id: String, value: Number }
// combinedProducts: { id: String, price: Number, color: String, size: Number }
const buildingNumber = 14;
const name = "Monogo";

const combinedProducts = combineProducts(products, colors, sizes);
const filteredProducts = filterByPrice(
  filterProducts(
    filterProducts(combinedProducts, "color", selectedFilters.colors),
    "size",
    selectedFilters.sizes
  ),
  200
);
const { min, max } = getMinMaxPrice(filteredProducts);
const value = Math.round(min * max);
const array = weirdArrayTransform(value);
const result =
  array.findIndex((number) => number === buildingNumber) * name.length;

console.log(result);
