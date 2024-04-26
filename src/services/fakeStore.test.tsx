import { getProducts, getCategories, getCategoryProducts, SortOrder } from './fakeStore';
const axios = require('axios');

jest.mock('axios');
describe('fakeStore', () => {
  const mockUrl = 'http://test.com';
  describe('#getProducts', () => {
    it('should return the correct response', async () => {
      const mockedData = {
        data: [
          {
            id: 1,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 109.95,
            description:
              'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            category: "men's clothing",
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            rating: { rate: 3.9, count: 120 },
          },
        ],
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
        data: [
          {
            id: 1,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 109.95,
            description:
              'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            category: "men's clothing",
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            rating: {
              rate: 3.9,
              count: 120,
            },
          },
          {
            id: 2,
            title: 'Mens Casual Premium Slim Fit T-Shirts ',
            price: 22.3,
            description:
              'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
            category: "men's clothing",
            image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
            rating: {
              rate: 4.1,
              count: 259,
            },
          },
        ],
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
        data: [
          {
            id: 1,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 109.95,
            description:
              'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            category: 'jewelery',
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            rating: {
              rate: 3.9,
              count: 120,
            },
          },
          {
            id: 5,
            title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            price: 695,
            description:
              "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
            category: 'jewelery',
            image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
            rating: {
              rate: 4.6,
              count: 400,
            },
          },
        ],
      };

      axios.get.mockResolvedValue(mockedData);
      await expect(getCategoryProducts(mockUrl, 'jewelery')).resolves.toEqual(mockedData.data);
    });

    it('should throw error if request fails', async () => {
      const errorMessage = 'Failed to fetch products';
      axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(getCategoryProducts(mockUrl, 'jewelery')).rejects.toThrow(errorMessage);
    });
  });
});
