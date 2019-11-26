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

  addCustomLayer() {
    const tempLayer: FeatureCollection = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [
                  34.42180056333462,
                  31.522542081228224
                ],
                [
                  34.428280718706475,
                  31.522570338338216
                ],
                [
                  34.428303923220646,
                  31.51724888624478
                ],
                [
                  34.42182376784878,
                  31.517220629134776
                ],
                [
                  34.42180056333462,
                  31.522542081228224
                ]
              ]
            ]
          },
          properties: {
            id: '896fd040-2c63-d98d-66f9-36c0e612edd4',
            style: {
              opacity: 1,
              initial: {
                fill: '#e01818',
                stroke: '#27b2cf',
                'stroke-width': 1,
                'fill-opacity': 0.4,
                'stroke-opacity': 0,
                'marker-size': 'medium',
                'marker-color': '#ffffff',
                label: {
                  overflow: true,
                  font: '27px Calibri,sans-serif',
                  stroke: '#000',
                  fill: 'white'
                }
              }
            },
            showMeasures: true,
            label: '',
            icon: '',
            undeletable: false,
            mode: 'Rectangle'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [
                  34.4365097521911,
                  31.529277606314242
                ],
                [
                  34.43640632078638,
                  31.53032776298979
                ],
                [
                  34.4361000013831,
                  31.531337562733228
                ],
                [
                  34.43560256566414,
                  31.53226819950672
                ],
                [
                  34.43493312980522,
                  31.53308390946097
                ],
                [
                  34.43411741985097,
                  31.533753345319894
                ],
                [
                  34.433186783077474,
                  31.53425078103885
                ],
                [
                  34.43217698333404,
                  31.53455710044213
                ],
                [
                  34.43112682665849,
                  31.53466053184685
                ],
                [
                  34.430076669982945,
                  31.53455710044213
                ],
                [
                  34.42906687023951,
                  31.53425078103885
                ],
                [
                  34.42813623346601,
                  31.533753345319894
                ],
                [
                  34.42732052351176,
                  31.53308390946097
                ],
                [
                  34.42665108765284,
                  31.53226819950672
                ],
                [
                  34.42615365193388,
                  31.531337562733228
                ],
                [
                  34.4258473325306,
                  31.53032776298979
                ],
                [
                  34.425743901125884,
                  31.529277606314242
                ],
                [
                  34.4258473325306,
                  31.528227449638695
                ],
                [
                  34.42615365193388,
                  31.527217649895256
                ],
                [
                  34.42665108765284,
                  31.526287013121763
                ],
                [
                  34.42732052351176,
                  31.525471303167514
                ],
                [
                  34.42813623346601,
                  31.52480186730859
                ],
                [
                  34.42906687023951,
                  31.524304431589634
                ],
                [
                  34.430076669982945,
                  31.523998112186355
                ],
                [
                  34.43112682665849,
                  31.523894680781634
                ],
                [
                  34.43217698333404,
                  31.523998112186355
                ],
                [
                  34.433186783977474,
                  31.524304431589634
                ],
                [
                  34.433186783077474,
                  31.524304431589634
                ],
                [
                  34.43411741985097,
                  31.52480186730859
                ],
                [
                  34.43493312980522,
                  31.525471303167514
                ],
                [
                  34.43560256566414,
                  31.526287013121763
                ],
                [
                  34.4361000013831,
                  31.527217649895256
                ],
                [
                  34.43640632078638,
                  31.528227449638695
                ],
                [
                  34.4365097521911,
                  31.529277606314242
                ]
              ]
            ]
          },
          properties: {
            id: '6ebb5652-e21e-59b6-e067-3dd025e5ad15',
            style: {
              opacity: 1,
              initial: {
                fill: '#ffffff',
                stroke: '#272fcf',
                'stroke-width': 7,
                'fill-opacity': 0,
                'stroke-opacity': 1,
                'marker-size': 'medium',
                'marker-color': '#ffffff',
                label: {
                  overflow: true,
                  font: '27px Calibri,sans-serif',
                  stroke: '#000',
                  fill: 'white'
                }
              }
            },
            showMeasures: false,
            label: 'בדיקה',
            icon: '',
            undeletable: false,
            mode: 'Circle'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              34.43481913393523,
              31.5219079757809926
            ]
          },
          properties: {
            id: '7537abd0-8040-8887-e925-0f958f5c7e30',
            style: {
              opacity: 1,
              initial: {
                fill: '#d61414',
                stroke: '#07bde4',
                'stroke-width': 5,
                'fill-opacity': 0.4,
                'stroke-opacity': 1,
                'marker-size': 'medium',
                'marker-color': '#ffffff',
                label: {
                  overflow: true,
                  font: '27px Calibri,sans-serif',
                  stroke: '#000',
                  fill: 'white'
                }
              }
            },
            showMeasures: true,
            label: '1',
            icon: '',
            undeletable: false,
            mode: 'Point'
          }
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [
                34.41783180455111,
                31.527245507961897
              ],
              [
                34.418624422348394,
                31.512786355713917
              ],
              [
                34.44149097230216,
                31.51451686527523
              ],
              [
                34.44489428733085,
                31.531225933259076
              ]
            ]
          },
          properties: {
            id: 'c1d67534-641e-5d19-68f0-fceaea457d44',
            style: {
              opacity: 1,
              initial: {
                fill: '#ffffff',
                stroke: '#27c72c',
                'stroke-width': 5,
                'fill-opacity': 0.4,
                'stroke-opacity': 1,
                'marker-size': 'medium',
                'marker-color': '#ffffff',
                label: {
                  overflow: true,
                  font: '27px Calibri,sana-serif',
                  stroke: '#000',
                  fill: 'white'
                }
              }
            },
            showMeasures: true,
            label: 'שששש',
            icon: '',
            undeletable: false,
            mode: 'LineString'
          }
        }
      ]
    };
    this.layerId = this.ansynApi.insertLayer('test', tempLayer);
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
