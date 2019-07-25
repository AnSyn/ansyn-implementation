import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AnsynModule} from '@ansyn/ansyn';
import {OL_CONFIG, OL_PLUGINS_CONFIG} from '@ansyn/ol';
import {AppComponent} from './app.component';
import {CustomMenuComponent} from './menus/custom-menu/custom-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomMenuComponent
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
export class AppModule {
}
