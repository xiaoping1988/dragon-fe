import DsManage from './ds-manage'
import DbManage from './db-manage'
import TbManage from './tb-manage'
import ColManage from './col-manage'

export default {
    bootstrap (mock) {
        DsManage.bootstrap(mock)
        DbManage.bootstrap(mock)
        TbManage.bootstrap(mock)
        ColManage.bootstrap(mock)
    }
}