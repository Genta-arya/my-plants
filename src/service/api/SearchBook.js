import {AxiosConfig} from '../AxiosConfig';

export const searchBookApi = async (q, page, type) => {
  try {
    const endpoint = type === 'ebook' ? '/ebooks/search' : '/books/search';

    const response = await AxiosConfig.get(`${endpoint}?q=${q}&page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
