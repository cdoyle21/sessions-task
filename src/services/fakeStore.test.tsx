import { getProducts, getCategories, getCategoryProducts, SortOrder } from './fakeStore';
import { mockedProductsData } from '../testUtils/mockedProductsData';
const axios = require('axios');

jest.mock('axios');
describe('fakeStore', () => {
  const mockUrl = 'http://test.com';
  describe('#getProducts', () => {
    it('should return the correct response', async () => {
      const mockedData = {
        data: mockedProductsData,
      };
      axios.get.mockResolvedValueOnce(mockedData);
      const result = await getProducts(mockUrl);

      expect(result).toEqual(mockedData.data);
      expect(axios.get).toHaveBeenCalledWith(`${mockUrl}/products`, {
        params: { limit: '', sort: '' },
      });
    });

    it('should return the correct response with a limit and sort params', async () => {
      const limit = 5;
      const sort = SortOrder.DESC;
      const mockedData = {
        data: mockedProductsData,
      };

      axios.get.mockResolvedValue(mockedData);
      const result = await getProducts(mockUrl, limit, sort);

      expect(result).toEqual(mockedData.data);
      expect(axios.get).toHaveBeenCalledWith(`${mockUrl}/products`, { params: { limit, sort } });
    });

    it('should throw an error if Axios request fails', async () => {
      const errorMessage = 'Failed to fetch products';

      axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(getProducts(mockUrl)).rejects.toThrow(errorMessage);
    });
  });

  describe('#getCategories', () => {
    it('should return the correct response', async () => {
      const mockedData = {
        data: ['electronics', 'jewelery', "men's clothing", "women's clothing"],
      };

      axios.get.mockResolvedValue(mockedData);
      await expect(getCategories(mockUrl)).resolves.toEqual(mockedData.data);
    });

    it('should throw error if request fails', async () => {
      const errorMessage = 'Failed to fetch products';
      axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(getCategories(mockUrl)).rejects.toThrow(errorMessage);
    });
  });

  describe('#getCategoryProducts', () => {
    it('should return the correct response', async () => {
      const mockedData = {
        data: mockedProductsData,
      };

      axios.get.mockResolvedValue(mockedData);
      await expect(getCategoryProducts(mockUrl, "men's clothing")).resolves.toEqual(
        mockedData.data,
      );
    });

    it('should throw error if request fails', async () => {
      const errorMessage = 'Failed to fetch products';
      axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(getCategoryProducts(mockUrl, "men's clothing")).rejects.toThrow(errorMessage);
    });
  });
});
