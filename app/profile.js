import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import React from "react";

export default function Profile() {
    return (
        <View style={styles.container}>
            <View style={styles.profileCard}>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://cdn.vectorstock.com/i/500p/30/97/business-man-user-icon-vector-4333097.jpg' }}
                />
                <Text style={styles.name}>Jack</Text>
                <Text style={styles.email}>jack@example.com</Text>
            </View>

            <View style={styles.menuContainer}>
                <Link href="/" style={styles.menuText}>My Subjects</Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f7",
        paddingHorizontal: 20,
        paddingTop: 40,
        gap: 20,
    },
    profileCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1f2937",
    },
    email: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 4,
    },
    menuContainer: {
        gap: 12,
        alignItems: "center",
    },
    menuText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1f2937",
    },
});