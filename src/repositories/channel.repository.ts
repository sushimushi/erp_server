import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Channel, ChannelRelations} from '../models';

export class ChannelRepository extends DefaultCrudRepository<
  Channel,
  typeof Channel.prototype.channelId,
  ChannelRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Channel, dataSource);
  }
}
