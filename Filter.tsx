import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type FilterProps = {
  onClose: () => void;
};

const Filter: React.FC<FilterProps> = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Options</Text>
      {/* You can add your filter controls here */}
      <Button title="Apply Filters" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Filter;