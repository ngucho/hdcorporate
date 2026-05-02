-- Run after migrations (Supabase SQL editor or psql). Uses ON CONFLICT for slug.

insert into services (slug, title, price, badge, delay, category, features, sort_order, published)
values
  (
    'creation-france',
    'Pack Création France',
    '299€',
    'Le plus populaire',
    '7-10 jours ouvrés',
    'creation',
    '["SAS / SASU / EURL","Statuts sur-mesure","Immatriculation INPI","Annonce légale incluse","30 min conseil offerts"]'::jsonb,
    1,
    true
  ),
  (
    'llc-delaware',
    'LLC Delaware',
    '599€',
    'International',
    '3-4 semaines',
    'international',
    '["Certificate of Formation","EIN (Tax ID américain)","Registered Agent 1 an","Compte bancaire US (Relay/Mercury)","Accompagnement Stripe"]'::jsonb,
    2,
    true
  ),
  (
    'secretariat-annuel',
    'Secrétariat Annuel',
    '49€/mois',
    null,
    null,
    'secretariat',
    '["PV d''assemblées","Approbation des comptes","Suivi obligations légales","Tableau de bord digital"]'::jsonb,
    3,
    true
  ),
  (
    'corporate-ma',
    'Corporate & M&A',
    'Sur devis',
    null,
    null,
    'corporate',
    '["NDA · LOI · SPA","Pactes d''associés","Due Diligence juridique","Garantie d''actif et passif"]'::jsonb,
    4,
    true
  )
on conflict (slug) do nothing;
