// 两个api的方法名和参数都必须一致
/**
 * 高德api
 * @type {{centerAndZoom: GaoDeApi.centerAndZoom}}
 */
export default {
    ak: '4cf1a5877a17a44342fd259edc4c9c9a',
    /**
     * 加载地图js
     */
    loadMapJs: function () {
        return new Promise(function (resolve, reject) {
            try {
                console.log('AMap is defined:', AMap === undefined || AMap)
                resolve(AMap)
            } catch (e) {
                window.initAMap = function () {
                    resolve(AMap)
                }
                let script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = 'https://webapi.amap.com/maps?v=1.4.10&key=' + this.ak + '&callback=initAMap'
                script.onerror = reject
                document.body.appendChild(script)
            }
        })
    },

    /**
     * 初始化画地图,参数都必传,优先取cityname为中心点
     * @param containerId div容器ID
     * @param zoom
     * @param cityname
     * @param lng 经度
     * @param lat 纬度
     */
    initMap: function (containerId, zoom, cityname, lng, lat) {
        console.log(containerId + ',' + zoom + ',' + cityname + ',' + lng + ',' + lat)
        let map = new AMap.Map(containerId, {
            isHotspot: false
        })
        AMap.plugin(['AMap.ToolBar', 'AMap.Geocoder', 'AMap.Heatmap'], function () {
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            map.addControl(new AMap.ToolBar({
                // 简易缩放模式，默认为 false
                liteStyle: true
            }))
        })
        if (!cityname) {
            map.setCenter(new AMap.LngLat(Number(lng), Number(lat)))
        } else {
            map.setCity(cityname, function () {
                map.setZoom(zoom)
            })
        }
        return map
    },
    /**
     * 销毁地图
     * @param map
     */
    destoryMap: function (map) {
        map.destroy()
    },
    /**
     * 切换城市和zoom,参数都必传
     * @param map
     * @param cityname
     * @param zoom
     */
    centerAndZoom: function (map, cityname, zoom) {
        map.setCity(cityname, function () {
            map.setZoom(zoom)
        })
    }
}
