var host = 'localhost'

var path               = require("path")
var webpack            = require("webpack")
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var BrowserSyncPlugin  = require('browser-sync-webpack-plugin');
var ExtractTextPlugin  = require('extract-text-webpack-plugin');

// on peut passer à notre commande de build l'option --production
// on récupère sa valeur ici en tant que booléen
var production = process.argv.indexOf("--production") > -1


module.exports.webpack = {

  options : {

    devtool: 'source-map',

    // nos points d'entrée, par clé
    // (on peut en définir plusieurs)
    entry: {
      'js/bundle.js': './assets/js',
    },

    // description de nos sorties
    output: {
      // ./dist
      path: "./.tmp/public",
      // nous aurons (vu notre point d'entrée)
      // - dist/index.js
      filename: "[name]",
      // notre base url
      publicPath: "/",
    },

    resolve: {
      // ici, on peut ajouter nos extensions à résoudre lors d'un require()
      // on va rester simple en n'autorisant rien, ou .js(on) (comme en nodejs et
      // browserify)
      extensions: [
        "",
        ".js",
        ".jsx",
        ".json",
      ],

      // Allow to give relative path without navigating between folders
      root: [
        path.resolve('./assets/js/src'),
        path.resolve('./assets/styles'),
        path.resolve('./assets'),
      ]
    },

    module: {
      // liste de nos loaders
      // ! \\ à noter que les loaders sont exécutés en ordre inverse
      // les premiers en dernier, en utilisant la sortie du suivant
      loaders: [
        {
          // pour tous les fichiers qui finissent par .js
          test: /\.j(s|sx)$/,
          // ... en prenant bien soin d'exclure les node_modules
          exclude: /node_modules/,

          // on ajoute les loaders babel et eslint
          // à vous de voir ce que vous aurez besoin
          // ("rien" est une option tout à fait valable si vous codez en ES5
          // sans linter)
          loader: 'babel-loader',
          query : {
            cacheDirectory : true,
          }

          // à noter que l'on peut définir les loaders de cette façon
          // loader: "babel!eslint",

          // à noter aussi, Webpack va tenter de loader des modules ayant dans
          // leur nom "-loader". Si ce n'était pas le cas, ou que votre loader
          // ne comporte pas -loader, vous pouvez spécifier le nom entier :
          // loader: "babel-loader!eslint-loader",
        },
        // à l'inverse de node et browserify, Webpack ne gère pas les json
        // nativement, il faut donc un loader pour que cela soit transparent
        {
          test: /\.json$/,
          loaders: [
            "json",
          ],
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
        },
        // {
        //   test: /\.less$/, // load LESS files
        //   loader: "less?strictMath&noIeCompat"
        // },

        // pour la suite, on va rester simple :
        // un require() en utilisant le file-loader retournera une string avec
        // le nom du fichier et (le plus important) copiera le fichier suivant
        // le paramètre "name" dans l'output.path que nous avons défini tout
        // au début de notre configuration.
        // Notez qu'il dégagera la partie context du nom lors du retour en string
        // et la remplacera par le l'output.path défini pour la copie.
        {
          // on chargera tous les formats d'images qui nous intéressent en tant
          // que fichiers.
          test: /\.(ico|jpe?g|png|gif)$/,
          loaders: [
            "file?name=[path][name].[ext]&context=./src",
            // Vous remarquerez ici la méthode utilisée pour définir
            // des options pour les loaders. Il en existe d'autres avec les
            // versions les plus récentes en utilisant la clé "query"
          ],
        },
        {
          // idem pour les fonts
          test: /\.(woff|ttf|otf|eot\?#.+|svg#.+)$/,
          loaders: [
            "file?name=[path][name].[ext]&context=./src",
          ],
        },
        {
          // ici on se permet de loader des fichiers html et txt tels quels
          test: /\.(html|txt)$/,
          loaders: [
            "file?name=[path][name].[ext]&context=./src",
          ],
        },
      ],
    },

    sassLoader: {
      includePaths: [path.resolve(__dirname, "./assets/styles")]
    },

    // en plus des loaders, qui premettent eux de modifier et/ou d'exploiter le
    // contenu des modules, nous avons des plugins, plus globaux au processus
    plugins: (
      [
        new CleanWebpackPlugin(['.tmp'], {
          root: path.resolve(__dirname, '..'),
          verbose: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new CopyWebpackPlugin([
          {
            from : './assets/images',
            to   : 'images'
          },
          {
            from : './assets/dependencies', // Dependencies must be out of js folder as all js folder is bundled
            to   : 'js/dependencies'
          }
        ]),
        new ExtractTextPlugin('style.css', {
          allChunks: true
        }),


        // ce plugin permet de transformer les clés passés en dur dans les
        // modules ainsi vous pourrez faire dans votre code js
        // if (__PROD__) { ... }
        new webpack.DefinePlugin({
          __PROD__: production
        }),

        new BrowserSyncPlugin({
          // browse to http://localhost:3000/ during development,
          // ./public directory is being served
          host: host,
          port: 3000,
          open: false,
          files: ['./api/**/*', './views/**/*', './.tmp/**/*'],
          reloadOnRestart: true,
          proxy: {
            target: `http://${host}:1337`,
            ws: true
          },
        }),
      ]
      // en production, on peut rajouter des plugins pour optimiser
      .concat(
        production
        ? [
          // ici on rajoute uglify.js pour compresser nos sorties
          // (vous remarquerez que certain plugins sont directement livrés dans
          // le package webpack).
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
            },
          }),
        ]
        : []
      )
    ),

    // certains modules permettent de définir des options en dehors de la
    // définition des loaders
    cssnext: {
      sourcemap: !production,
      compress: production,
    },

  }
}
