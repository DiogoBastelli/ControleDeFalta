  import { Injectable } from '@angular/core';
  import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

  @Injectable({ providedIn: 'root' })
  export class CameraService {
    async tirarFotoBase64(): Promise<string | null> {
      try {
        const photo = await Camera.getPhoto({
          quality: 100,
          allowEditing: false,
          resultType: CameraResultType.Base64, 
          source: CameraSource.Camera
        });

        return photo.base64String || null;
      } catch (err) {
        console.error('Erro ao tirar foto:', err);
        return null;
      }
    }
  }
