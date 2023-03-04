import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { PrismaModule } from './prisma/prisma.module'
import { DiscordModule } from './discord/discord.module'
import { ScheduleModule } from '@nestjs/schedule'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { MailerModule } from './mailer/mailer.module'
import { ResultImagesModule } from './resultImages/resultImages.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    DiscordModule,
    MailerModule,
    ResultImagesModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      cors: {
        credentials: true,
        origin: true,
      },
      autoSchemaFile: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
})
export class AppModule {}
