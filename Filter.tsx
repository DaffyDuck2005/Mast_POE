import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Filter({ navigation }: { navigation: any }) {
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Text style={styles.title}>Filter Screen</Text>
				<View style={styles.divider} />
			</View>

			{/* This is where your filter options/controls will go */}
			<View style={styles.mainContentArea}>
				<View style={styles.filterButtonsContainer}>
					<Pressable style={styles.filterButton} onPress={() => navigation.navigate('Starter')}>
						<Text style={styles.filterButtonText}>Starters</Text>
					</Pressable>
					<Pressable style={styles.filterButton} onPress={() => navigation.navigate('Mains')}>
						<Text style={styles.filterButtonText}>Mains</Text>
					</Pressable>
					<Pressable style={styles.filterButton} onPress={() => navigation.navigate('Dessert')}>
						<Text style={styles.filterButtonText}>Dessert</Text>
					</Pressable>
				</View>
			</View>

			<View style={styles.bottomContainer}>
				<View style={styles.divider} />
				<View style={styles.buttonWrapper}>
					<Pressable
						style={({ pressed }) => [
							styles.button,
							{ opacity: pressed ? 0.7 : 1 },
						]}
						onPress={() => navigation.goBack()}>
						<Text style={styles.buttonText}>Back</Text>
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
		justifyContent: 'flex-start',
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
	filterButtonsContainer: {
		flexDirection: 'column', // Changed to column for vertical stacking
		alignItems: 'center', // Center buttons horizontally
		width: '100%',
		marginTop: 20,
	},
	filterButton: {
		backgroundColor: '#fff',
		paddingVertical: 10,
		paddingHorizontal: 55, // Increased padding for wider buttons
		borderRadius: 20,
		marginBottom: 100, // Increased space between buttons
		width: '80%', // Give buttons a consistent width
	},
	filterButtonText: {
		color: 'green',
		fontSize: 30,
		fontWeight: '600',
	},
});
