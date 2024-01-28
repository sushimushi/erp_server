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
  Register,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountRegisterController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/register', {
    responses: {
      '200': {
        description: 'Register belonging to Account',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Register),
          },
        },
      },
    },
  })
  async getRegister(
    @param.path.string('id') id: typeof Account.prototype.accountId,
  ): Promise<Register> {
    return this.accountRepository.accountRegister(id);
  }
}
