/**
 * 系统核心工具方法
 */
let Util = {
    //是否开启调试模式
    DEBUG: false,
    /**
     * 系统日志对象
     */
    Log: {
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
        warn(str) {
            console.warn(`${this.VER}Warn: ${str}`)
        },
        /**
         * debug级别日志
         * @param str 日志内容
         */
        debug(str) {
            if (this.DEBUG) {
                console.info(`${this.VER}Debug: ${str}`)
            }
        }
    }

}
export {Util}