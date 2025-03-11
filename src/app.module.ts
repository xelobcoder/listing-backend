import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsService } from './listings/listings.service';
import { UsersService } from './users/users.service';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsController } from './transactions/transactions.controller';
import { UsersController } from './users/users.controller';
import { ListingsController } from './listing/listing.controller';


@Module({
  imports: [],
  controllers: [AppController, TransactionsController, UsersController, ListingsController],
  providers: [AppService, ListingsService, UsersService, TransactionsService],
})
export class AppModule {}
