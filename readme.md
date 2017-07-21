# Catalearn Child Server code

``custom.js`` is the custom Jupyter JS file. Run ``./cp.sh`` to copy this file to the correct directory. 

## Docker instructions

### Building the image

`docker-compose build`

### Running the image with shell
`docker-compose run --rm catalearn_child /bin/bash`

### Running the container
`docker-compose up`

This command also builds the image if `dockerfile` has changed

### Common error

`ERROR: for catalearn_child  no such image: sha256:54c92d93c7f87ea6923bdb005a25d93d128930085479410d0aa2e4545d432cb7: No such image: sha256:54c92d93c7f87ea6923b`

Solution: 

`docker-compose rm` then `docker-compose up`

see [https://github.com/docker/compose/issues/874]