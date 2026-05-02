# Bootstrap clients et livraison (petite structure, budget limité)

Ce document complète la documentation technique : il propose une **revue business rapide** et un **cadre d’exécution** adaptés à une équipe indépendante avec peu de moyens (ex. ~100 € marketing) et une forte dépendance à l’**IA** et à la **technologie** pour tenir le rythme de livraison.

Il ne remplace pas une étude concurrentielle sectorielle détaillée ; calibrez les exemples sur votre segment réel (B2B corporate, conseil, services digitaux, etc.).

## 1. Positionnement face à la concurrence en ligne

Les acheteurs B2B comparent en général :

- **Agences généralistes** : large catalogue, process parfois opaques, délais variables.
- **Marketplaces / plateformes** : volume et prix, peu de continuité humaine.
- **Freelances** : flexibilité, risque de dispersion (outils, qualité, disponibilité).

**Angle différenciant réaliste** pour HD Corporate (aligné sur le produit actuel) :

- **Process clair** : prise de contact, réservation, FAQ — parcours déjà câblés sur le site.
- **Données structurées** : offres et créneaux portés par une base Postgres unique ; API HTTP dédiée (`api`) pour intégrations futures ou partenaires.
- **Backoffice interne** : traitement des leads et clients sur un domaine séparé (`insite`), avec auth maîtrisée (Auth0 + liste d’emails autorisés).
- **Cohérence long terme** : design system **Fondatis** pour accélérer les prochains écrans sans refonte permanente.

Évitez de promettre “l’IA magique” côté client ; misez sur **fiabilité, délais, transparence** et sur ce que le stack permet déjà (suivi, API, réservation).

## 2. Validation client à faible coût (2 à 4 semaines)

1. **10 à 15 entretiens** ciblés (profil + secteur + douleur précise), 20–30 minutes, sans vente agressive : comprendre budget, critère de décision, concurrents habituels.
2. **Une offre pilote** limitée (périmètre, durée, prix fixe) pour livrer un premier cas d’usage mesurable.
3. **Mesurer le tunnel existant** : formulaires contact / leads / réservation — taux de complétion, temps de réponse interne, raisons d’abandon (analytics simple + retours qualitatifs).
4. **Itérer une seule chose à la fois** (ex. clarifier l’accroche hero, ou simplifier une étape de booking), puis rejouer la mesure.

L’objectif n’est pas le trafic maximal au début, mais **la preuve** que quelqu’un paie et recommande.

## 3. Budget marketing ~100 €

Principe : **un canal principal**, pas cinq.

- **Contenu SEO de base** : pages services alignées sur ce que vous vendez réellement (et sur le contenu de la base / du site) ; FAQ honnête ; pas de pages vides.
- **Ciblage payant très restreint** : soit une petite campagne **Google Ads** sur 3–5 requêtes très intentionnelles, soit **LinkedIn** avec budget plafonné et ciblage étroit (rôle + taille d’entreprise + zone géo).
- **Relais organiques** : témoignage d’un premier client, post structuré (problème → approche → résultat), participation ciblée à des communautés (sans spam).

Réinvestissez dès que le **CAC** (coût d’acquisition) est inférieur à la marge du contrat pilote.

## 4. Livraison avec l’IA sans dégrader la qualité perçue

**En interne (recommandé)** :

- Rédaction de **specs**, emails de suivi, synthèses de réunions, check-lists de livraison.
- **Prototypes** ou maquettes textuelles avant développement ; revue humaine systématique.
- Assistance au **code** (refactors, tests, documentation) — toujours avec revue et tests sur le monorepo (`pnpm build`, `pnpm lint`).

**Côté client** :

- Livrables **signés par un humain** (méthodo, recette, garanties).
- L’IA comme **accélérateur**, pas comme argument commercial principal, sauf si votre offre est explicitement “IA + garde-fous”.

## 5. Système durable pour les prospects et clients existants

Investissez dans ce qui réduit le coût marginal d’un nouveau client ou d’un renouvellement :

| Levier | Rôle |
|--------|------|
| **API publique** (`apps/api`) | Intégrations, partenaires, automatisations sans toucher au front marketing. |
| **Contrats partagés** (`@hd-corporate/contracts`) | Moins d’écarts entre front et API ; évolutions plus sûres. |
| **Fondatis** | Nouvelles apps ou écrans plus vite, image de marque cohérente. |
| **Redis / rate limit** | Protection des formulaires publics contre abus et pics de charge. |
| **Documentation setup** ([`docs/setup/`](../setup/README.md)) | Onboarding rapide des collabs ou d’un prestataire — moins de temps perdu sur les secrets et domaines. |

**Dette consciente** : le marketing conserve encore du UI “shadcn local” pour l’instant ; migrer progressivement vers Fondatis réduit la double maintenance.

## 6. Synthèse exécutable

1. Verrouiller **l’offre pilote** et le **client idéal** en une phrase.
2. Utiliser le site + API + backoffice comme **démo vivante** du sérieux opérationnel.
3. Dépenser le budget marketing sur **une** tactique mesurable + SEO minimal crédible.
4. Industrialiser la livraison avec **specs + IA interne + revue humaine** et garder le monorepo **vert** (build/lint) à chaque livraison significative.

Quand vous aurez besoin d’un **benchmark concurrentiel nominatif** (acteurs, prix publics, messages), prévoyez une passe de recherche dédiée (secteur + pays) en complément de ce document.
