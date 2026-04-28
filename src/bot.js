const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { userAgents } = require('./utils');
require('dotenv').config();

puppeteer.use(StealthPlugin());

async function startTraffic(proxyUrl) {
    const browser = await puppeteer.launch({
        headless: "new",
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
    });

    try {
        const page = await browser.newPage();
        const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
        await page.setUserAgent(randomUA);

        console.log(`Visiting: ${process.env.SITE_URL}`);
        await page.goto(process.env.SITE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // 1. Scroll logic
        for (let i = 0; i < 5; i++) {
            await page.mouse.wheel({ deltaY: 400 });
            await new Promise(r => setTimeout(r, 2000)); 
        }

        // 2. Popunder click
        const dimensions = await page.evaluate(() => {
            return { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight };
        });
        await page.mouse.click(Math.floor(Math.random() * dimensions.width), Math.floor(Math.random() * dimensions.height));
        console.log("Target clicked!");

        // 3. Internal link click
        try {
            const links = await page.$$('a');
            if (links.length > 0) {
                const randomLink = links[Math.floor(Math.random() * Math.min(links.length, 10))];
                await randomLink.click();
                console.log("Clicked internal link.");
            }
        } catch (e) { console.log("No link found."); }

        // 4. Random Wait (60-90 sec)
        const randomWait = Math.floor(Math.random() * (90000 - 60000) + 60000);
        console.log(`Waiting for ${randomWait/1000}s...`);
        await new Promise(r => setTimeout(r, randomWait));

    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await browser.close();
    }
}

module.exports = { startTraffic };