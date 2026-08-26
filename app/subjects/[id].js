import { useLocalSearchParams, Link } from "expo-router";
import {StyleSheet, Text, View, Image, FlatList} from "react-native";
import { subjects } from "../helper/data";

export default function Subject() {
    const { id } = useLocalSearchParams();

    const subject = subjects.find((subject) => subject.id === Number(id));

    return (
        <View style={styles.container}>
            <Link href="/" style={styles.backButton}>
                ← BACK
            </Link>

            {subject ? (
                <View style={styles.subjectCard}>
                    <Image
                        style={styles.image}
                        source={{ uri: subject.imageUrl }}
                    />
                    <Text style={styles.title}>{subject.title}</Text>
                    <FlatList
                        data={subject.theme}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.theme}>{item}</Text>
                            </View>
                        )}
                    />
                </View>
            ) : (
                <Text style={styles.notFound}>Subject not found</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccfbe5",
        padding: 20,
    },
    subjectCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        width: "100%",
        maxWidth: 320,
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 12,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1f2937",
        textAlign: "center",
        padding: 15
    },
    backButton: {
        backgroundColor: "#1f2937",
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        top: 50,
        left: 20,
    },
    notFound: {
        fontSize: 18,
        color: "#6b7280",
    },
    theme: {
        fontFamily: "Roboto",
        fontSize: 16,
        gap: 10,
        padding: 5
    }
});