import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {CustomAdditionalDetails, CustomAdditionalDetailsRelations} from '../models';

export class CustomAdditionalDetailsRepository extends DefaultCrudRepository<
  CustomAdditionalDetails,
  typeof CustomAdditionalDetails.prototype.customAdditionalDetailsId,
  CustomAdditionalDetailsRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(CustomAdditionalDetails, dataSource);
  }
}
