# VisuMZ FrontviewBattleUI 备忘

来源：对工程内 `js/plugins/VisuMZ_3_FrontviewBattleUI.js` 的查阅与混淆段语义还原（不粘贴混淆源码）。

---

## Face Mask（头像遮罩）

- 插件参数位于 **Status UI Settings → Graphics → Face Mask**（`GraphicsFaceMask*`）。
- 作用：对 Status UI 中每名角色的 **脸图 sprite** 使用 PIXI 的 **mask** 做形状裁切（形状外像素不显示）。
- 两种方式：在 **`img/system/`** 指定遮罩图；或使用 **Render** 里颜色/渐变等生成预置三角形类遮罩（`GraphicsFaceMaskShift` 等）。

---

## Distance Buffer 与水平站位

- 插件参数 **Distance Buffer** 在运行时会进入 `Sprite_FvUiStatus['START_BUFFER_X']`（与参数默认值 32 一致）。
- 水平位置由 `Sprite_FvUiStatus.prototype.startingPositionX` 计算。

### 左 / 右对齐

- 相邻队员中心的大致步长为：**`START_BUFFER_X + ImageManager.faceWidth`**（另含端点 buffer 修正）。
- 因此修改 **Distance Buffer** 会改变左/右模式下的队员间距。

### 居中（center）

- 公式为：`parentWindow.width * (partyIndex + 1) / (battleMembers.length + 1)`。
- **不使用** `START_BUFFER_X` / **Distance Buffer**，故仅把布局设为「居中」时，改 Distance Buffer 往往看不到队员间距变化。

---

## 可选：固定「居中」时的相邻中心距（独立插件思路）

若需在 **保持居中对齐** 的前提下，把相邻两名队员的 **中心距** 改为常数 `d`（可配置）：

1. 新插件放在 **`VisuMZ_3_FrontviewBattleUI` 之后** 加载。
2. 保存并重写 `Sprite_FvUiStatus.prototype.startingPositionX`：
   - 当对齐为 **`center`** 时：设 `n = battleMembers.length`，`W = parentWindow.width`，`i = partyIndex`，  
     `span = (n - 1) * d`，`x0 = (W - span) / 2`，返回 **`x0 + i * d`**。
   - **`left` / `right`**：仍调用原版 `startingPositionX`。
3. 对齐字符串可在实例可枚举属性中查找 `'left' | 'right' | 'center'`；若未来 Visu 更新导致属性不可枚举或改名，可改为解析 `PluginManager.parameters('VisuMZ_3_FrontviewBattleUI')` 中战斗布局的初始位置作为兜底。

---

## 已落地插件

- [js/plugins/zz_FvUiFixedCenterSpacing.js](js/plugins/zz_FvUiFixedCenterSpacing.js)：在 `plugins.js` 中紧接 `VisuMZ_3_FrontviewBattleUI` 之后启用；参数 **相邻队员中心距**、**启用**。

## 未修改

- 未改动 `VisuMZ_3_FrontviewBattleUI.js` 本体。
