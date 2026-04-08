///本脚本为绘制固定的UI图片
const stage_draw_ui_info = $gameVariables.value(2);

///绘制背景的阴影层
const bg_shadow_id = stage_draw_ui_info.bg_shadow;
const bg_shadow_name = "bg/bg_shadow";
// ///其混合模式为正片叠底
$gameScreen.showPicture(bg_shadow_id, bg_shadow_name, 0, 0, 0, 100, 100, 255, 2);

///绘制地图框
const mapframe_id = stage_draw_ui_info.mapframe;
const mapframe_name = "mapframe";
const mapframe_x = 960;
const mapframe_y = 450;
$gameScreen.showPicture(mapframe_id, mapframe_name, 1, mapframe_x, mapframe_y, 100, 100, 255, 0);

///绘制顶部UI框
const topframe_id = stage_draw_ui_info.topframe;
const topframe_name = "topframe";
const topframe_x = 0;
const topframe_y = 0;
$gameScreen.showPicture(topframe_id, topframe_name, 0, topframe_x, topframe_y, 100, 100, 255, 0);

///绘制对话框
const dialog_frame_id = stage_draw_ui_info.dialog_frame;
const dialog_frame_name = "dialog_frame";
const dialog_frame_x = 960;
const dialog_frame_y = 650;
$gameScreen.showPicture(dialog_frame_id, dialog_frame_name, 1, dialog_frame_x, dialog_frame_y, 100, 100, 255, 0);

///绘制设置图标
const icon_setting_id = stage_draw_ui_info.icon_setting;
const icon_setting_name = "icon/setting";
//在屏幕的右上角
const icon_setting_x = Graphics.width - 115;
const icon_setting_y = 55;
$gameScreen.showPicture(icon_setting_id, icon_setting_name, 1, icon_setting_x, icon_setting_y, 100, 100, 255, 0);

///绘制队伍图标
const icon_party_id = stage_draw_ui_info.icon_party;
const icon_party_name = "icon/party";
const icon_party_x = Graphics.width - 320;
const icon_party_y = 55;
$gameScreen.showPicture(icon_party_id, icon_party_name, 1, icon_party_x, icon_party_y, 100, 100, 255, 0);

///绘制地图图标
const icon_map_id = stage_draw_ui_info.icon_map;
const icon_map_name = "icon/map";
const icon_map_x = Graphics.width - 525;
const icon_map_y = 55;
$gameScreen.showPicture(icon_map_id, icon_map_name, 1, icon_map_x, icon_map_y, 100, 100, 255, 0);