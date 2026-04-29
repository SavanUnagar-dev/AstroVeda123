const { exec } = require('child_process');
const { startTraffic } = require('./src/bot');

function rotateVPN() {
    return new Promise((resolve) => {
        console.log("Changing IP via Windscribe...");
        // Pehla disconnect kari ne pachi US sathe jodo
        exec('"C:\\Program Files\\Windscribe\\windscribe-cli.exe" connect US', (err) => {
            if (err) console.error("VPN Connect Error:", err);
            setTimeout(resolve, 15000); // 15 sec wait for connection
        });
    });
}

async function runLoop() {
    let count = 0;
    while (true) {
        // Dar 2 visit pachi IP badlo jethi safe rahe
        if (count % 2 === 0) {
            await rotateVPN();
        }
        
        await startTraffic();
        count++;
        console.log(`Total Visits: ${count}. Next visit in 10s...`);
        await new Promise(r => setTimeout(r, 10000));
    }
}

runLoop();