import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SubModule } from '../sub/sub.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SubModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
