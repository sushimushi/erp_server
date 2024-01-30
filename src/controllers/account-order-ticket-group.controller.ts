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
  OrderTicketGroup,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountOrderTicketGroupController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/order-ticket-groups', {
    responses: {
      '200': {
        description: 'Array of Account has many OrderTicketGroup',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderTicketGroup)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OrderTicketGroup>,
  ): Promise<OrderTicketGroup[]> {
    return this.accountRepository.orderTicketGroups(id).find(filter);
  }

  @post('/accounts/{id}/order-ticket-groups', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderTicketGroup)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Account.prototype.accountId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderTicketGroup, {
            title: 'NewOrderTicketGroupInAccount',
            exclude: ['orderTicketGroupId'],
            optional: ['accountId']
          }),
        },
      },
    }) orderTicketGroup: Omit<OrderTicketGroup, 'orderTicketGroupId'>,
  ): Promise<OrderTicketGroup> {
    return this.accountRepository.orderTicketGroups(id).create(orderTicketGroup);
  }

  @patch('/accounts/{id}/order-ticket-groups', {
    responses: {
      '200': {
        description: 'Account.OrderTicketGroup PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderTicketGroup, {partial: true}),
        },
      },
    })
    orderTicketGroup: Partial<OrderTicketGroup>,
    @param.query.object('where', getWhereSchemaFor(OrderTicketGroup)) where?: Where<OrderTicketGroup>,
  ): Promise<Count> {
    return this.accountRepository.orderTicketGroups(id).patch(orderTicketGroup, where);
  }

  @del('/accounts/{id}/order-ticket-groups', {
    responses: {
      '200': {
        description: 'Account.OrderTicketGroup DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrderTicketGroup)) where?: Where<OrderTicketGroup>,
  ): Promise<Count> {
    return this.accountRepository.orderTicketGroups(id).delete(where);
  }
}
