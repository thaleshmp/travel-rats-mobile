import { Pressable, Text, View } from 'react-native';
import { comicTokens } from '@/src/theme/comicTokens';

interface ComicButtonProps {
  label: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  icon?: string;
}

export function ComicButton({
  label,
  onPress,
  backgroundColor = comicTokens.colors.primary,
  textColor = comicTokens.colors.black,
  size = 'medium',
  icon,
}: ComicButtonProps) {
  const sizes = {
    small: { padding: 8, fontSize: 14 },
    medium: { padding: 12, fontSize: 16 },
    large: { padding: 16, fontSize: 18 },
  };

  const sizeConfig = sizes[size];

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor,
          borderWidth: comicTokens.border.heavy,
          borderColor: comicTokens.colors.black,
          borderRadius: 32,
          paddingHorizontal: comicTokens.spacing.lg,
          paddingVertical: sizeConfig.padding,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: comicTokens.spacing.sm,
          shadowColor: comicTokens.colors.black,
          shadowOffset: { width: 6, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: 0,
          transform: [{ perspective: 1000 }],
        }}
      >
        {icon && <Text style={{ fontSize: sizeConfig.fontSize + 4 }}>{icon}</Text>}
        <Text
          style={{
            color: textColor,
            fontSize: sizeConfig.fontSize,
            fontWeight: '900',
            fontFamily: 'Fredoka',
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
