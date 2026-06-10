/*:
 * @target MZ
 * @plugindesc 预加载 data/ 下的自定义 JSON（可在插件管理器配置多条，并注入全局变量） v1.0.0
 * @author ROY
 *
 * @help
 * 将你自己放在 data/ 目录下的 JSON 文件，加入到 DataManager 的数据库加载列表中，
 * 使其在游戏启动（Scene_Boot）阶段就完成加载。
 *
 * 读取方式：
 *  - 在插件参数里为每个 JSON 指定一个“全局变量名”（例如 $dataStageNames）
 *  - 之后在任意脚本中直接使用 window 上对应变量读取（例如 $dataStageNames["1"]）
 *
 * 注意：
 *  - globalName 必须是合法的 JS 全局变量名（建议以 $data 开头）
 *  - filename 只填写文件名（例如 StageNames.json），文件必须位于 data/ 目录
 *  - 本插件只负责“注册并预加载”，不会校验 JSON 结构内容
 *
 * @param files
 * @text 预加载文件列表
 * @type struct<PreloadFile>[]
 * @default []
 */
/*~struct~PreloadFile:
 * @param globalName
 * @text 全局变量名
 * @type string
 * @desc 例如：$dataStageNames（将挂到 window 上）
 * @default $dataStageNames
 *
 * @param filename
 * @text JSON 文件名
 * @type string
 * @desc 位于 data/ 下，例如：StageNames.json
 * @default StageNames.json
 */

(() => {
  "use strict";

  const inferPluginName = () => {
    const src = document.currentScript && document.currentScript.src;
    if (!src) return "zz_PreloadExtraJson";
    const m = src.match(/([^/]+)\.js$/);
    return (m && m[1]) || "zz_PreloadExtraJson";
  };

  const pluginName = inferPluginName();
  const params = PluginManager.parameters(pluginName);

  const rawList = (() => {
    try {
      return JSON.parse(params.files || "[]");
    } catch (e) {
      console.error(`[${pluginName}] 参数 files 解析失败`, e);
      return [];
    }
  })();

  const entries = rawList
    .map(s => {
      try {
        return JSON.parse(s);
      } catch (e) {
        console.error(`[${pluginName}] 预加载条目解析失败`, s, e);
        return null;
      }
    })
    .filter(Boolean)
    .map(e => ({
      globalName: String(e.globalName || "").trim(),
      filename: String(e.filename || "").trim()
    }))
    .filter(e => e.globalName && e.filename);

  // 仅对本插件注入的“额外 JSON”禁用 Test_ 前缀。
  // 引擎在事件测试/战斗测试时会统一给 DataManager._databaseFiles 加 Test_；
  // 我们通过给条目打标并覆写 loadDatabase 来跳过前缀。
  const EXTRA_NO_TEST_PREFIX_FLAG = "zzExtraNoTestPrefix";
  if (!DataManager._zzPreloadExtraJsonPatchedLoadDatabase) {
    DataManager._zzPreloadExtraJsonPatchedLoadDatabase = true;
    const _loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function() {
      const test = this.isBattleTest() || this.isEventTest();
      const prefix = test ? "Test_" : "";
      for (const databaseFile of this._databaseFiles) {
        const noTestPrefix = !!databaseFile[EXTRA_NO_TEST_PREFIX_FLAG];
        const src = test && !noTestPrefix ? prefix + databaseFile.src : databaseFile.src;
        this.loadDataFile(databaseFile.name, src);
      }
      if (this.isEventTest()) {
        this.loadDataFile("$testEvent", prefix + "Event.json");
      }
    };
    // 保留引用，避免误用未使用变量（也方便以后回退）
    void _loadDatabase;
  }

  for (const e of entries) {
    const exists = DataManager._databaseFiles.some(f => f.name === e.globalName);
    if (exists) continue;
    DataManager._databaseFiles.push({
      name: e.globalName,
      src: e.filename,
      [EXTRA_NO_TEST_PREFIX_FLAG]: true
    });
  }
})();

