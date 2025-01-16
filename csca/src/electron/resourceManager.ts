import osUtils from 'os-utils';
import fs from 'fs';
const POLLING_INTERVAL = 500;
import os from 'os';
export function pollResources() {
    // Log static data once at startup
    const staticData = getStaticData();
    console.log('System Information:');
    console.log(`CPU Model: ${staticData.cpuModel}`);
    console.log(`Total Storage: ${staticData.totalStorage}GB`);
    console.log(`Total Memory: ${staticData.totalMemoryGb}GB`);
    console.log('________________________________\n');

    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = await getRamUsage();
        const storageData = getStorageData();
        console.log('________________________________\n');
        console.log(`storageUsage: ${storageData.usage}`);
        console.log(`ramUsage: ${ramUsage}`);
        console.log(`storageUsage: ${storageData.usage}`);
        console.log('');
    }, POLLING_INTERVAL);

}

function getCpuUsage() {
    return new Promise(resolve => {
        osUtils.cpuUsage((percentage) => {
            resolve(percentage);
        });
    });
}

function getStorageData() {
    // requires node 18
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;

    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - free / total,
    };
}

function getRamUsage() {
    return new Promise(resolve => {
        osUtils.cpuUsage((percentage) => {
            resolve(percentage);
        });
    });

}

interface StaticData {
    totalStorage: number;
    cpuModel: string;
    totalMemoryGb: number;
}

export function getStaticData(): StaticData {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGb = Math.floor(osUtils.totalmem() / 1024);
    
    return {
        totalStorage,
        cpuModel,
        totalMemoryGb
    };
}