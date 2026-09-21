# Travel Rats · Foundation 01

Uma aventura de bolso. Interface clara e divertida, com um ratinho viajante no centro da experiência. Esta primeira versão explora a direção visual com dados locais de Lisboa; não representa integração com GPS, conta ou backend.

## Referências e decisões

- [Duolingo: shape language](https://blog.duolingo.com/shape-language-duolingos-art-style/): silhuetas simples, formas arredondadas, ilustrações vetoriais expressivas e espaço para respirar.
- [Duolingo: core tabs redesign](https://blog.duolingo.com/core-tabs-redesign/): hierarquia e consistência entre telas; cada componente tem uma função clara.
- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/), [fontes](https://docs.expo.dev/versions/v57.0.0/sdk/font/), [SVG](https://docs.expo.dev/versions/v57.0.0/sdk/svg/) e [haptics](https://docs.expo.dev/versions/v57.0.0/sdk/haptics/): referências técnicas consultadas antes da implementação.

A interpretação do Travel Rats usa lilás como ação principal, verde como progresso, amarelo como conquista e pêssego como descoberta. Personagem e ícones são vetoriais próprios. Não usamos personagens, fontes proprietárias ou assets do Duolingo.

## Fonte de verdade

`src/design-system/tokens.ts` define cores semânticas, espaçamentos, raios e famílias tipográficas. Os componentes nativos usam StyleSheet e esses tokens. A paleta anterior do Tailwind foi removida para evitar duas identidades concorrentes; NativeWind permanece instalado para usos futuros.

- Fundo creme `#FFFEFA`; superfícies brancas; texto principal `#302C42`.
- Ação primária `#7950D5`, base pressionável `#5735A3`.
- Baloo 2 Bold para títulos; Nunito SemiBold para leitura e ExtraBold para ações.
- Espaçamento: 4, 8, 12, 16, 24, 32 e 48.
- Raios: 12, 18 e 24; pílulas para pequenos indicadores.
- Bordas de 2 px; base dos botões de 6 px. Sem sombras difusas.
- Cores claras recebem texto escuro da mesma família; nunca texto branco sobre verde ou amarelo claros.

## Componentes

`src/design-system/components.tsx`: Label (cinco níveis), Surface, Tactile, Button, OrbitButton e Progress.

`src/design-system/Icon.tsx`: conjunto geométrico compartilhado, traços arredondados e nomes tipados.

`src/components/illustrations/Traveler.tsx`: avatar original com camiseta configurável. As cores de ilustração são independentes das cores semânticas de interface.

Ações têm alvo mínimo de 48 px, resposta de pressão e haptic de seleção quando suportado. Ícones decorativos ficam fora da árvore de acessibilidade; botões têm rótulos e progresso informa seu valor. Não há animação contínua. Fontes acompanham a escala do sistema. Em telas estreitas ou com fonte ampliada, os atalhos ficam abaixo do avatar para evitar sobreposição.

## Home

`src/features/home/HomeScreen.tsx` reúne marca, cidade, saudação, avatar com quatro atalhos e card da aventura atual. Os atalhos abrem painéis fecháveis pelo botão, fundo ou retorno do Android. Meu estilo altera a camiseta durante a sessão. Progresso, cidade e pontos são fixtures identificadas como prévia; nenhuma ação simula check-in real.

A navegação definitiva, personalização persistente, dados reais, demais estados de tela e validação com VoiceOver/TalkBack ficam para a integração de produto. Validar iOS e Android reais antes do beta.

## Tela de roteiro

`app/roteiro.tsx` abre `src/features/itinerary/ItineraryScreen.tsx`. Os dois acessos da home (Roteiro e Continuar aventura) usam navegação do Expo Router. A tela oferece três capítulos, histórico recolhível, próxima parada em lilás, cards conectados por uma linha vertical e recompensa final. Os futuros spots continuam consultáveis, sem bloquear a exploração pela ordem sugerida.

Home e roteiro compartilham fixtures em `src/features/itinerary/demo.ts`. Cada card abre um painel de detalhes, distinguindo visitado e a explorar. Não há alteração de pontos ou check-in simulado. A ilustração `Lisbon.tsx` é um cartão-postal decorativo da cidade, não um mapa nem uma representação de cada monumento.
