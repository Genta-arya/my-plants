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
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item.predicted_class}</Text>
                    <Text style={styles.info}>{item.info}</Text>
                    <Text style={styles.solutionTitle}>Saran Perawatan</Text> 
                    <Text style={styles.solution}>- {item.solution}</Text>
                </View>
                
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
    backgroundColor: '#f7f7f7',
  },
  imageContainer: {
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#27ae60',
    padding: 5,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dddddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    color: '#2c3e50',
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 12,
    textAlign: 'center',
  },
  solutionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#27ae60',
    textAlign: 'left',
    
    borderBottomColor: '#27ae60',
    paddingBottom: 4,
  },
  solution: {
    fontSize: 16,
    color: '#27ae60',
    marginBottom: 16,
    textAlign: 'justify',
  },
  historyListContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    paddingTop: 16,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2c3e50',
    textAlign: 'left',
  },
});

export default DetailScreen;
