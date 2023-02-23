import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<UserJwtPayload>(_: unknown, user: UserJwtPayload, info: Error) {
    if (info?.message?.includes('expired')) {
      throw new UnauthorizedException('Token expired');
    }
    if (!user) {
      throw new UnauthorizedException('You are not logged in!');
    }
    return user;
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request;
  }
}
