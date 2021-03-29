import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// gzip压缩  https://github.com/anncwb/vite-plugin-compression/blob/main/README.zh_CN.md
import viteCompression from 'vite-plugin-compression'
// 按需引入组件
// import styleImport from "vite-plugin-style-import";
// import vitePluginImp from 'vite-plugin-imp'
// @ts-ignore
import path from 'path'
// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        vue(),
        viteCompression({ deleteOriginFile: false }),
        /*  vitePluginImp({
            libList: [
                // {
                //     libName: 'vant',
                //     style(name) {
                //         if (/CompWithoutStyleFile/i.test(name)) {
                //             // This will not import any style file
                //             return false
                //         }
                //         return `vant/es/${name}/index.css`
                //     },
                // },
                {
                    libName: 'ant-design-vue',
                    style(name) {
                        if (/popconfirm/.test(name)) {
                            // support multiple style file path to import
                            return ['ant-design-vue/es/${name}/style/index.css', 'ant-design-vue/es/popover/style/index.css']
                        }
                        return `ant-design-vue/es/${name}/style/index.css`
                    },
                },
                // {
                //     libName: 'element-plus',
                //     style: (name) => {
                //         return `element-plus/lib/theme-chalk/${name}.css`
                //     },
                // },
            ],
        }), */
        // styleImport({
        //     libs: [
        //         {
        //             libraryName: "ant-design-vue",
        //             esModule: true,
        //             resolveStyle: (name) => {
        //                 return `ant-design-vue/es/${name}/style/css`;
        //             },
        //         },
        //     ],
        // }),
    ],
    // 基础路径
    base: '/vite2v3/',
    resolve: {
        alias: {
            // @ts-ignore
            '@': path.resolve(__dirname, 'src'),
            // @ts-ignore
            comps: path.resolve(__dirname, 'src/components'),
        },
    },
    // 开发环境服务配置
    server: {
        port: 8090,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/image-service/, "/image-service/"),
            },
        },
    },
    // 打包配置
    build: {
        assetsDir: 'static',
        outDir: 'vite2v3',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
})
