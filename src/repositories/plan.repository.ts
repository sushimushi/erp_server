import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Plan, PlanRelations} from '../models';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.planId,
  PlanRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Plan, dataSource);
  }
}
