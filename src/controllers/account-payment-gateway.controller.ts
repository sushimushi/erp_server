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
AccountPaymentGateway,
PaymentGateway,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountPaymentGatewayController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/payment-gateways', {
    responses: {
      '200': {
        description: 'Array of Account has many PaymentGateway through AccountPaymentGateway',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PaymentGateway)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PaymentGateway>,
  ): Promise<PaymentGateway[]> {
    return this.accountRepository.accountPaymentGateway(id).find(filter);
  }

  @post('/accounts/{id}/payment-gateways', {
    responses: {
      '200': {
        description: 'create a PaymentGateway model instance',
        content: {'application/json': {schema: getModelSchemaRef(PaymentGateway)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Account.prototype.accountId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentGateway, {
            title: 'NewPaymentGatewayInAccount',
            exclude: ['gatewayId'],
          }),
        },
      },
    }) paymentGateway: Omit<PaymentGateway, 'gatewayId'>,
  ): Promise<PaymentGateway> {
    return this.accountRepository.accountPaymentGateway(id).create(paymentGateway);
  }

  @patch('/accounts/{id}/payment-gateways', {
    responses: {
      '200': {
        description: 'Account.PaymentGateway PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentGateway, {partial: true}),
        },
      },
    })
    paymentGateway: Partial<PaymentGateway>,
    @param.query.object('where', getWhereSchemaFor(PaymentGateway)) where?: Where<PaymentGateway>,
  ): Promise<Count> {
    return this.accountRepository.accountPaymentGateway(id).patch(paymentGateway, where);
  }

  @del('/accounts/{id}/payment-gateways', {
    responses: {
      '200': {
        description: 'Account.PaymentGateway DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PaymentGateway)) where?: Where<PaymentGateway>,
  ): Promise<Count> {
    return this.accountRepository.accountPaymentGateway(id).delete(where);
  }
}
