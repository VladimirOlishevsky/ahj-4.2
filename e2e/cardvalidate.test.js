import puppetteer from 'puppeteer';

const childProcess = require('child_process');

const server = childProcess.fork(`${__dirname}/test-server.js`);

jest.setTimeout(30000); // default puppeteer timeout
describe('Test form', () => {
    let browser = null;
    let page = null;
    const baseUrl = 'http://localhost:9999';
    beforeAll(async() => {
        await new Promise((resolve, reject) => {
            server.on('error', () => {
                reject();
            });
            server.on('message', (message) => {
                if (message === 'ok') {
                    resolve();
                }
            });
        });
        browser = await puppetteer.launch({
            headless: false, // show gui
            slowMo: 100,
            devtools: true, // show devTools
        });
        page = await browser.newPage();
    });
    afterAll(async() => {
        await browser.close();
        server.kill();
    });
    // test code here (next page)
    test('test form', async() => {
        await page.goto(baseUrl);
        const form = await page.$('[data-widgets=credit-card-validator]');
        const input = await form.$('[data-name=input-number]');
        await input.type('5469550044928767');
        const submit = await form.$('.card-validator__submit');
        submit.click();
        await page.waitForSelector('.card-validator__valid');

    });
});