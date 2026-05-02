# Cal.com (cloud) réservation publique

Le marketing affiche **uniquement** l’embed Cal.com. L’API reçoit les **webhooks** pour synchroniser la table `bookings` (backoffice) et envoie les **emails via Resend** (confirmation, replanification, annulation).

## 1. Compte et événement

1. Compte sur [cal.com](https://cal.com).
2. **Google Calendar** + **Google Meet** sur le type d’événement.
3. Noter le lien public `https://cal.com/<username>/<slug>` → utiliser **`username/slug`** dans `NEXT_PUBLIC_CALCOM_CAL_LINK`.

### Affichage des créneaux (jour sélectionné + grille)

L’iframe Cal.com **pilote l’UI** (mois, semaine, colonnes, grille des horaires). Le site ne peut pas reprogrammer l’intérieur de l’iframe pour n’afficher « que ce jour » : cela se règle **dans Cal.com** sur le type d’événement.

1. **Event type** concerné → onglets **Availability** / **Limits** (libellés selon version) : durée du rendez-vous, **intervalle des créneaux** (ex. 30 min), buffers — cela regroupe les heures affichées pour le jour choisi.
2. **Appearance** / **Booking questions** (ou **Advanced**) : disposition du booker (**Column** / côte à côte calendrier + créneaux) alignée avec l’embed marketing qui envoie déjà `layout: column_view` (`column_view` côté SDK).
3. Après sélection d’une date, le panneau de créneaux est piloté par Cal : en **grande largeur**, le booker peut afficher **deux jours côte à côte** (deux colonnes). L’embed marketing borne la largeur du widget (**`max-w` ~720px**, centré) et **supprime les `min-width` agressifs** pour limiter ce cas. Si tu vois encore deux jours, baisse la valeur dans `calcom-embed.tsx` ou teste **`month_view`** à la place de `column_view`.

Si le rendu ne suffit pas, la voie officielle est d’ouvrir une **demande de fonctionnalité** côté Cal.com ou d’utiliser leur **Booker** programmatique (atoms) dans un autre front, hors embed script actuel.

## 2. Webhook (HTTPS obligatoire sur Cal SaaS)

1. Cal.com → **Settings → Developer → Webhooks**.
2. **Subscriber URL** : `https://<votre-api>/api/webhooks/calcom`.
3. Triggers : **Booking Created**, **Booking Rescheduled**, **Booking Cancelled**.
4. Copier le secret dans **`CALCOM_WEBHOOK_SECRET`**.

**Local** : tunnel HTTPS (ngrok, Cloudflare Tunnel, …) vers le port de l’API Cal SaaS refuse `localhost` en URL de webhook.

## 3. Variables d’environnement

| Où | Variable | Rôle |
|----|-----------|------|
| **Marketing** | `NEXT_PUBLIC_CALCOM_CAL_LINK` | `username/slug` pour l’embed |
| **API** | `CALCOM_WEBHOOK_SECRET` | Vérification HMAC des webhooks |
| **API** | `RESEND_API_KEY` | Envoi des mails |
| **API** | `RESEND_FROM` | Expéditeur (domaine vérifié chez Resend) |
| **API** (optionnel) | `CALCOM_BOOKING_TIMEZONE` | Défaut `Europe/Paris` pour date/heure en base |

## 4. Migrations base de données

À la racine du monorepo `SI` :

```bash
pnpm db:migrate
```

Les migrations `0001_calcom_bookings` et `0002_drop_slot_blocks` concernent les réservations Cal.com et la suppression de l’ancienne table de blocage de créneaux.

## 5. Emails

Les confirmations (avec pièce jointe **.ics** quand c’est pertinent) partent par **Resend** depuis l’API après traitement du webhook. Cal.com envoie aussi ses propres mails côté calendrier ; tu peux ajuster les modèles dans Cal pour limiter le double discours si besoin.
