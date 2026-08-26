import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#42acfa',
                tabBarInactiveTintColor: '#381a60',
                tabBarStyle: {
                    padding: 5,
                    backgroundColor: '#b8b3b3',
                },
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontWeight: 'bold',
                    fontFamily: 'Roboto',
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "School Subjects",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="homework"
                options={{
                    title: "Home Work",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pencil-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="subjects/[id]"
                options={{
                    href: null,
                    headerShown: false,
                }}
            />
        </Tabs>
    );
}