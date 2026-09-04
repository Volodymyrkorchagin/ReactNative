import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';
import initialRecipes from './helper/data'; // Проверьте правильность пути к data.js

export default function SearchScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [allRecipes, setAllRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const db = SQLite.openDatabaseSync("cousin.db");

    useEffect(() => {
        loadAllRecipes();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, selectedCategory, allRecipes]);

    const loadAllRecipes = async () => {
        try {
            const dbRows = await db.getAllAsync('SELECT * FROM recipes ORDER BY id DESC');
            const userList = dbRows.map(item => ({
                ...item,
                uniqueKey: `db_${item.id}`,
                isUserRecipe: true
            }));

            const staticList = (initialRecipes || []).map((item, index) => ({
                ...item,
                uniqueKey: `static_${item.id || index}`,
                isUserRecipe: false
            }));

            setAllRecipes([...userList, ...staticList]);
        } catch (error) {
            console.error("Error loading recipes:", error);
        }
    };

    const applyFilters = () => {
        let result = allRecipes;

        if (selectedCategory && selectedCategory !== 'All') {
            result = result.filter(item =>
                item.category && item.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(item => {
                const titleMatch = item.title && item.title.toLowerCase().includes(query);
                const ingredientsMatch = item.ingredients && item.ingredients.toLowerCase().includes(query);
                return titleMatch || ingredientsMatch;
            });
        }

        setFilteredRecipes(result);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by title or ingredient..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <FlatList
                data={filteredRecipes}
                keyExtractor={(item) => item.uniqueKey}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No recipes found.</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {item.image ? (
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                        ) : null}
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardCategory}>{item.category}</Text>
                            <Text style={styles.cardText} numberOfLines={2}>
                                🥑 {item.ingredients}
                            </Text>

                            <TouchableOpacity
                                style={styles.button}
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
        fontSize: 14,
        color: "#2D6A4F",
        fontWeight: "600",
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