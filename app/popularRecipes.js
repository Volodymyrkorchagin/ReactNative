import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Link, useRouter } from "expo-router";
import data from "./helper/data";

export default function Home() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Delicious Recipes 🍳</Text>

            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.cardImage}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardIngredients} numberOfLines={2}>
                                🥑 {item.ingredients}
                            </Text>

                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.7}
                                onPress={() => {
                                    router.push({
                                        pathname: "/recipes/[id]",
                                        params: {
                                            id: item.id,
                                            title: item.title,
                                            ingredients: item.ingredients,
                                            instructions: item.instructions,
                                            image: item.image
                                        }
                                    });
                                }}
                            >
                                <Text style={styles.buttonText}>View Recipe</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F5F0",
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1B4332",
        marginBottom: 20,
    },
    listContent: {
        paddingBottom: 30,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        marginBottom: 20,
        alignItems: "center",
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#E5E1DA",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    cardImage: {
        width: "100%",
        height: 180,
        backgroundColor: "#E5E1DA",
    },
    cardContent: {
        padding: 16,
        alignItems: "center",
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1B4332",
        marginBottom: 6,
    },
    cardIngredients: {
        fontSize: 14,
        color: "#6B6B6B",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#1B4332",
        paddingVertical: 15,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: 300,
        overflow: "hidden",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },
});