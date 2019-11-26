import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {AnsynApi, GeoRegisteration, IOverlay, RegionContainment} from '@ansyn/ansyn';
import {FeatureCollection} from 'geojson';
import * as momentNs from 'moment';
import {Observable, Subscription} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {LayoutKey, layoutOptions} from '@ansyn/map-facade';
import * as packageJson from 'root/package.json';


const moment = momentNs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  layoutKeys: LayoutKey[] = Array.from(layoutOptions.keys());
  featureOptions: FeatureCollection<any>;
  mouseShadowOutputSubscription: Subscription;
  menuCollapsed = false;
  footerCollapsed = false;

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
  version: string = (<any>packageJson).dependencies['@ansyn/ansyn'].replace(/[/^/~]/g, '');
  layerId: string;
  needToShowLayer = true;

  constructor(protected ansynApi: AnsynApi,
              private http: HttpClient) {

    this.getFeatureCollectionFromFile().subscribe(response => {
      this.featureOptions = response.featureCollection;
    });

    this.ansynApi.onReady.subscribe((ready) => {
      console.log('ready: ' + ready);
    });
  }

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
      containedInSearchPolygon: RegionContainment.unknown,
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

  getMouseShadowPoint() {
    if (this.mouseShadowOutputSubscription) {
      this.mouseShadowOutputSubscription.unsubscribe();
      this.mouseShadowOutputSubscription = undefined;
    } else {
      this.mouseShadowOutputSubscription = this.ansynApi.onShadowMouseProduce$.pipe(
        tap(coordinate => console.log('Shadow mouse: ' + coordinate))
      ).subscribe();
    }
  }

  setMouseShadowPoint() {
    this.ansynApi.setOutSourceMouseShadow({type: 'Point', coordinates: [-122.3857620823084, 37.62041171284878]});
  }

  collapseFooter() {
    this.footerCollapsed = !this.footerCollapsed;
    this.ansynApi.collapseFooter(this.footerCollapsed);
  }

  collapseMenu() {
    this.menuCollapsed = !this.menuCollapsed;
    this.ansynApi.collapseMenu(this.menuCollapsed);
  }

  collapseAll() {
    this.collapseMenu();
    this.collapseFooter();
  }

  addCustomLayer(isEditable: boolean = true) {
    const layer: FeatureCollection = {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'geometry': { 'type': 'Point', 'coordinates': [-122.3865658852983, 37.62603244149734] },
        'properties': {
          'id': 'dcfa10f2-7b49-3151-5126-954c1a3305e0',
          'style': {
            'opacity': 1,
            'initial': {
              'fill': '#ffffff',
              'stroke': '#27b2cf',
              'stroke-width': 1,
              'fill-opacity': 0.4,
              'stroke-opacity': 1,
              'marker-size': 'medium',
              'marker-color': '#ffffff',
              'label': {
                'overflow': true,
                'font': '27px Calibri,sans-serif',
                'stroke': '#000',
                'fill': 'white'
              }
            }
          },
          'showMeasures': false,
          'label': '',
          'icon': '',
          'undeletable': false,
          'mode': 'Point'
        }
      }, {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [[-122.38998010946246, 37.62742342165281], [-122.39137109122585, 37.62379844287092],
            [-122.39006441323906, 37.62198595347998],
            [-122.3879568670617, 37.62232316054677]]
        },
        'properties': {
          'id': 'c9bd6965-8b3c-143c-4ce3-381753621935',
          'style': {
            'opacity': 1,
            'initial': {
              'fill': '#ffffff',
              'stroke': '#27b2cf',
              'stroke-width': 1,
              'fill-opacity': 0.4,
              'stroke-opacity': 1,
              'marker-size': 'medium',
              'marker-color': '#ffffff',
              'label': {
                'overflow': true,
                'font': '27px Calibri,sans-serif',
                'stroke': '#000',
                'fill': 'white'
              }
            }
          },
          'showMeasures': false,
          'label': '',
          'icon': '',
          'undeletable': false,
          'mode': 'LineString'
        }
      }, {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [[[-122.37396275851451, 37.6248522159596], [-122.37122294848395, 37.619962707863365],
            [-122.37792494597112, 37.62042636898715], [-122.37944237857565, 37.62392489531998], [-122.37396275851451, 37.6248522159596]]]
        },
        'properties': {
          'id': '64c65741-d1e4-7faa-2a5e-65f4e00a7fc7',
          'style': {
            'opacity': 1,
            'initial': {
              'fill': '#af0505',
              'stroke': '#27b2cf',
              'stroke-width': 7,
              'fill-opacity': 0.4,
              'stroke-opacity': 0,
              'marker-size': 'medium',
              'marker-color': '#af0505',
              'label': {
                'overflow': true,
                'font': '27px Calibri,sans-serif',
                'stroke': '#000',
                'fill': 'white'
              }
            }
          },
          'showMeasures': false,
          'label': '',
          'icon': '',
          'undeletable': false,
          'mode': 'Polygon'
        }
      }, {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': [[[-122.38508709430224, 37.621606594524884], [-122.38516977341148, 37.622446049608556],
            [-122.38541463342742, 37.62325324490413], [-122.38581226451696, 37.623997160349084], [-122.38634738594031, 37.624649207690055],
            [-122.38699943328128, 37.62518432911341], [-122.38774334872623, 37.62558196020294], [-122.38855054402181, 37.625826820218876],
            [-122.38938999910548, 37.625909499328124], [-122.39022945418914, 37.625826820218876], [-122.39103664948472, 37.62558196020294],
            [-122.39178056492968, 37.62518432911341], [-122.39243261227064, 37.624649207690055], [-122.392967733694, 37.623997160349084],
            [-122.39336536478353, 37.62325324490413], [-122.39361022479947, 37.622446049608556], [-122.39369290390871, 37.621606594524884],
            [-122.39361022479947, 37.62076713944121], [-122.39336536478353, 37.61995994414564], [-122.392967733694, 37.619216028700684],
            [-122.39243261227064, 37.61856398135971], [-122.39178056492968, 37.61802885993636], [-122.39103664948472, 37.617631228846825],
            [-122.39022945418914, 37.61738636883089], [-122.38938999910548, 37.617303689721645], [-122.38855054402181, 37.61738636883089],
            [-122.38774334872623, 37.617631228846825], [-122.38699943328128, 37.61802885993636], [-122.38634738594031, 37.61856398135971],
            [-122.38581226451696, 37.619216028700684], [-122.38541463342742, 37.61995994414564], [-122.38516977341148, 37.62076713944121],
            [-122.38508709430224, 37.621606594524884]]]
        },
        'properties': {
          'id': 'bf8fa21d-d98e-40a1-7c33-669016a18c88',
          'style': {
            'opacity': 1,
            'initial': {
              'fill': '#af0505',
              'stroke': '#0498b6',
              'stroke-width': 7,
              'fill-opacity': 0,
              'stroke-opacity': 1,
              'marker-size': 'medium',
              'marker-color': '#af0505',
              'label': {
                'overflow': true,
                'font': '27px Calibri,sans-serif',
                'stroke': '#000',
                'fill': 'white'
              }
            }
          },
          'showMeasures': false,
          'label': 'test',
          'icon': '',
          'undeletable': false,
          'mode': 'Circle'
        }
      }]
    };
    this.layerId = this.ansynApi.insertLayer(`test${!isEditable ? '_nonedit' : ''}`, layer, isEditable);
  }


  removeLayer() {
    this.ansynApi.removeLayer(this.layerId);
    this.layerId = null;
  }

  showLayer() {
    this.needToShowLayer = !this.needToShowLayer;
    this.ansynApi.showLayer(this.layerId, this.needToShowLayer);
  }
}
