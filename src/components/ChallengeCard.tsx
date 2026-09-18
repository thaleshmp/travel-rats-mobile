import { Text, View, Pressable } from 'react-native';
import { tokens } from '@/src/theme/tokens';
import { Button } from './Button';

interface ChallengeCardProps {
  title: string;
  description: string;
  icon: string;
  progress: number;
  reward: number;
  onPress?: () => void;
}

export function ChallengeCard({
  title,
  description,
  icon,
  progress,
  reward,
  onPress,
}: ChallengeCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          marginHorizontal: tokens.spacing.lg,
          marginVertical: tokens.spacing.lg,
          padding: tokens.spacing.lg,
          backgroundColor: tokens.colors.accent1,
          borderRadius: tokens.borderRadius.xl,
          ...tokens.shadows.md,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: tokens.spacing.md }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: tokens.typography.subheading.fontSize,
                fontWeight: '700',
                fontFamily: 'Baloo2',
                color: tokens.colors.white,
                marginBottom: tokens.spacing.sm,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: tokens.typography.bodySmall.fontSize,
                color: tokens.colors.white,
                fontFamily: 'Nunito',
                opacity: 0.9,
              }}
            >
              {description}
            </Text>
          </View>
          <Text style={{ fontSize: 40, marginLeft: tokens.spacing.md }}>{icon}</Text>
        </View>

        {/* Progress Bar */}
        <View style={{ marginBottom: tokens.spacing.md }}>
          <View
            style={{
              height: 8,
              backgroundColor: 'rgba(255,255,255,0.3)',
              borderRadius: 4,
              overflow: 'hidden',
              marginBottom: tokens.spacing.sm,
            }}
          >
            <View
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: tokens.colors.white,
                borderRadius: 4,
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: tokens.typography.bodySmall.fontSize,
                color: tokens.colors.white,
                fontFamily: 'Nunito',
              }}
            >
              {progress}%
            </Text>
            <Text
              style={{
                fontSize: tokens.typography.bodySmall.fontSize,
                color: tokens.colors.white,
                fontFamily: 'Nunito',
              }}
            >
              +{reward} XP
            </Text>
          </View>
        </View>

        <Button variant="secondary">Participar</Button>
      </View>
    </Pressable>
  );
}
