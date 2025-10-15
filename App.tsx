import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Button, Modal} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Filter from './Filter';

export default function App() {
  const [isFilterVisible, setFilterVisible] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#00FF00', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#F0F8FF' }}>Menu</Text>

      <Text style={{ fontSize: 20, color: '#F0F8FF' }}>25 Items</Text>

      <Modal visible={isFilterVisible} animationType="slide">
        <Filter onClose={() => setFilterVisible(false)} />
      </Modal>
     
      <ScrollView>
        <View style={{ height: 150, width: 150, backgroundColor: '#ADD8E6', margin: 10, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#00008B', margin: 10 }}>Fish & Chips</Text>
          <Text style={{ fontSize: 16, color: '#00008B', margin: 10 }}>R45.00</Text>
        </View>

        <View style={{ height: 150, width: 150, backgroundColor: '#ADD8E6', margin: 10, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#00008B', margin: 10 }}>Burger</Text>
          <Text style={{ fontSize: 16, color: '#00008B', margin: 10 }}>R30.00</Text>
        </View>

        <View style={{ height: 150, width: 150, backgroundColor: '#ADD8E6', margin: 10, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#00008B', margin: 10 }}>Pizza</Text>
          <Text style={{ fontSize: 16, color: '#00008B', margin: 10 }}>R60.00</Text>
        </View>

        <View style={{ height: 150, width: 150, backgroundColor: '#ADD8E6', margin: 10, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#00008B', margin: 10 }}>Salad</Text>
          <Text style={{ fontSize: 16, color: '#00008B', margin: 10 }}>R25.00</Text>
        </View>

        <View style={{ height: 150, width: 150, backgroundColor: '#ADD8E6', margin: 10, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#00008B', margin: 10 }}>Pasta</Text>
          <Text style={{ fontSize: 16, color: '#00008B', margin: 10 }}>R50.00</Text>
        </View> 

        <View style={{ height: 150, width: 150, backgroundColor: '#ADD8E6', margin: 10, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#00008B', margin: 10 }}>Steak</Text>
          <Text style={{ fontSize: 16, color: '#00008B', margin: 10 }}>R80.00</Text>
        </View>

        <View style={{ height: 150, width: 150, backgroundColor: '#ADD8E6', margin: 10, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#00008B', margin: 10 }}>Sushi</Text>
          <Text style={{ fontSize: 16, color: '#00008B', margin: 10 }}>R70.00</Text>
        </View>

      </ScrollView>
      

      
      <Button title="Filter" onPress={() => setFilterVisible(true)} />

      <Button title="Add Item" onPress={() => {}} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
