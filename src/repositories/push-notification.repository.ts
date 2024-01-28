import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {PushNotification, PushNotificationRelations} from '../models';

export class PushNotificationRepository extends DefaultCrudRepository<
  PushNotification,
  typeof PushNotification.prototype.notificationId,
  PushNotificationRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(PushNotification, dataSource);
  }
}
