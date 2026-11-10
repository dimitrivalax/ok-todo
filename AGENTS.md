# Instructions et Règles de Développement (ok-todo)

Ce projet utilise les règles et compétences définies dans [`.cursor/rules/`](.cursor/rules/) et [`.cursor/skills/`](.cursor/skills/) (également indexées pour Antigravity dans [`.agents/`](.agents/)).

---

## 1. Stack Technique

- **Framework UI** : Ionic React (`@ionic/react`)
- **React** : React 19 (`ref` comme prop standard, form actions)
- **Routing** : React Router v6 (`Routes`, `Route`, `NavLink`)
- **Mobile / Shell natif** : Capacitor (`@capacitor/*`)
- **Build tool** : Vite
- **Tests unitaires / composants** : Vitest + React Testing Library + `@testing-library/user-event`
- **Tests E2E** : Cypress (`pnpm test.e2e`)
- **Styles & Thème** : CSS variables Ionic (`src/theme/variables.css`)
- **Internationalisation** : `i18next` / `react-i18next`

---

## 2. Règles Fondamentales (Rules)

### Style & Structure de Code (`.cursor/rules/react/coding-style.mdc`)
- **Extensions** : `.tsx` pour tout fichier contenant du JSX, `.ts` pour la logique pure / hooks / types / services.
- **Nommage** :
  - Composants : `PascalCase` (`UserCard.tsx`, export `UserCard`).
  - Hooks : `useCamelCase` (`useTasks`, fichier `use-tasks.ts`).
  - Handlers internes : `handleClick`, `handleSubmit` ; props de callback : `onClick`, `onSubmit`.
  - Booléens : préfixes explicites (`isLoading`, `hasError`, `canSubmit`).
- **Signature des composants** : Préférer `type Props = { ... }` et destructurer systématiquement dans les arguments (`export function Foo({ prop }: Props)`).
- **JSX** : Balises auto-fermantes, fragments `<>...</>` plutôt que `<div>` superflus.
- **Imports** : `import type` séparé pour les types TypeScript.

### Discipline des Hooks (`.cursor/rules/react/hooks.mdc`)
- **Pas de `useEffect` pour de l'état dérivé** : calculer directement pendant le rendu.
- **Pas de `useEffect` pour réinitialiser un état sur changement de prop** : utiliser une `key` ou dériver.
- **Tableau de dépendances strict** : inclure toutes les valeurs réactives, ne jamais désactiver sans justification.
- **Nettoyage (Cleanup)** : chaque souscription, intervalle, écouteur d'événement ou requête annulable (`AbortController`) doit avoir sa fonction de retour.
- **Mémoïsation** : pas de `useMemo` / `useCallback` par défaut ; uniquement si requis pour l'identité de dépendance ou calcul lourd mesuré.

### Architecture & Patterns React (`.cursor/rules/react/patterns.mdc`)
- **Séparation Conteneur / Présentationnel** :
  - *Conteneurs / Pages* : gèrent la récupération de données, l'état global/route, les mutations et la navigation.
  - *Présentationnels* : purs, reçoivent des props et renvoient de l'UI.
- **Emplacement de l'état** :
  1. Un seul composant $\rightarrow$ `useState` local.
  2. Parent + enfants directs $\rightarrow$ élévation d'état via props.
  3. Données transverses à faible fréquence (thème, auth, langue) $\rightarrow$ React Context.
  4. Données de domaine persistées $\rightarrow$ couche service / storage existante.
- **Gestion des erreurs** : associer un `ErrorBoundary` au-dessus de chaque frontière `Suspense`.

### Sécurité (`.cursor/rules/react/security.mdc`)
- **XSS** : Ne jamais utiliser `dangerouslySetInnerHTML` sans assainissement strict via `DOMPurify` au point d'appel.
- **URLs sûres** : Valider les protocoles autorisés (`http:`, `https:`, `mailto:`) pour tout lien dynamique.
- **Liens externes** : Toujours inclure `rel="noopener noreferrer"` avec `target="_blank"`.

### Tests (`.cursor/rules/react/testing.mdc`)
- Tester le comportement visible par l'utilisateur, jamais les détails d'implémentation.
- **Priorité des requêtes RTL** :
  1. `getByRole(role, { name })`
  2. `getByLabelText`
  3. `getByText`
  4. `getByTestId` (*dernier recours uniquement*)
- Préférer `userEvent` (avec `await`) à `fireEvent`.
- Pas de tests de snapshots de composants.
- Mock réseau au niveau transport avec MSW.

---

## 3. Compétences & Spécificités du Projet (Skills)

| Compétence | Source | Quand l'utiliser |
|---|---|---|
| **accessibility** | [`.cursor/skills/accessibility/`](.cursor/skills/accessibility/SKILL.md) | Création/revue d'UI, gestion des focus, overlays Ionic, labels ARIA, navigation clavier. |
| **react-patterns** | [`.cursor/skills/react-patterns/`](.cursor/skills/react-patterns/SKILL.md) | Découpage conteneur/présentationnel, intégration Ionic React, React 19, composition. |
| **frontend-patterns** | [`.cursor/skills/frontend-patterns/`](.cursor/skills/frontend-patterns/SKILL.md) | Layout `src/`, routes React Router, variables de thème CSS, internationalisation `i18next`, garde Capacitor. |
| **react-testing** | [`.cursor/skills/react-testing/`](.cursor/skills/react-testing/SKILL.md) | Tests unitaires & composants Vitest + RTL (`pnpm test.unit`), wrappers de test, asynchronisme. |
| **e2e-testing** | [`.cursor/skills/e2e-testing/`](.cursor/skills/e2e-testing/SKILL.md) | Tests end-to-end Cypress (`pnpm test.e2e`), flux complets, gestion des overlays et stabilité. |

---

## 4. Commandes Usuelles

```bash
pnpm test.unit    # Lancer les tests unitaires (Vitest)
pnpm test.e2e     # Lancer les tests end-to-end (Cypress en mode headless)
pnpm build        # Build de production (Vite)
pnpm cap sync     # Synchroniser les assets avec Capacitor après modification native
```

