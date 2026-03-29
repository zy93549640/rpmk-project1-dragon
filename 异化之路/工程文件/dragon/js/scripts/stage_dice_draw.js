///获取变量ID103
const dice_generated_group = $gameVariables.value(103);
///计算组内有多少个值
const dice_generated_group_length = dice_generated_group.length;
///获取屏幕的宽高
const screenWidth = Graphics.boxWidth || 1920;
const screenHeight = Graphics.boxHeight || 1080;
const dice_gap_dist = 50;///每个骰子的间隔
const dice_size = 100;///每个骰子的尺寸
const dice_dist = dice_size + dice_gap_dist;///每个骰子中心点的横向总距离
///计算每个骰子的中心坐标，骰子的纵坐标统一为底部高度往上100，
// 各个骰子的横坐标则根据骰子的数量决定，当骰子数量N为奇数，则中心骰子在屏幕中心，左右平均分布(N-1)/2,
// 若N为偶数，则所有骰子平均分布在两侧，两侧的骰子数量为N/2
////按照以上的逻辑，先从左至右生成各个骰子的中心坐标
const dice_center_x = [];
const dice_center_y = screenHeight-100;
for (let i = 0; i < dice_generated_group_length; i++) {
    if (dice_generated_group_length % 2 == 0) {
        dice_center_x.push(screenWidth/2 - (dice_generated_group_length/2)*dice_dist + i*dice_dist - dice_size/2);
    } else {
        dice_center_x.push(screenWidth/2 - (dice_generated_group_length-1)/2*dice_dist + i*dice_dist - dice_size/2);
    }
}
console.log(dice_center_x);
console.log(dice_center_y);
