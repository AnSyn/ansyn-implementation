import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubComponent } from './sub.component';

const routes: Routes = [
  {
    path: '',
    component: SubComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubRoutingModule { }
