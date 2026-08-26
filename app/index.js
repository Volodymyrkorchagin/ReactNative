import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { subjects } from "./helper/data";

export default function Subjects() {
    const router = useRouter();

    const handlePress = (id) => {
        router.push(`/subjects/${id}`);
    };

    return (
        <View style={styles.container}>
            {subjects.map((subject) => (
                <TouchableOpacity
                    key={subject.id}
                    style={styles.button}
                    onPress={() => handlePress(subject.id)}
                >
                    <Text style={styles.buttonText}>{subject.title}</Text>
                </TouchableOpacity>
            ))}
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
    button: {
        backgroundColor: "#ffffff",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#a224ec",
        width: "100%",
        maxWidth: 300,
        alignItems: "center",
    },
    buttonText: {
        color: "#a224ec",
        fontSize: 18,
        fontWeight: "600",
    },
});