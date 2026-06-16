import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clicker SDV API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      "/auth/inscription": {
        post: {
          tags: ["Authentification"],
          summary: "Créer un compte",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["username", "email", "password"],
                  properties: {
                    username: { type: "string", example: "victor" },
                    email: { type: "string", example: "victor@exemple.com" },
                    password: { type: "string", example: "monMotDePasse123" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Compte créé avec succès" },
            409: { description: "Utilisateur déjà existant" },
          },
        },
      },
      "/auth/connexion": {
        post: {
          tags: ["Authentification"],
          summary: "Se connecter",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", example: "victor@exemple.com" },
                    password: { type: "string", example: "monMotDePasse123" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Connexion réussie",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      token: { type: "string" },
                      userId: { type: "string" },
                      username: { type: "string" },
                    },
                  },
                },
              },
            },
            401: { description: "Identifiants invalides" },
          },
        },
      },
      "/session": {
        post: {
          tags: ["Session de jeu"],
          summary: "Créer une session de jeu",
          security: [{ bearerAuth: [] }],
          responses: {
            201: { description: "Session créée" },
            401: { description: "Token manquant ou invalide" },
            409: { description: "Session déjà existante" },
          },
        },
        get: {
          tags: ["Session de jeu"],
          summary: "Récupérer l'état de la session",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "État de la session",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      utilisateurId: { type: "string" },
                      cookiesTotal: { type: "string", example: "0" },
                      cookiesPerSecond: { type: "string", example: "0" },
                      cookiesPerClick: { type: "string", example: "1" },
                      prestigeLevel: { type: "integer", example: 0 },
                      derniereSauvegarde: { type: "string", format: "date-time" },
                      createdAt: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
            401: { description: "Token manquant ou invalide" },
            404: { description: "Session introuvable" },
          },
        },
        put: {
          tags: ["Session de jeu"],
          summary: "Sauvegarder l'état de la session",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["cookiesTotal", "cookiesPerSecond", "cookiesPerClick"],
                  properties: {
                    cookiesTotal: { type: "string", example: "1500" },
                    cookiesPerSecond: { type: "string", example: "10" },
                    cookiesPerClick: { type: "string", example: "1" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Session sauvegardée" },
            401: { description: "Token manquant ou invalide" },
            404: { description: "Session introuvable" },
          },
        },
      },
      "/session/prestige": {
        post: {
          tags: ["Session de jeu"],
          summary: "Appliquer le prestige (reset + niveau +1)",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Prestige appliqué" },
            401: { description: "Token manquant ou invalide" },
            404: { description: "Session introuvable" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
