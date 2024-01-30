import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SellingPreferences,
  Account,
} from '../models';
import {SellingPreferencesRepository} from '../repositories';

export class SellingPreferencesAccountController {
  constructor(
    @repository(SellingPreferencesRepository)
    public sellingPreferencesRepository: SellingPreferencesRepository,
  ) { }

  @get('/selling-preferences/{id}/account', {
    responses: {
      '200': {
        description: 'Account belonging to SellingPreferences',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Account),
          },
        },
      },
    },
  })
  async getAccount(
    @param.path.string('id') id: typeof SellingPreferences.prototype.sellingPreferenceId,
  ): Promise<Account> {
    return this.sellingPreferencesRepository.account(id);
  }
}
