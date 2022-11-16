# Regen Website

The website for the [Regen Network](https://regen.network).

## Table of Contents

- [Regen Website](#regen-website)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
      - [Mac](#mac)
    - [Install dependencies](#install-dependencies)
  - [Environment variables](#environment-variables)
  - [Development](#development)
  - [Deployment](#deployment)
    - [Website](#website)
  - [web-components](#web-components)
  - [Code style](#code-style)
  - [Typography](#typography)
    - [Sizing guide](#sizing-guide)
  - [Timeout Issue on Slower Connections](#timeout-issue-on-slower-connections)
  - [Netlify](#netlify)
    - [Debugging Netlify deploys](#debugging-netlify-deploys)

## Installation

- `web-www`: Regen website based on [Gatsby](https://www.gatsbyjs.org/)

### Prerequisites

#### Mac

If you haven't already, you can set up system dependencies by running the following commands:

```sh
brew install python
sudo ln -s /opt/homebrew/bin/python3 /opt/homebrew/bin/python
brew install vips
```

Note: `python` and `vips` are dependencies via `sharp`.

### Install dependencies

```sh
yarn
```

## Environment variables

Set variables in `.env.development` and `.env.production` in `web-www/` based on `.env.development.example` and `.env.production.example` respectively.

## Development

First, run:

```sh
yarn develop
```

## Deployment

### Website

```sh
yarn build
```

## web-components

`web-www` uses a React 17 compatible version of `web-components` from `regen-web` monorepo.

To update this version of `web-components`:

- `git checkout react-17` in `regen-web`
- make changes, bump version in `regen-web/web-components/package.json`, and publish a new version with `npm publish`
- use new version in `web-www/package.json`

## Code style

[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are used as
code formatter and linter.

Code can be formatted and any auto-fixable errors corrected through the command:

```sh
yarn format-and-fix
```

If you are using VsCode, there are suggested workspace settings in `.vscode/settings.json.suggested` - copy those over to your workspace `settings.json` and things should format automatically.

Note: You'll need the VsCode extensions for [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Typography

This repo utilizes custom MUI Typography components to normalize styles with the mockups based on the typography in [figma](<https://www.figma.com/file/MuSpCtCdU2ns4cFAsPfvsx/Text-Styles-%26-Components-(current)?node-id=0:1>):

1. `<Title />` corresponds to "Header" text in the mockups
2. `<Label />` corresponds to "Button Text" in the mockups
3. `<Subtitle />`
4. `<Body />`

Responsive styles are generally normalized (e.g. an `H1` on desktop translates to an `H3` on mobile in most cases), however these can be overridden with `variant` / `mobileVariant` (for Titles) and `size` / `mobileSize` (for the others). For example:

```tsx
<Title /> // renders an h1 (default) on desktop, h3 on mobile
<Title variant="h3" /> // renders an h3 on desktop, h4 on mobile
<Title variant="h3" mobileVariant="h3" /> // renders an h3 on desktop & mobile
<Subtitle size="xl" mobileSize="sm" />
<Body mobileSize="md" /> // keep default `md` size on mobile
```

One small gotcha: due to how `styled` components and the `sx` prop function together, if you want to use a custom `fontSize` through `sx`, you have to pass responsive values:

```tsx
<Title sx={{ fontSize: 12 }}> // does not work as expected
<Title sx={{ fontSize: [12] }}> // works
<Title sx={{ fontSize: [12, 18] }}> // works
<Title sx={{ fontSize: { xs: 12 } }}> // works
```

All of these components also accept MUI's [SX Prop](https://mui.com/system/the-sx-prop/).

The `<Body>` component by default will add styles to child `Link` and `ul/ol` elements, which can be overridden through props:

```tsx
<Body>
  <Link>text</Link> // will render as green w/ bold text
  <ol>
    <li>list text</li> // will render with a green dot and custom positioning
  </ol>
</Body>
<Body styleLinks={false} styleLists={false}>
  <Link>text</Link> // will render as default text
  <ol>
    <li>list text</li> // will render with default list styles
  </ol>
</Body>
```

### Sizing guide

| **Px** | **Rem**  | **theme.spacing** |            **Figma Component**            |      **UI Components**       | **MUI Variants** |
| :----: | :------: | ----------------- | :---------------------------------------: | :--------------------------: | :--------------: |
|  48px  |   3rem   | 12                |                    H1                     |            Title             |        H1        |
|  38px  | 2.375rem | 9.5               |                    H2                     |            Title             |        H2        |
|  32px  |   2rem   | 8                 |                    H3                     |            Title             |        H3        |
|  24px  |  1.5rem  | 6                 |                    H4                     |            Title             |        H4        |
|  22px  | 1.375rem | 5.5               |        bodyXLarge, subtitleXLarge         |        Body, Subtitle        |    textXLarge    |
|  21px  | 1.313rem | 5.252             |              H5, ButtonLarge              |         Title, Label         |        H5        |
|  18px  | 1.125rem | 4.5               | H6, subtitleLarge bodyLarge, buttonMedium | Title, Subtitle, Body, Label |  h6, textLarge   |
|  16px  |   1rem   | 4                 |        subtitleMedium, bodyMedium         |       Subtitle, Label        |    textMedium    |
|  14px  | 0.875rem | 3.5               |   subtitleSmall, bodySmall, buttonSmall   |    Subtitle, Body, Label     |    textSmall     |
|  12px  | 0.75rem  | 3                 |  subtitleXSmall bodyXSmall, buttonXSmall  |    Subtitle, Body, Label     |    textXSmall    |

## Timeout Issue on Slower Connections

_some larger packages don't manage to get downloaded in time for yarn's 30 second timeout, you might see an error like this one_

```
info There appears to be trouble with your network connection. Retrying...
error An unexpected error occurred: "https://registry.yarnpkg.com/@material-ui/icons/-/icons-4.5.1.tgz: ESOCKETTIMEDOUT".
info If you think this is a bug, please open a bug report with the information provided in "/Users/jared/Dev/registry/yarn-error.log".
```

a simple workaround via https://github.com/mui-org/material-ui/issues/12432 is to run

```
yarn install --network-timeout 500000
```

instead of `yarn install`

## Netlify

Currently we use netlify to deploy this application.
Please see the `netlify.toml` in the project root for information about the different deployment environments.

### Debugging Netlify deploys

In case you are seeing a build/deploy failure from Netlify, there is a helpful way to debug.
Netlify provides the source code for [their build-image](https://github.com/netlify/build-image).
This docker image can be used to run a netlify build worker on your local machine.
This allows you to test settings and parameters of the build.
Hopefully this allows you to reproduce the error/failure you are dealing with.

```sh
git clone https://github.com/netlify/build-image
cd build-images
docker pull netlify/build:focal
./test-tools/start-image.sh ../regen-web/
```

Make sure that any changes you want to test in the local build are committed.
Uncommited changes are ignored by the Netlify build image.

After running the `start-image.sh` script you will drop into the docker container.
Then you will be able to run any commands, i.e. the build:

```sh
/opt/build-bin/build yarn build
```
