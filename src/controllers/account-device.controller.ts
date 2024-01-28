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
  Device,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountDeviceController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/devices', {
    responses: {
      '200': {
        description: 'Array of Account has many Device',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Device)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Device>,
  ): Promise<Device[]> {
    return this.accountRepository.accountDevices(id).find(filter);
  }

  @post('/accounts/{id}/devices', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Device)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Account.prototype.accountId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {
            title: 'NewDeviceInAccount',
            exclude: ['deviceId'],
            optional: ['accountId']
          }),
        },
      },
    }) device: Omit<Device, 'deviceId'>,
  ): Promise<Device> {
    return this.accountRepository.accountDevices(id).create(device);
  }

  @patch('/accounts/{id}/devices', {
    responses: {
      '200': {
        description: 'Account.Device PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {partial: true}),
        },
      },
    })
    device: Partial<Device>,
    @param.query.object('where', getWhereSchemaFor(Device)) where?: Where<Device>,
  ): Promise<Count> {
    return this.accountRepository.accountDevices(id).patch(device, where);
  }

  @del('/accounts/{id}/devices', {
    responses: {
      '200': {
        description: 'Account.Device DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Device)) where?: Where<Device>,
  ): Promise<Count> {
    return this.accountRepository.accountDevices(id).delete(where);
  }
}
