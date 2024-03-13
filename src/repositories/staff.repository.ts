import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Staff, StaffRelations} from '../models';

export class StaffRepository extends DefaultCrudRepository<
  Staff,
  typeof Staff.prototype.staffId,
  StaffRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Staff, dataSource);
  }
}
