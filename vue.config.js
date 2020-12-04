module.exports = {
    publicPath: './',
    devServer: {
        port: '8080',
        proxy: {
            '/url': {
                target: 'https://www.zixinhui.com',
                ws: true, // 是否代理  websocket
                secure: false, //是否验证SSH书
                changeOrigin: true, // 是否将主机头的源更改为目标URL
                // 重写路径
                pathRewrite: {
                    '^/url': '',
                },
            },
        },
        // proxy: {
        //     '/url': {
        //         target: 'https://www.maxiangdong.com',
        //         ws: true,
        //         changeOrigin: true,
        //         secure: false,
        //         pathRewwrite: {
        //             '^/url': '',
        //         }
        //     }
        // }
    },
};