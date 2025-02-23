import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ParametrosRequest } from '../components/models/parametrosrequest';
import { TabelaPrincipal } from '../components/models/tabelaprincipal';
import { SomaSimulacao } from '../components/models/somasimulacao';

@Injectable({
  providedIn: 'root'
})
export class SimulacaoService {

  tabelaprincipal: TabelaPrincipal[] = []

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
  
  constructor(private http: HttpClient) { }

  simulate(parametrosRequest: ParametrosRequest): Observable<TabelaPrincipal[]> {
    return this.http.post<TabelaPrincipal[]>(`${API_CONFIG.baseUrl}/simulacoes`, parametrosRequest)  
  }

  somaSimulacao(): Observable<SomaSimulacao> {
    return this.http.get<SomaSimulacao>(`${API_CONFIG.baseUrl}/simulacoes/soma`)  
  }

  storeSimulationResult(resposta: any) {
    return this.tabelaprincipal = resposta;
  }

  listSimulationResult(){
    return this.tabelaprincipal;
  }

  listParametrosRequest(){
    return this.parametrosrequest;
  }


}
