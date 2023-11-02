FROM node:18-alpine

# Set the timezone in docker
RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone

WORKDIR /app

COPY package*.json .
COPY yarn.lock .

RUN yarn

COPY . .
RUN yarn build

EXPOSE 5000

CMD ["node", "dist/main"]