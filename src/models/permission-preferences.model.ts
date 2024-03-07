import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Account} from './account.model';

@model()
export class PermissionPreferences extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  permissionPreferenceId?: string;
  @property({
    type: 'boolean',
  })
  isCashierAllowedToOfferDiscount: boolean;

  @property({
    type: 'boolean',
  })
  isManagerAllowedToEditEmailAddress: boolean;

  @property({
    type: 'boolean',
  })
  isShiftSummaryHiddenOnLock: boolean;

  @belongsTo(() => Account)
  accountId: string;

  constructor(data?: Partial<PermissionPreferences>) {
    super(data);
  }
}

export interface PermissionPreferencesRelations {
  // describe navigational properties here
}

export type PermissionPreferencesWithRelations = PermissionPreferences & PermissionPreferencesRelations;
