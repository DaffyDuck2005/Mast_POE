import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import AddItem from './AddItem';

function MenuScreen({ navigation }: { navigation: any }) {
  const menuItems = [
    { name: 'Menu Item 1', price: 'R10.00' },
    { name: 'Menu Item 2', price: 'R12.50' },
    { name: 'Menu Item 3', price: 'R15.00' },
    { name: 'Menu Item 4', price: 'R8.00' },
    { name: 'Menu Item 5', price: 'R25.00' },
    { name: 'Menu Item 6', price: 'R30.00' },
    { name: 'Menu Item 7', price: 'R22.00' },
    { name: 'Menu Item 8', price: 'R18.50' },
    { name: 'Menu Item 9', price: 'R45.00' },
    { name: 'Menu Item 10', price: 'R11.00' },
    { name: 'Menu Item 11', price: 'R16.00' },
    { name: 'Menu Item 12', price: 'R19.00' },
    { name: 'Menu Item 13', price: 'R24.00' },
    { name: 'Menu Item 14', price: 'R29.00' },
    { name: 'Menu Item 15', price: 'R14.00' },
    { name: 'Menu Item 16', price: 'R21.00' },
    { name: 'Menu Item 17', price: 'R27.00' },
    { name: 'Menu Item 18', price: 'R33.00' },
    { name: 'Menu Item 19', price: 'R9.00' },
    { name: 'Menu Item 20', price: 'R13.50' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.divider} />
        <Text style={styles.itemCount}>{menuItems.length} Items</Text>
      </View>

      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
        {menuItems.map((item, index) => (
          <View key={index} style={styles.menuItemContainer}>
            <Text style={styles.menuItemText}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>{item.price}</Text>
          </View>
        ))}
        </ScrollView>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.divider} />
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Filter</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('AddItem')}>
            <Text style={styles.buttonText}>Add Item</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  const [route, setRoute] = useState<'Menu' | 'AddItem'>('Menu');

  const navigation = {
    navigate: (screen: 'Menu' | 'AddItem') => setRoute(screen),
    goBack: () => setRoute('Menu'),
  } as any;

  return route === 'Menu' ? <MenuScreen navigation={navigation} /> : <AddItem navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: 80,
  },
  bottomContainer: {
    paddingBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.03)'
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  divider: {
    width: '100%',
    height: 5,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
  },
  itemCount: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'green',
    fontSize: 20,
    fontWeight: '600',
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 22,
  },
  menuItemPrice: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  scrollContainer: {
    height: '50%',
    marginHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 10,
  },
});
