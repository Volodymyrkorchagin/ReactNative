import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#1B4332",
                },
                headerTintColor: "#FFFFFF",
                headerTitleStyle: {
                    fontWeight: "700",
                    fontSize: 20,
                },
                contentStyle: {
                    backgroundColor: "#F8F5F0",
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Recipe App",
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="popularRecipes"
                options={{
                    title: "Popular Recipes",
                    headerStyle: {
                        backgroundColor: "#1B4332",
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleStyle: {
                        fontWeight: "700",
                    },
                    contentStyle: {
                        backgroundColor: "#F8F5F0",
                    },
                }}
            />

            <Stack.Screen
                name="category"
                options={{
                    title: "Categories",
                    headerStyle: {
                        backgroundColor: "#1B4332",
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleStyle: {
                        fontWeight: "700",
                    },
                    contentStyle: {
                        backgroundColor: "#F8F5F0",
                    },
                }}
            />

            <Stack.Screen
                name="search"
                options={{
                    title: "Search",
                    headerStyle: {
                        backgroundColor: "#1B4332",
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleStyle: {
                        fontWeight: "700",
                    },
                    contentStyle: {
                        backgroundColor: "#F8F5F0",
                    },
                }}
            />

            <Stack.Screen
                name="favorites"
                options={{
                    title: "Favorites",
                    headerStyle: {
                        backgroundColor: "#1B4332",
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleStyle: {
                        fontWeight: "700",
                    },
                    contentStyle: {
                        backgroundColor: "#F8F5F0",
                    },
                }}
            />

            <Stack.Screen
                name="myRecipe"
                options={{
                    title: "My Recipes",
                    headerStyle: {
                        backgroundColor: "#1B4332",
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleStyle: {
                        fontWeight: "700",
                    },
                    contentStyle: {
                        backgroundColor: "#F8F5F0",
                    },
                }}
            />

            <Stack.Screen
                name="recipes/[id]"
                options={{
                    title: "Recipe",
                    headerStyle: {
                        backgroundColor: "#1B4332",
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleStyle: {
                        fontWeight: "700",
                    },
                    contentStyle: {
                        backgroundColor: "#F8F5F0",
                    },
                }}
            />

            <Stack.Screen
                name="categories/[category]"
                options={{
                    title: "Recipe",
                    headerStyle: {
                        backgroundColor: "#1B4332",
                    },
                    headerTintColor: "#FFFFFF",
                    headerTitleStyle: {
                        fontWeight: "700",
                    },
                    contentStyle: {
                        backgroundColor: "#F8F5F0",
                    },
                }}
            />
        </Stack>
    );
}