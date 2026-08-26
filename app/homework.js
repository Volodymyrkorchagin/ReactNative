import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router";
import React from "react";

const homeworkData = [
    { id: '1', subject: 'Mathematics', task: 'Page 15, Ex. 1-4' },
    { id: '2', subject: 'English', task: 'Read Chapter 3 & write summary' },
    { id: '3', subject: 'Physics', task: 'Lab report #2' },
    { id: '4', subject: 'History', task: 'Paragraph 12, questions 1-5' },
];

export default function Homework() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Homework</Text>

            <FlatList
                data={homeworkData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.subjectTitle}>{item.subject}</Text>
                        <Text style={styles.taskText}>{item.task}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f7",
        paddingTop: 60,
        paddingHorizontal: 20,
        gap: 5,
        padding: 10
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1f2937",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 12,
        borderLeftWidth: 5,
        borderLeftColor: "#a224ec",
    },
    subjectTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#a224ec",
        marginBottom: 4,
    },
    taskText: {
        fontSize: 16,
        color: "#4b5563",
    },
});