import { View, Text } from 'react-native';
import { comicTokens } from '@/src/theme/comicTokens';

interface ComicSectionProps {
  title: string;
  children: React.ReactNode;
  backgroundColor?: string;
}

export function ComicSection({
  title,
  children,
  backgroundColor = comicTokens.colors.lightBg,
}: ComicSectionProps) {
  return (
    <View
      style={{
        marginVertical: comicTokens.spacing.md,
        paddingHorizontal: comicTokens.spacing.lg,
      }}
    >
      <View
        style={{
          backgroundColor,
          borderWidth: comicTokens.border.medium,
          borderColor: comicTokens.colors.black,
          borderRadius: 16,
          padding: comicTokens.spacing.lg,
          marginBottom: comicTokens.spacing.md,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '900',
            fontFamily: 'Baloo2',
            color: comicTokens.colors.black,
            marginBottom: comicTokens.spacing.md,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Text>
        {children}
      </View>
    </View>
  );
}
