/*:
 * @target MZ
 * @plugindesc (post-VisuMZ) Frontview Status UI：居中布局时固定相邻队员中心距
 * @author
 * @orderAfter VisuMZ_3_FrontviewBattleUI
 *
 * @param Enabled
 * @text 启用
 * @type boolean
 * @default true
 *
 * @param CenterSpacing
 * @text 相邻队员中心距（像素）
 * @type number
 * @min 0
 * @default 160
 * @desc 仅在 Status UI 为「居中」时替换水平站位；左/右仍用 VisuMZ 原版。
 *
 * @help
 * 依赖 VisuMZ_3_FrontviewBattleUI。请放在该插件之后。
 *
 * VisuMZ 原版「居中」公式按窗口宽度均分，不使用 Distance Buffer。
 * 本插件仅在检测到对齐为 center 时，改为固定中心距 d：
 *   span = (n-1)*d，x0 = (W-span)/2，x_i = x0 + i*d
 *
 * 若 Visu 更新后无法从角色条 sprite 上枚举到 left/right/center 字符串，
 * 可再改为读取插件参数 InitialUiPosition 作为兜底（需自行扩展）。
 */

(() => {
  "use strict";

  const pluginName = "zz_FvUiFixedCenterSpacing";
  const params = PluginManager.parameters(pluginName);
  const enabled = params.Enabled !== "false";
  const centerSpacing = Number(params.CenterSpacing);

  if (!enabled) return;
  if (typeof Imported === "undefined" || !Imported.VisuMZ_3_FrontviewBattleUI) return;
  if (typeof Sprite_FvUiStatus === "undefined") return;
  if (!Number.isFinite(centerSpacing) || centerSpacing < 0) return;

  const _orig = Sprite_FvUiStatus.prototype.startingPositionX;

  function readUiAlign(sprite) {
    for (const key of Object.keys(sprite)) {
      const v = sprite[key];
      if (v === "left" || v === "right" || v === "center") return v;
    }
    return null;
  }

  Sprite_FvUiStatus.prototype.startingPositionX = function () {
    const align = readUiAlign(this);
    const win = this._parentWindow;

    if (align === "center" && win && typeof win.width === "number") {
      const members = $gameParty.battleMembers();
      const n = members.length;
      if (n <= 0) return 0;

      const w = win.width;
      const i = this._partyIndex | 0;
      const span = (n - 1) * centerSpacing;
      const x0 = (w - span) / 2;
      return x0 + i * centerSpacing;
    }

    return _orig.call(this);
  };
})();
