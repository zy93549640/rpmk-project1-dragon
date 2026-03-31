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


// ///绘制角色底框
const character_bottom_frame_id = stage_draw_ui_info.character_bottom_frame;
const character_bottom_frame_name = "character_bottom_frame";
const character_bottom_frame_x = 960;
const character_bottom_frame_y = 930;
$gameScreen.showPicture(character_bottom_frame_id, character_bottom_frame_name, 
    1, character_bottom_frame_x, character_bottom_frame_y, 100, 100, 255, 0);

///绘制顶部UI框
const topframe_id = stage_draw_ui_info.topframe;
const topframe_name = "topframe";
const topframe_x = 0;
const topframe_y = 0;
$gameScreen.showPicture(topframe_id, topframe_name, 0, topframe_x, topframe_y, 100, 100, 255, 0);