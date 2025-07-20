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
    const { om, ov, cliente, item, equipamento, quantiDesc, quantiTotal } = this.lote;

    if (
      !String(om).trim() ||
      !String(ov).trim() ||
      !String(cliente).trim() ||
      !String(item).trim() ||
      !String(equipamento).trim() ||
      !String(quantiDesc).trim() ||
      !String(quantiTotal).trim()
    ) {
      alert('Por favor, preencha todos os campos antes de cadastrar.');
      return;
    }

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
        if (err.status === 400 && err.error?.error) {
          alert(err.error.error);
        } else {
          alert('Erro ao cadastrar lote');
        }
      }
    });
  }

}
