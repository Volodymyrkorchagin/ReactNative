import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Home() {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Categories 📜</Text>

            <View style={styles.categoriesWrapper}>
                <ScrollView
                    horizontal={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    <TouchableOpacity
                        style={styles.categoryCard}
                        onPress={() => router.push('/categories/breakfast')}
                    >
                        <Text style={styles.categoryEmoji}>🍳</Text>
                        <Text style={styles.categoryText}>Breakfast</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryCard}
                                      onPress={() => router.push('/categories/lunch')}>
                        <Text style={styles.categoryEmoji}>🥗</Text>
                        <Text style={styles.categoryText}>Lunch</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryCard}
                                      onPress={() => router.push('/categories/dinner')}>
                        <Text style={styles.categoryEmoji}>🥩</Text>
                        <Text style={styles.categoryText}>Dinner</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryCard}
                                      onPress={() => router.push('/categories/dessert')}>
                        <Text style={styles.categoryEmoji}>🍰</Text>
                        <Text style={styles.categoryText}>Dessert</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoryCard}
                                      onPress={() => router.push('/categories/drinks')}>
                        <Text style={styles.categoryEmoji}>🥤</Text>
                        <Text style={styles.categoryText}>Drinks</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
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
    categoriesWrapper: {
        height: 500,
        gap: 10,
        padding: 5
    },
    categoriesContainer: {
        gap: 12,
        alignItems: "center",
        top: 50,
    },
    categoryCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#E5E1DA",
        height: 60,
    },
    activeCategory: {
        backgroundColor: "#1B4332",
        borderColor: "#1B4332",
    },
    categoryEmoji: {
        fontSize: 18,
        marginRight: 8,
    },
    categoryText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1B4332",
    },
    activeCategoryText: {
        color: "#FFFFFF",
    },
});