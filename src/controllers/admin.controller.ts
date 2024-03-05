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
import {Account, Admin as CreateUser} from '../models';
import {AccountRepository, AdminRepository} from '../repositories';

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
      const payload = {
        [securityId]: admin[0].id, // Add any other claims if needed
      };
      const secretKey = 'my-secret-key'; // Keep the secret key as a string
      const algorithm = 'sha256'; // Choose the algorithm you prefer
      const token = await this.jwtService.generateToken(payload);
      const account = await this.accountRepository.find({
        where: {userId: admin[0].id},
      });
      console.log(admin[0].id, account);
      return {token: token, account: account};
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
