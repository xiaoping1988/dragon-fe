// 两个api的方法名和参数都必须一致
/**
 * 百度api
 * @type {{centerAndZoom: BaiDuApi.centerAndZoom}}
 */
export default {
    ak: 'nZVpgxBGRxCHTiznnR2d5kPK',
    /**
     * 加载地图js
     */
    loadMapJs: function () {
        return new Promise(function (resolve, reject) {
            try {
                console.log('BMap is defined:', BMap === undefined || BMap)
                resolve(BMap)
                this.loadBaiDuHeatmapOverlay()
                this.loadBaiDuDrawingManager()
                this.loadBaiDuGeoUtils()
            } catch (e) {
                window.initBMap = function () {
                    resolve(BMap)
                    this.loadBaiDuHeatmapOverlay()
                    this.loadBaiDuDrawingManager()
                    this.loadBaiDuGeoUtils()
                }
                let script = document.createElement('script')
                script.type = 'text/javascript'
                script.src = 'https://api.map.baidu.com/api?v=2.0&ak=' + this.ak + '&callback=initBMap'
                script.onerror = reject
                document.body.appendChild(script)
            }
        })
    },
    /**
     * 加载百度地图热力图
     */
    loadBaiDuHeatmapOverlay: function () {
        let loaded = false
        try {
            loaded = (BMapLib && BMapLib.HeatmapOverlay)
        } catch (e) {
            loaded = false
        }
        if (!loaded) {
            console.log('BMapLib.HeatmapOverlay loading!')
            let script2 = document.createElement('script')
            script2.type = 'text/javascript'
            script2.src = 'https://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js'
            document.body.appendChild(script2)
        } else {
            console.log('BMapLib.HeatmapOverlay is loaded!')
        }
    },
    /**
     * 加载百度地图画图功能
     */
    loadBaiDuDrawingManager: function () {
        let loaded = false
        try {
            loaded = (BMapLib && BMapLib.DrawingManager)
        } catch (e) {
            loaded = false
        }
        if (!loaded) {
            console.log('BMapLib.DrawingManager loading!')
            let script2 = document.createElement('script')
            script2.type = 'text/javascript'
            script2.src = 'https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js'
            document.body.appendChild(script2)
            let link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = 'https://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css'
            document.body.appendChild(link)
        } else {
            console.log('BMapLib.DrawingManager is loaded!')
        }
    },
    /**
     * 加载百度地图geo工具类
     */
    loadBaiDuGeoUtils: function () {
        let loaded = false
        try {
            loaded = (BMapLib && BMapLib.GeoUtils)
        } catch (e) {
            loaded = false
        }
        if (!loaded) {
            console.log('BMapLib.GeoUtils loading!')
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = 'https://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js'
            document.body.appendChild(script)
        } else {
            console.log('BMapLib.GeoUtils is loaded!')
        }
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
        let map = new BMap.Map(containerId, {enableMapClick: false})            // 创建Map实例
        let center = cityname
        if (!center) {
            center = new BMap.Point(Number(lng), Number(lat))
        }
        map.centerAndZoom(center, zoom)
        map.enableScrollWheelZoom()
        map.clearOverlays()
        map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM}))
        return map
    },
    /**
     * 销毁地图
     * @param map
     */
    destoryMap: function (map) {
        map.clearOverlays()
        let container = map.getContainer()
        container.innerHTML = ''
    },
    /**
     * 切换城市和zoom,参数都必传
     * @param map
     * @param cityname
     * @param zoom
     */
    centerAndZoom: function (map, cityname, zoom) {
        map.centerAndZoom(cityname, zoom)
    }
}
