FROM nikolaik/python-nodejs:python3.11-nodejs18-slim as node-server


# load environment here




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