import { NgModule } from '@angular/core';
import { AnsynModule } from '@ansyn/ansyn';
import { OL_CONFIG, OL_PLUGINS_CONFIG } from '@ansyn/ol';
import { AppComponent } from './app.component';
import { CustomMenuComponent } from './menus/custom-menu/custom-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomMenuComponent
  ],
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    AnsynModule.component(),
    FormsModule,
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
