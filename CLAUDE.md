# Roteiro App

> App de viagens que monta um roteiro (itinerário) com checklist para cada cidade.
> Documento inicial do projeto — a partir de um dump de ideias. Muita coisa aqui
> ainda é hipótese e está marcada como **[em aberto]**.

## Visão geral

Aplicativo mobile que, para cada cidade, gera um **roteiro** de pontos de interesse
partindo do aeroporto (ou do centro da cidade). O usuário vai fazendo *check-in*
conforme visita os lugares e ganha pontos por isso. Há uma camada social (amigos,
comparação de roteiros, fotos) e uma camada de parcerias comerciais
(estabelecimentos, eventos, promoções).

O app já vem com um **preset de spots** para algumas cidades, mas o usuário também
pode criar os próprios roteiros e compartilhá-los.

## Glossário

- **Roteiro** (ou *itinerário* / *plano de viagem*): a lista ordenada de pontos de
  uma cidade. Evitar a palavra "lista" na UI.
- **Spot / ponto de interesse (POI)**: um lugar do roteiro (atração, restaurante,
  estabelecimento parceiro, ponto de evento). Tem um **peso**; acima de um limiar
  é **obrigatório** para zerar a cidade, abaixo é **opcional**.
- **Zerar**: fazer check-in em todos os spots obrigatórios de uma cidade.
- **Check-in**: marcar um spot como visitado. Rende pontos.
- **Cartão de visita**: perfil público do usuário com badges de países visitados e
  eventos que participou.

## Funcionalidades principais

1. **Roteiros pré-montados** por cidade (curados pelo app).
2. **Criação de roteiros próprios** pelo usuário.
3. **Compartilhamento** de roteiro com amigos.
4. **Check-in em spots** com **validação leve por GPS** — confere se o usuário está
   dentro de uma área de interesse (raio ao redor do POI). Validação mínima, não
   antifraude pesada. **[em aberto: raio, tolerância, o que fazer offline]**
5. **Ponto de partida** do roteiro: aeroporto ou centro da cidade.
6. **Upload de fotos** em cada spot; amigos veem as fotos uns dos outros naquele POI.
7. **Avaliações e comentários** sobre lugares visitados, para ajudar outros viajantes.

## Gamificação

- Pontos por **check-in**.
- Pontos por **adicionar foto**.
- Pontos por **check-ins patrocinados** de eventos/propagandas em datas específicas
  (uma propaganda de evento vira um "check" que dá pontos).
- **Badges**: países visitados, eventos participados — exibidos no cartão de visita.
- **[em aberto]**: níveis, streaks, ranking entre amigos, o que os pontos "compram".

### "Zerar" um local

Completar os spots **obrigatórios** de um roteiro é **zerar** aquela cidade
(referência a "zerar um jogo").

- Cada spot tem um **peso** (relevância do lugar para a cidade). A partir de um
  **limiar de peso**, o spot é **obrigatório** para zerar; abaixo disso é
  **opcional** (rende pontos e conta para o progresso, mas não trava o ouro).
  **[em aberto: escala do peso, valor do limiar, se o limiar varia por cidade]**
- O peso pode sair da curadoria + sinais de mapa (nº de avaliações, fama) e ser
  ajustado na passada humana.
- Cada cidade tem uma **badge própria**. Ao visitar a cidade / fazer o primeiro
  check-in, o usuário desbloqueia a versão inicial da badge — **prata** (ou só
  colorida). **[em aberto: prata vs. "colorida" vs. bronze]**
- Ao **zerar** a cidade (todos os spots **obrigatórios** com check-in), a badge
  vira **ouro**. Os opcionais podem virar um selo extra ("100% / completista").
- A badge de ouro aparece em destaque no **cartão de visita**.
- **[em aberto]**:
  - O que conta para zerar — só spots obrigatórios do preset, ou também os que o
    usuário adicionou (provável: os do usuário nunca são obrigatórios)?
  - E se o roteiro mudar depois (novos spots)? A cidade "deszera"?
  - Recompensa extra ao zerar (pontos bônus, badge de ouro + selo animado,
    comemoração especial).
  - Nível intermediário (ex.: 50% = badge prata cheia) antes do ouro.
  - "Zerar um país" = zerar todas as cidades daquele país → badge de país em ouro.

## Social

- Adicionar amigos.
- Comparar roteiros entre amigos.
- Compartilhar roteiro.
- Feed/visualização de fotos dos amigos por ponto de interesse.

## Parceiros e merchandising

- **Estabelecimentos** podem fazer merchandising dentro do app: promoções e
  descontos para quem visitar e fizer check-in.
- **Eventos** em certas datas podem inserir propagandas que viram um check
  pontuável.
- Seção de **avaliações/comentários** alimenta a descoberta de lugares.
- **[em aberto]**: painel para o estabelecimento, modelo de cobrança do parceiro,
  moderação de conteúdo.

## Monetização

- **Freemium**: versão grátis com o básico + versão **premium** com recursos extras.
- Premium inclui: roteiros exclusivos, descontos em parceiros, roteiros ilimitados.
- **Parcerias** com turismo, hotéis e restaurantes: espaço para anúncios e promoções.

### Versão grátis
- Máx. **3 check-ins por dia** *(número a revisar)*.
- Só viaja **sozinho** (sem roteiro colaborativo).

### Versão premium
- Check-ins ilimitados (ou limite bem maior).
- Criar **roteiro com amigos** (colaborativo).

## Perfil do usuário — "cartão de visita"

Página pública com:
- Badges de países já visitados.
- Eventos que participou.
- **[em aberto]**: estatísticas (nº de cidades, spots, fotos), privacidade,
  URL/QR compartilhável.

## Curadoria dos roteiros iniciais

> Como montar os roteiros pré-prontos sem conhecer bem cada cidade e sem gastar
> muito tempo assistindo vídeo. Direção: **pipeline semiautomático** — IA + fontes
> abertas geram o rascunho, dados de mapa validam, uma passada humana rápida aprova.

### Fontes candidatas

- **Wikivoyage** (CC BY-SA): tem seções "Ver / Fazer" e roteiros prontos por cidade.
  Melhor ponto de partida textual e com licença amigável.
- **Wikipedia / Wikidata**: coordenadas, descrição, imagem de cada POI.
- **OpenStreetMap**: POIs, categorias, coordenadas — sem custo de licença.
- **Google Places / Maps**: validação (o lugar existe? coordenada, horário, nota,
  nº de avaliações, "fechado permanentemente"). Cuidado com termos de uso —
  Places tem restrição de cache/armazenamento.
- **Recomendação de IA** (Claude et al.): gera o rascunho do roteiro, agrupa por
  região, sugere ordem e tempo de visita, escreve a copy no tom do app.
- Reforço opcional: Atlas Obscura, órgãos oficiais de turismo, listas "top 10".

### Pipeline proposto

1. **Seed**: lista de cidades do MVP (começar com 2–3).
2. **Coleta de candidatos** por cidade: puxar POIs de Wikivoyage + OSM/Wikidata →
   lista bruta de 30–60 lugares com coordenadas.
3. **Rascunho por IA**: dar a lista bruta + contexto (duração típica da viagem,
   perfil do app) e pedir um roteiro de ~10–15 spots, agrupado por área,
   com ordem sugerida a partir do aeroporto/centro e uma frase de copy por spot.
4. **Validação por dados de mapa**: para cada spot escolhido, confirmar via Places
   que existe, pegar coordenada precisa, horário e nota; descartar fechados ou
   com nota/volume muito baixos.
5. **Ordenação geográfica**: resolver a sequência por proximidade (nearest-neighbor
   simples) partindo do ponto de entrada; quebrar em "dias" se fizer sentido.
6. **Passada humana** (rápida, ~30 min/cidade): olhar o mapa final, cortar o que
   parecer turístico demais/armadilha, ajustar copy.
7. **Publicação** como roteiro preset, versionado.

### Decisões em aberto

- Licenciamento: o que pode ser **armazenado** de cada fonte (Places restringe;
  Wikivoyage/OSM exigem atribuição).
- Quantos spots por roteiro e se divide por dias.
- Reexecutar o pipeline periodicamente para pegar lugares que fecharam.
- Contribuição da comunidade depois (usuários sugerem spots para o preset).
- Ferramenta interna de curadoria (mesmo que só um script + planilha no começo).

## Questões em aberto

- Limite de 3 check-ins/dia na versão grátis — validar número e se atrapalha a
  experiência central.
- Precisão e antifraude do check-in por GPS.
- O que os pontos desbloqueiam de fato (recompensa concreta).
- Curadoria dos roteiros pré-montados: ver seção "Curadoria dos roteiros iniciais".
- Fonte de dados de lugares (Google Places, OSM, base própria?).
- Moderação de fotos e comentários.
- LGPD: localização, fotos, dados de amigos.

## Identificação visual

> **[em aberto]** — direção inicial, ainda não fechada. Serve como norte para os
> primeiros protótipos.

**Referência visual: Duolingo.** O norte de UI, ilustração e gamificação é a
linguagem do Duolingo — cores vivas sobre fundo claro, tipografia arredondada e
pesada (rounded bold), botões grandes com "profundidade" (sombra inferior
sólida), mascote sempre presente e comemorações generosas (confete, som, progress
rings, streaks).

### Tom

Cara **bem jovem**, nada sério. Comunicação **cheia de emojis**, ilustrações com
**formas engraçadas** e mensagens em linguagem descontraída/jovem.

- App leve e divertido, não corporativo.
- Emojis fazem parte da linguagem da interface (títulos, botões, notificações,
  estados vazios, mensagens de erro).
- Copy informal, com humor, sem gírias que envelheçam rápido demais.
- Celebra conquistas do usuário (check-in, badge, foto) com comemoração visual —
  animações, confete, reações.

### Ilustrações

- Estilo **flat e geométrico amigável**, inspirado no Duolingo — formas simples,
  cores chapadas, cantos arredondados; proporções levemente exageradas para dar
  humor.
- Mascote viajante **consistente** (no papel do Duo): aparece em estados vazios,
  onboarding e comemorações. Nome e desenho ainda **[em aberto]**.
- Formas geométricas imperfeitas como elemento gráfico de fundo.
- Ícones de spot/POI com personalidade (não pins genéricos de mapa).

### Cor e tipografia — **[em aberto]**

- Paleta provável: cores vivas e saturadas, alto contraste, clima "férias".
- Tipografia: display arredondada e pesada para títulos (rounded bold no estilo
  Duolingo); fonte neutra e legível para textos longos e listas.
- Precisa passar em contraste de acessibilidade mesmo com cores fortes.

### Voz e mensagens

- 1ª/2ª pessoa, direto com o usuário ("Bora fechar esse roteiro?").
- Estados vazios, erros e loadings são oportunidade de humor, não texto seco.
- Notificações push no mesmo tom.
- **[em aberto]**: guia de voz com exemplos de "faz / não faz".

### Pendências de identidade

- Nome do app e do produto (hoje: "Roteiro App", provisório).
- Logo e mascote.
- Definir paleta e fontes.
- Kit de ilustração / biblioteca de emojis-ícones.
- Guia de estilo de copy.

## Stack — recomendação inicial

> Ainda não fechada, mas esta é a proposta de partida. Critério: time pequeno,
> chegar rápido ao MVP, e ter **geoqueries de verdade** (spots perto de mim,
> geofence do check-in) sem montar infra.

### Recomendado

| Camada | Escolha | Por quê |
| --- | --- | --- |
| Mobile | **React Native + Expo** (EAS) | Um código p/ iOS+Android, módulos prontos de localização/mapa/push, OTA updates. |
| Mapa | **react-native-maps** (Google no Android, Apple no iOS) ou **Mapbox** | Mapbox se quiser estilo custom combinando com a identidade jovem. **[em aberto]** |
| Localização / geofence | `expo-location` + cálculo de raio no cliente, geofence nativo p/ background | Validação leve do check-in. |
| Backend / DB | **Supabase** (Postgres + **PostGIS**) | Auth, Storage de fotos, Realtime e Edge Functions no mesmo lugar; PostGIS resolve as geoqueries. |
| Auth | Supabase Auth (Apple, Google, e-mail) | Login social exigido nas lojas. |
| Fotos | Supabase Storage (+ transform) ou **Cloudinary** | Upload, thumbnail, moderação. |
| Lógica de servidor | Supabase Edge Functions (Deno) | Pontuação, "zerar cidade", check-ins patrocinados. Migrar p/ serviço Node (Fly.io/Railway) se crescer. |
| Push | Expo Notifications (FCM + APNs) | — |
| Assinatura premium | **RevenueCat** | Abstrai billing da App Store / Play; libera limites (check-ins/dia, roteiro colaborativo). |
| Estado / dados no app | TanStack Query + Zustand | Cache, offline básico. |
| Analytics | PostHog | Funil, feature flags. |
| Erros | Sentry | RN + funções. |
| Ferramenta de curadoria | Script TypeScript no mesmo Postgres; depois admin em **Next.js** (ou Retool) | Ver "Curadoria dos roteiros iniciais". |
| Painel de parceiros (fase 2) | Next.js web no mesmo banco | Promoções, check-ins patrocinados. |

### Alternativas consideradas

- **Flutter** no lugar de RN: ótima performance de animação (bom p/ a identidade),
  mas menos reuso com o web (admin/painel) e ecossistema de mapas/push um pouco
  mais trabalhoso. Viável se o time preferir Dart.
- **Firebase** no lugar de Supabase: mais simples no começo, mas geoquery é
  contornada (geohash) e sem SQL/PostGIS — pior p/ "spots perto de mim" e para os
  relatórios de parceiro.
- **Backend próprio** (NestJS + Postgres): mais controle, mais tempo de setup.
  Só se algum requisito furar o teto do Supabase.

### Em aberto

- Mapa: Google/Apple nativo vs. Mapbox (custo x identidade visual).
- Onde mora a lógica pesada de pontuação (Edge Function vs. serviço dedicado).
- Estratégia de offline (quanto do roteiro funciona sem rede em viagem).
- Custos em escala (Places, Mapbox, Storage).

## Próximos passos sugeridos

1. Fechar o **MVP**: 1–2 cidades com roteiro pré-montado, check-in com GPS, pontos.
2. Definir stack mobile + backend.
3. Modelar entidades: Usuário, Cidade, Roteiro, Spot (com peso/obrigatório),
   CheckIn, Foto, Amizade, Badge.
4. Definir fonte de dados de POIs.
5. Prototipar a tela de roteiro (mapa + checklist a partir do aeroporto).
