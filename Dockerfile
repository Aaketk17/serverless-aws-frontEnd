FROM node:16.10-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV PATH="./node_modules/bin:$PATH"
ARG env_var
ENV REACT_APP_SERVERLESS_URL=$env_var
RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
