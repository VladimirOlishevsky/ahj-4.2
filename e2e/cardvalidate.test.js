import puppetteer from 'puppeteer';

jest.setTimeout(300000); // default puppeteer timeout
describe('Test form', () => {
    let browser = null;
    let page = null;
    const baseUrl = 'http://localhost:9000/';
    beforeAll(async() => {
        browser = await puppetteer.launch({
            headless: false, // show gui
            slowMo: 100,
            devtools: true, // show devTools
        });
        page = await browser.newPage();
    });
    afterAll(async() => {
        await browser.close();
    });
    // test code here (next page)
    describe('Test form', () => {
        test('should add .valid class for valid inn', async() => {
            await page.goto('http://google.com');
            const form = await page.$('[data-widgets=credit-card-validator]');
            const input = await form.$('[data-name=input-number]');
            await input.type('5469550044928767');
            const submit = await form.$('[class=card-validator__submit]');
            submit.click();
            await page.waitForSelector('[class=card-validator__valid');
        });
    });
});