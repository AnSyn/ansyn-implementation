# Angular AnSyn Implementation

## Installation

```shell
npm install @ansyn/ansyn @ansyn/assets
```
or
```shell
yarn add @ansyn/ansyn @ansyn/assets
```
(or, to update existing packages:)
```shell
yarn upgrade @ansyn/ansyn @ansyn/assets
```

## Usage
add ansyn to your assets / styles on `angular.json` file,  under yourProject/architect/build/options:

```json
             "assets": [
                {
                  "glob": "**/*",
                  "input": "./node_modules/@ansyn/assets",
                  "output": "/assets"
               }
             ],
             "styles": [
               "node_modules/@ansyn/assets/styles/styles.css"
             ]
```

on `main.ts` file:

```typescript
import { fetchConfigProviders } from '@ansyn/core';

fetchConfigProviders('assets/config/app.config.json').then(providers =>  platformBrowserDynamic(providers).bootstrapModule(AppModule).catch(err => console.log(err)));
```

on `app.module.ts`:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AnsynModule } from '@ansyn/ansyn';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AnsynModule.component()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

on `app.component.html`:

```html
  ...
  <ansyn-app></ansyn-app>
  ...
```
`AnsynApi` service on `ansyn.component.ts`:
```typescript
import { AnsynApi } from '@ansyn/ansyn';

@Component({
...
})
export class AppComponent {
  constructor(protected ansynApi: AnsynApi) {
  }
}
```

on `app.component.css`:

The element `ansyn-app` has to receive height. It can be explicit height, or implicit like "display:flex" + "flex:1"
For example:

```
ansyn-app {
  display: block;
  height: 500px;
  border: 1px solid darkgreen;
}
```

