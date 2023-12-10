// Importação da biblioteca readline para interação com o console
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Criando um objeto vazio para armazenar os dados do aluno
const alunos = {};

function coletarDadosDoAluno(indice, retornoDeChamada){
    // Pergunta ao usuário o nome do aluno
    rl.question(`Digite o nome do aluno ${indice + 1}:`, (nome) =>{
        const notas = [];

        //Função interna para coletar notas
        function coletarNotas(indiceNotas){

            if(indiceNotas < 3){
                // Perguntar ao usuário as notas
                rl.question(`Digite a nota ${indiceNotas + 1} para ${nome}: `, (nota) => {
                    // Verificando se a entrada é um número válido
                    if(!isNaN (nota)){
                        notas.push(nota)
                        coletarNotas(indiceNotas + 1)

                    } else {
                        console.log('Por favor digite um número válido!')
                        coletarNotas(indiceNotas)
                    }
                });
            } else {
                // Quando todas as notas são coletadas armazenamos no aluno
                alunos[nome] = notas;
                // Chamamos a função retorno de chamada para continuar o fluxo
                retornoDeChamada();
            }
        }

        // Iniciamos o processo de coletar notas
        coletarNotas(0);
    });
}

// Função para calcular exibir a média do aluno
function calcularEExibirMedia(nome) {
    const notas = alunos[nome];

    if (notas){
        // Calculando a média do aluno
        const media = notas.reduce((soma,nota) => soma + nota, 0) / notas.length;
        // Exibindo a média no console
        console.log(`A média do aluno ${nome} é: ${media.toFixed(2)}`);
    } else {
        console.log(`Não foram encontrados notas para ${nome}`)
    }

    rl.close()
}

// Função principal que inicia o processo de coleta de nomes e notas
function iniciarColetaDeDadosDoAluno() {
    let contador = 0;

    // Função interna para coleta nomes e notas para três alunos
    function coletarDadosParaMultiplosAlunos() {
        if (contador < 3) {
            // Chamando a função para coletar dados do aluno
            coletarDadosDoAluno(contador, () => {
                contador++;

                coletarDadosParaMultiplosAlunos()
            });
        } else {
            rl.question('Digite o nome para calcular a média:', (nomePesquisado) => {
                // Chamando a função para exibir a calcular a média do aluno pesquisado
                calcularEExibirMedia(nomePesquisado);
            });
        }
    }

    coletarDadosParaMultiplosAlunos();  
}

iniciarColetaDeDadosDoAluno();