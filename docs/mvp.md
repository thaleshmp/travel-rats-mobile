# MVP — escopo

> **Em uma frase:** um checklist gamificado dos spots de **uma cidade**, com um
> caminho estilo jogo, onde você faz check-in nos lugares (validado por GPS),
> ganha pontos e "zera" a cidade pra virar a badge de ouro.

Contexto de produto: `../CLAUDE.md`. Stack: `../CLAUDE.md` seção "Stack" +
`adr/0001-stack-e-arquitetura.md`. Fases seguintes: `roadmap.md`.

## Hipótese que o MVP testa

Pessoas em viagem querem um **checklist gamificado** dos spots de uma cidade, com
**caminho estilo jogo** e **check-in que rende pontos/badge** — a ponto de abrir o
app durante a viagem e voltar pra completar.

Se ninguém completa o caminho de uma cidade, nada mais (social, fotos, premium,
parceiros) importa.

## Jornada do usuário (closed beta)

1. Abre o app → **login** (Apple / Google / e-mail) → onboarding curto (nome,
   avatar opcional).
2. **Escolhe a cidade** (só 1 disponível no lançamento).
3. Vê o **caminho**: os spots ordenados a partir do aeroporto / centro.
4. Abre um **spot** → nome, uma frase de copy no tom do app, mini-mapa, botão de
   check-in.
5. **Check-in** com validação leve por GPS (precisa estar dentro do raio) →
   **pontos** + comemoração (confete + haptics + Lottie).
6. Completa todos os spots **obrigatórios** → **zera a cidade** → badge
   prata → **ouro** + comemoração especial.
7. Vê o **cartão de visita**: badges e stats básicas.

## Dentro do MVP

| # | Item | Notas |
| --- | --- | --- |
| 1 | **Auth + onboarding** | Supabase Auth: Apple, Google, e-mail. Onboarding: nome + avatar opcional. |
| 2 | **Lista de cidades** | 1 cidade no lançamento; a tela já suporta N. |
| 3 | **Home da cidade** | Progresso (x/y obrigatórios), estado da badge, CTA "abrir caminho". |
| 4 | **Tela do caminho — versão simples** | Cards ilustrados na vertical ligados por uma linha. Estados: travado / liberado / feito. **Não** é o caminho sinuoso ainda (isso é pós-beta). |
| 5 | **Detalhe do spot** | Nome, copy, mini-mapa (`react-native-maps`), botão de check-in, estado "chegue mais perto". |
| 6 | **Check-in com GPS** | Raio calculado no cliente (Haversine) + **validação server-side** (`ST_DWithin` no PostGIS via RPC `do_checkin`). Rende pontos. |
| 7 | **"Zerar" a cidade** | Todos os spots **obrigatórios** com check-in → badge prata→ouro. Opcionais contam pro progresso mas não travam o ouro. |
| 8 | **Cartão de visita** | Perfil próprio: badges (prata/ouro por cidade) + stats (nº cidades / spots / pontos). |

### Regras de gamificação no MVP

- Pontos por check-in (valor fixo por enquanto; peso do spot pode modular depois).
- Badge da cidade: **prata** no 1º check-in da cidade, **ouro** ao zerar.
- Sem níveis, streaks, ranking — pós-MVP.

## Fora do MVP (com destino)

| Item | Vai para |
| --- | --- |
| Upload de fotos no spot | **v1.1** |
| Fila offline de check-in (fazer check-in sem rede, sincronizar depois) | **v1.1** |
| Perfil público com URL / QR compartilhável | **v1.1** |
| Roteiros próprios (usuário cria/edita) | **v1.2** |
| Paywall premium (RevenueCat) + limite de 3 check-ins/dia no grátis | **v1.2** (junto com roteiros próprios) |
| Amigos, comparar roteiros, feed de fotos por POI | **v2** |
| Check-ins patrocinados / painel de parceiros | **v2** |
| Caminho sinuoso estilo Duolingo + monumentos 3D | trilha de **polish** (pós-beta) |
| Múltiplas cidades | pós-beta (curadoria contínua) |

## Arte no MVP

Packs de ilustração + geração por IA (mascote placeholder + ícones de monumento).
Arte própria / consistente entra depois. Ver `../CLAUDE.md` seção "Identificação
visual".

## Critérios de "pronto pra closed beta"

- [ ] Fluxo completo (login → zerar cidade → cartão de visita) **sem crash** em
      iOS e Android reais.
- [ ] 1 cidade curada com ~12–15 spots (coords conferidas, copy no tom).
- [ ] Funil instrumentado no PostHog: `sign_up` → `first_checkin` → `city_zerada`.
- [ ] Sentry com baseline crash-free aceitável.
- [ ] Política de privacidade publicada + labels de loja (localização, conta) —
      LGPD.
- [ ] Pré-prompt de permissão de localização antes do prompt nativo.
- [ ] Build no **TestFlight** e no **Play internal testing**.

## Não-metas do MVP (explícito)

- Antifraude pesada de GPS — validação é mínima, aceita imprecisão.
- Escala / performance sob carga.
- Qualquer coisa colaborativa ou social.
- Mais de uma cidade.
- Offline além de "mensagem clara quando não tem rede".
