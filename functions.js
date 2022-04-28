const mapTwoArrays = (array1, array2) =>
  array1.map((el1) => ({
    ...el1,
    ...array2.find((el2) => el2.id === el1.id),
  }));

/**
 * @param {Object[]} products
 * @param {number} products[].id
 * @param {number} products[].price
 * @param {Object[]} colors
 * @param {number} colors[].id
 * @param {string} colors[].value
 * @param {Object[]} sizes
 * @param {string} sizes[].id
 * @param {number} sizes[].value
 * @returns {Object[]} combinedProducts
 */
const combineProducts = (products, colors, sizes) => {
  const transformedProducts = products.map(({ id, price }) => ({
    id: String(id),
    price,
  }));
  const transformedColors = colors.map(({ id, value }) => ({
    id: String(id),
    color: value,
  }));
  const transformedSizes = sizes.map(({ id, value }) => ({
    id,
    size: value,
  }));

  return mapTwoArrays(
    mapTwoArrays(transformedProducts, transformedColors),
    transformedSizes
  );
};

/**
 * @param {Object[]} products
 * @param {string} products[].id
 * @param {number} products[].price
 * @param {string} products[].color
 * @param {number} products[].size
 * @param { "color" | "size" } filterType
 * @param { string[] | number[] } filterValues
 * @returns {Object[]} filteredProducts
 */
const filterProducts = (products, filterType, filterValues) => {
  return filterValues.flatMap((filterValue) =>
    products.filter((product) => product[filterType] === filterValue)
  );
};

const filterByPrice = (products, price) => {
  return products.filter((product) => product.price > price);
};

const getMinMaxPrice = (products) => {
  return {
    max: Math.max.apply(
      Math,
      products.map((product) => product.price)
    ),
    min: Math.min.apply(
      Math,
      products.map((product) => product.price)
    ),
  };
};

const weirdArrayTransform = (value) => {
  const splitValue = String(value)
    .split("")
    .map((el) => Number(el));

  return Array.from(
    splitValue,
    (el, index) => el + splitValue[index + 1]
  ).filter((_, index) => (index + 1) % 2 !== 0);
};

exports.mapTwoArrays = mapTwoArrays;
exports.combineProducts = combineProducts;
exports.filterProducts = filterProducts;
exports.filterByPrice = filterByPrice;
exports.getMinMaxPrice = getMinMaxPrice;
exports.weirdArrayTransform = weirdArrayTransform;
