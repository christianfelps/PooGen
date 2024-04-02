import { Conta } from "../model/Conta";
import { ContaRepository } from "../model/repository/ContaRepository";

export class ContaController implements ContaRepository{

    procurarPorTitular(titular: string) {
        let listaContasPorTitular = this.listaContas.filter(c => 
            c.titular.toUpperCase().includes(titular.toUpperCase()))

            for(let conta of listaContasPorTitular){
                conta.visualizar();
            }

         

    }

    private listaContas: Array<Conta> = new Array<Conta>();
    
    // Atributo que será utilizado para controlar o numero das
    // contas
    numero: number = 0;

    
    
    
    procurarPorNumero(numero: number): void {
      let buscaConta = this.buscarNoArray(numero);
      
      if(buscaConta!== null)
        buscaConta.visualizar()
    else
        console.log('\nConta nao foi Encontrada!')
}


    // Método para Listar os dados de todas as Contas
    // inseridas na Collection listaContas
    listarTodas(): void {

     for(let conta of this.listaContas){
        conta.visualizar();
     } 
    }


    // Método para adicionar Objetos das Classes 
    // ContaCorrente e ContaPoupanca
    // na Collection listaContas
    cadastrar(conta: Conta): void {
      
        this.listaContas.push(conta)
        console.log('A conta foi adicionada!') ;     
    }


    // Método para atualizar os dados de uma Conta
    // inseridas na Collection listaContas
    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);
      
        if(buscaConta!== null){
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta
        console.log(`A Conta numero ${conta.numero} foi atualizada com Exito!`)
        }else
        console.log('\nConta nao encontrada!')
    }


    // Método para deletar uma Conta
    // inseridas na Collection listaContas
    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);
      
        if(buscaConta!== null){
          this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1)
        console.log(`A Conta numero ${numero} foi Excluida com Exito!`)
    }
      else
          console.log('\nConta nao foi Encontrada!')
  
  
       
    }




    sacar(numero: number, valor: number): void {
        let buscaConta = this.buscarNoArray(numero);
      
        if(buscaConta!== null) {
            if( buscaConta.sacar(valor) === true ){
                
                console.log(`Saque na conta${numero}, efetuado com sucesso`)
        }
    }       
        else
        console.log('Conta nao encontrada.')

    }

    depositar(numero: number, valor: number): void {
        let buscaConta = this.buscarNoArray(numero);
      
        if(buscaConta!== null) {
            buscaConta.depositar(valor)
                
        console.log(`Deposito conta numero ${numero}, efetuado com sucesso`)
        }
    
        else
        console.log('Conta nao encontrada.')

    }



    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {

        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);
        
        if(contaOrigem!== null && contaDestino !== null) {
            if( contaOrigem.sacar(valor) === true ){
                contaDestino.depositar(valor)

                
                console.log(`a transferencia da conta ${numeroOrigem}, para a conta ${numeroDestino} efetuado com sucesso`)
        }
    }       
        else
        console.log('Conta de Origem e/ou a conta de Destino nao foram encontrada.')

    }

    // Metodos auxiliares 

    public gerarNumero() :number{
        return ++ this.numero
    }


    public buscarNoArray(numero: number): Conta | null{
        for(let conta of this.listaContas){
        if (conta.numero === numero)
        return conta;}
    return null;
    }


    
}