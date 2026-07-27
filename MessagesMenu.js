import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.left}>
            <Text style={styles.icon}>🔙</Text>
            <Text style={styles.name}>Bob</Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.icon}>📞</Text>
            <Text style={styles.icon}>📽</Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.body}>
          <View style={styles.rightMessage}>
            <Text style={styles.messageText}>Hi, Whats up?!</Text>
          </View>

          <View style={styles.leftMessage}>
            <Text style={styles.messageText}>Hi, Everything is good. And you?</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.icon}>📸</Text>
          <View style={styles.right}>
            <Text style={styles.icon}>🎙</Text>
            <Text style={styles.icon}>🖼</Text>
            <Text style={styles.icon}>➕</Text>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 160,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  icon: {
    fontSize: 18,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    gap: 20,
  },
  rightMessage: {
    alignSelf: 'flex-end',
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 15,
    padding: 12,
  },
  leftMessage: {
    alignSelf: 'flex-start',
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 15,
    padding: 12,
  },
  messageText: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    height: 60,
  },
});