import { ScrollView, View, Text } from 'react-native';
import { comicTokens } from '@/src/theme/comicTokens';
import { ComicCard } from '@/src/components/ComicCard';
import { ComicButton } from '@/src/components/ComicButton';
import { ComicAvatar } from '@/src/components/ComicAvatar';
import { ComicSection } from '@/src/components/ComicSection';
import { useState } from 'react';

export default function HomeScreen() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFBEB' }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: comicTokens.spacing.lg, paddingTop: comicTokens.spacing.lg }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: '900',
              fontFamily: 'Fredoka',
              color: comicTokens.colors.black,
              marginBottom: comicTokens.spacing.md,
            }}
          >
            🌍 ROTEIRO
          </Text>
        </View>

        {/* User Stats Banner */}
        <ComicCard
          backgroundColor={comicTokens.colors.teal}
          borderColor={comicTokens.colors.black}
          style={{ marginHorizontal: comicTokens.spacing.lg }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24 }}>🔥</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '900',
                  fontFamily: 'Fredoka',
                  color: comicTokens.colors.black,
                }}
              >
                12
              </Text>
              <Text style={{ fontSize: 10, fontFamily: 'Nunito', color: comicTokens.colors.black }}>
                STREAK
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24 }}>💰</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '900',
                  fontFamily: 'Fredoka',
                  color: comicTokens.colors.black,
                }}
              >
                660
              </Text>
              <Text style={{ fontSize: 10, fontFamily: 'Nunito', color: comicTokens.colors.black }}>
                PONTOS
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24 }}>🏆</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '900',
                  fontFamily: 'Fredoka',
                  color: comicTokens.colors.black,
                }}
              >
                5
              </Text>
              <Text style={{ fontSize: 10, fontFamily: 'Nunito', color: comicTokens.colors.black }}>
                BADGES
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 24 }}>⭐</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '900',
                  fontFamily: 'Fredoka',
                  color: comicTokens.colors.black,
                }}
              >
                12º
              </Text>
              <Text style={{ fontSize: 10, fontFamily: 'Nunito', color: comicTokens.colors.black }}>
                RANKING
              </Text>
            </View>
          </View>
        </ComicCard>

        {/* Current City */}
        <ComicCard
          backgroundColor={comicTokens.colors.coral}
          borderColor={comicTokens.colors.black}
          style={{ marginHorizontal: comicTokens.spacing.lg, marginTop: comicTokens.spacing.lg }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: comicTokens.spacing.md }}>
            <ComicAvatar emoji="🌉" size="small" backgroundColor={comicTokens.colors.yellow} />
            <View style={{ marginLeft: comicTokens.spacing.lg, flex: 1 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '900',
                  fontFamily: 'Fredoka',
                  color: comicTokens.colors.white,
                }}
              >
                Porto, Portugal
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Nunito',
                  color: comicTokens.colors.white,
                  marginTop: 4,
                }}
              >
                65% Explorado
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View
            style={{
              height: 16,
              backgroundColor: 'rgba(255,255,255,0.4)',
              borderRadius: 8,
              borderWidth: 2,
              borderColor: comicTokens.colors.black,
              overflow: 'hidden',
              marginBottom: comicTokens.spacing.md,
            }}
          >
            <View
              style={{
                height: '100%',
                width: '65%',
                backgroundColor: comicTokens.colors.white,
              }}
            />
          </View>

          <View style={{ gap: comicTokens.spacing.sm }}>
            <ComicButton
              label="Continuar Roteiro"
              icon="🗺️"
              backgroundColor={comicTokens.colors.primary}
              onPress={() => console.log('Continue')}
            />
            <ComicButton
              label="Ver Mapa"
              icon="📍"
              backgroundColor={comicTokens.colors.yellow}
              onPress={() => console.log('Map')}
            />
          </View>
        </ComicCard>

        {/* Daily Challenge */}
        <ComicCard
          backgroundColor={comicTokens.colors.purple}
          borderColor={comicTokens.colors.black}
          style={{ marginHorizontal: comicTokens.spacing.lg, marginTop: comicTokens.spacing.lg }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '900',
                  fontFamily: 'Fredoka',
                  color: comicTokens.colors.white,
                  marginBottom: comicTokens.spacing.sm,
                }}
              >
                Desafio do Dia 🎯
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Nunito',
                  color: comicTokens.colors.white,
                  marginBottom: comicTokens.spacing.md,
                }}
              >
                Visite 3 novos spots em Porto
              </Text>
              <View
                style={{
                  height: 12,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderRadius: 6,
                  overflow: 'hidden',
                  marginBottom: comicTokens.spacing.sm,
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: '40%',
                    backgroundColor: comicTokens.colors.yellow,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'Nunito',
                  color: comicTokens.colors.white,
                }}
              >
                2/3 • +50 XP
              </Text>
            </View>
            <Text style={{ fontSize: 40, marginLeft: comicTokens.spacing.md }}>⚡</Text>
          </View>
        </ComicCard>

        {/* Next Objectives */}
        <ComicSection title="Próximos Objetivos" backgroundColor={comicTokens.colors.yellow}>
          <View style={{ gap: comicTokens.spacing.md }}>
            <ComicCard backgroundColor={comicTokens.colors.blue} borderColor={comicTokens.colors.black}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '900',
                    fontFamily: 'Fredoka',
                    color: comicTokens.colors.white,
                    flex: 1,
                  }}
                >
                  Completar Porto
                </Text>
                <Text style={{ fontSize: 20 }}>5 spots</Text>
              </View>
            </ComicCard>

            <ComicCard backgroundColor={comicTokens.colors.pink} borderColor={comicTokens.colors.black}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '900',
                    fontFamily: 'Fredoka',
                    color: comicTokens.colors.white,
                    flex: 1,
                  }}
                >
                  Explorar Paris
                </Text>
                <Text style={{ fontSize: 20 }}>Bloqueado</Text>
              </View>
            </ComicCard>
          </View>
        </ComicSection>

        {/* Cities Grid */}
        <ComicSection title="Minhas Cidades" backgroundColor={comicTokens.colors.lightBg}>
          <View style={{ gap: comicTokens.spacing.md }}>
            {[
              { name: 'Porto', emoji: '🌉', progress: 65, color: comicTokens.colors.coral },
              { name: 'Paris', emoji: '🗼', progress: 40, color: comicTokens.colors.pink },
              { name: 'Roma', emoji: '🏛️', progress: 20, color: comicTokens.colors.blue },
              { name: 'Amsterdam', emoji: '🇳🇱', progress: 0, color: comicTokens.colors.teal },
            ].map((city) => (
              <ComicCard
                key={city.name}
                backgroundColor={city.color}
                borderColor={comicTokens.colors.black}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 32, marginRight: comicTokens.spacing.md }}>{city.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '900',
                        fontFamily: 'Fredoka',
                        color: comicTokens.colors.white,
                        marginBottom: 4,
                      }}
                    >
                      {city.name}
                    </Text>
                    <View
                      style={{
                        height: 10,
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: comicTokens.colors.white,
                        overflow: 'hidden',
                      }}
                    >
                      <View
                        style={{
                          height: '100%',
                          width: `${city.progress}%`,
                          backgroundColor: comicTokens.colors.white,
                        }}
                      />
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '900',
                      fontFamily: 'Fredoka',
                      color: comicTokens.colors.white,
                      marginLeft: comicTokens.spacing.md,
                    }}
                  >
                    {city.progress}%
                  </Text>
                </View>
              </ComicCard>
            ))}
          </View>
        </ComicSection>

        {/* Quick Actions */}
        <ComicSection title="Ações Rápidas" backgroundColor={comicTokens.colors.lightBg}>
          <View style={{ gap: comicTokens.spacing.md }}>
            <ComicButton
              label="Explorar Nova Cidade"
              icon="🗺️"
              backgroundColor={comicTokens.colors.primary}
              size="large"
              onPress={() => console.log('Explore')}
            />
            <ComicButton
              label="Ver Desafios"
              icon="🎯"
              backgroundColor={comicTokens.colors.coral}
              size="large"
              onPress={() => console.log('Challenges')}
            />
            <ComicButton
              label="Convidar Amigos"
              icon="👥"
              backgroundColor={comicTokens.colors.teal}
              size="large"
              onPress={() => console.log('Invite')}
            />
          </View>
        </ComicSection>
      </ScrollView>

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
          { icon: '📊', label: 'Progresso', id: 2 },
          { icon: '👥', label: 'Amigos', id: 3 },
          { icon: '⚙️', label: 'Config', id: 4 },
        ].map((item) => (
          <View
            key={item.id}
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
          </View>
        ))}
      </View>
    </View>
  );
}
