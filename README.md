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
