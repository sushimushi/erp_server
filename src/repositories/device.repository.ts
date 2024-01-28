import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Device, DeviceRelations} from '../models';

export class DeviceRepository extends DefaultCrudRepository<
  Device,
  typeof Device.prototype.deviceId,
  DeviceRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Device, dataSource);
  }
}
