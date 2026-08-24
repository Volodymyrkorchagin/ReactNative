import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Pressable, Alert} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import React from "react";

export default function Questionnaire() {
    const { name, surname, date } = useLocalSearchParams();

    const [hobby, setHobby] = useState("");
    const [experience, setExperience] = useState("");
    const [previousEmployment , setPreviousEmployment] = useState("");

    const router = useRouter();

    const handleNext = () => {
        if (!hobby.trim() || !experience.trim() || !previousEmployment.trim()) {
            Alert.alert("Error", "Input the data");
            return;
        }
        router.push({
            pathname: '/allInformation',
            params: {
                name,
                surname,
                date,
                hobby,
                previousEmployment,
                experience
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainers}>
                <TextInput
                    style={styles.input}
                    placeholder="Hobbys..."
                    value={hobby}
                    onChangeText={setHobby}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Previous place of employment..."
                    value={previousEmployment}
                    onChangeText={setPreviousEmployment}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Experience..."
                    value={experience}
                    onChangeText={setExperience}
                    keyboardType="numeric"
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