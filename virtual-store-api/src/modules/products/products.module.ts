import { Module } from '@nestjs/common';
import { ProductsService } from '../products/service/products.service';
import { ProductsController } from '../products/controller/products.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
