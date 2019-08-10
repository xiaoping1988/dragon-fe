import VueGlobal from './vueGlobal'
import Layouts from '../layouts'
import CommonComponent from '../components'

const Components = [Layouts, CommonComponent]

export default {
    install (Vue) {
        Vue.prototype.$goBack = () => { VueGlobal.goBack() }

        // 消息提示
        Vue.prototype.$messageInfo = (msg) => { VueGlobal.messageInfo(msg) }
        Vue.prototype.$messageSuccess = (msg) => { VueGlobal.messageSuccess(msg) }
        Vue.prototype.$messageWarn = (msg) => { VueGlobal.messageWarn(msg) }
        Vue.prototype.$messageError = (msg) => { VueGlobal.messageError(msg) }

        // 通知提示
        Vue.prototype.$notifyInfo = (msg) => { VueGlobal.notifyInfo(msg) }
        Vue.prototype.$notifySuccess = (msg) => { VueGlobal.notifySuccess(msg) }
        Vue.prototype.$notifyWarn = (msg) => { VueGlobal.notifyWarn(msg) }
        Vue.prototype.$notifyError = (msg) => { VueGlobal.notifyError(msg) }

        // 弹框提示
        Vue.prototype.$alertInfo = (msg) => { VueGlobal.alertInfo(msg) }
        Vue.prototype.$alertSuccess = (msg) => { VueGlobal.alertSuccess(msg) }
        Vue.prototype.$alertWarn = (msg) => { VueGlobal.alertWarn(msg) }
        Vue.prototype.$alertError = (msg) => { VueGlobal.alertError(msg) }

        // 确认提示
        Vue.prototype.$confirmInfo = (msg, ok, cancel) => { VueGlobal.confirmInfo(msg, ok, cancel) }

        /**
         * 统一处理promise catch的错误
         * @param error 错误信息
         */
        Vue.prototype.$handleError = (error) => { console.warn(error) }

        Components.forEach(c => {
            // 注册全局组件
            Object.keys(c).forEach((key) => {
                Vue.component('D' + key, c[key])
            })
        })

    }
}
