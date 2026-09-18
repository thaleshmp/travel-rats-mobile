import { View, Text, Pressable } from 'react-native';
import { comicTokens } from '@/src/theme/comicTokens';

export interface PanelCard {
  id?: string;
  icon: string;
  title: string;
  description: string;
}

interface TutorialPanelProps {
  cards: PanelCard[];
  backgroundColor?: string;
  borderColor?: string;
  onCardPress?: (card: PanelCard, index: number) => void;
}

export function TutorialPanel({
  cards,
  backgroundColor = comicTokens.colors.white,
  borderColor = comicTokens.colors.black,
  onCardPress,
}: TutorialPanelProps) {
  return (
    <View
      style={{
        marginHorizontal: comicTokens.spacing.lg,
        backgroundColor,
        borderWidth: comicTokens.border.heavy,
        borderColor,
        borderRadius: 24,
        overflow: 'hidden',
      }}
    >
      {cards.map((card, index) => (
        <View key={card.id || index}>
          {/* Card Row */}
          <Pressable onPress={() => onCardPress?.(card, index)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: comicTokens.spacing.lg,
                padding: comicTokens.spacing.lg,
              }}
            >
              {/* Icon Circle */}
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: comicTokens.colors.yellow,
                  borderWidth: comicTokens.border.medium,
                  borderColor: comicTokens.colors.black,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Text style={{ fontSize: 28 }}>{card.icon}</Text>
              </View>

              {/* Text Content */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '900',
                    fontFamily: 'Fredoka',
                    color: comicTokens.colors.black,
                    marginBottom: comicTokens.spacing.xs,
                  }}
                >
                  {card.title}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Nunito',
                    color: comicTokens.colors.black,
                    lineHeight: 16,
                  }}
                >
                  {card.description}
                </Text>
              </View>

              {/* Arrow */}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '900',
                  color: comicTokens.colors.black,
                  flexShrink: 0,
                }}
              >
                →
              </Text>
            </View>
          </Pressable>

          {/* Divider - não mostrar no último */}
          {index < cards.length - 1 && (
            <View
              style={{
                height: comicTokens.border.medium,
                backgroundColor: comicTokens.colors.black,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
}
