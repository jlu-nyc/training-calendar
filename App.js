import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import DayDetailScreen from './src/screens/DayDetailScreen';
import PacesScreen from './src/screens/PacesScreen';
import ComparePlansScreen from './src/screens/ComparePlansScreen';
import { PacesProvider } from './src/context/PacesContext';
import { ScheduleProvider } from './src/context/ScheduleContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PacesProvider>
      <ScheduleProvider>
      <NavigationContainer>
        <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#0f0f23' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#0f0f23' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ title: 'Training Plan', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="DayDetail"
          component={DayDetailScreen}
          options={{ title: 'Workout', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="Paces"
          component={PacesScreen}
          options={{ title: 'Training Paces', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="Compare"
          component={ComparePlansScreen}
          options={{ title: 'Compare Plans', headerBackTitle: 'Back' }}
        />
      </Stack.Navigator>
      </NavigationContainer>
      </ScheduleProvider>
    </PacesProvider>
  );
}
