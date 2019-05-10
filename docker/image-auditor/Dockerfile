FROM node

WORKDIR /opt/app

COPY src/package.json /opt/app
RUN npm install
COPY src/auditor.js /opt/app/auditor.js

EXPOSE 2205

ENTRYPOINT ["nodejs", "/opt/app/auditor.js"]
