import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  cadastrarLote(lote: any) {
    return this.http.post(`${this.API_URL}/lotes`, lote);
  }
}
