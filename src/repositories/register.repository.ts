import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Register, RegisterRelations} from '../models';

export class RegisterRepository extends DefaultCrudRepository<
  Register,
  typeof Register.prototype.registerId,
  RegisterRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Register, dataSource);
  }
}
