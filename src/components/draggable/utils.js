export const overLapArea = function (selfRect, targetRect) {

    let x11 = selfRect.left
    let x12 = selfRect.right
    let y11 = selfRect.top
    let y12 = selfRect.bottom

    let x21 = targetRect.left
    let x22 = targetRect.right
    let y21 = targetRect.top
    let y22 = targetRect.bottom

    if (y22 <= y11 || y21 >= y12 || x22 <= x11 || x21 >= x12) { // 没有交集
        return 0
    } else {
        let width = Math.min(x12, x22) - Math.max(x11, x21)
        let height = Math.min(y12, y22) - Math.max(y11, y21)
        return width * height
    }
}

export const rectArea = function (rect) {
    return rect.width * rect.height
}