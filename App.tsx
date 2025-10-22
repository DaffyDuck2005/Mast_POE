import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Modal, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilterScreen from './Filter'; // Assuming Filter.tsx exports a default component
import StarterScreen from './Starter';
import MainsScreen from './Mains';
import DessertScreen from './Dessert';

const initialMenuItems = [
  { name: 'Fish & Chips', price: 'R127.99' },
  { name: 'Cheeseburger', price: 'R89.99' },
  { name: 'Margherita Pizza', price: 'R75.00' },
  { name: 'Caesar Salad', price: 'R65.00' },
  { name: 'Pasta Primavera', price: 'R95.00' },
  { name: 'Grilled Salmon', price: 'R150.00' },
  { name: 'Chocolate Cake', price: 'R45.00' },
  { name: 'Tiramisu', price: 'R55.00' },
  { name: 'Cheesecake', price: 'R60.00' },
  { name: 'Lentil Soup', price: 'R19.00' },
  { name: 'Garlic Bread', price: 'R24.00' },
  { name: 'Bruschetta', price: 'R29.00' },
  { name: 'Caprese Salad', price: 'R14.00' },
  { name: 'Stuffed Peppers', price: 'R21.00' },
  { name: 'Mushroom Risotto', price: 'R27.00' },
  { name: 'Chicken Curry', price: 'R87.00' },
  { name: 'Chicken Fried Rice', price: 'R105.00' },
  { name: 'Lamb Chops', price: 'R135.00' },
];

function MenuScreen({ navigation }: { navigation: any }) {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [modalVisible, setModalVisible] = useState(false);

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<string | null>(null);
  const [showCourseOptions, setShowCourseOptions] = useState(false);
  const courses = ["Starters", "Mains", "Desserts"];

  const handleAddItem = () => {
    if (!dishName || !price) {
      alert('Please enter a dish name and price.');
      return;
    }
    const newItem = { name: dishName, price: `R${parseFloat(price).toFixed(2)}` };
    setMenuItems([...menuItems, newItem]);
    setDishName('');
    setDescription('');
    setPrice('');
    setCourse(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.divider} />
        <Text style={styles.itemCount}>{menuItems.length} Items</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Item</Text>
            
            <Text style={styles.label}>Dish Name</Text>
            <TextInput style={styles.input} value={dishName} onChangeText={setDishName} />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} />

            <Text style={styles.label}>Select Course</Text>
            <View>
              <Pressable style={styles.input} onPress={() => setShowCourseOptions(!showCourseOptions)}>
                <Text style={styles.inputText}>{course || 'Select course'}</Text>
              </Pressable>
              {showCourseOptions && (
                <View style={styles.dropdown}>
                  {courses.map((c, index) => (
                    <Pressable
                      key={index}
                      style={styles.dropdownOption}
                      onPress={() => { setCourse(c); setShowCourseOptions(false); }}
                    >
                      <Text style={styles.dropdownOptionText}>{c}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

            <View style={styles.modalButtonWrapper}>
              <Pressable style={[styles.button, styles.modalButton]} onPress={handleAddItem}>
                <Text style={styles.buttonText}>Add Item</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.modalButton, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.buttonText, styles.textStyle]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => navigation.navigate('Filter')}>
            <Text style={styles.buttonText}>Filter</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Add Item</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Starter" component={StarterScreen} />
        <Stack.Screen name="Mains" component={MainsScreen} />
        <Stack.Screen name="Dessert" component={DessertScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
    fontSize: 18,
  },
  menuItemPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    height: '50%',
    marginHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 35,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonClose: {
    backgroundColor: '#a0a0a0',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: -15,
    marginBottom: 20,
  },
  dropdownOption: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  dropdownOptionText: { fontSize: 16 },
});
