import {Component} from '@angular/core';
import {AnsynApi} from '@ansyn/ansyn';
import {LayoutKey, layoutOptions, IOverlay, GeoRegisteration} from '@ansyn/core';
import {FeatureCollection} from 'geojson';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as momentNs from 'moment';
import {take, tap} from 'rxjs/operators';

const moment = momentNs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  layoutKeys: LayoutKey[] = Array.from(layoutOptions.keys());
  featureOptions: FeatureCollection<any>;

  overlays = [
    this.overlay('000', 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Reeipublic_Banana.gif',
      576, 1024, this.calcDate(0)),
    this.overlay('111', 'https://image.shutterstock.com/image-vector/cool-comic-book-bubble-text-450w-342092249.jpg',
      470, 450, this.calcDate(1)),
    this.overlay('222', 'https://imgs.xkcd.com/comics/online_communities.png',
      1024, 968, this.calcDate(2)),
    this.overlay('333', 'https://image.shutterstock.com/z/stock-vector-cool-milkshake-190524542.jpg',
      1600, 1500, this.calcDate(3))
  ];

  calcDate(days: number) {
    return moment().subtract(days, 'day').toDate();
  }

  overlay(id: string, imageUrl: string, imageWidth: number, imageHeight: number, date: Date): IOverlay {
    const left = -117.94,
      top = 33.82,
      width = 0.05,
      height = 0.02,
      right = left + width * Math.random(),
      bottom = top - height * Math.random();
    return {
      name: id,
      id: id,
      photoTime: date.toISOString(),
      date: date,
      azimuth: 0,
      isGeoRegistered: GeoRegisteration.notGeoRegistered,
      sourceType: 'STATIC_IMAGE',
      tag: {
        imageData: {
          imageWidth: imageWidth,
          imageHeight: imageHeight
        }
      },
      footprint: {
        type: 'MultiPolygon',
        coordinates: [[[
          [left, top],
          [right, top],
          [right, bottom],
          [left, bottom],
          [left, top]
        ]
        ]
        ]
      },
      baseImageUrl: '',
      imageUrl: imageUrl,
      thumbnailUrl: imageUrl,
      sensorName: 'mySensorName',
      sensorType: 'mySensorType',
      bestResolution: 1,
      cloudCoverage: 1
    };
  }

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

  setOverlays() {
    this.ansynApi.setOverlays(this.overlays);
  }

  displayOverlay() {
    this.ansynApi.displayOverLay(this.overlays[0]);
  }

  displayTwoOverlays() {
    this.ansynApi.changeMapLayout('layout2').pipe(
      tap(() => {
        this.ansynApi.setOverlays(this.overlays);
        this.ansynApi.displayOverLay(this.overlays[1], 1);
        this.ansynApi.displayOverLay(this.overlays[2], 0);
      }),
      take(1)
    ).subscribe();
  }
}
