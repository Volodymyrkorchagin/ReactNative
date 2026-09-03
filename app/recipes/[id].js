import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function RecipeDetail() {
    const { title, ingredients, instructions, image } = useLocalSearchParams();

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.sectionTitle}>Ingredients</Text>
                <Text style={styles.text}>{ingredients}</Text>

                <Text style={styles.sectionTitle}>Instructions</Text>
                <Text style={styles.text}>{instructions}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F5F0",
    },
    image: {
        width: "100%",
        height: 250,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1B4332",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1B4332",
        marginTop: 15,
        marginBottom: 5,
    },
    text: {
        fontSize: 15,
        color: "#4A4A4A",
        lineHeight: 22,
    },
});