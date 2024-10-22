#!/usr/bin/env node
import {readFile, writeFile} from 'node:fs/promises';
import {fetchContent} from '../lib/fetchContent';
import {transform} from '../src/transform';
import type {Config} from '../types/Config';

type Options = {
    config?: string;
    text?: string;
    inputFile?: string;
    outputFile?: string;
};

let args = process.argv.slice(2);
let options: Options = {};

for (let i = 0; i < args.length; i++) {
    if (i === 0 && (!args[i].startsWith('-') || args[i].length > 2))
        options.text = args[i];

    switch (args[i]) {
        case '-c':
            options.config = args[i + 1];
            break;
        case '-i':
            options.inputFile = args[i + 1];
            break;
        case '-o':
            options.outputFile = args[i + 1];
            break;
    }
}

async function getConfig() {
    let {config} = options;

    if (!config)
        return;

    if (/^https?:\/\//.test(config))
        return (await fetchContent(config, 'json')) as Config;

    let content = (await readFile(config)).toString();

    return JSON.parse(content) as Config;
}

async function getInput() {
    let {text, inputFile} = options;

    if (text)
        return text;

    if (inputFile)
        return (await readFile(inputFile)).toString();
}

function showHelp() {
    console.log();
    console.log('npx glyphmap <text> -c <config_location> [-o <output_path>]');
    console.log('npx glyphmap -i <input_path> -c <config_location> [-o <output_path>]');
    console.log();
    console.log('<config_location> is either a file path or a URL.');
}

(async () => {
    let input = await getInput();

    if (!input) {
        console.error('Error: No input.');
        showHelp();

        return;
    }

    let config = await getConfig();

    if (!config) {
        console.error('Error: No config.');
        showHelp();

        return;
    }

    let result = transform(input, config);

    if (options.outputFile)
        await writeFile(options.outputFile, result.output);
    else console.log(result.output);
})();
