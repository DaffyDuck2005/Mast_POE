import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Modal, TextInput } from 'react-native';

const initialMenuItems = [
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

function MenuScreen() {
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
          <Pressable style={styles.button} onPress={() => {}}>
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

export default function App() {
  return <MenuScreen />;
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
