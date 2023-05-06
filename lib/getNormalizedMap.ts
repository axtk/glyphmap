import type {Config} from '../types/Config';
import type {NormalizedTransformMap} from '../types/NormalizedTransformMap';
import {getNormalizedMapEntry} from './getNormalizedMapEntry';

export function getNormalizedMap(config: Config): NormalizedTransformMap {
    return (config.map ?? []).map(entry => getNormalizedMapEntry(entry, config));
}
