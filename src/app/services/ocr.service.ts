import { Injectable } from '@angular/core';
import { Ocr, TextDetections } from '@capacitor-community/image-to-text';

@Injectable({ providedIn: 'root' })
export class OcrService {
  async reconhecerText(base64: string): Promise<string> {
    try {
      const result: TextDetections = await Ocr.detectText({
        base64: 'data:image/jpeg;base64,' + base64
      });

      return result.textDetections.map(td => td.text).join('\n');
    } catch (err: any) {
      console.error('Erro OCR:', err);
      return '';
    }
  }
}
