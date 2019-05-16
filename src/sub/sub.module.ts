import { NgModule } from '@angular/core';
import { SubComponent } from './sub.component';
import { AnsynModule } from '@ansyn/ansyn';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SubComponent
  ],
  imports: [
    AnsynModule.component(),
    CommonModule
  ],
  providers: [],
  exports: [
    SubComponent
  ]
})
export class SubModule {
}
