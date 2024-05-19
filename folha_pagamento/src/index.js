// repository:
// https://github.com/FuturoDEV-Eco/folha-de-pagamento-Felipevhm
const calcularINSS = require('./calculo_inss.js')
const calcularIR = require('./calculo_imposto_renda.js')
const calculaSalarioLiquido = require('./calculo_salario_liquido.js')

const salarioBase = 2000

const outINSS = calcularINSS(salarioBase)
const outIR = calcularIR(salarioBase)
const temDescontos = true

console.log(`
   Salario: ${salarioBase}\n
   INSS: ${outINSS}\n 
   IR: ${outIR}\n 
   Tem Descontos? ${temDescontos? "Sim.":"Não."}\n
   -------\n
   Salario Líquido : ${calculaSalarioLiquido(salarioBase,outINSS,outIR,temDescontos)}
 `)
