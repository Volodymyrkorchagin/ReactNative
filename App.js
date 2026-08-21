import {
  StyleSheet,
  Text,
  View,
  FlatList,
  useWindowDimensions,
  Switch,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import React, { useState } from 'react';

export default function App() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [tasks, setTasks] = useState([
    { id: '1', name: 'Buy groceries', done: false },
    { id: '2', name: 'Cook dinner', done: false },
    { id: '3', name: 'Cleaning', done: false },
    { id: '4', name: 'Free time', done: false },
  ]);

  const [description, setDescription] = useState([
    { id: '1', text: 'Buy groceries with coupons' },
    { id: '2', text: 'Bring groceries home and wash them' },
    { id: '3', text: 'Charge the robot vacuum' },
    { id: '4', text: '...' },
  ]);

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
        )
    );
  };

  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>ToDoList</Text>

          {!isTablet ? (
              <FlatList
                  data={tasks}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                      <View style={styles.taskContainer}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Switch
                            trackColor={{ false: 'gray', true: 'white' }}
                            thumbColor={item.done ? 'orange' : 'darkgray'}
                            value={item.done}
                            onValueChange={() => toggleTask(item.id)}
                        />
                      </View>
                  )}
              />
          ) : (
              <View style={styles.rowLayout}>
                <View style={styles.leftColumn}>
                  <FlatList
                      data={tasks}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                          <View style={styles.taskContainer}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Switch
                                trackColor={{ false: 'gray', true: 'white' }}
                                thumbColor={item.done ? 'orange' : 'darkgray'}
                                value={item.done}
                                onValueChange={() => toggleTask(item.id)}
                            />
                          </View>
                      )}
                  />
                </View>

                <View style={styles.rightColumn}>
                  <FlatList
                      data={description}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item }) => (
                          <View style={styles.descriptionContainer}>
                            <Text style={styles.text}>{item.text}</Text>
                          </View>
                      )}
                  />
                </View>
              </View>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efe7be',
    paddingHorizontal: 10,
  },
  rowLayout: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  taskContainer: {
    backgroundColor: '#d57777',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 4,
    flexDirection: 'row',
  },
  descriptionContainer: {
    backgroundColor: '#955c2e',
    alignItems: 'center',
    padding: 22,
    marginVertical: 4,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Roboto',
    color: '#22014e',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#000000',
    textAlign: 'center',
    marginVertical: 10,
  },
});