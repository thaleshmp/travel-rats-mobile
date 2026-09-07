# Roadmap e prazo

Premissas: dev **solo**, **~8h/semana** (≈ 30h/mês efetivas, contando com a vida
acontecendo), experiência **intermediária** em React Native/Expo + Supabase.
Escopo do MVP: `mvp.md`. Backlog detalhado: `backlog-inicial.md`.

## Fases

| Fase | Conteúdo | Estimativa (dev) | Calendário |
| --- | --- | --- | --- |
| **MVP** | Loop central + caminho (versão simples), 1 cidade. Ver `mvp.md`. | ~180–260h + curadoria | **7–9 meses** → closed beta |
| **v1.1** | Fotos no spot; fila offline de check-in; perfil público (URL/QR). | ~60–90h | +2–3 meses |
| **v1.2** | Roteiros próprios (editor); paywall RevenueCat + limite de 3 check-ins/dia no grátis. | ~90–130h | +3–4 meses |
| **v2** | Amigos, comparar roteiros, feed de fotos por POI; caminho sinuoso 2D; parceiros / check-ins patrocinados; monumentos 3D. | grande | a definir |

> As faixas são grosseiras e vão calibrar depois dos primeiros épicos (E0–E1),
> quando der pra medir a velocidade real.

## Ordem dos épicos do MVP

```
E0 Fundação ──> E1 Design system ──> E2 Auth ──┐
                                               ├──> E4 Navegação ──> E5 Check-in + gamificação ──> E6 Cartão ──> E7 Pré-lançamento
E3 Dados de cidade/roteiro (backend) ───────────┘
E8 Curadoria ── trilha paralela, começa a qualquer momento, só precisa estar pronta pra E7
```

- **E3** pode andar em paralelo a **E1/E2** (é quase só backend).
- **E8 (curadoria)** não bloqueia o começo: usar seed manual/fake da 1ª cidade em
  **E3** e trocar pelo resultado da curadoria antes da beta.

## Riscos e mitigação

| Risco | Mitigação |
| --- | --- |
| **Tela do caminho** consome mais do que o previsto (UI custom) | Versão simples primeiro (cards + linha). Caminho sinuoso só pós-beta. Timebox: se passar de ~20h, entrega a simples e segue. |
| **Check-in + gamificação** é o coração e tem lógica no servidor (RPC + PostGIS + RLS) | Fazer cedo (E5, não no fim). Escrever teste de política (pgTAP) junto. |
| **Pipeline de build** (EAS, assinaturas, TestFlight) trava perto do lançamento | De-riscar no **E0**: subir um "hello world" no TestFlight antes de qualquer feature. |
| **8h/semana** viram 3h em semana ruim → projeto perde ritmo | Cycles curtos no Linear, WIP=1, escopo do MVP congelado (ideias vão pra Triage). |
| **Premium sem conteúdo premium** | Paywall só na v1.2, junto com roteiros próprios — não antes. |
| **Arte** vira gargalo | MVP com packs + IA; decisão de arte própria adiada, não no caminho crítico. |

## Marcos visíveis (pra não perder motivação)

1. **"Hello world" no TestFlight** (fim do E0) — o pipeline inteiro funciona.
2. **Login + navegar até um spot** (fim do E4).
3. **Primeiro check-in real na rua** (fim do E5) — a hipótese central roda.
4. **Zerar a cidade de ponta a ponta** (fim do E6).
5. **Closed beta** com ~10–20 pessoas (fim do E7).
