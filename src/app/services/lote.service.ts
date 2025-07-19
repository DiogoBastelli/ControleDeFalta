import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private apiUrl = 'http://192.168.0.2:3000/lotes'; 

  constructor(private http: HttpClient) {}

  cadastrarLote(lote: any) {
    return this.http.post(this.apiUrl, lote);
  }
  listarLotes() {
  return this.http.get(this.apiUrl); 
  }

  PesquisarLoteNomeOM() {
  return this.http.get<any[]>('http://localhost:3000/lotes');
  }

}
