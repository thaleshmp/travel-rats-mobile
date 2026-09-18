import { ScrollView, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';
import { AvatarWithStats } from '@/src/components/AvatarWithStats';
import { ChallengeCard } from '@/src/components/ChallengeCard';
import { CitiesGrid } from '@/src/components/CitiesGrid';
import { QuickActions } from '@/src/components/QuickActions';
import { BottomNav } from '@/src/components/BottomNav';
import { useState } from 'react';

const mockCities = [
  { id: '1', name: 'Porto', emoji: '🌉', progress: 65, color: tokens.colors.accent1 },
  { id: '2', name: 'Paris', emoji: '🗼', progress: 40, color: tokens.colors.accent2 },
  { id: '3', name: 'Roma', emoji: '🏛️', progress: 20, color: '#3B82F6' },
  { id: '4', name: 'Amsterdam', emoji: '🇳🇱', progress: 0, color: '#8B5CF6' },
];

const mockActions = [
  { icon: '🗺️', label: 'Explorar nova cidade', color: tokens.colors.secondary, onPress: () => console.log('Explore') },
  { icon: '🎯', label: 'Ver desafios diários', color: tokens.colors.accent1, onPress: () => console.log('Challenges') },
  { icon: '👥', label: 'Convidar amigos', color: tokens.colors.accent2, onPress: () => console.log('Invite') },
];

export default function HomeScreen() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.neutral[50] }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        {/* Avatar com stats */}
        <AvatarWithStats
          level={2}
          points={660}
          streak={12}
          city="Porto"
          progress={65}
          onCityPress={() => console.log('City pressed')}
          onRankingPress={() => console.log('Ranking pressed')}
          onProgressPress={() => console.log('Progress pressed')}
        />

        {/* Challenge Card */}
        <ChallengeCard
          title="Explorador de Porto"
          description="Visite 5 spots em Porto"
          icon="🎯"
          progress={60}
          reward={250}
          onPress={() => console.log('Challenge')}
        />

        {/* Cities Grid */}
        <CitiesGrid
          cities={mockCities}
          onCityPress={(cityId) => console.log('City:', cityId)}
        />

        {/* Quick Actions */}
        <QuickActions actions={mockActions} />
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
