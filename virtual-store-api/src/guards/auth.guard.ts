import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = admin.app();
    const idToken = context.getArgs()[0]?.headers?.authorization.split(' ')[1];

    try {
      const decodedToken = await app.auth().verifyIdToken(idToken);

      if (decodedToken) {
        const request = context.switchToHttp().getRequest();
        request.user = { email: decodedToken.email };

        return true;
      }

      throw new UnauthorizedException();
    } catch (error) {
      console.log('Error', error);
      throw new UnauthorizedException();
    }
  }
}
