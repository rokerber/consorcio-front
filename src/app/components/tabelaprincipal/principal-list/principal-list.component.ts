import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator as MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource as MatTableDataSource } from '@angular/material/table';
import { SimulacaoService } from 'src/app/services/simulacao.service';
import { TabelaPrincipal } from '../../models/tabelaprincipal';
import { ParametrosRequest } from '../../models/parametrosrequest';

@Component({
  selector: 'app-principal-list',
  templateUrl: './principal-list.component.html',
  styleUrls: ['./principal-list.component.css']
})
export class PrincipalListComponent implements OnInit {

  ELEMENT_DATA: TabelaPrincipal[] = []
  FILTERED_DATA: TabelaPrincipal[] = []

  parametrosrequest: ParametrosRequest = {
    modalidade: '',
    prazo: '',
    valorCredito: '',
    incc: '',
    lance: '',
    taxaAdm: '',
    mesAtual: '',
  }

  displayedColumns: string[] = ['cota', 'mesContemplacao', 'formaContemplacao', 'creditoAtualizado', 'investimentoMensalCorrigido',
   'valorInvestidoCorrigido', 'parcelaPosContemplacao', 'valorVenda','ir','lucroLiquido','retornSobCapitalInvest','estrategia'];
  dataSource = new MatTableDataSource<TabelaPrincipal>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private simulacaoService: SimulacaoService
  ) { }

  ngOnInit(): void {
    this.getParametros();
    this.findAll();
  }

  getParametros(): void {
    this.parametrosrequest = this.simulacaoService.listParametrosRequest();
  }

  findAll(): void {
    let tabelaPrincipalList = this.simulacaoService.listSimulationResult();
    this.ELEMENT_DATA = tabelaPrincipalList;
    this.dataSource = new MatTableDataSource<TabelaPrincipal>(tabelaPrincipalList);
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
