import { ScrollView, View, Text } from 'react-native';
import { tokens } from '@/src/theme/tokens';
import { PageHeader } from '@/src/components/PageHeader';
import { MainBadgeCard } from '@/src/components/MainBadgeCard';
import { BadgeCard } from '@/src/components/BadgeCard';
import { BottomNav } from '@/src/components/BottomNav';
import { useState } from 'react';

const badges = [
  { id: 1, city: 'Porto', emoji: '🌉', color: '#FF9500', unlocked: true, description: 'Primeira cidade conquistada' },
  { id: 2, city: 'Paris', emoji: '🗼', color: '#EF476F', unlocked: true, description: 'A cidade do amor' },
  { id: 3, city: 'Tóquio', emoji: '🗾', color: '#3B82F6', unlocked: false, description: 'Desbloqueável' },
  { id: 4, city: 'Roma', emoji: '🏛️', color: '#58CC02', unlocked: false, description: 'Desbloqueável' },
];

export default function BadgesScreen() {
  const [activeNav, setActiveNav] = useState(3); // Collection tab

  return (
    <View style={{ flex: 1, backgroundColor: tokens.colors.neutral[50] }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80, // espaço pro bottom nav
        }}
      >
        <PageHeader
          title="MEUS TROFÉUS"
          subtitle="Desbloqueie badges visitando cidades"
          stats={[
            { icon: '💰', value: '660' },
            { icon: '🏆', value: '2' },
          ]}
        />

        {/* Main Badge */}
        <MainBadgeCard
          city="Porto"
          emoji="🌉"
          color="#FF9500"
          description="Sua primeira cidade conquistada! Continue explorando o mundo."
        />

        {/* Section Title */}
        <View style={{ paddingHorizontal: tokens.spacing.lg, marginTop: tokens.spacing.xl, marginBottom: tokens.spacing.lg }}>
          <View
            style={{
              paddingVertical: tokens.spacing.md,
              paddingHorizontal: tokens.spacing.lg,
              backgroundColor: tokens.colors.primary,
              borderRadius: tokens.borderRadius.lg,
              alignSelf: 'flex-start',
            }}
          >
            <Text
              style={{
                color: tokens.colors.white,
                fontSize: 12,
                fontWeight: '600',
                fontFamily: 'Nunito',
                textTransform: 'uppercase',
              }}
            >
              COLEÇÃO
            </Text>
          </View>
        </View>

        {/* Badge Grid */}
        <View style={{ paddingHorizontal: tokens.spacing.lg, gap: tokens.spacing.lg, marginBottom: tokens.spacing.xl }}>
          {/* Row 1 */}
          <View style={{ flexDirection: 'row', gap: tokens.spacing.lg }}>
            <BadgeCard
              city={badges[0].city}
              emoji={badges[0].emoji}
              color={badges[0].color}
              unlocked={badges[0].unlocked}
            />
            <BadgeCard
              city={badges[1].city}
              emoji={badges[1].emoji}
              color={badges[1].color}
              unlocked={badges[1].unlocked}
            />
          </View>

          {/* Row 2 */}
          <View style={{ flexDirection: 'row', gap: tokens.spacing.lg }}>
            <BadgeCard
              city={badges[2].city}
              emoji={badges[2].emoji}
              color={badges[2].color}
              unlocked={badges[2].unlocked}
            />
            <BadgeCard
              city={badges[3].city}
              emoji={badges[3].emoji}
              color={badges[3].color}
              unlocked={badges[3].unlocked}
            />
          </View>
        </View>
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
            label: 'Desafios',
            onPress: () => setActiveNav(2),
            active: activeNav === 2,
          },
          {
            icon: '🏆',
            label: 'Troféus',
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
