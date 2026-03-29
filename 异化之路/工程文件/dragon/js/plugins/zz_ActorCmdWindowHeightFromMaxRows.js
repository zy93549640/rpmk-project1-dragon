/*:
 * @target MZ
 * @plugindesc (post-VisuMZ) Set Actor Command Window height from VisuMZ_3_FrontviewBattleUI MaxRows
 * @author
 *
 * @param FallbackRows
 * @type number
 * @default 8
 * @desc If VisuMZ_3_FrontviewBattleUI MaxRows can't be read, use this fallback rows.
 */

(() => {
  const pluginName = "zz_ActorCmdWindowHeightFromMaxRows";
  const params = PluginManager.parameters(pluginName);
  const fallbackRows = Number(params.FallbackRows ?? 8);

  if (!Imported.VisuMZ_3_FrontviewBattleUI) return;

  const readVisuMaxRows = () => {
    // VisuMZ_3_FrontviewBattleUI is known to use keys like "MaxRows:num" in some exports.
    const visuParams = PluginManager.parameters("VisuMZ_3_FrontviewBattleUI");
    const candidates = [
      "MaxRows:num",
      "MaxRows",
      "MaxRowsNum",
      "maxRows:num",
      "maxRows",
    ];

    for (const key of candidates) {
      if (visuParams && visuParams[key] != null) {
        const n = Number(visuParams[key]);
        if (Number.isFinite(n) && n > 0) return n;
      }
    }
    return fallbackRows;
  };

  const _update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function() {
    _update.call(this);

    const w = this._actorCommandWindow;
    if (!w) return;

    // calculate desired height by "rows"
    const maxRows = readVisuMaxRows();
    const desiredH = this.calcWindowHeight(maxRows, true);

    if (w.height !== desiredH) {
      // keep current x/y and width
      w.move(w.x, w.y, w.width, desiredH);
    }
  };
})();

