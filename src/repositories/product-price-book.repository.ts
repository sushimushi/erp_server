import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ProductPriceBook, ProductPriceBookRelations} from '../models';

export class ProductPriceBookRepository extends DefaultCrudRepository<
  ProductPriceBook,
  typeof ProductPriceBook.prototype.priceBookId,
  ProductPriceBookRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ProductPriceBook, dataSource);
  }
}
