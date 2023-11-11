import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ParametrosRequest } from '../components/models/parametrosrequest';
import { TabelaPrincipal } from '../components/models/tabelaprincipal';

@Injectable({
  providedIn: 'root'
})
export class SimulacaoService {

  tabelaprincipal: TabelaPrincipal[] = []
  
  constructor(private http: HttpClient) { }

  simulate(parametrosRequest: ParametrosRequest): Observable<TabelaPrincipal[]> {
    return this.http.post<TabelaPrincipal[]>(`${API_CONFIG.baseUrl}/simulacoes`, parametrosRequest)  
  }

  storeSimulationResult(resposta: any) {
    return this.tabelaprincipal = resposta;
  }

  listSimulationResult(){
    return this.tabelaprincipal;
  }


}
