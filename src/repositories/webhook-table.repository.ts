import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {WebhookTable, WebhookTableRelations} from '../models';

export class WebhookTableRepository extends DefaultCrudRepository<
  WebhookTable,
  typeof WebhookTable.prototype.webhookId,
  WebhookTableRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(WebhookTable, dataSource);
  }
}
