import * as readlineSync from 'readline-sync';
import { Conta } from "./src/model/Conta";
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { ContaController } from './src/controller/ContaController';

export function main() {

    let opcao: number, numero: number, agencia: number, tipo: number, saldo: number, limite: number, aniversario: number, valor: number, numeroDestino: number;
    let titular: string;
    aniversario = 0
    const tipoContas = ['Conta Corrente', 'Conta pupanca'];
    
    // Instância da Classe ContaController
    const contas: ContaController = new ContaController();

    // Instância da Classe Conta Corrente 
    // Adicionada na Collection listaContas
    const contaCorrente: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 561, 2, 'chri', 999999, 98);

    // Instância da da Classe ContaPoupanca
    // Adicionada na Collection listaContas
    const contaPoupanca: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 234, 1, "felp", 1000, 10);
    contas.cadastrar(contaPoupanca);

    let cc2: ContaCorrente = new ContaCorrente(2, 456, 1, 'CHRISTIAN', 10000, 1222);
    contas.cadastrar(cc2)
    // let c1: Conta = new Conta(1, 123, 1, 'Christian Alvim', 1000000);
    // c1.depositar(1000)
    // c1.sacar(40000)
    let cc1 : ContaCorrente = new ContaCorrente(2, 345, 9,"Christian salgado", 8000, 2000);
    cc1.sacar(2200)
    cc1.visualizar()
    cc1.depositar(4000)
    cc1.visualizar()
    const cp1: ContaPoupanca = new ContaPoupanca(1, 34,2,"tite", 4321, 19)
    cp1.visualizar();
    cp1.sacar(200);
    cp1.visualizar();
    cp1.depositar(1000);
    cp1.visualizar()

while(true){
   

        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Procurar conta por titular                               ");
        console.log("            0 - Sair                                 ");
    
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");

        console.log("Entre com a opção desejada: ");
        opcao = readlineSync.questionInt("");

        if (opcao == 0) {
            console.log("\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log("\n digite o numero da agencia\n\n");
                agencia = readlineSync.questionInt("");

                console.log("\n\nDigite o nome do titular\n\n");
                titular = readlineSync.question("");

                console.log("\n\nInforme o tipo da conta\n\n");
                tipo = readlineSync.keyInSelect(tipoContas,"",{cancel: false} )+1;

                console.log("\n\nDigite o saldo da conta\n\n");
                saldo = readlineSync.questionFloat('');

                switch(tipo){
                    case 1: 
                        console.log("\n\nDigite o limite da conta\n\n");
                        limite = readlineSync.questionFloat('');
                        contas.cadastrar( new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular,saldo, limite))
                    break;

                     case 2:
                        console.log("\n\nDigite o dia do aniversario da conta\n\n");
                        aniversario = readlineSync.questionInt('');
                        contas.cadastrar( new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular,saldo, aniversario))

                     break;
                }

                keyPress()
                break;

            case 2:
                console.log("\n\nListar Todas as contas\n\n");
                contas.listarTodas();
                
                keyPress()
                break;
            case 3:
                console.log("\n\nConsultar dados da Conta - por número\n\n");
               
                
                console.log("\n digite o numero da Conta\n\n");
                numero = readlineSync.questionInt("");

                contas.procurarPorNumero(numero);
                
                keyPress()
                break;
            case 4:
                console.log("\n\nAtualizar dados da Conta\n\n");

                console.log("\n digite o numero da Conta\n\n");
                numero = readlineSync.questionInt("");

                let conta = contas.buscarNoArray(numero)

                if(conta !== null){
                    console.log("\n digite o numero da agencia: ");
                    agencia = readlineSync.questionInt("");
    
                    console.log("\n\nDigite o nome do titular\n\n");
                    titular = readlineSync.question("");
    
                    tipo = conta.tipo;
    
                    console.log("\n\nDigite o saldo da conta\n\n");
                    saldo = readlineSync.questionFloat('');
    
                    switch(tipo){
                    case 1: 
                        console.log("\n\nDigite o limite da conta\n\n");
                        limite = readlineSync.questionFloat('');
                       contas.atualizar( new ContaCorrente(numero, agencia, tipo, titular,saldo, limite))
                    break;

                    case 2:
                    console.log("\n\nDigite o dia do aniversario da conta\n\n");
                    aniversario = readlineSync.questionInt('');
                    contas.atualizar( new ContaPoupanca(numero, agencia, tipo, titular,saldo, aniversario))
    
                    break;
                    }    


                }else{
                    console.log('A conta nao foi Encontrada')
                }


                keyPress()
                break;
            case 5:
                console.log("\n\nApagar uma Conta\n\n");
               
                
                console.log("\n digite o numero da Conta\n\n");
                numero = readlineSync.questionInt("");
                contas.deletar(numero);

                keyPress()
                break;
            case 6:
                console.log("\n\nSaque\n\n");

                console.log("digite o numero da conta")
                numero = readlineSync.questionInt('')

                console.log("\n\nDigite o valor do saque\n\n");
                valor = readlineSync.questionFloat('');

                contas.sacar(numero, valor)

                keyPress()
                break;
            case 7:
                console.log("\n\nDepósito\n\n");

                console.log("Digite o Número da Conta: ")
                numero = readlineSync.questionInt("")
                console.log("Digite o valor do Deposito: ")
                valor = readlineSync.questionFloat("")

                contas.depositar(numero, valor);
                
                keyPress()
                break;
            case 8:
                console.log("\n\nTransferência entre Contas\n\n");

                console.log("Digite o Numero da Conta de Origem: ")
                numero = readlineSync.questionInt("")

                console.log("Digite o Numero da Conta de Origem: ")
                numeroDestino = readlineSync.questionInt("")

                console.log("Digite o valor do Deposito: ")
                valor = readlineSync.questionFloat("")

                contas.transferir(numero, numeroDestino, valor)
                keyPress()
                break;

            case 9:
                console.log("\n\consultar Conta por titular\n\n");

                console.log('digite o nome do titular')
                titular = readlineSync.question('')
                contas.procurarPorTitular(titular)

                break;

            default:
                console.log("\nOpção Inválida!\n");

                break;
        }
    }
    }



/* Função com os dados da pessoa desenvolvedora */

export function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Generation Brasil - generation@generation.org");
    console.log("github.com/conteudoGeneration");
    console.log("*****************************************************");
}
function keyPress(): void {
    console.log("\nPressione enter para continuar...");
    readlineSync.prompt();
}

main();