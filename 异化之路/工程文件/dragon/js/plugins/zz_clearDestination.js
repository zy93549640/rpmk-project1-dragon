/*:
 * @target MZ
 * @plugindesc 打开图片UI时禁用地图点击移动光标
 */

(() => {
  const DISABLE_MAP_TOUCH_SWITCH_ID = 1; // 改成你自己的开关ID

  const _Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
      if ($gameSwitches.value(DISABLE_MAP_TOUCH_SWITCH_ID)) {
          $gameTemp.clearDestination();
          this._touchCount = 0;
          return;
      }

      _Scene_Map_processMapTouch.call(this);
  };
})();