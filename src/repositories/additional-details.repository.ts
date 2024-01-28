import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {AdditionalDetails, AdditionalDetailsRelations} from '../models';

export class AdditionalDetailsRepository extends DefaultCrudRepository<
  AdditionalDetails,
  typeof AdditionalDetails.prototype.additionalDetailId,
  AdditionalDetailsRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(AdditionalDetails, dataSource);
  }
}
