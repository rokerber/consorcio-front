import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator as MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource as MatTableDataSource } from '@angular/material/table';
import { TabelaReajuste } from '../../models/tabelareajuste';
import { SimulacaoReajusteService } from 'src/app/services/simulacao.reajuste.service';
import { ParametrosRequest } from '../../models/parametrosrequest';

@Component({
  selector: 'app-reajuste-list',
  templateUrl: './reajuste-list.component.html',
  styleUrls: ['./reajuste-list.component.css']
})
export class ReajusteListComponent implements OnInit {

  ELEMENT_DATA: TabelaReajuste[] = []
  FILTERED_DATA: TabelaReajuste[] = []

  parametrosrequest: ParametrosRequest = {
    modalidade: '',
    prazo: '',
    valorCredito: '',
    incc: '',
    lance: '',
    taxaAdm: '',
    mesAtual: '',
  }
  
  displayedColumns: string[] = ['mes', 'ano', 'credito', 'saldoDevedor', 'acumuladoMeiaParcela', 'meiaParcela', 'anual', 'parcelaCheia',
  'anualCheia','acumuladoParcelaCheia','totalAserPago'];
  dataSource = new MatTableDataSource<TabelaReajuste>(this.ELEMENT_DATA);


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private simulacaoReajusteService: SimulacaoReajusteService
  ) { }

  ngOnInit(): void {
    this.getParametros();
    this.findAll();
  }

  getParametros(): void {
    this.parametrosrequest = this.simulacaoReajusteService.listParametrosRequest();
  }

  findAll(): void {
    let tabelaReajusteList = this.simulacaoReajusteService.listSimulationResult();
    this.ELEMENT_DATA = tabelaReajusteList;
    this.dataSource = new MatTableDataSource<TabelaReajuste>(tabelaReajusteList);
    //this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaModalidade(modalidade: any): string {
    if (modalidade == '') {
      return '';
    } else if (modalidade == 0){
      return 'MEIA';
    } else {
      return 'CHEIA';
    }
  }

}
