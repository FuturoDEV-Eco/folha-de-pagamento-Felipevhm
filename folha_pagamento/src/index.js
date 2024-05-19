// repository:
// https://github.com/FuturoDEV-Eco/folha-de-pagamento-Felipevhm
const calcularINSS = require('./calculo_inss.js')
const calcularIR = require('./calculo_imposto_renda.js')


console.log('INSS é: ' + calcularINSS(20000))
console.log('IR é: ' + calcularIR(4000))
