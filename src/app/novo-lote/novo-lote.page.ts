import { Component } from '@angular/core';
import { LoteService } from '../services/lote.service';
import { CameraService } from '../services/camera.service';
import { createWorker } from 'tesseract.js';

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
    try {
      const foto = await this.cameraService.tirarFoto();

      if (!foto) {
        console.warn('Nenhuma imagem foi capturada.');
        return;
      }

      this.imagemBase64 = foto;
      console.log('Imagem capturada com sucesso!');

      const worker = await createWorker();

      await worker.load();
      await worker.reinitialize('por'); 

      const { data: { text } } = await worker.recognize(foto, {
        logger: (m: any) => console.log(m)
      } as any);

      console.log('Texto extraído do OCR:', text);

      await worker.terminate();

      this.preencherCamposDoTexto(text);
    } catch (error) {
      console.error('Erro ao tirar foto ou processar OCR:', error);
      alert('Erro ao tirar a foto ou processar o texto. Verifique a câmera e a imagem.');
    }
  }



  private preencherCamposDoTexto(texto: string) {
    const linhas = texto.split('\n').map(l => l.trim());

    linhas.forEach(linha => {
      const partes = linha.split(':');
      if (partes.length < 2) return;

      const chave = partes[0].toLowerCase();
      const valor = partes.slice(1).join(':').trim();

      if (chave.includes('om')) this.lote.om = valor;
      else if (chave.includes('ov')) this.lote.ov = valor;
      else if (chave.includes('cliente')) this.lote.cliente = valor;
      else if (chave.includes('item')) this.lote.item = valor;
      else if (chave.includes('equipamento')) this.lote.equipamento = valor;
      else if (chave.includes('reprovado') || chave.includes('desc')) this.lote.reprovado = valor;
      else if (chave.includes('quantidade total') || chave.includes('total')) this.lote.quantiTotal = valor;
      else if (chave.includes('local')) this.lote.local = valor;
      else if (chave.includes('defeito')) this.lote.defeito = valor;
    });
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
