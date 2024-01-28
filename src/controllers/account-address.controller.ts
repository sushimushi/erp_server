import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Account,
  Address,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountAddressController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/address', {
    responses: {
      '200': {
        description: 'Address belonging to Account',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Address),
          },
        },
      },
    },
  })
  async getAddress(
    @param.path.string('id') id: typeof Account.prototype.accountId,
  ): Promise<Address> {
    return this.accountRepository.businessAddress(id);
  }
}
