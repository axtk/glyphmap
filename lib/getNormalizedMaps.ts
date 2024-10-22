import type {Config} from '../types/Config';
import type {NormalizedTransformMap} from '../types/NormalizedTransformMap';
import type {TransformMap} from '../types/TransformMap';
import {getNormalizedMapEntry} from './getNormalizedMapEntry';
import {isMapArray} from './isMapArray';

export function getNormalizedMaps(config: Config): NormalizedTransformMap[] {
    let {map = []} = config;
    let transformMaps: TransformMap[] = isMapArray(map) ? map : [map];

    return transformMaps.map(item => {
        return item.map(entry => getNormalizedMapEntry(entry, config));
    });
}
