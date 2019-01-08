import {Component} from '@angular/core';
import {AnsynApi} from '@ansyn/ansyn';
import {LayoutKey, layoutOptions} from '@ansyn/core';
import {FeatureCollection} from 'geojson';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

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

    this.getFeatureCollectionFromFile().subscribe(response => {
      this.featureOptions = response.featureCollection;
    });
    this.ansynApi.getActiveCenter$.subscribe((center) => {
      console.log(center);
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
    return this.http.get('assets/featureCollection.json');
  }

  setPositionWithRadius() {
    this.ansynApi.setMapPositionByRadius({type: 'Point', coordinates: [-117.914, 33.8117]}, 100, true);
  }

  clearOverlays() {
    this.ansynApi.setOverlays([]);
  }
}
