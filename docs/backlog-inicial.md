# Backlog inicial — para colar no Linear

Ordem por dependência (E0 → E1 → …). Cada item tem estimativa T-shirt e `area:`.
Como montar o Linear: `linear-setup.md`.

**Estimativas T-shirt:** `XS` ≈ 2h · `S` ≈ 4h · `M` ≈ 8h · `L` ≈ 16h.
**Áreas:** `mobile` · `supabase` · `design` · `infra` · `curadoria`.

---

## E0 · Fundação  (~24–32h)

Objetivo: os dois repos existem, o pipeline inteiro roda, e um build de verdade
chega no TestFlight/Play. **De-riscar antes de qualquer feature.**

| # | Tarefa | Est. | Área |
| --- | --- | --- | --- |
| E0-1 | Criar repo `travel-rats-supabase`: `supabase init`, `config.toml`, `supabase start` local (Docker) rodando | S | supabase |
| E0-2 | Criar projeto Supabase (cloud), região São Paulo, RLS automática ON, expose ON; `supabase link` | XS | supabase |
| E0-3 | Scaffold Expo app: `create-expo-app` (TS), Expo Router, estrutura de pastas (`app/`, `src/components`, `src/lib`, `src/features`, `src/theme`) | M | mobile |
| E0-4 | Config de qualidade: `tsconfig` strict, ESLint (config Expo) + Prettier, `lint`/`typecheck`/`test` scripts | S | infra |
| E0-5 | `src/lib/supabase.ts` (cliente) + config de env via `app.config.ts` + `.env` + EAS secrets | S | mobile |
| E0-6 | Script `npm run gen:types` (`supabase gen types typescript --linked` → `src/types/database.types.ts`), commitar o arquivo | XS | infra |
| E0-7 | GitHub Actions no `mobile`: typecheck + lint + test + checar `gen:types` atualizado | S | infra |
| E0-8 | GitHub Actions no `travel-rats-supabase`: `supabase db lint` + testes pgTAP (esqueleto) | S | infra |
| E0-9 | Projeto EAS, perfis `development`/`preview`/`production`, primeiro dev build iOS+Android | M | infra |
| E0-10 | **Marco:** app "hello world" no TestFlight e no Play internal testing | S | infra |
| E0-11 | Sentry (RN) + PostHog (RN) plugados, evento de teste chegando | S | mobile |

---

## E1 · Design system base  (~20–28h)

Objetivo: dá pra montar tela nova só compondo componentes, com o feel Duolingo.

| # | Tarefa | Est. | Área |
| --- | --- | --- | --- |
| E1-1 | Tokens de tema: paleta (viva, fundo claro, contraste AA), espaçamento, raio, sombras, tipografia — em `src/theme` | M | design |
| E1-2 | Nativewind v4 configurado + tokens expostos como classes/vars; suporte a tema claro (dark fica pra depois) | S | mobile |
| E1-3 | `expo-font` com a display rounded bold (Baloo 2 ou Nunito) + componente `Text` tipado por variante | S | mobile |
| E1-4 | `Button` com "profundidade" (sombra inferior sólida, afunda no press) + variantes + haptics | M | design |
| E1-5 | `Card`, `Screen` (safe area + scroll), `Icon`, `ProgressBar`, `Badge` (visual) | M | mobile |
| E1-6 | Hook `useCelebration()` — confete + `expo-haptics` + wrapper Lottie; 1 animação de teste | M | mobile |
| E1-7 | `EmptyState` com mascote placeholder + copy no tom; loading/skeletons | S | design |
| E1-8 | Storybook leve ou tela `/__dev/components` listando tudo | S | mobile |

---

## E2 · Auth & onboarding  (~16–24h)

| # | Tarefa | Est. | Área |
| --- | --- | --- | --- |
| E2-1 | Migration: `profiles` (id → auth.users, display_name, avatar_url, created_at) + trigger `handle_new_user` | S | supabase |
| E2-2 | RLS de `profiles`: dono lê/edita o seu; leitura pública dos campos do cartão de visita | S | supabase |
| E2-3 | pgTAP: testes das policies de `profiles` | S | supabase |
| E2-4 | Supabase Auth: e-mail (magic link ou OTP) ponta a ponta | M | mobile |
| E2-5 | Sign in with Apple (config plugin + Apple Developer) | M | mobile |
| E2-6 | Sign in with Google (config plugin + OAuth clients) | M | mobile |
| E2-7 | Sessão persistida em MMKV + auto-refresh; `AuthProvider` + hook `useSession` | S | mobile |
| E2-8 | Guarda de rota no Expo Router: `(auth)` vs `(app)`; deep link do magic link | S | mobile |
| E2-9 | Telas: Welcome, Sign in, Onboarding (nome + avatar opcional) | M | design |

---

## E3 · Dados de cidade / roteiro (backend)  (~16–24h)

Pode andar em paralelo a E1/E2.

| # | Tarefa | Est. | Área |
| --- | --- | --- | --- |
| E3-1 | Habilitar PostGIS; convenções de migration (nome, 1 assunto por arquivo) | XS | supabase |
| E3-2 | Migration: `cities` (nome, país, slug, centro `geography(Point)`, ponto de entrada aeroporto/centro, badge asset key) | S | supabase |
| E3-3 | Migration: `spots` (city_id, nome, descrição/copy, `location geography(Point)`, peso `int`, `obrigatorio bool` gerado do peso vs limiar, icon_key, raio_checkin_m) | M | supabase |
| E3-4 | Migration: `itineraries` (preset por cidade, versão) + `itinerary_spots` (ordem) | S | supabase |
| E3-5 | Índice GiST em `spots.location` e `cities.center` | XS | supabase |
| E3-6 | RLS: leitura de `cities`/`spots`/`itineraries` para usuário autenticado; escrita bloqueada (curadoria via service role) | S | supabase |
| E3-7 | View/RPC `get_city_path(city_id)` — spots do preset em ordem, com flag obrigatório | S | supabase |
| E3-8 | `seed.sql`: 1 cidade + ~12–15 spots **manual/placeholder** (troca pela curadoria depois) | M | curadoria |
| E3-9 | `npm run gen:types` + commit no `mobile` | XS | infra |

---

## E4 · Navegação de conteúdo  (~24–36h)

| # | Tarefa | Est. | Área |
| --- | --- | --- | --- |
| E4-1 | Camada de dados no app: TanStack Query + hooks (`useCities`, `useCityPath`, `useSpot`) sobre `supabase-js` | M | mobile |
| E4-2 | Tela **Lista de cidades** (card por cidade, estado da badge, progresso) | M | design |
| E4-3 | Tela **Home da cidade** (progresso x/y, badge prata/ouro, CTA "abrir caminho") | M | design |
| E4-4 | Tela **Caminho — versão simples**: lista vertical de cards ilustrados ligados por linha; estados travado/liberado/feito; scroll até o próximo | L | design |
| E4-5 | Regra de desbloqueio do caminho (linear: libera o próximo ao concluir o anterior? ou tudo liberado? — **decidir**, ver `decision`) | S | mobile |
| E4-6 | Tela **Detalhe do spot**: nome, copy, mini-mapa (`react-native-maps` atrás de `src/components/map/`), botão de check-in | M | mobile |
| E4-7 | Ícones de monumento: pipeline de asset (pack/IA) + mapeamento `icon_key` → asset | S | design |

---

## E5 · Check-in + gamificação  (~32–44h)

O coração do MVP. Fazer cedo, não deixar pro fim.

| # | Tarefa | Est. | Área |
| --- | --- | --- | --- |
| E5-1 | `expo-location`: fluxo de permissão (pré-prompt → prompt nativo → estado negado) | M | mobile |
| E5-2 | Posição atual + distância ao spot (Haversine) no cliente; estado "chegue mais perto (Xm)" | S | mobile |
| E5-3 | Migration: `checkins` (user, spot, city, `at`, coords capturadas, source) + unique (user, spot) | S | supabase |
| E5-4 | Migration: `point_events` (ledger: user, tipo, pontos, ref) + view `user_points` (soma) | S | supabase |
| E5-5 | Migration: `user_city_progress` (user, city, obrigatórios_feitos, total_obrigatórios, zerada_at) | S | supabase |
| E5-6 | Migration: `badges` (key, city_id, tier) + `user_badges` (user, badge, tier, unlocked_at) | S | supabase |
| E5-7 | RPC `do_checkin(spot_id, lat, lng)`: valida `ST_DWithin` com o raio do spot, grava check-in, credita pontos, atualiza progresso, retorna `{ pontos, novo_progresso, zerou?, badge? }` | L | supabase |
| E5-8 | Trigger/lógica de "zerar": ao completar os obrigatórios → `user_badges` prata→ouro; badge prata no 1º check-in da cidade | M | supabase |
| E5-9 | pgTAP: `do_checkin` (fora do raio, duplicado, último obrigatório → zera) + policies | M | supabase |
| E5-10 | UI de check-in: botão → chamada RPC → estado de sucesso/erro; card do caminho vira "feito" | M | mobile |
| E5-11 | Comemoração de **check-in** (confete + haptics + som curto) via `useCelebration` | S | design |
| E5-12 | Comemoração de **zerar a cidade** (tela dedicada, badge ouro animada) | M | design |
| E5-13 | Sem rede: mensagem clara, bloquear check-in (fila offline é v1.1) | XS | mobile |
| E5-14 | Eventos PostHog: `checkin_done`, `city_zerada` | XS | mobile |

---

## E6 · Cartão de visita  (~8–12h)

| # | Tarefa | Est. | Área |
| --- | --- | --- | --- |
| E6-1 | RPC/view `get_profile_card(user_id)`: badges + stats (nº cidades, spots, pontos) | S | supabase |
| E6-2 | Tela **Cartão de visita** (próprio): grid de badges prata/ouro + stats | M | design |
| E6-3 | Entrada no app (aba/menu) + editar nome/avatar | S | mobile |

---

## E7 · Pré-lançamento  (~24–32h)

| # | Tarefa | Est. | Área |
| --- | --- | --- | --- |
| E7-1 | Ícone do app + splash (no tom, com mascote placeholder) | S | design |
| E7-2 | App Store Connect: app, bundle id, capabilities (Sign in with Apple, Location) | S | infra |
| E7-3 | Play Console: app, assinatura, data safety form | S | infra |
| E7-4 | Textos e screenshots das lojas, copy no tom | M | design |
| E7-5 | Política de privacidade (LGPD: localização, conta) publicada + link no app | S | infra |
| E7-6 | Privacy nutrition labels (iOS) + Data safety (Android) | S | infra |
| E7-7 | Revisão de permissões: strings de uso (`NSLocationWhenInUseUsageDescription` etc.) no tom | XS | mobile |
| E7-8 | Dashboard PostHog do funil `sign_up → first_checkin → city_zerada` | S | infra |
| E7-9 | Passada de QA em iOS + Android reais (roteiro de teste do fluxo completo) | M | mobile |
| E7-10 | Maestro: 1 fluxo E2E cobrindo login → abrir spot → check-in (mock de GPS) | M | mobile |
| E7-11 | Build de produção + **closed beta** (TestFlight + Play internal, ~10–20 pessoas) | S | infra |

---

## E8 · Curadoria (trilha paralela)  (~12–20h)

Não bloqueia o começo. Precisa estar pronta antes do E7.

| # | Tarefa | Est. | Área |
| --- | --- | --- | --- |
| E8-1 | Script TS no `travel-rats-supabase`: coleta de candidatos (Wikivoyage + OSM/Wikidata) → lista bruta com coords | M | curadoria |
| E8-2 | Passo de rascunho por IA: lista bruta + contexto → ~12–15 spots, ordem sugerida, 1 frase de copy | M | curadoria |
| E8-3 | Validação (existe? coord precisa? nota/volume mínimos?) — Places ou OSM | S | curadoria |
| E8-4 | Ordenação geográfica (nearest-neighbor a partir do ponto de entrada) | S | curadoria |
| E8-5 | Passada humana (~30 min) + gerar `seed.sql` da cidade real | S | curadoria |

---

## Decisões pendentes (issues `decision`)

Migrar os `[em aberto]` do `CLAUDE.md` + os que surgiram:

- Regra de desbloqueio do caminho: linear (libera o próximo) vs tudo aberto.
- Raio de check-in: valor default e se varia por spot.
- Escala do peso do spot e valor do limiar de "obrigatório".
- O que os pontos desbloqueiam de concreto.
- Badge inicial: "prata" vs "colorida" vs "bronze".
- Se a cidade "deszera" quando o preset ganha spots novos.
- Nome do app / produto (hoje provisório "Roteiro App" / "Travel Rats").
