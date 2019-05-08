FROM node

WORKDIR /opt/app

COPY src/package.json /opt/app
RUN npm install
COPY src/musician.js /opt/app/musician.js

EXPOSE 50000

ENTRYPOINT ["nodejs", "/opt/app/musician.js"]
