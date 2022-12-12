import {Client, expect} from '@loopback/testlab';
import {CaptchaServiceApplication} from '../..';
import {givenEmptyDatabase} from '../helpers/database.helpers';
import {setupApplication} from '../helpers/test-helper';

describe('CaptchaController', () => {
  let app: CaptchaServiceApplication;
  let client: Client;

  before(givenEmptyDatabase);
  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /captcha/generate', async () => {
    const res = await client.post('/captcha/generate')
      .send({difficulty: "easy"}).expect(200);
    expect(res.body).to.have.keys("captchaId", "imageUrl");
  });

});
