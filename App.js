import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const botsMessages = [
  {id: 1, message: 'Hello'},
  {id: 2, message: 'Tell me about yourself'},
  {id: 3, message: "Whats's up"},
  {id: 4, message: 'Can you repeat please?'},
  {id: 5, message: "I dont understand"},
]

export default function App() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  const addItem = () => {
    const t = inputText.trim();
    if(t === '') return

    const newItem = {
      message: t,
      id: Date.now().toString(),
      sender: 'user'
    }

    setMessages(prevItem => [newItem, ...prevItem]);
    setInputText('');

    const randomIndex = Math.floor(Math.random() * botsMessages.length);

    setTimeout(() => {
      const randomBotMessage = botsMessages[randomIndex];

      const botReply = {
        id: Date.now().toString(),
        message: randomBotMessage.message,
        sender: 'bot',
      };

      setMessages(prevMessages => [botReply, ...prevMessages]);
    }, 2500);
  }

  const renderItem = ({ item }) => (
      <View
          style={
            item.sender === 'user'
                ? styles.usersMessageContainer
                : styles.botsMessageContainer
          }
      >
        <Text>{item.message}</Text>
      </View>
  );

  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>

          <View style={styles.messagesContainer}>
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                inverted
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
                style={styles.inputText}
                placeholder="Message..."
                value={inputText}
                onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.button} onPress={addItem}>
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>

          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10,
    gap: 10,
  },
  inputText: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4f58ea',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  usersMessageContainer: {
    backgroundColor: '#757df3',
    borderRadius: 18,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 4,
  },

  botsMessageContainer: {
    backgroundColor: '#e5e5ea',
    borderRadius: 18,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 4,
  },
});