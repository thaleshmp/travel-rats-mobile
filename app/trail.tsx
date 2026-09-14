import { Card } from '@/src/components/Card';
import { portoSpots } from '@/src/data/porto-spots';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function WaveLine({ height = 60, width = 60, color = '#58CC02' }) {
  let pathData = `M ${width / 2} 0`;
  const amplitude = 25;
  const frequency = 2;
  
  for (let y = 0; y <= height; y += 10) {
    const x = width / 2 + Math.sin((y / height) * Math.PI * 2 * frequency) * amplitude;
    pathData += ` L ${x} ${y}`;
  }
  
  return (
    <Svg width={width} height={height} style={{ position: 'absolute', left: 0, top: 0 }}>
      <Path d={pathData} stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    </Svg>
  );
}

export default function TrailScreen() {
  const spots = portoSpots.slice(0, 8);
  const [contentHeight, setContentHeight] = useState(0);
  
  return (
    <ScrollView className="flex-1 bg-neutral-100">
      <View className="px-4 py-8">
        <View className="flex-row" onLayout={(e) => setContentHeight(e.nativeEvent.layout.height)}>
          {/* Lado esquerdo */}
          <View className="flex-1">
            {spots.map((spot, i) => 
              i % 2 === 0 ? (
                <View key={spot.id} className="mb-6 items-end pr-8">
                  <Card spot={spot} />
                </View>
              ) : null
            )}
          </View>

          {/* Linha sinuosa */}
          <View style={{ position: 'relative', width: 60 }}>
            <WaveLine height={contentHeight} width={60} color="#58CC02" />
          </View>

          {/* Lado direito */}
          <View className="flex-1">
            {spots.map((spot, i) => 
              i % 2 !== 0 ? (
                <View key={spot.id} className="mb-6 items-start pl-8">
                  <Card spot={spot} />
                </View>
              ) : null
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
