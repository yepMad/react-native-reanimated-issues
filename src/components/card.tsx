import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { FadeOut, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const cardHeight = 120;
const cardExpandedHeight = 350;
const colors = ['red', 'blue', 'green', 'yellow', 'gray', 'brown', 'darkgreen', 'cyan'];

interface CardProps {
  id: string;
  index: number;
  isOpen: boolean;
  toggleOpen: (id: string) => void;
}

function Card({ id, index, isOpen, toggleOpen }: CardProps) {
  const style = useAnimatedStyle(() => {
    let height = cardHeight;

    if (isOpen) {
      height = cardExpandedHeight;
    }

    return {
      height: withTiming(height),
    };
  }, [isOpen]);

  return (
    <Animated.View sharedTransitionTag={id} style={[style, { width: '100%' }]}>
      <TouchableOpacity
        onPress={() => toggleOpen(id)}
        style={{
          width: '100%',
          height: cardHeight,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors[index]
        }}
      >
        <Text style={{ fontSize: 24, color: 'white' }}>Click here</Text>
      </TouchableOpacity>

      {isOpen ? (
        <Animated.View
          exiting={FadeOut.delay(50)}
          style={{ backgroundColor: 'purple', width: '100%', height: cardExpandedHeight - cardHeight }}
        />
      ) : null}
    </Animated.View>
  );
}

export default React.memo(Card);
