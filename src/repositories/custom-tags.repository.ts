import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {CustomTags, CustomTagsRelations} from '../models';

export class CustomTagsRepository extends DefaultCrudRepository<
  CustomTags,
  typeof CustomTags.prototype.customTagsId,
  CustomTagsRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(CustomTags, dataSource);
  }
}
