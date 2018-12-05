/*
    В продакшене минифицирует js код. Использую BundleAnalyzer для анализа веса бандла
    Autoprefixer для вендорных префиксов свойств css
*/
const path = require('path');

const { src, dest, watch } = require('gulp');
const { series, parallel } = require('gulp');
const sass = require('gulp-sass');
const nodeSass = require('node-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

sass.compiler = nodeSass;

function scssToCss() {
    return src('scss/app.scss')
    .pipe(
        sass({ outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'nested' })
        .on('error', sass.logError)
    )
    .pipe(concat('styles.css'))
    .pipe(dest('dist'));
}

function prefixCss(){
    return src('dist/styles.css')
    .pipe(autoprefixer())
    .pipe(dest('dist'))
}

function transpileJS(){
    return src('src/index.js')  
    .pipe(webpackStream({
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
        devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
        module: {
            rules: [
                { 
                    test: /\.js$/, 
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    },
                },
            ],
        },
        plugins: [
            new BundleAnalyzerPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
    }))
    .pipe(concat('bundle.js'))
    .pipe(dest('dist'));
}

function uglifyJS(){
    return src('dist/bundle.js')
    .pipe(uglify())
    .pipe(dest('dist'))
}

if(process.env.NODE_ENV !== 'production'){
    watch('scss/*.scss', scssToCss);
    watch('src/*.js', transpileJS);
    watch('src/**/*.js', transpileJS);
}

exports.default = parallel(transpileJS, scssToCss);
exports.build = series(transpileJS, uglifyJS, scssToCss, prefixCss);