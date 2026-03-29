////获取变量ID101和102
const pos_x = $gameVariables.value(101);
const pos_y = $gameVariables.value(102);
///绘制大富翁棋盘
///获取格子的底图，这里暂定为grid.png
const pic_name = "grid";
///绘制格子
const pic_id_start = 81;
for (let i = 0; i < pos_x.length; i++) {
    const x = pos_x[i];
    const y = pos_y[i];
    /////用$gameScreen.showPicture方法绘制格子
    // 参数说明：pictureId(1-100), name(图片名), origin(0=左上角/1=中心), x, y, scaleX(100=100%), scaleY(100=100%), opacity(0-255), blendMode(0=正常)
    // 使用 i+1 作为图片ID，确保每个格子有唯一的ID（最多支持100个格子）
    $gameScreen.showPicture(
        i + pic_id_start,        // pictureId: 从1开始，每个格子递增
        pic_name,     // name: 图片文件名（grid）
        1,            // origin: 1表示以中心点为原点
        x,            // x: 格子的X坐标
        y,            // y: 格子的Y坐标
        100,          // scaleX: 100%缩放
        100,          // scaleY: 100%缩放
        255,          // opacity: 完全不透明
        0             // blendMode: 0=正常混合模式
    );
}