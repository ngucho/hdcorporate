import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertDescription, AlertTitle } from '../src/components/ui/alert'
import { Badge } from '../src/components/ui/badge'
import { Button } from '../src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../src/components/ui/card'
import { Checkbox } from '../src/components/ui/checkbox'
import { Input } from '../src/components/ui/input'
import { Label } from '../src/components/ui/label'
import { Progress } from '../src/components/ui/progress'
import { Separator } from '../src/components/ui/separator'
import { Skeleton } from '../src/components/ui/skeleton'
import { Switch } from '../src/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../src/components/ui/tabs'
import { Textarea } from '../src/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '../src/components/ui/tooltip'
import { FONDATIS_COMPONENTS, FONDATIS_PLANNED } from '../src/registry'

const meta = {
  title: 'Fondatis/Overview',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Gallery: Story = {
  render: () => (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 py-4">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Fondatis</h1>
        <p className="text-sm text-muted-foreground">
          Couche UI partagée thème épuré, surfaces translucides, primitives Radix + Tabler.
        </p>
        <div className="flex flex-wrap gap-2">
          {FONDATIS_COMPONENTS.map((name) => (
            <Badge key={name} variant="secondary">
              {name}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Prévu ensuite : {FONDATIS_PLANNED.join(', ')}
        </p>
      </header>

      <section className="fd-glass fd-glass-padding rounded-2xl space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Utilitaire fd-glass</h2>
        <p className="text-sm text-muted-foreground">
          Combine bordure légère, fond card semi-transparent et blur. Utilisable seul ou via{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">Card variant=&quot;glass&quot;</code>.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <Card variant="glass">
          <CardHeader>
            <CardTitle>Formulaire</CardTitle>
            <CardDescription>Champs avec variantes glass.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="o-email">Email</Label>
              <Input id="o-email" type="email" placeholder="vous@exemple.com" variant="glass" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="o-msg">Message</Label>
              <Textarea id="o-msg" placeholder="..." variant="glass" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="o-cb" />
              <Label htmlFor="o-cb">Accepter</Label>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="o-sw">Notifications</Label>
              <Switch id="o-sw" />
            </div>
            <Separator />
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progression</span>
                <span>66%</span>
              </div>
              <Progress value={66} />
            </div>
            <div className="flex gap-2">
              <Button>Envoyer</Button>
              <Button variant="glass">Brouillon</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Alert variant="default">
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>Alerte translucide variante default.</AlertDescription>
          </Alert>

          <Tabs defaultValue="a">
            <TabsList>
              <TabsTrigger value="a">Onglet A</TabsTrigger>
              <TabsTrigger value="b">Onglet B</TabsTrigger>
            </TabsList>
            <TabsContent value="a" className="text-sm text-muted-foreground">
              Contenu A
            </TabsContent>
            <TabsContent value="b" className="text-sm text-muted-foreground">
              Contenu B
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  Survol
                </Button>
              </TooltipTrigger>
              <TooltipContent>Info-bulle translucide</TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  ),
}
