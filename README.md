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

Installation: `npm i -g glyphmap`

```
npx glyphmap <text> -c <config_location> [-o <output_path>]
npx glyphmap -i <input_path> -c <config_location> [-o <output_path>]
```

`<config_location>` is either a file path or a URL.

#### *Example*

```
npx glyphmap "привет" -c https://raw.githubusercontent.com/axtk/translit/master/configs/ru.json
> privet
```

Note that this package doesn't bring along specific rulesets. The URL in the example above is an external ruleset.
