import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { OcrService } from '../services/ocr.service';
import { LoteService } from '../services/lote.service';

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
  constructor(private cameraService: CameraService, private ocrService: OcrService, private loteService: LoteService) {}

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

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];

    if (/EQUIP/i.test(linha)) {
      this.lote.equipamento = linha.replace(/EQUIP[.:]*\s*/i, '').trim();
    }

    if (/CLIENTE/i.test(linha)) {
      const match = linha.match(/CLIENTE\s+(.*?)\s+OM[: ]*(\d*)/i);
      if (match) {
        this.lote.cliente = match[1].trim();
        if (match[2]) this.lote.om = match[2].trim();
      } else {
        this.lote.cliente = linha.replace(/CLIENTE\s*/i, '').trim();
      }
    }

    if (/OM[: ]*$/i.test(linha) && i + 1 < linhas.length) {
      this.lote.om = linhas[i + 1].trim();
    }

    if (/OV[: ]*$/i.test(linha) && i + 1 < linhas.length) {
      this.lote.ov = linhas[i + 1].trim();
    }

    if (/QT[:]*$/i.test(linha) && i + 1 < linhas.length) {
      this.lote.quantiTotal = linhas[i + 1].trim();
    }

    if (/ITEM[:]*$/i.test(linha) && i + 1 < linhas.length) {
      this.lote.item = linhas[i + 1].trim();
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
