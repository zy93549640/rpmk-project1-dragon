/*:
 * @target MZ
 * @plugindesc (post-VisuMZ) 战斗场景自定义背面装饰图：中心锚点 + 游戏区域坐标
 * @author
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_3_FrontviewBattleUI
 *
 * @param Enabled
 * @text 启用
 * @type boolean
 * @default true
 *
 * @param Filename
 * @text 图片文件名
 * @type file
 * @dir img/system/
 * @desc 不含扩展名，与 Battle Core Back Attachment 相同目录。留空则不显示。
 * @default
 *
 * @param CustomX
 * @text 位置 X（用户坐标）
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @desc 原点为游戏画面区域左上角 (0,0)。数值越大，装饰图中心越靠左（与引擎默认 X 轴相反）。
 *
 * @param CustomY
 * @text 位置 Y（用户坐标）
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @desc 原点为游戏画面区域左上角 (0,0)。数值越大，装饰图中心越靠下。
 *
 * @param Opacity
 * @text 不透明度
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @help
 * 用于替代 VisuMZ Battle Core「Back Attachment」的思路：自行在战斗里画一张图，
 * 锚点为图片中心，位置用自定义坐标系表示。
 *
 * 请在 Battle Core > Battle Layout > Status Window > Back Attachment 中
 * 将 Filename 留空，避免重复叠图。
 *
 * 坐标系（相对游戏画面区域 Graphics.boxWidth × Graphics.boxHeight）：
 * - 左上角为 (0, 0)
 * - X：数值增大 → 向左移动
 * - Y：数值增大 → 向下移动
 *
 * 精灵插在窗口层最底层，位于所有战斗 UI 窗口之下、战场 Spriteset 之上。
 */

(() => {
  "use strict";

  const pluginName = "zz_BattleCustomBackAttachment";
  const params = PluginManager.parameters(pluginName);
  const enabled = params.Enabled !== "false";
  const filename = String(params.Filename || "").trim();
  const customX = Number(params.CustomX);
  const customY = Number(params.CustomY);
  const opacity = Number(params.Opacity);

  if (!enabled) return;

  const applyPosition = (sprite) => {
    const x = -customX;
    const y = customY;
    sprite.x = x;
    sprite.y = y;
    sprite.anchor.set(0.5, 0.5);
    if (Number.isFinite(opacity)) {
      sprite.opacity = Math.max(0, Math.min(255, opacity | 0));
    }
  };

  const _Scene_Battle_createDisplayObjects =
    Scene_Battle.prototype.createDisplayObjects;
  Scene_Battle.prototype.createDisplayObjects = function () {
    _Scene_Battle_createDisplayObjects.call(this);
    if (!filename) return;

    const bitmap = ImageManager.loadSystem(filename);
    const sprite = new Sprite(bitmap);
    sprite.anchor.set(0.5, 0.5);
    applyPosition(sprite);
    this._zzBattleCustomBackSprite = sprite;

    if (this._windowLayer && this._windowLayer.addChildAt) {
      this._windowLayer.addChildAt(sprite, 0);
    } else {
      this.addChild(sprite);
    }
  };

  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.call(this);
    const sprite = this._zzBattleCustomBackSprite;
    if (!sprite || !sprite.bitmap) return;
    if (!sprite.bitmap.isReady()) return;
    applyPosition(sprite);
  };

  const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
  Scene_Battle.prototype.terminate = function () {
    const sprite = this._zzBattleCustomBackSprite;
    if (sprite && sprite.parent) {
      sprite.parent.removeChild(sprite);
    }
    this._zzBattleCustomBackSprite = null;
    _Scene_Battle_terminate.call(this);
  };
})();
