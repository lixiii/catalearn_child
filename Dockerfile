FROM node:6.11.0

# set up python resources
# RUN apt-get update && \
#     apt-get -y upgrade && \
#     apt-get install -y python3-pip && \
#     pip3 install --upgrade setuptools pip && \
#     pip3 install jupyter && \
#     pip3 install keras

CMD ["./setup.sh"]

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/catalearn_child/

WORKDIR $HOME/catalearn_child

RUN npm install

# CMD ["node", "./server.js"]