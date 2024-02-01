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
import {Receipt} from '../models';
import {ReceiptRepository} from '../repositories';

export class ReceiptController {
  constructor(
    @repository(ReceiptRepository)
    public receiptRepository : ReceiptRepository,
  ) {}

  @post('/receipts')
  @response(200, {
    description: 'Receipt model instance',
    content: {'application/json': {schema: getModelSchemaRef(Receipt)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receipt, {
            title: 'NewReceipt',
            exclude: ['receiptId'],
          }),
        },
      },
    })
    receipt: Omit<Receipt, 'receiptId'>,
  ): Promise<Receipt> {
    return this.receiptRepository.create(receipt);
  }

  @get('/receipts/count')
  @response(200, {
    description: 'Receipt model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Receipt) where?: Where<Receipt>,
  ): Promise<Count> {
    return this.receiptRepository.count(where);
  }

  @get('/receipts')
  @response(200, {
    description: 'Array of Receipt model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Receipt, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Receipt) filter?: Filter<Receipt>,
  ): Promise<Receipt[]> {
    return this.receiptRepository.find(filter);
  }

  @patch('/receipts')
  @response(200, {
    description: 'Receipt PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receipt, {partial: true}),
        },
      },
    })
    receipt: Receipt,
    @param.where(Receipt) where?: Where<Receipt>,
  ): Promise<Count> {
    return this.receiptRepository.updateAll(receipt, where);
  }

  @get('/receipts/{id}')
  @response(200, {
    description: 'Receipt model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Receipt, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Receipt, {exclude: 'where'}) filter?: FilterExcludingWhere<Receipt>
  ): Promise<Receipt> {
    return this.receiptRepository.findById(id, filter);
  }

  @patch('/receipts/{id}')
  @response(204, {
    description: 'Receipt PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receipt, {partial: true}),
        },
      },
    })
    receipt: Receipt,
  ): Promise<void> {
    await this.receiptRepository.updateById(id, receipt);
  }

  @put('/receipts/{id}')
  @response(204, {
    description: 'Receipt PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() receipt: Receipt,
  ): Promise<void> {
    await this.receiptRepository.replaceById(id, receipt);
  }

  @del('/receipts/{id}')
  @response(204, {
    description: 'Receipt DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.receiptRepository.deleteById(id);
  }
}
