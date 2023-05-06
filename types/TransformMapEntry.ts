type SingleValueTransformMapEntry = {
    origin: string;
    from?: string;
    to: string;
};

type MultipleValueTransformMapEntry = {
    origin: string;
    from: (string | string[])[];
    to: (string | string[])[];
};

export type TransformMapEntry =
    | SingleValueTransformMapEntry
    | MultipleValueTransformMapEntry;
