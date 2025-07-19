import { Component, OnInit } from '@angular/core';
import { LoteService } from '../services/lote.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  lotes: any[] = [];
  lotesFiltrados: any[] = [];

  inputPesquisa = '';
  tipoPesquisa = 'om'; 

  constructor(private loteService: LoteService) {}

  ngOnInit() {
    this.carregarLotes();
  }

  carregarLotes() {
    this.loteService.listarLotes().subscribe({
      next: (res: any) => {
        this.lotes = res;
        this.lotesFiltrados = res; 
      },
      error: (err) => {
        console.error('Erro ao buscar lotes:', err);
        alert('Erro ao buscar lotes');
      }
    });
  }

  PesquisarLoteNomeOM() {
    const termo = this.inputPesquisa.toLowerCase();

    this.lotesFiltrados = this.lotes.filter(lote => {
      const valorCampo = lote[this.tipoPesquisa]?.toString().toLowerCase() || '';
      return valorCampo.includes(termo);
    });
  }
}
