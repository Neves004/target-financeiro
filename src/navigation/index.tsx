import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import GoalDetails from '../screens/GoalDetails';
import NewTransaction from '../screens/NewTransaction';
import NewGoal from '../screens/NewGoal';
import { Loading } from '@/components/loading';
import { Suspense, useEffect } from 'react';
import { migrate } from '../database/migrate';
import { SQLiteProvider } from 'expo-sqlite';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export default function Routes() {
    const Stack = createNativeStackNavigator();
    const colorScheme = useColorScheme();

    return (
        <Suspense fallback={<Loading />}>
            <SQLiteProvider databaseName="target.db" onInit={migrate} useSuspense>
                <ThemeProvider value={colorScheme == 'dark' ? DarkTheme : DefaultTheme}>
                <Stack.Navigator
                    initialRouteName='Home'
                    screenOptions={{
                        headerShown: false,
                    }}
                    id=''>
                    <Stack.Screen name="Home"
                        component={Home}
                    />
                    <Stack.Screen
                        name="GoalDetails"
                        component={GoalDetails}
                    />
                    <Stack.Screen
                        name="NewTransaction"
                        component={NewTransaction}
                    />
                    <Stack.Screen
                        name="NewGoal"
                        component={NewGoal} />
                </Stack.Navigator>
                </ThemeProvider>
            </SQLiteProvider>
        </Suspense>
    );

}