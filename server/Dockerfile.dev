FROM node:14-alpine
RUN mkdir -p /server/node_modules && chown -R node:node /server
WORKDIR /server

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3001

CMD ["npm", "run", "start"]
