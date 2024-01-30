import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PermissionPreferences,
  Account,
} from '../models';
import {PermissionPreferencesRepository} from '../repositories';

export class PermissionPreferencesAccountController {
  constructor(
    @repository(PermissionPreferencesRepository)
    public permissionPreferencesRepository: PermissionPreferencesRepository,
  ) { }

  @get('/permission-preferences/{id}/account', {
    responses: {
      '200': {
        description: 'Account belonging to PermissionPreferences',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Account),
          },
        },
      },
    },
  })
  async getAccount(
    @param.path.string('id') id: typeof PermissionPreferences.prototype.permissionPreferenceId,
  ): Promise<Account> {
    return this.permissionPreferencesRepository.account(id);
  }
}
