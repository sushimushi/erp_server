import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Plan,
  Account,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanAccountController {
  constructor(
    @repository(PlanRepository)
    public planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/account', {
    responses: {
      '200': {
        description: 'Account belonging to Plan',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Account),
          },
        },
      },
    },
  })
  async getAccount(
    @param.path.string('id') id: typeof Plan.prototype.planId,
  ): Promise<Account> {
    return this.planRepository.account(id);
  }
}
