# ADR 0001 — Stack e arquitetura do MVP

- **Status:** aceito
- **Data:** 2026-09-07
- **Contexto:** primeira definição técnica do Roteiro App. Ver `CLAUDE.md` para o
  produto.

O critério geral: time pequeno, chegar rápido ao MVP, ter geoqueries de verdade
(spots perto de mim, geofence do check-in) sem montar infra, e um visual/feel no
nível do Duolingo.

---

## Decisão 1 — O mobile fala direto com o Supabase (sem API própria)

**Decisão.** Não haverá um servidor de API intermediário no MVP. O app usa
`supabase-js` direto:

- Leituras e CRUD simples → PostgREST / `supabase.from(...)`, com autorização por
  **RLS**.
- Regra de negócio sensível (pontuação, "zerar cidade", validação de check-in por
  GPS, check-ins patrocinados, limite diário da versão grátis) → **funções
  Postgres / RPC** ou **Edge Functions (TS)**.
- Realtime, Auth e Storage → APIs prontas do Supabase.

**Alternativas consideradas.**

- *API própria fina* (Hono/NestJS/Next route handlers) na frente do Supabase:
  todas as regras em TS num lugar só, mais controle — mas mais um serviço para
  hospedar e manter, sem ganho claro no MVP.
- *Híbrido* (leitura direta, escrita via API própria): meio-termo, mesma
  objeção de infra.

**Consequências.**

- ✅ Menos infra e menos código de servidor; menos peças para operar.
- ✅ Tudo versionado em arquivos (Supabase CLI), editável no VSCode.
- ⚠️ **RLS é a camada de segurança** — política errada = vazamento de dados.
  Exige disciplina e testes de política (pgTAP) no `travel-rats-supabase`.
- ⚠️ Lógica de negócio fica dividida entre SQL (plpgsql) e TS (Edge Functions);
  testar plpgsql é menos confortável.
- ⚠️ O contrato entre app e banco é implícito (schema + assinaturas de RPC);
  mitigado por tipos gerados e commitados (ver Decisão 2).
- 🚪 **Saída:** se a lógica crescer além do confortável, introduzir uma API fina
  (Hono/NestJS) sem trocar o resto da stack.

---

## Decisão 2 — Dois repositórios irmãos

**Decisão.** O produto se divide em:

- `travel-rats/mobile` (este repo) — o app Expo.
- `travel-rats/travel-rats-supabase` — o projeto Supabase: `migrations/`,
  `functions/`, `seed.sql`, `config.toml`, scripts de curadoria. Fonte de verdade
  do schema e das regras.

Sincronização de tipos: o `mobile` commita `src/types/database.types.ts`, gerado
com `supabase gen types typescript --linked` (`npm run gen:types`). Regenerar a cada
mudança de schema; o CI do mobile falha se estiver desatualizado.

**Alternativas consideradas.**

- *Monorepo (pnpm + Turborepo)*: melhor reuso e um PR atômico entre camadas, mas
  mais setup agora e o web só entra na fase 2.
- *Pasta `supabase/` dentro do `mobile`*: acopla deploy do banco ao do app e
  polui o repo do app.

**Consequências.**

- ✅ Deploy independente de app e banco.
- ✅ O repo do banco pode ser compartilhado com os futuros repos web (admin,
  painel de parceiros).
- ⚠️ Uma feature pode exigir PRs coordenados nos dois repos.
- ⚠️ O contrato entre repos depende do passo `gen:types` — precisa de guarda no CI.

---

## Decisão 3 — `react-native-maps` no MVP, isolado para troca futura

**Decisão.** `react-native-maps` (Google no Android, Apple no iOS). O acesso ao
mapa fica atrás de `components/map/` (um wrapper próprio: marcadores, rota,
câmera), para que trocar por Mapbox seja uma mudança localizada.

**Alternativas consideradas.** *Mapbox agora*: estilo 100% custom combinando com a
identidade Duolingo — mas custo por MAU e integração mais trabalhosa com Expo
(config plugin, build nativo).

**Consequências.**

- ✅ Grátis, nativo, rápido de integrar; sem config plugin.
- ⚠️ Estilização custom limitada (dá para ajustar cores no Google, quase nada no
  Apple).
- 🚪 **Saída:** migrar para Mapbox quando a identidade visual do mapa virar
  prioridade; só o wrapper muda.

---

## Decisão 4 — Expo managed + EAS

**Decisão.** Expo no fluxo *managed* (sem `eject` / `prebuild` manual como norma).
Libs nativas entram via **config plugins**. Build e submissão via **EAS**;
atualizações de JS via **EAS Update** (OTA).

**Consequências.**

- ✅ Um código para iOS + Android; módulos prontos de localização, mapa, push,
  notificações, haptics.
- ✅ OTA para correções de JS sem passar pela revisão das lojas.
- ⚠️ Dependemos de config plugins existirem/funcionarem para libs nativas
  (RevenueCat, Sentry, react-native-maps têm).
- ⚠️ Builds nativos rodam no EAS (fila/custo) — não localmente por padrão.
