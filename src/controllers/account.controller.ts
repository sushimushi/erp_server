import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {
  Account,
  PermissionPreferences,
  PrintingPreferences,
  SellingPreferences,
} from '../models';
import {
  AccountRepository,
  PermissionPreferencesRepository,
  PrintingPreferencesRepository,
  SellingPreferencesRepository,
} from '../repositories';

export class AccountController {
  constructor(
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
    @repository(SellingPreferencesRepository)
    public sellingPreferencesRepository: SellingPreferencesRepository,
    @repository(PrintingPreferencesRepository)
    public printingPreferencesRepository: PrintingPreferencesRepository,
    @repository(PermissionPreferencesRepository)
    public permissionPreferencesRepository: PermissionPreferencesRepository,
  ) {}

  @authenticate('jwt')
  @post('/accounts')
  @response(200, {
    description: 'Account model instance',
    content: {'application/json': {schema: getModelSchemaRef(Account)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {
            title: 'NewAccount',
            exclude: ['accountId'],
          }),
        },
      },
    })
    account: Omit<Account, 'accountId'>,
  ): Promise<Account> {
    const accountCreated = await this.accountRepository.create(account);

    // Create Selling Preferences
    const sellingPreferences = new SellingPreferences();
    sellingPreferences.isRoundoffDisabled = false;
    sellingPreferences.isQuantityModalPromptEnabled = false;
    sellingPreferences.isOrderTicketEnabled = false;
    sellingPreferences.isListViewDefault = false;
    sellingPreferences.isSequentialLrnEnforced = false;
    sellingPreferences.isQuickBillingEnabled = false;
    sellingPreferences.isIncomingOrderEnabled = false;
    sellingPreferences.isQuantityIncreaseDecreaseButtonDisabled = false;
    sellingPreferences.isAllAndTopCategoryHidden = false;
    sellingPreferences.isCustomerDataEnforced = false;
    sellingPreferences.isShiftEnforced = false;
    sellingPreferences.isAutoKotEnabledForOrders = false;
    sellingPreferences.accountId = accountCreated.accountId!;
    const sellingPreferencesCreated =
      await this.sellingPreferencesRepository.create(sellingPreferences);

    // Create Printing Preferences
    const printingPreferences = new PrintingPreferences();
    printingPreferences.isReceiptPrintedBeforePayment = false;
    printingPreferences.isProductNotesPrintedOnReceipt = false;
    printingPreferences.isProductTaxRateNotPrintedOnReceipt = false;
    printingPreferences.isPOSFooterNotPrinted = false;
    printingPreferences.isDisablePrintCopy = false;
    printingPreferences.isOrderTicketNumberPrintedOnReceipt = false;
    printingPreferences.isServerCopyPrinted = false;
    printingPreferences.isLargerFontKot = false;
    printingPreferences.isReceiptDetailsPrintedOnKot = false;
    printingPreferences.isReceiptNotPrintedForOrders = false;
    printingPreferences.accountId = accountCreated.accountId!;
    const printingPreferencesCreated =
      await this.printingPreferencesRepository.create(printingPreferences);

    // Create Permission Preferences
    const permissionPreferences = new PermissionPreferences();
    permissionPreferences.isCashierAllowedToOfferDiscount = false;
    permissionPreferences.isManagerAllowedToEditEmailAddress = false;
    permissionPreferences.isShiftSummaryHiddenOnLock = false;
    permissionPreferences.accountId = accountCreated.accountId!;
    const permissionPreferencesCreated =
      await this.permissionPreferencesRepository.create(permissionPreferences);

    return accountCreated;
  }

  @authenticate('jwt')
  @get('/accounts/count')
  @response(200, {
    description: 'Account model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Account) where?: Where<Account>): Promise<Count> {
    return this.accountRepository.count(where);
  }

  @authenticate('jwt')
  @get('/accounts')
  @response(200, {
    description: 'Array of Account model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Account, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Account) filter?: Filter<Account>,
  ): Promise<Account[]> {
    return this.accountRepository.find(filter);
  }

  @authenticate('jwt')
  @patch('/accounts')
  @response(200, {
    description: 'Account PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
    @param.where(Account) where?: Where<Account>,
  ): Promise<Count> {
    return this.accountRepository.updateAll(account, where);
  }

  @authenticate('jwt')
  @get('/accounts/{id}')
  @response(200, {
    description: 'Account model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Account, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Account, {exclude: 'where'})
    filter?: FilterExcludingWhere<Account>,
  ): Promise<Account> {
    return this.accountRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/accounts/{id}')
  @response(204, {
    description: 'Account PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Account, {partial: true}),
        },
      },
    })
    account: Account,
  ): Promise<void> {
    await this.accountRepository.updateById(id, account);
  }

  @authenticate('jwt')
  @put('/accounts/{id}')
  @response(204, {
    description: 'Account PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() account: Account,
  ): Promise<void> {
    await this.accountRepository.replaceById(id, account);
  }

  @authenticate('jwt')
  @del('/accounts/{id}')
  @response(204, {
    description: 'Account DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.accountRepository.deleteById(id);
  }
}
