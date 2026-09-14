import { ScrollView, View } from 'react-native';
import { tokens } from '@/src/theme/tokens';
import { StatBadge } from './StatBadge';

interface TopBarProps {
  points: number;
  streak: number;
  badges: number;
}

export function TopBar({ points, streak, badges }: TopBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: tokens.spacing.lg,
        paddingVertical: tokens.spacing.md,
        gap: tokens.spacing.md,
      }}
    >
      <StatBadge icon="🔥" value={streak} label="Streak" />
      <StatBadge icon="💰" value={points} label="Pontos" />
      <StatBadge icon="🏆" value={badges} label="Badges" />
    </ScrollView>
  );
}
