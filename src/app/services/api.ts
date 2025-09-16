import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParametroRequest, Simulacao, TabelaMensal } from '../models';
import { getApiUrl, API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  simularConsorcio(dadosDoFormulario: ParametroRequest): Observable<Simulacao[]> {
    return this.http.post<Simulacao[]>(getApiUrl(API_CONFIG.ENDPOINTS.SIMULACOES), dadosDoFormulario);
  }

  simularMensal(dadosDoFormulario: ParametroRequest): Observable<TabelaMensal[]> {
    return this.http.post<TabelaMensal[]>(getApiUrl(API_CONFIG.ENDPOINTS.SIMULACOES_MENSAL), dadosDoFormulario);
  }
}
