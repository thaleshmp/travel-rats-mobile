import { View, Text } from 'react-native';
import { comicTokens } from '@/src/theme/comicTokens';

interface ComicAvatarProps {
  emoji: string;
  size?: 'small' | 'medium' | 'large';
  backgroundColor?: string;
}

export function ComicAvatar({
  emoji,
  size = 'large',
  backgroundColor = comicTokens.colors.primary,
}: ComicAvatarProps) {
  const sizes = {
    small: { width: 80, fontSize: 40 },
    medium: { width: 120, fontSize: 60 },
    large: { width: 160, fontSize: 80 },
  };

  const config = sizes[size];

  return (
    <View
      style={{
        width: config.width,
        height: config.width,
        borderRadius: config.width / 2,
        backgroundColor,
        borderWidth: comicTokens.border.heavy,
        borderColor: comicTokens.colors.black,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: comicTokens.colors.black,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
      }}
    >
      <Text style={{ fontSize: config.fontSize }}>{emoji}</Text>
    </View>
  );
}
