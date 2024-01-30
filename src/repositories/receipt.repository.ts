import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Receipt, ReceiptRelations, Refund} from '../models';
import {RefundRepository} from './refund.repository';

export class ReceiptRepository extends DefaultCrudRepository<
  Receipt,
  typeof Receipt.prototype.receiptId,
  ReceiptRelations
> {

  public readonly refunds: HasManyRepositoryFactory<Refund, typeof Receipt.prototype.receiptId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('RefundRepository') protected refundRepositoryGetter: Getter<RefundRepository>,
  ) {
    super(Receipt, dataSource);
    this.refunds = this.createHasManyRepositoryFactoryFor('refunds', refundRepositoryGetter,);
    this.registerInclusionResolver('refunds', this.refunds.inclusionResolver);
  }
}
