FROM node:latest

# RUN npm install --global npm

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/catalearn_child/

WORKDIR $HOME/catalearn_child

RUN npm install
# RUN npm -v