import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

export default function SearchScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]);

    const db = SQLite.openDatabaseSync("cousin.db");

    useEffect(() => {
        searchRecipes(searchQuery);
    }, [searchQuery]);

    const searchRecipes = async (text) => {
        if (!text.trim()) {
            setRecipes([]);
            return;
        }

        try {
            const query = `%${text.toLowerCase().trim()}%`;
            const rows = await db.getAllAsync(
                `SELECT * FROM recipes 
                 WHERE LOWER(title) LIKE ? 
                    OR LOWER(ingredients) LIKE ? 
                    OR LOWER(category) LIKE ? 
                 ORDER BY id DESC;`,
                [query, query, query]
            );
            setRecipes(rows);
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by title, ingredient or category..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {searchQuery.trim() === ''
                                ? 'Type something to search recipes...'
                                : 'No recipes found.'}
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {item.image ? (
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                        ) : null}
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardCategory}>
                                {item.category ? item.category.toUpperCase() : ''}
                            </Text>
                            <Text style={styles.cardText} numberOfLines={2}>
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
                                            image: item.image,
                                            is_user: item.is_user
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
        paddingTop: 50,
    },
    searchInput: {
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E5E1DA",
        marginBottom: 15,
        color: "#1B4332",
    },
    listContent: {
        paddingBottom: 30,
    },
    emptyContainer: {
        paddingTop: 40,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#6B6B6B",
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E5E1DA",
        overflow: "hidden",
    },
    cardImage: {
        width: "100%",
        height: 150,
    },
    cardContent: {
        padding: 15,
        gap: 6,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1B4332",
    },
    cardCategory: {
        fontSize: 13,
        color: "#2D6A4F",
        fontWeight: "700",
    },
    cardText: {
        fontSize: 14,
        color: "#6B6B6B",
    },
    button: {
        backgroundColor: "#1B4332",
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },
});