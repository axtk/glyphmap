import {TransformMap} from './TransformMap';

export type Config = {
    def?: Record<string, string[]>;
    ignore?: string[];
    map?: TransformMap;
    strictCase?: boolean;
};
