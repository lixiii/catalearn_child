FROM node:6.11.0

# set up python resources

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/catalearn_child/

WORKDIR $HOME/catalearn_child

CMD ["./setup.sh"]

# RUN npm install

# CMD ["node", "./server.js"]