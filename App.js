import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [clickPower, setClickPower] = useState(1);

  const buyDoubleClick = () => {
    if (count >= 100) {
      setCount((prev) => prev - 100);
      setClickPower((prev) => prev * 2);
    } else {
      Alert.alert('Not enough clicks!', 'You need 100 clicks to buy this bonus.');
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>THE BEST CLICKER</Text>
        <Text style={styles.count}>Count: {count}</Text>

        <Pressable
            style={styles.button}
            onPress={() => setCount((prev) => prev + clickPower)}
        >
          <Text style={styles.buttonText}>Click Me! (+{clickPower})</Text>
        </Pressable>

        <Text style={styles.sectionHeader}>BONUS MENU</Text>

        <Pressable style={styles.bonusMenu} onPress={buyDoubleClick}>
          <Text style={styles.bonusText}>Bonus: Double Click Power</Text>
          <Text style={styles.bonusText}>Price - 100 clicks</Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f24fb',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  count: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#7f24fb',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    color: 'pink',
    fontSize: 20,
    marginTop: 10,
  },
  bonusMenu: {
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#5002b8',
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 20,
    alignItems: 'center',
  },
  bonusText: {
    color: 'white',
    fontSize: 18,
  },
});