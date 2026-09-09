# Landing Page "Áurea" — Peça de Portfólio

**Data:** 2026-09-09
**Status:** Aprovado para planejamento de implementação

## Contexto

Peça de portfólio inspirada na loja `@aaaurea_` (Instagram) — moda cristã/modesta,
conceito "over" (camisetas e peças oversized), tagline "Vestindo Identidade e
Propósito". Objetivo: demonstrar, para futuros clientes de nicho similar, como
seria um protótipo funcional de Fase 1 (padrão Next.js + Supabase que o Lucca
usa com clientes reais), mas sem backend real neste caso — é uma vitrine de
front-end e produto.

Não é um projeto para um cliente pagante. Não há admin panel nem persistência
de dados: os produtos são estáticos no código.

## Escopo — Fase 1 (única fase deste protótipo)

### Módulos incluídos
1. **Home / Landing** com seções: Hero, Sobre/Propósito, Coleção em destaque
   (catálogo com filtro por categoria), Valores/prova social, CTA final + Footer.
2. **Página de produto** (`/produto/[slug]`): galeria, nome, preço, descrição,
   seletor de tamanho (visual, sem controle de estoque), botão de pedido via
   WhatsApp.
3. **Pedido via WhatsApp**: botão que monta mensagem pré-formatada
   (`"Olá! Tenho interesse na [Produto], tamanho [P/M/G]"`) e abre `wa.me`.

### Explicitamente fora de escopo
- Carrinho de compras e checkout/pagamento online.
- Painel administrativo para gerenciar produtos.
- Autenticação de usuário.
- Backend/banco de dados (Supabase) — fica como direção futura, não implementada.
- Testes automatizados.

## Estética visual

**Direção escolhida: Editorial dourado-terroso.**

- Fundo creme/off-white (`#F5F0E8` como referência).
- Título: tipografia serifada elegante, tom preto/marrom escuro.
- Corpo: sans-serif limpa, cinza-quente.
- Acentos: dourado suave (`#C9A961`) e terracota.
- Mood: revista de moda com luz suave — sofisticado e espiritual sem ser piegas.
- Fotografia grande, estilo editorial, muito espaço em branco.
- Mobile-first (público de moda navega majoritariamente pelo celular/Instagram).

Refinamento de tokens (paleta completa, tipografia, espaçamento) é trabalho da
skill de frontend-design na fase de implementação, não desta spec.

## Arquitetura técnica

- **Next.js 14+ (App Router) + TypeScript + Tailwind CSS.**
- **Dados estáticos**: `data/products.ts` — array de produtos (nome, preço,
  categoria, imagens, descrição, slug, tamanhos disponíveis).
- **Imagens**: placeholders de moda royalty-free (streetwear/oversized modesto),
  com comentário no código indicando onde trocar por fotos reais do cliente.
- Sem API routes, sem chamadas externas em runtime além de imagens.

## Estrutura de componentes

- `Header` / `Nav`
- `Hero`
- `AboutSection` (Sobre/Propósito)
- `ProductGrid` + `ProductCard`
- `CategoryFilter`
- `ValuesSection` (pilares da marca)
- `WhatsAppButton` (reutilizado no card e na página de produto)
- `Footer` (Instagram, WhatsApp, "Envio pra todo o Brasil 🇧🇷")
- Página de produto usa `ProductGallery` + `SizeSelector`

## Tratamento de erros e qualidade

- Slug de produto inexistente → 404 padrão do Next.js.
- Imagem ausente/quebrada → fallback visual consistente com a paleta (não ícone
  quebrado do navegador).
- Responsivo mobile-first, testado em pelo menos 3 breakpoints (mobile/tablet/desktop).
- Contraste dourado-sobre-creme verificado para legibilidade (acessibilidade básica).

## Validação

- Sem suíte de testes automatizados (fora de escopo, peça de portfólio).
- Validação manual: rodar o dev server, navegar pela home e por uma página de
  produto no navegador, conferir responsividade e o fluxo de WhatsApp antes de
  considerar a tarefa concluída.

## Próximos passos

1. Plano de implementação (skill `writing-plans`).
2. Direção visual fina + implementação (skill `frontend-design` na fase de
   implementação).
