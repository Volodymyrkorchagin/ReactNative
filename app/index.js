import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Switch,
    Button,
    FlatList,
    TouchableOpacity, Alert, ActivityIndicator,
    Image
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const URL = `https://6a9705c90e3240db9061a272.mockapi.io/api/myProject`

const HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true'
}

export default function Game() {
    const [games, setGames] = useState([]);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [genre, setGenre] = useState("");
    const [cover, setCover] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchGames = async () => {
        try{
            const response = await fetch(`${URL}/games`, {headers: HEADERS});
            const json = await response.json();
            setGames(json);
            setLoading(false);
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    const addGames = async () => {
        if(title  === '' || year  === '' || price  === '' || genre === '') return;

        try{
            const response = await fetch(`${URL}/games`, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    title: title,
                    year: year,
                    price: parseFloat(price),
                    genre: genre,
                    cover: cover,
                })
            })

            if(response.ok){
                setTitle('')
                setGenre('')
                setPrice('')
                setYear('')

                await fetchGames();
                setLoading(false);
            }
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    const deleteGames = async (id) => {
        try {
            const response = await fetch(`${URL}/games/${id}`, {
                method: 'DELETE',
                headers: HEADERS,
            })

            if(response.ok){
                await fetchGames();
                setLoading(false);
            }
        }
        catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGames();
    }, [])

    const renderGameItem = ({ item }) => (
        <View style={styles.item}>
            {item.cover ? (
                <Image source={{ uri: item.cover }} style={styles.coverImage} />
            ) : null}
            <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubText}>Genre: {item.genre}</Text>
                <Text style={styles.itemSubText}>Year: {item.year} | Price: ${item.price}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteGames(item.id)}
            >
                <Text style={styles.deleteButtonText}>DELETE</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaProvider>
                <View style={styles.header}>
                    <Text style={styles.title}>GAMES CATALOG</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title..."
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Genre..."
                        value={genre}
                        onChangeText={setGenre}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Year..."
                        keyboardType="numeric"
                        value={year}
                        onChangeText={setYear}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        keyboardType="numeric"
                        value={price}
                        onChangeText={setPrice}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={addGames}>
                        <Text style={styles.addButtonText}>ADD GAME</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <FlatList
                            data={games}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderGameItem}
                            style={styles.list}
                        />
                    )}
                </View>
            </SafeAreaProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f7",
    },
    header: {
        width: "100%",
        height: 60,
        backgroundColor: "#403e3e",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#ffffff",
    },
    content: {
        flex: 1,
        alignItems: "center",
    },
    inputContainer: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 20,
        gap: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
        marginBottom: 20,
        marginTop: 10,
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: "#e5e5ea",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#fafafa",
        color: "#1c1c1e",
    },
    addButton: {
        backgroundColor: "#a224ec",
        height: 48,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },
    addButtonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "600",
    },
    list: {
        width: "100%",
        maxWidth: 360,
        paddingHorizontal: 10,
    },
    listContainer: {
        gap: 10,
        paddingBottom: 20,
    },
    item: {
        backgroundColor: "#ffffff",
        padding: 12,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        gap: 12,
    },
    coverImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#e5e5ea",
    },
    itemInfo: {
        flex: 1,
        gap: 2,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1c1c1e",
    },
    itemSubText: {
        fontSize: 13,
        color: "#8e8e93",
    },
    deleteButton: {
        backgroundColor: "#ff3b3015",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: "#ff3b30",
        fontWeight: "600",
        fontSize: 13,
    },
});