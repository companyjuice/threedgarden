/** VUE CONFIG */

// vue.config.js
const path = require('path')

module.exports = {

	//publicPath: '/', // default
	//publicPath: '/wp-content/plugins/threed-garden/public/dist/',
	//publicPath: '#',
	//publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
	//publicPath: './',
	//publicPath: process.env.BASE_URL,
	publicPath: '.',

    assetsDir: process.env.BASE_URL,
	//assetsDir: process.env.BASE_URL + '/wp-content/plugins/threed-garden/public/dist/',

	outputDir: 'public/dist', // not necessary?
	
	filenameHashing: false, // define outputted file names

	runtimeCompiler: true, // for templates (+10kb)

	chainWebpack: config => {

		//config.plugins.delete('html')
		config.plugins.delete('preload')
		config.plugins.delete('prefetch')

		config
			.performance
			.maxEntrypointSize(2000000) // 2mb
			.maxAssetSize(2000000) // 2mb
		
		//config.context.resolve({root: path.resolve('./')})
		console.log("MARTY: config.context", config.context)

		config
		 	.plugin('html')
			.tap(args => {
				//args[0].template = '/Users/username/proj/app/templates/index.html'
				args[0].title = "HEY HEY HEY VUE VUE VUE"
				args[0].resolve = {root: path.resolve('./')}
				console.log("MARTY: args[0]", args[0])
				//console.log("config.context", config.context)
				return args
			})

		//	.resolve()
		//.resolve({root: path.resolve('./')})

	},

	// resolve: {
	// 	root: path.resolve('./')
	// },

	devServer: {
		//host: 'garden.university.local',
		//host: 'garden.university.local/scene/mcgee-home-garden/',
		host: 'garden.university.local/wp-content/plugins/threed-garden/public/dist/',
		hot: false,
		writeToDisk: true,
	},

	css: {
		extract: true,
	},

	// pages: {
	//     index: {
	//         // entry for the page
	//         //entry: 'public/js/threed-garden-public.js',
	//         entry: 'src/main.js',
	//         // the source template
	//         //template: 'public/index.html',
	//         // output as dist/index.html
	//         //filename: 'index.html',
	//         // when using title option,
	//         // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
	//         title: 'THREED GARDEN PLUGIN',
	//         // chunks to include on this page, by default includes
	//         // extracted common chunks and vendor chunks.
	//         chunks: ['chunk-vendors', 'chunk-common', 'index']
	//     },
	//     // when using the entry-only string format,
	//     // template is inferred to be `public/subpage.html`
	//     // and falls back to `public/index.html` if not found.
	//     // Output filename is inferred to be `subpage.html`.
	//     //subpage: 'src/subpage/main.js'
	// },
}
/** */