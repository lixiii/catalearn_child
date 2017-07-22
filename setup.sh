apt-get update 
apt-get -y upgrade 

apt-get install -y curl

# install nodejs v6

curl -sL https://deb.nodesource.com/setup_6.x | bash -
apt-get install -y nodejs

# install python and pip3

apt-get install -y \
    python3-pip 

# upgrade pip and install keras + jupyter 

pip3 install --upgrade pip
pip3 install \
    keras   \
    jupyter

npm install

# install global forever for use
npm install -g forever