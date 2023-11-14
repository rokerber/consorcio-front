import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ParametrosRequest } from '../components/models/parametrosrequest';
import { TabelaReajuste } from '../components/models/tabelareajuste';

@Injectable({
  providedIn: 'root'
})
export class SimulacaoReajusteService {

  parametrosrequest: ParametrosRequest = {
    modalidade: '',
    prazo: '',
    valorCredito: '',
    incc: '',
    lance: '',
    taxaAdm: '',
    mesAtual: '',
  }
  

  tabelareajuste: TabelaReajuste[] = []

  
  constructor(private http: HttpClient) { }


  simulate(parametrosRequest: ParametrosRequest): Observable<TabelaReajuste[]> {
    return this.http.post<TabelaReajuste[]>(`${API_CONFIG.baseUrl}/simulacoes/reajuste`, parametrosRequest)  
  }

  storeSimulationResult(resposta: any) {
    return this.tabelareajuste = resposta;
  }

  storeParametrosRequest(resposta: any) {
    return this.parametrosrequest = resposta;
  }

  listSimulationResult(){
    return this.tabelareajuste;
  }

  listParametrosRequest(){
    return this.parametrosrequest;
  }


}
