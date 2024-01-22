import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ParametrosRequest } from '../components/models/parametrosrequest';
import { TabelaAnual } from '../components/models/tabelaanual';

@Injectable({
  providedIn: 'root'
})
export class SimulacaoAnualService {

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
  

  tabelaAnual: TabelaAnual[] = []

  
  constructor(private http: HttpClient) { }


  simulate(parametrosRequest: ParametrosRequest): Observable<TabelaAnual[]> {
    return this.http.post<TabelaAnual[]>(`${API_CONFIG.baseUrl}/simulacoes/anual`, parametrosRequest)  
  }

  storeSimulationResult(resposta: any) {
    return this.tabelaAnual = resposta;
  }

  storeParametrosRequest(resposta: any) {
    return this.parametrosrequest = resposta;
  }

  listSimulationResult(){
    return this.tabelaAnual;
  }

  listParametrosRequest(){
    return this.parametrosrequest;
  }


}
