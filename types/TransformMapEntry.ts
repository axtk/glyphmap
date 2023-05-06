type SingleValueTransformMapEntry = {
    from: string;
    to: string;
};

type MultipleValueTransformMapEntry = {
    from: (string | string[])[];
    to: (string | string[])[];
};

export type TransformMapEntry =
    | SingleValueTransformMapEntry
    | MultipleValueTransformMapEntry;
