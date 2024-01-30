import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PrintingPreferences,
  Account,
} from '../models';
import {PrintingPreferencesRepository} from '../repositories';

export class PrintingPreferencesAccountController {
  constructor(
    @repository(PrintingPreferencesRepository)
    public printingPreferencesRepository: PrintingPreferencesRepository,
  ) { }

  @get('/printing-preferences/{id}/account', {
    responses: {
      '200': {
        description: 'Account belonging to PrintingPreferences',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Account),
          },
        },
      },
    },
  })
  async getAccount(
    @param.path.string('id') id: typeof PrintingPreferences.prototype.printingPreferenceId,
  ): Promise<Account> {
    return this.printingPreferencesRepository.account(id);
  }
}
