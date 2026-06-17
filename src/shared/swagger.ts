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
      "/auth/deconnexion": {
        post: {
          tags: ["Authentification"],
          summary: "Se déconnecter (efface le cookie)",
          responses: {
            200: { description: "Déconnecté" },
          },
        },
      },
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
              description: "Connexion réussie (token posé en cookie HttpOnly)",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
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
                      supsTotal: { type: "string", example: "0" },
                      supsPerSecond: { type: "string", example: "0" },
                      supsPerClick: { type: "string", example: "1" },
                      supsMonney: { type: "integer", example: 0 },
                      prestigeLevel: { type: "integer", example: 0 },
                      derniereSauvegarde: {
                        type: "string",
                        format: "date-time",
                      },
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
                  required: [
                    "supsTotal",
                    "supsPerSecond",
                    "supsPerClick",
                    "supsMonney",
                  ],
                  properties: {
                    supsTotal: { type: "string", example: "1500" },
                    supsPerSecond: { type: "string", example: "10" },
                    supsPerClick: { type: "string", example: "1" },
                    supsMonney: { type: "integer", example: 0 },
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
      "/session/classement": {
        get: {
          tags: ["Session de jeu"],
          summary: "Récupérer le classement général (top 10 + mon rang)",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Classement général",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      top10: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            rang: { type: "integer", example: 1 },
                            username: { type: "string", example: "victor" },
                            supsTotal: { type: "string", example: "999999" },
                          },
                        },
                      },
                      monRang: {
                        nullable: true,
                        type: "object",
                        properties: {
                          rang: { type: "integer", example: 42 },
                          username: { type: "string", example: "moi" },
                          supsTotal: { type: "string", example: "100" },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "Token manquant ou invalide" },
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
      "/batiments": {
        get: {
          tags: ["Bâtiments"],
          summary: "Lister tous les bâtiments disponibles",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Catalogue des bâtiments",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        nom: { type: "string", example: "Ferme à sups" },
                        description: { type: "string", nullable: true },
                        coutBase: { type: "integer", example: 100 },
                        multiplicateurCps: { type: "number", example: 0.1 },
                        ordreAffichage: { type: "integer", example: 1 },
                        icon: { type: "string", nullable: true, example: "🏠" },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "Token manquant ou invalide" },
          },
        },
      },
      "/session/batiments": {
        get: {
          tags: ["Bâtiments"],
          summary: "Récupérer les bâtiments possédés par la session",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Liste des possessions",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        batimentId: { type: "string", format: "uuid" },
                        quantite: { type: "integer", example: 5 },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "Token manquant ou invalide" },
            404: { description: "Session introuvable" },
          },
        },
      },
      "/session/batiments/": {
        put: {
          tags: ["Bâtiments"],
          summary: "Sauvegarder les quantites de batiments pour la session",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["batimentId", "quantite"],
                    properties: {
                      batimentId: { type: "string", format: "uuid" },
                      quantite: { type: "integer", minimum: 0, example: 3 },
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Possessions sauvegardees" },
            401: { description: "Token manquant ou invalide" },
            404: { description: "Session ou batiment introuvable" },
          },
        },
      },
      "/succes": {
        get: {
          tags: ["Succes"],
          summary: "Lister tous les succes disponibles",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Catalogue des succes",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        nom: { type: "string", example: "Premier sup" },
                        description: { type: "string", nullable: true },
                        conditionType: {
                          type: "string",
                          nullable: true,
                          example: "sups_total",
                        },
                        conditionValeur: {
                          type: "string",
                          nullable: true,
                          example: "100",
                        },
                        icone: { type: "string", nullable: true },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "Token manquant ou invalide" },
          },
        },
      },
      "/session/succes": {
        get: {
          tags: ["Succes"],
          summary: "Recuperer les succes obtenus de la session",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Liste des succes avec leur etat d'obtention",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        nom: { type: "string", example: "Premier sup" },
                        description: { type: "string", nullable: true },
                        conditionType: {
                          type: "string",
                          nullable: true,
                          example: "sups_total",
                        },
                        conditionValeur: {
                          type: "string",
                          nullable: true,
                          example: "100",
                        },
                        icone: { type: "string", nullable: true },
                        obtenu: { type: "boolean", example: true },
                        obtenuLe: {
                          type: "string",
                          format: "date-time",
                          nullable: true,
                        },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "Token manquant ou invalide" },
            404: { description: "Session introuvable" },
          },
        },
      },
      "/session/succes/verifier": {
        post: {
          tags: ["Succes"],
          summary: "Verifier et debloquer les succes de la session",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Succes verifies",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", format: "uuid" },
                        nom: { type: "string", example: "Premier sup" },
                        description: { type: "string", nullable: true },
                        conditionType: {
                          type: "string",
                          nullable: true,
                          example: "sups_total",
                        },
                        conditionValeur: {
                          type: "string",
                          nullable: true,
                          example: "100",
                        },
                        icone: { type: "string", nullable: true },
                        obtenu: { type: "boolean", example: true },
                        obtenuLe: {
                          type: "string",
                          format: "date-time",
                          nullable: true,
                        },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "Token manquant ou invalide" },
            404: { description: "Session introuvable" },
          },
        },
      },
      "/session/succes/ajouter": {
        post: {
          tags: ["Succes"],
          summary: "Ajouter des succes obtenus pour une session",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "uuid",
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Succes obtenus ajoutes",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                        example: "Succes obtenus ajoutes.",
                      },
                    },
                  },
                },
              },
            },
            400: { description: "Requete invalide" },
            401: { description: "Token manquant ou invalide" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
