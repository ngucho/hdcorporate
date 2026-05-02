import type { Preview } from '@storybook/react'
import * as React from 'react'
import { TooltipProvider } from '../src/components/ui/tooltip'
import '../src/styles/fondatis.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'epure',
      values: [
        { name: 'epure', value: 'hsl(220 18% 96%)' },
        { name: 'dark', value: 'hsl(224 32% 7%)' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === 'dark'
      return (
        <TooltipProvider delayDuration={200}>
          <div
            className={isDark ? 'dark bg-background' : 'bg-background'}
            style={{ minHeight: '100vh', width: '100%', padding: '2rem' }}
          >
            <div className="text-foreground">
              <Story />
            </div>
          </div>
        </TooltipProvider>
      )
    },
  ],
  globalTypes: {
    theme: {
      description: 'Thème',
      defaultValue: 'light',
      toolbar: {
        title: 'Thème',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Clair' },
          { value: 'dark', title: 'Sombre' },
        ],
        dynamicTitle: true,
      },
    },
  },
}

export default preview
