// ON PEUT SOIT :
// exports.add = ...
// OU
// const add = ...

exports.add = (a, b) => {
   return a + b;
};
exports.substract = (a, b) => {
   return a - b;
};
exports.multiply = (a, b) => {
   return a * b;
};
exports.divide = (a, b) => {
   return a / b;
};

// module.exports = { add, substract, multiply, divide };
