import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import initialRecipes from '../helper/data';

export default function DynamicCategoryScreen() {
    const router = useRouter();
    const { category } = useLocalSearchParams();
    const [recipes, setRecipes] = useState([]);

    const db = SQLite.openDatabaseSync("cousin.db");

    useEffect(() => {
        loadCategoryRecipes();
    }, [category]);

    const loadCategoryRecipes = async () => {
        try {
            const dbRows = await db.getAllAsync(
                `SELECT * FROM recipes WHERE LOWER(category) = LOWER(?);`,
                [category]
            );

            const userRecipes = dbRows.map(item => ({
                ...item,
                uniqueKey: `db_${item.id}`
            }));

            const staticRecipes = (initialRecipes || [])
                .filter(item => item.category && item.category.toLowerCase() === String(category).toLowerCase())
                .map((item, index) => ({
                    ...item,
                    uniqueKey: `static_${item.id || index}`
                }));

            setRecipes([...userRecipes, ...staticRecipes]);
        } catch (error) {
            console.error("Failed to load category recipes:", error);
        }
    };

    const formatTitle = (cat) => {
        if (!cat) return 'Recipes 🍽️';
        return String(cat).charAt(0).toUpperCase() + String(cat).slice(1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>{formatTitle(category)}</Text>

            <FlatList
                data={recipes}
                keyExtractor={(item) => item.uniqueKey}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No recipes in this category yet.</Text>
                    </View>
                }
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
    emptyContainer: {
        paddingTop: 50,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#6B6B6B",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E5E1DA",
        elevation: 3,
        overflow: "hidden",
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
        textAlign: "center",
    },
    cardIngredients: {
        fontSize: 14,
        color: "#6B6B6B",
        marginBottom: 20,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#1B4332",
        paddingVertical: 14,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "600",
    },
});