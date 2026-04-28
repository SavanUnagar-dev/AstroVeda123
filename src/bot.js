const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { userAgents } = require('./utils');
require('dotenv').config();

puppeteer.use(StealthPlugin());

async function startTraffic(proxyUrl) {
   const browser = await puppeteer.launch({
    headless: "new",
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null, // Linux mate
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
    ]
});

    try {
        const page = await browser.newPage();
        
        // Random User-Agent set karvu
        const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];
        await page.setUserAgent(randomUA);

        console.log(`Visiting: ${process.env.SITE_URL} with Proxy...`);
        await page.goto(process.env.SITE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

        // 1. Human-like Scroll
        await page.mouse.wheel({ deltaY: Math.floor(Math.random() * 600) + 200 });
        await new Promise(r => setTimeout(r, 4000));

        // 2. Random Click (Popunder trigger karva mate)
        // Body ma game tya click karse
        const dimensions = await page.evaluate(() => {
            return { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight };
        });
        
        const x = Math.floor(Math.random() * dimensions.width);
        const y = Math.floor(Math.random() * dimensions.height);
        
        await page.mouse.click(x, y);
        console.log("Target clicked! Popunder should open.");

        // 3. Ad-Stay Time (30 second wait karo jethi impression count thay)
        await new Promise(r => setTimeout(r, 30000));

    } catch (err) {
        console.error("Error in bot:", err.message);
    } finally {
        await browser.close();
    }
}

module.exports = { startTraffic };