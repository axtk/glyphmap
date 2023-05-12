type SingleValueTransformMapEntry = {
    /** A character to be transformed. */
    key: string;
    /** A target character. */
    to: string;
};

type MultipleValueTransformMapEntry = {
    /** A character to be transformed. */
    key: string;
    /** An environment of the transformed character. */
    from: (string | string[])[];
    /** A transform map for the character and its neighbors. */
    to: string[];
};

export type TransformMapEntry =
    | SingleValueTransformMapEntry
    | MultipleValueTransformMapEntry;
