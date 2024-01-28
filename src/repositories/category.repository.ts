import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Category, CategoryRelations} from '../models';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.categoryId,
  CategoryRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Category, dataSource);
  }
}
