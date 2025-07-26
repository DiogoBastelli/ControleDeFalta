import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

if (window) {
  (window as any).Ionic = { config: { mode: 'md' } };
}

if ((window as any).Capacitor?.isNativePlatform()) {
  console.log('Debug ativo no dispositivo!');
}
defineCustomElements(window);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
