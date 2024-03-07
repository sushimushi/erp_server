import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Account} from './account.model';

@model()
export class SellingPreferences extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  sellingPreferenceId?: string;
  @property({
    type: 'boolean',
  })
  isRoundoffDisabled: boolean;

  @property({
    type: 'boolean',
  })
  isQuantityModalPromptEnabled: boolean;

  @property({
    type: 'boolean',
  })
  isOrderTicketEnabled: boolean;

  @property({
    type: 'boolean',
  })
  isListViewDefault: boolean;

  @property({
    type: 'boolean',
  })
  isSequentialLrnEnforced: boolean;

  @property({
    type: 'boolean',
  })
  isQuickBillingEnabled: boolean;

  @property({
    type: 'boolean',
  })
  isIncomingOrderEnabled: boolean;

  @property({
    type: 'boolean',
  })
  isQuantityIncreaseDecreaseButtonDisabled: boolean;

  @property({
    type: 'boolean',
  })
  isAllAndTopCategoryHidden: boolean;

  @property({
    type: 'boolean',
  })
  isCustomerDataEnforced: boolean;

  @property({
    type: 'boolean',
  })
  isShiftEnforced: boolean;

  @property({
    type: 'boolean',
  })
  isAutoKotEnabledForOrders: boolean;

  @belongsTo(() => Account)
  accountId?: string;

  constructor(data?: Partial<SellingPreferences>) {
    super(data);
  }
}

export interface SellingPreferencesRelations {
  // describe navigational properties here
}

export type SellingPreferencesWithRelations = SellingPreferences &
  SellingPreferencesRelations;
