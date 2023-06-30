/**
 * 绘制皮肤
 * @param canvasWidth 宽
 * @param canvasHeight 高
 * @param img 皮肤图片路径
 * @param skinModel 皮肤模型 ( Alex or Steve )
 * @returns {Promise<unknown>}
 */
export function canvasToImg(canvasWidth, canvasHeight, img, skinModel) {
    const canvas = document.createElement('canvas')
    canvas.height = canvasHeight
    canvas.width = canvasWidth
    canvas.dataset.skin = img
    canvas.dataset.model = skinModel === 'Alex' ? 'slim' : 'fat'

    return skinRender.skin3d(canvas).then(resolve => {
        return resolve.base64
    })
}