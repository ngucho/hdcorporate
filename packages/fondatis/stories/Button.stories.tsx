import type { Meta, StoryObj } from '@storybook/react'
import { IconBrandTabler } from '@tabler/icons-react'
import { Button } from '../src/components/ui/button'

const meta = {
  title: 'Fondatis/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Continuer',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Annuler',
  },
}

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: 'Action translucide',
  },
}

export const Soft: Story = {
  args: {
    variant: 'soft',
    children: 'Accent léger',
  },
}

export const WithTablerIcon: Story = {
  args: {
    children: (
      <>
        <IconBrandTabler aria-hidden />
        Icône Tabler
      </>
    ),
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>default</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="outline">outline</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="glass">glass</Button>
      <Button variant="soft">soft</Button>
      <Button variant="destructive">destructive</Button>
    </div>
  ),
}
