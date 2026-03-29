/*:
 * @target MZ
 * @plugindesc 新游戏和读档后自动禁用菜单
 * @author OpenAI
 * @help
 * 新游戏开始、读取存档后，都会自动执行：
 *   $gameSystem.disableMenu();
 *
 * 如需重新开启菜单：
 *   $gameSystem.enableMenu();
 */

(() => {
  "use strict";

  const _DataManager_setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function() {
      _DataManager_setupNewGame.call(this);
      $gameSystem.disableMenu();
  };

  const _DataManager_extractSaveContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents) {
      _DataManager_extractSaveContents.call(this, contents);
      if ($gameSystem) {
          $gameSystem.disableMenu();
      }
  };
})();