# Fondatis (`@fondatis/design-system`)

Couche **UI/UX partagée** pour les applications HD Corporate (et futures apps du monorepo). Thème **épuré** (neutres froids), **surfaces translucides** (`fd-glass`, variantes `Card` / `Button` / champs), primitives **Radix** + icônes **Tabler**.

## Stack (versions volontairement alignées, stables)

| Dépendance | Version | Rôle |
|------------|---------|------|
| Tailwind CSS | **4.2.x** | Utilitaires + `@theme` (CSS-first). |
| `tw-animate-css` | **1.3.x** | Animations compatibles overlays. |
| Radix (dialog, menu, select, tabs, tooltip, etc.) | **1.x** | Accessibilité & comportement. |
| `@radix-ui/react-slot` | **1.2.x** | `Button` / `Breadcrumb` asChild. |
| **Tabler Icons** | `@tabler/icons-react` **3.34.x** | Icônes React. |
| `class-variance-authority` | **0.7.x** | Variants de composants. |
| React (peer) | **19.x** | Aligné sur Next 16 des apps. |
| Storybook | **8.6.x** + Vite **5.4.x** | Docs & playground. |

Les **apps** utilisent **Next 16.2.x** et **React 19** mêmes générations majeures pour limiter les écarts.

## CSS consommable par les apps

Importer **une fois** dans le CSS global de l’app (avant vos `@source` locaux) :

```css
@import '@fondatis/design-system/styles';

@source "./**/*.{tsx,ts}";
@source "../components/**/*.{tsx,ts}";
```

Puis ajouter vos tokens métier **après** cet import.

### Utilitaires translucides

- **`fd-glass`** / **`fd-glass-subtle`** / **`fd-glass-strong`** bordure légère, fond `card` semi-transparent, `backdrop-blur`.
- **`fd-glass-padding`** padding cohérent pour panneaux vitrés.
- **`fd-focus-ring`** anneau de focus aligné sur le thème.

## Composants exportés

Import depuis `@fondatis/design-system` :

| Zone | Composants |
|------|------------|
| Actions | `Button`, `Toggle`, `ToggleGroup`, `ToggleGroupItem` |
| Formulaires | `Input`, `Textarea`, `Label`, `Checkbox`, `Switch`, `Slider`, `Select` (+ sous-composants) |
| Conteneurs | `Card` (+ header/footer/title…), `Separator`, `ScrollArea`, `Tabs` |
| Données | `Table`, `Badge`, `Avatar`, `Progress`, `Skeleton` |
| Feedback | `Alert` |
| Navigation | `Breadcrumb` |
| Overlays | `Dialog`, `DropdownMenu`, `Popover`, `Tooltip` (+ `TooltipProvider`) |

Liste canonique et roadmap courte : **`FONDATIS_COMPONENTS`** / **`FONDATIS_PLANNED`** dans [`src/registry.ts`](src/registry.ts).

Exemple :

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@fondatis/design-system'
```

Les apps qui utilisent des **tooltips** doivent envelopper l’arbre avec **`TooltipProvider`** (déjà fait dans Storybook via `.storybook/preview.tsx`).

## Storybook

```bash
pnpm storybook
```

Build statique :

```bash
pnpm --filter @fondatis/design-system build-storybook
```

Sortie : `packages/fondatis/storybook-static` stories **Overview**, **Button**, **Card**.

## Développement du package

```bash
pnpm --filter @fondatis/design-system build
pnpm --filter @fondatis/design-system lint
```

Les composants utilisent des imports **`../../lib/utils`** (pas `@/`) pour que le **`dist/`** reste résolvable dans les apps Next.
