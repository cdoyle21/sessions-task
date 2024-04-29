import axios, { AxiosResponse } from 'axios';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type ProductItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

/**
 * Return the products and use params for sorting and filtering
 * @param productsServiceURL The URL of the service.
 * @param limit Limit results returned
 * @param sort Sort by asc or desc
 * @returns An array of product items
 */

export const getProducts = async (
  productsServiceURL?: string,
  limit?: number,
  sort?: SortOrder,
): Promise<ProductItem[]> => {
  try {
    const { data: response }: AxiosResponse<ProductItem[]> = await axios.get(
      `${productsServiceURL}/products`,
      {
        params: {
          limit: limit || '',
          sort: sort || '',
        },
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Return the categories
 * @param productsServiceURL The URL of the service.
 * @returns An array of category items
 */

export const getCategories = async (productsServiceURL?: string): Promise<Array<string>> => {
  try {
    const { data: response }: AxiosResponse<Array<string>> = await axios.get(
      `${productsServiceURL}/products/categories`,
    );

    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Return the products in a specific category
 * @param categoryName Category items to be returned
 * @param productsServiceURL The URL of the service.
 * @param limit Limit results returned
 * @param sort Sort by asc or desc
 * @returns An array of category items
 */

export const getCategoryProducts = async (
  categoryName: string,
  productsServiceURL?: string,
  limit?: number,
  sort?: SortOrder,
): Promise<ProductItem[]> => {
  try {
    const { data: response }: AxiosResponse<ProductItem[]> = await axios.get(
      `${productsServiceURL}/products/category/${categoryName}`,
      {
        params: {
          limit: limit || '',
          sort: sort || '',
        },
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};
