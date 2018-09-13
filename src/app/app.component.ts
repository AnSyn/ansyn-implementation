import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadDefaultCaseAction } from '@ansyn/menu-items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(store: Store<any>) {
    store.dispatch(new LoadDefaultCaseAction());
  }
}
