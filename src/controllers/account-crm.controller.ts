import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Account,
  Crm,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountCrmController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @authenticate('jwt')
  @get('/accounts/{id}/crms', {
    responses: {
      '200': {
        description: 'Array of Account has many Crm',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Crm)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Crm>,
  ): Promise<Crm[]> {
    return this.accountRepository.crms(id).find(filter);
  }

  @authenticate('jwt')
  @post('/accounts/{id}/crms', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Crm)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Account.prototype.accountId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crm, {
            title: 'NewCrmInAccount',
            exclude: ['crmId'],
            optional: ['crmId']
          }),
        },
      },
    }) crm: Omit<Crm, 'crmId'>,
  ): Promise<Crm> {
    return this.accountRepository.crms(id).create(crm);
  }

  @authenticate('jwt')
  @patch('/accounts/{id}/crms', {
    responses: {
      '200': {
        description: 'Account.Crm PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Crm, {partial: true}),
        },
      },
    })
    crm: Partial<Crm>,
    @param.query.object('where', getWhereSchemaFor(Crm)) where?: Where<Crm>,
  ): Promise<Count> {
    return this.accountRepository.crms(id).patch(crm, where);
  }

  @authenticate('jwt')
  @del('/accounts/{id}/crms', {
    responses: {
      '200': {
        description: 'Account.Crm DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Crm)) where?: Where<Crm>,
  ): Promise<Count> {
    return this.accountRepository.crms(id).delete(where);
  }
}
