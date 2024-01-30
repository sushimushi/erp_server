import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Fulfillment, FulfillmentRelations, Receipt} from '../models';
import {ReceiptRepository} from './receipt.repository';

export class FulfillmentRepository extends DefaultCrudRepository<
  Fulfillment,
  typeof Fulfillment.prototype.fulfillmentId,
  FulfillmentRelations
> {

  public readonly receipt: BelongsToAccessor<Receipt, typeof Fulfillment.prototype.fulfillmentId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('ReceiptRepository') protected receiptRepositoryGetter: Getter<ReceiptRepository>,
  ) {
    super(Fulfillment, dataSource);
    this.receipt = this.createBelongsToAccessorFor('receipt', receiptRepositoryGetter,);
    this.registerInclusionResolver('receipt', this.receipt.inclusionResolver);
  }
}
