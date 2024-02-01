import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PaymentGateway} from '../models';
import {PaymentGatewayRepository} from '../repositories';

export class PaymentGatewayController {
  constructor(
    @repository(PaymentGatewayRepository)
    public paymentGatewayRepository : PaymentGatewayRepository,
  ) {}

  @post('/payment-gateways')
  @response(200, {
    description: 'PaymentGateway model instance',
    content: {'application/json': {schema: getModelSchemaRef(PaymentGateway)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentGateway, {
            title: 'NewPaymentGateway',
            exclude: ['gatewayId'],
          }),
        },
      },
    })
    paymentGateway: Omit<PaymentGateway, 'gatewayId'>,
  ): Promise<PaymentGateway> {
    return this.paymentGatewayRepository.create(paymentGateway);
  }

  @get('/payment-gateways/count')
  @response(200, {
    description: 'PaymentGateway model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PaymentGateway) where?: Where<PaymentGateway>,
  ): Promise<Count> {
    return this.paymentGatewayRepository.count(where);
  }

  @get('/payment-gateways')
  @response(200, {
    description: 'Array of PaymentGateway model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PaymentGateway, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PaymentGateway) filter?: Filter<PaymentGateway>,
  ): Promise<PaymentGateway[]> {
    return this.paymentGatewayRepository.find(filter);
  }

  @patch('/payment-gateways')
  @response(200, {
    description: 'PaymentGateway PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentGateway, {partial: true}),
        },
      },
    })
    paymentGateway: PaymentGateway,
    @param.where(PaymentGateway) where?: Where<PaymentGateway>,
  ): Promise<Count> {
    return this.paymentGatewayRepository.updateAll(paymentGateway, where);
  }

  @get('/payment-gateways/{id}')
  @response(200, {
    description: 'PaymentGateway model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PaymentGateway, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PaymentGateway, {exclude: 'where'}) filter?: FilterExcludingWhere<PaymentGateway>
  ): Promise<PaymentGateway> {
    return this.paymentGatewayRepository.findById(id, filter);
  }

  @patch('/payment-gateways/{id}')
  @response(204, {
    description: 'PaymentGateway PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentGateway, {partial: true}),
        },
      },
    })
    paymentGateway: PaymentGateway,
  ): Promise<void> {
    await this.paymentGatewayRepository.updateById(id, paymentGateway);
  }

  @put('/payment-gateways/{id}')
  @response(204, {
    description: 'PaymentGateway PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() paymentGateway: PaymentGateway,
  ): Promise<void> {
    await this.paymentGatewayRepository.replaceById(id, paymentGateway);
  }

  @del('/payment-gateways/{id}')
  @response(204, {
    description: 'PaymentGateway DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paymentGatewayRepository.deleteById(id);
  }
}
