// repository:
// https://github.com/FuturoDEV-Eco/folha-de-pagamento-Felipevhm
const readline = require('readline');
const calcularINSS = require('./calculo_inss.js');
const calcularIR = require('./calculo_imposto_renda.js');
const calculaSalarioLiquido = require('./calculo_salario_liquido.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Qual é o nome do funcionário? ', (nome) => {
  rl.question('Qual é o CPF do funcionário? ', (cpf) => {
    rl.question('Qual é o mês do pagamento? ', (mes) => {
      rl.question('Qual é o salário bruto? ', (salarioBase) => {
        rl.question('O funcionário tem descontos? (true/false) ', (respostaDescontos) => {
          const temDescontos = respostaDescontos.toLowerCase() === 'true';
          const outINSS = calcularINSS(salarioBase);
          const outIR = calcularIR(salarioBase);

          console.log(`
            Nome: ${nome}\n
            CPF: ${cpf}\n
            Mês do Pagamento: ${mes}\n
            Salario Bruto: ${salarioBase}\n
            INSS: ${outINSS}\n 
            IR: ${outIR}\n 
            Tem Descontos? ${temDescontos? "Sim.":"Não."}\n
            -------\n
            Salario Líquido : ${calculaSalarioLiquido(salarioBase,outINSS,outIR,temDescontos)}
          `);

          rl.close();
        });
      });
    });
  });
});
