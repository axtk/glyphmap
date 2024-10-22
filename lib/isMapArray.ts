import type {Config} from '../types/Config';
import type {TransformMap} from '../types/TransformMap';

export function isMapArray(map: Config['map']): map is TransformMap[] {
    return Array.isArray(map) && Array.isArray(map[0]);
}
