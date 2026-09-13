# Plano de execução — Roteiro App

## Contexto

Dev solo, ~8h/semana, meta de renda de R$ 5–15 mil/mês. Já abandonou projetos antes
— este plano é desenhado em torno disso, não apesar disso.

O projeto já tem: docs de produto, stack fechado (Expo SDK 57 + Supabase), tabela
`profiles` funcionando no Supabase cloud, e um scaffold Expo limpo.

**A autópsia do último projeto abandonado é o dado mais importante deste plano:**
*"travei num problema técnico + no meio do desenvolvimento ver que a UX não me
agradava, não parecia um app fluido. Então não gostar do que estava vendo e mesmo
assim continuar me tirou a motivação."*

Duas causas de morte, e as duas têm remédio estrutural:

1. **Continuar construindo em cima de algo que você já sabia que estava ruim.** Seu
   padrão estético alto é um ativo — o erro foi empurrar com a barriga em vez de
   parar e consertar.
2. **Travamento técnico vira sessão perdida, que vira semanas sem abrir o projeto.**

O roadmap anterior (7–9 meses até closed beta, backlog organizado por camada técnica
E0→E8) produziria ~8 semanas de infraestrutura invisível antes de qualquer coisa
demonstrável. Esse é o cenário de morte. Este plano reorganiza o mesmo escopo por
**demo** em vez de por camada.

---

## Fase 0 — Antes de escrever qualquer código (30 min, hoje)

Pré-requisito inegociável. Sem isso o resto não acontece.

1. **Marcar 3 blocos fixos no calendário**, com alarme, para as próximas 4 semanas.
   Hoje o tempo é "quando sobra" — tempo não marcado é tempo que some. Sugestão
   para 8h: um bloco longo no fim de semana (3h) + dois blocos de 2,5h em noites
   fixas. Bloco perdido **não vira dívida** e não se recupera na semana seguinte.
2. **Escolher a testemunha.** Uma pessoa que recebe um vídeo de 30s toda sexta.
3. **Escrever o critério de parada** (ver seção "Realidade" no fim) enquanto a
   cabeça está fria.
4. **Criar `NEXT.md` na raiz do repo** com uma linha: a próxima ação concreta.

---

## As 7 fases

Cada fase = 2 semanas ≈ 6 sessões. Toda fase termina com algo que **abre no seu
celular** e que você mostra pra outra pessoa sem precisar explicar.

### Fase 1 · O feel (semanas 1–2)
> Demo: um botão no meu celular que responde tão bem quanto o do Duolingo.

Dado o seu histórico, fluidez **não é polimento, é requisito funcional**. Esta
fase existe para provar cedo que o app pode ter o feel certo. Timebox: **6
sessões** — estourou, congela e segue; o design system continua crescendo dentro
das fases seguintes, não numa fase própria.

| Sessão | Tarefa |
| --- | --- |
| ✅ S1 | Limpar boilerplate (`app/(tabs)`, `modal.tsx`, `Themed.tsx`, `StyledText.tsx`, `EditScreenInfo.tsx`, `constants/Colors.ts`); `_layout.tsx` vira `<Stack/>` puro |
| S2 | Nativewind rodando (babel + metro + `global.css` + `nativewind-env.d.ts`); validar compatibilidade com RN 0.86 na doc antes; `expo start --clear` |
| S3 | Tokens de cor (cada cor com seu par `shade`) + fonte Baloo 2/Nunito |
| S4 | **O Button**: borda inferior sólida, afunda no press (Reanimated, ~40ms descendo / ~80ms subindo), haptics no `onPressIn` |
| S5 | Rodar no celular físico (Expo Go) e ajustar até o toque parecer certo |
| S6 | Tela `app/design.tsx` como catálogo dos componentes |

### Fase 2 · O caminho existe (semanas 3–4)
> Demo: dá pra entender o app inteiro olhando a tela, sem eu explicar.

| Sessão | Tarefa |
| --- | --- |
| S1 | Escolher a cidade do MVP; array TS com 12 spots reais (nome, coord, peso) |
| S2 | A trilha vertical: cards + linha conectando, scroll |
| S3 | Estados visuais: bloqueado / disponível / concluído |
| S4 | Transição de entrada da tela (a fluidez importa aqui) |
| S5 | Tela de detalhe do spot + navegação |
| S6 | Sessão de atrito (ver regras) |

### Fase 3 · O loop funciona (semanas 5–6) ⬅ **marco decisivo**
> Demo: eu faço check-in e dá vontade de fazer de novo.

Sem banco, sem GPS, sem login. Estado em memória. Esta fase testa a hipótese
central do produto pelo custo mais baixo possível.

| Sessão | Tarefa |
| --- | --- |
| S1 | Botão de check-in → card vira dourado |
| S2 | Confete (Lottie) + haptics + som |
| S3 | Barra de progresso da cidade (7/12) |
| S4 | "Zerar" → tela de badge de ouro |
| S5 | Polir o timing das animações até ficar gostoso |
| S6 | **Go/no-go**: 3 pessoas brincam. Ninguém quer o segundo check-in? O problema é o produto — descobrir isso na semana 6 custa 6 semanas, não 8 meses |

### Fase 4 · Dados de verdade (semanas 7–8)
> Demo: a tela é idêntica — mas agora vem do banco.

| Sessão | Tarefa |
| --- | --- |
| S1 | Schema `cities` / `spots` / `itineraries` (scripts + dump, como você decidiu) |
| S2 | Seed manual: 1 cidade, 12 spots |
| S3 | Cliente Supabase + env via `app.config.ts` + `.env` (nunca hardcoded) |
| S4 | TanStack Query — trocar o mock pelo fetch |
| S5 | Estados de loading/erro que não quebram o feel |
| S6 | **Teste de demanda**: landing page + 3 comunidades, meta 50 e-mails (ver "Realidade") |

### Fase 5 · Você tem conta (semanas 9–10)
> Demo: desinstalo, reinstalo, e meu progresso volta.

| Sessão | Tarefa |
| --- | --- |
| S1 | Auth email/senha (login + signup) |
| S2 | Sessão persistente (MMKV) + `onAuthStateChange` no layout raiz |
| S3 | Tabela `check_ins` + RLS |
| S4 | Salvar check-in real e carregar progresso |
| S5 | Tela de perfil lendo `profiles` |
| S6 | Sessão de atrito |

### Fase 6 · GPS (semanas 11–12)
> Demo: saio na rua e faço um check-in de verdade.

| Sessão | Tarefa |
| --- | --- |
| S1 | `expo-location` + fluxo de permissão |
| S2 | Validação de raio no cliente |
| S3 | **Modo dev "fingir que estou no spot"** — sem isso você não consegue desenvolver de casa; é o item mais subestimado do projeto |
| S4 | RPC `do_checkin` no banco (validação server-side) |
| S5 | Estados de erro: GPS impreciso, offline, longe demais |
| S6 | Teste de campo real na cidade escolhida |

### Fase 7 · Alguém que não é você (semanas 13–14)
> Demo: 5 pessoas com o app instalado.

| Sessão | Tarefa |
| --- | --- |
| S1 | EAS build + TestFlight |
| S2 | Onboarding mínimo (3 telas) |
| S3 | Sentry + PostHog (saber o que acontece) |
| S4 | 5 pessoas instalam |
| S5 | **Assistir 2 delas usando, sem ajudar** — desconfortável e mais valioso que qualquer métrica |
| S6 | Consolidar o que aprendeu e decidir a fase 8 |

**Total: ~3,5 meses até usuário real** (contra 7–9 meses do roadmap atual).

**Cortado do MVP** (volta depois, na ordem): fotos, amigos/social, parceiros,
premium/paywall, curadoria por IA, roteiros do usuário, múltiplas cidades, 3D.

---

## Regras permanentes

1. **Pare no meio da frase.** Nunca termine uma sessão num ponto limpo — deixe uma
   função pela metade ou um erro de compilação. Retomar de um ponto quebrado custa
   2 minutos; de um ponto limpo, 40.

2. **Nunca termine uma sessão travado.** Corolário da anterior, e mais importante.
   Se travou, o último ato da sessão é fazer o workaround feio funcionar. Sessão
   que fecha travada é a sessão seguinte que não acontece.

3. **Regra dos 20 minutos.** Travou 20 min no mesmo erro: para de tentar sozinho.
   Pergunta, ou faz o feio com um `TODO`. Nunca gastar uma sessão inteira travado —
   foi assim que o projeto anterior morreu.

4. **`atrito.md`.** Sempre que algo no app incomodar (travou, feio, lento, confuso),
   anota uma linha e **continua a tarefa da sessão**. Cada fase tem uma sessão
   dedicada a limpar essa lista. Isso resolve os dois extremos: não empurra com a
   barriga (o que matou o projeto passado) e não cai no polimento infinito.

5. **25 minutos no dia ruim.** Não é sobre o output. Cada semana parada dobra o
   custo de voltar; depois de três, o projeto virou estranho.

6. **`NEXT.md` é o último ato de toda sessão.** Uma frase concreta com nome de
   arquivo — não uma categoria.

7. **Proibido até a Fase 7:** refatorar o que funciona, trocar de biblioteca,
   começar o admin/painel de parceiros, mexer em logo/nome/site, adicionar a
   segunda cidade.

---

## Realidade — o que o plano técnico não cobre

**A matemática da meta.** R$ 10 mil/mês via assinatura a R$ 15 exige ~670
assinantes. A conversão free→paid em app de consumidor novo fica em 2–5%: são
~20 mil usuários ativos, o que significa dezenas de milhares de downloads. Para
um dev solo sem budget de marketing, em 12 meses, é improvável por esse caminho.

**O caminho mais provável para essa meta é densidade, não escala.** Uma cidade,
2–3 mil usuários ativos *nela*, e 30–40 estabelecimentos locais pagando R$ 250/mês
por presença e promoções. Dá os mesmos R$ 10 mil com 1% dos usuários — e é
exatamente para onde o MVP de uma cidade já aponta. Isso muda uma decisão agora:
**a cidade do MVP deve ser uma onde você consiga bater na porta dos comércios**,
não a mais turística do mundo.

**Teste de demanda na semana 8, não no fim.** Uma tarde: landing page + post em
3 comunidades de viagem/mochileiros. Meta: 50 e-mails. Se ninguém se cadastra
quando o produto é grátis e ainda nem existe, o problema não é o código.

**Critério de parada, escrito na Fase 0.** Um número e uma data, decididos com a
cabeça fria — ex.: *"se na semana 20 eu tiver menos de 30 usuários ativos, eu paro
e reavalio"*. Decisão emocional daqui a 6 meses é decisão ruim.

**O reframe.** "Um dos meus únicos tiros" sobe a aposta de cada decisão, e aposta
alta em quem tem padrão estético alto produz paralisia. No pior cenário você termina
com um produto de ponta a ponta publicado — RN, Postgres/PostGIS, auth, pagamentos,
loja — o que muda a sua conversa salarial e abre freelance. Quem não aposta tudo
num tiro só é quem consegue terminar.

---

## Como verificar que está funcionando

Não é "escrevi código essa semana". São os marcos observáveis:

| Quando | Sinal de que está no caminho |
| --- | --- |
| Semana 2 | O app está no seu celular e o botão dá gosto de apertar |
| Semana 4 | Uma pessoa olha a tela e entende o app sem explicação |
| Semana 6 | Alguém faz um check-in e quer fazer o segundo |
| Semana 8 | 50 e-mails na landing page |
| Semana 10 | Desinstalar e reinstalar preserva o progresso |
| Semana 12 | Um check-in real, na rua, validado por GPS |
| Semana 14 | 5 pessoas que não são você usaram o app |

Sinal de alerta, em qualquer fase: **duas semanas sem abrir o projeto**. Não é
preguiça — é sintoma. Quando acontecer, a resposta não é culpa, é reduzir a
próxima tarefa até ela caber em 25 minutos.
