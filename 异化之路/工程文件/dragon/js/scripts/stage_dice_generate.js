const dice_generate_num = 6;////默认为3
/////以后这里再加入判定要生成多少个骰子的特殊逻辑，有些被动可能不止这么多骰子
const dice_generated_group = [];
/////生成3个随机的骰子，骰子分前进与后退两种，分别对应go_x 和 back_x 两种后缀
for (let i = 0; i < dice_generate_num; i++) {
    ////生成dice_number，范围为1-6
    const dice_number = Math.randomInt(6) + 1;
    ////生成dice_type，范围为0-1
    const dice_type = Math.random();
    if (dice_type < 0.5) {
        dice_generated_group.push("go_"+dice_number);
    } else {
        dice_generated_group.push("back_"+dice_number);
    }
}
console.log(dice_generated_group);
////将dice_generated_group写入变量ID103
$gameVariables.setValue(103, dice_generated_group);