///本脚本为根据关卡ID刷新关卡名称，并进行文字绘制
const stage_draw_ui_info = $dataUIinfo.stage;

const stageName = $dataStageNames;

const stage_id = $gameVariables.value(3);
const stage_name = stageName[stage_id];
const stage = $gameVariables.value(5);////关卡阶段

const show_info = "第" + stage + "关："+ stage_name;

////绘制关卡名称
const map_id = stage_draw_ui_info.map_name;
const map_x = 960;
const map_y = 55;
TextPicture.setText(show_info);
$gameScreen.showPicture(map_id, "", 1, map_x, map_y, 120, 120, 255, 0);
