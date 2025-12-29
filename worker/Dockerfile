FROM node:18

WORKDIR /app

# Copy package.json from worker folder
COPY worker/package*.json ./

RUN npm install

# Copy runner helper scripts from backend folder
COPY backend/runCpp.js ./runCpp.js
COPY backend/runPy.js ./runPy.js
COPY backend/runJs.js ./runJs.js

# Copy worker.js itself
COPY worker/worker.js ./worker.js

CMD ["node", "worker.js"]
