/*:
 * @target MZ
 * @plugindesc 通过插件指令设置文本，并可展开控制符后写入变量
 * @author
 *
 * @command SetText
 * @text 设置文本
 * @desc 保存一段文本到临时存储（随存档保存）。
 *
 * @arg text
 * @type multiline_string
 * @text 文本
 *
 * @command PutToVar
 * @text 写入变量
 * @desc 将已保存文本写入指定变量（可选展开控制符）。
 *
 * @arg varId
 * @type variable
 * @text 目标变量
 *
 * @arg resolveEscape
 * @type boolean
 * @text 展开控制符
 * @default true
 *
 * @command SetTextToVar
 * @text 设置文本并写入变量
 * @desc 在同一个指令窗口里同时设置文本并写入变量（可选展开控制符）。
 *
 * @arg text
 * @type multiline_string
 * @text 文本
 *
 * @arg varId
 * @type variable
 * @text 目标变量
 *
 * @arg resolveEscape
 * @type boolean
 * @text 展开控制符
 * @default true
 *
 * @help
 * 插件指令：
 * 1) 设置文本：保存文本（可包含 \V[n] 等控制符）
 * 2) 写入变量：将文本写入变量；若开启“展开控制符”，会先把控制符替换为最终显示文本
 * 3) 设置文本并写入变量：一步完成（推荐新事件使用该指令）
 */

(() => {
  "use strict";

  const pluginName = "zz_TextToVar";

  function store() {
    if (!$gameSystem._zzTextToVarStore) $gameSystem._zzTextToVarStore = {};
    return $gameSystem._zzTextToVarStore;
  }

  let _escapeWindow = null;
  function escapeWindow() {
    if (_escapeWindow) return _escapeWindow;
    _escapeWindow = new Window_Base(new Rectangle(0, 0, 0, 0));
    return _escapeWindow;
  }

  function expandEscapeCharacters(text) {
    return escapeWindow().convertEscapeCharacters(String(text ?? ""));
  }

  PluginManager.registerCommand(pluginName, "SetText", args => {
    store().lastText = String(args.text ?? "");
  });

  PluginManager.registerCommand(pluginName, "PutToVar", args => {
    const varId = Number(args.varId || 0);
    if (!(varId > 0)) return;

    const resolveEscape = String(args.resolveEscape) !== "false";
    const raw = String(store().lastText ?? "");
    const value = resolveEscape ? expandEscapeCharacters(raw) : raw;
    $gameVariables.setValue(varId, value);
  });

  PluginManager.registerCommand(pluginName, "SetTextToVar", args => {
    const text = String(args.text ?? "");
    store().lastText = text;

    const varId = Number(args.varId || 0);
    if (!(varId > 0)) return;

    const resolveEscape = String(args.resolveEscape) !== "false";
    const value = resolveEscape ? expandEscapeCharacters(text) : text;
    $gameVariables.setValue(varId, value);
  });
})();

