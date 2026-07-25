import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Switch, Text, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>TASKS</Text>

      <View style={styles.box}>
        <View style={styles.task}>
          <Text style={styles.text}>Vacuum the house</Text>
          <Switch style={{ marginTop: 30 }} />
        </View>
        <View style={styles.task}>
          <Text style={styles.text}>Buy groceries</Text>
          <Switch style={{ marginTop: 30 }} />
        </View>
        <View style={styles.task}>
          <Text style={styles.text}>Pick up the mail</Text>
          <Switch style={{ marginTop: 30 }} />
        </View>
        <View style={styles.task}>
          <Text style={styles.text}>One's own affairs</Text>
          <Switch style={{ marginTop: 30 }} />
        </View>

        <View style={styles.iconRow}>
          <Ionicons name="alert-circle-outline" size={32} color="black" />
          <Ionicons name="calendar-outline" size={32} color="black" />
          <Ionicons name="checkmark-circle-outline" size={32} color="black" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2cdabf',
    padding: 60,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    textAlign: 'center',
    color: 'white',
    padding: 30,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Helvetica',
    textAlign: 'left',
    color: 'coral',
    fontWeight: 'bold',
  },
  box: {
    borderWidth: 4,
    borderColor: 'black',
    height: 600,
  },
  task: {
    borderWidth: 2,
    borderColor: 'gray',
    height: 100,
    margin: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
  }
});
