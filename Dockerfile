FROM node:alpine
WORKDIR /app

RUN mkdir server
COPY server/package.json ./server
COPY server/package-lock.json ./server
COPY ./server ./server
RUN npm i --prefix server

RUN mkdir front
COPY front/package.json ./front
COPY front/package-lock.json ./front
COPY ./front ./front
RUN npm i --prefix front

COPY package.json .
RUN npm i

CMD ["npm", "run", "all"]