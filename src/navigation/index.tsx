import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import GoalDetails from '../screens/GoalDetails';
import NewTransaction from '../screens/NewTransaction';
import NewGoal from '../screens/NewGoal';

export default function Routes() {
    const Stack = createNativeStackNavigator();

    return (
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
    );
}