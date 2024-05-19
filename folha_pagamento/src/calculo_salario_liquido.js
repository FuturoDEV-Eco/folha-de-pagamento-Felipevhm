function calculaSalarioLiquido(salarioBruto, INSS, IR, temDescontos) {
  return salarioBruto - INSS - IR - (temDescontos ? 0.01 : 0) * salarioBruto;
}

module.exports = calculaSalarioLiquido;
