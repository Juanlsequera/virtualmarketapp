import { ApiProperty } from '@nestjs/swagger';
import { StoreSkuDto } from './storeSku.dto';

export class ProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty({ type: [String] })
  categories: string[];

  @ApiProperty({ type: [String] })
  stores: string[];

  @ApiProperty({ type: [String] })
  keyWords: string[];

  @ApiProperty()
  taloPrice: number;

  @ApiProperty()
  taloPriceWithTax: number;

  @ApiProperty()
  id: string;

  @ApiProperty({ type: [String] })
  brands: string[];

  @ApiProperty()
  imagePath: string;

  @ApiProperty()
  priceMin: number;

  @ApiProperty()
  priceMax: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  taloPriceWithTaxAndRecharge: number;

  @ApiProperty({ type: [StoreSkuDto] })
  storeSkus: StoreSkuDto[];
}
