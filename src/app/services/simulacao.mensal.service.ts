import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ParametrosRequest } from '../components/models/parametrosrequest';
import { TabelaAnual } from '../components/models/tabelaanual';
import { TabelaMensal } from '../components/models/tabelamensal';

@Injectable({
  providedIn: 'root'
})
export class SimulacaoMensalService {

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
  
  tabelaMensal: TabelaMensal[] = []
  
  constructor(private http: HttpClient) { }

  simulate(parametrosRequest: ParametrosRequest): Observable<TabelaMensal[]> {
    return this.http.post<TabelaMensal[]>(`${API_CONFIG.baseUrl}/simulacoes/mensal`, parametrosRequest)  
  }

  storeSimulationResult(resposta: any) {
    return this.tabelaMensal = resposta;
  }

  listSimulationResult(){
    return this.tabelaMensal;
  }

  listParametrosRequest(){
    return this.parametrosrequest;
  }


}
