import { Mutation, Resolver, Query, Args, Context } from '@nestjs/graphql'
import { UserRegisterInput } from './models/registerUser.input'
import { UserModel } from 'src/users/models/user.model'
import { UseGuards, UnauthorizedException } from '@nestjs/common'
import { UserJwtPayload } from './interfaces/userPayload'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RefreshAuthGuard } from './guards/refresh-auth.guard'
import { AuthService } from './auth.service'
import { Request } from 'express'
import { UserLoginInput } from './models/loginUser.input'
import { CurrentUser } from './decorators/currentUser'
import { User as UserType } from 'db'
import { UsersService } from 'src/users/users.service'
import { MailerService } from 'src/mailer/mailer.service'
import { UserActivationModel } from './models/userActivation.model'
import { UserActivationInput } from './models/userActivation.input'
import { ActivationStatus } from './enums/activationStatuses'
import { isAfter } from 'date-fns'
import { ForgotPasswordInput } from './models/forgotPassword.input'
import { CreatePasswordInput } from './models/createPassword.input'
import { hashValue } from 'src/common/crypto'

@Resolver(() => UserModel)
export class AuthResolver {
  constructor(private authService: AuthService, private usersService: UsersService, private mailerService: MailerService) {}

  @Mutation(() => UserModel)
  async register(@Args('input') data: UserRegisterInput) {
    const { confirmationToken, confirmationDate } = this.authService.generateConfirmationToken()

    const userData = {
      ...data,
      confirmationToken,
      confirmationDate,
    }

    const user = await this.authService.registerUser(userData)

    await this.mailerService.sendRegisterMail({
      to: data.email,
      locales: { confirmationToken },
    })

    return user
  }

  @Mutation(() => UserActivationModel)
  async activate(@Args('input') data: UserActivationInput) {
    const { token } = data

    const userData = await this.usersService.getFullUser({
      confirmationToken: token,
    })

    if (!userData) {
      return {
        status: ActivationStatus.INVALID,
      }
    }

    if (userData.isActive) {
      return {
        status: ActivationStatus.USED,
      }
    }

    if (!userData.confirmationDate) {
      throw new Error("Confirmation date doesn't exist")
    }

    if (isAfter(new Date(), new Date(userData.confirmationDate))) {
      return {
        status: ActivationStatus.EXPIRED,
      }
    }

    await this.usersService.updateUser({ confirmationToken: token }, { isActive: true })

    return {
      status: ActivationStatus.SUCCESS,
    }
  }

  @Mutation(() => UserModel)
  @UseGuards(LocalAuthGuard)
  async login(@Args('input') user: UserLoginInput, @Context('req') req: Request) {
    const userData = await this.authService.validateUser(user.email, user.password)

    if (!userData.isActive) {
      throw new Error('Your email address is not confirmed. Complete the registration process first.')
    }

    const token = this.authService.generateJwtToken(userData)
    const refreshToken = await this.authService.generateRefreshToken(userData)

    const secretData = {
      token,
      refreshToken,
    }

    req.res?.cookie('auth-cookie', secretData, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'https://guide-me-now-client-production.herokuapp.com',
    })

    return userData
  }

  @Query(() => String)
  async logout(@Context('req') req: Request) {
    req.res?.cookie('auth-cookie', '', { expires: new Date() })

    return 'ok'
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserModel)
  getProfile(@CurrentUser() user: UserJwtPayload) {
    return this.authService.getUserProfile(user)
  }

  @UseGuards(RefreshAuthGuard)
  @Query(() => String)
  async regenerateTokens(@CurrentUser() user: UserType, @Context('req') req: Request) {
    const userData = await this.usersService.getFullUser({ id: user.id })

    if (!userData) {
      req.res?.cookie('auth-cookie', '', { expires: new Date() })
      throw new UnauthorizedException('Invalid token')
    }

    const token = this.authService.generateJwtToken(userData)
    const refreshToken = await this.authService.generateRefreshToken(userData)

    const secretData = {
      token,
      refreshToken,
    }

    req.res?.cookie('auth-cookie', secretData, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'https://guide-me-now-client-production.herokuapp.com',
    })
    return 'ok'
  }

  @Mutation(() => String)
  async forgotPassword(@Args('input') data: ForgotPasswordInput) {
    const { email } = data

    const { forgotPasswordToken, forgotPasswordDate } = this.authService.generateForgotPasswordToken()

    const userData = {
      forgotPasswordToken,
      forgotPasswordDate,
    }

    try {
      await this.usersService.updateUser({ email }, userData)
    } catch {
      throw new Error('User with followed email does not exist')
    }

    await this.mailerService.sendForgotPasswordMail({
      to: data.email,
      locales: { forgotPasswordToken },
    })

    return 'ok'
  }

  @Mutation(() => String)
  async createPassword(@Args('input') data: CreatePasswordInput) {
    const { forgotPasswordToken, password } = data

    const user = await this.usersService.getFullUser({ forgotPasswordToken })

    if (!user) {
      throw new Error('Token is incorrect')
    }

    if (!user.forgotPasswordToken || !user.forgotPasswordDate) {
      throw new Error('User have not requested password token')
    }

    if (isAfter(new Date(), new Date(user.forgotPasswordDate))) {
      throw new Error('Token has expired')
    }

    const hashedPassword = await hashValue(password)

    await this.usersService.updateUser(
      { forgotPasswordToken },
      {
        password: hashedPassword,
        forgotPasswordToken: null,
        forgotPasswordDate: null,
      },
    )

    return 'ok'
  }
}
