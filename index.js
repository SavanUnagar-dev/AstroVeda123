const { startTraffic } = require('./src/bot');

async function runInfinite() {
    for (let i = 0; i < 1000; i++) {
        console.log(`--- Visit Number: ${i + 1} ---`);
        
        // Dar vakhat navi proxy levu hoy to ahi list mathi random select kari shakay
        await startTraffic(TEST_PROXY); 
        
        // Be visit vachche random gap rakho jethi HilltopAds ne shanka na jay
        const waitTime = Math.floor(Math.random() * (60000 - 30000) + 30000); // 30-60 sec wait
        console.log(`Waiting for ${waitTime/1000}s before next visit...`);
        await new Promise(r => setTimeout(r, waitTime));
    }
}

runInfinite();