//获取屏幕宽高
const screenWidth = Graphics.boxWidth || 1920;
const screenHeight = Graphics.boxHeight || 1080;
///获取屏幕中心点
const screenCenterX = screenWidth / 2;
const screenCenterY = screenHeight / 2;
///设定大富翁棋盘的外圈列数和行数和内圈列数和行数
const outerCols = 5;
const outerRows = 5;
const innerCols = 3;
const innerRows = 3;
///设定每个格子的边长
const cellWidth = 120;
///设定每个格子的间隔
const gridDist = 5;
///计算正中央正上方的格子的中心坐标
const centerTopX = screenCenterX;
const centerTopY = screenCenterY - (outerRows -1) / 2 * (cellWidth + gridDist);
console.log("正中央正上方的格子的中心坐标为：",centerTopX, centerTopY);
///设定数组pos_x和pos_y,用于存储每个点的坐标
const pos_x = [];
const pos_y = [];
///从正中央正上方的格子开始，顺时针计算每个点的坐标，将坐标存储到pos_x和pos_y中
const step = cellWidth + gridDist; // 每个格子之间的步长

// 从顶部中间开始（centerTopX, centerTopY）
let currentX = centerTopX;
let currentY = centerTopY;

// 0. 起点：中心点
pos_x.push(currentX);
pos_y.push(currentY);

// 1. 顶部右测：从中心点到右上角（2个格子）
for (let i = 0; i < (outerCols-1)/2; i++) {
    currentX += step;
    pos_x.push(currentX);
    pos_y.push(currentY);
}

// 2. 右列：从右上角下方开始，到右下角（4个格子）
for (let i = 0; i < (outerRows-1); i++) {
    currentY += step;
    pos_x.push(currentX);
    pos_y.push(currentY);
}

// 3. 底部行：从右下角左侧开始，向左到左下角（4个格子）
for (let i = 0; i < (outerCols-1); i++) {
    currentX -= step;
    pos_x.push(currentX);
    pos_y.push(currentY);
}

// 4. 左列：从左下角上方开始，向上到左上角（4个格子）
for (let i = 0; i < (outerRows-1); i++) {
    currentY -= step;
    pos_x.push(currentX);
    pos_y.push(currentY);
}

// 5. 顶部行：中心点左侧的格子
for (let i = 0; i < ((outerCols-1)/2-1); i++) {
    currentX += step;
    pos_x.push(currentX);
    pos_y.push(currentY);
    
}

///把pos_x和pos_y代入变量ID101和102
$gameVariables.setValue(101, pos_x);
$gameVariables.setValue(102, pos_y);
console.log($gameVariables.value(101));
console.log($gameVariables.value(102));