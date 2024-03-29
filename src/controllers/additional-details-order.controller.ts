// export class AdditionalDetailsOrderController {
//   constructor(
//     @repository(AdditionalDetailsRepository) protected additionalDetailsRepository: AdditionalDetailsRepository,
//   ) { }

//   @authenticate('jwt')
//   @get('/additional-details/{id}/orders', {
//     responses: {
//       '200': {
//         description: 'Array of AdditionalDetails has many Order through AdditionalDetailsOrder',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(Order)},
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.path.string('id') id: string,
//     @param.query.object('filter') filter?: Filter<Order>,
//   ): Promise<Order[]> {
//     return this.additionalDetailsRepository.additionalDetailsOrder(id).find(filter);
//   }

//   @authenticate('jwt')
//   @post('/additional-details/{id}/orders', {
//     responses: {
//       '200': {
//         description: 'create a Order model instance',
//         content: {'application/json': {schema: getModelSchemaRef(Order)}},
//       },
//     },
//   })
//   async create(
//     @param.path.string('id') id: typeof AdditionalDetails.prototype.additionalDetailId,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Order, {
//             title: 'NewOrderInAdditionalDetails',
//             exclude: ['orderId'],
//           }),
//         },
//       },
//     }) order: Omit<Order, 'orderId'>,
//   ): Promise<Order> {
//     return this.additionalDetailsRepository.additionalDetailsOrder(id).create(order);
//   }

//   @authenticate('jwt')
//   @patch('/additional-details/{id}/orders', {
//     responses: {
//       '200': {
//         description: 'AdditionalDetails.Order PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.string('id') id: string,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Order, {partial: true}),
//         },
//       },
//     })
//     order: Partial<Order>,
//     @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
//   ): Promise<Count> {
//     return this.additionalDetailsRepository.additionalDetailsOrder(id).patch(order, where);
//   }

//   @authenticate('jwt')
//   @del('/additional-details/{id}/orders', {
//     responses: {
//       '200': {
//         description: 'AdditionalDetails.Order DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.string('id') id: string,
//     @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
//   ): Promise<Count> {
//     return this.additionalDetailsRepository.additionalDetailsOrder(id).delete(where);
//   }
// }
