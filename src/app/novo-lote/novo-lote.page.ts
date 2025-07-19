import { Component } from '@angular/core';
import { LoteService } from '../services/lote.service';

@Component({
  selector: 'app-novo-lote',
  templateUrl: './novo-lote.page.html',
  styleUrls: ['./novo-lote.page.scss'],
  standalone: false
})
export class NovoLotePage {
  lote = {
    om: '',
    ov: '',
    cliente: '',
    item: '',
    equipamento: '',
    quantiDesc: '',
    quantiTotal: ''
  };

  constructor(private loteService: LoteService) {}

  cadastrarLote() {
    this.loteService.cadastrarLote(this.lote).subscribe({
      next: (res: any) => {
        console.log('Resposta da API:', res);
        alert(res.message || 'Lote cadastrado com sucesso!');
        this.lote = {
          om: '',
          ov: '',
          cliente: '',
          item: '',
          equipamento: '',
          quantiDesc: '',
          quantiTotal: ''
        };
      },
      error: (err) => {
        console.error('Erro ao cadastrar lote:', err);
        alert('Erro ao cadastrar lote');
      }
    });
  }

  

}
