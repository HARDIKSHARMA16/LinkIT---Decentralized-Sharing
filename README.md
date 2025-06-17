# 💾 Decentralized File Storage System

A browser-based platform designed for securely uploading and managing files using blockchain technology.

## 📌 Overview

This Decentralized File Storage System offers a blockchain-integrated web interface where users can store files securely and control access permissions. By utilizing wallet-based identity, users can view their personal files and grant or revoke access to others through an allowlist mechanism. The platform emphasizes privacy, ownership, and full control over shared data.

## 🌟 Features

- **Immutable File Uploads**  
  Files are uploaded and stored on the blockchain, providing integrity and resistance to tampering.

- **Wallet-Based Access**  
  Files can be accessed directly through the browser by connecting a compatible crypto wallet.

- **Selective Sharing**  
  Share specific files by adding target wallet addresses to the allowlist.

- **Manage Access Rights**  
  Easily control who can or cannot view your data by updating the allowlist.

- **Revoke Access Anytime**  
  Enhance data security by disallowing addresses with a single click.

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Smart Contracts**: Solidity  
- **Development Framework**: Hardhat (local blockchain)  
- **Web3 Integration**: Web3.js  
- **HTTP Requests**: Axios  
- **UI Framework**: ReactJS  
- **Storage Layer**: Pinata (IPFS)


## Installation

1. Clone the repository:

   ```shell

   git clone https://github.com/HARDIKSHARMA16/LinkIT---Decentralized-Sharing.git

   ```

2. Navigate to the project directory:

```
cd client
```

3. Install the dependencies

```
npm install
```

4. Configure the project:

- Update the blockchain connection settings in the config.js file.
- Set up the necessary API keys or environment variables for blockchain integration.

5. Start the application:

```shell
npm start
```

## How to Operate

- Open the application in your web browser.

- Connect your wallet to the application by selecting the appropriate wallet provider and authorizing the connection.

- Upload files by clicking on the "Upload" button and selecting the desired files from your local machine.

- View your files directly from the browser interface when connected to the same wallet.

- Share files with other users by adding their addresses to the allowlist in the application settings.

- Manage the allowlist by adding or removing addresses to control access to the shared files.

- Disallow specific addresses to revoke their access to the shared content.




