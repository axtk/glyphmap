type SingleValueTransformMapEntry = {
    key: string;
    from?: string;
    to: string;
};

type MultipleValueTransformMapEntry = {
    key: string;
    from: (string | string[])[];
    to: (string | string[])[];
};

export type TransformMapEntry =
    | SingleValueTransformMapEntry
    | MultipleValueTransformMapEntry;
