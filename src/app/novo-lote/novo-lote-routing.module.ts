import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NovoLotePage } from './novo-lote.page';

const routes: Routes = [
  {
    path: '',
    component: NovoLotePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoLotePageRoutingModule {}
