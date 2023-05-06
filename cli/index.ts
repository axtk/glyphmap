#!/usr/bin/env node
import {readFileSync, writeFileSync} from 'node:fs';
import fetch from 'node-fetch';
import type {Config} from '../types/Config';
import {transform} from '../src/transform';

type Options = {
    config?: string;
    text?: string;
    inputFile?: string;
    outputFile?: string;
};

const args = process.argv.slice(2);
const options: Options = {};

for (let i = 0; i < args.length; i++) {
    if (i === 0 && (args[i][0] !== '-' || args[i].length > 2))
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

    if (/^https?:\/\//.test(config)) {
        let response = await fetch(config);
        return (await response.json()) as Config;
    }

    return JSON.parse(readFileSync(config).toString()) as Config;
}

function getInput() {
    let {text, inputFile} = options;

    if (text)
        return text;

    if (inputFile)
        return readFileSync(inputFile).toString();
}

function showHelp() {
    console.log();
    console.log('npx glyphmap <text> -c <config_location> [-o <output_path>]');
    console.log('npx glyphmap -i <input_path> -c <config_location> [-o <output_path>]');
    console.log();
    console.log('<config_location> is either a file path or a URL.');
}

(async () => {
    let input = getInput();

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
        writeFileSync(options.outputFile, result.output);
    else console.log(result.output);
})();
