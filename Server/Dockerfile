FROM node

WORKDIR /server

COPY package*.json .

RUN npm install

RUN npm install -qyg nodemon@2.0.18
#RUN npm install -g nodemon

COPY . .

CMD ["npm", "run", "dev"]