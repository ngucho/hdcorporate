/**
 * Registre des primitives Fondatis — référence unique pour couverture et évolutions.
 * Les exports publics restent dans `index.ts` ; ce fichier documente l’intention produit.
 */
export const FONDATIS_COMPONENTS = [
  'Alert',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Card',
  'Checkbox',
  'Dialog',
  'DropdownMenu',
  'Input',
  'Label',
  'Popover',
  'Progress',
  'ScrollArea',
  'Select',
  'Separator',
  'Skeleton',
  'Slider',
  'Switch',
  'Table',
  'Tabs',
  'Textarea',
  'Toggle',
  'ToggleGroup',
  'Tooltip',
] as const

export type FondatisComponentName = (typeof FONDATIS_COMPONENTS)[number]

/** Prévu : NavigationMenu, Command, Calendar, Accordion, Sheet, Drawer, Resizable — à brancher selon besoins apps. */
export const FONDATIS_PLANNED = ['NavigationMenu', 'Command', 'Calendar', 'Accordion', 'Sheet', 'Drawer'] as const
