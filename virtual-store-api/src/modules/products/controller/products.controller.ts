import { Controller, Get } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { ProductDto } from '../dtos/product.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/list')
  @ApiOkResponse({ description: 'The products were successfully obtained' })
  async getProducts(): Promise<ProductDto[]> {
    return this.productsService.getProducts();
  }
}
