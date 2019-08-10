import vue from '../main'

export default {
    /**
     * 普通提示消息
     * @param msg
     */
    messageInfo (msg) {
        vue.$message(msg)
    },

    /**
     * 成功提示消息
     * @param msg
     */
    messageSuccess (msg) {
        vue.$message({message: msg, type: 'success'})
    },

    /**
     * 警告提示消息
     * @param msg
     */
    messageWarn (msg) {
        vue.$message({message: msg, type: 'warning'})
    },

    /**
     * 错误提示消息
     * @param msg
     */
    messageError (msg) {
        vue.$message.error(msg)
    },

    /**
     * 普通通知消息
     * @param msg
     */
    notifyInfo (msg) {
        vue.$notify.info({title: '消息', message: msg})
    },

    /**
     * 成功通知消息
     * @param msg
     */
    notifySuccess (msg) {
        vue.$notify({title: '成功', message: msg, type: 'success'})
    },

    /**
     * 警告通知消息
     * @param msg
     */
    notifyWarn (msg) {
        vue.$notify({title: '警告', message: msg, type: 'warning'})
    },

    /**
     * 错误通知消息
     * @param msg
     */
    notifyError (msg) {
        vue.$notify.error({title: '错误', message: msg})
    },

    /**
     * 普通弹框消息
     * @param msg
     */
    alertInfo (msg) {
        vue.$msgbox({title: '提示', message: msg, type: 'info'})
    },

    /**
     * 成功弹框消息
     * @param msg
     */
    alertSuccess (msg) {
        vue.$msgbox({title: '成功', message: msg, type: 'success'})
    },

    /**
     * 警告弹框消息
     * @param msg
     */
    alertWarn (msg) {
        vue.$msgbox({title: '警告', message: msg, type: 'warning'})
    },

    /**
     * 错误弹框消息
     * @param msg
     */
    alertError (msg) {
        vue.$msgbox({title: '错误', message: msg, type: 'error'})
    },

    /**
     * 确认提示框
     * @param msg
     * @param confirmCallBack
     * @param cancelCallBack
     */
    confirmInfo (msg, confirmCallBack, cancelCallBack) {
        if (!cancelCallBack) {
            cancelCallBack = function () {}
        }
        vue.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            type: 'warning'
        }).then(() => {
            confirmCallBack()
        }).catch(() => {
            cancelCallBack()
        })
    },

  /**
   * 返回上级
   */
  goBack () {
    vue.$router.back()
  }
}
