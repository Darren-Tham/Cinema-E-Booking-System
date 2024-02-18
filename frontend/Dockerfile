FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

# copy rest of the app code
COPY . .

# build the app
RUN npm run build

FROM nginx:1.25.1

COPY .docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
