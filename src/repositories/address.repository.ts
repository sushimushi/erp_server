import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Address, AddressRelations} from '../models';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.addressId,
  AddressRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Address, dataSource);
  }
}
