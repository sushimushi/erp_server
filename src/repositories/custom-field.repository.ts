import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {CustomField, CustomFieldRelations} from '../models';

export class CustomFieldRepository extends DefaultCrudRepository<
  CustomField,
  typeof CustomField.prototype.customFieldId,
  CustomFieldRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(CustomField, dataSource);
  }
}
