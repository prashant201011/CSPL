FROM node
WORKDIR C:\Users\prash\Desktop\DSA\node(CRUD)\app.js
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD "nodemon" "app.js"
