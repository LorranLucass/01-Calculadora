// index.js
const calc = require("./calculadora");

console.log("=== Calculadora ===");
console.log("Somar 10 + 5 =", calc.somar(10, 5));
console.log("Subtrair 10 - 5 =", calc.subtrair(10, 5));
console.log("Multiplicar 10 * 5 =", calc.multiplicar(10, 5));
console.log("Dividir 10 / 5 =", calc.dividir(10, 5));
console.log("Ao Quadrado de 7 =", calc.aoQuadrado(7));
console.log("Raiz Quadrada de 49 =", calc.raizQuadrada(49));
