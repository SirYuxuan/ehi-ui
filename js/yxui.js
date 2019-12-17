window.yxui = {
    form: undefined,
    check(url, callback, errorCallback) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                callback()
            } else if(xmlHttp.readyState === 4 && xmlHttp.status !== 200){
                errorCallback()
            }
        }
        xmlHttp.open("GET", `${url}`, true)
        xmlHttp.send()
    },
    loadJs(url, callback, errorCallback) {
        //ajax判断url是否存在
        this.check(url, () => {
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
        }, () => {
            console.log(`模块加载失败 URL:${url}`)
            errorCallback()
        })

    },
    useModule(modules, callback) {
        if (typeof modules !== 'array' && typeof callback !== 'function') {
            throw '参数不正确,参数必须为数组,函数'
        }
        if (typeof modules === 'function') {
            modules()
            return
        }
        console.log('开始加载模块')
        let moduleNum = modules.length;
        let total = moduleNum
        for (let i = 0; i < moduleNum; i++) {
            let module = modules[i]
            this.loadJs(`./js/module/${module}.js`, () => {
                eval(`this.${module} = ${module}`)
                if ((i + 1) === total) {
                    console.log(`${module} 模块加载完毕`)
                    callback()
                }
            }, () => {
                total--
            })
        }

    }
}