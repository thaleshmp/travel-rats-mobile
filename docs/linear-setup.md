kja# Linear — setup pra dev solo a ~8h/semana

Objetivo: o mínimo de estrutura pra saber **o que fazer agora** sem virar
burocracia. Backlog de origem: `backlog-inicial.md`.

## Estrutura

### Team

- **1 team:** "Travel Rats", key **`TR`**. (Sem múltiplos times — é solo.)

### Projects = fases do roadmap

| Project | Target date |
| --- | --- |
| `MVP (closed beta)` | ~9 meses a partir do início |
| `v1.1 — Fotos` | — |
| `v1.2 — Roteiros próprios + Premium` | — |
| `v2` | — |

Ideias soltas e melhorias que não são do MVP **não entram no project MVP** —
vão pra Triage (ver abaixo). O escopo do MVP fica congelado.

### Épicos = parent issues

Dentro do project `MVP`, criar uma issue "parent" por épico (`E0 · Fundação`,
`E1 · Design system`, …) e as tarefas do `backlog-inicial.md` como **sub-issues**.
Assim o progresso do épico aparece sozinho.

### Labels

- **Área:** `area:mobile`, `area:supabase`, `area:design`, `area:infra`,
  `area:curadoria`
- **Tipo:** `type:feature`, `type:bug`, `type:chore`, `type:spike`
- **Estado especial:** `blocked`, `decision`

### Estimates

Ligar estimates (Settings → Team → Estimates), escala de pontos **1 / 2 / 4 / 8**
≈ horas **2 / 4 / 8 / 16** (mesma escala T-shirt do backlog: XS/S/M/L).

### Priority

Usar o campo nativo. Regra simples: o que está no caminho crítico do próximo
marco = `High`; o resto = `Medium`/`Low`.

## Ritmo de trabalho

### Cycles

- **Cycles de 2 semanas**, capacidade real **~12h** (não 16 — semana ruim
  acontece).
- Puxar pro cycle só o que cabe em 12h. Sobrou tempo? Puxa mais. Não terminou?
  Volta pro backlog, sem culpa.
- **WIP = 1** issue "In Progress" (no máximo 2 se uma estiver `blocked`).

### Rotina

- **Segunda, ~30 min:** revisar o cycle, escolher 2–3 issues como foco da semana,
  marcar prioridade.
- **Durante a semana:** uma issue por vez; PR pequeno; fecha e pega a próxima.
- **Sexta/fim de semana, ~15 min:** o que ficou, o que aprendeu de estimativa
  (a velocidade real vai calibrar o `roadmap.md`).

## Integração com GitHub

1. Linear → Settings → Integrations → **GitHub**, conectar os repos `mobile` e
   `travel-rats-supabase`.
2. Criar branch a partir da issue (Linear gera o nome, ex.
   `tr-42-botao-de-checkin`). Ou incluir `TR-42` no nome da branch / título do PR.
3. Automações: issue → **In Progress** ao abrir a branch; → **Done** ao dar merge.
4. Um PR pode fechar várias sub-issues com `Fixes TR-42, TR-43` na descrição.

## Migração inicial (fazer uma vez)

1. Criar team `TR` + os 4 projects.
2. Criar os parent issues E0–E8 no project `MVP`.
3. Colar as tarefas do `backlog-inicial.md` como sub-issues, com label `area:` e
   estimate.
4. Criar as issues `decision` (lista no fim do `backlog-inicial.md`) — deixar no
   backlog, sem cycle.
5. Ligar a integração do GitHub.
6. Primeiro cycle: puxar E0-1 a E0-6.

## O que **não** fazer

- Não criar roadmap/OKR/documentos dentro do Linear — os docs vivem em `docs/`.
- Não estimar tudo com precisão agora; T-shirt grosseiro basta.
- Não abrir sub-issue pra tarefa de < 30 min — junta na issue pai.
- Não mexer no escopo do project `MVP` — ideia nova = Triage.
