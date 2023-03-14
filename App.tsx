import React, { useState, useCallback } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Card from './src/components/card';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const [openId, setOpenId] = useState('');
  const scrollHandler = useAnimatedScrollHandler({}, []);

  const toggleOpenedId = useCallback((id: string) => {
    setOpenId(oldState => {
      if (oldState === id) {
        return '';
      }

      return id;
    })
  }, [])

  return (
    <Animated.ScrollView scrollEventThrottle={16} onScroll={scrollHandler}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
        const id = item.toString();
        const isOpen = openId === item.toString();

        return (
          <Card
            key={id}
            id={id}
            index={index}
            isOpen={isOpen}
            toggleOpen={toggleOpenedId}
          />
        )
      })}
    </Animated.ScrollView>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
