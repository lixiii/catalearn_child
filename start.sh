# first copy all required custom JS assets
./cp.sh

# start node server with forever
forever -l output.log ./server.js

# start jupyter notebook
jupyter notebook --ip=0.0.0.0 --port=10000 --allow-root