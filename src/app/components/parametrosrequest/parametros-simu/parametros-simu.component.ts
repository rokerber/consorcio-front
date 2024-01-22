import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SimulacaoService } from 'src/app/services/simulacao.service';
import { ParametrosRequest } from '../../models/parametrosrequest';
import { TabelaPrincipal } from '../../models/tabelaprincipal';
import { SimulacaoAnualService } from 'src/app/services/simulacao.anual.service';
import { TabelaAnual } from '../../models/tabelaanual';
import { MatTableDataSource } from '@angular/material/table';
import { SomaSimulacao } from '../../models/somasimulacao';
import { TabelaMensal } from '../../models/tabelamensal';
import { SimulacaoMensalService } from 'src/app/services/simulacao.mensal.service';



@Component({
  selector: 'app-parametros-simu',
  templateUrl: './parametros-simu.component.html',
  styleUrls: ['./parametros-simu.component.css'],
})


export class ParametrosSimuComponent implements OnInit {

  parametrosrequest: ParametrosRequest = {
    cota: '',
    mesContemplacaoList: [],
    modalidade: '',
    prazo: '',
    valorCredito: '',
    incc: '',
    lance: '',
    taxaAdm: '',
    mesAtual: '',
  }

  somaSimulacao: SomaSimulacao = {
  somaCreditoAtualizado:           0,
  somaInvestimentoMensalCorrigido: 0,
  somaInvestimentoPosContemplacao: 0,
  somaValorInvestidoCorrigido:     0,
  }

  tabelaprincipal: TabelaPrincipal[] = []
  tabelaAnual: TabelaAnual[] = []
  tabelaMensal: TabelaMensal[] = []


  cota: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  mesContemplacaoList: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  modalidade: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  prazo: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  valorCredito: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  incc: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  lance: UntypedFormControl = new UntypedFormControl(null)
  taxaAdm: UntypedFormControl = new UntypedFormControl(null, [Validators.required])
  mesAtual: UntypedFormControl = new UntypedFormControl(null, [Validators.required])

  showTabelaAnual: boolean = true
  visibleTabelaAnual: boolean = false
  showTabelaMensal: boolean = true
  visibleTabelaMensal: boolean = false
  visibleTabelaPrincipal: boolean = false

  ELEMENT_DATA_TABELA_PRINCIPAL: TabelaPrincipal[] = []
  ELEMENT_DATA_TABELA_ANUAL: TabelaAnual[] = []
  ELEMENT_DATA_TABELA_MENSAL: TabelaMensal[] = []

  displayedColumnsTabelaPrincipal: string[] = ['cota', 'mesContemplacao', 'formaContemplacao', 'creditoAtualizado', 'investimentoMensalCorrigido',
    'valorInvestidoCorrigido', 'parcelaPosContemplacao', 'valorVenda', 'ir', 'lucroLiquido', 'retornSobCapitalInvest', 'estrategia'];
  dataSourceTabelaPrincipal = new MatTableDataSource<TabelaPrincipal>(this.ELEMENT_DATA_TABELA_PRINCIPAL);

  displayedColumnsTabelaAnual: string[] = ['ano', 'creditoAtualizadoAnual','investimentoAnualCorrigido','saldoDevedor','valorDaVenda'];
  dataSourceTabelaAnual = new MatTableDataSource<TabelaAnual>(this.ELEMENT_DATA_TABELA_ANUAL);

  displayedColumnsTabelaMensal: string[] = ['mes', 'creditoAtualizadoMensal','investimentoMensalCorrigido','valorInvestidoCorrigido','saldoDevedor'];
  dataSourceTabelaMensal = new MatTableDataSource<TabelaMensal>(this.ELEMENT_DATA_TABELA_MENSAL);

  constructor(
    private simulacaoService: SimulacaoService,
    private simulacaoAnualService: SimulacaoAnualService,
    private simulacaoMensalService: SimulacaoMensalService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.parametrosrequest = this.simulacaoService.listParametrosRequest();
    this.getParametros();
    this.findAllTabelaPrincipal();
    this.findAllTabelaAnual();
    this.findAllTabelaMensal();
  }


  calcularSimulacao(): void {
    const input: HTMLInputElement = (<HTMLInputElement>document.getElementById('mesContemplacaoList'));
      const arrayData = input.value.split(',');
      this.parametrosrequest.mesContemplacaoList = [];
      for (const item of arrayData) {
        const number = parseInt(item);
        if (!isNaN(number)) {
          this.parametrosrequest.mesContemplacaoList.push(number);
        }
      }  
    this.simulacaoService.simulate(this.parametrosrequest).subscribe(resposta => {
      this.tabelaprincipal = resposta;
      this.simulacaoService.storeSimulationResult(this.tabelaprincipal);
      this.findAllTabelaPrincipal();
      this.somarSimulacao();
      this.visibleTabelaPrincipal = true;
      this.simularTabelaAnual();
      this.simularTabelaMensal();
    }, err => {
      this.toastrService.error(err.error.message,err.error.error);
    })
  }

  
  somarSimulacao(): void {
    this.simulacaoService.somaSimulacao().subscribe(resposta => {
      this.somaSimulacao = resposta;
    }, err => {
      this.toastrService.error(err.error.message,err.error.error);
    })
  }

  simularTabelaAnual(): void {
    this.simulacaoAnualService.storeParametrosRequest(this.parametrosrequest);
    this.simulacaoAnualService.simulate(this.parametrosrequest)
      .subscribe(resposta => {
        this.tabelaAnual = resposta;
        this.simulacaoAnualService.storeSimulationResult(this.tabelaAnual);
        this.findAllTabelaAnual();
      }, err => {
        this.toastrService.error(err.error.message,err.error.error);
      })
  }

  simularTabelaMensal(): void {
    this.simulacaoMensalService.simulate(this.parametrosrequest)
      .subscribe(resposta => {
        this.tabelaMensal = resposta;
        this.simulacaoMensalService.storeSimulationResult(this.tabelaMensal);
        this.findAllTabelaMensal();
        this.toastrService.success('Simulação feita com sucesso!', 'Simulação');
      }, err => {
        this.toastrService.error(err.error.message,err.error.error);
      })
  }


  validaCampos(): boolean {
    return this.cota.valid && this.mesContemplacaoList.valid && this.modalidade.valid && this.prazo.valid &&
      this.valorCredito.valid && this.incc.valid && this.taxaAdm.valid &&
      this.mesAtual.valid;
  }


  getParametros(): void {
    this.parametrosrequest = this.simulacaoService.listParametrosRequest();
  }

  findAllTabelaPrincipal(): void {
    let tabelaPrincipalList = this.simulacaoService.listSimulationResult();
    this.ELEMENT_DATA_TABELA_PRINCIPAL = tabelaPrincipalList;
    this.dataSourceTabelaPrincipal = new MatTableDataSource<TabelaPrincipal>(tabelaPrincipalList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTabelaPrincipal.filter = filterValue.trim().toLowerCase();
  }

  retornaModalidade(modalidade: any): string {
    if (modalidade == '') {
      return '';
    } else if (modalidade == 0) {
      return 'MEIA';
    } else {
      return 'CHEIA';
    }
  }


  findAllTabelaAnual(): void {
    let tabelaAnualList = this.simulacaoAnualService.listSimulationResult();
    this.ELEMENT_DATA_TABELA_ANUAL = tabelaAnualList;
    this.dataSourceTabelaAnual = new MatTableDataSource<TabelaAnual>(tabelaAnualList);
  }
  

  onclickTabelaAnual() {
    this.showTabelaAnual = !this.showTabelaAnual;
    this.visibleTabelaAnual = !this.visibleTabelaAnual
  }

  
  findAllTabelaMensal(): void {
    let tabelaMensalList = this.simulacaoMensalService.listSimulationResult();
    this.ELEMENT_DATA_TABELA_MENSAL = tabelaMensalList;
    this.dataSourceTabelaMensal = new MatTableDataSource<TabelaMensal>(tabelaMensalList);
  }

  onclickTabelaMensal() {
    this.showTabelaMensal = !this.showTabelaMensal;
    this.visibleTabelaMensal = !this.visibleTabelaMensal
  }

}
