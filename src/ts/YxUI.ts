import {Util} from "./Util"
globalThis.YxUI = {
    useModule(modules, callback) {
        if (typeof modules !== 'object' && typeof callback !== 'function') {
            throw '参数不正确,参数必须为数组,函数'
        }
        if (typeof modules === 'function') {
            modules()
            return
        }
        Util.Log.debug('开始加载模块')
        let moduleNum = modules.length;
        let total = moduleNum
        for (let i = 0; i < moduleNum; i++) {
            let module = modules[i]

        }
    }
}