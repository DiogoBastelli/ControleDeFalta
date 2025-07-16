import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NovoLotePageRoutingModule } from './novo-lote-routing.module';

import { NovoLotePage } from './novo-lote.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NovoLotePageRoutingModule
    
  ],
  declarations: [NovoLotePage]
})
export class NovoLotePageModule {}
