# webpack4

## 第一章：Webpack简介

### 1.1、Webpack是什么？

> Webpack是一种前端资源构建工具，一个静态模打包器（module bundler）。
>
> 在Webpack看来，前端的所有资源文件（js/json/css/img/less/...）都会作为模块处理。
>
> 它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)。

![image-20210819162126469](C:\Users\mygod\AppData\Roaming\Typora\typora-user-images\image-20210819162126469.png)

### 1.2、Webpack五个核心概念

#### 1.2.1、Entry

> 入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

#### 1.2.2、Output

> 输出(Output)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

#### 1.2.3、Loader

> Loader让 webpack 能够去处理那些非Javascript文件(webpack自身只理解Javascript).

#### 1.2.4、Plugins

> 插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。

#### 1.2.5、Mode

> 模式(Mode)指示 webpack 使用相应模式的配置。

|    选项     |                             描述                             |            特点             |
| :---------: | :----------------------------------------------------------: | :-------------------------: |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。 | 能让代码本地调试 运行的环境 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin. | 能让代码优化上线 运行的环境 |

## 第二章、webpack初体验

### 2.1、初始化配置

```js
1. 初始化 package.json
输入指令:
npm init

2. 下载并安装 webpack
输入指令:
npm install webpack webpack-cli -g
npm install webpack webpack-cli -D
```

### 2.2、编译打包应用

1. 创建文件 
2.  运行指令 
   1. 开发环境指令：webpack src/js/index.js -o build/js/built.js --mode=development 
      1. 功能：webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成 浏览器能识别的语法。 
   2. 生产环境指令：webpack src/js/index.js -o build/js/built.js --mode=production 
      1. 功能：在开发配置功能上多一个功能，压缩代码。
3. 结论 
   1. webpack 能够编译打包 js 和 json 文件。 能将 es6 的模块化语法转换成浏览器能识别的语法。 能压缩代码。
4. 问题
   1.  不能编译打包 css、img 等文件。 不能将 js 的 es6 基本语法转化为 es5 以下语法。

## 第三章：webpack 开发环境的基本配置

### 3.1、创建配置文件

```js
1. 创建文件 webpack.config.js
2. 配置内容如下

// resolve用来拼接绝对路径的方法
const {resolve} = require('path')

module.exports = {
    //webpack配置
    //入口起点
    entry: './src/index.js', 
    //输出 
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        // __dirname  nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },
    //模式
    mode: 'development', //开发模式
    // mode: 'production'
}
```

### 3.2、打包样式资源

`style-loader` `css-loader` `less-loader` `sass-loader`

```js
// resolve用来拼接绝对路径的方法
const {resolve} = require('path')

module.exports = {
    //webpack配置
    //入口起点
    entry: './src/index.js', 
    //输出 
    output: {
        //输出文件名
        filename: 'built.js',
        //输出路径
        // __dirname  nodejs的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'build')
    },
    //loader配置
    module: {
        rules: [
            //详细loader配置
            {   
                //匹配那些文件
                test: /\.css$/,
                //使用那些loader进行处理
                use:[
                    // use数组中loader执行顺序：从右到左，从下到上 依次执行
                    // 创建style标签，将js中的css样式资源插入，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    //需要下载less和less-loader
                    'less-loader'
                ]
            }
        ]
    },
    //plugins配置
    plugins: [
        //详细plugins配置
    ],
    //模式
    mode: 'development', //开发模式
    // mode: 'production'
}

npm i less less-loader -D
webpack  //打包
```

### 3.3、打包HTML

`html-webpack-plugin`

```js
/* 

    loader: 1.下载  2.使用(配置loader)
    plugins: 1.下载  2.引入  3.使用
*/

const {resolve} = require('path')
const HtmlWbpackPlugin = require('html-webpack-plugin')
module.exports = {
    //入口
    entry: './src/index.js',
    //输出
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //loader
        ]
    },
    plugins: [
        // plugins
        // html-webpack-plugin
        // 功能：默认会创建一个空的HTML文件，引入打包输出的所有资源(js/css)
        // 需求：需要有结构的HTML文件
        new HtmlWbpackPlugin({
            //复制./src/index.html文件，并自动引入打包输出的所有资源(js/css)
            template: './src/index.html'
        })
    ],
    mode: 'development'

}
```

### 3.4、打包图片

#### **src/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack-打包图片资源</title>
</head>
<body>
    <div id="box1"></div>
    <div id="box2"></div>
    <div id="box3"></div>
    <img src="./apple.jpg" alt="">
</body>
</html>
```

#### **build/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>webpack-打包图片资源</title>
</head>
<body>
    <div id="box1"></div>
    <div id="box2"></div>
    <div id="box3"></div>
    <img src="data:image/jpeg;base64,UklGRgomAABXRUJQVlA4WAoAAAAQAAAA/wAA/wAAQUxQSB0TAAABGQZtIzmS59qXef6MH0NE/wNva6Jt8Wq4m2zBOL8FbSDBGM9wLc82EehgF+U6ddOBlBi7claw6HY3J4vcsKzMpFeQ9Ovh/gdH+omrE0YiaOpIHG02BOo0wo6Vunqr5rOcr5TCloh8G0snPmSxpMG3OtjEzMRsVA6apd24QG6sqML3NaimU2vKwf/t/YAAAAA=" alt="">
<script src="built.js"></script></body>
</html>
```

#### **webpack.config.js**

```js
const {resolve} = require('path')
const HtmlWpPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname , 'build')
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                //多个loader用use
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ],  
            },
            {
                //问题：默认处理不了html中img图片
                test: /\.(jpg|png|gif)$/,
                //下载 url-loader  file-loader
                loader: 'url-loader',
                options: {
                    //限制图片大小，小于8KB，就被会base64处理
                    //优点：减少请求数量（减轻服务器压力）
                    //缺点：图片体积会更大（文件请求速度更慢）
                    limit: 12 * 1024 ,
                    //问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs解析
                    // webpack 4.44.1 版本已经处理了这个问题
                    // esModule: false,
                    //图片重命名,取图片的hash值前十位  ext 文件原扩展名
                    name: '[hash:10].[ext]'
                }
            },
            {
                test: /\.html$/,
                //处理html文件中的img图片(负责引入，从而能被url-loader打包处理)
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWpPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```

### 3.5、打包其他资源

**web.config.js**

```js

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    //入口
    entry: './src/index.js',
    //输出
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    //loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            //打包其他资源(除了html/js/css资源以外的资源)
            {
                exclude: /\.(css|less|sass|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    //plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}
```

### 3.6、devServer

```js
  //开发服务器 devServer:用来自动化(自动编译,自动打开浏览器,自动刷新浏览器)
    //特点:只会在内存中编译打包,不会有任何输出
    //启动devServer指令为 本地下载,需要用 npx 启动webpack-dev-server
    devServer: {
        //运行项目的目录
        contentBase: resolve(__dirname, 'build'),
        //启动gzip压缩
        compress: true,
        //端口号
        port: 3000,
        //自动打开浏览器
        open: true,
        scripts: {
            
        }
    }
```

### 3.7、开发环境基本配置

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader 的配置
            {
                // 处理 less 资源
                test: /\.(css|less|sass-loder)$/,
                use: ['style-loader', 'css-loader', 'less-loader','less-loader']
            },
           /*  {
                // 处理 css 资源
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, */
            {
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    // 关闭 es6 模块化
                    esModule: false,
                    outputPath: 'imgs'
                }
            },
            {
                // 处理 html 中 img 资源
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                // 处理其他资源
                exclude: /\.(html|js|css|less|jpg|png|gif)/,
                loader: 'file-loader',
                options: {

                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        // plugins 的配置
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true
    }
};
```

### 3.8、提取css成单独文件

`mini-css-extract-plugin`

```js

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: [
                    //创建style标签,将样式放入
                    // 'style-loader',
                    //这个loader取代style-loader, 提取js中的css成单独文件,解决闪屏情况
                    MiniCssExtractPlugin.loader,
                    //将css文件整合到js文件中
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //对输出的css文件进行重命名
            filename: 'css/built.css'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        port:3000,
        compress: true,
        open: true
    }
}
```

### 3.9、css兼容性

#### 3.9.1、postcss

- `sugarss` 是一种类似于 Sass 或 Stylus 的基于缩进的语法。
- `postcss-syntax` 按文件扩展名自动切换语法。
- `postcss-html`解析类似 HTML 文件的` <style> `标签中的样式。
- `postcss-markdown`解析 Markdown 文件代码块中的样式。
- `postcss-jsx`在源文件的模板/对象文字中解析 CSS。
- `postcss-styled`在源文件的模板文字中解析 CSS。
- `postcss-scss`允许您使用 SCSS（但不会将 SCSS 编译为 CSS）。
- `postcss-sass` 允许您使用 Sass（但不会将 Sass 编译为 CSS）。
- `postcss-less`允许您使用 Less（但不会将 LESS 编译为 CSS）。
- `postcss-less-engine`允许您使用 Less（并且确实使用真正的 Less.js 评估将 LESS 编译为 CSS）。
- `postcss-js`postcss-js 允许您在 JS 中编写样式或转换 React 内联样式、Radium 或 JSS。
- `postcss-safe-parser`postcss-safe-parser 查找并修复 CSS 语法错误。
- `midas`将 CSS 字符串转换为突出显示的 HTML。

**将 PostCSS 与 CSS-in-JS 结合使用的最佳方式是`astroturf` 将其加载程序添加到您的`webpack.config.js`：**

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'postcss-loader'],
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'astroturf/loader'],
      }
    ]
  }
}
```

**然后创建postcss.config.js：**

```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
```

**Parcel 具有内置的 PostCSS 支持。 它已经使用了 Autoprefixer 和 cssnano。 如果要更改插件，请在项目的根目录中创建 postcss.config.js：**

```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
```

**在Webpack中使用`postcss-loader`**

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}


//postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
```

#### 3.9.2、postcss-loader

| exec        | {Boolean}         | undefined | 在CSS-in-JS中启用PostCSS Parser支持 |
| ----------- | ----------------- | --------- | ----------------------------------- |
| parser      | {String\|Object}  | undefined | 设置PostCSS Parser                  |
| syntax      | {String\|Object}  | undefined | 设置PostCSS语法                     |
| stringifier | {String\|Object}  | undefined | 设置PostCSS Stringifier             |
| config      | {Object}          | undefined | 设置postcss.config.js配置路径&& ctx |
| plugins     | {Array\|Function} | []        | 设置PostCSS插件                     |
| sourceMap   | {String\|Boolean} | false     | 启用源地图                          |

```js
const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//设置nodejs环境变量
process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                // 'postcss-loader'
                /* 
                    css 兼容性处理：postcss --> postcss-loader postcss-preset-env
                    帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式

                    "browserslist": {
                        //开发环境 --> 设置环境变量：nodejs  process.env.NODE_ENV = development
                        "development": [
                        "last 1 chrome version",
                        "last 1 firefox version",
                        "last 1 safari version"
                        ],
                        //生产环境： 默认是看生产环境
                        "production": [
                        ">0.2%",
                        "not dead",
                        "not op_mini all"
                        ]
                    },

                 */
                //使用loader的默认配置
                //postcss-loader
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            ident: 'postcss',
                            plugins:   [
                                require('postcss-preset-env'),
                            ]
                        }

                    }


                }
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //对输出的css文件进行重命名
            filename: 'css/built.css'
        })
    ],
    mode: 'development',
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        port: 3000,
        compress: true,
        open: true
    }
}

```
**css 兼容性处理：postcss --> postcss-loader  postcss-preset-env**

**帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式**

```js
// package.json  
"browserslist": {

      //开发环境 --> 设置环境变量：nodejs process.env.NODE_ENV = development
      "development": [

          "last 1 chrome version",

          "last 1 firefox version",

          "last 1 safari version"
      ],

          //生产环境： 默认是看生产环境
          "production": [

              ">0.2%",

              "not dead",

              "not op_mini all"

          ]

  },
      
//webpack.config.js
//设置nodejs环境变量
process.env.NODE_ENV = 'development'
```

### 3.10、压缩css

> Webpack4 使用 `optimize-css-assets-webpack-plugin`
>
> Webpack5 使用`css-minimizer-webpack-plugin`
>
> 引入之后，直接在`plugins`中实例化即可

```js
  plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            //对输出的css文件进行重命名
            filename: 'css/built.css'
        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin()

    ],
```

### 3.11、eslint检查语法

**语法检查： eslint-loader eslint**

​          **注意： 只检查自己写的源代码**

​          **设置检查规则：**

​            **package.json中eslintConfig中设置**

​            **airbnb**

​        **使用 airbnb需要三个库 --> eslint-config-airbnb-base --> eslint-plugin-import --> eslint**

```js
const ESLintPlugin = require('eslint-webpack-plugin');

plugins: [
    new ESLintPlugin({
        fix: true,
    })
],
     
     
package.json中配置
"eslintConfig": {
    "extends": "airbnb-base"
  }
```

### 3.12、js兼容性

使用`babel`将ES6以上语法转为ES5

#### 全部引入

```js
"@babel/core": "^7.15.0",
"@babel/preset-env": "^7.15.0",
"babel-loader": "^8.2.2",
    
entry: ['@babel/polyfill','./src/js/index.js'],
module: {
    rules: [
      // babel-loader @babel/preset-env
      // 1. 基本js兼容性处理 -->  @babel/preset-env
      // 2. 全部js兼容性处理 --> @babel/polyfill
        //问题：只想解决部分兼容性问题，但是将所有兼容性代码全引入，体积太大
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //预设
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
      
Version: webpack 4.46.0
Time: 823ms
       Asset       Size  Chunks             Chunk Names
  index.html  331 bytes          [emitted]
js/buildt.js    442 KiB    main  [emitted]  main
Entrypoint main = js/buildt.js
```

#### 按需引入

```js
module.exports = {
  // entry: ['@babel/polyfill','./src/js/index.js'],
  entry: ['./src/js/index.js'],
  output: {
    filename: 'js/buildt.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // babel-loader @babel-core @babel/preset-env
      // 1. 基本js兼容性处理 -->  @babel/preset-env
      // 2. 全部js兼容性处理 --> @babel/polyfill
          //问题：只想解决部分兼容性问题，但是将所有兼容性代码全引入，体积太大
      // 3.需要做兼容性处理：按需加载 --> core.js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //预设
          presets: [
            [
              '@babel/preset-env',
              {
                //按需下载
                useBuiltIns: 'usage',
                //指定core-js版本
                corejs: {
                  version: 3
                },
                //指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
```

### 3.13、压缩js和html

#### js

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: ['./src/js/index.js'],
  output: {
    filename: 'js/buildt.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  //生产环境下会自动压缩js代码
  mode: 'production',
};

```

#### html

```js
 new HtmlWebpackPlugin({
      template: './src/index.html',
     //压缩html
      minify: {
        //移除空格
        collapseWhitespace: true,
        //移除注释
        removeComments: true
      }
    }),
```

### 3.14、生产环境配置

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
process.env.NODE_ENV = 'prodution';

// 复用loader
const commonLoaders = [
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        plugins: [
          require('postcss-preset-env'),
        ],
      },
    },
  },
];

module.exports = {
  entry: ['./src/js/index.js'],
  output: {
    filename: 'js/buildt.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          ...commonLoaders,
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          ...commonLoaders,
          'less-loader',
        ],
      },
    /*  
        正常来讲，一个文件只能被一个loader处理。
        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
        先执行eslint，再执行babel 
        enforce: 'pre'  优先执行
     */
      {
          //eslint
          // enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //预设
          presets: [
            [
              '@babel/preset-env',
              {
                //按需下载
                useBuiltIns: 'usage',
                //指定core-js版本
                corejs: {
                  version: 3
                },
                //指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17'
                }
              }
            ]
          ]
        }
      },
      {
          test: /\.(jpg|png|gif)$/,
          loader: 'url-loader',
          options: {
              limit: 12 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs'
          }
      },
      {
          test: /\.html/,
          loader: 'html-loader'
      },
      {
          exclude: /\.(js|css|less|html|jpg|png|gif)/,
          loader: 'file-loader',
          options: {
              outputPath: 'media'
          }
      }

    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  // 生产环境下会自动压缩js代码
  mode: 'production',
};

"browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }
```

## 第四章：性能优化

### 4.1、HMR（模块热更新）

**模块热更新**

```js
/* 
    HMR: hot module replacement  热模块替换 / 模块热替换
        作用：一个模块发生变化，只会重新打包这一模块（而不是打包所有）
                极大提升构建速度

    样式文件：可以使用HMR功能，因为 style-loader内部实现了
    js文件：默认没有HMR功能 --> 需要修改js代码，添加支持HMR功能
        注意：HMR功能对js的处理，只能处理非入口js文件
    html文件：默认没有HMR功能  同时会导致问题：html不能热更新

    解决：修改entry入口
*/
entry: ['./src/js/index.js','./src/index.html'],
devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        open: true,
        //开启HMR功能
        //当修改了webpack配置，必须重启webpack服务才能生效
        hot: true
    }
```

### 4.2、调试代码-source-map

**source-map 一种提供源代码到构建后代码映射技术 反向定位源码的功能**

| 类型                    | 产生的构建代码位置                                      | 详情                                                         |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| source-map              | 外部                                                    | 错误代码准确信息 和 源代码的错误位置                         |
| hidden-source-map       | 外部                                                    | 错误代码错误原因：但是没有错误位置，不能追踪源代码错误，只能提示到构建后代码的错误位置 |
| nosources-source-map    | 外部                                                    | 错误代码准确信息，但是没有任何源代码信息                     |
| cheap-source-map        | 外部                                                    | 错误代码准确信息 和 源代码的错误位置 ，只能精确到行          |
| cheap-module-source-map | 外部                                                    | 错误代码准确信息 和 源代码的错误位置 ，module会将loader的source-map加入 |
| inline-source-map       | 内联                                                    | 错误代码准确信息 和 源代码的错误位置                         |
| eval-source-map         | 内联（每一个文件都生成一个source-map 都在eavl函数中。） | 错误代码准确信息 和 源代码的错误位置，源文件名称后面多了一个hash值 |

### 4.3、oneOf

**在oneOf里面的loader一旦匹配成功则会跳出匹配，相当于break语句**

```js
rules: [
     {
         //eslint
         // enforce: 'pre'
     },
      {
        //以下loader只会匹配一个
        //注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              ...commonLoaders,
            ],
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              ...commonLoaders,
              'less-loader',
            ],
          },
        /*  
       
         
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              //预设
              presets: [
                [
                  '@babel/preset-env',
                  {
                    //按需下载
                    useBuiltIns: 'usage',
                    //指定core-js版本
                    corejs: {
                      version: 3
                    },
                    //指定兼容性做到哪个版本浏览器
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ]
            }
          },
          {
              test: /\.(jpg|png|gif)$/,
              loader: 'url-loader',
              options: {
                  limit: 12 * 1024,
                  name: '[hash:10].[ext]',
                  outputPath: 'imgs'
              }
          },
          {
              test: /\.html/,
              loader: 'html-loader'
          },
          {
              exclude: /\.(js|css|less|html|jpg|png|gif)/,
              loader: 'file-loader',
              options: {
                  outputPath: 'media'
              }
          }
        ]
      }

    ],
```

### 4.4、缓存

+ babel缓存：第二次打包构建速度更快
+ 文件资源缓存
  + hash：每次webpack构建时会生成一个唯一的hash值
    + 问题：每次改动，js和css文件都会重新构建，缓存同时失效（可能我只改动一个文件，导致全部缓存都失效）
  + chunkhash: 根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash就一样
  + contenthash: 根据文件的内容生成hash值，不同文件hash值一定不一样
    + 让代码上线运行缓存更好使用

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'prodution';

// 复用loader
const commonLoaders = [
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        ident: 'postcss',
        plugins: [
          require('postcss-preset-env'),
        ],
      },
    },
  },
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        //以下loader只会匹配一个
        //注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              //预设
              presets: [
                [
                  '@babel/preset-env',
                  {
                    //按需下载
                    useBuiltIns: 'usage',
                    //指定core-js版本
                    corejs: {
                      version: 3
                    },
                    //指定兼容性做到哪个版本浏览器
                    targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ],
              //开启babel缓存
              //第二次构建时，会读取之前的缓存
              cacheDirectory: true
            }
          },
          {
              exclude: /\.(js|css|less|html|jpg|png|gif)/,
              loader: 'file-loader',
              options: {
                  outputPath: 'media'
              }
          }
        ]
      }

    ],
  },
  // 生产环境下会自动压缩js代码
  mode: 'production',
  devtool: 'source-map'
};

```

### 4.5、tree shaking

**tree shaking: 去除无用代码**

+ 前提：
  + 必须使用ES6模块化 
  + 开启prodution环境
+ 作用：减少代码体积

```js
 // 在package.json中配置
      "sideEffects": false //所有代码都没有副作用（都可以进行tree shaking）
        //问题：可能会把 css / @babel/ployfill 干掉
      "sideEffects": ["*.css"]
```

### 4.6、code split

+ 可以将node_modules单独打包成一个chunk最终输出
+ 自动分析多入口chunk中，有没有公共的文件，如果有，会打包成一个单独的chunk

![image-20210820235213599](C:\Users\mygod\AppData\Roaming\Typora\typora-user-images\image-20210820235213599.png)

+ 方式一

  + 根据入口文件个数进行打包

+ 方式二

  + `webpack.config.js`中配置
    + optimization: { splitChunks:  { chunks:  'all' } }

+ 方式三

  + 懒加载

  ```js
  /* 
      通过js代码，让某个文件被单独打包成一个chunk
      import动态导入语法，能将某个文件单独打包
  */
  import(/* webpackChunkName: 'test' */'./test')
      .then(({count,mul})=>{
          //'文件加载成功'
          console.log(mul(2,4));
      }).catch((reject)=>{
          console.log('文件加载失败');
          console.log(reject);
      })
  ```

#### 1 . vue异步路由技术 ==== 异步加载 

```js
/* vue异步组件技术 */

{ path: '/home', name: 'home', component: resolve => require(['@/components/home'],resolve) },

{ path: '/index', name: 'Index', component: resolve => require(['@/components/index'],resolve) },

{ path: '/about', name: 'about', component: resolve => require(['@/components/about'],resolve) }
```

#### 2.组件懒加载方案二 路由懒加载(使用import)

```js
const 组件名=() => import('组件路径');

// 下面2行代码，没有指定webpackChunkName，每个组件打包成一个js文件。

/* const Home = () => import('@/components/home')

const Index = () => import('@/components/index')

const About = () => import('@/components/about') */

// 下面2行代码，指定了相同的webpackChunkName，会合并打包成一个js文件。

把组件按组分块

const Home = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/home')

const Index = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/index')

const About = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/about')
```

#### 3.webpack提供的require.ensure() 

```js
`vue-router`配置`路由`，使用`webpack`的`require.ensure`技术，也可以实现按需加载。 
这种情况下，多个路由指定相同的`chunkNam`e，会合并打包成一个js文件。
{ path: '/home', name: 'home', component: r => require.ensure([], () => r(require('@/components/home')), 'demo') },

{ path: '/index', name: 'Index', component: r => require.ensure([], () => r(require('@/components/index')), 'demo') },

{ path: '/about', name: 'about', component: r => require.ensure([], () => r(require('@/components/about')), 'demo-01') }


// r就是resolve
const list = r => require.ensure([], () => r(require('../components/list/list')), 'list');
// 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载 
const router = new Router({
    routes: [
        {
           path: '/list/blog',
           component: list,
           name: 'blog'
        }
    ]
})
```

### 4.6、懒加载和预加载

#### 懒加载

**懒加载其实就是延时加载，即当对象需要用到的时候再去加载。**

```js
//点击页面才会异步加载loadsh库
function getComponent(){
    ...
}

document.addEventListener('click',() => {
    getComponet().then(element => {

        docment.body.appendChild(element);
    })

})
```

##### 优点

+ 提高页面初始化的加载速度，不需要加载额外JS代码
+  前端框架的路由概念也是需要基于代码分割和路由切换代码懒加载来实现

#### 预加载

> 其实webpack的目的并不是基于CodeSplitting的优化来让网页仅在第二次加载时才提高网页加载速度，webpack与我们实际上更希望第一次用户加载网页时也可以提高渲染响应速度，这里仅仅使用split分成多个chunk其实就没用了，满足不了需求。

```js
// /*webpackxxx:xx*/  魔法注释

document.addEventListener('click',() => {
  import(/*webpackPrefetch:true*/'./click.js').then(({default:func}) => {
    func();  
  })
})
```

这里你也可以改成Preload，区别主要在于：Prefetching 是在核心代码加载完成之后带宽空闲的时候再去加载，而 Preloading 是和核心代码文件一起去加载的。

因此，使用 Prefetching 的方式去加载异步文件更合适一些，不过要注意浏览器的兼容性问题。

### 4.7、pwa

渐进式网页应用

```js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
new WorkboxWebpackPlugin.GenerateSW({
      /* 
        1.帮助serviceworker快速启动
        2.删除旧的serviceworker

        生成一个serviceworker配置文件
      */
      // clientClaim: true,
      // skipWating: true
})



/* 
    1.eslint不认识window、navigator全局变量
        解决：需要修改package.json
        "env": {
            "browser": true
        }
    2.sw代码必须运行在服务器上
        --> nodejs
        --> npm i serve -g
            serve -s build(目录)  启动服务器，将build下所有资源作为静态资源暴露
*/


//注册serviceworker
//处理兼容性问题
if('serviceWorker' in navigator){
    window.addEventListener('load',() => {
        //通过WorkboxWebpackPlugin生成js
        navigator.serviceWorker.register('./service-worker.js')
            .then(()=>{
                console.log('service注册成功');
            }).catch(()=>{
                console.log('service注册失败');
            })
    })
}
```

`webpack.config.js`中引入`workbox-webpack-plugin`，实例化对象，调用`GenerateSW`回调，生成`serviceWork`配置文件，在入口文件注册`serviceWorker`，一旦注册成功，下一次就生效，如果网络连接失败，就会从`serviceWork.js`中加载资源

### 4.8、多进程打包

**仅在耗时的loader上使用**

每个 worker 是一个单独的 node.js 进程，其开销约为 600 毫秒。还有一个进程间通信的开销。

将`thread-loader`放在某一个loader的后面，

```js
{
    test: /\.js$/,
        exclude: /node_modules/,
            use: [
                /* 
                开启多进程打包
                进程启动大概为600ms，进程通信也需要时间
                只有工作消耗时间较长，才需要多进程打包
                会根据cpu核数减一启动
              */
                {
                    loader: 'thread-loader',
                    options: {
                        // worker的数量，默认是cpu核心数
                        workers: 2,

                        // 一个worker并行的job数量，默认为20
                        workerParallelJobs: 50,

                        // 添加额外的node js 参数
                        workerNodeArgs: ['--max-old-space-size=1024'],


                        // 允许重新生成一个dead work pool
                        // 这个过程会降低整体编译速度
                        // 开发环境应该设置为false
                        poolRespawn: false,


                        //空闲多少秒后，干掉work 进程
                        // 默认是500ms
                        // 当处于监听模式下，可以设置为无限大，让worker一直存在
                        poolTimeout: 2000,

                        // pool 分配给workder的job数量
                        // 默认是200
                        // 设置的越低效率会更低，但是job分布会更均匀
                        poolParallelJobs: 50,

                        // name of the pool
                        // can be used to create different pools with elsewise identical options
                        // pool 的名字
                        //
                        name: "my-pool"
                    }
                },
                {
                    loader: 'babel-loader',
                    ....
                }
            ]
}
```

#### 预热

>为了防止在引导工作人员时出现高延迟，可以预热工作人员池。
>
>这会启动池中最大数量的工作人员并将指定的模块加载到 node.js 模块缓存中。

```js
const threadLoader = require('thread-loader');

threadLoader.warmup(
  {
      //配置
    // pool options, like passed to loader options
    // must match loader options to boot the correct pool
  },
  [
    // modules to load
    // can be any module, i. e.
    'babel-loader',
    'babel-preset-es2015',
    'sass-loader',
  ]
);
```

### 4.9、externals

```js
externals: {
    //拒绝jQuery被打包进来
    jquery: 'jQuery'
}

html中引入
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

```

### 4.10、dll

#### 1、定义webpack.dll.js，配置单独打包文件

```js

/* 
    使用dll，对某些库（三方）进行单独打包
        当运行webpack时，默认查找webpack.config.js
         --> webpack --> webpack --config webpack.dll.js
*/
const {resolve} = require('path')
const webpack =  require('webpack')

module.exports = {
    entry: {
        // 最终打包生成的[name] --> jquery
        // ['jquery'] --> 要打包的库时jquery
        jquery: ['jquery']
    },
    output:{
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash:10]'  //打包的库里面对外暴露出去的内容叫什么名字
    },
    plugins: [
        //打包生成一个 manifest.json  --> 提供映射
        new webpack.DllPlugin({
            name: '[name]_[hash:10]', //映射库的暴露的内容名称
            path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
        })
    ],
    mode: 'production'
}
```

#### 2、将三方文件单独打包

```js
webpack --config webpack.dll.js
```

#### 3、告诉webpack那些包不需要打包

```js
const webpack = require('webpack')
//告诉webpack那些库不参与打包，同时使用时的名称也得变
new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, 'dll/manifest.json')
})
```

#### 4、引入add-asset-html-webpack-plugin

> 这个插件调用的npm包名是 `add-asset-html-webpack-plugin`,经常和`html-webpack-tags-plugin`做对比。
>
> 作用其实二者相同，当我们想在跟页面打包后，插入我们特定script的引用，来达到全局变量的效果（暴露在Window下）

```js
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
//将某个文件打包输出，并在html自动引入
new AddAssetHtmlWebpackPlugin({
    filepath: resolve(__dirname, 'dll/jquery.js')
})
```

区别是
`html-webpack-tags-plugin`不会复制文件，而`add-asset-html-webpack-plugin`会将文件先复制到`dist`目录下（当然，可以配置到`dist`的那个目录），再添加一个标签。

也就是说`add-asset-html-webpack-plugin`相当于 `html-webpack-tags-plugin`再加上一个`copy-webpack-plugin`：

```js
plugins: [
  new CopyWebpackPlugin([
    { from: 'node_modules/bootstrap/dist/css', to: 'css/'},
    { from: 'node_modules/bootstrap/dist/fonts', to: 'fonts/'}
  ]),
  new HtmlWebpackTagsPlugin({
    links: ['css/bootstrap.min.css', 'css/bootstrap-theme.min.css']
  })
]
```

#### 5、webpack.ProvidePlugin

上述方式有一个问题。上述插件只是在script标签中插入脚本。本质上是挂载在window对象下。当我们想要暴露的全局变量不想在window对象下被找到（安全问题）时，应该如何去做？这里我们就用到了`webpack.ProvidePlugin`。

```js
 // 内置模块提供全局变量
new webpack.ProvidePlugin({
    csm:path.resolve(__dirname, '../src/app.bundle.js')
}),
```

## 第五章：配置详解

### 1、entry

```js
entry: 入口起点
1. string  --> './src/index.js'
打包成一个chunk，输出一个bundle文件
此时chunk的默认名称是 main

2. array  --> ['./src/index.js', './src/add.js']
多入口
所有入口文件最终只会形成一个chunk，输出只有一个bundle文件
    --> 只有在HMR功能中让html热更新生效

3. object
多入口
有几个入口文件，就形成几个chunk，输出几个bundle文件
此时chunk的名称是 key

--> 特殊用法
{
    //所有入口文件最终只形成一个chunk，输出一个bundle
    index: ['./src/index.js', './src/add.js'],
        //形成一个chunk，输出一个bundle文件
        count: './src/add.js'
}
```

### 2、output

```js
output: {
        // 文件名称（指定名称+目录）
        filename: 'js/[name].js',
        // 输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, 'build'),
        // 所有资源引入公共路径的前缀  --> 'imgs/a.jpg' --> '/imgs/a.jpg'
        publicPath: '/',
        // 非入口chunk的名称 import引入或者optimization引入
        chunkFilename: 'js/[name]_chunk.js',
        library: '[name]',  // 整个库向外暴露的变量名
        libraryTarget: 'window' // 变量名添加到哪个属性
        // libraryTarget: 'global' 
        // libraryTarget: 'commonjs' 
        // libraryTarget: 'amd' 
    }
```

### 3、module

```js
module: {
        rules: [
            //loader配置
            {
                test: /\.css$/,
                // 多个loader用use
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                // 排除node_modules下的js
                exclude: /node_modules/,
                // 只检查 src 下的 js文件
                include: resolve(__dirname, 'src'),
                // 优先执行
                // enforce: true,
                // 延后执行
                // enforce: 'post',
                // 不写 enforce 的话，是中间执行，由下至上
                // 单个lodaer用loader
                loader: 'eslint-loader',
                options: {}
            },
            {   // 以下配置只会生效一个
                oneOf: []
            }
        ]
    }
```

### 4、resolve

```js
 // 解析模块规则
    resolve: {
        // 配置解析模块路径别名
        // 优点： 简写路径  缺点： 没有提示
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        // 配置省略路径的后缀名
        extensions: ['.js', '.json', '.css'],
        // 告诉webpack 解析模块去找哪个目录
        modules: [resolve(__dirname, '../../node_modules'),'node_modules']
    }
```

### 5、devServer

```js
devServer: {
        //运行项目的目录
        contentBase: resolve(__dirname, 'build'),
        //监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
        watchContentBase: true,
        watchOptions: {
            // 忽略文件
            ignored: /node_modules/
        },
        //启动gzip压缩
        compress: true,
        //端口号
        port: 3000,
        //自动打开浏览器
        open: true,
        //开启HMR
        hot: true,
        //不显示启动服务器的日志信息
        clientLogLevel: 'none',
        //除了一些基本启动信息以外，其他内容都不要显示
        quiet: true,
        //如果出错，不全屏提示
        overlay: false,
        //服务器代理 -->  解决开发环境跨域问题
        proxy: {
            //一旦devServer(5000)服务器接收到 /api/xxx 的请求，就会把请求转发到 3000 的服务器
            './api': {
                target: 'http://localhost:3000',
                // 发送请求时，请求路径重写， 将 /api/xxx --> /xxx 
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
```

### 6、optimization

https://v4.webpack.docschina.org/plugins/terser-webpack-plugin/

https://webpack.docschina.org/plugins/terser-webpack-plugin/

```js
const TerserWebpackPlugin = require('terser-webpack-plugin')

optimization: {
        splitChunks: {
            chunks: 'all',
            // 默认值，可以不写
            /*  
             minSize: 30 * 1024, //分割的chunk最小为30kb
             maxSize: 0, //最大没有限制
             minChunks: 1, //要提取的chunk最少被引用一次
             maxAsyncRequests: 5, //按需加载时并行加载的文件的最大数量
             maxInitialRequest: 3, //入口js最大并行请求数量
             automaticNameDelimiter: '~', //名称连接符 ~
             name: true, //可以使用命名规则
             cacheGroups: {
                 // 分割chunk的组，每组为不同分割规则
                 // node_modules文件会被打包到 vendors 组的chunk中 --> vendors~xxx.js
                 // 满足上面的规则，如：大小超过30kb
                 vendors: {
                     test: /[\\/]node_modules[\\/]/,
                     // 优先级
                     priority: -10
                 },
                 default: {
                     // 要提取的chunk最少被引用2次
                     minChunks: 2,
                     // 优先级
                     priority: -30,
                     // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包
                     reuseExistingChunk: true
                 }
             } */
        },
        // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
        // 解决： 修改a文件导致b文件的hash值改变（b引用了a）
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        },
        minimizer: true,
        minimizer: [
            //配置生产环境的压缩方案： js和css
            new TerserWebpackPlugin({
                //开启多进程打包
                parallel: true,
                //开启缓存
                cache: true,
                //启用source-map
                sourceMap: true
            })
        ]
    }
```

## 第六章：webpack5

### 此版本重点关注以下内容

+ 通过持久缓存提高构建性能
+ 使用更好的算法和默认值来改善长期缓存
+ 通过更好的树摇和代码生成来改善bundle大小
+ 消除处于怪异状态的内部结构，同时在v4中实现功能而不引入任何重大更改
+ 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用v5

### 自动删除Node.js Polyfills

早期，webpack 的目标是允许在浏览器中运行大多数 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。

尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。

webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

- 尽可能尝试使用与前端兼容的模块。
- 可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。

Chunk 和模块 ID

添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

```js
chunkIds: "deterministic", moduleIds: "deterministic"
```

### Chunk ID

你可以不用使用 `import(/* webpackChunkName: "name" */ "module")` 在开发环境来为 chunk 命名，生产环境还是有必要的

webpack 内部有 chunk 命名规则，不再是以 id(0, 1, 2)命名了

### Tree Shaking

1. webpack 现在能够处理对嵌套模块的 tree shaking

```js
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from './inner';
export { inner };

// user.js
import * as module from './module';
console.log(module.inner.a);
```

在生产环境中, inner 模块暴露的 `b` 会被删除

1. webpack 现在能够多个模块之前的关系

```js
import { something } from './something';

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}
```

当设置了`"sideEffects": false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`"./something"`

1. webpack 现在能处理对 Commonjs 的 tree shaking

### Output

webpack 4 默认只能输出 ES5 代码

webpack 5 开始新增一个属性 output.ecmaVersion, 可以生成 ES5 和 ES6 / ES2015 代码.

如：`output.ecmaVersion: 2015`

**SplitChunk**

```js
// webpack4
minSize: 30000;
// webpack5
minSize: {
  javascript: 30000,
  style: 50000,
}
```

### Caching

```js
// 配置缓存
cache: {
  // 磁盘存储 filesystem/memory
  type: "filesystem",
  buildDependencies: {
    // 当配置修改时，缓存失效
    config: [__filename]
  }
}
```

缓存将存储到 `node_modules/.cache/webpack`

### 监视输出文件

之前 webpack 总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。

此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。

### 默认值

- `entry: "./src/index.js`
- `output.path: path.resolve(__dirname, "dist")`
- `output.filename: "[name].js"`

### 更多内容

[github](https://github.com/webpack/webpack)

## 第七章：进阶

### loader基本介绍和使用

loader本身是一个函数

```js
const path = require('path')

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'loader1'
            }
        ]
    },
    //loader解析规则
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    }
}
```

### loader执行顺序

**在use中，是自下往上执行，loader的js中，如果定义了pitch，则会顺序执行**

> loader **总是** 从右到左被调用。有些情况下，loader 只关心 request 后面的 **元数据(metadata)**，并且忽略前一个 loader 的结果。在实际（从右到左）执行 loader 之前，会先 **从左到右** 调用 loader 上的 `pitch` 方法

```js
module.exports = function(content, map, meta){
        console.log(111);

        // null: 有无错误，无错误就传null
        // content: 内容
        // map: map文件
        // meta: 参数信息
        this.callback(null, content, map, meta)
}

module.exports.pitch = function(){
    console.log('pitch 111');
}
```

### 同步/异步loader

```js
/* 
    同步loader
*/
// module.exports = function(content, map, data){
//     console.log(111);
//     return content
// }

module.exports = function(content, map, meta){
        console.log(111);

        // null: 有无错误，无错误就传null
        // content: 内容
        // map: map文件
        // meta: 参数信息
        this.callback(null, content, map, meta)
}


// 异步
module.exports = function(content, map, data){
    console.log(222);
    
    // 此时会等待callback调用，调用之后，其他代码才会执行
    const callback = this.async();
    setTimeout(()=>{
        callback(null, content)
    },1000)

}
```

### 获取&校验loader中的options

**需要编写校验规则.json**

```json
{
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "description": "名称~"
        }
    },
    // 是否可以追加属性
    "additionalProperties": true
}
```

```js
// 校验
const { validate } = require('schema-utils')
const schema = require('./schema.json')

module.exports = function(content, map, data){
    console.log(333);
    // 获取options
    const options = this.getOptions()

    console.log(333, options);

    // 校验options是否合法
    // 校验规则，配置，loader名称
    validate(schema, options, {
        name: 'loader3'
    })
    return content
}
```

### 自定义babel-loader

```js
const { validate } = require("schema-utils");
const babel = require('@babel/core')
const util = require('util')
const babelSchema = require('./babelSchema.json')
// babel.transform用来编译代码的方法
// 是一个普通异步方法
// util.promisify将普通异步方法转化成promise的异步方法
const transform = util.promisify(babel.transform)
module.exports = function(content, map, meta){
    // 获取loader的options配置
    const options = this.getOptions() || {}
    // 校验babel的options配置
    validate(babelSchema, options, {
        name: 'babelLoader'
    });
    
    // 创建异步
    const callback = this.async();

    // 使用babel编译代码，返回值是一个promise
    transform(content, options)
        // code 编译后代码
        .then(({code, map}) => callback(null, code, map, meta))
        .catch((e) => callback(e))
}
```

```js
 rules: [
            {
                test: /\.js$/,
                loader: 'babelLoader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            }
        ]
```

```json
{
    "type": "object",
    "properties": {
        "presets": {
            "type": "array"
        }
    },
    "addtionalProperties": true
}
```

### tapable的介绍和使用

```js
const {
	SyncHook, // 同步
	SyncBailHook, // 如果有返回值，就终止，反之继续
	SyncWaterfallHook,	//瀑布流，在这个钩子中，可以注册N个钩子，上一个钩子的返回值会给下一个钩子
	SyncLoopHook,  //循环钩子  遇到某个不返回undefined的监听函数，就重复执行
	AsyncParallelHook, // 并行执行  异步代码并行同步工作，谁先做完谁结束
	AsyncParallelBailHook,// 并行执行   如果有返回值，就终止，反之继续
	AsyncSeriesHook,	//异步串行 一个执行完另一个接着执行
	AsyncSeriesBailHook,	//   如果有返回值，就终止，反之继续
	AsyncSeriesWaterfallHook // 瀑布流
 } = require("tapable");
```

[钩子](https://webpack.docschina.org/contribute/writing-a-plugin/#synchronous-hooks)

```js
const {
    SyncHook,
    SyncBailHook,
    AsyncParallelHook,
    AsyncSeriesHook
} = require('tapable')


class Lesson {
    constructor() {
        // 初始化 hooks 容器
        this.hooks = {
            // 同步hooks，任务会依次执行
            // go: new SyncHook(['address'])
            // 一旦有返回值就会退出
            go: new SyncBailHook(['address']),

            // AsyncParallelHook 异步hooks
            // 异步并行
            // leave: new AsyncParallelHook(['name', 'age'])

            // AsyncParallelHook 异步串行
            leave: new AsyncSeriesHook(['name', 'age'])
        }
    }

    tap(){
        // 往hooks容器中注册事件/添加回调函数
        // 通过tap绑定
        this.hooks.go.tap('class031', (address) => {
            console.log('class031', address);
            return 1
        })

        this.hooks.go.tap('class040', (address) => {
            console.log('class040', address);
        })

        this.hooks.leave.tapAsync('class050', (name, age, cb) => {
            setTimeout(()=>{
                console.log('class050', name, age);
                // 代表异步任务执行完成
                cb()
            },2000)
        })

        this.hooks.leave.tapPromise('class060', (name, age, cb) => {
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    console.log('class060', name, age);
                    // 代表异步任务执行完成
                    resolve()
                },1000)
            })
        })

    }

    start(){
        // 触发
        this.hooks.go.call('北京');
        this.hooks.leave.callAsync('张三', 19, function () {
            // 代表所有leave容器中的hook触发完了，才触发
            console.log('所有leave容器中的钩子执行完毕');
        });
    }
}

let l = new Lesson();
l.tap(); //注册两个监听函数(事件)
l.start(); //启动钩子
```

### complier中的hooks使用

[complier](https://webpack.docschina.org/api/compiler-hooks/)

[自定义plugin](https://webpack.docschina.org/concepts/plugins/)

```js
class Plugin1 {
    apply(complier){
        // 输出 asset 到 output 目录之前执行
        complier.hooks.emit.tap('Plugin1', (compilation) => {
            console.log('emit.tap触发了');
        })
        complier.hooks.emit.tapAsync('Plugin1', (compilation, cb) => {
            setTimeout(()=>{
                console.log('emit.tapAsync触发了');
                cb()
            },1000)
        })

        complier.hooks.emit.tapPromise('Plugin1', (compilation) => {
             return new Promise((resolve)=>{
                setTimeout(()=>{
                    console.log('emit.tapPromise触发了');
                    resolve()
                },1000)
             })
        })

        // 输出 asset 到 output 目录之后执行
        complier.hooks.afterEmit.tap('Plugin1', (compilation) => {
            console.log('afterEmit.tap触发了');
        })

        // 在 compilation 完成时执行  stats 文件信息
        complier.hooks.done.tap('Plugin1', (stats) => {
            console.log('done.tap触发了');
        })
    }


}

module.exports = Plugin1
```

```js
const Plugin1 = require('./plugins/Plugins1')

module.exports = {
    plugins: [
        new Plugin1()
    ],
    mode: 'production'
}
```

### compilation的介绍和使用

```js

const fs = require('fs')
const util = require('util')
const path = require('path')

const webpack = require('webpack')
const { RawSource } = webpack.sources

// 将fs.readFile方法变成基于promise风格的异步方法
const readFile = util.promisify(fs.readFile)

class Plugin2 {
    apply(compiler){
        // 初始化 compilation 钩子
        compiler.hooks.thisCompilation.tap('Plugin2', (compilation) => {
            // debugger
            // console.log(compilation);

            // 为 compilation 创建额外 asset
            compilation.hooks.additionalAssets.tapAsync('Plugin2', async(cb) => {
                // debugger
                // console.log(compilation);

                const content = 'hello plugin2';

                // 往要输出资源中，添加一个a.txt
                compilation.assets['a.txt'] = {
                    // 文件大小
                    size(){
                        return content.length
                    },
                    // 文件内容
                    source(){
                        return content
                    }
                }

                const data = await readFile(path.resolve(__dirname, 'b.txt'))

                // 将data转为webpack格式的文件
                // compilation.assets['b.txt'] = new RawSource(data)
                //                   ||
                compilation.emitAsset('b.txt', new RawSource(data))
                cb();
            })
        })

        
    }
}

module.exports = Plugin2
```



























