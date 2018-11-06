import { Component } from '@angular/core';
import { AnsynApi } from '@ansyn/ansyn';
import { LayoutKey, layoutOptions } from '@ansyn/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})  
export class AppComponent {
  layoutKeys: LayoutKey[] = Array.from(layoutOptions.keys());

  constructor(protected ansynApi: AnsynApi) {
    this.ansynApi.getActiveCenter$.subscribe((aaa)=>{
      console.log(aaa);
    });
  }

  setLayout(layout: LayoutKey): void {
    this.ansynApi.changeMapLayout(layout);
  }
}
