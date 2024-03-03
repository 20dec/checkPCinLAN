const readline = require('readline');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Create an interface for reading input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to check PC status
async function checkPCStatus(ipAddress) {
    try {
        const { stdout } = await exec(`ping -c 1 ${ipAddress}`);
        if (stdout.includes('1 packets transmitted, 1 received')) {
            console.log(`${ipAddress} is alive!`);
        } else {
            console.log(`${ipAddress} is not responding.`);
        }
    } catch (error) {
        console.error(`Error checking ${ipAddress}: ${error.message}`);
    }
}

// Ask the user for the IP address
rl.question('Enter the IP address of the PC to check: ', (ipAddress) => {
    checkPCStatus(ipAddress);
    rl.close();
});
