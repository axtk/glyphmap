import {get as httpGet, STATUS_CODES} from 'node:http';
import {get as httpsGet} from 'node:https';

export function fetchContent(url: string, type?: 'text' | 'json') {
    return new Promise((resolve, reject) => {
        (url.startsWith('https:') ? httpsGet : httpGet)(url, res => {
            let {statusCode} = res, error;

            if (!statusCode)
                error = 'Unknown status';
            else if (statusCode !== 200)
                error = `${statusCode} ${STATUS_CODES[statusCode]}`;

            if (error) {
                res.resume();
                reject(new Error(`${error} - GET ${url}`));
            }

            res.setEncoding('utf8');

            let rawData = '';

            res.on('data', chunk => {
                rawData += chunk;
            });

            res.on('end', () => {
                if (type === 'json') {
                    try {
                        let parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    }
                    catch (error) {
                        reject(error);
                    }
                }
                else resolve(rawData);
            });
        })
        .on('error', error => {
            reject(error);
        });
    });
}
