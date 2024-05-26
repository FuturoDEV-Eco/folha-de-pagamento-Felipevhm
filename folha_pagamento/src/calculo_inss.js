 function calcularINSS (salarioBruto) {
  const teto = 908.85;

  let valorpago = 0;
  let aliquota = 0;

  if (salarioBruto <= 1412) {
    aliquota = 0.075;
  } else if (salarioBruto >= 1412.01 && salarioBruto <= 2666.68) {
    aliquota = 0.09;
  } else if (salarioBruto >= 2666.69 && salarioBruto <= 4000.03) {
    aliquota = 0.12;
  } else {
    aliquota = 0.14;
  }

  if (salarioBruto * aliquota >= teto) {
    valorpago = teto;
  } else {
    valorpago = salarioBruto * aliquota;
  }

  return valorpago.toFixed(2);
};

module.exports = calcularINSS;