import {getNormalizedMap} from '../lib/getNormalizedMap';
import type {Config} from '../types/Config';

export function transform(input: string, config: Config = {}) {
    if (typeof input !== 'string')
        throw new Error('Input should be a string');

    let inputGlyphs = input.split('');
    let outputGlyphs = inputGlyphs.slice();

    let isUpperCase = new Array<boolean>(inputGlyphs.length).fill(false)
    let isSingleGlyph = new Array<boolean>(inputGlyphs.length).fill(false);
    let transformed = new Array<boolean>(inputGlyphs.length).fill(false);

    let map = getNormalizedMap(config);

    if (map.length !== 0) {
        let {ignore = []} = config;

        let normalize = (s: string | undefined) => s && !config.strictCase ? s.toLowerCase() : s;
        let ignoredGlyphs = ignore.map(normalize);

        for (let i = 0; i < inputGlyphs.length; i++) {
            let inputGlyph = normalize(inputGlyphs[i]);

            if (ignoredGlyphs.includes(inputGlyph))
                continue;

            let lowerCaseGlyph = inputGlyphs[i].toLowerCase();
            let upperCaseGlyph = inputGlyphs[i].toUpperCase();

            isUpperCase[i] = upperCaseGlyph !== lowerCaseGlyph && inputGlyphs[i] === upperCaseGlyph;

            for (let {key, from: source, to: target} of map) {
                if (inputGlyph !== key || transformed[i])
                    continue;

                let inputGlyphIndex = source.findIndex(item => {
                    return item.value.length === 1 && item.value[0] === inputGlyph;
                });

                if (inputGlyphIndex === -1)
                    continue;

                let relevantInputGlyphs: [string | undefined, number][] = [];

                // look behind
                let j = i;

                while (relevantInputGlyphs.length < inputGlyphIndex + 1) {
                    let glyph = normalize(inputGlyphs[j]);

                    if (!ignoredGlyphs.includes(glyph))
                        relevantInputGlyphs.push([glyph, j]);

                    j--;
                }

                relevantInputGlyphs.reverse();

                // look ahead
                j = i + 1;

                while (relevantInputGlyphs.length < source.length) {
                    let glyph = normalize(inputGlyphs[j]);

                    if (!ignoredGlyphs.includes(glyph))
                        relevantInputGlyphs.push([glyph, j]);

                    j++;
                }

                let matches = relevantInputGlyphs.length !== 0;

                for (let n = 0; n < relevantInputGlyphs.length && matches; n++) {
                    let [glyph] = relevantInputGlyphs[n];
                    let sourceItem = source[n];

                    if (!sourceItem) {
                        matches = false;
                        break;
                    }

                    let {value, op} = sourceItem;
                    let includesGlyph = glyph !== undefined && value.includes(glyph);

                    matches &&=
                        (op === 'NOT' ? !includesGlyph : includesGlyph) &&
                        (op !== 'OTHER' || inputGlyph !== glyph);
                }

                if (!matches)
                    continue;

                for (let n = 0; n < source.length; n++) {
                    let glyphIndex = relevantInputGlyphs[n][1];
                    let targetValue = target[n].value[0];

                    if (targetValue !== undefined && targetValue !== '~') {
                        outputGlyphs[glyphIndex] = targetValue;
                        isSingleGlyph[glyphIndex] = targetValue.length === 1 ||
                            target[n].op === 'GLYPH';
                        transformed[glyphIndex] = true;
                    }
                }
            }
        }

        for (let i = 0; i < outputGlyphs.length; i++) {
            if (!transformed[i] || !isUpperCase[i] || !outputGlyphs[i])
                continue;

            if (
                isSingleGlyph[i] ||
                (isUpperCase[i - 1] && isUpperCase[i + 1]) ||
                (isUpperCase[i - 2] && isUpperCase[i - 1]) ||
                (isUpperCase[i + 1] && isUpperCase[i + 2])
            )
                outputGlyphs[i] = outputGlyphs[i].toUpperCase();
            else
                outputGlyphs[i] = outputGlyphs[i][0].toUpperCase() + outputGlyphs[i].slice(1);
        }
    }

    let output = outputGlyphs.join('');

    return {
        input,
        inputGlyphs,
        output,
        outputGlyphs,
        isUpperCase,
    };
}
