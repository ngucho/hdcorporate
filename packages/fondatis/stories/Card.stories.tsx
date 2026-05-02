import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../src/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../src/components/ui/card'

const meta = {
  title: 'Fondatis/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Carte exemple</CardTitle>
        <CardDescription>Design system Fondatis palette épurée.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Contenu principal.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Action</Button>
        <Button size="sm" variant="outline">
          Fermer
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const Glass: Story = {
  render: () => (
    <Card variant="glass" className="w-[400px]">
      <CardHeader>
        <CardTitle>Surface vitrée</CardTitle>
        <CardDescription>Variante `glass` blur + bordure légère.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Idéal pour panneaux flottants et headers.</p>
      </CardContent>
      <CardFooter>
        <Button variant="glass" size="sm">
          Action
        </Button>
      </CardFooter>
    </Card>
  ),
}

export const CompareVariants: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card variant="solid">
        <CardHeader>
          <CardTitle className="text-base">solid</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Fond opaque classique.</CardContent>
      </Card>
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">glass</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Translucide + backdrop-blur.</CardContent>
      </Card>
      <Card variant="outline">
        <CardHeader>
          <CardTitle className="text-base">outline</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Contour en pointillés.</CardContent>
      </Card>
      <Card variant="ghost">
        <CardHeader>
          <CardTitle className="text-base">ghost</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Sans surface.</CardContent>
      </Card>
    </div>
  ),
}
