import React, {useState, useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {searchBookApi} from '../../service/api/SearchBook';

const useSearch = () => {
  const [selectedOption, setSelectedOption] = useState('book');
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigation();

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const history = await AsyncStorage.getItem('searchHistory');
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Failed to fetch search history', error);
      }
    };
    fetchSearchHistory();
  }, []);

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const search = (page) => {
    setData([]);
    handleSearch(page);
  };
  const handleSearch = async (pageNum = 1) => {
    setLoading(pageNum === 1);
    setIsFound(false);
    try {
      const response = await searchBookApi(query, pageNum, selectedOption);
      if (pageNum === 1) {
        setData(response.books);
        setTotalPages(response.totalPages);
        setTotalBooks(response.books.length);
      } else {
        setData(prevData => [...prevData, ...response.books]);
        setTotalBooks(prevTotal => prevTotal + response.books.length);
      }
      setPage(pageNum);
      setIsFound(false);

      saveSearchHistory(query);
    } catch (error) {
      if (error.response.status === 404) {
        setIsFound(true)
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const saveSearchHistory = async query => {
    try {
      const updatedHistory = [...new Set([...searchHistory, query])];
      await AsyncStorage.setItem(
        'searchHistory',
        JSON.stringify(updatedHistory),
      );
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to save search history', error);
    }
  };

  const handleReset = () => {
    setQuery('');
    setLoading(false);
    setIsFound(false);
    setData([]);
    setTotalBooks(0);
    setPage(1);
    setShowSuggestions(false);
  };

  const handleBack = () => {
    setQuery('');
    setData([]);
    setTotalBooks(0);
    setPage(1);
    navigate.goBack();
  };

  const handleLoadMore = () => {
    if (!loadingMore && !loading && page < totalPages) {
      setLoadingMore(true);
      handleSearch(page + 1);
    }
  };

  const handleSuggestionSelect = suggestion => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(1);
  };

  const handleRemoveSuggestion = async itemToRemove => {
    try {
      const updatedHistory = searchHistory.filter(
        item => item !== itemToRemove,
      );
      await AsyncStorage.setItem(
        'searchHistory',
        JSON.stringify(updatedHistory),
      );
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to remove search history item', error);
    }
  };

  return {
    query,
    data,
    isFound,
    loading,
    loadingMore,
    showSuggestions,
    totalBooks,
    totalPages,
    selectedOption,
    searchHistory,
    setShowSuggestions,
    handleSearch,
    setQuery,
    handleSuggestionSelect,
    handleBack,
    handleLoadMore,
    handleRemoveSuggestion,
    handleReset,
    handleOptionSelect,
   search,
  };
};

export default useSearch;
