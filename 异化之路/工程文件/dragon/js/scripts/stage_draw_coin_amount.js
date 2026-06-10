const stage_draw_ui_info = $dataUIinfo.stage;

const coin_amount_id = stage_draw_ui_info.coin_amount;

const show_info = "\\I[12] \\V[7]";

////绘制关卡名称
const x = 54;
const y = 34;
TextPicture.setText(show_info);
$gameScreen.showPicture(coin_amount_id, "", 0, x, y, 120, 120, 255, 0);
