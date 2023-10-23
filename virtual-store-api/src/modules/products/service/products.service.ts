import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(private httpService: HttpService) {}

  async getProducts(): Promise<ProductDto[]> {
    try {
      const response = await this.httpService
        .get(
          `${process.env.MEILISEARCH_SERVER_URL}/indexes/${process.env.MEILISEARCH_INDEX}/search?q=&sort=name:asc`,
          {
            headers: {
              Authorization: `Bearer ${process.env.MEILISEARCH_APIKEY}`,
            },
          },
        )
        .toPromise();

      console.log('response:', response.status);
      return response.data.hits;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
}
