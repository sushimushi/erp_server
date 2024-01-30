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
  Address,
  Customer,
} from '../models';
import {AddressRepository} from '../repositories';

export class AddressCustomerController {
  constructor(
    @repository(AddressRepository) protected addressRepository: AddressRepository,
  ) { }

  @get('/addresses/{id}/customer', {
    responses: {
      '200': {
        description: 'Address has one Customer',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customer),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Customer>,
  ): Promise<Customer> {
    return this.addressRepository.customer(id).get(filter);
  }

  @post('/addresses/{id}/customer', {
    responses: {
      '200': {
        description: 'Address model instance',
        content: {'application/json': {schema: getModelSchemaRef(Customer)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Address.prototype.addressId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {
            title: 'NewCustomerInAddress',
            exclude: ['customerId'],
            optional: ['shippingAddress']
          }),
        },
      },
    }) customer: Omit<Customer, 'customerId'>,
  ): Promise<Customer> {
    return this.addressRepository.customer(id).create(customer);
  }

  @patch('/addresses/{id}/customer', {
    responses: {
      '200': {
        description: 'Address.Customer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customer, {partial: true}),
        },
      },
    })
    customer: Partial<Customer>,
    @param.query.object('where', getWhereSchemaFor(Customer)) where?: Where<Customer>,
  ): Promise<Count> {
    return this.addressRepository.customer(id).patch(customer, where);
  }

  @del('/addresses/{id}/customer', {
    responses: {
      '200': {
        description: 'Address.Customer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Customer)) where?: Where<Customer>,
  ): Promise<Count> {
    return this.addressRepository.customer(id).delete(where);
  }
}
