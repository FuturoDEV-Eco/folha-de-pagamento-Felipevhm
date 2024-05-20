// repository:
// https://github.com/FuturoDEV-Eco/folha-de-pagamento-Felipevhm
const fs = require('fs');
const PDFDocument = require('pdfkit');
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

          const dataAtual = new Date();
          const dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth()+1}/${dataAtual.getFullYear()}`;

          fs.mkdirSync('./folhas_pagamento', { recursive: true });
          const doc = new PDFDocument;
          doc.pipe(fs.createWriteStream(`./folhas_pagamento/${nome}.pdf`));

          doc.text(`Nome: ${nome}`);
          doc.text(`CPF: ${cpf}`);
          doc.text(`Mês do Pagamento: ${mes}`);
          doc.text(`Salario Bruto: ${salarioBase}`);
          doc.text(`INSS: ${outINSS}`);
          doc.text(`IR: ${outIR}`);
          doc.text(`Tem Descontos? ${temDescontos? "Sim.":"Não."}`);
          doc.text(`-------`);
          doc.text(`Salario Líquido : ${calculaSalarioLiquido(salarioBase,outINSS,outIR,temDescontos)}`);
          doc.text(`Data: ${dataFormatada}`);

          doc.end();

          rl.close();
        });
      });
    });
  });
});
