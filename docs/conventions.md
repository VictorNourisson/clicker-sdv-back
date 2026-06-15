# Conventions

## Nommage des fichiers et classes

| Ce que c'est          | Fichier                              | Classe                        |
| --------------------- | ------------------------------------ | ----------------------------- |
| Cas d'usage           | `creer-ma-feature.ts`                | `CreerMaFeature`              |
| Entité domaine        | `ma-feature.ts`                      | `MaFeature`                   |
| Port repository       | `ma-feature.repository.ts`           | `MaFeatureRepository`         |
| Implémentation Prisma | `ma-feature-prisma.repository.ts`    | `MaFeaturePrismaRepository`   |
| Fake in-memory        | `ma-feature-in-memory.repository.ts` | `MaFeatureInMemoryRepository` |
| Contrôleur HTTP       | `ma-feature.controller.ts`           | `MaFeatureController`         |
| Mapper                | `ma-feature-http.mapper.ts`          | `MaFeatureHttpMapper`         |
| Exception             | `ma-feature.exception.ts`            | `EntiteIntrouvable`           |
| Config DI             | `di/config.ts`                       | —                             |
| Routes                | `ma-feature.route.ts`                | —                             |
| Test unitaire         | `creer-ma-feature.test.ts`           | —                             |
| Test intégration      | `ma-feature.integration.test.ts`     | —                             |

## Style de code

- Pas d'abréviations.
- Pas de commentaires. Si un commentaire semble nécessaire, c'est que le code n'est pas assez clair — le réécrire.
