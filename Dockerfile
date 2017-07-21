FROM node:6.11.0

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/catalearn_child/

WORKDIR $HOME/catalearn_child

RUN npm install

CMD ["node", "./server.js"]