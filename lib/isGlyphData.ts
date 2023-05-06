import {GlyphData} from '../types/GlyphData';

export function isGlyphData(x: unknown): x is GlyphData {
    return x !== null && typeof x === 'object' && 'value' in x && Array.isArray(x.value);
}
