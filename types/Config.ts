import {TransformMap} from './TransformMap';

export type Config = {
    name?: string;
    description?: string;
    /**
     * A definition map for character groups that can be referenced
     * from the transform map.
     *
     * @example
     * ```
     * def: {
     *   vowel: [
     *     'а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я',
     *   ],
     * },
     * map: [
     *   {
     *     key: 'й',
     *     from: ['#vowel', 'й', 'NOT #vowel'],
     *     to: ['~', 'i', '~'],
     *   },
     *   {
     *     key: 'и',
     *     from: ['OTHER #vowel', 'и'],
     *     to: ['~', 'í'],
     *   },
     * ],
     * ```
     */
    def?: Record<string, string[]>;
    /**
     * A list of characters to be disregarded when matching against
     * the transform map rules.
     *
     * @example
     * ```
     * // skip acute accents used for stress marks
     * ignore: ['\u0301'],
     * ```
     */
    ignore?: string[];
    /**
     * The transform map defines the way a certain character is mapped
     * to another and, optionally, defines the environment of the
     * character in which a certain rule is applicable.
     *
     * @see TransformMap
     */
    map?: TransformMap;
    /**
     * If set to `true`, the transform map will be handled as an exact
     * case-sensitive map. Otherwise (by default), the transform will
     * infer the character case from the input and assign it to the
     * target character.
     */
    strictCase?: boolean;
};
