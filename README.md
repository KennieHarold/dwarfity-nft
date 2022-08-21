## Project Setup
After cloning the repo, run the following command to install the project dependencies:

```bash
npm install
```

Then compile and deploy the smart contract to ganache, run the following command:

```bash
npm run ganache:deploy
```

To start the node server, run the following command:

```bash
npm run node:start
```

To start the react app, run the following command:

```bash
npm start
```

Make sure you mint initial NFTs in order you can buy them and used it for breeding, just create a `fixtures` folder and a sample data for the NFT's metadata (see /sample-data/genDwarvesData.js) and run the following command:

```bash
npm run ganache:mintgen
```

Required values for the .env file:

```bash
DWARFITY_CORE_ADDRESS=
DB_CONNECTION_STRING=
NODE_PORT=
NODE_ENVIRONMENT=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SECRET_KEY=
REACT_APP_ENVIRONMENT=
REACT_APP_DWARFITY_CORE_ADDRESS=
```

## Third party apps used

MongoDB - For storing NFT's metadata

Cloudinary - For storing NFT's image file

Ganache - Ethereum based locat test network
