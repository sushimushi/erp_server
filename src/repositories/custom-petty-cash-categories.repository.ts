import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {CustomPettyCashCategories, CustomPettyCashCategoriesRelations} from '../models';

export class CustomPettyCashCategoriesRepository extends DefaultCrudRepository<
  CustomPettyCashCategories,
  typeof CustomPettyCashCategories.prototype.customPettyCashCategoriesId,
  CustomPettyCashCategoriesRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(CustomPettyCashCategories, dataSource);
  }
}
