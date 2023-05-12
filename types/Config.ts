import {TransformMap} from './TransformMap';

export type Config = {
    name?: string;
    description?: string;
    def?: Record<string, string[]>;
    ignore?: string[];
    map?: TransformMap;
    strictCase?: boolean;
};
