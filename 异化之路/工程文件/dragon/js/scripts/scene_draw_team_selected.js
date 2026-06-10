const stage_draw_ui_info = $dataUIinfo.teamSelect;

////绘制已选人数文字
const selected_title_text_id = stage_draw_ui_info.selected_title_text;
////人数上限为变量31，这里要先设定为3；
$gameVariables.setValue(31, 3);
const word_selected_title = "已选（\\V[32]/\\V[31]）";
const selected_title_text = "\\OutlineWidth[0]\\FS[32]"+"<b>"+ word_selected_title;
const selected_title_text_x = 100;
const selected_title_text_y = 848;
TextPicture.setText(selected_title_text);
$gameScreen.showPicture(selected_title_text_id, "", 0, selected_title_text_x, selected_title_text_y, 100, 100, 255, 0);


//////绘制底部3个已选队伍框
///先获取变量33，该变量是数组
const selected_member = $gameVariables.value(33);
const face_dir = "scene_team/portrait/";
selected_member_1_id = stage_draw_ui_info.selected_member_1;
///获取数组中第一个元素
const selected_member_1 = selected_member[0];
///第一个角色的图片为 face_dir + selected_member_1 + "_face"
const selected_member_1_face = face_dir + selected_member_1 + "_face";
////用$gameScreen.showPicture绘制
$gameScreen.showPicture(selected_member_1_id, selected_member_1_face, 0, selected_title_text_x, selected_title_text_y+82, 100, 100, 255, 0);

selected_member_2_id = stage_draw_ui_info.selected_member_2;
const selected_member_2 = selected_member[1];
const selected_member_2_face = face_dir + selected_member_2 + "_face";
$gameScreen.showPicture(selected_member_2_id, selected_member_2_face, 0, selected_title_text_x+280, selected_title_text_y+82, 100, 100, 255, 0);

selected_member_3_id = stage_draw_ui_info.selected_member_3;
const selected_member_3 = selected_member[2];
const selected_member_3_face = face_dir + selected_member_3 + "_face";
$gameScreen.showPicture(selected_member_3_id, selected_member_3_face, 0, selected_title_text_x+560, selected_title_text_y+82, 100, 100, 255, 0);