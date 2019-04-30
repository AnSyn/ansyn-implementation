import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AnsynModule } from '@ansyn/ansyn';
import { OL_CONFIG, OL_PLUGINS_CONFIG, OpenLayersMap, AnnotationsVisualizer, OpenLayerBingSourceProvider } from '@ansyn/ol';
import { ImageryModule } from '@ansyn/imagery';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AnsynModule.component()
  ],
  providers: [
    {
      provide: OL_CONFIG,
      useValue: {}
    },
    {
      provide: OL_PLUGINS_CONFIG,
      useValue: {
        Annotations: {}
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
