const { startTraffic } = require('./src/bot');

async function runInfinite() {
    for (let i = 0; i < 21; i++) {
        console.log(`--- Visit Number: ${i + 1} ---`);
        
        await startTraffic(null); // Proxy નથી વાપરવો તો null પાસ કર
        
        const waitTime = Math.floor(Math.random() * (60000 - 30000) + 30000);
        console.log(`Waiting for ${waitTime/1000}s before next visit...`);
        await new Promise(r => setTimeout(r, waitTime));
    }
}

runInfinite();