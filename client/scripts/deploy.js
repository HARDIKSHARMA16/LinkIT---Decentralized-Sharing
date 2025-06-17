const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.deployed();

  console.log("Upload deployed to:", upload.address);

  // Go up one directory from scripts/, then into src/
  const frontendPath = path.join(__dirname, "../src/config.js");

  const content = `export const CONTRACT_ADDRESS = "${upload.address}";\n`;

  fs.writeFileSync(frontendPath, content);
  console.log(`Contract address written to ${frontendPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
