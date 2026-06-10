// ///本脚本为绘制选人界面的基本UI信息
const stage_draw_ui_info = $dataUIinfo.teamSelect;
let y_left = 0
const bg_id = stage_draw_ui_info.bg;
const bg_name = "bg2";
$gameScreen.showPicture(bg_id, bg_name, 0, 0, y_left, 100, 100, 255, 0);

y_left += 30;
const close_button_id = stage_draw_ui_info.close_button;
const close_button_name = "button_close";
$gameScreen.showPicture(close_button_id, close_button_name, 0, 50, y_left, 100, 100, 255, 0);

y_left += 80;
const select_title_id = stage_draw_ui_info.select_title;
const select_title_name = "scene_team/title_panel";
$gameScreen.showPicture(select_title_id, select_title_name, 0, 50, y_left, 100, 100, 255, 0);

const select_title_text_id = stage_draw_ui_info.select_title_text;
const word_select_title = "选择队伍成员";
const select_title_text = "\\OutlineWidth[0]\\FS[32]"+"<b>"+ word_select_title;
const select_title_text_x = 50+50;
const select_title_text_y = y_left + 13;
TextPicture.setText(select_title_text);
$gameScreen.showPicture(select_title_text_id, "", 0, select_title_text_x, select_title_text_y, 100, 100, 255, 0);

y_left += 115;
const select_member_1_id = stage_draw_ui_info.select_member_1;
const select_member_1 = "scene_team/portrait/1_panel";
$gameScreen.showPicture(select_member_1_id, select_member_1, 0, 60, y_left, 100, 100, 255, 0);

const select_member_2_id = stage_draw_ui_info.select_member_2;
const select_member_2 = "scene_team/portrait/2_panel";
$gameScreen.showPicture(select_member_2_id, select_member_2, 0, 60+210, y_left, 100, 100, 255, 0);

const select_member_3_id = stage_draw_ui_info.select_member_3;
const select_member_3 = "scene_team/portrait/3_panel";
$gameScreen.showPicture(select_member_3_id, select_member_3, 0, 60+210*2, y_left, 100, 100, 255, 0);

const select_member_4_id = stage_draw_ui_info.select_member_4;
const select_member_4 = "scene_team/portrait/4_panel";
$gameScreen.showPicture(select_member_4_id, select_member_4, 0, 60+210*3, y_left, 100, 100, 255, 0);

y_left += 530;

const next_page_button_id = stage_draw_ui_info.next_page_button;
const next_page_button_name = "button_next";
$gameScreen.showPicture(next_page_button_id, next_page_button_name, 0, 615, y_left, 100, 100, 255, 0);

const previous_page_button_id = stage_draw_ui_info.previous_page_button;
const previous_page_button_name = "button_previous";
$gameScreen.showPicture(previous_page_button_id, previous_page_button_name, 0, 615-125*2, y_left, 100, 100, 255, 0);

const confirm_button_id = stage_draw_ui_info.confirm_button;
const confirm_button_name = "button_confirm";
$gameScreen.showPicture(confirm_button_id, confirm_button_name, 0, 615-125, y_left, 100, 100, 255, 0);

y_left += 80;
const selected_title_id = stage_draw_ui_info.selected_title;
const selected_title_name = "scene_team/title_panel";
$gameScreen.showPicture(selected_title_id, selected_title_name, 0, 50, y_left, 100, 100, 255, 0);

// const selected_title_text_id = stage_draw_ui_info.selected_title_text;
// ////人数上限为变量31，这里要先设定为3；
// $gameVariables.setValue(31, 3);

// const word_selected_title = "已选（\\V[32]/\\V[31]）";
// const selected_title_text = "\\OutlineWidth[0]\\FS[32]"+"<b>"+ word_selected_title;
// const selected_title_text_x = 50+50;
// const selected_title_text_y = y_left + 13;
// TextPicture.setText(selected_title_text);
// $gameScreen.showPicture(selected_title_text_id, "", 0, selected_title_text_x, selected_title_text_y, 100, 100, 255, 0);

const selected_member_back_button_id = stage_draw_ui_info.selected_member_back_button;
const selected_member_back_button_name = "button_back";
$gameScreen.showPicture(selected_member_back_button_id, selected_member_back_button_name, 0, 50+260, y_left + 13, 100, 100, 255, 0);
ButtonPicture.setButtonPicture(selected_member_back_button_id, 37);
