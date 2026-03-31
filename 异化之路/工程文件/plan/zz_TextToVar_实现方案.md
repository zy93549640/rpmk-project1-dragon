## 目标

- 在 RPG Maker MZ 中新增一个插件，提供插件指令：
  - 设定一段文本（可包含控制符）。
  - 将该文本（可选择展开控制符）写入到指定“游戏变量”。

## 指令与数据流设计

- **指令 1：`SetText`**
  - 参数：`text`（`multiline_string`，支持空格/换行）
  - 行为：把文本保存为“最近一次文本”。
- **指令 2：`PutToVar`**
  - 参数：`varId`（`variable` 选择器）
  - 参数：`resolveEscape`（boolean，默认 true）
  - 行为：取出最近一次文本；若开启则展开控制符；写入 `$gameVariables.setValue(varId, value)`。

```mermaid
flowchart TD
  eventCmdSetText[Event:PluginCommand SetText] --> storeText[$gameSystem._zzTextToVarStore.lastText]
  storeText --> eventCmdPut[Event:PluginCommand PutToVar]
  eventCmdPut --> readText[Read lastText]
  readText --> decideResolve{resolveEscape?}
  decideResolve -->|true| expand[Window_Base.convertEscapeCharacters]
  decideResolve -->|false| passthrough[Use raw text]
  expand --> writeVar[$gameVariables.setValue(varId,text)]
  passthrough --> writeVar
```

## 存储位置（随存档）

- 将“最近一次文本”放在 `$gameSystem` 上（本工程实现为 `$gameSystem._zzTextToVarStore.lastText`）。
  - 优点：存档/读档后保持一致。

## 控制符展开方案（MZ）

- 使用 `Window_Base.prototype.convertEscapeCharacters` 进行展开。
- 插件内部创建一个临时 `Window_Base`（`new Window_Base(new Rectangle(0,0,0,0))`）来调用转换：
  - 输入：`"当前金币：\\V[1]"`
  - 输出（示例）：`"当前金币：100"`

## 插件文件与命名约束

- 插件主体：`工程文件/dragon/js/plugins/zz_TextToVar.js`
- 插件登记：`工程文件/dragon/js/plugins.js` 的 `$plugins` 数组增加一项：
  - `name` 必须为 `zz_TextToVar`（与文件名一致，不含 `.js`），否则指令不会被识别。

## 事件侧使用方式（验收场景）

- **场景 A：展开控制符**
  - 调用 `SetText`：`当前金币：\V[1]`
  - 调用 `PutToVar`：变量 10，`resolveEscape=true`
  - 期望：变量 10 变为 `当前金币：<当前金币数值>`。
- **场景 B：不展开（原样写入）**
  - 同上但 `resolveEscape=false`，写入变量 11
  - 期望：变量 11 为字面量 `当前金币：\V[1]`。

## 边界与注意事项

- 写入变量的是“字符串”；若后续要做数值运算/比较，需要在事件或脚本侧转换为数值。
- `varId` 需大于 0 才写入，避免误写入无效变量。

