/*:
 * @target MZ
 * @plugindesc (post-VisuMZ) 修复 FrontviewBattleUI 地图 Back Attachment：按可见性开关隐藏/显示 character_bottom_frame
 * @author
 * @orderAfter VisuMZ_3_FrontviewBattleUI
 *
 * @help
 * VisuMZ_3_FrontviewBattleUI 的插件指令：
 *   System: Map Frontview UI Visibility
 * 会切换 $gameSystem._frontviewUiMapVisible，但在你的工程里出现
 * “Visible=false 时 Back Attachment (img/system/character_bottom_frame) 仍残留显示”的问题。
 *
 * 本插件只会隐藏/显示 Back Attachment 对应的 Sprite，不会改动其它 UI / Window，避免误伤。
 * 可见性规则：Show UI on Map 参数 AND System: Map Frontview UI Visibility（任一为 false 则隐藏）。
 */

(() => {
  "use strict";

  const TARGET_PLUGIN = "VisuMZ_3_FrontviewBattleUI";
  const TARGET_COMMAND = "SystemMapUiVisibility";
  const TARGET_WINDOW_PREFIX = "Window_FrontviewUiMapBattle";
  const BACK_ATTACHMENT_KEYWORD = "character_bottom_frame";

  function isMapFrontviewUiWindow(win) {
    const name = win?.constructor?.name ?? "";
    return name.startsWith(TARGET_WINDOW_PREFIX);
  }

  function parseVisuStructParam(raw) {
    try {
      const obj = JSON.parse(String(raw || "{}"));
      return obj && typeof obj === "object" ? obj : {};
    } catch {
      return {};
    }
  }

  function getShowUiOnMapParam() {
    const p = PluginManager.parameters(TARGET_PLUGIN);
    // VisuMZ 使用 "Map:struct"（JSON 字符串）存 Map Scene Settings
    const mapStruct = parseVisuStructParam(p?.["Map:struct"]);
    const raw = mapStruct?.["ShowUiOnMap:eval"];
    // 默认 true（不因为读不到参数而意外隐藏）
    if (raw == null || raw === "") return true;
    // 可能是 "true"/"false" 字符串；也可能是布尔
    if (raw === true || raw === false) return raw;
    return String(raw).toLowerCase() !== "false";
  }

  function shouldShowBackAttachment() {
    const showUiOnMap = getShowUiOnMapParam();
    if (!showUiOnMap) return false;

    const runtimeFlag = $gameSystem?._frontviewUiMapVisible;
    // 若 Visu 没设置该字段，视为“可见”（仅受 ShowUiOnMap 影响）
    if (runtimeFlag == null) return true;
    return !!runtimeFlag;
  }

  function getResourceUrl(node) {
    // 1) RPGMZ Sprite 常见：sprite.bitmap._url = "img/system/xxx.png"
    const url1 = node?.bitmap?._url;
    if (typeof url1 === "string" && url1) return url1;

    // 2) PIXI Texture resource url/src（不同版本字段不同）
    const res = node?.texture?.baseTexture?.resource;
    const url2 = res?.url ?? res?.src;
    if (typeof url2 === "string" && url2) return url2;

    return "";
  }

  function isBackAttachmentSprite(node) {
    const url = getResourceUrl(node);
    if (url && url.includes(BACK_ATTACHMENT_KEYWORD)) return true;

    // 兜底：有些情况下 url 可能为空但贴图名可从 bitmap.name 推断（若存在）
    const name = node?.bitmap?.name;
    if (typeof name === "string" && name && name.includes(BACK_ATTACHMENT_KEYWORD)) return true;

    return false;
  }

  function findBackAttachmentSprites(root) {
    const result = [];
    const stack = [root];
    const visited = new Set();

    while (stack.length) {
      const node = stack.pop();
      if (!node || visited.has(node)) continue;
      visited.add(node);

      if (isBackAttachmentSprite(node)) result.push(node);

      const children = node.children;
      if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) stack.push(children[i]);
      }
    }

    return result;
  }

  function syncBackAttachmentVisibility(scene) {
    if (!scene) return;
    // 只处理地图场景（避免在其它场景误伤）
    if (!(scene instanceof Scene_Map)) return;

    const windowLayer = scene._windowLayer;
    const children = windowLayer?.children;
    if (!Array.isArray(children)) return;

    const visible = shouldShowBackAttachment();

    // 仅扫描 Frontview Map UI 相关窗口，避免误遍历其它通用窗口
    for (const win of children) {
      if (!isMapFrontviewUiWindow(win)) continue;
      const sprites = findBackAttachmentSprites(win);
      for (const s of sprites) {
        s.visible = !!visible;
        if (typeof s.opacity === "number") s.opacity = visible ? 255 : 0;
      }
    }
  }

  // 兜底：进入地图时同步一次（非每帧）
  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    _Scene_Map_start.call(this);
    this._zzFvBackAttachLastVisible = undefined;
    syncBackAttachmentVisibility(this);
  };

  // 兜底：当可见性发生变化或窗口晚创建时，自动同步一次（避免每帧反复改）
  const _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function () {
    _Scene_Map_update.call(this);

    const visible = shouldShowBackAttachment();
    if (this._zzFvBackAttachLastVisible !== visible) {
      this._zzFvBackAttachLastVisible = visible;
      syncBackAttachmentVisibility(this);
      return;
    }

    // 如果窗口晚创建/贴图晚加载，补一次（只做一次）
    if (this._windowLayer?.children?.some(isMapFrontviewUiWindow)) {
      if (this._zzFvBackAttachSyncedOnce !== true) {
        this._zzFvBackAttachSyncedOnce = true;
        syncBackAttachmentVisibility(this);
      }
    }
  };

  // 主逻辑：拦截插件指令执行，在它修改完开关后同步窗口显隐
  const _PluginManager_callCommand = PluginManager.callCommand;
  PluginManager.callCommand = function (interpreter, pluginName, commandName, args) {
    _PluginManager_callCommand.call(this, interpreter, pluginName, commandName, args);

    if (pluginName !== TARGET_PLUGIN) return;
    if (commandName !== TARGET_COMMAND) return;

    const scene = SceneManager?._scene;
    syncBackAttachmentVisibility(scene);
  };
})();

