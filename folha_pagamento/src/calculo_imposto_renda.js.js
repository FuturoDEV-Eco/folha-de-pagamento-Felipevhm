 function calcularIR (salarioBruto) {
  let valorpago = 0;
  let aliquota = 0;

  if (salarioBruto <= 2112) {
    aliquota = 0;

  } else if (salarioBruto >= 2112.01 && salarioBruto <= 2826.65) {
    aliquota = 0.075;
  } else if (salarioBruto >= 2826.66 && salarioBruto <= 3751.05) {
    aliquota = 0.15;
  } else if (salarioBruto >= 3751.06 && salarioBruto <= 4664.68) {
    aliquota = 0.225;
  } else {
    aliquota = 0.275;
  }

valorpago = salarioBruto*aliquota

  return valorpago.toFixed(2);
};

module.exports = calcularIR;