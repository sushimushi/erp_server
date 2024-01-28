import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {OrderTicketGroup, OrderTicketGroupRelations} from '../models';

export class OrderTicketGroupRepository extends DefaultCrudRepository<
  OrderTicketGroup,
  typeof OrderTicketGroup.prototype.orderTicketGroupId,
  OrderTicketGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(OrderTicketGroup, dataSource);
  }
}
