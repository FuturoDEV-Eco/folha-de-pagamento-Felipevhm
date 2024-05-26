// repository:
// https://github.com/FuturoDEV-Eco/folha-de-pagamento-Felipevhm
const fs = require("fs");
const PDFDocument = require("pdfkit");
const readline = require("readline");
const calcularINSS = require("./calculo_inss.js");
const calcularIR = require("./calculo_imposto_renda.js");
const calculaSalarioLiquido = require("./calculo_salario_liquido.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Qual é o nome do funcionário? ", (nome) => {
  rl.question("Qual é o CPF do funcionário? ", (cpf) => {
      rl.question("Qual é o salário bruto? ", (salarioBase) => {
        rl.question(
          "O funcionário tem descontos? (true/false) ",
          (respostaDescontos) => {
            rl.question("Gostaria de gerar um PDF com estas informações? (true/false)",(respostaPdf)=>{
            const temDescontos = respostaDescontos.toLowerCase() === "true";
            const querPdf = respostaPdf.toLowerCase() === "true";
            const outINSS = calcularINSS(salarioBase);
            const outIR = calcularIR(salarioBase);

            const dataAtual = new Date();
            const dataFormatada = `${dataAtual.getDate()}/${
              dataAtual.getMonth() + 1
            }/${dataAtual.getFullYear()}`;

            console.log(`
          Nome: ${nome}\n
          CPF: ${cpf}\n
          Mês do Pagamento: ${dataAtual.getMonth() + 1}\n
          Salario Bruto: ${salarioBase}\n
          INSS: ${outINSS}\n 
          IR: ${outIR}\n 
          Tem Descontos? ${temDescontos ? "Sim." : "Não."}\n
          -------\n
          Salario Líquido : ${calculaSalarioLiquido(
            salarioBase,
            outINSS,
            outIR,
            temDescontos
          )}
        `);
            if(querPdf){
              fs.mkdirSync("./folhas_pagamento", { recursive: true });

              const doc = new PDFDocument();
              doc.pipe(fs.createWriteStream(`./folhas_pagamento/${nome}.pdf`));
  
              doc.text(`Nome: ${nome}`);
              doc.text(`Data: ${dataFormatada}`);
              doc.text(`CPF: ${cpf}`);
              doc.text(`Mês do Pagamento: ${dataAtual.getMonth() + 1}`);
              doc.text(`Salario Bruto: ${salarioBase}`);
              doc.text(`INSS: ${outINSS}`);
              doc.text(`IR: ${outIR}`);
              doc.text(`Tem Descontos? ${temDescontos ? "Sim." : "Não."}`);
              doc.text(`-------`);
              doc.text(
                `Salario Líquido : ${calculaSalarioLiquido(
                  salarioBase,
                  outINSS,
                  outIR,
                  temDescontos
                )}`
              );
              console.log("--- PDF gerado com sucesso! ---")
              doc.end();
            }
            else{
              console.log("--- PDF não gerado ---")
            }
         
            rl.close();
          }
        );
      })
      });
  });
});

//
