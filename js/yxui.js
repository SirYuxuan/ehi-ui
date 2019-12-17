/**
 * 系统核心的工具方法
 */
let util = {
    /**
     * 是否开启调试日志
     */
    DEBUG: false,
    /**
     * 检测指定的URL是否可以访问
     * @param url url
     * @param callback 成功回调
     * @param errorCallback 失败回调
     */
    checkUrl(url, callback, errorCallback) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    callback()
                } else {
                    errorCallback(`URL访问失败 HttpCode:${xmlHttp.status}`)
                }
            }
        }
        xmlHttp.open("GET", `${url}`, true)
        xmlHttp.send()
    },
    /**
     * 加载指定JS至页面
     * @param url js路径
     * @param callback 成功回调
     * @param errorCallback 失败回调
     */
    loadJs(url, callback, errorCallback) {
        //ajax判断url是否存在
        util.checkUrl(url, () => {
            let script = document.createElement('script');
            script.type = "text/javascript"
            if (typeof (callback) != "undefined") {
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null
                            callback()
                        }
                    }
                } else {
                    script.onload = function () {
                        callback()
                    }
                }
            }
            script.src = url
            document.body.appendChild(script)
        }, (errorText) => {
            errorCallback(errorText)
        })
    },
    /**
     * 系统日志对象
     */
    log: {
        /**
         * 日志输出前缀
         */
        VER: 'YxUI-Log-',
        /**
         * info级别日志
         * @param str 日志内容
         */
        info(str) {
            console.info(`${this.VER}Info: ${str}`)
        },
        /**
         * error级别日志
         * @param str 日志内容
         */
        error(str) {
            console.error(`${this.VER}Error: ${str}`)
        },
        /**
         * warn级别日志
         * @param str 日志内容
         */
        error(str) {
            console.warn(`${this.VER}Warn: ${str}`)
        },
        /**
         * debug级别日志
         * @param str 日志内容
         */
        debug(str) {
            if(util.DEBUG){
                console.info(`${this.VER}Debug: ${str}`)
            }
        }
    }
}
/**
 * YxUI 核心对象
 */
window.yxui = {
    /**
     * 设置debug模式
     * @param debug 是否开启debug
     */
    setDebug(debug){
        util.DEBUG = debug
    },
    /**
     * 此方法为程序主入口,模块可以为空,模块参数支持直接传递function回调
     * @param modules 引入的模块,仅支持数组
     * @param callback 所有模块加载完成后回调
     */
    useModule(modules, callback) {
        //TODO 这里需要创建加载层,避免页面加载的时候样式跳动

        if (typeof modules !== 'array' && typeof callback !== 'function') {
            throw '参数不正确,参数必须为数组,函数'
        }
        if (typeof modules === 'function') {
            modules()
            return
        }
        util.log.debug('开始加载模块')
        let moduleNum = modules.length;
        let total = moduleNum
        for (let i = 0; i < moduleNum; i++) {
            let module = modules[i]
            util.loadJs(`./js/module/${module}.js`, () => {
                eval(`this.${module} = ${module}`)
                util.log.debug(`${module} 模块加载完毕`)
                if ((i + 1) === total) {
                    util.log.debug('所有模块加载完毕')
                    callback()
                }
            }, (errorText) => {
                total--
                util.log.error(`${module} 模块加载失败 失败原因:${errorText}`)
            })
        }
    }
}