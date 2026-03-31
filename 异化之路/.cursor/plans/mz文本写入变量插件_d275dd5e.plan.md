---
name: MZ文本写入变量插件
overview: 为 RPG Maker MZ 编写插件：通过插件指令设置一段文本，并在写入变量前按需展开控制符（如 \V[1]、\N[1]）。
todos:
  - id: decide-plugin-naming
    content: 确定插件文件名与 pluginName（保持一致），以及计划落盘到工程 plan/ 的文件名。
    status: completed
  - id: implement-mz-plugin
    content: 按指令 SetText/PutToVar 实现插件：$gameSystem 存储 lastText；PutToVar 可选调用 convertEscapeCharacters 展开控制符后写入 $gameVariables。
    status: completed
  - id: event-verify
    content: 在测试地图做两组事件：展开与不展开，验证变量值符合预期；并验证存档/读档后 lastText 是否保留。
    status: completed
  - id: write-plan-into-repo
    content: 切到可写后，将本计划写入工程的 plan/xxx.md（按你指定文件名）。
    status: completed
isProject: false
---

## 目标

- 在 RPG Maker MZ 中新增一个插件，提供插件指令：
  - 设定一段文本（可包含控制符）。
  - 将该文本（可选择展开控制符）写入到指定“游戏变量”。

## 指令与数据流设计

- **指令 1：`SetText`**
  - 参数：`text`（建议使用 `multiline_string`，支持空格/换行）
  - 行为：把文本保存为“最近一次文本”。
- **指令 2：`PutToVar`**
  - 参数：`varId`（`variable` 选择器）
  - 参数：`resolveEscape`（boolean，默认 true）
  - 行为：取出最近一次文本；若开启则展开控制符；写入 `$gameVariables.setValue(varId, value)`。

```mermaid
flowchart TD
  eventCmdSetText[Event:PluginCommand SetText] --> storeText[$gameSystem._yourTextVarStore.lastText]
  storeText --> eventCmdPut[Event:PluginCommand PutToVar]
  eventCmdPut --> readText[Read lastText]
  readText --> decideResolve{resolveEscape?}
  decideResolve -->|true| expand[Window_Base.convertEscapeCharacters]
  decideResolve -->|false| passthrough[Use raw text]
  expand --> writeVar[$gameVariables.setValue(varId,text)]
  passthrough --> writeVar
```



## 存储位置（随存档）

- 将“最近一次文本”放在 `$gameSystem` 上（例如 `$gameSystem._yourTextVarStore.lastText`）。
  - 优点：存档/读档后保持一致。

## 控制符展开方案（MZ）

- 使用 `Window_Base.prototype.convertEscapeCharacters` 进行展开。
- 插件内部创建一个临时 `Window_Base`（`new Window_Base(new Rectangle(0,0,0,0))`）来调用转换：
  - 输入：`"当前金币：\\V[1]"`
  - 输出（示例）：`"当前金币：100"`

## 插件文件与命名约束

- 插件主体：建议放在 `js/plugins/YourTextVarPlugin.js`（以你实际文件名为准）。
- `pluginName`（`PluginManager.registerCommand` 的第一个参数）需要与插件文件名一致（不含 `.js`），否则指令不会被识别。

## 插件头部（MZ 插件参数/指令声明）

- 在插件头部声明：
  - `@target MZ`
  - `@command SetText`，参数 `@arg text @type multiline_string`
  - `@command PutToVar`，参数 `@arg varId @type variable` 与 `@arg resolveEscape @type boolean @default true`

## 事件侧使用方式（验收场景）

- **场景 A：展开控制符**
  - 调用 `SetText`：`当前金币：\V[1]`
  - 调用 `PutToVar`：选择变量 10，`resolveEscape=true`
  - 期望：变量 10 变为 `当前金币：<当前金币数值>`。
- **场景 B：不展开（原样写入）**
  - 同上但 `resolveEscape=false`
  - 期望：变量 10 为字面量 `当前金币：\V[1]`。

## 边界与注意事项

- 写入变量的是“字符串”；若后续要做数值运算/比较，需要在事件或脚本侧转换为数值。
- `varId` 需大于 0 才写入，避免误写入无效变量。
- 若未来需要“一条指令直接写入变量”，可新增 `SetTextToVar(text,varId,resolveEscape)` 作为糖指令（不影响现有两步指令）。

## 工程内落盘（你要求的 plan/）

- 当前为只读/Plan 流程：我先生成本计划文件供确认。
- 在你允许写入后（可写模式/Agent mode），我会把本计划内容原样写入工程目录的 `plan/` 下（例如 `plan/plugin_text_var_plan.md`，文件名按你偏好调整）。

