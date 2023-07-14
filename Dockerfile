FROM nikolaik/python-nodejs:python3.11-nodejs18-slim as node-server


# load environment 
ENV BACKPACKER_BASE_URL='http://localhost:4000'
ENV ACCESS_TOKEN='pk.eyJ1IjoiZGV2aWx2ZSIsImEiOiJjbGZvMHEyeGUwMDNiM3ZwdzNkbDdxZndiIn0.WNUNtzLt7wKeKCpjWw5wlg'
ENV ADMIN_EMAIL='roti7_test_admin@roti7.com'
ENV ADMIN_PASSWORD='1234567890'
ENV DELIVERY_IMAGES_PATH='test_images/'



WORKDIR /backpacker
COPY ./backpacker/package.json ./
COPY ./backpacker/package.json ./
RUN npm i
COPY ./backpacker ./


WORKDIR /flask_app
COPY ./flask-server-roti/requirements.txt ./requirements.txt
RUN pip install -r requirements.txt
COPY ./flask-server-roti/ ./
EXPOSE 5000


WORKDIR /
COPY ./script.sh ./script.sh


# CMD  node /backpacker/server.js ; python /flask_app/server.py
RUN chmod +x script.sh
CMD [ "./script.sh" ]