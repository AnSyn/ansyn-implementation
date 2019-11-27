# Angular AnSyn Implementation

## Installation

```shell
npm install @ansyn/ansyn @ansyn/imagery @ansyn/map-facade @ansyn/ol @ansyn/menu @ngrx/core @ngrx/store @ngrx/effects @ngrx/entity ngx-treeview ol cesium d3 @angular/cdk @angular/material
```
or
```shell
yarn add @ansyn/ansyn @ansyn/assets @ansyn/core @ngrx/core @ngrx/store @ngrx/effects @ngrx/entity ngx-treeview ol cesium d3 @angular/cdk @angular/material
```
(or, to update existing packages:)
```shell
yarn upgrade @ansyn/ansyn @ansyn/imagery @ansyn/imagery-cesium @ansyn/ol @ansyn/map-facade @ansyn/menu 
```

## Usage
1.add ansyn to your assets / styles on `angular.json` file,  under yourProject/architect/build/options:

```json
             "assets": [
                {
                  "glob": "**/*",
                  "input": "./node_modules/@ansyn/ansyn/assets",
                  "output": "/assets"
                },
                {
                  "glob": "**/*",
                  "input": "node_modules/cesium/Build/Cesium",
                  "output": "/assets/Cesium"
                }
             ],
             "styles": [
               "node_modules/@ansyn/ansyn/assets/styles/styles.css"
             ],
             "scripts": [
               "node_modules/cesium/Build/Cesium/Cesium.js"
             ]
```

2.on `main.ts` file:

```typescript
import { fetchConfigProviders } from '@ansyn/ansyn';

fetchConfigProviders('assets/config/app.config.json').then(providers =>  platformBrowserDynamic(providers).bootstrapModule(AppModule).catch(err => console.log(err)));
```

You can provide an object that override the default configuration of your Ansyn app.(let's say we called it overrideConfig) , 
then you need to pass it to the `fetchConfigProviders` function from `@ansyn/ansyn` with the path of the original configuration('assets/config/app.config.json') which return you a promise with provider then pass it to `platformBrowserDynamic` function.
```typescript
fetchConfigProviders('assets/config/app.config.json', overrideConfig)
  .then(providers => platformBrowserDynamic(providers).bootstrapModule(AppModule).catch(err => console.log(err)));
``` 
Learn more about `Ansyn` [configuration](https://github.com/AnSyn/ansyn/wiki/Ansyn-configuration).


3.on `app.module.ts`:
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

4.on `app.component.html`:

```html
  ...
  <ansyn-app></ansyn-app>
  ...
```

5.on `app.component.css`:

The element `ansyn-app` has to receive height. It can be explicit height, or implicit like "display:flex" + "flex:1"
For example:

```
ansyn-app {
  display: block;
  height: 500px;
  border: 1px solid darkgreen;
}
```

6.inject `AnsynApi` service on `ansyn.component.ts`:
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
Learn more about [AnsynApi](https://github.com/AnSyn/ansyn/wiki/Ansyn-Package#AnsynApi).


### Add custome menu item

You could add your own custom menu item, in a few simple step.

1. Create a new component for your menu item.
2. In `main.ts` before you call `fetchConfigProviders` tell `ansynConfig.ansynMenuItems`about your custom menu item by pushing him an object look like:
  ```typescript
  {
  name: 'THE_MENU_ITEM_NAME',
  component: YOUR_COMPONENT,
  iconClass: 'YOUR_MENU_ITEM_ICON_CLASS'
  }
  ```
  next add your menu item name to `menuConfig.menuItems`
