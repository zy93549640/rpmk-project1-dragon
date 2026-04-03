///本脚本为根据关卡ID刷新背景图片

const stage_draw_ui_info = $gameVariables.value(2);

// ////获取变量ID3，即关卡ID的值
const stage_id = $gameVariables.value(3);

///绘制背景
const bg_name ="bg/bg" + stage_id;
$gameScreen.showPicture(stage_draw_ui_info.bg, bg_name, 0, 0, 0, 100, 100, 255, 0);

///绘制中心关卡图片
const bg_small_id = stage_draw_ui_info.bg_small;
const bg_small_name = "bg/bg" + stage_id + "_small";
const bg_small_x = 960;
const bg_small_y = 450;
$gameScreen.showPicture(bg_small_id, bg_small_name, 1, bg_small_x, bg_small_y, 100, 100, 255, 0);

///根据关卡ID设置战斗背景
const battle_bg_name = "bg"+stage_id;
$gameMap.changeBattleback(battle_bg_name, "");
