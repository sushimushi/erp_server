import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Address, AddressRelations, Customer} from '../models';
import {CustomerRepository} from './customer.repository';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.addressId,
  AddressRelations
> {

  public readonly customers: HasManyRepositoryFactory<Customer, typeof Address.prototype.addressId>;

  public readonly customer: HasOneRepositoryFactory<Customer, typeof Address.prototype.addressId>;

  public readonly billlingCustomerRelation: HasOneRepositoryFactory<Customer, typeof Address.prototype.addressId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>,
  ) {
    super(Address, dataSource);
    this.billlingCustomerRelation = this.createHasOneRepositoryFactoryFor('billlingCustomerRelation', customerRepositoryGetter);
    this.registerInclusionResolver('billlingCustomerRelation', this.billlingCustomerRelation.inclusionResolver);
    this.customer = this.createHasOneRepositoryFactoryFor('customer', customerRepositoryGetter);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
    this.customers = this.createHasManyRepositoryFactoryFor('customers', customerRepositoryGetter,);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
  }
}
