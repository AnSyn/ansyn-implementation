import { NgModule } from '@angular/core';
import { SubComponent } from './sub.component';
import { AnsynModule } from '@ansyn/ansyn';
import { CommonModule } from '@angular/common';
import { SubRoutingModule } from './sub-routing.module';

@NgModule({
  declarations: [
    SubComponent
  ],
  imports: [
    AnsynModule.component(),
    CommonModule,
    SubRoutingModule
  ]
})
export class SubModule {
}
