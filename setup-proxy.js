import fs from 'fs';
import path from 'path';

const proxyFilePath = path.join('proxy.conf.json');

const isDocker = process.env["IS_DOCKER"] === 'true';

const proxyConfig = {
  "/api": {
    "target": isDocker ? "http://host.docker.internal:8080" : "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  },
  "/auth": {
    "target": isDocker ? "http://host.docker.internal:8080" : "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
};

fs.writeFileSync(proxyFilePath, JSON.stringify(proxyConfig, null, 2));

console.log(`Proxy configuration updated. Running in ${isDocker ? 'Docker' : 'Local'} mode.`);
