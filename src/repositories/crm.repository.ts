import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Crm, CrmRelations} from '../models';

export class CrmRepository extends DefaultCrudRepository<
  Crm,
  typeof Crm.prototype.crmId,
  CrmRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Crm, dataSource);
  }
}
