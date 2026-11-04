---
name: commit
description: Analyse les fichiers modifiés, crée des commits groupés (gitmoji + commitlint) et pousse la branche active, sans demander de validation
allowed-tools:
  - 'Bash(git status:*)'
  - 'Bash(git diff:*)'
  - 'Bash(git add:*)'
  - 'Bash(git commit:*)'
  - 'Bash(git push:*)'
  - 'Bash(git log:*)'
  - 'Bash(git rev-parse:*)'
  - Read
  - Glob
  - Grep
---

# Skill de commit automatisé

Tu dois analyser les fichiers modifiés, créer des commits intelligents et les pousser, **de façon
entièrement autonome**. Lancer `/commit` vaut autorisation pour tout le flux (add + commit +
push) : ne demande AUCUNE validation du découpage, des messages ou du push.

## Étape 1 : Analyse des fichiers

Exécute ces commandes pour récupérer l'état du repo :

```bash
git status --porcelain
git diff --name-only
git diff --cached --name-only
```

## Étape 2 : Groupement logique

Analyse les fichiers modifiés et groupe-les par **changement logique**. Exemples :

- Fichiers liés à une même feature → 1 commit `feat:`
- Montée de version de dépendances → 1 commit `chore:`
- Corrections de bugs → 1 commit `fix:`
- Documentation → 1 commit `docs:`

Utilise le contexte de la conversation pour comprendre ce qui a été fait.

## Étape 3 : Format des commits

Chaque commit doit respecter ce format :

```
type: :gitmoji: description in English
```

**IMPORTANT : Les descriptions doivent TOUJOURS être en anglais.**

### Types autorisés (commitlint)

- `feat` : Nouvelle fonctionnalité
- `fix` : Correction de bug
- `docs` : Documentation
- `style` : Formatage du code
- `refactor` : Refactoring
- `perf` : Performance
- `test` : Tests
- `build` : Build/dépendances
- `ci` : CI/CD
- `chore` : Autres tâches
- `revert` : Revert

### Gitmojis - Liste complète

#### Features & Améliorations

- `:sparkles:` → Nouvelle feature
- `:tada:` → Initial commit / lancement projet
- `:construction:` → Work in progress
- `:boom:` → Breaking changes
- `:bento:` → Ajout/update d'assets
- `:lipstick:` → UI / style cosmétique
- `:globe_with_meridians:` → Internationalisation / i18n
- `:accessibility:` → Accessibilité (a11y)
- `:children_crossing:` → Amélioration UX
- `:iphone:` → Responsive design
- `:egg:` → Easter egg
- `:camera_flash:` → Snapshots
- `:animation:` → Animations / transitions

#### Corrections & Bugs

- `:bug:` → Correction de bug
- `:ambulance:` → Hotfix critique
- `:adhesive_bandage:` → Fix simple / non-critique
- `:lock:` → Correction faille sécurité
- `:rotating_light:` → Fix warnings linter
- `:pencil2:` → Fix typo
- `:rewind:` → Revert de changements

#### Refactoring & Code quality

- `:recycle:` → Refactoring code
- `:art:` → Amélioration structure / format
- `:hammer:` → Changements de dev tools / scripts
- `:wrench:` → Configuration
- `:truck:` → Déplacement / renommage fichiers
- `:fire:` → Suppression code / fichiers
- `:coffin:` → Suppression dead code
- `:wastebasket:` → Dépréciation de code
- `:label:` → Types (TypeScript, Flow)
- `:goal_net:` → Catch errors
- `:technologist:` → Amélioration DX

#### Performance

- `:zap:` → Amélioration performance
- `:rocket:` → Déploiement

#### Tests

- `:white_check_mark:` → Ajout / update tests
- `:test_tube:` → Tests failing (expérimental)
- `:monocle_face:` → Data exploration / inspection

#### Documentation

- `:memo:` → Documentation
- `:bulb:` → Commentaires dans le code
- `:page_facing_up:` → Licence
- `:busts_in_silhouette:` → Contributors

#### Dépendances & Build

- `:arrow_up:` → Upgrade dépendances
- `:arrow_down:` → Downgrade dépendances
- `:pushpin:` → Pin versions de dépendances
- `:heavy_plus_sign:` → Ajout dépendance
- `:heavy_minus_sign:` → Suppression dépendance
- `:package:` → Update compiled files / packages
- `:building_construction:` → Changements architecture

#### CI/CD & Infra

- `:construction_worker:` → CI build system
- `:green_heart:` → Fix CI
- `:whale:` → Docker
- `:infinity:` → Kubernetes / infra
- `:seedling:` → Seed files / données initiales

#### Database

- `:card_file_box:` → Database / migrations
- `:loud_sound:` → Ajout logs
- `:mute:` → Suppression logs

#### Sécurité & Auth

- `:lock:` → Sécurité
- `:passport_control:` → Authentification / autorisation
- `:closed_lock_with_key:` → Secrets / credentials

#### Config & Environnement

- `:wrench:` → Fichiers de config
- `:gear:` → Settings
- `:see_no_evil:` → .gitignore

#### Autres

- `:bookmark:` → Release / version tag
- `:beers:` → Code écrit bourré 🍻
- `:speech_balloon:` → Textes / littéraux
- `:mag:` → SEO
- `:poop:` → Bad code à améliorer
- `:alien:` → Code externe / API tierce
- `:necktie:` → Business logic
- `:stethoscope:` → Healthcheck
- `:clown_face:` → Mock data
- `:triangular_flag_on_post:` → Feature flags

**Limite** : 100 caractères max pour le message.

## Étape 4 : Exécution des commits

Enchaîne directement, sans rien proposer ni attendre :

1. Si `git status --porcelain` est vide, indique qu'il n'y a rien à commiter et arrête-toi.
2. Pour chaque groupe, dans un ordre logique (dépendances avant usages), exécute :

```bash
git add <fichiers>
git commit -m "type: :gitmoji: description" -m "Co-Authored-By: Claude <Modèle> <noreply@anthropic.com>"
```

Le second `-m` ajoute le trailer de co-auteur Claude en pied de message (séparé du titre par une
ligne vide). Utilise le nom du modèle en cours, par exemple
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

3. Si un hook (lint-staged, commitlint) échoue, corrige la cause (message non conforme,
   erreur de lint) puis relance le commit. Ne contourne jamais le hook.

## Étape 5 : Push

Après tous les commits, push **automatiquement** sur la **branche active** (jamais en dur
sur `main`) :

```bash
BRANCH=$(git rev-parse --abbrev-ref HEAD)
git push origin "$BRANCH"
```

> `git push origin HEAD` fonctionne aussi : il pousse la branche courante vers une branche distante du même nom.

Si le push est refusé (branche distante en avance), arrête-toi et explique la situation :
ni `--force`, ni rebase/merge de ta propre initiative.

## Étape 6 : Compte rendu

1. Affiche `git status` pour confirmer que tout est propre.
2. Termine par un récapitulatif court : pour chaque commit, son hash, son message et ses
   fichiers, puis la branche poussée.

## Règles importantes

- Ne JAMAIS demander de validation (découpage, messages ou push) : tout s'exécute d'un trait
- Ne jamais commiter un fichier de secrets (`.env`, clés, tokens) : laisse-le hors des commits et signale-le dans le compte rendu
- Toujours ajouter le trailer `Co-Authored-By: Claude <Modèle> <noreply@anthropic.com>` à chaque commit (voir étape 4)
- Ne jamais utiliser `--force` ou `--no-verify`
- Ne jamais modifier la config git
- Les messages de commit sont TOUJOURS en anglais
- Vérifier que tous les fichiers sont bien commités avec `git status` à la fin
