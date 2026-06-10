const stage_draw_ui_info = $dataUIinfo.stage;

const dialog_text_id = stage_draw_ui_info.dialog_text;

const show_info = "\\V[6]";

////绘制关卡名称
const x = 960;
const y = 620;
TextPicture.setText(show_info);
$gameScreen.showPicture(dialog_text_id, "", 1, x, y, 100, 100, 255, 0);
