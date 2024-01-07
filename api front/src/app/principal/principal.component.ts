import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Carro } from '../modelo/carro';
import { CarroService } from '../servico/carro.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent {

  // Objeto do tipo carro
  carro = new Carro();

  // Variável para visibilidade dos botões
  btnCadastro:boolean = true;

  // Variável para visibilidade da tabela
  tabela:boolean = true;

  // JSON de carros
  carros:Carro[] = [];

  // Construtor
  constructor(private servico:CarroService){}

  // Método de seleção
  selecionar():void{
    this.servico.selecionar()
    .subscribe(retorno => this.carros = retorno);
  }

  // Método de cadastro
  cadastrar():void {
    this.servico.cadastrar(this.carro)
    .subscribe(retorno => {

      // Cadastrar o carro no vetor
      this.carros.push(retorno);

      // Limpar formulário
      this.carro = new Carro();

      // Mensagem
      alert('Carro cadastrado com sucesso!');
    });
  }

  // Método para selecionar um carro específico
  selecionarCarro(posicao:number):void {

    // Selecionar carro no vetor
    this.carro = this.carros[posicao];

    // Visibilidade dos botões
    this.btnCadastro = false;

    // Visibilidade da tabela
    this.tabela = false;
  }

  // Método para editar carros
  editar():void {

    this.servico.editar(this.carro)
    .subscribe(retorno => {

      // Obter posição do vetor onde está o carro
      let posicao = this.carros.findIndex(obj => {
        return obj.codigo == retorno.codigo;
      });

      // Alterar os dados do carro no vetor
      this.carros[posicao] = retorno;

      // Limpar formulário
      this.carro = new Carro();

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Mensagem
      alert('Cliente alterado com sucesso!');
    });
  }

  // Método para remover carros
  remover():void {

    this.servico.remover(this.carro.codigo)
    .subscribe(retorno => {

      // Obter posição do vetor onde está o carro
      let posicao = this.carros.findIndex(obj => {
        return obj.codigo == this.carro.codigo;
      });

      // Remover carro do vetor
      this.carros.splice(posicao, 1);

      // Limpar formulário
      this.carro = new Carro();

      // Visibilidade dos botões
      this.btnCadastro = true;

      // Visibilidade da tabela
      this.tabela = true;

      // Mensagem
      alert('Cliente removido com sucesso!');
    });
  }

  // Método para cancelar
  cancelar():void {

    // Limpar formulário
    this.carro = new Carro();

    // Visibilidade dos botões
    this.btnCadastro = true;

    // Visibilidade da tabela
    this.tabela = true;
  }

  // Método de inicialização
  ngOnInit() {
    this.selecionar();
  }

}
