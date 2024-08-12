import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import icon from '../Assets/icon.jpeg'; // Pastikan jalur impor sesuai dengan struktur proyek Anda
import Icon from 'react-native-vector-icons/FontAwesome'; // Pastikan untuk menginstal font-awesome atau sesuaikan dengan ikon lainnya
import ModalInfo from './ModalInfo';


const Welcome = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Healty Plants</Text>
          <Text style={styles.subtitle}>version 1.0</Text>
        </View>
        <TouchableOpacity
          style={styles.alertIconContainer}
          onPress={handleOpenModal}>
          <Icon name="info" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      {modalVisible && (
        <ModalInfo
          message={'test'}
          onClose={handleCloseModal}
          title={'Tentang Kami'}
          visible={modalVisible}
        />
      
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderBottomWidth: 4,
    borderBottomColor: '#8B8C7A',
    backgroundColor: '#0FA588',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
  },
  alertIconContainer: {
    marginLeft: 16,
  },
});

export default Welcome;
