# Catalearn Child Server code

``custom.js`` is the custom Jupyter JS file. Run ``./cp.sh`` to copy this file to the correct directory. 

## Docker instructions

### Building the image

`docker-compose build`

### Running the image with shell
`docker-compose run --rm catalearn_child /bin/bash`

### Running the container
`docker-compose run catalearn_child`