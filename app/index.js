import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import React from "react";

export default function Questionnaire() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Link href='/personalData' style={styles.link}>Create your questionnaire</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f7',
        textAlign: 'center',
        alignItems: 'center',
    },
    link: {
        color: '#fa2da2',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#a224ec',
        padding: 10,
        fontSize: 18,
        top: 350
    }
});