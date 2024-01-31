import axios from './api';
import { Product } from '../types/api/products';

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get<Product[]>('/products');
    return data;
  } catch (error) {
    console.log('error fetching products', error);
    return [];
  }
};
