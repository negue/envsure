#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');

const workingDir = process.cwd();
const ensureName = process.argv[2];
console.log('Starting envsure', ensureName);
console.log(`Working Dir: ${workingDir}`);

const fileToCheck = path.join(workingDir, 'envsure.json');
console.log(`File to check: ${fileToCheck}`);

if (!fs.existsSync(fileToCheck)) {
  console.warn('No envsure.json exists');

  process.exit();
}

const configFile = require(fileToCheck);

if (configFile[ensureName]) {
  console.info(`Starting to install dependencies for: ${ensureName}`);
  const packagesNeeded = configFile[ensureName];
  const packageKeys = Object.keys(packagesNeeded);

  const packagesToInstall = [];
  const notExistingPackages = [];

  for (const packageName of packageKeys) {
    const neededVersion = packagesNeeded[packageName];
    const packageJsonToCheck = path.join(workingDir, 'node_modules', packageName, 'package.json');

    if (fs.existsSync(packageJsonToCheck)) {
      // const installedPackage = require(packageJsonToCheck);

      /*if (installedPackage.version !== neededVersion) {
        packagesToInstall.push(`${packageName}@${neededVersion}`);
      }*/
    } else {
      notExistingPackages.push(packageName);

    }

    packagesToInstall.push(`${packageName}@${neededVersion}`);
  }

  if (notExistingPackages.length === 0) {
    console.info('Packages already installed, skipping npm-install');
    process.exit();
  }

  console.info('Installing', packagesToInstall);

  const npmOutput = spawn('npm', ['install', ...packagesToInstall, '--no-save', '--ignore-scripts', '--no-audit', '--no-prune'], {
    cwd: workingDir
  });

  // npmOutput.stdout.on('data', data => console.log(data.toString()));
  // npmOutput.stderr.on('data', data => console.warn(data.toString()));
  npmOutput.on('close', code => {
    process.exit();
  });
}
