/*:
 * @target MZ
 * @plugindesc 一条指令同时设置文本图并指定显示位置（依赖 TextPicture）
 * @author
 * @orderAfter TextPicture
 *
 * @command showTextPicture
 * @text 显示文本图
 * @desc 设置要绘制的文字，并按指定编号、原点与坐标显示（缩放 100%、不透明度 255、普通合成）。
 *
 * @arg text
 * @type multiline_string
 * @text 文本
 * @desc 支持制御字符（与 TextPicture 相同）。
 *
 * @arg pictureId
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * @text 图片编号
 * @desc 对应「显示图片」的编号（1～100）。
 *
 * @arg origin
 * @type select
 * @option 左上角
 * @value 0
 * @option 中心
 * @value 1
 * @default 0
 * @text 原点
 *
 * @arg x
 * @type number
 * @default 0
 * @min -999999
 * @max 999999
 * @text X 坐标
 *
 * @arg y
 * @type number
 * @default 0
 * @min -999999
 * @max 999999
 * @text Y 坐标
 *
 * @help
 * 需启用并置于本插件之前的 TextPicture 插件。
 * 内部依次调用 TextPicture.setText(文本) 与
 * $gameScreen.showPicture(编号, "", 原点, x, y, 100, 100, 255, 0)。
 */

(() => {
  "use strict";

  const pluginName = "zz_ShowTextPicture";
  const SCALE = 100;
  const OPACITY = 255;
  const BLEND_NORMAL = 0;

  PluginManager.registerCommand(pluginName, "showTextPicture", args => {
    const tp = globalThis.TextPicture;
    if (!tp || typeof tp.setText !== "function") {
      console.error(
        `[${pluginName}] 需要 TextPicture 插件（且加载顺序在本插件之前）。`
      );
      return;
    }
    const text = String(args.text ?? "");
    const pictureId = Number(args.pictureId);
    const origin = Number(args.origin);
    const x = Number(args.x);
    const y = Number(args.y);

    tp.setText(text);
    $gameScreen.showPicture(
      pictureId,
      "",
      origin,
      x,
      y,
      SCALE,
      SCALE,
      OPACITY,
      BLEND_NORMAL
    );
  });
})();
