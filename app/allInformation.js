import { View, Text, StyleSheet } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";

export default function Questionnaire() {
    const { name, surname, date,
        hobby, experience, previousEmployment } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Questionnaire</Text>

            <View style={styles.dataContainers}>
                <View style={styles.item}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{name || '—'}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Surname:</Text>
                    <Text style={styles.value}>{surname || '—'}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Date of birthday:</Text>
                    <Text style={styles.value}>{date || '—'}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Hobby:</Text>
                    <Text style={styles.value}>{hobby || '—'}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Experience:</Text>
                    <Text style={styles.value}>{experience || '—'}</Text>
                </View>

                <View style={styles.item}>
                    <Text style={styles.label}>Previous place of employment:</Text>
                    <Text style={styles.value}>{previousEmployment || '—'}</Text>
                </View>
            </View>

            <Link href="/" style={styles.link}>
                HOME
            </Link>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1c1c1e',
        marginBottom: 20,
    },
    dataContainers: {
        width: '100%',
        maxWidth: 340,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        gap: 12,
        borderColor: '#e5e5ea',
        borderWidth: 1,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f5',
        paddingBottom: 8,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#8e8e93',
    },
    value: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1c1c1e',
    },
    link: {
        marginTop: 30,
        color: '#ffffff',
        borderRadius: 10,
        backgroundColor: '#4f58ea',
        paddingVertical: 12,
        paddingHorizontal: 30,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        overflow: 'hidden',
    }
});