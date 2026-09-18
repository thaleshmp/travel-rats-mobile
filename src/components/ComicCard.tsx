import { View, Text, Pressable } from 'react-native';
import { comicTokens } from '@/src/theme/comicTokens';

interface ComicCardProps {
  children: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  onPress?: () => void;
  style?: any;
}

export function ComicCard({
  children,
  backgroundColor = comicTokens.colors.white,
  borderColor = comicTokens.colors.black,
  onPress,
  style,
}: ComicCardProps) {
  const content = (
    <View
      style={[
        {
          backgroundColor,
          borderWidth: comicTokens.border.heavy,
          borderColor,
          borderRadius: 28,
          padding: comicTokens.spacing.lg,
          marginVertical: comicTokens.spacing.md,
          shadowColor: comicTokens.colors.black,
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
}
