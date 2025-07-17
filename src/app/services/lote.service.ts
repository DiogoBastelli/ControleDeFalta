import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private apiUrl = 'http://localhost:3000/lotes'; 
  constructor(private http: HttpClient) {}

  cadastrarLote(lote: any) {
    return this.http.post(this.apiUrl, lote);
  }
}
