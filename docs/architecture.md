# Architecture

Le projet suit l'**architecture hexagonale**. Chaque feature est isolée dans `src/core/features/[nom-feature]/` avec trois couches :

```
src/core/features/ma-feature/
├── domain/          ← entités, value objects, services domaine, exceptions
├── application/     ← cas d'usage + ports (interfaces)
│   └── ports/
└── infrastructure/  ← contrôleurs HTTP, repositories Prisma, fakes in-memory
```

## Structure des dossiers

```
clash-of-waf/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── services/
└── backend/
    └── src/
        ├── core/
        │   └── features/
        │       └── [nom-feature]/
        │           ├── domain/
        │           ├── application/
        │           │   └── ports/
        │           └── infrastructure/
        ├── shared/        ← AppException, utilitaires communs
        └── index.ts
```

## Règles

**Dépendances**
- Le domaine ne dépend de rien : pas de Prisma, pas d'Express, pas de Zod.
- Les cas d'usage orchestrent — la logique métier vit dans le domaine.
- `application/` n'importe jamais depuis `infrastructure/`.

**Erreurs**
- Les exceptions métier étendent `AppException` et déclarent `readonly statusCode`.
- Aucun `try/catch` dans les contrôleurs — le middleware centralisé gère tout.

**Tests**
- Pas de `jest.mock()`. On utilise des fakes in-memory qui implémentent les ports.
