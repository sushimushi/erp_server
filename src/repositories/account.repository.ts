import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Account, AccountRelations, Address, User, Register, Device, Crm} from '../models';
import {AddressRepository} from './address.repository';
import {UserRepository} from './user.repository';
import {RegisterRepository} from './register.repository';
import {DeviceRepository} from './device.repository';
import {CrmRepository} from './crm.repository';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.accountId,
  AccountRelations
> {

  public readonly businessAddress: BelongsToAccessor<Address, typeof Account.prototype.accountId>;

  public readonly accountUser: BelongsToAccessor<User, typeof Account.prototype.accountId>;

  public readonly accountRegister: BelongsToAccessor<Register, typeof Account.prototype.accountId>;

  public readonly accountDevices: HasManyRepositoryFactory<Device, typeof Account.prototype.accountId>;

  public readonly crms: HasManyRepositoryFactory<Crm, typeof Account.prototype.accountId>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('AddressRepository') protected addressRepositoryGetter: Getter<AddressRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('RegisterRepository') protected registerRepositoryGetter: Getter<RegisterRepository>, @repository.getter('DeviceRepository') protected deviceRepositoryGetter: Getter<DeviceRepository>, @repository.getter('CrmRepository') protected crmRepositoryGetter: Getter<CrmRepository>,
  ) {
    super(Account, dataSource);
    this.crms = this.createHasManyRepositoryFactoryFor('crms', crmRepositoryGetter,);
    this.registerInclusionResolver('crms', this.crms.inclusionResolver);
    this.accountDevices = this.createHasManyRepositoryFactoryFor('accountDevices', deviceRepositoryGetter,);
    this.registerInclusionResolver('accountDevices', this.accountDevices.inclusionResolver);
    this.accountRegister = this.createBelongsToAccessorFor('accountRegister', registerRepositoryGetter,);
    this.registerInclusionResolver('accountRegister', this.accountRegister.inclusionResolver);
    this.accountUser = this.createBelongsToAccessorFor('accountUser', userRepositoryGetter,);
    this.registerInclusionResolver('accountUser', this.accountUser.inclusionResolver);
    this.businessAddress = this.createBelongsToAccessorFor('businessAddress', addressRepositoryGetter,);
    this.registerInclusionResolver('businessAddress', this.businessAddress.inclusionResolver);
  }
}
