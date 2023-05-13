# glyphmap

- Converts texts based on custom transliteration rulesets;
- Supports conditional conversion based on the environment of a character.

## Usage

### Import

Installation: `npm i glyphmap`

```ts
import {transform} from 'glyphmap';

let {output} = transform('<text>', config);
```

### Command-line interface

```
npx glyphmap <text> -c <config_location> [-o <output_path>]
npx glyphmap -i <input_path> -c <config_location> [-o <output_path>]
```

`<config_location>` is either a file path or a URL.

***Example***

```
npx glyphmap "привет" -c https://raw.githubusercontent.com/axtk/translit/master/configs/ru.json
> privet
```

Note that this package doesn't bring along specific rulesets. The URL in the example above is an external ruleset.

## Transform config

The following examples show parts of JSON configs with comments added here for simplicity which shouldn't be included in `.json` files (since comments are disallowed by the JSON format).

***Example 1***

```
{
  "map": [
    {
      // Maps "и" to "i"
      "key": "и",
      "to": "i",
    },
    {
      "key": "я",
      "to": "ja",
    }
  ]
}
```

***Example 2***

```
{
  "def": {
    "consonant": [
      "б", "в", "г", "д", "ж", "з", "й", "к", "л", "м", "н",
      "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ"
    ],
  },
  "map": [
    {
      "key": "я",
      // Matches "я" in "жя", "чя", "шя", or "йя".
      "from": [["ж", "ч", "ш", "й"], "я"],
      // `~` leaves the character ["ж", "ч", "ш", "й"] unchanged with
      // this particular rule, while "я" is mapped to "a".
      "to": ["~", "a"]
    },
    {
      "key": "я",
      // Matches "я" in "<consonant>я". `'#consonant'` refers to the
      // `consonant` entry of the config's `def` above, which simplifies
      // the reuse of character groups. Note that some consonants have
      // already been handled by the rule above, so this rule will not
      // be applied for those consonants allowing for cascadable rules
      // (the order of the rules matters).
      "from": ["#consonant", "я"],
      "to": ["~", "ia"]
    }
  ],
  // Disregards the listed characters when the environment of the input
  // characters is figured out. (In this example, it's the acute accent
  // used as a stress mark.)
  "ignore": ["\u0301"]
}
```

***Example 3***

```
{
  "def": {
    "vowel": [
      "а", "е", "ё", "и", "о", "у", "ы", "э", "ю", "я"
    ]
  },
  "map": [
    {
      "key": "и",
      // `NOT` negates the following character group.
      "from": ["и", "й", "NOT #vowel"],
      "to": ["í", "", "~"]
    },
    {
      "key": "и",
      // `OTHER` excludes the current `key` from the following group.
      "from": ["OTHER #vowel", "и"],
      "to": ["~", "í"]
    }
  ]
}
```
