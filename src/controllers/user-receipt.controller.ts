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
  Receipt,
  User,
} from '../models';
import {UserRepository} from '../repositories';

export class UserReceiptController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/receipts', {
    responses: {
      '200': {
        description: 'Array of User has many Receipt',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Receipt)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Receipt>,
  ): Promise<Receipt[]> {
    return this.userRepository.userReceipt(id).find(filter);
  }

  @authenticate('jwt')
  @post('/users/{id}/receipts', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Receipt)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.userId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receipt, {
            title: 'NewReceiptInUser',
            exclude: ['receiptId'],
            optional: ['updatedBy']
          }),
        },
      },
    }) receipt: Omit<Receipt, 'receiptId'>,
  ): Promise<Receipt> {
    return this.userRepository.userReceipt(id).create(receipt);
  }

  @patch('/users/{id}/receipts', {
    responses: {
      '200': {
        description: 'User.Receipt PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Receipt, {partial: true}),
        },
      },
    })
    receipt: Partial<Receipt>,
    @param.query.object('where', getWhereSchemaFor(Receipt)) where?: Where<Receipt>,
  ): Promise<Count> {
    return this.userRepository.userReceipt(id).patch(receipt, where);
  }

  @del('/users/{id}/receipts', {
    responses: {
      '200': {
        description: 'User.Receipt DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Receipt)) where?: Where<Receipt>,
  ): Promise<Count> {
    return this.userRepository.userReceipt(id).delete(where);
  }
}
