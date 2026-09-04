import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Alert,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import popularRecipes from './helper/data';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Drinks'];

export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [image, setImage] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const db = SQLite.openDatabaseSync("cousin.db");

    const initDatabase = async () => {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT,
            ingredients TEXT,
            instructions TEXT,
            image TEXT,
            is_user INTEGER DEFAULT 1
            );
        `);

        await fetchRecipes();
    };

    const fetchRecipes = async () => {
        const dbRows = await db.getAllAsync('SELECT * FROM recipes ORDER BY id DESC');
        setRecipes(dbRows);
    };

    useEffect(() => {
        initDatabase();
    }, []);

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert('Permission denied', 'No photos access granted.');
            return;
        }

        let photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!photo.canceled && photo.assets && photo.assets.length > 0) {
            setImage(photo.assets[0].uri);
        }
    };

    const clearForm = () => {
        setTitle('');
        setCategory('');
        setIngredients('');
        setInstructions('');
        setImage('');
        setEditingId(null);
    };

    const addRecipe = async () => {
        if (!title || !ingredients || !instructions || !category) {
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }

        await db.runAsync(
            `INSERT INTO recipes (title, category, ingredients, instructions, image, is_user) VALUES (?, ?, ?, ?, ?, 1)`,
            [title, category, ingredients, instructions, image]
        );

        clearForm();
        await fetchRecipes();
    };

    const updateRecipe = async () => {
        if (!editingId) return;

        await db.runAsync(
            `UPDATE recipes SET title = ?, category = ?, ingredients = ?, instructions = ?, image = ? WHERE id = ?`,
            [title, category, ingredients, instructions, image, editingId]
        );

        clearForm();
        await fetchRecipes();
    };

    const deleteRecipe = async (id, isUser) => {
        if (isUser !== 1) return;
        await db.runAsync(`DELETE FROM recipes WHERE id = ?`, [id]);
        await fetchRecipes();
    };

    const startEditing = (item) => {
        setEditingId(item.id);
        setTitle(item.title);
        setCategory(item.category);
        setIngredients(item.ingredients);
        setInstructions(item.instructions);
        setImage(item.image || '');
    };

    const renderRecipeItem = ({ item }) => (
        <View style={styles.card}>
            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.cardImage} />
            ) : null}
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardText}>Ingredients: {item.ingredients}</Text>
                <Text style={styles.cardText}>Instructions: {item.instructions}</Text>

                {item.is_user === 1 ? (
                    <View style={styles.cardActions}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => startEditing(item)}
                        >
                            <Text style={styles.editButtonText}>EDIT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteRecipe(item.id, item.is_user)}
                        >
                            <Text style={styles.deleteButtonText}>DELETE</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.staticBadge}>
                        <Text style={styles.staticBadgeText}>Built-in recipe</Text>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.formTitle}>
                    {editingId ? "Edit Recipe" : "Add your recipe"}
                </Text>

                <TextInput
                    placeholder='Title...'
                    placeholderTextColor="#6B6B6B"
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />

                <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => setIsOpen(!isOpen)}
                    >
                        <Text style={styles.selectText}>
                            {category || 'Choose the category...'}
                        </Text>
                        <Text style={styles.arrowText}>{isOpen ? '▲' : '▼'}</Text>
                    </TouchableOpacity>

                    {isOpen && (
                        <View style={styles.dropdown}>
                            {CATEGORIES.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={styles.option}
                                    onPress={() => {
                                        setCategory(cat);
                                        setIsOpen(false);
                                    }}
                                >
                                    <Text style={styles.optionText}>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                <TextInput
                    placeholder='Ingredients...'
                    placeholderTextColor="#6B6B6B"
                    value={ingredients}
                    onChangeText={setIngredients}
                    style={[styles.input, styles.multilineInput]}
                    multiline
                />

                <TextInput
                    placeholder='Instructions...'
                    placeholderTextColor="#6B6B6B"
                    value={instructions}
                    onChangeText={setInstructions}
                    style={[styles.input, styles.multilineInput]}
                    multiline
                />

                <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                    <Text style={styles.imagePickerText}>
                        {image ? 'Change photo' : 'Select photo'}
                    </Text>
                </TouchableOpacity>

                {image ? (
                    <Image source={{ uri: image }} style={styles.previewImage} />
                ) : null}

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={editingId ? updateRecipe : addRecipe}
                >
                    <Text style={styles.submitButtonText}>
                        {editingId ? 'UPDATE RECIPE' : 'ADD RECIPE'}
                    </Text>
                </TouchableOpacity>

                {editingId && (
                    <TouchableOpacity style={styles.cancelButton} onPress={clearForm}>
                        <Text style={styles.cancelButtonText}>CANCEL EDITING</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>All Recipes</Text>
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderRecipeItem}
                    scrollEnabled={false}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F5F0",
    },
    form: {
        paddingHorizontal: 25,
        paddingTop: 50,
        gap: 12,
    },
    formTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1B4332",
        marginBottom: 10,
    },
    input: {
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E5E1DA",
        color: "#1B4332",
    },
    multilineInput: {
        height: 80,
        textAlignVertical: 'top',
        paddingVertical: 10,
    },
    dropdownContainer: {
        position: 'relative',
        elevation: 5,
    },
    selectButton: {
        height: 50,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#E5E1DA",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    selectText: {
        fontSize: 16,
        color: "#1B4332",
    },
    arrowText: {
        fontSize: 12,
        color: "#6B6B6B",
    },
    dropdown: {
        marginTop: 5,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E1DA",
        overflow: "hidden",
        elevation: 3,
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F8F5F0",
    },
    optionText: {
        fontSize: 16,
        color: "#1B4332",
    },
    imagePickerButton: {
        backgroundColor: "#2D6A4F",
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    imagePickerText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    previewImage: {
        width: "100%",
        height: 250,
        borderRadius: 12,
    },
    submitButton: {
        backgroundColor: "#1B4332",
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
    cancelButton: {
        backgroundColor: "#E5E1DA",
        height: 40,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#6B6B6B",
        fontWeight: "600",
    },
    listContainer: {
        paddingHorizontal: 25,
        paddingTop: 15,
        paddingBottom: 30,
    },
    listTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1B4332",
        marginBottom: 15,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#E5E1DA",
    },
    cardImage: {
        width: "100%",
        height: 140,
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
    cardActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 10,
    },
    editButton: {
        backgroundColor: "#E5E1DA",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    editButtonText: {
        color: "#1B4332",
        fontWeight: "600",
        fontSize: 12,
    },
    deleteButton: {
        backgroundColor: "#FF3B3015",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: "#FF3B30",
        fontWeight: "600",
        fontSize: 12,
    },
    staticBadge: {
        backgroundColor: "#E8F5E9",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#C8E6C9",
    },
    staticBadgeText: {
        color: "#2D6A4F",
        fontSize: 12,
        fontWeight: "700",
    },
});