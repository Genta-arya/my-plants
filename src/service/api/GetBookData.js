import {AxiosConfig} from '../AxiosConfig';

export const getBook = async (page) => {
  try {
    const response = await AxiosConfig.get(`/books?page=${page}`);
    return response.data.books;
  } catch (error) {
    throw error;
  }
};


export const getEBook = async (page) => {
  try {
    const response = await AxiosConfig.get(`/ebooks?page=${page}`);
    return response.data.books;
  } catch (error) {
    throw error;
  }
};



export const newBook = async() => {
    try {
        const response = await AxiosConfig.get('/book/random');
        return response.data.books;
    } catch (error) {
        throw error
    }
}


export const newEBook = async() => {
    try {
        const response = await AxiosConfig.get('/ebook/random');
        return response.data.books;
    } catch (error) {
        throw error
    }
}