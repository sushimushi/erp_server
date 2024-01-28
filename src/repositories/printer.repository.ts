import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Printer, PrinterRelations} from '../models';

export class PrinterRepository extends DefaultCrudRepository<
  Printer,
  typeof Printer.prototype.printerId,
  PrinterRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Printer, dataSource);
  }
}
