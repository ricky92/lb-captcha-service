import {CaptchaInstanceRepository} from '../../repositories';
import {testdb} from '../fixtures/datasources/testdb.datasource';

export async function givenEmptyDatabase() {
  await new CaptchaInstanceRepository(testdb).deleteAll();
}
