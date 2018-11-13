import { Component } from '@angular/core';
import { AnsynApi } from '@ansyn/ansyn';
import { LayoutKey, layoutOptions } from '@ansyn/core';
import { FeatureCollection, Feature } from 'geojson';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  layoutKeys: LayoutKey[] = Array.from(layoutOptions.keys());
  featureOptions: FeatureCollection<any>;

  constructor(protected ansynApi: AnsynApi,
    private http: HttpClient) {

    this.getFeatureCollectionFromFile().subscribe(res => {
      console.log(res);
    this.featureOptions = res.featureCollection;
    });
    this.ansynApi.getActiveCenter$.subscribe((aaa) => {
      console.log(aaa);
    });
  }

  setFeatureCollection(): void {
    this.ansynApi.setAnnotations(this.featureOptions);
  }

  deleteFeatureCollection(): void {
    this.ansynApi.deleteAllAnnotations();
  }

  setLayout(layout: LayoutKey): void {
    this.ansynApi.changeMapLayout(layout);
  }

  getFeatureCollectionFromFile(): Observable<any> {
    return this.http.get('assets/featureCollection.json')
  }
}
