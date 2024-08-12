import { ActivityIndicator} from 'react-native';
import React from 'react';

const Indicator = () => {
  return (
    <ActivityIndicator
      size="large"
      color="#1D4ED8"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{translateX: -16}, {translateY: -16}],
      }}
    />
  );
};

export default Indicator;
