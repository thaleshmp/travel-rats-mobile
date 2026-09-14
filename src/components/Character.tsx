import { View, Text } from 'react-native';

interface CharacterProps {
  size?: number;
  emoji?: string;
}

export function Character({ size = 120, emoji = '🤖' }: CharacterProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#58CC02',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 24,
        opacity: 0.9,
      }}
    >
      <Text style={{ fontSize: size * 0.6 }}>{emoji}</Text>
    </View>
  );
}
