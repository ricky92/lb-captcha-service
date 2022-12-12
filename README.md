# LoopBack 4 Captcha Service

This project is a simple proof-of-concept application server backed by the [LoopBack 4](https://loopback.io/) framework. It provides CAPTCHA generation and verification functionality.

**IMPORTANT NOTICE:** this is not meant to be production-ready.

## Running the service

You can either run the service from the source folder (e.g. for development) or you can use Docker to spin up an image that runs the application.

### Running locally

You will first need to install dependencies:

```sh
npm install
```

There are some node packages (`canvas`) that rely on native libraries. Depending on your system architecture or OS, they might need to be built from source: in that case, please refer to [this README paragraph](https://github.com/Automattic/node-canvas#compiling) to understand which tools/packages are needed.

After this step, you should create a file named `.env` in the root folder of the project, containing the configuration to connect to a MySQL server:

```
MYSQL_HOST={host}
MYSQL_USER={username}
MYSQL_PASS={password}
MYSQL_DB={database}
```

Once you're done, you are ready to start the server:

```sh
npm start
```

The server will be running on port `3000` by default.
Open <http://127.0.0.1:3000> in your browser to see the application running.

### Running on Docker

If you want to use Docker to run the application, you can build an image using the provided `Dockerfile`. For simplicity, there is also an npm command you can use:

```sh
npm run docker:build
```

This will build an image named `ricky92/lb-captcha-service`.

If, as an alternative, you want to spin up a working environment quickly, you can use the provided `docker-compose.yml` file by running the following command:

```sh
docker-compose up -d
```

This solution will also run a MySQL server that the service will connect to.

## Tests

Some simple black-box tests are included. Run them using the following command:

```sh
npm test
```
