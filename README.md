## Sails-webpack-react
A repo with sails 1.0, webpack, react, redux, sails-hook-autoreload, browser-sync
Well, everything you need to dev on react with sails.

## How To ?
```bash
git clone https://github.com/l1br3/sails-webpack-react-2
cd sails-webpack-react-2
npm install
npm i -g sails@beta
sails lift
```

Now visit `http://localhost:3000` and see the magic happens !
If you don't want to use browser-sync (eg. to have 2 sessions opened), visit `http://localhost:1337`

## Features
- rebundling of assets at file change
- reloading of controllers / services at file change
- hotreloading thanks to browser-sync
- react/redux out of the box
- redux dev tools (install [chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) for this to work)
