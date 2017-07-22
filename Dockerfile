FROM ubuntu:16.04

# set up python resources

ENV HOME=/home/catalearn

# COPY package.json npm-shrinkwrap.json $HOME/catalearn_child/
COPY . $HOME/catalearn_child/

WORKDIR $HOME/catalearn_child/

RUN ./setup.sh

CMD ["node", "./server.js"]