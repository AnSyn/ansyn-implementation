import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { ICaseMapState } from '@ansyn/core';
import { ImageryMapSource } from '@ansyn/imagery';
import { OpenLayersMapSourceProvider, OpenLayersMap } from '@ansyn/plugins';

export const OpenLayerOSM_customSourceProviderSourceType = 'OSM_Custom';


@ImageryMapSource({
  sourceType: OpenLayerOSM_customSourceProviderSourceType,
  supported: [OpenLayersMap]
})
export class OpenLayerOSMCustomSourceProvider extends OpenLayersMapSourceProvider {
  create(metaData: ICaseMapState): any[] {
    const osmLayer = new TileLayer({
      source: new OSM()
    });

    const source = new OSM(<any>{
      attributions: [
        'All maps © <a href="http://www.openseamap.org/">OpenSeaMap</a>',
        OSM.ATTRIBUTION
      ],
      opaque: false,
      url: 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'
    });

    const openSeaMapLayer = new TileLayer({ source });
    return [osmLayer, openSeaMapLayer];
  }
}
