import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { fetchConfigProviders } from '@ansyn/ansyn';

if (environment.production) {
  enableProdMode();
}

fetchConfigProviders('assets/app.config.json')
  .then(providers => platformBrowserDynamic(providers).bootstrapModule(AppModule).catch(err => console.log(err)));
