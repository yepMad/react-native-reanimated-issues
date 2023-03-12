import Animated from 'react-native-reanimated';
import React, { useState, useContext, createContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

import { NavigationContainer, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { AppRoutes } from './src/types';

const Stack = createNativeStackNavigator();
const CardContext = createContext(false);

const colors = ['red', 'blue', 'green', 'yellow'];

function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();
  const hasClicked = useContext(CardContext);

  return (
    <FlatList
      data={[0, 1, 2, 3]}
      style={{ flex: 1 }}
      ListHeaderComponent={
        hasClicked ? 
          undefined :
          (
            <View style={{ padding: 24 }}>
              <Text style={{ fontSize: 36 }}>Welcome back!</Text>
            </View>
          )
      }
      renderItem={({ item, index }) => {
        return (
          <Animated.View
            key={item.toString()}
            sharedTransitionTag={item.toString()}
            style={{
              width: '100%',
              height: 200,
              backgroundColor: colors[index]
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { item })}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{ fontSize: 24, color: 'white' }}>Click here</Text>
            </TouchableOpacity>
          </Animated.View>
        )
      }}
    />
  );
}

function DetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppRoutes>>();
  const { params } = useRoute<RouteProp<AppRoutes, 'Details'>>();

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <Animated.View
        sharedTransitionTag={params.item.toString()}
        style={{
          width: '100%',
          height: 100,
          backgroundColor: colors[params.item]
        }}
      />

      <Animated.Text sharedTransitionTag='test'>
        This text is a test
      </Animated.Text>

      <TouchableOpacity
        onPress={navigation.goBack}
        style={{
          backgroundColor: 'red',
          height: 100, 
          justifyContent: 'center' 
        }}
      >
        <Text style={{ textAlign: 'center' }}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [hasClicked, setHasClicked] = useState(false);

  const onEndTransition = () => {
    setHasClicked(true);
  }
  
  return (
    <CardContext.Provider value={hasClicked}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ animation: 'fade', headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            listeners={{ transitionEnd: onEndTransition }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CardContext.Provider>
  );
}
