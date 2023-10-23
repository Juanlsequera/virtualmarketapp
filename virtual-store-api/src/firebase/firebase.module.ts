import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Module({})
export class FirebaseModule {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH as admin.ServiceAccount,
      ),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
}
