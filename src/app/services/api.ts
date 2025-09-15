import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParametroRequest, Simulacao, TabelaMensal } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private apiUrl = 'http://192.168.40.70:30090/consorcio-api';
  private apiUrl = 'https://counties-glen-neither-warranty.trycloudflare.com/consorcio-api';


  constructor(private http: HttpClient) { }
  simularConsorcio(dadosDoFormulario: ParametroRequest): Observable<Simulacao[]> {
    return this.http.post<Simulacao[]>(`${this.apiUrl}/api/simulacoes`, dadosDoFormulario);
  }
  simularMensal(dadosDoFormulario: ParametroRequest): Observable<TabelaMensal[]> {
    return this.http.post<TabelaMensal[]>(`${this.apiUrl}/api/simulacoes/mensal`, dadosDoFormulario);
  }
}

