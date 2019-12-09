# UI

Shared React components for Thinkful applications.

`/src`

Code for the shared components.

`/stories`

Stories for demoing components using [storybook](https://storybook.js.org)

`/script`

Standard bootstrap scripts (Thinkful convention).

## Demo

```bash
npm run dev
/script/server
```

## Development

If you want to work on UI components locally and see your changes in another app (outside the stories demo), you can use [npm link](https://docs.npmjs.com/cli/link).

1. From `Thinkful/ui`: `npm run dev`
2. From `Thinkful/ui`: `npm link`
3. From the folder containing your app's `package.json`: `npm link thinkful-ui`

## Deploying changes to thinkful-ui

`thinkful-ui` changes need to be deployed to npm, then both `assets` and `seagull` need to be updated to use the newest `thinkful-ui`.

1. Bump the version in `thinkful-ui`'s `package.json`.
2. in `Thinkful/ui`: `npm publish`
3. in `Thinkful/assets`: bump the `thinkful-ui` version in `package.json` to the new version.
4. in `Thinkful/assets`: Make a PR with that `package.json` change, and merge to `master`.
5. in `Thinkful/seagull`: do the same steps as above.
6. in `Thinkful`: `make build seagull && make upload seagull && make build assets && make upload assets`
7. The previous step regenerated build hashes in `docker-compose.yml`, so make a PR with those changes and merge to `master`.
8. You're done!

Caveat: Make sure the `React` versions in `ui` and `assets` are at least roughly in sync.