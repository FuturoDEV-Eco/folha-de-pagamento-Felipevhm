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
          rl.question(
            "Gostaria de gerar um PDF com estas informações? (true/false)",
            (respostaPdf) => {
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
          Salario Bruto: R$${salarioBase}\n
          INSS: R$${outINSS}\n 
          IR: R$${outIR}\n 
          temDescontos: ${temDescontos ?`Sim. R$${((temDescontos ? 0.01 : 0) * salarioBase).toFixed(2)}`
          : "R$0.00"}\n
          -------\n
          Salario Líquido : R$${calculaSalarioLiquido(
            salarioBase,
            outINSS,
            outIR,
            temDescontos
          ).toFixed(2)}
        `);
              if (querPdf) {
                fs.mkdirSync("./folhas_pagamento", { recursive: true });

                const doc = new PDFDocument();
                doc.pipe(
                  fs.createWriteStream(`./folhas_pagamento/${nome}.pdf`)
                );

                doc.text(`--- Folha de Pagamento ---`);
                doc.text(`Data de Geração: ${dataFormatada}`);
                doc.text(`Nome: ${nome}`);
                doc.text(`CPF: ${cpf}`);
                doc.text(`--- ---`);
                doc.text(`Salario Bruto: R$${salarioBase}`);

                doc.text(`--- ---`);
                //   doc.text(`Mês do Pagamento: ${dataAtual.getMonth() + 1}`);

                doc.text(`INSS: R$${outINSS}`);
                doc.text(`IR: R$${outIR}`);
                doc.text(
                  `Tem Descontos? ${
                    temDescontos
                      ? `Sim. R$${(
                          (temDescontos ? 0.01 : 0) * salarioBase
                        ).toFixed(2)}`
                      : "R$0.00"
                  }`
                );
                doc.text(`--- ---`);
                doc.text(
                  `Salario Líquido : R$${calculaSalarioLiquido(
                    salarioBase,
                    outINSS,
                    outIR,
                    temDescontos
                  ).toFixed(2)}`
                );
                console.log("--- PDF gerado com sucesso! ---");
                doc.end();
              } else {
                console.log("--- PDF não gerado ---");
              }

              rl.close();
            }
          );
        }
      );
    });
  });
});

//
