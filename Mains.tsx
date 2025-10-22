import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Mains({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Mains</Text>
        <View style={styles.divider} />
      </View>

      {/* This is where your mains menu items will go */}
      <View style={styles.mainContentArea}>
        <Text style={{ color: '#fff', fontSize: 16 }}>
          Mains menu items will be displayed here.
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.divider} />
        <View style={styles.buttonWrapper}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.buttonText}>Menu</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  topContainer: {
    alignItems: 'center',
    paddingTop: 80, // Adjust as needed for status bar/header
  },
  title: {
    color: '#fff',
    fontSize: 30, // Consistent with App.tsx title
    fontWeight: 'bold',
    marginBottom: 20,
  },
  divider: {
    width: '100%',
    height: 5,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
  },
  mainContentArea: {
    flex: 1, // Takes up available space between top and bottom
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  bottomContainer: {
    paddingBottom: 40, // Consistent with App.tsx
    backgroundColor: 'rgba(255,255,255,0.03)', // Consistent with App.tsx
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    justifyContent: 'center', // Center the single button
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 12, // Consistent with App.tsx
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'green',
    fontSize: 20, // Consistent with App.tsx
    fontWeight: '600', // Consistent with App.tsx
  },
});
