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
      next: () => alert('Lote cadastrado com sucesso!'),
      error: () => alert('Erro ao cadastrar lote')
    });
  }
}
