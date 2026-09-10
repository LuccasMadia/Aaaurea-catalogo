# Efeitos de entrada com GSAP (ar premium)

**Data:** 2026-09-10
**Status:** Aprovado para planejamento de implementação

## Contexto

O site "Áurea" (peça de portfólio, ver `2026-09-09-landing-page-aurea-design.md`)
está com o conteúdo e o catálogo prontos, mas sem nenhuma animação — todas as
seções aparecem estáticas ao carregar/rolar a página. O objetivo aqui é dar um
ar mais premium usando GSAP: efeitos simples e sutis de entrada (fade + slide)
conforme o usuário rola a página, sem mudar cores, tipografia ou layout.

## Escopo

### Incluído
- Instalar `gsap` como dependency do projeto.
- Criar um componente reutilizável `components/Reveal.tsx` ("use client") que:
  - Embrulha qualquer conteúdo filho.
  - Anima `opacity` (0→1) e `translateY` (24px→0) usando GSAP.
  - Dispara a animação via `ScrollTrigger` quando o elemento entra ~85% da
    viewport, uma única vez (`once: true` — não repete ao rolar pra cima e
    descer de novo).
  - Aceita um prop opcional `delay` (segundos) para permitir stagger manual
    entre itens de uma lista (aplicado pelo componente pai, passando um delay
    incremental por índice).
  - Respeita `prefers-reduced-motion`: se ativo, renderiza o conteúdo direto,
    sem animação.
  - Usa `gsap.context()` escopado ao elemento e limpa tudo (`ctx.revert()`) no
    unmount, evitando triggers duplicados em fast refresh do Next.
- Aplicar `<Reveal>` nos seguintes pontos:
  - `Hero.tsx` — bloco de texto + imagem (dispara quase imediato, já está no
    topo da página).
  - `AboutSection.tsx` — bloco único.
  - `CatalogSection.tsx` — título/filtro como bloco único.
  - `ProductGrid.tsx` — cada `ProductCard` embrulhado individualmente com
    `delay={index * 0.08}`, criando efeito de stagger na grade.
  - `ValuesSection.tsx` — cada item de valor com o mesmo esquema de stagger.
  - `Footer.tsx` — bloco único.
  - `app/produto/[slug]/page.tsx` — galeria e painel de compra, cada um como
    bloco separado.

### Fora de escopo
- Parallax, animações de scale/rotate ou qualquer efeito além de fade+slide.
- Animação no `Header.tsx` (fica sticky e sempre visível, sem necessidade de
  reveal).
- Animações em interações (hover, clique) — só entrada por scroll.
- Testes automatizados para as animações.

## Arquitetura

Um único componente de apresentação (`Reveal`) concentra toda a lógica de
GSAP/ScrollTrigger, em vez de espalhar `useEffect` com GSAP em cada seção.
Os componentes de conteúdo (Hero, AboutSection, etc.) apenas embrulham seu
JSX existente com `<Reveal>` — nenhuma mudança na estrutura visual interna
deles.

```
<Reveal delay?: number>
  {children}
</Reveal>
```

- `ScrollTrigger` é registrado uma única vez (guard `typeof window !== "undefined"`)
  dentro do próprio `Reveal.tsx`.
- Cada instância de `Reveal` cria seu próprio `gsap.context()` escopado à sua
  `ref`, então múltiplas instâncias na página não interferem entre si.

## Testes / Verificação

Sem testes automatizados (fora de escopo, consistente com o resto do projeto).
Verificação manual após implementação:
1. `npm run dev`, abrir a home no navegador.
2. Rolar a página observando fade+slide em cada seção e o stagger nos cards
   de produto e nos itens de valores.
3. Abrir a página de um produto e confirmar o mesmo efeito na galeria e no
   painel de compra.
4. Checar o console do navegador por erros do GSAP/ScrollTrigger.
5. Ativar "reduzir animação" (DevTools → Rendering → Emulate CSS
   prefers-reduced-motion: reduce) e confirmar que os elementos aparecem
   direto, sem animação.
