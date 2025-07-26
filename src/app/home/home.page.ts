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
  console.log('HomePage iniciado!');
  this.carregarLotes();
}


  carregarLotes() {
  this.loteService.listarLotes().subscribe(
    (res: any) => {
      console.log('Resposta API no celular:', res);
      this.lotes = res;
      this.lotesFiltrados = res;
    },
    (err) => {
      console.error('Erro ao buscar lotes no celular:', err);
      alert('Erro ao buscar lotes');
    }
  );
}



 pesquisarLotes() {
  const termo = this.inputPesquisa.toLowerCase();

  const campoPesquisaMap: { [key: string]: string } = {
    om: 'ordem_montagem',
    cliente: 'cliente'
  };

  const campoPesquisa = campoPesquisaMap[this.tipoPesquisa] || 'ordem_montagem';

  this.lotesFiltrados = this.lotes.filter(lote => {
    const valorCampo = lote[campoPesquisa]?.toString().toLowerCase() || '';
    return valorCampo.includes(termo);
  });
}

}
