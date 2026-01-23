#!/bin/bash

# Install client dependencies and build
cd client
npm install
npm run build

# Install server dependencies  
cd ../server
npm install
