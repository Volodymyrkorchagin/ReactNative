import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

const generateQuestion = () => {
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let num1, num2, answer;

  switch (operator) {
    case '+':
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 + num2;
      break;

    case '-':
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
      break;

    case '*':
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      answer = num1 * num2;
      break;

    case '/':
      num2 = Math.floor(Math.random() * 9) + 1;
      answer = Math.floor(Math.random() * 10) + 1;
      num1 = num2 * answer;
      break;
  }

  return {
    questionText: `${num1} ${operator} ${num2}`,
    correctAnswer: answer.toString(),
  };
};

export default function App() {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState(generateQuestion());

  const answerCheck = () => {
    if (answer.trim() === question.correctAnswer) {
      Alert.alert('GREAT! 🎉');
      setCorrectAnswers((prev) => prev + 1);
    } else {
      Alert.alert('WRONG! ❌', `Correct answer: ${question.correctAnswer}`);
    }

    setAnswer('');
    setQuestion(generateQuestion());
  };

  return (
      <View style={styles.container}>
        <Text style={styles.question}>{question.questionText}</Text>

        <TextInput
            placeholder="Enter Your Answer..."
            value={answer}
            keyboardType="numeric"
            onChangeText={setAnswer}
            style={styles.input}
        />

        <Pressable style={styles.button} onPress={answerCheck}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </Pressable>

        <Text style={styles.correctAnswers}>Correct: {correctAnswers}</Text>

        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b9ffcc',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  question: {
    color: '#000000',
    fontSize: 36,
    fontWeight: 'bold',
  },
  correctAnswers: {
    color: '#8c8c8c',
    fontSize: 15,
  },
  input: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    width: '70%',
    height: 40,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fa2da2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});