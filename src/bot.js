const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { userAgents } = require('./utils');
require('dotenv').config();

puppeteer.use(StealthPlugin());

async function startTraffic() {
    const browser = await puppeteer.launch({
        headless: false, 
        args: ['--no-sandbox', '--window-size=1280,800']
    });

    try {
        const page = await browser.newPage();
        const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
        await page.setUserAgent(randomUA);

        console.log("Adsterra Direct Link visit chalu chhe...");
        await page.goto(process.env.SITE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // Human behavior: Scroll ane Random Click
        await page.evaluate(() => window.scrollBy(0, 500));
        await new Promise(r => setTimeout(r, 3000));
        await page.mouse.click(600, 400); 

        // 2 Minute wait (High CPM mate)
        console.log("Waiting 2 minutes for high quality impression...");
        await new Promise(r => setTimeout(r, 120000));

        console.log("Visit Success!");
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await browser.close();
    }
}

module.exports = { startTraffic };