import { ApiProperty } from '@nestjs/swagger';

export class StoreSkuDto {
  @ApiProperty()
  storeName: string;

  @ApiProperty()
  storeSku: string;

  @ApiProperty()
  providerId: string;

  @ApiProperty()
  providerName: string;
}
