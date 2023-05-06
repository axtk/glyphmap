import type {Config} from '../types/Config';
import type {TransformMapEntry} from '../types/TransformMapEntry';
import type {NormalizedTransformMapEntry} from '../types/NormalizedTransformMapEntry';
import type {GlyphData} from '../types/GlyphData';
import {parseGlyphData} from './parseGlyphData';
import {isGlyphData} from './isGlyphData';

function toGlyphData(
    value: string | (string | string[])[] | GlyphData[],
    config: Config,
): GlyphData[] {
    let output: GlyphData[];

    if (Array.isArray(value)) {
        output = [];

        for (let valueItem of value) {
            if (isGlyphData(valueItem))
                output.push(valueItem);
            else if (Array.isArray(valueItem))
                output.push({
                    value: valueItem,
                });
            else output.push(parseGlyphData(valueItem, config));
        }
    }
    else output = [parseGlyphData(value, config)];

    if (!config.strictCase) {
        for (let item of output)
            item.value = item.value.map(s => s.toLowerCase());
    }

    return output;
}

export function getNormalizedMapEntry(
    entry: TransformMapEntry,
    config: Config,
): NormalizedTransformMapEntry {
    return {
        origin: entry.origin,
        from: toGlyphData(entry.from ?? entry.origin, config),
        to: toGlyphData(entry.to, config),
    };
}
