import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { OcrService } from '../services/ocr.service';
import { LoteService } from '../services/lote.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-novo-lote',
  templateUrl: './novo-lote.page.html',
  styleUrls: ['./novo-lote.page.scss'],
  standalone: false
})

export class NovoLotePage {
  lote = { om:'', ov:'', cliente:'', item:'', equipamento:'', quantiTotal:'', reprovado:'', local:'', defeito:'', status:'Aguardando Retrabalho' };
  ocrTexto = '';
  carregandoOCR = false;
  imagemBase64: string | null = null;
  constructor(private cameraService: CameraService, private ocrService: OcrService, private loteService: LoteService ) {}
  
  async tirarFoto() {
    const base64 = await this.cameraService.tirarFotoBase64();
    if (!base64) return;

    this.carregandoOCR = true;
    this.ocrTexto = await this.ocrService.reconhecerText(base64);
    this.carregandoOCR = false;
    
    console.log('Texto capturado pelo OCR:', this.ocrTexto);
    this.preencherCamposDoTexto(this.ocrTexto);
    
  }


  private preencherCamposDoTexto(texto: string) {
    const linhas = texto.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    
    const numeros = texto.match(/\d+/g) || [];

    for (let numero of numeros) {
      // OM: 8 dígitos, começa com 217 ou 218
      if (!this.lote.om && numero.length === 8 && (numero.startsWith('217') || numero.startsWith('218'))) {
        this.lote.om = numero;
      }
      // OV: 8 dígitos, começa com 85
      if (!this.lote.ov && numero.length === 8 && numero.startsWith('85')) {
        this.lote.ov = numero;
      }
      // Item: termina com dois zeros
      if (!this.lote.item && /^[0-9]+00$/.test(numero)) {
        this.lote.item = numero;
      }
    }
    // Quantidade total: pegar o penúltimo número da lista
    if (numeros.length >= 2) {
      this.lote.quantiTotal = numeros[numeros.length - 2];
    }
    // Equipamento
    const linhaEquip = linhas.find(l => /equip/i.test(l));
    if (linhaEquip) {
      this.lote.equipamento = linhaEquip.replace(/.*equip[.: ]*/i, '').trim();
    }
    // Cliente
    const linhaCliente = linhas.find(l => /clien/i.test(l) || /clent/i.test(l));
    if (linhaCliente) {
      const clienteMatch = linhaCliente.match(/cliente:\s*(.*?)\s*om:/i);
      if (clienteMatch && clienteMatch[1]) {
        this.lote.cliente = clienteMatch[1].trim();
      } else {
        this.lote.cliente = linhaCliente.replace(/.*cliente[.: ]*/i, '').trim();
      }
    }
  }

  cadastrarLote() {
    const { om, ov, cliente, item, equipamento, reprovado, quantiTotal, local, defeito } = this.lote;

    if (
      !String(om).trim() ||
      !String(ov).trim() ||
      !String(cliente).trim() ||
      !String(item).trim() ||
      !String(equipamento).trim() ||
      !String(reprovado).trim() ||
      !String(quantiTotal).trim() ||
      !String(local).trim() ||
      !String(defeito).trim()
    ) {
      alert('Por favor, preencha todos os campos antes de cadastrar.');
      return;
    }

    this.loteService.cadastrarLote(this.lote).subscribe({
      next: (res: any) => {
        alert(res.message || 'Lote cadastrado com sucesso!');
        this.lote = {
          om: '',
          ov: '',
          cliente: '',
          item: '',
          equipamento: '',
          quantiTotal: '',
          reprovado: '',
          local: '',
          defeito: '',
          status: 'Aguardando Retrabalho'
        };
        this.ocrTexto = '';
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
