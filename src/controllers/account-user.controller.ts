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
  User,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountUserController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Account',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Account.prototype.accountId,
  ): Promise<User> {
    return this.accountRepository.accountUser(id);
  }
}
