import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { Link } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import data from "./helper/data";

export default function Home() {
    const [recipes, setRecipes] = useState([]);

    const db = SQLite.openDatabaseSync("cousin.db");

    useEffect(() => {
        db.execAsync(`
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT,
            ingredients TEXT NOT NULL,
            instructions TEXT,
            image TEXT NOT NULL
        );
    `)
            .then(() => seedDatabase())
            .then(() => loadRecipes())
            .catch((err) => {
                console.error("Database error:", err);
            });
    }, []);

    const seedDatabase = async () => {
        try {
            const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM recipes;');

            if (result.count === 0) {
                for (const recipe of data) {
                    const ingredientsString = Array.isArray(recipe.ingredients)
                        ? recipe.ingredients.join(', ')
                        : recipe.ingredients;

                    await db.runAsync(
                        `INSERT INTO recipes (title, category, ingredients, instructions, image) VALUES (?, ?, ?, ?, ?);`,
                        [
                            recipe.title,
                            recipe.category || 'lunch',
                            ingredientsString,
                            recipe.instructions,
                            recipe.image
                        ]
                    );
                }
            }
        } catch (error) {
            console.error("Seed error:", error);
        }
    };

    const loadRecipes = async () => {
        const rows = await db.getAllAsync(`SELECT * FROM recipes`);
        setRecipes(rows);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Recipe App
                </Text>

                <Text style={styles.subtitle}>
                    Discover delicious recipes
                </Text>

                <View style={styles.buttons}>
                    <Link href="/popularRecipes" style={styles.button}>
                        Popular Recipes 🥇
                    </Link>

                    <Link href="/category" style={styles.button}>
                        Categories 📜
                    </Link>

                    <Link href="/search" style={styles.button}>
                        Search Recipes 🔍
                    </Link>

                    <Link href="/myRecipe" style={styles.button}>
                        My Recipes ✒️
                    </Link>
                </View>
            </View>

            <View style={styles.footerContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80' }}
                    style={styles.footerImage}
                    resizeMode="cover"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F5F0",
        justifyContent: "space-between",
    },
    content: {
        paddingHorizontal: 25,
        paddingTop: 80,
    },
    title: {
        fontSize: 38,
        fontWeight: "800",
        color: "#1B4332",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: "#6B6B6B",
        marginBottom: 30,
    },
    buttons: {
        gap: 15,
        top: 80
    },
    button: {
        backgroundColor: "#FFFFFF",
        color: "#1B4332",
        height: 60,
        borderRadius: 18,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 17,
        fontWeight: "600",
        paddingVertical: 18,
        borderWidth: 1,
        borderColor: "#E5E1DA",
    },
    footerContainer: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderRadius: 5,
        bottom: 5
    },
    footerImage: {
        width: "100%",
        height: "100%",
    },
});