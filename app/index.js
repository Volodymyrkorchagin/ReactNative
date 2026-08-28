import {View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Alert} from "react-native";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Label} from "expo-router/build/native-tabs";

export default function GuessGame() {
    const [level, setLevel] = useState(0);
    const [score, setScore] = useState(0);
    const [input, setInput] = useState("");
    const [attempt, setAttempt] = useState(0);
    const [targetNumber, setTargetNumber] = useState(generateNumber());
    const [label, setLabel] = useState("");

    function generateNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }

    useEffect(() => {
        loadProgress();
    }, [])

    useEffect(() => {
        saveProgress(level, score, attempt);
    }, [level, score, attempt]);

    const handleGuess = () => {
        const userGuess = parseInt(input, 10);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            Alert.alert("Invalid Input", "Please enter a number between 1 and 10.");
            return;
        }

        if (userGuess === targetNumber) {
            setLabel("Correct!");
            setScore((prev) => prev + 10);
            setLevel((prev) => prev + 1);
            setTargetNumber(generateNumber());
        }
        else if (userGuess > targetNumber) {
            setLabel("The correct number less. Try again!");
        }
        else if (userGuess < targetNumber) {
            setLabel("The correct number larger. Try again!")
        }

        setInput("");
        setAttempt((prev) => prev + 1);
    };

    const saveProgress = async (currentLevel, currentScore, currentAttempt) => {
        try {
            const data = {level: currentLevel, score: currentScore, attempt: currentAttempt};
            await AsyncStorage.setItem("guess", JSON.stringify(data));
        }
        catch (error) {
            console.log(error);
        }
    }

    const loadProgress = async () => {
        try{
            const data = await AsyncStorage.getItem("guess");
            if(data) {
                const parsedData = JSON.parse(data);
                if (parsedData.level) setLevel(parsedData.level);
                if (parsedData.score) setScore(parsedData.score);
                if(parsedData.attempt) setAttempt(parsedData.attempt)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const averageAttempts = level > 0 ? (attempt / level).toFixed(1) : 0;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>GUESS THE NUMBER</Text>
            <Text style={styles.text}>Level: {level}</Text>
            <Text style={styles.text}>Guess the number between 1 and 10</Text>
            <Text style={styles.text}>{label}</Text>

            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleGuess}>
                <Text style={styles.buttonText}>GUESS</Text>
            </TouchableOpacity>

            <Text style={styles.text}>Score: {score}</Text>
            <Text style={styles.text}>Average Attempts: {averageAttempts}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f7",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        gap: 15,
    },
    input: {
        width: "100%",
        maxWidth: 300,
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        textAlign: "center",
        fontSize: 18,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#a224ec",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        width: "100%",
        maxWidth: 300,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
    },
    text: {
        fontSize: 16,
    },
});