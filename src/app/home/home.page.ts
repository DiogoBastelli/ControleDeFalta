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

  constructor(private loteService: LoteService) {}

  ngOnInit() {
    this.carregarLotes();
  }

  carregarLotes() {
    this.loteService.listarLotes().subscribe({
      next: (res: any) => {
        this.lotes = res;
        console.log('Lotes:', this.lotes);
      },
      error: (err) => {
        console.error('Erro ao buscar lotes:', err);
        alert('Erro ao buscar lotes');
      }
    });
  }
}
