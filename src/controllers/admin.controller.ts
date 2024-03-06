/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {authenticate, TokenService} from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  post,
  requestBody,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {compare, genSalt, hash} from 'bcryptjs';
import {
  Account,
  Admin as CreateUser,
  PermissionPreferences,
  PrintingPreferences,
  SellingPreferences,
} from '../models';
import {
  AccountRepository,
  AdminRepository,
  PermissionPreferencesRepository,
  PrintingPreferencesRepository,
  SellingPreferencesRepository,
} from '../repositories';

const AdminSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 6,
    },
  },
};

export const RequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: AdminSchema},
  },
};

export class AdminController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository)
    protected userRepository: UserRepository,
    @repository(AdminRepository)
    protected adminRepository: AdminRepository,
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
    @repository(SellingPreferencesRepository)
    public sellingPreferencesRepository: SellingPreferencesRepository,
    @repository(PrintingPreferencesRepository)
    public printingPreferencesRepository: PrintingPreferencesRepository,
    @repository(PermissionPreferencesRepository)
    public permissionPreferencesRepository: PermissionPreferencesRepository,
  ) {}

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreateUser, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: CreateUser,
  ): Promise<Account> {
    const password = await hash(newUserRequest.password, await genSalt());
    newUserRequest.password = password;
    const savedUser = await this.adminRepository.create(newUserRequest);

    const account = {
      email: newUserRequest.email,
      mobileNumber: '',
      businessType: '',
      userName: '',
      businessName: '',
      inceptionDate: `${new Date()}`,
      isPaid: false,
      option: {},
      businessAddressId: '',
      userId: savedUser.id,
      registerId: '',
    };
    const savedAccount = await this.accountRepository.create(account);
    // await this.userRepository.userCredentials(savedUser.id).create({password});

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
    sellingPreferences.accountId = savedAccount.accountId!;
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
    printingPreferences.accountId = savedAccount.accountId!;
    const printingPreferencesCreated =
      await this.printingPreferencesRepository.create(printingPreferences);

    // Create Permission Preferences
    const permissionPreferences = new PermissionPreferences();
    permissionPreferences.isCashierAllowedToOfferDiscount = false;
    permissionPreferences.isManagerAllowedToEditEmailAddress = false;
    permissionPreferences.isShiftSummaryHiddenOnLock = false;
    permissionPreferences.accountId = savedAccount.accountId!;
    const permissionPreferencesCreated =
      await this.permissionPreferencesRepository.create(permissionPreferences);

    return savedAccount;
  }

  @post('/signin', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async signIn(
    @requestBody(RequestBody) credentials: Credentials,
  ): Promise<any> {
    // const user = await this.userService.verifyCredentials(credentials);
    // const userProfile = this.userService.convertToUserProfile(user);
    // const token = await this.jwtService.generateToken(userProfile);

    const admin = await this.adminRepository.find({
      where: {
        email: credentials.email,
      },
    });

    // If user not found, or if password doesn't match, throw an error
    if (admin.length === 0) {
      throw new Error('Invalid email or password');
    }
    // If user not found, or if password doesn't match, throw an error
    if (
      admin.length > 0 &&
      !(await compare(credentials.password, admin[0].password))
    ) {
      throw new Error('Invalid email or password');
    }

    if (admin[0].id) {
      try {
        const payload = {
          [securityId]: admin[0].id, // Add any other claims if needed
        };
        //   const secretKey = 'my-secret-key'; // Keep the secret key as a string
        // const algorithm = 'sha256'; // Choose the algorithm you prefer
        const token = await this.jwtService.generateToken(payload);
        const account = await this.accountRepository.find({
          where: {userId: admin[0].id},
        });

        return {token: token, account: account};
      } catch (error) {
        // Handle exception cases here
        throw new Error(
          'An error occurred while generating token or fetching account.',
        );
      }
    }
  }

  @authenticate('jwt')
  @get('/whoami', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    loggedInUserProfile: UserProfile,
  ): Promise<string> {
    return loggedInUserProfile[securityId];
  }
}
