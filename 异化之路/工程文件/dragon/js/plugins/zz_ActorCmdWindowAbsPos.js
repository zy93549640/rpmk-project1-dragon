/*:
 * @target MZ
 * @plugindesc (post-VisuMZ) Actor command window absolute position controller
 * @author
 *
 * @param AbsX
 * @type number
 * @default 0
 * @desc Actor command window x position in pixels (top-left origin)
 *
 * @param AbsY
 * @type number
 * @default 0
 * @desc Actor command window y position in pixels (top-left origin)
 */

(() => {
  const pluginName = "zz_ActorCmdWindowAbsPos";
  const params = PluginManager.parameters(pluginName);
  const absX = Number(params.AbsX ?? 0);
  const absY = Number(params.AbsY ?? 0);

  if (!Imported.VisuMZ_3_FrontviewBattleUI) return;

  const _update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function() {
    _update.call(this);

    const w = this._actorCommandWindow;
    if (!w) return;

    // Force absolute positioning so post processing from other plugins won't accumulate offsets.
    if (w.x !== absX) w.x = absX;
    if (w.y !== absY) w.y = absY;
  };
})();

