import { useCallback, useEffect, useState } from 'react';
import { AccessibilityInfo, AppState, Pressable } from 'react-native';
import { useFocusEffect } from 'expo-router';
import Animated, { cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Appearance } from '../../features/shop/catalog';
import { Traveler } from './Traveler';

/** Small home-only idle animation. Pauses behind panels, other screens and in background. */
export function AnimatedTraveler({ active = true, ...props }: { size?: number; active?: boolean } & Partial<Appearance>) {
  const [focused, setFocused] = useState(false);
  const [foreground, setForeground] = useState(AppState.currentState === 'active');
  const [reduceMotion, setReduceMotion] = useState(true);
  const [eyesClosed, setEyesClosed] = useState(false);
  const breath = useSharedValue(0);
  const jump = useSharedValue(0);
  const running = active && focused && foreground && !reduceMotion;

  useFocusEffect(useCallback(() => {
    setFocused(true);
    return () => setFocused(false);
  }, []));

  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((value) => {
      if (mounted) setReduceMotion(value);
    }).catch(() => undefined);
    const motion = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    const app = AppState.addEventListener('change', (state) => setForeground(state === 'active'));
    return () => { mounted = false; motion.remove(); app.remove(); };
  }, []);

  useEffect(() => {
    if (!running) {
      breath.value = 0;
      jump.value = 0;
      setEyesClosed(false);
      return;
    }
    breath.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.sin) }), -1, true);
    let reopen: ReturnType<typeof setTimeout> | undefined;
    const blink = setInterval(() => {
      setEyesClosed(true);
      reopen = setTimeout(() => setEyesClosed(false), 140);
    }, 4300);
    return () => {
      cancelAnimation(breath);
      cancelAnimation(jump);
      clearInterval(blink);
      clearTimeout(reopen);
    };
  }, [running, breath, jump]);

  const motion = useAnimatedStyle(() => ({
    transform: [{ translateY: jump.value - breath.value * 1.5 }, { scaleY: 1 + breath.value * 0.012 }, { scaleX: 1 - breath.value * 0.004 }],
  }));

  return <Pressable accessibilityRole="button" accessibilityLabel="Ratinho viajante" accessibilityHint={reduceMotion ? 'Seu avatar com os acessórios equipados.' : 'Toque para fazer o ratinho pular.'} onPress={() => {
    if (!running) return;
    cancelAnimation(jump);
    jump.value = withSequence(
      withTiming(-17, { duration: 180, easing: Easing.out(Easing.quad) }),
      withTiming(0, { duration: 240, easing: Easing.in(Easing.quad) }),
      withTiming(-3, { duration: 90 }),
      withTiming(0, { duration: 100 }),
    );
  }}>
    <Animated.View style={motion}><Traveler {...props} eyesClosed={eyesClosed} /></Animated.View>
  </Pressable>;
}
