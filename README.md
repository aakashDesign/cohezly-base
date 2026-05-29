# cohezly-base

A tiny sandbox for learning to build your own design system on top of [Base UI](https://base-ui.com) — same idea as `shadcn/ui` on Radix. Components live as source in this repo. You own them, edit them, delete them.

The goal is **learning**, not shipping. Read the code, change one thing, see what breaks. Repeat.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # tsc --noEmit, strict mode
npm run format     # prettier
```

## Where to look first

Read these in this order. Each one teaches one concept.

1. **`src/styles/tokens/`** — design tokens as CSS custom properties, organized in three tiers (plus a flat `scales.css` for spacing/radius/type). Read them in order, each file only references the one above it:
   - **`primitives.css`** — raw palette. `--gray-700`, `--brand-500`. Theme-agnostic. Components must never touch these.
   - **`semantic.css`** — role tokens. `--color-content-neutral-default`, `--color-background-page`. Each value is a `var(--<primitive>)`. The `[data-theme='dark']` block lives here, and *only* here — change the mapping, not the consumers.
   - **`components.css`** — component-scoped aliases. `--button-bg-primary`, `--input-border`. Each resolves to a semantic token. Component CSS references these.
   - **`scales.css`** — spacing, radius, type. Single tier on purpose: not every category earns three.

   Try changing one mapping in `semantic.css` (e.g., point `--color-background-page` at `--gray-100`). The whole UI updates; no consumer changed. That's the lesson.

2. **`src/components/ui/button.tsx`** — the simplest component. ~25 lines. Notice:
   - `forwardRef` so consumers can grab the DOM node
   - `variant` and `size` as TypeScript unions, not strings
   - Internal `data-variant` / `data-size` attributes — *not* conditional class names
   - `...props` spread *after* internal props so consumers can override

3. **`src/components/ui/button.css`** — the styling counterpart. Notice the selector pattern `.ui-button[data-variant='primary']`. This is the Base UI idiom. It composes for free with Base UI's own state attributes (`[data-disabled]`, `[data-focused]`).

4. **`src/components/ui/input.tsx`** — where Base UI actually pulls its weight. `Field.Root` wires up label/control/error associations and ARIA. You write the wrapper API; Base UI handles accessibility. Notice `error` is just a prop on our wrapper — it sets `invalid` on `Field.Root`, which propagates `data-invalid` for the CSS to target.

5. **`src/App.tsx`** — the demo. Theme toggle is literally `document.documentElement.dataset.theme = 'dark'`. No context, no provider.

## Project layout

```
src/
├── main.tsx                # React entry — imports tokens + reset CSS once
├── App.tsx                 # Demo page
├── app.css                 # Demo-only styles (not part of the design system)
├── lib/
│   └── cn.ts               # 3-line className joiner
├── styles/
│   ├── tokens/
│   │   ├── primitives.css  # Tier 1 — raw palette
│   │   ├── semantic.css    # Tier 2 — role tokens + theme switch
│   │   ├── components.css  # Tier 3 — component-scoped aliases
│   │   └── scales.css      # Spacing, radius, typography (flat)
│   └── reset.css           # Minimal CSS reset
└── components/ui/          # Your design system lives here
    ├── button.tsx
    ├── button.css
    ├── input.tsx
    └── input.css
```

`.tsx` and `.css` are colocated per component on purpose: each component is a self-contained unit you can read, copy, or delete without hunting across folders.

## Where to start experimenting

Pick **one** of these. Don't do them all at once — the point is to feel each pattern.

- **Add a `destructive` variant to Button.** Edit the `Variant` union in `button.tsx`, add a `[data-variant='destructive']` block to `button.css`. ~3 minutes. Confirms you understand the data-attribute pattern.
- **Change the accent color.** Edit one line in `tokens.css`. Everything that uses `var(--color-accent)` updates everywhere, including dark mode. This is the lesson tokens exist to teach.
- **Add a Card component.** Pure layout — no Base UI primitive needed. Make it `<Card>`, `<CardHeader>`, `<CardBody>`, `<CardFooter>`. Use the existing tokens (`--space-*`, `--radius-md`, `--color-border`). The shape: copy `button.tsx` as a template, replace `<button>` with `<div>`.
- **Make the Input validate on blur instead of submit.** Read `Field.Root`'s `validationMode` prop in `node_modules/@base-ui-components/react/field/root/FieldRoot.d.ts`. Pass `validationMode="onBlur"` and a `validate` function. This is where Base UI starts feeling powerful.

When stuck, read the `.d.ts` file next to whatever component you're using. Base UI's source-of-truth is its types, not its docs.

## What to ignore (for now)

- **`node_modules/`** — except when you want to read a `.d.ts` to figure out a Base UI API. That's a legitimate research move, not cheating.
- **`dist/`** — only exists after `npm run build`. You won't need it for learning.
- **`.prettierrc`, `.gitignore`, `tsconfig.json`, `vite.config.ts`** — tuned once, leave alone. If TypeScript yells at you about something pedantic (`noUncheckedIndexedAccess`), that's the point — read the error, don't loosen the config.
- **`app.css`** — demo-only, not part of the design system. Don't mistake patterns here for component-library patterns.

## The rules this codebase follows

These are the patterns to internalize. When you add a component, follow these:

1. **`forwardRef` on every component.** Refs are how parents reach the DOM.
2. **Spread `...props` last** so consumers can override anything (`className`, `aria-*`, event handlers).
3. **Merge `className`** with `cn()` instead of replacing it.
4. **Variants as `data-*` attributes**, not conditional class names. CSS targets them; types describe them.
5. **TypeScript unions over strings.** `'primary' | 'secondary' | 'ghost'`, not `string`.
6. **Tokens, never hex values.** If you find yourself writing `#0a0a0a` in a component's CSS, it belongs in `tokens/`. And components reference **tier 3 (component) or tier 2 (semantic)** — never tier 1 primitives directly.
7. **No barrel `index.ts`.** Import directly from `./components/ui/button`. Barrels hurt tree-shaking and add a layer to maintain.

When you break one of these, ask yourself *why* the rule exists. That's where the learning is.

## When it grows

When Button + Input feel obvious, the natural next components are:

- **Card** — pure layout, no Base UI primitive. Reinforces the composition pattern.
- **Checkbox** / **Switch** — `Checkbox.Root` / `Switch.Root` from Base UI. First taste of state-driven components.
- **Dialog** — `Dialog.Root` / `Dialog.Backdrop` / `Dialog.Popup`. This is where Base UI really earns its keep (focus trap, scroll lock, escape handling).

Each one teaches a new Base UI primitive. Add them one at a time.

## Notes

- **Base UI package name.** This repo uses `@base-ui-components/react`. The package is mid-rename to `@base-ui/react` — npm shows a deprecation warning on install. The old name still works; switch when the rc → stable transition happens.
- **React 18.** Uses `forwardRef`. React 19 deprecates it (refs become regular props), but the patterns here translate cleanly when you upgrade.
- **Strict mode is on.** Both `<StrictMode>` (React) and `strict: true` (TypeScript), plus `noUncheckedIndexedAccess` and `noUnusedLocals`. This is on purpose. Loosening these to "make the error go away" is the opposite of what you want.
