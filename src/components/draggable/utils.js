export const overLapArea = function (selfRect, targetRect) {
    let leftTopX,leftTopY // 重叠区域的左上角点
    leftTopX = selfRect.left >= targetRect.left ? selfRect.left : targetRect.left
    leftTopY = selfRect.top <= targetRect.top ? selfRect.top : targetRect.top
    console.log('self左上角点,x:' + selfRect.left + ',y:' + selfRect.top)
    console.log('target左上角点,x:' + targetRect.left + ',y:' + targetRect.top)
    console.log('左上角,x:' + leftTopX + ',y:' + leftTopY)
    let rightBottomX,rightBottomY // 重叠区域的右下角点
    rightBottomX = selfRect.left + selfRect.width <= targetRect.left + targetRect.width ? selfRect.left  + selfRect.width : targetRect.left + targetRect.width
    rightBottomY = selfRect.top + selfRect.height >= targetRect.top + targetRect.height ? selfRect.top + selfRect.height : targetRect.top + targetRect.height
    console.log('self右下角点,x:' + (selfRect.left + selfRect.width) + ',y:' + (selfRect.top + selfRect.height))
    console.log('target右下角点,x:' + (targetRect.left + targetRect.width) + ',y:' + (targetRect.top + targetRect.height))
    console.log('右下角,x:' + rightBottomX + ',y:' + rightBottomY)
    console.log('=====================================================')

    if(rightBottomX > leftTopX && rightBottomY < leftTopY){
        return (leftTopY - rightBottomY) * (rightBottomX - leftTopX)
    }else{
        return 0
    }
}