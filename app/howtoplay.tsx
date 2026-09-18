import { ScrollView, View, Text, Pressable } from 'react-native';
import { comicTokens } from '@/src/theme/comicTokens';
import { ComicButton } from '@/src/components/ComicButton';
import { TutorialPanel, PanelCard } from '@/src/components/TutorialPanel';
import { useState } from 'react';

const tutorialCards: PanelCard[] = [
  {
    icon: '🗺️',
    title: 'Explore a Cidade',
    description: 'Visualize spots e descubra novos lugares',
  },
  {
    icon: '📍',
    title: 'Faça Check-in',
    description: 'Visite um spot e marque como visitado',
  },
  {
    icon: '🏆',
    title: 'Complete o Roteiro',
    description: 'Visite todos os spots e ganhe badges',
  },
];

export default function HowToPlayScreen() {
  const [activeNav, setActiveNav] = useState(2);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFBEB' }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Header */}
        <View
          style={{
            paddingVertical: comicTokens.spacing.lg,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: '900',
              fontFamily: 'Fredoka',
              color: comicTokens.colors.black,
            }}
          >
            Como Jogar
          </Text>
        </View>

        {/* Mascote Grande */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: comicTokens.spacing.xl,
          }}
        >
          <View
            style={{
              width: 180,
              height: 180,
              borderRadius: 90,
              backgroundColor: comicTokens.colors.primary,
              borderWidth: comicTokens.border.heavy,
              borderColor: comicTokens.colors.black,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 90 }}>🧭</Text>
          </View>
        </View>

        {/* Tutorial Panel */}
        <TutorialPanel
          cards={tutorialCards}
          onCardPress={(card, index) => console.log(`Pressed: ${card.title}`)}
        />
      </ScrollView>

      {/* CTA Button - Fixed at bottom */}
      <View
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          paddingHorizontal: comicTokens.spacing.lg,
        }}
      >
        <ComicButton
          label="Começar Jogo"
          icon="🚀"
          backgroundColor={comicTokens.colors.primary}
          size="large"
          onPress={() => console.log('Start')}
        />
      </View>

      {/* Bottom Nav */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          backgroundColor: comicTokens.colors.white,
          borderTopWidth: comicTokens.border.heavy,
          borderTopColor: comicTokens.colors.black,
          paddingBottom: 8,
          paddingTop: 12,
        }}
      >
        {[
          { icon: '🏠', label: 'Home', id: 0 },
          { icon: '📍', label: 'Cidades', id: 1 },
          { icon: '❓', label: 'Tutorial', id: 2 },
          { icon: '👥', label: 'Amigos', id: 3 },
          { icon: '⚙️', label: 'Config', id: 4 },
        ].map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setActiveNav(item.id)}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingVertical: comicTokens.spacing.md,
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</Text>
            <Text
              style={{
                fontSize: 9,
                fontWeight: '900',
                fontFamily: 'Fredoka',
                color: activeNav === item.id ? comicTokens.colors.primary : comicTokens.colors.black,
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
