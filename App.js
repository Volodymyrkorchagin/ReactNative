import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const fetchQuestion = () => {
    axios
        .get('https://opentdb.com/api.php?amount=1')
        .then((response) => {
          const item = response.data.results[0];
          setData(item);

          const allAnswers = [item.correct_answer, ...item.incorrect_answers];
          setAnswers(allAnswers.sort(() => Math.random() - 0.5));
        })
        .catch(() => {
          setError('Error loading data');
        })
        .finally(() => {
          setLoading(false);
        });
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === data.correct_answer;
    alert(isCorrect ? 'RIGHT!' : 'WRONG!');

    fetchQuestion();
  };

  return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {loading && <ActivityIndicator size="large" color="#7ff1df" />}

          {error && !loading && <Text style={styles.errorText}>{error}</Text>}

          {!loading && !error && data && (
              <View style={styles.header}>
                <Text style={styles.title}>TRIVIA QUIZ</Text>

                <Text style={styles.questionText}>
                  {data?.question}
                </Text>

                <FlatList
                    data={answers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.answerButton}
                            onPress={handleAnswer}
                        >
                          <Text style={styles.answerBtnText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
              </View>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cdd1f6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#7ff1df',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4a4a4a',
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#f0f2fe',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cdd1f6',
    marginBottom: 10,
    alignItems: 'center',
  },
  answerBtnText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  errorText: {
    color: '#d9534f',
    fontSize: 16,
    fontWeight: '500',
  },
});