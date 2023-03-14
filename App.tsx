import { FlatList } from 'react-native';
import React, { useState, useCallback } from 'react';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Card from './src/components/card';
import type { AppRoutes } from './src/types';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();
  const [openId, setOpenId] = useState('');

  const toggleOpenedId = useCallback((id: string) => {
    setOpenId(oldState => {
      if (oldState === id) {
        return '';
      }

      return id;
    })
  }, [])

  return (
    <FlatList
      data={[0, 1, 2, 3, 4, 5, 6, 7]}
      style={{ flex: 1 }}
      renderItem={({ item, index }) => {
        const id = item.toString();
        const isOpen = openId === item.toString();

        return (
          <Card
            id={id}
            index={index}
            isOpen={isOpen}
            toggleOpen={toggleOpenedId}
          />
        )
      }}
    />
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ animation: 'fade', headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
