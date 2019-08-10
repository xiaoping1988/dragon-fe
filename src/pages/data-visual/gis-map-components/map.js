import AMapApi from './gaode/AMapApi'
import BMapApi from './baidu/BMapApi'
export default {
  server: {
    BAIDU: {
      code: 'BAIDU',
      name: '百度',
      api: BMapApi
    },
    GAODE: {
      code: 'GAODE',
      name: '高德',
      api: AMapApi
    }
  },
  /**
   * 加载地图js
   */
  loadMapJs: function (server) {
    console.log('加载地图js:' + server)
    return this.server[server].api.loadMapJs()
  },
  /**
   * 初始化画地图,参数都必传,优先取cityname为中心点
   * @param containerId div容器ID
   * @param server
   * @param zoom
   * @param cityname
   * @param lng 经度
   * @param lat 纬度
   */
  initMap: function (containerId, server, zoom, cityname, lng, lat) {
    let map = this.server[server].api.initMap(containerId, zoom, cityname, lng, lat)
    map.MAP_SERVER = server
    return map
  },
  /**
   * 获取地图的api对象
   * @param map
   */
  getApi: function (map) {
    return this.server[map.MAP_SERVER].api
  },
  /**
   * 销毁地图
   * @param map
   */
  destoryMap: function (map) {
    this.getApi(map).destoryMap(map)
  },
  /**
   * 切换城市和zoom,参数都必传
   * @param map
   * @param mapServer
   * @param cityname
   * @param zoom
   */
  centerAndZoom: function (map, cityname, zoom) {
    this.getApi(map).centerAndZoom(map, cityname, zoom)
  }
}
