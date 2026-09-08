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

## Repositórios

O produto vive em **repositórios irmãos** dentro de `travel-rats/`:

| Repo | O que é | Conteúdo |
| --- | --- | --- |
| `mobile` (este) | O app Expo. | Telas, componentes, cliente Supabase, tipos gerados do banco. |
| `travel-rats-supabase` | O projeto Supabase — **fonte de verdade do schema e das regras de negócio**. | `supabase/migrations/` (schema + RLS + triggers + funções SQL), `supabase/functions/` (Edge Functions em TS), `seed.sql`, `config.toml`, scripts de curadoria de roteiros. |

Regra de ouro: **o mobile fala direto com o Supabase** (sem API própria no meio).
Nada de lógica de negócio sensível no app — ela mora no `travel-rats-supabase`,
como função Postgres/RPC ou Edge Function, protegida por RLS.

### Contrato entre os dois repos

Sem API própria, o contrato é o schema + as assinaturas de RPC. Para manter o
mobile em sincronia:

- O `mobile` **commita** `src/types/database.types.ts`, gerado com
  `supabase gen types typescript --linked` (script `pnpm gen:types`).
- Regenerar sempre que o schema mudar no `travel-rats-supabase`. O CI do mobile
  falha se o arquivo estiver desatualizado.

Fase 2: **admin de curadoria** e **painel de parceiros** entram como repo(s)
próprio(s) (Next.js), no mesmo banco.

## Stack

> Fechada para o MVP. Critério: time pequeno, chegar rápido ao MVP, ter
> **geoqueries de verdade** (spots perto de mim, geofence do check-in) sem montar
> infra, e um visual/feel no nível do Duolingo.

| Camada | Escolha |
| --- | --- |
| App | **Expo (managed) + EAS**, **TypeScript strict**, **Expo Router** |
| Arquitetura | Mobile → Supabase **direto**. Negócio em Edge Functions (TS) + RPC/funções Postgres. Autorização por **RLS**. |
| Backend / DB | **Supabase**: Postgres + **PostGIS**, Auth, Storage, Realtime, Edge Functions — no repo `travel-rats-supabase` |
| Auth | Supabase Auth (Apple, Google, e-mail) |
| Fotos | **Supabase Storage** (+ image transform). Cloudinary só se moderação/transform apertar. |
| Mapa | **react-native-maps** (Google no Android, Apple no iOS), isolado atrás de `components/map/` para troca futura por Mapbox |
| Localização / geofence | `expo-location` + cálculo de raio no cliente; geofence nativo p/ background |
| Estado servidor / cache | **TanStack Query** |
| Estado local (UI) | **Zustand** |
| Persistência local | **react-native-mmkv** (cache offline básico, sessão) |
| Formulários / validação | **React Hook Form + Zod** |
| Assinatura premium | **RevenueCat** (libera limites: check-ins/dia, roteiro colaborativo) |
| Push | **expo-notifications** (FCM + APNs) |
| Erros | **Sentry** (RN + Edge Functions) |
| Analytics / feature flags | **PostHog** |
| Estilo / UI | **Nativewind v4** + biblioteca própria pequena de componentes (design system estilo Duolingo) |
| Animação / feel | **Reanimated 3** + **Moti** + **Lottie** (`lottie-react-native`) + **expo-haptics** + confete |
| Tipografia | fonte display rounded bold via `expo-font` (candidatas: Baloo 2 / Nunito) |
| Testes | **Jest + React Native Testing Library**; **Maestro** para o fluxo de check-in |
| Lint / format | ESLint (config Expo) + Prettier + TypeScript strict |
| CI | GitHub Actions: typecheck + lint + test + `gen:types` atualizado; builds via **EAS** |

### Alternativas descartadas

- **Flutter**: boa animação, mas menos reuso com o web (admin/parceiros) e
  ecossistema de mapas/push mais trabalhoso.
- **Firebase**: geoquery contornada por geohash, sem SQL/PostGIS — pior para
  "spots perto de mim" e relatórios de parceiro.
- **Backend próprio** (Hono/NestJS na frente do Supabase): mais controle, mais
  infra. Caminho de saída se a lógica de negócio crescer além do confortável em
  SQL + Edge Functions.
- **Mapbox agora**: estilo custom combina com a identidade, mas custo por MAU e
  integração mais chata com Expo. Adiado — o mapa fica isolado para trocar depois.

### Em aberto

- Migração para **Mapbox** (quando a identidade visual pesar mais que o custo).
- Estratégia de **offline** — quanto do roteiro funciona sem rede em viagem.
- Custos em escala (Storage de fotos, RevenueCat, curadoria/Places).
- Onde rodam os **scripts de curadoria** (execução manual vs. agendada no Supabase).
- Detalhes do design system estilo Duolingo (tokens, componentes, biblioteca de
  ilustração) — ver "Identificação visual".

## MVP

**Em uma frase:** um checklist gamificado dos spots de **uma cidade**, com um
caminho estilo jogo, check-in validado por GPS que rende pontos, e "zerar" a
cidade pra virar a badge de ouro.

MVP **lean**: loop central + caminho (versão simples, cards + linha), 1 cidade.
Fora do MVP → fotos (v1.1), roteiros próprios + paywall premium (v1.2),
amigos/social e 3D (v2).

- Escopo detalhado: `docs/mvp.md`
- Fases e prazo (~7–9 meses a 8h/sem até closed beta): `docs/roadmap.md`
- Backlog de épicos/tarefas: `docs/backlog-inicial.md`

## Gestão do projeto

Tarefas no **Linear**, team `TR`. Dev solo, ~8h/semana. Setup e rotina:
`docs/linear-setup.md`. Os itens `[em aberto]` deste documento viram issues
`decision` no backlog.

## Próximos passos sugeridos

1. ~~Definir stack mobile + backend~~ — **feito** (`docs/adr/0001`).
2. ~~Fechar escopo do MVP~~ — **feito** (`docs/mvp.md`, `docs/roadmap.md`).
3. Montar o Linear a partir de `docs/backlog-inicial.md`.
4. **E0 · Fundação**: criar `travel-rats-supabase` + projeto Supabase; scaffold do
   Expo neste repo; CI nos dois; pipeline EAS até um build "hello world" no
   TestFlight/Play.
5. **E1 · Design system base** (tokens + componentes com feel Duolingo).
6. Seguir os épicos E2→E8 na ordem do backlog.

@AGENTS.md
