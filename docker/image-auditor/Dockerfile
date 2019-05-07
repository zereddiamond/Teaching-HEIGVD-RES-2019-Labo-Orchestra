FROM ubuntu

RUN apt update -y
RUN apt install -y  nodejs npm
RUN npm install net --save
RUN npm install dgram --save
RUN npm install moment --save

COPY src/auditor.js /opt/auditor.js

EXPOSE 2205

ENTRYPOINT ["nodejs", "/opt/auditor.js"]
