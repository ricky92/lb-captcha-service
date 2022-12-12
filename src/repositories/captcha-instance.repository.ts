import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {CaptchaInstance, CaptchaInstanceRelations} from '../models';

export class CaptchaInstanceRepository extends DefaultCrudRepository<
  CaptchaInstance,
  typeof CaptchaInstance.prototype.id,
  CaptchaInstanceRelations
> {
  constructor(@inject('datasources.MySQL') dataSource: MySqlDataSource) {
    super(CaptchaInstance, dataSource);
  }
}
