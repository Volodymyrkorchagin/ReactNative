import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, Pressable } from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import React from "react";

export default function Questionnaire() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [date, setDate] = useState("");

    const router = useRouter();

    const handleNext = () => {
        if (!name.trim() || !surname.trim() || !date.trim()) {
            Alert.alert("Error", "Input the data");
            return;
        }

        const dateRegex = /^\d{2}[.-]\d{2}[.-]\d{4}$/;
        if (!dateRegex.test(date) && date <= Date.now()) {
            Alert.alert("Error", "Input the correct date(dd-mmmm-yyyy)");
            return;
        }

        const year = Number(date.split('-')[2]);
        const currentYear = new Date().getFullYear();

        if (year > currentYear || year < 1900) {
            Alert.alert("Error", "Input the correct date");
            return;
        }
        router.push({
            pathname: '/additionallyData',
            params: { name, surname, date }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainers}>
                <TextInput
                    style={styles.input}
                    placeholder="Name..."
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Surname..."
                    value={surname}
                    onChangeText={setSurname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Birthday..."
                    value={date}
                    onChangeText={setDate}
                />
            </View>

            <Pressable style={styles.link} onPress={handleNext}>
                <Text style={styles.text}>NEXT</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    formContainers: {
        width: '100%',
        maxWidth: 320,
        marginBottom: 20,
        gap: 12,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#1c1c1e',
        borderWidth: 1,
        borderColor: '#e5e5ea',
    },
    link: {
        color: '#ffffff',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#4f58ea',
        backgroundColor: '#4f58ea',
        padding: 10,
        paddingHorizontal: 40,
        fontSize: 20,
    },
    text: {
        color: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 5,
    }
});