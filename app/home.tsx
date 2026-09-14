import { ScrollView, Text, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';
import { TopBar } from '@/src/components/TopBar';
import { MainCard } from '@/src/components/MainCard';
import { Character } from '@/src/components/Character';
import { TwoColumnCards } from '@/src/components/TwoColumnCards';
import { BottomNav } from '@/src/components/BottomNav';
import { useState } from 'react';

export default function HomeScreen() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.neutral[50] }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: tokens.spacing.lg,
          paddingBottom: 80, // espaço pra bottom nav
        }}
      >
        {/* Top Bar com stats */}
        <TopBar points={660} streak={12} badges={5} />

        {/* Level Badge */}
        <View style={{ marginHorizontal: tokens.spacing.lg, marginBottom: tokens.spacing.lg }}>
          <View
            style={{
              backgroundColor: tokens.colors.primary,
              paddingHorizontal: tokens.spacing.lg,
              paddingVertical: tokens.spacing.md,
              borderRadius: tokens.borderRadius.xl,
              alignSelf: 'flex-start',
            }}
          >
            <Text
              style={{
                color: tokens.colors.white,
                fontSize: tokens.typography.subheading.fontSize,
                fontWeight: '700',
                fontFamily: 'Baloo2',
              }}
            >
              NÍVEL · 2
            </Text>
          </View>
        </View>

        {/* Main Card */}
        <MainCard
          icon="🌍"
          title="Porto, Portugal"
          subtitle="Explore a cidade"
          primaryAction={{
            label: 'Continuar Roteiro',
            onPress: () => console.log('Continue'),
          }}
          secondaryAction={{
            label: 'Ver Mapa',
            onPress: () => console.log('Map'),
          }}
        />

        {/* Character */}
        <Character size={120} emoji="🧭" />

        {/* Two Column Cards */}
        <TwoColumnCards
          left={{
            icon: '🏆',
            title: 'Streak',
            subtitle: 'Consistência é tudo',
            color: tokens.colors.accent1,
          }}
          right={{
            icon: '⭐',
            title: 'Desafios',
            subtitle: 'Complete e ganhe',
            color: tokens.colors.accent2,
          }}
        />
      </ScrollView>

      {/* Bottom Nav */}
      <BottomNav
        items={[
          {
            icon: '🏠',
            label: 'Home',
            onPress: () => setActiveNav(0),
            active: activeNav === 0,
          },
          {
            icon: '📍',
            label: 'Cidades',
            onPress: () => setActiveNav(1),
            active: activeNav === 1,
          },
          {
            icon: '📊',
            label: 'Progresso',
            onPress: () => setActiveNav(2),
            active: activeNav === 2,
          },
          {
            icon: '👥',
            label: 'Amigos',
            onPress: () => setActiveNav(3),
            active: activeNav === 3,
          },
          {
            icon: '⚙️',
            label: 'Config',
            onPress: () => setActiveNav(4),
            active: activeNav === 4,
          },
        ]}
      />
    </View>
  );
}
