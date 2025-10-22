import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Modal, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FilterScreen from './Filter'; // Assuming Filter.tsx exports a default component
import StarterScreen from './Starter';
import MainsScreen from './Mains';
import DessertScreen from './Dessert';
import { MenuContext, MenuProvider, MenuItem } from './MenuContext';

// MenuItem type imported from menuData.ts

function MenuScreen({ navigation }: { navigation: any }) {
  const { items: menuItems, addItem } = useContext(MenuContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<string | null>(null);
  const [showCourseOptions, setShowCourseOptions] = useState(false);
  const [showDescriptionOverlay, setShowDescriptionOverlay] = useState(false);
  const [selectedItemDescription, setSelectedItemDescription] = useState<string | null>(null);
  const courses = ["Starters", "Mains", "Desserts"];

  const handleAddItem = () => {
    let message = 'Please fill in required fields:';
    let hasError = false;
    
    if (!dishName.trim()) {
      message += '\n- Dish Name';
      hasError = true;
    }
    if (!description.trim()) {
      message += '\n- Description';
      hasError = true;
    }
    if (!price.trim() || isNaN(parseFloat(price))) {
      message += '\n- Price (must be a valid number)';
      hasError = true;
    }
    if (!course) {
      message += '\n- Course';
      hasError = true;
    }

    if (hasError) {
      alert(message);
      return;
    }
  const newItem: MenuItem = { name: dishName, price: `R${parseFloat(price).toFixed(2)}`, description: description, course: course as MenuItem['course'] };
    addItem(newItem);
    setDishName('');
    setDescription('');
    setPrice('');
    setCourse(null);
    setModalVisible(false);
  };

  const handleItemTap = (item: MenuItem) => {
    if (showDescriptionOverlay && selectedItemDescription === item.description) {
      setShowDescriptionOverlay(false);
      setSelectedItemDescription(null);
    } else {
      setSelectedItemDescription(item.description ?? 'No description available.');
      setShowDescriptionOverlay(true);
    }
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
          <Pressable key={index} onPress={() => handleItemTap(item)}>
            <View style={styles.menuItemContainer}>
              <Text style={styles.menuItemText}>{item.name}</Text>
              <Text style={styles.menuItemPrice}>{item.price}</Text>
            </View>
          </Pressable>
        ))}
        </ScrollView>
        {showDescriptionOverlay && (
          <Pressable
            style={styles.fullDescriptionOverlay}
            onPress={() => {
              setShowDescriptionOverlay(false);
              setSelectedItemDescription(null);
            }}>
            <Text style={styles.descriptionText}>{selectedItemDescription}</Text>
          </Pressable>
        )}
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Filter" component={FilterScreen} />
          <Stack.Screen name="Starter" component={StarterScreen} />
          <Stack.Screen name="Mains" component={MainsScreen} />
          <Stack.Screen name="Dessert" component={DessertScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
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
  fullDescriptionOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  descriptionOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
  },
  name: {
    color: '#fff',
    fontSize: 18,
  },
  price: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
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
