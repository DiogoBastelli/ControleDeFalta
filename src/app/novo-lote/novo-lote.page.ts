import { Component } from '@angular/core';
import { LoteService } from '../services/lote.service';
import { CameraService } from '../services/camera.service';
const Tesseract = require('tesseract.js');


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
    quantiTotal: '',
    reprovado: '',
    local: '',
    defeito: '',
    status: 'Aguardando Retrabalho'
  };

  imagemBase64: string | null = null;

  constructor(
    private loteService: LoteService,
    private cameraService: CameraService
  ) {}

  async tirarFoto() {
  this.imagemBase64 = await this.cameraService.tirarFoto();

  if (!this.imagemBase64) {
    alert('Foto não capturada.');
    return;
  }

  const resultado = await Tesseract.recognize(this.imagemBase64, 'eng', {
    logger: (m: any) => console.log(m)  
  });

  const texto = resultado.data.text;
  console.log('Texto extraído:', texto);

  this.preencherCampos(texto);
}


  preencherCampos(texto: string) {
  const t = texto.toUpperCase();

  const matchOM = t.match(/OM[:\s]*([0-9]{6,})/);
  const matchOV = t.match(/OV[:\s]*([0-9]{6,})/);
  const matchCliente = t.match(/CLIENTE[:\s]*(.+?)SEW/);
  const matchItem = t.match(/ITEM[:\s]*([0-9]+)/);
  const matchQt = t.match(/QT[:\s]*([0-9]+)/);
  const matchEquip = t.match(/EQUIP[:\s]*([A-Z0-9 ]{5,})/);

  this.lote.om = matchOM?.[1] || '';
  this.lote.ov = matchOV?.[1] || '';
  this.lote.cliente = matchCliente?.[1]?.trim() || '';
  this.lote.item = matchItem?.[1] || '';
  this.lote.quantiTotal = matchQt?.[1] || '';
  this.lote.equipamento = matchEquip?.[1]?.trim() || '';

  console.log('Campos preenchidos com OCR:', this.lote);
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
