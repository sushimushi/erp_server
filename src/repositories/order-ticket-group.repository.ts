import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {OrderTicketGroup, OrderTicketGroupRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class OrderTicketGroupRepository extends DefaultCrudRepository<
  OrderTicketGroup,
  typeof OrderTicketGroup.prototype.orderTicketGroupId,
  OrderTicketGroupRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof OrderTicketGroup.prototype.orderTicketGroupId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(OrderTicketGroup, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
