# 🤖 CoPilot Setup Guide

Welcome to the setup guide for configuring CoPilot integration with **CodeGate**. 


---

## 📋 Prerequisites

Before you begin, make sure you have the following:
- ✅ An active GitHub account
- ✅ A GitHub CoPilot subscription
- ✅ A CodeGate account

---

## 🛠️ Setup Instructions

### Install the CodeGate CA

To enable CodeGate, you’ll need to install its Certificate Authority (CA) into your operating system’s trust store.

> **Why is this needed?**  
> The CodeGate CA allows your machine to securely intercept and modify traffic between GitHub CoPilot and your IDE.  
> ✨ **Don’t worry!** The decrypted traffic stays on your local machine and never leaves.


#### 🍎 **For MacOS Users**

Run the following command in your terminal to install the CA:

```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain codegate_volume/certs/ca.crt
```

#### 🖥️ For Windows Users

Use this PowerShell command:

```Powershell
Import-Certificate -FilePath "certs\\ca.crt" -CertStoreLocation Cert:\\LocalMachine\\Root
```

#### 🐧 For Linux Users

Run these commands to install the CA:

```bash
sudo cp certs/ca.crt /usr/local/share/ca-certificates/codegate.crt
sudo update-ca-certificates
```

    Note: You might need to restart your IDE after adding the certicates

### Configure CoPilot Settings to Use CodeGate

Update your CoPilot configuration to use CodeGate as a proxy. Add the following to your project configuration:

```json
{
  "http.proxy": "https://localhost:8990",
  "http.proxyStrictSSL": true,
  "http.proxySupport": "on",
  "github.copilot.advanced": {
    "debug.useNodeFetcher": true,
    "debug.useElectronFetcher": true,
    "debug.testOverrideProxyUrl": "https://localhost:8990",
    "debug.overrideProxyUrl": "https://localhost:8990
  }
```

### Start Coding with the Privacy Protections and Security of CodeGate in place

That’s it—you’re all set! 

Go forth and build something amazing! 🚀✨