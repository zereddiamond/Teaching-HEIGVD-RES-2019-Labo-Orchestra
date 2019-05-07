FROM ubuntu

RUN apt update
RUN apt install -y nodejs npm
RUN npm install -y  uuid

COPY src/musician.js /opt/musician.js

EXPOSE 50000

ENTRYPOINT ["nodejs", "/opt/musician.js"]
