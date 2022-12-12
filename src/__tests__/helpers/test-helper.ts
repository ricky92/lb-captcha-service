import {
  Client, createRestAppClient,
  givenHttpServerConfig
} from '@loopback/testlab';
import {CaptchaServiceApplication} from '../..';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new CaptchaServiceApplication({
    rest: restConfig,
  });

  await app.boot();
  app.dataSource(testdb);
  await app.start();

  const client = createRestAppClient(app);

  return {app, client};
}

export interface AppWithClient {
  app: CaptchaServiceApplication;
  client: Client;
}
