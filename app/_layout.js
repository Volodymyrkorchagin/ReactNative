import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'CREATING A QUESTIONNAIRE',
                    headerStyle: {
                        backgroundColor: '#7381f8',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#ffffff',
                }}
            />
            <Stack.Screen
                name="personalData"
                options={{
                    title: 'PERSONAL DATA',
                    headerStyle: {
                        backgroundColor: '#7381f8',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#ffffff',
                }}
            />
            <Stack.Screen
                name="additionallyData"
                options={{
                    title: 'ADDITIONALLY DATA',
                    headerStyle: {
                        backgroundColor: '#7381f8',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#ffffff',
                }}
            />
            <Stack.Screen
                name="allInformation"
                options={{
                    title: 'CHECKING DATA',
                    headerStyle: {
                        backgroundColor: '#7381f8',
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#ffffff',
                }}
            />
        </Stack>
    );
}