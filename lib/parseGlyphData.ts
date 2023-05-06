import {Config} from '../types/Config';
import {GlyphData} from '../types/GlyphData';
import {Operator} from '../types/Operator';

export function parseGlyphData(x: string, {def = {}}: Config = {}): GlyphData {
    let value: string[];
    let op: Operator | undefined = undefined;

    if (x.length > 2 && x.includes(' '))
        [op, ...value] = x.split(' ') as [Operator, ...string[]];
    else value = [x];

    for (let i = 0; i < value.length; i++) {
        if (value[i].startsWith('#')) {
            let groupName = value[i].slice(1);

            if (groupName in def)
                value.splice(i, 1, ...def[groupName]);
        }
    }

    return {value, op};
}
