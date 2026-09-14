import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'destructive';
}

export function Button({
  children,
  onPress,
  disabled = false,
  variant = 'primary',
}: ButtonProps) {
  const translateY = useRef(new Animated.Value(0)).current;

  const colorMap = {
    primary: '#58CC02',
    secondary: '#FF6B6B',
    destructive: '#EF476F',
  };

  const shadeMap = {
    primary: '#48A800',
    secondary: '#E63946',
    destructive: '#C1121F',
  };

  const backgroundColor = colorMap[variant];
  const borderColor = shadeMap[variant];

  const handlePressIn = async () => {
    if (disabled) return;
    Animated.timing(translateY, {
      toValue: 4,
      duration: 40,
      useNativeDriver: true,
    }).start();
    await impactAsync(ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    if (disabled) return;
    Animated.timing(translateY, {
      toValue: 0,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.button,
          { backgroundColor, borderColor },
          { transform: [{ translateY }] },
        ]}
      >
        <Text
          style={[styles.text, { opacity: disabled ? 0.5 : 1 }]}
        >
          {children}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Baloo2',
  },
});
