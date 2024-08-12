import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import HistoryList from './HistoryList'; 
import { ScrollView } from 'react-native-gesture-handler';

const DetailScreen = ({ route }) => {
    const { item } = route.params || {};


  const imageUrl = item.image || 'https://via.placeholder.com/150'; 

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.title}>Kondisi: {item.predicted_class}</Text>
        <Text style={styles.info}>{item.info}</Text>
        <Text style={styles.solution}>- {item.solution}</Text>
        
        <View style={styles.historyListContainer}>
          <Text style={styles.historyTitle}>Riwayat Lainya</Text>
          <HistoryList />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
   
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50', 
  },
  info: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 12,
  },
  solution: {
    fontSize: 16,
    color: '#27ae60',
    marginBottom: 16,
  },
  historyListContainer: {
    marginTop: 16,
    borderTopWidth: 1,

    paddingTop: 16,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
  },
});

export default DetailScreen;
