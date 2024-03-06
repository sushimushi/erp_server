import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {AdditionalChargeDetails, AdditionalChargeDetailsRelations} from '../models';

export class AdditionalChargeDetailsRepository extends DefaultCrudRepository<
  AdditionalChargeDetails,
  typeof AdditionalChargeDetails.prototype.additionalChargeDetailsId,
  AdditionalChargeDetailsRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(AdditionalChargeDetails, dataSource);
  }
}
