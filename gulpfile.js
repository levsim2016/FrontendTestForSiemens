const path = require('path');

const { src, dest, watch } = require('gulp');
const { series, parallel } = require('gulp');
const sass = require('gulp-sass');
const nodeSass = require('node-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const webpack = require('webpack-stream');

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
    .pipe(webpack({
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