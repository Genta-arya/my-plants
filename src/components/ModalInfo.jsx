import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  Animated,
  Pressable,
  StatusBar,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const ModalInfo = ({visible, onClose}) => {
  const [region, setRegion] = useState({
    latitude: -1.819111,
    longitude: 109.972386,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const bottomSheetHeight = SCREEN_HEIGHT * 0.1; // Height when fully collapsed
  const [modalHeight, setModalHeight] = useState(SCREEN_HEIGHT * 0.1); // Initial height

  const bottomSheetAnimation = useRef(
    new Animated.Value(SCREEN_HEIGHT * 0.8),
  ).current;

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: bottomSheetAnimation}}],
    {useNativeDriver: false},
  );

  const onHandlerStateChange = event => {
    const threshold = SCREEN_HEIGHT * 0.2; // Threshold for swipe

    if (event.nativeEvent.translationY < -threshold) {
      // Swipe up
      Animated.timing(bottomSheetAnimation, {
        toValue: bottomSheetHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setModalHeight(bottomSheetHeight);
    } else if (event.nativeEvent.translationY > threshold) {
      // Swipe down
      Animated.timing(bottomSheetAnimation, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: false,
      }).start(onClose);
      setModalHeight(SCREEN_HEIGHT);
    } else {
      // Snap back to the initial height
      Animated.spring(bottomSheetAnimation, {
        toValue: SCREEN_HEIGHT * 0.8,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.spring(bottomSheetAnimation, {
        toValue: modalHeight,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottomSheetAnimation, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: false,
      }).start(onClose);
    }
  }, [visible]);

  const handleZoomIn = () => {
    setRegion(prevRegion => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 0.8,
      longitudeDelta: prevRegion.longitudeDelta * 0.8,
    }));
  };

  const handleZoomOut = () => {
    setRegion(prevRegion => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 1.2,
      longitudeDelta: prevRegion.longitudeDelta * 1.2,
    }));
  };

  if (!visible) return null;


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.8)"
      />
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}>
        <View style={styles.modalBackground}>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}>
            <Animated.View
              style={[
                styles.modalContainer,
                {transform: [{translateY: bottomSheetAnimation}]},
              ]}>
              <Pressable onPress={onClose}>
                <View style={styles.handle} />
              </Pressable>
              <Text style={styles.modalTitle}>Healty Plants</Text>
              <Text style={styles.modalText}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </Text>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  modalTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    color: 'gray',
    fontSize: 14,
    marginBottom: 20,
  },
 
 
});

export default ModalInfo;
