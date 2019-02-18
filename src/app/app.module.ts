import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AnsynModule } from '@ansyn/ansyn';
import { ImageryModule } from '@ansyn/imagery';
import {OpenLayerOSMCustomSourceProvider} from './osm-provider';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AnsynModule.component(),
    ImageryModule.provide({
      maps: [],
      plugins: [],
      mapSourceProviders: [
        OpenLayerOSMCustomSourceProvider
      ]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
