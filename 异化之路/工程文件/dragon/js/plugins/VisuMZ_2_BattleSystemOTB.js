//=============================================================================
// VisuStella MZ - Battle System - OTB - Order Turn Battle
// VisuMZ_2_BattleSystemOTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemOTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemOTB = VisuMZ.BattleSystemOTB || {};
VisuMZ.BattleSystemOTB.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.20] [BattleSystemOTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_OTB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin changes the RPG Maker MZ battle system to "Order Turn Battle",
 * a turn-based battle system where actions are executed immediately and the
 * orders for both the current and next turn are not only visible, but also
 * malleable. New mechanics are introduced where the player can manipulate the
 * turn order of an action's user or action's target in various ways they want.
 * 
 * The two Turn Orders are displayed at the top of the top of the screen to
 * give the player a clear understanding of who's turn it will be when it
 * becomes time to act, making it easier and viable for the player to formulate
 * strategies and adapt to the situation in battle.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "otb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * Two Turn Order Displays appear at the top of the screen, giving the player
 *   an idea of who's turn it will be and when, for both the current turn and
 *   the next turn.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * Skills and Items can manipulate the turn order of the action's user or the
 *   action's target(s). This can apply to either the current turn or the next
 *   turn, depending on the notetags and/or action effects used.
 * * The Turn Order Display will give a preview on how turn orders will change
 *   upon specific skills and/or items being used.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Turn Order Displays
 * 
 * The Two Turn Order Displays will capture the battle's current and next turn
 * orders determined by the BattleManager. This feature does not overwrite any
 * functions, but the Turn Order Displays may or may not conflict with any
 * existing HUD elements that are already positioned on the screen. If so, you
 * can choose to offset the Turn Order Display or move it to a different part
 * of the screen through the plugin parameters.
 * 
 * ---
 * 
 * Agility
 * 
 * Agility behaves slightly different from normal when it comes to the Order
 * Turn Battle system. Aside from the first turn in battle, agility will always
 * calculate the turn order for the "Next Turn" when conducted. This means that
 * any changes to agility values will not have any effect on the next turn's
 * already established turn order.
 * 
 * However, this can be remedied by utilizing the notetags provided by this
 * plugin to alter the Next Turn orders for specific targets. In fact, for
 * skill and item "effects" that add AGI Buffs and/or Debuffs, the target's
 * turn position on the Turn Order Display will be manipulated in accordance.
 * This auto-conversion feature can be disabled in the Plugin Parameters.
 * 
 * ---
 * 
 * Action Speed
 * 
 * Because the Order Turn Battle system already calculates agility speeds
 * before selecting an action to perform, the effects of the actioon speed will
 * not work the same way it did with the default battle system. Instead, the
 * Action Speed will be sent through a formula to determine its effect on the
 * following turn, either pushing the user ahead in next turn's turn order
 * (with a positive speed value) or back (with a negative speed value).
 * 
 * This option can have its formula altered or straight up disabled in the
 * Plugin Parameters.
 * 
 * ---
 * 
 * Infinity Speed and Clamping
 * 
 * Since Action Speeds are decided in such a way, enemies that will survive a
 * stun state past two turns will have "Infinity" speed on the recovery turn,
 * allowing them to act first relative to the rest of the battle participants
 * in order to balance out the turns they've lost.
 * 
 * Enemies with "Infinity" speed cannot be overtaken through turn order
 * manipulation while they are on the "Next Turn" order. If anything, battlers
 * who shift their turn order faster will be just trailing behind them, thus
 * the "clamping" effect. However if this occurs during the "Current Turn"
 * order, all is fair game and any battler can overtake them. Plan out your
 * battle system effects carefully with these rules in mind.
 * 
 * If you do not like the idea of Infinity Speed and/or Clamping, you can turn
 * them off in the Plugin Parameters.
 * 
 * This effect does not affect stun states that last only one turn. The effect
 * will only occur with stun states that last 2 turns or more.
 * 
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Force Actions
 * 
 * Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 * system. With other battle systems, force actions are added into a hidden
 * queue that would act upon after the current battler finishes his/her current
 * action. The new changes made with force actions is that they now appear on
 * the queue visibly.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Order Turn Battle is
 * in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === General OTB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <OTB Help>
 *  description
 *  description
 * </OTB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under OTB.
 * - This is primarily used if the skill behaves differently in OTB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to OTB.
 *
 * ---
 * 
 * === OTB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the OTB Turn Order Display
 * 
 * ---
 *
 * <OTB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <OTB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <OTB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <OTB Instant>
 * <OTB Instant Use>
 * <OTB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Added Action Notetags ===
 * 
 * ---
 * 
 * <OTB User Add Current Turn Actions: x>
 * <OTB User Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the user to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * <OTB Target Add Current Turn Actions: x>
 * <OTB Target Add Next Turn Actions: x>
 * 
 * - Used for: Skill, Item Notetags
 * - Adds extra actions for the target to perform during the current/next turn.
 *   - Added actions will go towards the back of the action list.
 *   - Multi-hit skills/items will trigger this effect multiple times.
 * - Replace 'x' with a number representing the amount of actions to add.
 * 
 * ---
 * 
 * === Turn Order Manipulation-Related Notetags ===
 * 
 * ---
 *
 * <OTB User Current Turn: +x>
 * <OTB User Next Turn: +x>
 * <OTB User Follow Turn: +x>
 *
 * <OTB User Current Turn: -x>
 * <OTB User Next Turn: -x>
 * <OTB User Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the user's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the user has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the user closer to the front.
 *   - Positive numbers move the user towards the back.
 * - This effect only occurs once per skill/item use and at the start of the
 *   action when initializing the skill/item.
 *
 * ---
 *
 * <OTB Target Current Turn: +x>
 * <OTB Target Next Turn: +x>
 * <OTB Target Follow Turn: +x>
 *
 * <OTB Target Current Turn: -x>
 * <OTB Target Next Turn: -x>
 * <OTB Target Follow Turn: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the target's position in the turn order for the current turn, next
 *   turn, or whichever turn is following.
 * - If using the "Follow" variant, if the target has actions left for the
 *   current turn, it will affect the current turn. If not, it affects the
 *   next turn instead.
 * - Replace 'x' with a number representing the number of slots to change.
 *   - Negative numbers move the target closer to the front.
 *   - Positive numbers move the target towards the back.
 * - This effect will occur as many times as there are successfully connected
 *   hits for each target, meaning a target can have its turn order shifted
 *   multiple times.
 * - These are best used with single target skills/items as multi-target skills
 *   may shift multiple targets back and forth with each other if they are
 *   adjacent to one another.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change OTB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change OTB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the OTB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change OTB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change OTB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear OTB Turn Order Graphic
 * - Clears the OTB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: OTB Turn Order Visibility
 * - Determine the visibility of the OTB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the OTB Turn Order Display.
 *
 * ---
 * 
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * The following are Script Calls that can be used with this plugin. These are
 * made for JavaScript proficient users. We are not responsible if you use them
 * incorrectly or for unintended usage.
 *
 * ---
 * 
 * === Add Action-Related Script Calls ===
 * 
 * ---
 * 
 * $otbAddBattlerToCurrentTurnEnd(battler, times)
 * 
 * - Adds a battler to current turn's end
 * - Replace 'battler' with a battler object or target
 * - Replace 'times' with a number representing the number of actions to add
 * 
 * ---
 * 
 * $otbAddBattlerToNextTurnEnd(battler, times)
 * 
 * - Adds a battler to next turn's end
 * - Replace 'battler' with a battler object or target
 * - Replace 'times' with a number representing the number of actions to add
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conversion Settings
 * ============================================================================
 *
 * Automatically converts specific mechanics to fit OTB.
 *
 * ---
 *
 * Buffs
 * 
 *   AGI Buff => Current:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Buff => Next:
 *   - Auto-convert AGI Buff effects for Items/Skills to speed up target's
 *     next Turn Order?
 *
 * ---
 *
 * Debuffs
 * 
 *   AGI Debuff => Current:
 *   - Auto-convert AGI Debuff effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   AGI Debuff => Next:
 *   - Auto-convert AGI Debuff effects for Items/Skills to slow down target's
 *     next Turn Order?
 *
 * ---
 * 
 * States (AGI >= 105%)
 * 
 *   Add State => Current:
 *   - Auto-convert AGI Up States effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 *   Add State => Next:
 *   - Auto-convert AGI Up States effects for Items/Skills to speed up target's
 *     current Turn Order?
 * 
 * ---
 * 
 * States (AGI <= 95%)
 * 
 *   Add State => Current:
 *   - Auto-convert AGI Down States effects for Items/Skills to slow down
 *     target's current Turn Order?
 * 
 *   Add State => Next:
 *   - Auto-convert AGI Down States effects for Items/Skills to slow down
 *     target's current Turn Order?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of Battle System OTB. These range from how Action
 * Times are handled to speed.
 *
 * ---
 *
 * Action Times+
 * 
 *   Enable Action Times?:
 *   - Enable Action Times+ to have an effect on OTB?
 * 
 *     Randomize Order?:
 *     - If enabled, randomize the action order for added actions?
 *
 * ---
 *
 * Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   Post-Stun Infinity?:
 *   - After a 2+ turn stun states, battlers have infinity speed for their
 *     recovery turn.
 *   - Once again, this only applies to stun states that last 2+ turns.
 * 
 *     Infinity Clamp?:
 *     - Prevents turn order manipulation from going faster than infinity
 *       speed battlers.
 * 
 *   JS: Initial Speed:
 *   - Code used to calculate initial speed at the start of battle.
 * 
 *   JS: Speed => Order:
 *   - Code used to calculate how action speeds alter next turn's order.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Display
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System OTB. These adjust how the
 * two visible turn orders appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 *     - Top
 *     - Bottom
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *     Offset X:
 *     - Reposition the display's X coordinates by this much when the Help
 *       Window is visible.
 * 
 *     Offset Y:
 *     - Reposition the display's Y coordinates by this much when the Help
 *       Window is visible.
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *     - Left to Right
 *     - Right to Left
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 * 
 * ---
 * 
 * UI Background
 * 
 *   Background Style:
 *   - Select the style you want for the background.
 *     - fill
 *     - gradient
 *     - image
 *     - transparent
 * 
 *   Image Filename:
 *   - When using the "image" style, select an image from /img/system/ as the
 *     background image.
 * 
 *     Offset X:
 *     - How much do you want to offset the Background Image's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Background Image's Y position?
 * 
 * ---
 * 
 * UI Text
 * 
 *   Font Size:
 *   - The font size used for parameter values.
 * 
 *   Active Battler Text:
 *   - Text used to display the active battler.
 *   - This text will always be center aligned.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Current Turn Text:
 *   - Text used to display the current turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Next Turn Text:
 *   - Text used to display the next turn.
 * 
 *     Offset X:
 *     - How much do you want to offset the text's X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the text's Y position?
 * 
 *   Text Align:
 *   - Text alignment for the Current and Next Turn texts?
 *     - auto
 *     - left
 *     - center
 *     - right
 * 
 * ---
 * 
 * Slots
 * 
 *   Width:
 *   - How many pixels wide should the slots be on the Turn Order display?
 * 
 *   Height:
 *   - How many pixels tall should the slots be on the Turn Order display?
 * 
 *   Preview Scale:
 *   - How much do you want to scale the preview sprites by?
 *   - Use a number between 0 and 1 for the best results.
 * 
 *     Offset X:
 *     - How much do you want to offset the Preview Sprites' X position?
 * 
 *     Offset Y:
 *     - How much do you want to offset the Preview Sprites' Y position?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 * ---
 * 
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 * 
 *       Preview Version:
 *       - A different setting is used for the preview version.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.20: January 19, 2026
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Parameters > Conversion Settings > States (AGI >= 105%)
 * *** Parameters > Conversion Settings > States (AGI <= 95%)
 * **** Added auto-conversion functionality for states with AGI modifiers to
 *      automatically manipulate turn orders for current and next.
 * **** Set this to false to not use.
 * 
 * Version 1.19: November 13, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New script calls added by Olivia:
 * *** $otbAddBattlerToCurrentTurnEnd(battler, times)
 * *** $otbAddBattlerToNextTurnEnd(battler, times)
 * **** Adds actions for target battler to the end of current/next turn.
 * 
 * Version 1.18: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where adding states with Action Times+ would add too many
 *    actions. Fix made by Olivia.
 * 
 * Version 1.17: November 14, 2024
 * * Bug Fixes!
 * ** Fixed a bug where the <OTB Target Follow Turn: +x> and similar notetags
 *    altered the following turn regardless of the presence of the target in 
 *    current turn order. Fix made by Olivia.
 * 
 * Version 1.16: September 19, 2024
 * * Compatibility Update!
 * ** Added better compatibility with Auto Skill Triggers. Update by Arisu.
 * 
 * Version 1.15: May 16, 2024
 * * Feature Update!
 * ** Direct removal of stun states will restore actions for battlers for
 *    current turns and follow up turns. Update made by Olivia.
 * 
 * Version 1.14: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused turn order glitches with Action Times+ that
 *    aren't at 100% value. Fix made by Olivia.
 * ** Fixed a bug that caused added Action Times+ to not trigger on actors that
 *    have already exhausted their current turns if raised due to a state.
 *    Fix made by Olivia.
 * 
 * Version 1.13: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug where the Forced Action of a battler is not used properly.
 *    Fix made by Arisu.
 * 
 * Version 1.12: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the OTB Turn Order faces and icons to not change
 *    properly for actors and enemies.
 * 
 * Version 1.10: July 7, 2022
 * * Feature Update!
 * ** When the "Recover All" event command revives a dead unit, that revived
 *    unit can gain actions back if all other conditions are met. Update made
 *    by Olivia.
 * 
 * Version 1.09: June 2, 2022
 * * Documentation Update!
 * ** Added "Force Actions" to "Major Updates" section.
 * *** Due to how OTB behaves, Force Actions have be adjusted to fit the battle
 *     system. With other battle systems, force actions are added into a hidden
 *     queue that would act upon after the current battler finishes his/her
 *     current action. The new changes made with force actions is that they now
 *     appear on the queue visibly.
 * * Bug Fixes!
 * ** Fixed a bug that caused Forced Actions to not work properly while in OTB.
 *    Changes made to Forced Actions will now insert new actions at the front
 *    of the current action queue. Fix made by Olivia.
 * 
 * Version 1.08: March 10, 2022
 * * Feature Update!
 * ** OTB Instant Actions should now appear in the turn order in a more
 *    sensible fashion. Update made by Olivia.
 * 
 * Version 1.07: February 24, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia:
 * *** <OTB User Add Current Turn Actions: x>
 * *** <OTB User Add Next Turn Actions: x>
 * *** <OTB Target Add Current Turn Actions: x>
 * *** <OTB Target Add Next Turn Actions: x>
 * **** Adds extra actions for the user/target to perform during the
 *      current/next turn.
 * **** Added actions will go towards the back of the action list.
 * **** Multi-hit skills/items will trigger this effect multiple times.
 * 
 * Version 1.05: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.04: August 6, 2021
 * * Bug Fixes!
 * ** Enemies with multiple actions will no longer step forward when it's not
 *    their turn. Fix made by Olivia.
 * 
 * Version 1.03: June 25, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.02: April 16, 2021
 * * Bug Fixes!
 * ** Post-stun infinity clamping should now be adjusted properly for
 *    previewing turn order changes.
 * 
 * Version 1.01: April 9, 2021
 * * Bug Fixes!
 * ** Subsequent battles will properly reset the turn order. Fix by Olivia.
 * 
 * Version 1.00 Official Release Date: April 26, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorIcon
 * @text Actor: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the OTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderActorFace
 * @text Actor: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the OTB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderClearActorGraphic
 * @text Actor: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderEnemyIcon
 * @text Enemy: Change OTB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the OTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderEnemyFace
 * @text Enemy: Change OTB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the OTB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OtbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear OTB Turn Order Graphic
 * @desc Clears the OTB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: OTB Turn Order Visibility
 * @desc Determine the visibility of the OTB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the OTB Turn Order Display.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleSystemOTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Conversion:struct
 * @text Conversion Settings
 * @type struct<Conversion>
 * @desc Automatically converts specific mechanics to fit OTB.
 * @default {"Buffs":"","ConvertAgiBuffCurrent:eval":"true","ConvertAgiBuffNext:eval":"true","Debuffs":"","ConvertAgiDebuffCurrent:eval":"true","ConvertAgiDebuffNext:eval":"true"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Determines the mechanics of Battle System OTB.
 * @default {"Actions":"","EnableActionTimes:eval":"true","RandomizeActionTimesOrder:eval":"true","Speed":"","AllowRandomSpeed:eval":"false","PostStunInfinitySpeed:eval":"true","InfinityClamp:eval":"true","InitialSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Return Speed\\nreturn speed;\"","ConvertSpeedJS:func":"\"// Declare Constants\\nconst item = this.item();\\nconst modifier = 50;\\n\\n// Calculate Order Slots Changed\\nlet change = item.speed / (-modifier);\\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\\n\\n// Return Change\\nreturn change || 0;\""}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System OTB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","RepositionTopHelpX:num":"+0","RepositionTopHelpY:num":"+96","RepositionLogWindow:eval":"true","LogWindowOffsetY:num":"+0","OrderDirection:eval":"false","SubjectDistance:num":"16","ScreenBuffer:num":"36","UiBackground":"","BgDimStyle:str":"gradient","BgImageFilename:str":"","BgImageOffsetX:num":"+0","BgImageOffsetY:num":"+0","UiText":"","UiFontSize:num":"16","UiSubjectText:str":"★","UiSubjectOffsetX:num":"+0","UiSubjectOffsetY:num":"-6","UiCurrentText:str":"✦CURRENT TURN✦","UiCurrentOffsetX:num":"+6","UiCurrentOffsetY:num":"-6","UiNextText:str":"✧NEXT TURN✧","UiNextOffsetX:num":"+6","UiNextOffsetY:num":"-6","UiAlignment:str":"auto","Slots":"","SpriteThin:num":"72","SpriteLength:num":"72","PreviewScale:num":"0.5","PreviewOffsetX:num":"+0","PreviewOffsetY:num":"+0","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","PreviewActorBorderColor:str":"0","ActorSystemBorder:str":"","PreviewActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","PreviewEnemyBorderColor:str":"0","EnemySystemBorder:str":"","PreviewEnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","PreviewActorBgColor1:str":"19","ActorBgColor2:str":"9","PreviewActorBgColor2:str":"0","ActorSystemBg:str":"","PreviewActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","PreviewEnemyBgColor1:str":"19","EnemyBgColor2:str":"18","PreviewEnemyBgColor2:str":"0","EnemySystemBg:str":"","PreviewEnemySystemBg:str":""}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Conversion Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conversion:
 * 
 * @param Buffs
 *
 * @param ConvertAgiBuffCurrent:eval
 * @text AGI Buff => Current
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiBuffNext:eval
 * @text AGI Buff => Next
 * @parent Buffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Buff effects for Items/Skills to speed up target's next Turn Order?
 * @default true
 * 
 * @param Debuffs
 *
 * @param ConvertAgiDebuffCurrent:eval
 * @text AGI Debuff => Current
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to slow down target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiDebuffNext:eval
 * @text AGI Debuff => Next
 * @parent Debuffs
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Debuff effects for Items/Skills to slow down target's next Turn Order?
 * @default true
 * 
 * @param StatesUp
 * @text States (AGI >= 105%)
 *
 * @param ConvertAgiStateUpCurrent:eval
 * @text Add State => Current
 * @parent StatesUp
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Up States effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiStateUpNext:eval
 * @text Add State => Next
 * @parent StatesUp
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Up States effects for Items/Skills to speed up target's current Turn Order?
 * @default true
 * 
 * @param StatesDown
 * @text States (AGI <= 95%)
 *
 * @param ConvertAgiStateDownCurrent:eval
 * @text Add State => Current
 * @parent StatesDown
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Down States effects for Items/Skills to slow down target's current Turn Order?
 * @default true
 *
 * @param ConvertAgiStateDownNext:eval
 * @text Add State => Next
 * @parent StatesDown
 * @type boolean
 * @on Convert
 * @off Don't Convert
 * @desc Auto-convert AGI Down States effects for Items/Skills to slow down target's current Turn Order?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param Actions
 * @text Action Times+
 *
 * @param EnableActionTimes:eval
 * @text Enable Action Times?
 * @parent Actions
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Action Times+ to have an effect on OTB?
 * @default true
 *
 * @param RandomizeActionTimesOrder:eval
 * @text Randomize Order?
 * @parent EnableActionTimes:eval
 * @type boolean
 * @on Randomize
 * @off Clumped
 * @desc If enabled, randomize the action order for added actions?
 * @default true
 * 
 * @param Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent Speed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param PostStunInfinitySpeed:eval
 * @text Post-Stun Infinity?
 * @parent Speed
 * @type boolean
 * @on Infinity
 * @off Normal
 * @desc After a 2+ turn stun states, battlers have infinity speed for their recovery turn.
 * @default true
 *
 * @param InfinityClamp:eval
 * @text Infinity Clamp?
 * @parent PostStunInfinitySpeed:eval
 * @type boolean
 * @on Enable Clamp
 * @off Disable Clamp
 * @desc Prevents turn order manipulation from going faster than infinity speed battlers.
 * @default true
 *
 * @param InitialSpeedJS:func
 * @text JS: Initial Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param ConvertSpeedJS:func
 * @text JS: Speed => Order
 * @parent Speed
 * @type note
 * @desc Code used to calculate how action speeds alter next turn's order.
 * @default "// Declare Constants\nconst item = this.item();\nconst modifier = 50;\n\n// Calculate Order Slots Changed\nlet change = item.speed / (-modifier);\nchange = (change >= 0) ? Math.ceil(change) : Math.floor(change);\n\n// Return Change\nreturn change || 0;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionTopHelpX:num
 * @text Offset X
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default +0
 *
 * @param RepositionTopHelpY:num
 * @text Offset Y
 * @parent RepositionTopForHelp:eval
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default +96
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param LogWindowOffsetY:num
 * @text Offset Y
 * @parent RepositionLogWindow:eval
 * @desc How much do you want to offset the Log Window's Y position?
 * @default +0
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right
 * @off Right to Left
 * @desc Decide on the direction of the Turn Order.
 * @default false
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 16
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 36
 *
 * @param UiBackground
 * @text UI Background
 *
 * @param BgDimStyle:str
 * @text Background Style
 * @parent UiBackground
 * @type select
 * @option fill
 * @option gradient
 * @option image
 * @option transparent
 * @desc Select the style you want for the background.
 * @default gradient
 *
 * @param BgImageFilename:str
 * @text Image Filename
 * @parent UiBackground
 * @type file
 * @dir img/system/
 * @desc When using the "image" style, select an image from /img/system/ as the background image.
 * @default 
 *
 * @param BgImageOffsetX:num
 * @text Offset X
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's X position?
 * @default +0
 *
 * @param BgImageOffsetY:num
 * @text Offset Y
 * @parent BgImageFilename:str
 * @desc How much do you want to offset the Background Image's Y position?
 * @default +0
 *
 * @param UiText
 * @text UI Text
 *
 * @param UiFontSize:num
 * @text Font Size
 * @parent UiText
 * @desc The font size used for parameter values.
 * @default 16
 *
 * @param UiSubjectText:str
 * @text Active Battler Text
 * @parent UiText
 * @desc Text used to display the active battler.
 * This text will always be center aligned.
 * @default ★
 *
 * @param UiSubjectOffsetX:num
 * @text Offset X
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's X position?
 * @default +0
 *
 * @param UiSubjectOffsetY:num
 * @text Offset Y
 * @parent UiSubjectText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiCurrentText:str
 * @text Current Turn Text
 * @parent UiText
 * @desc Text used to display the current turn.
 * @default ✦CURRENT TURN✦
 *
 * @param UiCurrentOffsetX:num
 * @text Offset X
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiCurrentOffsetY:num
 * @text Offset Y
 * @parent UiCurrentText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiNextText:str
 * @text Next Turn Text
 * @parent UiText
 * @desc Text used to display the next turn.
 * @default ✧NEXT TURN✧
 *
 * @param UiNextOffsetX:num
 * @text Offset X
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's X position?
 * @default +6
 *
 * @param UiNextOffsetY:num
 * @text Offset Y
 * @parent UiNextText:str
 * @desc How much do you want to offset the text's Y position?
 * @default -6
 *
 * @param UiAlignment:str
 * @text Text Align
 * @parent UiText
 * @type combo
 * @option auto
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Current and Next Turn texts?
 * @default auto
 * 
 * @param Slots
 *
 * @param SpriteThin:num
 * @text Width
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels wide should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteLength:num
 * @text Height
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels tall should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param PreviewScale:num
 * @text Preview Scale
 * @parent Slots
 * @desc How much do you want to scale the preview sprites by?
 * Use a number between 0 and 1 for the best results.
 * @default 0.5
 *
 * @param PreviewOffsetX:num
 * @text Offset X
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' X position?
 * @default +0
 *
 * @param PreviewOffsetY:num
 * @text Offset Y
 * @parent PreviewScale:num
 * @desc How much do you want to offset the Preview Sprites' Y position?
 * @default +0
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param PreviewActorBorderColor:str
 * @text Preview Version
 * @parent ActorBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBorder:str
 * @text Preview Version
 * @parent ActorSystemBorder:str
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param PreviewEnemyBorderColor:str
 * @text Preview Version
 * @parent EnemyBorderColor:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBorder:str
 * @text Preview Version
 * @parent EnemySystemBorder:str
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PreviewActorBgColor1:str
 * @text Preview Version
 * @parent ActorBgColor1:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param PreviewActorBgColor2:str
 * @text Preview Version
 * @parent ActorBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param PreviewActorSystemBg:str
 * @text Preview Version
 * @parent ActorSystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PreviewEnemyBgColor1:str
 * @text Preview Version
 * @parent EnemyBgColor1:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param PreviewEnemyBgColor2:str
 * @text Preview Version
 * @parent EnemyBgColor2:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param PreviewEnemySystemBg:str
 * @text Preview Version
 * @parent EnemySystemBg:str
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x247375=_0x5ed7;function _0x5ed7(_0x45a12c,_0x3748b0){const _0x32c3f4=_0x32c3();return _0x5ed7=function(_0x5ed79d,_0x227fa7){_0x5ed79d=_0x5ed79d-0x18e;let _0x14da7d=_0x32c3f4[_0x5ed79d];return _0x14da7d;},_0x5ed7(_0x45a12c,_0x3748b0);}(function(_0x5321df,_0x6796b1){const _0x205bab=_0x5ed7,_0x41b597=_0x5321df();while(!![]){try{const _0x1a440c=-parseInt(_0x205bab(0x24f))/0x1*(-parseInt(_0x205bab(0x22f))/0x2)+-parseInt(_0x205bab(0x218))/0x3*(parseInt(_0x205bab(0x250))/0x4)+parseInt(_0x205bab(0x327))/0x5+parseInt(_0x205bab(0x197))/0x6+-parseInt(_0x205bab(0x2ef))/0x7*(parseInt(_0x205bab(0x289))/0x8)+parseInt(_0x205bab(0x1b5))/0x9+-parseInt(_0x205bab(0x2c4))/0xa;if(_0x1a440c===_0x6796b1)break;else _0x41b597['push'](_0x41b597['shift']());}catch(_0x360509){_0x41b597['push'](_0x41b597['shift']());}}}(_0x32c3,0xe681a));var label=_0x247375(0x2d9),tier=tier||0x0,dependencies=[_0x247375(0x22b),'VisuMZ_1_BattleCore'],pluginData=$plugins[_0x247375(0x2d6)](function(_0x252bc4){const _0x1e883f=_0x247375;return _0x252bc4['status']&&_0x252bc4[_0x1e883f(0x1ee)][_0x1e883f(0x334)]('['+label+']');})[0x0];VisuMZ[label][_0x247375(0x1df)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x247375(0x1d0)]=function(_0x162252,_0x12a8b6){const _0x5a7fa1=_0x247375;for(const _0x5a4129 in _0x12a8b6){if(_0x5a4129[_0x5a7fa1(0x206)](/(.*):(.*)/i)){const _0x57f5cc=String(RegExp['$1']),_0x565a22=String(RegExp['$2'])[_0x5a7fa1(0x267)]()[_0x5a7fa1(0x28f)]();let _0x364c8d,_0x14ce1c,_0x47f8cf;switch(_0x565a22){case _0x5a7fa1(0x211):_0x364c8d=_0x12a8b6[_0x5a4129]!==''?Number(_0x12a8b6[_0x5a4129]):0x0;break;case _0x5a7fa1(0x1a8):_0x14ce1c=_0x12a8b6[_0x5a4129]!==''?JSON[_0x5a7fa1(0x36c)](_0x12a8b6[_0x5a4129]):[],_0x364c8d=_0x14ce1c[_0x5a7fa1(0x262)](_0x472656=>Number(_0x472656));break;case _0x5a7fa1(0x319):_0x364c8d=_0x12a8b6[_0x5a4129]!==''?eval(_0x12a8b6[_0x5a4129]):null;break;case'ARRAYEVAL':_0x14ce1c=_0x12a8b6[_0x5a4129]!==''?JSON['parse'](_0x12a8b6[_0x5a4129]):[],_0x364c8d=_0x14ce1c['map'](_0x53eaa7=>eval(_0x53eaa7));break;case _0x5a7fa1(0x294):_0x364c8d=_0x12a8b6[_0x5a4129]!==''?JSON['parse'](_0x12a8b6[_0x5a4129]):'';break;case _0x5a7fa1(0x3c7):_0x14ce1c=_0x12a8b6[_0x5a4129]!==''?JSON[_0x5a7fa1(0x36c)](_0x12a8b6[_0x5a4129]):[],_0x364c8d=_0x14ce1c[_0x5a7fa1(0x262)](_0x2d75fe=>JSON[_0x5a7fa1(0x36c)](_0x2d75fe));break;case'FUNC':_0x364c8d=_0x12a8b6[_0x5a4129]!==''?new Function(JSON['parse'](_0x12a8b6[_0x5a4129])):new Function(_0x5a7fa1(0x387));break;case _0x5a7fa1(0x2e2):_0x14ce1c=_0x12a8b6[_0x5a4129]!==''?JSON[_0x5a7fa1(0x36c)](_0x12a8b6[_0x5a4129]):[],_0x364c8d=_0x14ce1c['map'](_0x2f5a16=>new Function(JSON[_0x5a7fa1(0x36c)](_0x2f5a16)));break;case _0x5a7fa1(0x32a):_0x364c8d=_0x12a8b6[_0x5a4129]!==''?String(_0x12a8b6[_0x5a4129]):'';break;case _0x5a7fa1(0x2a8):_0x14ce1c=_0x12a8b6[_0x5a4129]!==''?JSON['parse'](_0x12a8b6[_0x5a4129]):[],_0x364c8d=_0x14ce1c[_0x5a7fa1(0x262)](_0x8b24f6=>String(_0x8b24f6));break;case _0x5a7fa1(0x39a):_0x47f8cf=_0x12a8b6[_0x5a4129]!==''?JSON[_0x5a7fa1(0x36c)](_0x12a8b6[_0x5a4129]):{},_0x364c8d=VisuMZ[_0x5a7fa1(0x1d0)]({},_0x47f8cf);break;case'ARRAYSTRUCT':_0x14ce1c=_0x12a8b6[_0x5a4129]!==''?JSON[_0x5a7fa1(0x36c)](_0x12a8b6[_0x5a4129]):[],_0x364c8d=_0x14ce1c[_0x5a7fa1(0x262)](_0x2733b7=>VisuMZ[_0x5a7fa1(0x1d0)]({},JSON[_0x5a7fa1(0x36c)](_0x2733b7)));break;default:continue;}_0x162252[_0x57f5cc]=_0x364c8d;}}return _0x162252;},(_0x15c6e3=>{const _0xb761d4=_0x247375,_0x394156=_0x15c6e3[_0xb761d4(0x33d)];for(const _0x31adc6 of dependencies){if(!Imported[_0x31adc6]){alert(_0xb761d4(0x21a)[_0xb761d4(0x1f2)](_0x394156,_0x31adc6)),SceneManager[_0xb761d4(0x26e)]();break;}}const _0x14eb2e=_0x15c6e3[_0xb761d4(0x1ee)];if(_0x14eb2e[_0xb761d4(0x206)](/\[Version[ ](.*?)\]/i)){const _0x3181c2=Number(RegExp['$1']);_0x3181c2!==VisuMZ[label][_0xb761d4(0x244)]&&(alert(_0xb761d4(0x304)[_0xb761d4(0x1f2)](_0x394156,_0x3181c2)),SceneManager[_0xb761d4(0x26e)]());}if(_0x14eb2e['match'](/\[Tier[ ](\d+)\]/i)){const _0x36ba12=Number(RegExp['$1']);_0x36ba12<tier?(alert(_0xb761d4(0x31b)[_0xb761d4(0x1f2)](_0x394156,_0x36ba12,tier)),SceneManager[_0xb761d4(0x26e)]()):tier=Math[_0xb761d4(0x1de)](_0x36ba12,tier);}VisuMZ[_0xb761d4(0x1d0)](VisuMZ[label][_0xb761d4(0x1df)],_0x15c6e3[_0xb761d4(0x208)]);})(pluginData),PluginManager[_0x247375(0x2c9)](pluginData['name'],_0x247375(0x2b0),_0x4eac29=>{const _0x5b0710=_0x247375;VisuMZ['ConvertParams'](_0x4eac29,_0x4eac29);const _0x57eb76=_0x4eac29['Actors'],_0x515cfa=_0x4eac29[_0x5b0710(0x313)];for(const _0x3772b4 of _0x57eb76){const _0xb6e611=$gameActors[_0x5b0710(0x363)](_0x3772b4);if(!_0xb6e611)continue;_0xb6e611[_0x5b0710(0x379)]=_0x5b0710(0x1bb),_0xb6e611['_otbTurnOrderIconIndex']=_0x515cfa;}}),PluginManager[_0x247375(0x2c9)](pluginData['name'],_0x247375(0x19a),_0x3c8daa=>{const _0x27e6be=_0x247375;VisuMZ[_0x27e6be(0x1d0)](_0x3c8daa,_0x3c8daa);const _0x14cc4b=_0x3c8daa[_0x27e6be(0x3bf)],_0x22a8c4=_0x3c8daa[_0x27e6be(0x33c)],_0x4d2c02=_0x3c8daa[_0x27e6be(0x39b)];for(const _0x59aade of _0x14cc4b){const _0x3927dc=$gameActors['actor'](_0x59aade);if(!_0x3927dc)continue;_0x3927dc[_0x27e6be(0x379)]='face',_0x3927dc[_0x27e6be(0x36b)]=_0x22a8c4,_0x3927dc['_otbTurnOrderFaceIndex']=_0x4d2c02;}}),PluginManager['registerCommand'](pluginData[_0x247375(0x33d)],_0x247375(0x1cf),_0xa3b1e6=>{const _0x4c725e=_0x247375;VisuMZ[_0x4c725e(0x1d0)](_0xa3b1e6,_0xa3b1e6);const _0x433d39=_0xa3b1e6[_0x4c725e(0x3bf)];for(const _0x1c0983 of _0x433d39){const _0x1dea17=$gameActors[_0x4c725e(0x363)](_0x1c0983);if(!_0x1dea17)continue;_0x1dea17[_0x4c725e(0x215)]();}}),PluginManager[_0x247375(0x2c9)](pluginData[_0x247375(0x33d)],_0x247375(0x3aa),_0x307506=>{const _0x1c49b6=_0x247375;VisuMZ[_0x1c49b6(0x1d0)](_0x307506,_0x307506);const _0x40fba5=_0x307506[_0x1c49b6(0x353)],_0x3eb5a0=_0x307506[_0x1c49b6(0x313)];for(const _0x390dc6 of _0x40fba5){const _0x26d28a=$gameTroop[_0x1c49b6(0x30e)]()[_0x390dc6];if(!_0x26d28a)continue;_0x26d28a[_0x1c49b6(0x379)]=_0x1c49b6(0x1bb),_0x26d28a[_0x1c49b6(0x227)]=_0x3eb5a0;}}),PluginManager[_0x247375(0x2c9)](pluginData[_0x247375(0x33d)],'OtbTurnOrderEnemyFace',_0x3c0102=>{const _0x47a796=_0x247375;VisuMZ[_0x47a796(0x1d0)](_0x3c0102,_0x3c0102);const _0x592b38=_0x3c0102[_0x47a796(0x353)],_0x1c85db=_0x3c0102[_0x47a796(0x33c)],_0x42e628=_0x3c0102[_0x47a796(0x39b)];for(const _0x3d800b of _0x592b38){const _0x416ea2=$gameTroop['members']()[_0x3d800b];if(!_0x416ea2)continue;_0x416ea2[_0x47a796(0x379)]=_0x47a796(0x1f8),_0x416ea2[_0x47a796(0x36b)]=_0x1c85db,_0x416ea2[_0x47a796(0x3cc)]=_0x42e628;}}),PluginManager[_0x247375(0x2c9)](pluginData['name'],_0x247375(0x2cd),_0x569ece=>{const _0x32dbf1=_0x247375;VisuMZ[_0x32dbf1(0x1d0)](_0x569ece,_0x569ece);const _0x30270c=_0x569ece[_0x32dbf1(0x353)];for(const _0x37d538 of _0x30270c){const _0x141a92=$gameTroop['members']()[_0x37d538];if(!_0x141a92)continue;_0x141a92[_0x32dbf1(0x215)]();}}),PluginManager[_0x247375(0x2c9)](pluginData['name'],_0x247375(0x394),_0xe67e34=>{const _0x1dbbea=_0x247375;VisuMZ[_0x1dbbea(0x1d0)](_0xe67e34,_0xe67e34);const _0x5ed673=_0xe67e34[_0x1dbbea(0x30d)];$gameSystem[_0x1dbbea(0x232)](_0x5ed673);}),VisuMZ[_0x247375(0x2d9)][_0x247375(0x314)]={'Instant':/<OTB (?:INSTANT|INSTANT CAST|INSTANT USE)>/i,'UserFollOrder':/<OTB USER FOLLOW TURN: ([\+\-]\d+)>/i,'UserCurrOrder':/<OTB USER CURRENT TURN: ([\+\-]\d+)>/i,'UserNextOrder':/<OTB USER NEXT TURN: ([\+\-]\d+)>/i,'TargetFollOrder':/<OTB TARGET FOLLOW TURN: ([\+\-]\d+)>/i,'TargetCurrOrder':/<OTB TARGET CURRENT TURN: ([\+\-]\d+)>/i,'TargetNextOrder':/<OTB TARGET NEXT TURN: ([\+\-]\d+)>/i,'UserAddActionCurrent':/<OTB USER ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'UserAddActionNext':/<OTB USER ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionCurrent':/<OTB TARGET ADD CURRENT TURN (?:ACTION|ACTIONS): (\d+)>/i,'TargetAddActionNext':/<OTB TARGET ADD NEXT TURN (?:ACTION|ACTIONS): (\d+)>/i},DataManager[_0x247375(0x278)]=function(_0x621dc2){const _0x34c613=_0x247375;_0x621dc2=_0x621dc2['toUpperCase']()[_0x34c613(0x28f)](),this[_0x34c613(0x258)]=this[_0x34c613(0x258)]||{};if(this[_0x34c613(0x258)][_0x621dc2])return this['_stateIDs'][_0x621dc2];for(const _0x4a2030 of $dataStates){if(!_0x4a2030)continue;this[_0x34c613(0x258)][_0x4a2030['name'][_0x34c613(0x267)]()[_0x34c613(0x28f)]()]=_0x4a2030['id'];}return this[_0x34c613(0x258)][_0x621dc2]||0x0;},ImageManager['svActorHorzCells']=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x247375(0x37c)]=ImageManager['svActorVertCells']||0x6,SceneManager[_0x247375(0x190)]=function(){const _0x52e902=_0x247375;return this['_scene']&&this[_0x52e902(0x1f9)][_0x52e902(0x1d3)]===Scene_Battle;},VisuMZ[_0x247375(0x2d9)][_0x247375(0x255)]=BattleManager[_0x247375(0x1c4)],BattleManager['setup']=function(_0x677d54,_0xd2aa89,_0x2b8966){const _0x2f2422=_0x247375;VisuMZ[_0x2f2422(0x2d9)][_0x2f2422(0x255)][_0x2f2422(0x269)](this,_0x677d54,_0xd2aa89,_0x2b8966),this[_0x2f2422(0x26d)]();},BattleManager['initMembersOTB']=function(){const _0x434ec8=_0x247375;if(!this[_0x434ec8(0x35a)]())return;this['_otb_actionBattlersNext']=[],this[_0x434ec8(0x239)]=![];},VisuMZ[_0x247375(0x2d9)][_0x247375(0x1ae)]=BattleManager[_0x247375(0x23e)],BattleManager['battleSys']=function(){const _0x34d1fd=_0x247375;if(this[_0x34d1fd(0x35a)]())return _0x34d1fd(0x330);return VisuMZ[_0x34d1fd(0x2d9)]['BattleManager_battleSys'][_0x34d1fd(0x269)](this);},BattleManager[_0x247375(0x35a)]=function(){const _0x5d8a48=_0x247375;return $gameSystem[_0x5d8a48(0x390)]()===_0x5d8a48(0x330);},VisuMZ[_0x247375(0x2d9)]['BattleManager_isTpb']=BattleManager[_0x247375(0x36f)],BattleManager[_0x247375(0x36f)]=function(){const _0x4ed67d=_0x247375;if(this['isOTB']())return![];return VisuMZ[_0x4ed67d(0x2d9)]['BattleManager_isTpb'][_0x4ed67d(0x269)](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x3b9)]=BattleManager[_0x247375(0x1c1)],BattleManager['isActiveTpb']=function(){const _0x3bfea4=_0x247375;if(this[_0x3bfea4(0x35a)]())return![];return VisuMZ[_0x3bfea4(0x2d9)][_0x3bfea4(0x3b9)][_0x3bfea4(0x269)](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x1ce)]=BattleManager[_0x247375(0x2a2)],BattleManager['isTurnBased']=function(){const _0x229dee=_0x247375;if(this[_0x229dee(0x35a)]())return!![];return VisuMZ[_0x229dee(0x2d9)][_0x229dee(0x1ce)][_0x229dee(0x269)](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x377)]=BattleManager[_0x247375(0x3c2)],BattleManager[_0x247375(0x3c2)]=function(){const _0x4d17c9=_0x247375;VisuMZ[_0x4d17c9(0x2d9)][_0x4d17c9(0x377)][_0x4d17c9(0x269)](this),this[_0x4d17c9(0x35a)]()&&$gameParty['canInput']()&&!this[_0x4d17c9(0x3b6)]&&this[_0x4d17c9(0x344)]();},BattleManager[_0x247375(0x344)]=function(){this['startTurn']();},VisuMZ[_0x247375(0x2d9)]['BattleManager_processTurn']=BattleManager['processTurn'],BattleManager[_0x247375(0x1fa)]=function(){const _0x348091=_0x247375;this[_0x348091(0x35a)]()?this[_0x348091(0x1c5)]():VisuMZ[_0x348091(0x2d9)][_0x348091(0x2e8)][_0x348091(0x269)](this);},BattleManager[_0x247375(0x1c5)]=function(){const _0x43ebee=_0x247375,_0x4c5ae0=this[_0x43ebee(0x335)];if(_0x4c5ae0[_0x43ebee(0x33a)]()&&_0x4c5ae0[_0x43ebee(0x2e7)]()){const _0x4c5f21=_0x4c5ae0[_0x43ebee(0x273)]();if(!_0x4c5f21)VisuMZ[_0x43ebee(0x2d9)][_0x43ebee(0x2e8)][_0x43ebee(0x269)](this);else _0x4c5f21['_forceAction']?VisuMZ[_0x43ebee(0x2d9)][_0x43ebee(0x2e8)][_0x43ebee(0x269)](this):(this[_0x43ebee(0x224)]=_0x4c5ae0,this[_0x43ebee(0x2dc)]());}else VisuMZ[_0x43ebee(0x2d9)][_0x43ebee(0x2e8)]['call'](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x32d)]=BattleManager[_0x247375(0x259)],BattleManager['finishActorInput']=function(){const _0x52f5fe=_0x247375;this[_0x52f5fe(0x35a)]()?VisuMZ[_0x52f5fe(0x2d9)][_0x52f5fe(0x2e8)]['call'](this):VisuMZ['BattleSystemOTB'][_0x52f5fe(0x32d)]['call'](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x1b1)]=BattleManager[_0x247375(0x1dc)],BattleManager[_0x247375(0x1dc)]=function(){const _0x3b1317=_0x247375;this['isOTB']()?this[_0x3b1317(0x368)]():VisuMZ['BattleSystemOTB']['BattleManager_selectNextActor'][_0x3b1317(0x269)](this);},BattleManager[_0x247375(0x368)]=function(){const _0x567add=_0x247375;this[_0x567add(0x224)]=null,this[_0x567add(0x2a9)]=![];},VisuMZ[_0x247375(0x2d9)]['BattleManager_endAction']=BattleManager[_0x247375(0x238)],BattleManager[_0x247375(0x238)]=function(){const _0x54e99f=_0x247375;this[_0x54e99f(0x336)](),VisuMZ['BattleSystemOTB']['BattleManager_endAction'][_0x54e99f(0x269)](this),this[_0x54e99f(0x358)]();},BattleManager[_0x247375(0x336)]=function(){const _0x4da0fd=_0x247375;if(!this[_0x4da0fd(0x35a)]())return;this['removeActionBattlersOTB']();this[_0x4da0fd(0x335)]&&this['_subject'][_0x4da0fd(0x1a7)]();if(this[_0x4da0fd(0x335)]&&this[_0x4da0fd(0x335)][_0x4da0fd(0x2ec)]()&&this[_0x4da0fd(0x2ff)][_0x4da0fd(0x334)](this[_0x4da0fd(0x335)])){const _0xa7a9aa=this[_0x4da0fd(0x335)][_0x4da0fd(0x213)][_0x4da0fd(0x2d6)](_0x4e1d0e=>_0x4e1d0e[_0x4da0fd(0x337)]);this[_0x4da0fd(0x335)][_0x4da0fd(0x2cc)]();if(_0xa7a9aa){let _0x47d2af=_0xa7a9aa[_0x4da0fd(0x33e)];while(_0x47d2af--){this[_0x4da0fd(0x335)][_0x4da0fd(0x213)]['pop']();}this[_0x4da0fd(0x335)][_0x4da0fd(0x213)]=_0xa7a9aa[_0x4da0fd(0x2e9)](this['_subject'][_0x4da0fd(0x213)]);}}},BattleManager[_0x247375(0x358)]=function(){const _0x3941bd=_0x247375;if(!this[_0x3941bd(0x35a)]())return;this['removeActionBattlersOTB']();this[_0x3941bd(0x335)]&&(this['endBattlerActions'](this['_subject']),this['_subject']=null);this[_0x3941bd(0x24d)][_0x3941bd(0x33e)]>0x0&&(this[_0x3941bd(0x335)]=this[_0x3941bd(0x3ad)]());;},BattleManager[_0x247375(0x249)]=VisuMZ[_0x247375(0x2d9)][_0x247375(0x1df)]['Mechanics']['EnableActionTimes'],BattleManager[_0x247375(0x396)]=VisuMZ['BattleSystemOTB'][_0x247375(0x1df)][_0x247375(0x32e)][_0x247375(0x35e)],BattleManager[_0x247375(0x2fa)]=VisuMZ['BattleSystemOTB'][_0x247375(0x1df)][_0x247375(0x32e)][_0x247375(0x21b)],VisuMZ[_0x247375(0x2d9)]['BattleManager_makeActionOrders']=BattleManager[_0x247375(0x3b8)],BattleManager['makeActionOrders']=function(){const _0xfd636e=_0x247375;this['isOTB']()?this[_0xfd636e(0x2d7)]():VisuMZ[_0xfd636e(0x2d9)]['BattleManager_makeActionOrders'][_0xfd636e(0x269)](this);},BattleManager[_0x247375(0x2d7)]=function(){const _0x545370=_0x247375;let _0x2608db=this['_otb_createdFirstTurnOrders']?0x1:0x2;while(_0x2608db--){this[_0x545370(0x1a6)]();}const _0x43fc87=!this[_0x545370(0x239)];this[_0x545370(0x239)]=!![];},BattleManager['makeNextActionOrdersOTB']=function(){const _0x10121c=_0x247375;this[_0x10121c(0x2ff)]=this['_otb_actionBattlersNext'],this['otbShiftNextTurnSpritesToCurrentTurn']();const _0xe512bd=[];_0xe512bd[_0x10121c(0x392)](...$gameParty[_0x10121c(0x354)]()),_0xe512bd[_0x10121c(0x392)](...$gameTroop[_0x10121c(0x30e)]());for(const _0x2e48de of _0xe512bd){_0x2e48de[_0x10121c(0x22e)]();}_0xe512bd[_0x10121c(0x383)]((_0x55a53e,_0xb466ff)=>_0xb466ff[_0x10121c(0x32b)]()-_0x55a53e[_0x10121c(0x32b)]()),this[_0x10121c(0x2d1)]=_0xe512bd,this[_0x10121c(0x393)](),this[_0x10121c(0x191)](),this[_0x10121c(0x311)]();},BattleManager['otbApplyActionTimes']=function(){const _0x1e2870=_0x247375;if(!BattleManager[_0x1e2870(0x249)])return;const _0x356aba=this[_0x1e2870(0x2d1)],_0x350828=this[_0x1e2870(0x226)]();for(const _0xb22308 of _0x350828){if(!_0xb22308)continue;if(!_0xb22308['isAppeared']())continue;if(!_0xb22308[_0x1e2870(0x1a2)]())continue;if(!_0x356aba[_0x1e2870(0x334)](_0xb22308))continue;const _0x39a86b=_0x356aba['indexOf'](_0xb22308);let _0x36001e=_0xb22308[_0x1e2870(0x1b8)]()-0x1;while(_0x36001e--){let _0x4c8eb1=_0x39a86b;BattleManager['OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER']&&(_0x4c8eb1=Math[_0x1e2870(0x28c)](_0x356aba[_0x1e2870(0x33e)]-_0x39a86b)+_0x39a86b),_0x356aba[_0x1e2870(0x1b9)](_0x4c8eb1,0x0,_0xb22308);}}},BattleManager[_0x247375(0x191)]=function(){const _0x294ffd=_0x247375;if(!this[_0x294ffd(0x35a)]())return;this[_0x294ffd(0x2ff)]=this[_0x294ffd(0x2ff)]||[],this[_0x294ffd(0x2ff)][_0x294ffd(0x369)](null),this[_0x294ffd(0x2ff)][_0x294ffd(0x369)](undefined),this[_0x294ffd(0x2ff)]=this[_0x294ffd(0x2ff)][_0x294ffd(0x2d6)](_0x18c87f=>_0x18c87f[_0x294ffd(0x366)]()),this['_actionBattlers']=this[_0x294ffd(0x2ff)][_0x294ffd(0x2d6)](_0x107bc1=>VisuMZ[_0x294ffd(0x2d9)]['ActionBattlersFilter'](_0x107bc1)),this[_0x294ffd(0x3b6)]&&(this[_0x294ffd(0x2ff)]=this[_0x294ffd(0x2ff)][_0x294ffd(0x2d6)](_0x6b5f49=>!_0x6b5f49['isActor']())),this[_0x294ffd(0x32f)]&&(this[_0x294ffd(0x2ff)]=this['_actionBattlers'][_0x294ffd(0x2d6)](_0x5d4fb7=>!_0x5d4fb7[_0x294ffd(0x287)]())),this[_0x294ffd(0x2d1)]=this[_0x294ffd(0x2d1)]||[],this[_0x294ffd(0x2d1)][_0x294ffd(0x369)](null),this[_0x294ffd(0x2d1)][_0x294ffd(0x369)](undefined),this['_otb_actionBattlersNext']=this[_0x294ffd(0x2d1)][_0x294ffd(0x2d6)](_0x380cf5=>_0x380cf5['isBattleMember']()),this[_0x294ffd(0x2d1)]=this[_0x294ffd(0x2d1)]['filter'](_0x510dc6=>VisuMZ[_0x294ffd(0x2d9)]['ActionBattlersNextFilter'](_0x510dc6)),this[_0x294ffd(0x2f2)](),this[_0x294ffd(0x35c)]();},VisuMZ[_0x247375(0x2d9)][_0x247375(0x2c6)]=function(_0x338678){const _0x30cfb0=_0x247375;if(!_0x338678)return![];if(!_0x338678[_0x30cfb0(0x1a2)]())return![];if(!_0x338678[_0x30cfb0(0x32c)]())return![];return _0x338678['canMove']();},VisuMZ[_0x247375(0x2d9)][_0x247375(0x381)]=function(_0x531861){const _0x18317b=_0x247375;if(!_0x531861)return![];const _0x571671=JsonEx['makeDeepCopy'](_0x531861);return _0x571671[_0x18317b(0x2bb)]=!![],_0x571671[_0x18317b(0x3b2)]=!![],_0x571671[_0x18317b(0x270)](),_0x571671['removeStatesAuto'](0x1),_0x571671[_0x18317b(0x324)](0x2),_0x571671[_0x18317b(0x2f4)](),VisuMZ[_0x18317b(0x2d9)][_0x18317b(0x2c6)](_0x571671);},BattleManager[_0x247375(0x2da)]=function(_0x28b503,_0x32783d,_0x55cb59){const _0x37b07d=_0x247375;if(!_0x32783d)return;const _0x143dc5=_0x55cb59?this[_0x37b07d(0x2d1)]:this[_0x37b07d(0x2ff)];if(!_0x143dc5)return;if(!_0x143dc5['includes'](_0x28b503))return;const _0x222596=VisuMZ['BattleSystemOTB'][_0x37b07d(0x38a)](_0x28b503,_0x143dc5),_0x588ed6=_0x55cb59?VisuMZ['BattleSystemOTB']['getInfinityClamp'](_0x143dc5):0x0,_0xf1c959=_0x222596[_0x37b07d(0x33e)]-0x1;for(let _0x38432a=_0xf1c959;_0x38432a>=0x0;_0x38432a--){_0x143dc5[_0x37b07d(0x1b9)](_0x222596[_0x38432a],0x1);}for(var _0x4b3f1e=0x0;_0x4b3f1e<_0x222596['length'];_0x4b3f1e++){var _0x42d22b=(_0x222596[_0x4b3f1e]-_0x32783d)[_0x37b07d(0x264)](_0x588ed6,_0x143dc5[_0x37b07d(0x33e)]);_0x143dc5[_0x37b07d(0x1b9)](_0x42d22b,0x0,_0x28b503);}this[_0x37b07d(0x191)](),this[_0x37b07d(0x35c)]();},VisuMZ[_0x247375(0x2d9)][_0x247375(0x38a)]=function(_0x167862,_0x4411eb){const _0x5ec359=_0x247375,_0x6ef354=[],_0x2f2a39=_0x4411eb[_0x5ec359(0x33e)];for(let _0x3f1ae5=0x0;_0x3f1ae5<_0x2f2a39;_0x3f1ae5++){if(_0x4411eb[_0x3f1ae5]===_0x167862)_0x6ef354['push'](_0x3f1ae5);}return _0x6ef354;},VisuMZ[_0x247375(0x2d9)][_0x247375(0x1ba)]=function(_0x3e7d07){const _0x3dae46=_0x247375;if(!BattleManager[_0x3dae46(0x2fa)])return 0x0;if(!_0x3e7d07)return 0x0;let _0x47a71d=0x0;const _0x5e79a8=_0x3e7d07[_0x3dae46(0x33e)];for(let _0x7a401b=0x0;_0x7a401b<_0x5e79a8;_0x7a401b++){const _0x6ee02d=_0x3e7d07[_0x7a401b];if(!_0x6ee02d)continue;if(_0x6ee02d[_0x3dae46(0x32b)]()!==Infinity)return _0x7a401b;else _0x47a71d++;}return _0x47a71d;},BattleManager[_0x247375(0x260)]=function(){const _0x176a39=_0x247375;if(!this[_0x176a39(0x35a)]())return;const _0x25a645=SceneManager[_0x176a39(0x1f9)][_0x176a39(0x271)];if(!_0x25a645)return;_0x25a645['shiftNextTurnSpritesToCurrentTurn']();},BattleManager[_0x247375(0x311)]=function(){const _0x1f2836=_0x247375;if(!this[_0x1f2836(0x35a)]())return;const _0xb230b4=SceneManager['_scene']['_otbTurnOrderWindow'];if(!_0xb230b4)return;_0xb230b4['createNewTurnOrderSprites']();},VisuMZ[_0x247375(0x2d9)]['BattleManager_getNextSubject']=BattleManager[_0x247375(0x3ad)],BattleManager[_0x247375(0x3ad)]=function(){const _0x2cfef5=_0x247375;return this[_0x2cfef5(0x335)]=VisuMZ[_0x2cfef5(0x2d9)][_0x2cfef5(0x3bb)][_0x2cfef5(0x269)](this),this[_0x2cfef5(0x35a)]()&&this['_subject']&&this[_0x2cfef5(0x3cb)](this[_0x2cfef5(0x335)]),this['_subject'];},BattleManager[_0x247375(0x3cb)]=function(_0x140fe4){const _0x4a19c3=_0x247375;if(!this['isOTB']())return;const _0x5c9f3c=SceneManager[_0x4a19c3(0x1f9)][_0x4a19c3(0x271)];if(!_0x5c9f3c)return;if(!_0x140fe4)return;_0x5c9f3c[_0x4a19c3(0x37a)](_0x140fe4);},BattleManager[_0x247375(0x35c)]=function(){const _0x114af8=_0x247375;if(!this['isOTB']())return;const _0x2e20e2=SceneManager['_scene']['_otbTurnOrderWindow'];if(!_0x2e20e2)return;_0x2e20e2[_0x114af8(0x19e)]();},VisuMZ[_0x247375(0x2d9)]['BattleManager_endTurn']=BattleManager['endTurn'],BattleManager[_0x247375(0x297)]=function(){const _0x3f56b4=_0x247375;VisuMZ[_0x3f56b4(0x2d9)]['BattleManager_endTurn']['call'](this),this[_0x3f56b4(0x35a)]()&&(this[_0x3f56b4(0x3be)](),$gameParty[_0x3f56b4(0x2a0)](),$gameTroop['clearMakeActionTimesCacheOTB']());},BattleManager[_0x247375(0x3be)]=function(){if(!this['isOTB']())return;const _0x5c1bac=SceneManager['_scene']['_otbTurnOrderWindow'];if(!_0x5c1bac)return;_0x5c1bac['removeCurrentSubject']();},BattleManager[_0x247375(0x2f2)]=function(){const _0xda4744=_0x247375;if(!this['isOTB']())return;const _0x39a4ae=SceneManager[_0xda4744(0x1f9)][_0xda4744(0x271)];if(!_0x39a4ae)return;_0x39a4ae[_0xda4744(0x1ff)]();},BattleManager[_0x247375(0x192)]=function(_0x5bfd7d){const _0xb9025c=_0x247375;if(!_0x5bfd7d)return;const _0x12aa62=_0x5bfd7d[_0xb9025c(0x1b8)]();_0x5bfd7d[_0xb9025c(0x2cc)]();if(!this[_0xb9025c(0x2ff)][_0xb9025c(0x334)](_0x5bfd7d)){const _0xa8f32b=Math[_0xb9025c(0x1de)](0x0,_0x12aa62-(_0x5bfd7d[_0xb9025c(0x2e6)]||0x0));this[_0xb9025c(0x386)](_0x5bfd7d,_0xa8f32b,this[_0xb9025c(0x2ff)]);}if(!this['_otb_actionBattlersNext'][_0xb9025c(0x334)](_0x5bfd7d)){const _0x338c88=_0x12aa62;this['otbAddBattlerToTurnOrderAtEnd'](_0x5bfd7d,_0x338c88,this[_0xb9025c(0x2d1)]);}},BattleManager[_0x247375(0x386)]=function(_0x317125,_0x46237c,_0x1c5367){const _0x4dd40b=_0x247375;if(!this[_0x4dd40b(0x35a)]())return;const _0x56eb8c=SceneManager[_0x4dd40b(0x1f9)][_0x4dd40b(0x271)];_0x317125[_0x4dd40b(0x2cc)]();while(_0x46237c--){_0x1c5367[_0x4dd40b(0x392)](_0x317125),_0x56eb8c&&_0x56eb8c[_0x4dd40b(0x19d)](_0x317125,_0x1c5367);}},BattleManager[_0x247375(0x26f)]=function(_0x57e1c7){const _0xb96227=_0x247375;if(!_0x57e1c7)return;const _0x2d9dda=_0x57e1c7[_0xb96227(0x1b8)]();_0x57e1c7['makeActions']();if(!this[_0xb96227(0x2ff)]['includes'](_0x57e1c7)){const _0x5cc424=Math[_0xb96227(0x1de)](0x0,_0x2d9dda-(_0x57e1c7['_otbTimesActedThisTurn']||0x0));this[_0xb96227(0x302)](_0x57e1c7,_0x5cc424,this[_0xb96227(0x2ff)]);}if(!this[_0xb96227(0x2d1)][_0xb96227(0x334)](_0x57e1c7)){const _0x1b62ef=_0x2d9dda;this[_0xb96227(0x302)](_0x57e1c7,_0x1b62ef,this[_0xb96227(0x2d1)]);}},BattleManager[_0x247375(0x199)]=function(_0x5ef871,_0x22a0cd,_0x2c0584){const _0x59865d=_0x247375;if(!this[_0x59865d(0x35a)]())return;const _0x28e4c0=SceneManager['_scene']['_otbTurnOrderWindow'];while(_0x22a0cd--){_0x2c0584[_0x59865d(0x395)](_0x5ef871),_0x28e4c0&&_0x28e4c0['addBattlerToTurnOrderAtStart'](_0x5ef871,_0x2c0584);}},BattleManager[_0x247375(0x3b3)]=function(_0x24a231){const _0x26af1e=_0x247375;if(!this[_0x26af1e(0x35a)]())return;const _0x3b5ee2=this['_actionBattlers'],_0x5ec9b9=_0x24a231===this[_0x26af1e(0x335)]?0x0:0x1;let _0x113fba=0x0;for(let _0x451b2a=0x0;_0x451b2a<_0x3b5ee2[_0x26af1e(0x33e)];_0x451b2a++){const _0xd65225=_0x3b5ee2[_0x451b2a];if(!_0xd65225)continue;if(!_0xd65225['_actions'])continue;if(!_0xd65225['_actions'][_0x5ec9b9])continue;if(!_0xd65225[_0x26af1e(0x213)][_0x5ec9b9]['_forceAction'])continue;_0x113fba=_0x451b2a;}this[_0x26af1e(0x2ff)][_0x26af1e(0x1b9)](_0x113fba,0x0,_0x24a231);const _0x10c3a8=SceneManager[_0x26af1e(0x1f9)][_0x26af1e(0x271)];_0x10c3a8&&_0x10c3a8['addForceActionBattler'](_0x24a231,_0x113fba);},BattleManager[_0x247375(0x3bd)]=function(){const _0x202b03=_0x247375;if(!this['isOTB']())return;const _0x119c31=SceneManager[_0x202b03(0x1f9)]['_otbTurnOrderWindow'];if(!_0x119c31)return;_0x119c31['previewOrderByAction'](null);},BattleManager[_0x247375(0x30b)]=function(){const _0x65d374=_0x247375;if(!this[_0x65d374(0x35a)]())return;const _0x1bfd10=SceneManager[_0x65d374(0x1f9)][_0x65d374(0x271)];if(!_0x1bfd10)return;_0x1bfd10['previewOrderByAction'](this['inputtingAction']());},VisuMZ[_0x247375(0x2d9)][_0x247375(0x1a1)]=Game_System[_0x247375(0x23a)][_0x247375(0x1cb)],Game_System['prototype'][_0x247375(0x1cb)]=function(){const _0x3f501d=_0x247375;VisuMZ[_0x3f501d(0x2d9)][_0x3f501d(0x1a1)][_0x3f501d(0x269)](this),this[_0x3f501d(0x384)]();},Game_System[_0x247375(0x23a)]['initBattleSystemOTB']=function(){const _0x19ee56=_0x247375;this[_0x19ee56(0x261)]=!![];},Game_System[_0x247375(0x23a)][_0x247375(0x25f)]=function(){const _0x2cc725=_0x247375;return this['_otbTurnOrderVisible']===undefined&&this[_0x2cc725(0x384)](),this[_0x2cc725(0x261)];},Game_System['prototype'][_0x247375(0x232)]=function(_0x1e8ab8){const _0x5aebe6=_0x247375;this[_0x5aebe6(0x261)]===undefined&&this[_0x5aebe6(0x384)](),this['_otbTurnOrderVisible']=_0x1e8ab8;},Game_Action[_0x247375(0x3b0)]=VisuMZ[_0x247375(0x2d9)][_0x247375(0x1df)][_0x247375(0x1f4)][_0x247375(0x2af)],Game_Action['OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN']=VisuMZ['BattleSystemOTB']['Settings'][_0x247375(0x1f4)][_0x247375(0x2eb)],Game_Action[_0x247375(0x1e1)]=VisuMZ[_0x247375(0x2d9)][_0x247375(0x1df)][_0x247375(0x1f4)]['ConvertAgiBuffNext'],Game_Action[_0x247375(0x2ce)]=VisuMZ['BattleSystemOTB'][_0x247375(0x1df)][_0x247375(0x1f4)][_0x247375(0x2b2)],Game_Action[_0x247375(0x2fd)]=VisuMZ['BattleSystemOTB'][_0x247375(0x1df)][_0x247375(0x1f4)][_0x247375(0x203)]??!![],Game_Action[_0x247375(0x362)]=VisuMZ[_0x247375(0x2d9)][_0x247375(0x1df)][_0x247375(0x1f4)][_0x247375(0x1c8)]??!![],Game_Action['OTB_CONVERT_AGI_STATE_DN_CURRENT_TURN']=VisuMZ[_0x247375(0x2d9)][_0x247375(0x1df)]['Conversion'][_0x247375(0x20a)]??!![],Game_Action[_0x247375(0x399)]=VisuMZ['BattleSystemOTB'][_0x247375(0x1df)][_0x247375(0x1f4)][_0x247375(0x275)]??!![],VisuMZ[_0x247375(0x2d9)][_0x247375(0x20e)]=Game_Action[_0x247375(0x23a)][_0x247375(0x32b)],Game_Action['prototype']['speed']=function(){const _0x437207=_0x247375;return BattleManager[_0x437207(0x35a)]()?0x0:VisuMZ[_0x437207(0x2d9)][_0x437207(0x20e)][_0x437207(0x269)](this);},VisuMZ[_0x247375(0x2d9)]['Game_Action_applyGlobal']=Game_Action[_0x247375(0x23a)][_0x247375(0x234)],Game_Action[_0x247375(0x23a)][_0x247375(0x234)]=function(){const _0x33fd17=_0x247375;VisuMZ[_0x33fd17(0x2d9)]['Game_Action_applyGlobal'][_0x33fd17(0x269)](this),this[_0x33fd17(0x235)]();},Game_Action['prototype'][_0x247375(0x235)]=function(){const _0x9be71b=_0x247375;if(!SceneManager[_0x9be71b(0x190)]())return;if(!BattleManager[_0x9be71b(0x35a)]())return;if(!this[_0x9be71b(0x332)]())return;if(!this[_0x9be71b(0x1f7)]())return;const _0x2ffd00=VisuMZ['BattleSystemOTB'][_0x9be71b(0x314)],_0x4e3813=this[_0x9be71b(0x332)]()[_0x9be71b(0x253)];_0x4e3813[_0x9be71b(0x206)](_0x2ffd00[_0x9be71b(0x391)])&&this[_0x9be71b(0x1f7)]()['otbGainInstant'](0x1);let _0x38baa4=this['otbCalcUserCurrentOrderChange'](),_0x19c3a1=this[_0x9be71b(0x212)]();_0x38baa4!==0x0&&BattleManager[_0x9be71b(0x2da)](this[_0x9be71b(0x1f7)](),-_0x38baa4,![]),_0x19c3a1!==0x0&&BattleManager[_0x9be71b(0x2da)](this['subject'](),-_0x19c3a1,!![]);},Game_Action[_0x247375(0x23a)]['otbCalcUserCurrentOrderChange']=function(){const _0x55c47b=_0x247375;if(!SceneManager[_0x55c47b(0x190)]())return 0x0;if(!BattleManager['isOTB']())return 0x0;if(!this['item']())return 0x0;if(!this[_0x55c47b(0x1f7)]())return 0x0;if(!this[_0x55c47b(0x1f7)]()[_0x55c47b(0x209)]())return 0x0;const _0x1abd6c=VisuMZ['BattleSystemOTB'][_0x55c47b(0x314)],_0x2b18d5=this[_0x55c47b(0x332)]()[_0x55c47b(0x253)],_0x5b3ba1=BattleManager['_actionBattlers']||[];let _0x5ca739=0x0;return _0x2b18d5[_0x55c47b(0x206)](_0x1abd6c[_0x55c47b(0x2b4)])&&(_0x5b3ba1[_0x55c47b(0x334)](this[_0x55c47b(0x1f7)]())&&(_0x5ca739+=Number(RegExp['$1']))),_0x2b18d5[_0x55c47b(0x206)](_0x1abd6c[_0x55c47b(0x1c3)])&&(_0x5ca739+=Number(RegExp['$1'])),_0x5ca739;},Game_Action['prototype'][_0x247375(0x212)]=function(){const _0xf1aef9=_0x247375;if(!SceneManager[_0xf1aef9(0x190)]())return 0x0;if(!BattleManager[_0xf1aef9(0x35a)]())return 0x0;if(!this[_0xf1aef9(0x332)]())return 0x0;if(!this[_0xf1aef9(0x1f7)]())return 0x0;if(!this['subject']()['canChangeOtbTurnOrder']())return 0x0;const _0x5a13d0=VisuMZ['BattleSystemOTB'][_0xf1aef9(0x1df)][_0xf1aef9(0x32e)],_0x47ddc4=VisuMZ[_0xf1aef9(0x2d9)]['RegExp'],_0x532249=this[_0xf1aef9(0x332)]()[_0xf1aef9(0x253)],_0x460b4f=BattleManager[_0xf1aef9(0x2ff)]||[],_0xae4cdc=BattleManager[_0xf1aef9(0x2d1)]||[];let _0x2ee24a=0x0;return _0x5a13d0[_0xf1aef9(0x236)]&&(_0x2ee24a+=_0x5a13d0[_0xf1aef9(0x236)][_0xf1aef9(0x269)](this)),_0x532249[_0xf1aef9(0x206)](_0x47ddc4['UserFollOrder'])&&(_0xae4cdc['includes'](this[_0xf1aef9(0x1f7)]())&&!_0x460b4f[_0xf1aef9(0x334)](this['subject']())&&(_0x2ee24a+=Number(RegExp['$1']))),_0x532249[_0xf1aef9(0x206)](_0x47ddc4[_0xf1aef9(0x23c)])&&(_0x2ee24a+=Number(RegExp['$1'])),_0x2ee24a;},VisuMZ['BattleSystemOTB'][_0x247375(0x2f3)]=Game_Action[_0x247375(0x23a)][_0x247375(0x1aa)],Game_Action[_0x247375(0x23a)][_0x247375(0x1aa)]=function(_0x287c4e){const _0x1bd320=_0x247375;VisuMZ['BattleSystemOTB'][_0x1bd320(0x2f3)][_0x1bd320(0x269)](this,_0x287c4e),this[_0x1bd320(0x28b)](_0x287c4e),this['applyItemTargetEffectOTB'](_0x287c4e);},Game_Action[_0x247375(0x23a)][_0x247375(0x28b)]=function(_0x3a294a){const _0x314498=_0x247375;if(!SceneManager[_0x314498(0x190)]())return;if(!BattleManager[_0x314498(0x35a)]())return;if(!this['item']())return;if(!_0x3a294a)return;const _0x3b6616=VisuMZ['BattleSystemOTB'][_0x314498(0x314)],_0x44f6ff=this['item']()[_0x314498(0x253)];if(_0x44f6ff[_0x314498(0x206)](_0x3b6616[_0x314498(0x2e0)])){const _0x1cb27a=!![],_0x1bd5f3=Number(RegExp['$1'])||0x0;this[_0x314498(0x1f7)]()[_0x314498(0x374)](_0x1bd5f3,_0x1cb27a);}if(_0x44f6ff[_0x314498(0x206)](_0x3b6616[_0x314498(0x200)])){const _0x2dd966=![],_0x1b5e7e=Number(RegExp['$1'])||0x0;this[_0x314498(0x1f7)]()['otbAddActions'](_0x1b5e7e,_0x2dd966);}if(_0x44f6ff[_0x314498(0x206)](_0x3b6616['TargetAddActionCurrent'])){const _0x182643=!![],_0x15bdb9=Number(RegExp['$1'])||0x0;_0x3a294a[_0x314498(0x374)](_0x15bdb9,_0x182643);}if(_0x44f6ff['match'](_0x3b6616[_0x314498(0x35b)])){const _0x54be90=![],_0x442c69=Number(RegExp['$1'])||0x0;_0x3a294a[_0x314498(0x374)](_0x442c69,_0x54be90);}},Game_Action[_0x247375(0x23a)][_0x247375(0x34b)]=function(_0x31a99d){const _0x5e099d=_0x247375;if(!SceneManager[_0x5e099d(0x190)]())return;if(!BattleManager[_0x5e099d(0x35a)]())return;if(!this['item']())return;if(!_0x31a99d)return;if(!_0x31a99d[_0x5e099d(0x209)]())return 0x0;let _0x1046aa=this[_0x5e099d(0x37b)](_0x31a99d),_0x280873=this['otbCalcTargetNextOrderChange'](_0x31a99d);_0x1046aa!==0x0&&BattleManager[_0x5e099d(0x2da)](_0x31a99d,-_0x1046aa,![]),_0x280873!==0x0&&BattleManager[_0x5e099d(0x2da)](_0x31a99d,-_0x280873,!![]);},Game_Action[_0x247375(0x23a)][_0x247375(0x37b)]=function(_0x5e27d3){const _0x28431d=_0x247375;if(!SceneManager[_0x28431d(0x190)]())return 0x0;if(!BattleManager[_0x28431d(0x35a)]())return 0x0;if(!this[_0x28431d(0x332)]())return 0x0;if(!_0x5e27d3)return 0x0;if(!_0x5e27d3[_0x28431d(0x209)]())return 0x0;const _0x51ffad=VisuMZ['BattleSystemOTB'][_0x28431d(0x314)],_0x2e945d=this['item']()[_0x28431d(0x253)],_0x28636c=BattleManager['_actionBattlers']||[];let _0x8f85eb=0x0;_0x2e945d[_0x28431d(0x206)](_0x51ffad['TargetFollOrder'])&&(_0x28636c['includes'](_0x5e27d3)&&(_0x8f85eb+=Number(RegExp['$1'])));_0x2e945d['match'](_0x51ffad[_0x28431d(0x350)])&&(_0x8f85eb+=Number(RegExp['$1']));const _0x539615=this[_0x28431d(0x332)]()[_0x28431d(0x359)];for(const _0x175286 of _0x539615){if(!_0x175286)continue;if(_0x175286['code']===Game_Action[_0x28431d(0x299)]&&_0x175286[_0x28431d(0x2c0)]===0x6){if(Game_Action['OTB_CONVERT_AGI_BUFF_CURRENT_TURN'])_0x8f85eb-=0x1;}if(_0x175286['code']===Game_Action[_0x28431d(0x34f)]&&_0x175286[_0x28431d(0x2c0)]===0x6){if(Game_Action[_0x28431d(0x288)])_0x8f85eb+=0x1;}if(_0x175286[_0x28431d(0x3a8)]===Game_Action['EFFECT_ADD_STATE']){const _0x313180=$dataStates[_0x175286['dataId']];if(_0x313180){const _0x5234ac=_0x313180[_0x28431d(0x2c1)][_0x28431d(0x2d6)](_0xa84c42=>_0xa84c42[_0x28431d(0x3a8)]===Game_BattlerBase[_0x28431d(0x30f)]&&_0xa84c42['dataId']===0x6);for(const _0x3eba56 of _0x5234ac){if(_0x3eba56[_0x28431d(0x1a4)]>=1.05){if(Game_Action[_0x28431d(0x2fd)])_0x8f85eb-=0x1;}if(_0x3eba56[_0x28431d(0x1a4)]<=0.95){if(Game_Action[_0x28431d(0x397)])_0x8f85eb+=0x1;}}}}}return _0x8f85eb;},Game_Action[_0x247375(0x23a)][_0x247375(0x210)]=function(_0x1fa4fd){const _0x18ee01=_0x247375;if(!SceneManager[_0x18ee01(0x190)]())return 0x0;if(!BattleManager[_0x18ee01(0x35a)]())return 0x0;if(!this[_0x18ee01(0x332)]())return 0x0;if(!_0x1fa4fd)return 0x0;if(!_0x1fa4fd[_0x18ee01(0x209)]())return 0x0;const _0x36dce7=VisuMZ[_0x18ee01(0x2d9)][_0x18ee01(0x314)],_0x51ef28=this[_0x18ee01(0x332)]()[_0x18ee01(0x253)],_0x1b4734=BattleManager[_0x18ee01(0x2ff)]||[],_0x3c3533=BattleManager[_0x18ee01(0x2d1)]||[];let _0x4007cf=0x0;_0x51ef28[_0x18ee01(0x206)](_0x36dce7[_0x18ee01(0x3c5)])&&(_0x3c3533['includes'](_0x1fa4fd)&&!_0x1b4734[_0x18ee01(0x334)](_0x1fa4fd)&&(_0x4007cf+=Number(RegExp['$1'])));_0x51ef28[_0x18ee01(0x206)](_0x36dce7['TargetNextOrder'])&&(_0x4007cf+=Number(RegExp['$1']));const _0x54d138=this[_0x18ee01(0x332)]()[_0x18ee01(0x359)];for(const _0x11cac6 of _0x54d138){if(!_0x11cac6)continue;if(_0x11cac6[_0x18ee01(0x3a8)]===Game_Action['EFFECT_ADD_BUFF']&&_0x11cac6[_0x18ee01(0x2c0)]===0x6){if(Game_Action[_0x18ee01(0x1e1)])_0x4007cf-=0x1;}if(_0x11cac6[_0x18ee01(0x3a8)]===Game_Action['EFFECT_ADD_DEBUFF']&&_0x11cac6[_0x18ee01(0x2c0)]===0x6){if(Game_Action[_0x18ee01(0x2ce)])_0x4007cf+=0x1;}if(_0x11cac6['code']===Game_Action[_0x18ee01(0x1e4)]){const _0x342675=$dataStates[_0x11cac6['dataId']];if(_0x342675){const _0x48b8e2=_0x342675[_0x18ee01(0x2c1)][_0x18ee01(0x2d6)](_0x656d2e=>_0x656d2e[_0x18ee01(0x3a8)]===Game_BattlerBase['TRAIT_PARAM']&&_0x656d2e['dataId']===0x6);for(const _0x5e57cb of _0x48b8e2){if(_0x5e57cb[_0x18ee01(0x1a4)]>=1.05){if(Game_Action[_0x18ee01(0x362)])_0x4007cf-=0x1;}if(_0x5e57cb['value']<=0.95){if(Game_Action[_0x18ee01(0x399)])_0x4007cf+=0x1;}}}}}return _0x4007cf;},Game_BattlerBase[_0x247375(0x23a)]['clearTurnOrderOTBGraphics']=function(){const _0x181cb4=_0x247375;delete this[_0x181cb4(0x379)],delete this[_0x181cb4(0x36b)],delete this[_0x181cb4(0x3cc)],delete this[_0x181cb4(0x227)];},Game_BattlerBase[_0x247375(0x23a)][_0x247375(0x37d)]=function(){const _0x354600=_0x247375;return this[_0x354600(0x379)]===undefined&&(this[_0x354600(0x379)]=this['createTurnOrderOTBGraphicType']()),this[_0x354600(0x379)];},Game_BattlerBase['prototype'][_0x247375(0x3c6)]=function(){const _0xe39cc5=_0x247375;return Window_OTB_TurnOrder[_0xe39cc5(0x1df)][_0xe39cc5(0x2c2)];},Game_BattlerBase[_0x247375(0x23a)][_0x247375(0x204)]=function(){const _0xbeb0ed=_0x247375;return this[_0xbeb0ed(0x36b)]===undefined&&(this[_0xbeb0ed(0x36b)]=this['createTurnOrderOTBGraphicFaceName']()),this['_otbTurnOrderFaceName'];},Game_BattlerBase[_0x247375(0x23a)]['createTurnOrderOTBGraphicFaceName']=function(){const _0x596859=_0x247375;return Window_OTB_TurnOrder['Settings'][_0x596859(0x3b5)];},Game_BattlerBase[_0x247375(0x23a)][_0x247375(0x254)]=function(){const _0xd57c95=_0x247375;return this[_0xd57c95(0x3cc)]===undefined&&(this[_0xd57c95(0x3cc)]=this['createTurnOrderOTBGraphicFaceIndex']()),this[_0xd57c95(0x3cc)];},Game_BattlerBase[_0x247375(0x23a)][_0x247375(0x286)]=function(){const _0x5c257c=_0x247375;return Window_OTB_TurnOrder['Settings'][_0x5c257c(0x207)];},Game_BattlerBase[_0x247375(0x23a)][_0x247375(0x2ee)]=function(){const _0x23a82f=_0x247375;return this['_otbTurnOrderIconIndex']===undefined&&(this['_otbTurnOrderIconIndex']=this[_0x23a82f(0x348)]()),this[_0x23a82f(0x227)];},Game_BattlerBase[_0x247375(0x23a)][_0x247375(0x348)]=function(){const _0x596ad5=_0x247375;return Window_OTB_TurnOrder[_0x596ad5(0x1df)][_0x596ad5(0x29f)];},Game_BattlerBase['prototype'][_0x247375(0x1d5)]=function(_0x2da7ae){this['_otbTurnOrderIconIndex']=_0x2da7ae;},VisuMZ[_0x247375(0x2d9)][_0x247375(0x193)]=Game_BattlerBase[_0x247375(0x23a)]['hide'],Game_BattlerBase[_0x247375(0x23a)][_0x247375(0x341)]=function(){const _0x320b9b=_0x247375;VisuMZ[_0x320b9b(0x2d9)][_0x320b9b(0x193)][_0x320b9b(0x269)](this),BattleManager['removeActionBattlersOTB']();},VisuMZ[_0x247375(0x2d9)][_0x247375(0x2ac)]=Game_BattlerBase[_0x247375(0x23a)][_0x247375(0x216)],Game_BattlerBase[_0x247375(0x23a)]['appear']=function(){const _0xb3b7be=_0x247375,_0x52145a=this['_hidden'];VisuMZ[_0xb3b7be(0x2d9)][_0xb3b7be(0x2ac)][_0xb3b7be(0x269)](this),BattleManager[_0xb3b7be(0x35a)]()&&SceneManager['isSceneBattle']()&&_0x52145a&&!this[_0xb3b7be(0x26b)]&&BattleManager['otbReturnBattlerToTurnOrders'](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x35f)]=Game_Battler[_0x247375(0x23a)][_0x247375(0x3d1)],Game_Battler[_0x247375(0x23a)]['performCollapse']=function(){const _0x592b5b=_0x247375;VisuMZ['BattleSystemOTB'][_0x592b5b(0x35f)][_0x592b5b(0x269)](this),BattleManager[_0x592b5b(0x191)]();},Game_Battler[_0x247375(0x2ba)]=VisuMZ[_0x247375(0x2d9)][_0x247375(0x1df)]['Mechanics']['PostStunInfinitySpeed'],VisuMZ[_0x247375(0x2d9)]['Game_Battler_onBattleStart']=Game_Battler['prototype'][_0x247375(0x36e)],Game_Battler[_0x247375(0x23a)][_0x247375(0x36e)]=function(_0x5bcaa8){const _0x3d5174=_0x247375;VisuMZ[_0x3d5174(0x2d9)][_0x3d5174(0x1ad)][_0x3d5174(0x269)](this,_0x5bcaa8),this[_0x3d5174(0x3a6)](_0x5bcaa8);},Game_Battler[_0x247375(0x23a)][_0x247375(0x3a6)]=function(_0x273809){const _0x3e737a=_0x247375;if(!BattleManager[_0x3e737a(0x35a)]())return;this[_0x3e737a(0x2e6)]=0x0,this['_cache_makeActionTimesOTB']=undefined;},VisuMZ[_0x247375(0x2d9)][_0x247375(0x251)]=Game_Battler['prototype']['onBattleEnd'],Game_Battler['prototype'][_0x247375(0x2bf)]=function(){const _0x33b93a=_0x247375;VisuMZ['BattleSystemOTB'][_0x33b93a(0x251)][_0x33b93a(0x269)](this),this[_0x33b93a(0x1c2)]();},Game_Battler[_0x247375(0x23a)]['onBattleEndOTB']=function(){const _0x4a68de=_0x247375;if(!BattleManager[_0x4a68de(0x35a)]())return;this[_0x4a68de(0x2e6)]=0x0;},Game_Battler[_0x247375(0x23a)]['performActionEndOTB']=function(){const _0x5d6b75=_0x247375;if(!BattleManager[_0x5d6b75(0x35a)]())return;this[_0x5d6b75(0x2e6)]=this[_0x5d6b75(0x2e6)]||0x0,this[_0x5d6b75(0x2e6)]++;if(this[_0x5d6b75(0x228)]()>0x0&&this===BattleManager[_0x5d6b75(0x335)]){const _0x357bf3=BattleManager[_0x5d6b75(0x24d)];if(_0x357bf3[_0x5d6b75(0x33e)]>0x0&&_0x357bf3[0x0]!==this)return;const _0x5184d1=this[_0x5d6b75(0x296)]();if(_0x5184d1&&BattleManager[_0x5d6b75(0x3af)](this))_0x5184d1[_0x5d6b75(0x21f)]();}},BattleManager[_0x247375(0x3af)]=function(_0x1043f2){const _0x373a5f=_0x247375;if(!_0x1043f2)return![];return this[_0x373a5f(0x2ff)][0x0]===_0x1043f2;},VisuMZ[_0x247375(0x2d9)]['Game_Battler_onTurnEnd']=Game_Battler[_0x247375(0x23a)][_0x247375(0x1fc)],Game_Battler[_0x247375(0x23a)][_0x247375(0x1fc)]=function(){const _0x5731b8=_0x247375;VisuMZ[_0x5731b8(0x2d9)]['Game_Battler_onTurnEnd']['call'](this),this[_0x5731b8(0x301)]();},Game_Battler[_0x247375(0x23a)][_0x247375(0x301)]=function(){const _0x3dd6e5=_0x247375;if(!BattleManager['isOTB']())return;this[_0x3dd6e5(0x2e6)]=0x0;},VisuMZ[_0x247375(0x2d9)]['Game_Battler_makeSpeed']=Game_Battler[_0x247375(0x23a)][_0x247375(0x22e)],Game_Battler[_0x247375(0x23a)]['makeSpeed']=function(){const _0x644efb=_0x247375;BattleManager[_0x644efb(0x35a)]()?this[_0x644efb(0x24b)]():VisuMZ[_0x644efb(0x2d9)][_0x644efb(0x283)][_0x644efb(0x269)](this);},Game_Battler[_0x247375(0x23a)][_0x247375(0x24b)]=function(){const _0x475e46=_0x247375;if(this[_0x475e46(0x24e)]())this['_speed']=Infinity;else{const _0x3ed343=this[_0x475e46(0x273)]()||new Game_Action(this);this[_0x475e46(0x2cb)]=VisuMZ[_0x475e46(0x2d9)][_0x475e46(0x1df)][_0x475e46(0x32e)][_0x475e46(0x1fd)][_0x475e46(0x269)](_0x3ed343);}},Game_Battler[_0x247375(0x23a)]['isInfinitySpeedOTB']=function(){const _0x13e3f9=_0x247375;if(!Game_Battler[_0x13e3f9(0x2ba)])return![];if(!this[_0x13e3f9(0x1a2)]())return![];if(!this[_0x13e3f9(0x32c)]())return![];if(this['canMove']())return![];const _0x57ad84=JsonEx['makeDeepCopy'](this);return _0x57ad84['_tempActor']=!![],_0x57ad84['_tempBattler']=!![],_0x57ad84[_0x13e3f9(0x270)](),_0x57ad84[_0x13e3f9(0x324)](0x1),_0x57ad84[_0x13e3f9(0x324)](0x2),_0x57ad84[_0x13e3f9(0x2f4)](),_0x57ad84[_0x13e3f9(0x2ec)]();},VisuMZ[_0x247375(0x2d9)][_0x247375(0x272)]=Game_Action[_0x247375(0x23a)][_0x247375(0x21e)],Game_Action[_0x247375(0x23a)][_0x247375(0x21e)]=function(){const _0x11d2d5=_0x247375;return BattleManager[_0x11d2d5(0x35a)]()?VisuMZ[_0x11d2d5(0x2d9)][_0x11d2d5(0x1df)][_0x11d2d5(0x32e)][_0x11d2d5(0x285)]:VisuMZ['BattleSystemOTB'][_0x11d2d5(0x272)]['call'](this);},Game_Battler[_0x247375(0x23a)][_0x247375(0x34a)]=function(_0x1964ba){const _0x361f86=_0x247375;if(!this[_0x361f86(0x2ec)]())return;this[_0x361f86(0x2e6)]=this[_0x361f86(0x2e6)]||0x0,this['_otbTimesActedThisTurn']--,BattleManager[_0x361f86(0x199)](this,_0x1964ba,BattleManager['_actionBattlers']);},Game_Battler[_0x247375(0x23a)][_0x247375(0x374)]=function(_0x3a1628,_0xebfb30){const _0x5e8115=_0x247375;if(!this[_0x5e8115(0x2ec)]())return;_0xebfb30?BattleManager[_0x5e8115(0x386)](this,_0x3a1628,BattleManager[_0x5e8115(0x2ff)]):BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x3a1628,BattleManager['_otb_actionBattlersNext']);},VisuMZ['BattleSystemOTB'][_0x247375(0x1b4)]=Game_Battler['prototype'][_0x247375(0x1b8)],Game_Battler[_0x247375(0x23a)][_0x247375(0x1b8)]=function(){const _0x4664da=_0x247375;return BattleManager[_0x4664da(0x35a)]()?this[_0x4664da(0x3cd)]():VisuMZ[_0x4664da(0x2d9)]['Game_Battler_makeActionTimes'][_0x4664da(0x269)](this);},Game_Battler[_0x247375(0x23a)][_0x247375(0x3cd)]=function(){const _0x36b69a=_0x247375;if(this[_0x36b69a(0x316)]!==undefined)return this[_0x36b69a(0x316)];this[_0x36b69a(0x2d4)]=this['actionPlusSet']()[_0x36b69a(0x33e)];const _0x55d8e2=this[_0x36b69a(0x242)](),_0x128e65=_0x55d8e2[_0x36b69a(0x367)]((_0x3a914d,_0x1bd563)=>Math[_0x36b69a(0x293)]()<_0x1bd563?_0x3a914d+0x1:_0x3a914d,0x1);return this[_0x36b69a(0x316)]=_0x128e65,this[_0x36b69a(0x316)];},Game_Unit['prototype'][_0x247375(0x2a0)]=function(){const _0x3bade4=_0x247375;for(const _0x489aa7 of this[_0x3bade4(0x30e)]()){_0x489aa7&&(_0x489aa7[_0x3bade4(0x316)]=undefined);}},Game_Battler[_0x247375(0x23a)]['canChangeOtbTurnOrder']=function(){const _0x281650=_0x247375;if(this[_0x281650(0x32b)]()===Infinity)return![];return!![];},Game_Battler[_0x247375(0x23a)]['otbProcessActionCheck']=function(_0x2a64ba,_0x5b40c9){const _0x1479ef=_0x247375;if(this['_tempBattler']||this[_0x1479ef(0x2bb)])return;if(!SceneManager['isSceneBattle']())return;if(!BattleManager[_0x1479ef(0x35a)]())return;if(this[_0x1479ef(0x2d4)]!==this['actionPlusSet']()[_0x1479ef(0x33e)])this[_0x1479ef(0x2d4)]=this[_0x1479ef(0x242)]()[_0x1479ef(0x33e)],this[_0x1479ef(0x316)]=undefined;else return;if(_0x2a64ba&&!this[_0x1479ef(0x2ec)]())BattleManager[_0x1479ef(0x191)]();else!_0x2a64ba&&this[_0x1479ef(0x2ec)]()&&BattleManager[_0x1479ef(0x192)](this);if(this['canMove']()){const _0x4face2=this[_0x1479ef(0x1b8)]()-_0x5b40c9;_0x4face2>0x0&&(BattleManager['otbAddBattlerToTurnOrderAtEnd'](this,_0x4face2,BattleManager[_0x1479ef(0x2ff)]),BattleManager[_0x1479ef(0x386)](this,_0x4face2,BattleManager['_otb_actionBattlersNext']));}},VisuMZ[_0x247375(0x2d9)][_0x247375(0x245)]=Game_Battler[_0x247375(0x23a)][_0x247375(0x372)],Game_Battler['prototype'][_0x247375(0x372)]=function(_0x1b0efb){const _0x10b87c=_0x247375,_0x1eaa9e=this[_0x10b87c(0x2ec)](),_0x3425a7=this[_0x10b87c(0x1b8)]();VisuMZ['BattleSystemOTB'][_0x10b87c(0x245)][_0x10b87c(0x269)](this,_0x1b0efb),this[_0x10b87c(0x2d4)]=undefined,this[_0x10b87c(0x1cd)](_0x1eaa9e,_0x3425a7);},VisuMZ['BattleSystemOTB']['Game_Battler_removeState']=Game_Battler['prototype'][_0x247375(0x2a6)],Game_Battler['prototype'][_0x247375(0x2a6)]=function(_0x4e020a){const _0x2f1ce6=_0x247375,_0x4c3685=this['canMove'](),_0x12f454=this[_0x2f1ce6(0x1b8)](),_0x490710=this['isStateAffected'](_0x4e020a);VisuMZ[_0x2f1ce6(0x2d9)]['Game_Battler_removeState']['call'](this,_0x4e020a),_0x490710&&!this[_0x2f1ce6(0x1e0)](_0x4e020a)&&(this[_0x2f1ce6(0x2d4)]=undefined,this[_0x2f1ce6(0x1cd)](_0x4c3685,_0x12f454));},VisuMZ[_0x247375(0x2d9)][_0x247375(0x2a3)]=Game_BattlerBase[_0x247375(0x23a)][_0x247375(0x27c)],Game_BattlerBase['prototype']['recoverAll']=function(){const _0x5cc223=_0x247375;if(BattleManager[_0x5cc223(0x35a)]())this[_0x5cc223(0x2a6)](this[_0x5cc223(0x375)]());VisuMZ[_0x5cc223(0x2d9)]['Game_BattlerBase_recoverAll']['call'](this);if(BattleManager[_0x5cc223(0x35a)]())this[_0x5cc223(0x2f4)]();},VisuMZ[_0x247375(0x2d9)][_0x247375(0x38d)]=Game_Battler[_0x247375(0x23a)]['forceAction'],Game_Battler[_0x247375(0x23a)][_0x247375(0x382)]=function(_0xd7906a,_0x23feb4){const _0x3997f6=_0x247375;BattleManager[_0x3997f6(0x35a)]()?this[_0x3997f6(0x19f)](_0xd7906a,_0x23feb4):VisuMZ[_0x3997f6(0x2d9)][_0x3997f6(0x38d)][_0x3997f6(0x269)](this,_0xd7906a,_0x23feb4);},Game_Battler[_0x247375(0x23a)][_0x247375(0x19f)]=function(_0x4eae1a,_0x84250f){const _0x2fce82=_0x247375,_0x4c8ec5=new Game_Action(this,!![]);_0x4c8ec5[_0x2fce82(0x309)](_0x4eae1a),_0x4c8ec5[_0x2fce82(0x337)]=!![];if(_0x84250f===-0x2)_0x4c8ec5[_0x2fce82(0x20c)](this[_0x2fce82(0x39c)]);else _0x84250f===-0x1?_0x4c8ec5[_0x2fce82(0x2ad)]():_0x4c8ec5[_0x2fce82(0x20c)](_0x84250f);let _0x1a1e43=this[_0x2fce82(0x213)]['findIndex'](_0x32ae7f=>_0x32ae7f['_forceAction']);if(this===BattleManager['_subject'])_0x1a1e43=Math[_0x2fce82(0x1de)](_0x1a1e43,0x0);_0x1a1e43++,this[_0x2fce82(0x213)]['splice'](_0x1a1e43,0x0,_0x4c8ec5);},VisuMZ[_0x247375(0x2d9)]['BattleManager_forceAction']=BattleManager['forceAction'],BattleManager[_0x247375(0x382)]=function(_0x48ff63){const _0xd07e68=_0x247375;BattleManager['isOTB']()?this[_0xd07e68(0x19f)](_0x48ff63):VisuMZ[_0xd07e68(0x2d9)][_0xd07e68(0x3c4)][_0xd07e68(0x269)](this,_0x48ff63);},BattleManager[_0x247375(0x19f)]=function(_0x91b9e3){const _0x2b51d7=_0x247375;BattleManager[_0x2b51d7(0x3b3)](_0x91b9e3);},VisuMZ[_0x247375(0x2d9)]['Game_Actor_selectNextCommand']=Game_Actor['prototype'][_0x247375(0x378)],Game_Actor[_0x247375(0x23a)][_0x247375(0x378)]=function(){const _0x45d776=_0x247375;if(BattleManager[_0x45d776(0x35a)]()){if(this['battler']())this[_0x45d776(0x296)]()[_0x45d776(0x21f)]();return![];}return VisuMZ[_0x45d776(0x2d9)][_0x45d776(0x3ca)][_0x45d776(0x269)](this);},Game_Actor['prototype'][_0x247375(0x3c6)]=function(){const _0x320fc4=_0x247375,_0x49b48f=this[_0x320fc4(0x363)]()[_0x320fc4(0x253)];if(_0x49b48f[_0x320fc4(0x206)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x320fc4(0x1f8);else{if(_0x49b48f[_0x320fc4(0x206)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return _0x320fc4(0x1bb);}return Window_OTB_TurnOrder[_0x320fc4(0x1df)][_0x320fc4(0x281)];},Game_Actor[_0x247375(0x23a)]['createTurnOrderOTBGraphicFaceName']=function(){const _0x109031=_0x247375,_0x4ca842=this[_0x109031(0x363)]()[_0x109031(0x253)];if(_0x4ca842[_0x109031(0x206)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this['faceName']();},Game_Actor[_0x247375(0x23a)][_0x247375(0x286)]=function(){const _0x1d5c57=_0x247375,_0x14a084=this[_0x1d5c57(0x363)]()['note'];if(_0x14a084[_0x1d5c57(0x206)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return this[_0x1d5c57(0x1ef)]();},Game_Actor['prototype'][_0x247375(0x348)]=function(){const _0x451b18=_0x247375,_0x363c02=this[_0x451b18(0x363)]()['note'];if(_0x363c02[_0x451b18(0x206)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder['Settings']['ActorBattlerIcon'];},Game_Enemy[_0x247375(0x23a)][_0x247375(0x3c6)]=function(){const _0x47b377=_0x247375,_0x2904f6=this[_0x47b377(0x31c)]()['note'];if(_0x2904f6[_0x47b377(0x206)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x47b377(0x1f8);else{if(_0x2904f6[_0x47b377(0x206)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_OTB_TurnOrder[_0x47b377(0x1df)][_0x47b377(0x2c2)];},Game_Enemy[_0x247375(0x23a)][_0x247375(0x329)]=function(){const _0x15e42a=_0x247375,_0x5f3543=this[_0x15e42a(0x31c)]()[_0x15e42a(0x253)];if(_0x5f3543[_0x15e42a(0x206)](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_OTB_TurnOrder[_0x15e42a(0x1df)]['EnemyBattlerFaceName'];},Game_Enemy[_0x247375(0x23a)][_0x247375(0x286)]=function(){const _0x3368c2=_0x247375,_0xeba1f7=this[_0x3368c2(0x31c)]()[_0x3368c2(0x253)];if(_0xeba1f7['match'](/<OTB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return Number(RegExp['$2']);return Window_OTB_TurnOrder[_0x3368c2(0x1df)][_0x3368c2(0x207)];},Game_Enemy[_0x247375(0x23a)][_0x247375(0x348)]=function(){const _0x368f41=_0x247375,_0x1b1c81=this['enemy']()[_0x368f41(0x253)];if(_0x1b1c81[_0x368f41(0x206)](/<OTB TURN ORDER ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Window_OTB_TurnOrder[_0x368f41(0x1df)][_0x368f41(0x29f)];},VisuMZ['BattleSystemOTB']['Game_Party_addActor']=Game_Party['prototype'][_0x247375(0x1d6)],Game_Party[_0x247375(0x23a)][_0x247375(0x1d6)]=function(_0x4b3deb){const _0x4f2e84=_0x247375;VisuMZ[_0x4f2e84(0x2d9)][_0x4f2e84(0x19c)]['call'](this,_0x4b3deb);if(Imported[_0x4f2e84(0x20b)])return;SceneManager['isSceneBattle']()&&BattleManager[_0x4f2e84(0x35a)]()&&(BattleManager['removeActionBattlersOTB'](),BattleManager[_0x4f2e84(0x192)]($gameActors[_0x4f2e84(0x363)](_0x4b3deb)));},VisuMZ[_0x247375(0x2d9)][_0x247375(0x389)]=Game_Party['prototype'][_0x247375(0x276)],Game_Party['prototype'][_0x247375(0x276)]=function(_0x3f9e8b){const _0x541b93=_0x247375;VisuMZ[_0x541b93(0x2d9)][_0x541b93(0x389)][_0x541b93(0x269)](this,_0x3f9e8b),SceneManager['isSceneBattle']()&&BattleManager[_0x541b93(0x35a)]()&&BattleManager[_0x541b93(0x191)]();},VisuMZ['BattleSystemOTB'][_0x247375(0x3a1)]=Scene_Battle[_0x247375(0x23a)][_0x247375(0x24c)],Scene_Battle[_0x247375(0x23a)]['createActorCommandWindow']=function(){const _0x69c505=_0x247375;VisuMZ[_0x69c505(0x2d9)][_0x69c505(0x3a1)][_0x69c505(0x269)](this),BattleManager[_0x69c505(0x35a)]()&&this['createActorCommandWindowOTB']();},Scene_Battle[_0x247375(0x23a)]['createActorCommandWindowOTB']=function(){const _0x5ca794=_0x247375,_0x429e55=this[_0x5ca794(0x2e4)];this[_0x5ca794(0x2df)]()&&delete _0x429e55[_0x5ca794(0x28a)][_0x5ca794(0x2d5)];},VisuMZ[_0x247375(0x2d9)][_0x247375(0x201)]=Scene_Battle[_0x247375(0x23a)]['commandCancel'],Scene_Battle[_0x247375(0x23a)]['commandCancel']=function(){const _0x42b97f=_0x247375;BattleManager[_0x42b97f(0x35a)]()?this[_0x42b97f(0x233)]():VisuMZ[_0x42b97f(0x2d9)][_0x42b97f(0x201)]['call'](this);},Scene_Battle['prototype'][_0x247375(0x233)]=function(){const _0x8d7268=_0x247375;BattleManager['otbPreviewOrderClear'](),this[_0x8d7268(0x3ce)][_0x8d7268(0x1c4)](),this[_0x8d7268(0x2e4)]['close']();},VisuMZ[_0x247375(0x2d9)][_0x247375(0x3d0)]=Scene_Battle[_0x247375(0x23a)]['commandFight'],Scene_Battle[_0x247375(0x23a)][_0x247375(0x322)]=function(){const _0x4c48cf=_0x247375;BattleManager[_0x4c48cf(0x35a)]()?this[_0x4c48cf(0x33b)]():VisuMZ[_0x4c48cf(0x2d9)][_0x4c48cf(0x3d0)][_0x4c48cf(0x269)](this);},VisuMZ['BattleSystemOTB']['Scene_Battle_createAllWindows']=Scene_Battle[_0x247375(0x23a)][_0x247375(0x33f)],Scene_Battle[_0x247375(0x23a)][_0x247375(0x33f)]=function(){const _0x4a7232=_0x247375;VisuMZ[_0x4a7232(0x2d9)][_0x4a7232(0x325)][_0x4a7232(0x269)](this),this[_0x4a7232(0x376)]();},Scene_Battle[_0x247375(0x23a)][_0x247375(0x376)]=function(){const _0xa428e8=_0x247375;if(!BattleManager[_0xa428e8(0x35a)]())return;this['_otbTurnOrderWindow']=new Window_OTB_TurnOrder();const _0x3eb34f=this[_0xa428e8(0x298)](this['_windowLayer']);this[_0xa428e8(0x300)](this[_0xa428e8(0x271)],_0x3eb34f),this[_0xa428e8(0x1d1)](),SceneManager[_0xa428e8(0x223)]()&&this[_0xa428e8(0x271)][_0xa428e8(0x19b)]();},Scene_Battle['prototype']['repositionLogWindowOTB']=function(){const _0x45ca3b=_0x247375,_0x50158d=Window_OTB_TurnOrder['Settings'];if(_0x50158d[_0x45ca3b(0x365)]!==_0x45ca3b(0x24a))return;if(!_0x50158d[_0x45ca3b(0x268)])return;if(!this[_0x45ca3b(0x247)])return;const _0x34f198=this['_otbTurnOrderWindow']['y']-Math[_0x45ca3b(0x241)]((Graphics['height']-Graphics[_0x45ca3b(0x339)])/0x2),_0x3bd205=_0x34f198+this[_0x45ca3b(0x271)]['height'];this[_0x45ca3b(0x247)]['y']=_0x3bd205+(_0x50158d[_0x45ca3b(0x2a1)]||0x0);},VisuMZ['BattleSystemOTB'][_0x247375(0x1ac)]=Scene_Battle[_0x247375(0x23a)][_0x247375(0x292)],Scene_Battle['prototype'][_0x247375(0x292)]=function(){const _0x4b21f6=_0x247375;BattleManager[_0x4b21f6(0x3bd)](),VisuMZ['BattleSystemOTB'][_0x4b21f6(0x1ac)]['call'](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x380)]=Scene_Battle[_0x247375(0x23a)][_0x247375(0x2b5)],Scene_Battle[_0x247375(0x23a)][_0x247375(0x2b5)]=function(){const _0x523a86=_0x247375;BattleManager[_0x523a86(0x3bd)](),VisuMZ[_0x523a86(0x2d9)][_0x523a86(0x380)][_0x523a86(0x269)](this);},VisuMZ[_0x247375(0x2d9)]['Scene_Battle_onActorOk']=Scene_Battle[_0x247375(0x23a)][_0x247375(0x1ec)],Scene_Battle[_0x247375(0x23a)][_0x247375(0x1ec)]=function(){const _0x25dfd2=_0x247375;BattleManager[_0x25dfd2(0x3bd)](),VisuMZ[_0x25dfd2(0x2d9)][_0x25dfd2(0x2ab)][_0x25dfd2(0x269)](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x280)]=Scene_Battle[_0x247375(0x23a)]['onActorCancel'],Scene_Battle[_0x247375(0x23a)][_0x247375(0x1a3)]=function(){const _0x59fa4a=_0x247375;BattleManager[_0x59fa4a(0x3bd)](),VisuMZ[_0x59fa4a(0x2d9)][_0x59fa4a(0x280)]['call'](this);},VisuMZ['BattleSystemOTB'][_0x247375(0x198)]=Scene_Battle[_0x247375(0x23a)]['onEnemyOk'],Scene_Battle[_0x247375(0x23a)][_0x247375(0x217)]=function(){const _0x11a869=_0x247375;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x11a869(0x2d9)][_0x11a869(0x198)][_0x11a869(0x269)](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x20f)]=Scene_Battle[_0x247375(0x23a)]['onEnemyCancel'],Scene_Battle[_0x247375(0x23a)]['onEnemyCancel']=function(){const _0xc52e1=_0x247375;BattleManager[_0xc52e1(0x3bd)](),VisuMZ['BattleSystemOTB'][_0xc52e1(0x20f)][_0xc52e1(0x269)](this);},VisuMZ['BattleSystemOTB'][_0x247375(0x25e)]=Scene_Battle[_0x247375(0x23a)][_0x247375(0x1c7)],Scene_Battle[_0x247375(0x23a)][_0x247375(0x1c7)]=function(){const _0x7b2e2f=_0x247375;BattleManager[_0x7b2e2f(0x3bd)](),VisuMZ[_0x7b2e2f(0x2d9)][_0x7b2e2f(0x25e)][_0x7b2e2f(0x269)](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x2e3)]=Scene_Battle['prototype'][_0x247375(0x21c)],Scene_Battle[_0x247375(0x23a)]['onSkillCancel']=function(){const _0x33b980=_0x247375;BattleManager[_0x33b980(0x3bd)](),VisuMZ[_0x33b980(0x2d9)][_0x33b980(0x2e3)][_0x33b980(0x269)](this);},VisuMZ[_0x247375(0x2d9)]['Scene_Battle_onItemOk']=Scene_Battle[_0x247375(0x23a)]['onItemOk'],Scene_Battle['prototype'][_0x247375(0x26c)]=function(){const _0x277169=_0x247375;BattleManager[_0x277169(0x3bd)](),VisuMZ[_0x277169(0x2d9)][_0x277169(0x2a7)][_0x277169(0x269)](this);},VisuMZ['BattleSystemOTB'][_0x247375(0x214)]=Scene_Battle[_0x247375(0x23a)][_0x247375(0x18e)],Scene_Battle[_0x247375(0x23a)]['onItemCancel']=function(){const _0x2ed362=_0x247375;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x2ed362(0x2d9)]['Scene_Battle_onItemCancel']['call'](this);},VisuMZ[_0x247375(0x2d9)][_0x247375(0x398)]=Scene_Battle['prototype']['actorCommandSingleSkill'],Scene_Battle['prototype'][_0x247375(0x246)]=function(){const _0x5caf48=_0x247375;BattleManager['otbPreviewOrderClear'](),VisuMZ[_0x5caf48(0x2d9)][_0x5caf48(0x398)]['call'](this);};function Sprite_OTB_TurnOrder_Battler(){const _0x14747f=_0x247375;this[_0x14747f(0x1cb)](...arguments);}Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)]=Object[_0x247375(0x31f)](Sprite_Clickable[_0x247375(0x23a)]),Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x1d3)]=Sprite_OTB_TurnOrder_Battler,Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)]['initialize']=function(_0x28e385,_0x23e520,_0x3e6083){const _0x49739d=_0x247375;this[_0x49739d(0x1f5)](_0x28e385,_0x23e520,_0x3e6083),Sprite_Clickable[_0x49739d(0x23a)][_0x49739d(0x1cb)][_0x49739d(0x269)](this),this[_0x49739d(0x1c9)]=0x0,this[_0x49739d(0x29e)](),this['checkOpacity']();},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x1f5)]=function(_0x151e84,_0x46e600,_0xe6073b){const _0x32c70c=_0x247375;this[_0x32c70c(0x328)]=_0x151e84[_0x32c70c(0x33a)]()?$gameParty:$gameTroop,this[_0x32c70c(0x220)]=_0x151e84['index'](),this['_instance']=_0x46e600,this['_sourceArray']=_0xe6073b;const _0x371387=Window_OTB_TurnOrder[_0x32c70c(0x1df)],_0x38511e=this[_0x32c70c(0x342)]();this['_positionDuration']=0x0,this[_0x32c70c(0x1fe)]=_0x371387['OrderDirection']?-_0x371387[_0x32c70c(0x3a2)]:this[_0x32c70c(0x18f)]()[_0x32c70c(0x266)],this['_positionTargetY']=0x0,this['_fadeDuration']=0x0,this[_0x32c70c(0x2ed)]=0xff,this['_isAlive']=![],this[_0x32c70c(0x2f6)]=![],this['_containerWidth']=0x0,this['_containerHeight']=0x0;},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x29e)]=function(){const _0x297e27=_0x247375;this[_0x297e27(0x2db)](),this[_0x297e27(0x274)](),this['createGraphicSprite'](),this[_0x297e27(0x1ed)](),this[_0x297e27(0x2b3)]();},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x2db)]=function(){const _0x850d90=_0x247375;this['x']=this[_0x850d90(0x1fe)],this['y']=this[_0x850d90(0x2ae)];},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x342)]=function(){return!![];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x247375(0x371)]=function(){const _0x523f1d=_0x247375,_0x587c8a=Window_OTB_TurnOrder[_0x523f1d(0x1df)];return _0x587c8a[_0x523f1d(0x3a2)];},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x25b)]=function(){const _0x2f97ac=_0x247375,_0x113907=Window_OTB_TurnOrder[_0x2f97ac(0x1df)];return _0x113907[_0x2f97ac(0x1f6)];},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x2a4)]=function(){const _0x347bff=_0x247375;return this[_0x347bff(0x328)]===$gameParty?_0x347bff(0x2c8):'Enemy';},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)]['createBackgroundSprite']=function(){const _0xc81fdb=_0x247375;if(!Window_OTB_TurnOrder[_0xc81fdb(0x1df)][_0xc81fdb(0x2e5)])return;const _0x5ed2aa=Window_OTB_TurnOrder[_0xc81fdb(0x1df)],_0x3daccf=this[_0xc81fdb(0x2a4)](),_0x31c692=_0xc81fdb(0x331)[_0xc81fdb(0x1f2)](_0x3daccf),_0x22fb75=new Sprite();_0x22fb75['anchor']['x']=this[_0xc81fdb(0x2f7)]['x'],_0x22fb75['anchor']['y']=this[_0xc81fdb(0x2f7)]['y'];if(_0x5ed2aa[_0x31c692])_0x22fb75[_0xc81fdb(0x1b0)]=ImageManager['loadSystem'](_0x5ed2aa[_0x31c692]);else{const _0x1dc38b=this['bitmapWidth'](),_0x20974d=this[_0xc81fdb(0x25b)]();_0x22fb75['bitmap']=new Bitmap(_0x1dc38b,_0x20974d);const _0x2ced6d=ColorManager[_0xc81fdb(0x1b3)](_0x5ed2aa[_0xc81fdb(0x1d4)['format'](_0x3daccf)]),_0x4cf5aa=ColorManager[_0xc81fdb(0x1b3)](_0x5ed2aa[_0xc81fdb(0x1f3)['format'](_0x3daccf)]);_0x22fb75['bitmap']['gradientFillRect'](0x0,0x0,_0x1dc38b,_0x20974d,_0x2ced6d,_0x4cf5aa,!![]);}this['_backgroundSprite']=_0x22fb75,this[_0xc81fdb(0x30a)](this[_0xc81fdb(0x290)]),this[_0xc81fdb(0x266)]=this[_0xc81fdb(0x290)][_0xc81fdb(0x266)],this[_0xc81fdb(0x2d0)]=this['_backgroundSprite'][_0xc81fdb(0x2d0)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x247375(0x38f)]=function(){const _0x4a421a=_0x247375,_0x4e663b=new Sprite();_0x4e663b[_0x4a421a(0x2f7)]['x']=this[_0x4a421a(0x2f7)]['x'],_0x4e663b[_0x4a421a(0x2f7)]['y']=this[_0x4a421a(0x2f7)]['y'],this[_0x4a421a(0x1e6)]=_0x4e663b,this[_0x4a421a(0x30a)](this[_0x4a421a(0x1e6)]),this[_0x4a421a(0x3c8)]();},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x1ed)]=function(){const _0x2a9dcd=_0x247375;if(!Window_OTB_TurnOrder[_0x2a9dcd(0x1df)]['ShowMarkerBorder'])return;const _0x10d33c=Window_OTB_TurnOrder[_0x2a9dcd(0x1df)],_0x323303=this[_0x2a9dcd(0x2a4)](),_0x39ccd1=_0x2a9dcd(0x2d2)[_0x2a9dcd(0x1f2)](_0x323303),_0x5127e9=new Sprite();_0x5127e9['anchor']['x']=this[_0x2a9dcd(0x2f7)]['x'],_0x5127e9[_0x2a9dcd(0x2f7)]['y']=this['anchor']['y'];if(_0x10d33c[_0x39ccd1])_0x5127e9[_0x2a9dcd(0x1b0)]=ImageManager['loadSystem'](_0x10d33c[_0x39ccd1]);else{let _0x155fe1=this[_0x2a9dcd(0x371)](),_0x4b2e1b=this['bitmapHeight'](),_0x3e52e7=this[_0x2a9dcd(0x202)]();_0x5127e9['bitmap']=new Bitmap(_0x155fe1,_0x4b2e1b);const _0x47168c=_0x2a9dcd(0x1ca),_0x1c816d=ColorManager['getColor'](_0x10d33c[_0x2a9dcd(0x1d7)[_0x2a9dcd(0x1f2)](_0x323303)]);_0x5127e9[_0x2a9dcd(0x1b0)][_0x2a9dcd(0x3c1)](0x0,0x0,_0x155fe1,_0x4b2e1b,_0x47168c),_0x155fe1-=0x2,_0x4b2e1b-=0x2,_0x5127e9[_0x2a9dcd(0x1b0)]['fillRect'](0x1,0x1,_0x155fe1,_0x4b2e1b,_0x1c816d),_0x155fe1-=_0x3e52e7*0x2,_0x4b2e1b-=_0x3e52e7*0x2,_0x5127e9['bitmap'][_0x2a9dcd(0x3c1)](0x1+_0x3e52e7,0x1+_0x3e52e7,_0x155fe1,_0x4b2e1b,_0x47168c),_0x155fe1-=0x2,_0x4b2e1b-=0x2,_0x3e52e7+=0x1,_0x5127e9['bitmap'][_0x2a9dcd(0x1f0)](0x1+_0x3e52e7,0x1+_0x3e52e7,_0x155fe1,_0x4b2e1b);}this[_0x2a9dcd(0x290)]=_0x5127e9,this[_0x2a9dcd(0x30a)](this['_backgroundSprite']);},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x202)]=function(){const _0x58780b=_0x247375,_0x37963a=Window_OTB_TurnOrder[_0x58780b(0x1df)];return _0x37963a[_0x58780b(0x3c0)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x247375(0x2b3)]=function(){const _0xe99ba2=_0x247375,_0x2e6657=Window_OTB_TurnOrder['Settings'];if(!_0x2e6657['EnemyBattlerDrawLetter'])return;if(this[_0xe99ba2(0x328)]===$gameParty)return;const _0x417f73=this[_0xe99ba2(0x371)](),_0x26fb69=this[_0xe99ba2(0x25b)](),_0x1904e7=new Sprite();_0x1904e7['anchor']['x']=this['anchor']['x'],_0x1904e7['anchor']['y']=this[_0xe99ba2(0x2f7)]['y'],_0x1904e7[_0xe99ba2(0x1b0)]=new Bitmap(_0x417f73,_0x26fb69),this[_0xe99ba2(0x1da)]=_0x1904e7,this[_0xe99ba2(0x30a)](this['_letterSprite']);},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x296)]=function(){const _0x1d3eab=_0x247375;return this[_0x1d3eab(0x328)]?this['_unit']['members']()[this[_0x1d3eab(0x220)]]:null;},Sprite_OTB_TurnOrder_Battler['prototype'][_0x247375(0x338)]=function(){const _0x225207=_0x247375;Sprite_Clickable['prototype'][_0x225207(0x338)][_0x225207(0x269)](this),this[_0x225207(0x318)](),this[_0x225207(0x1ea)](),this['updateOpacity'](),this[_0x225207(0x373)](),this['updateGraphicHue'](),this[_0x225207(0x1ab)](),this['updateSelectionEffect']();},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)]['moveToPosition']=function(_0x3d2101,_0x87e070){const _0x5a5c01=_0x247375,_0xd12598=Window_OTB_TurnOrder[_0x5a5c01(0x1df)];this[_0x5a5c01(0x321)]=_0xd12598[_0x5a5c01(0x388)],this[_0x5a5c01(0x1fe)]=_0x3d2101,this[_0x5a5c01(0x2ae)]=_0x87e070;},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x318)]=function(){const _0x1cfae0=_0x247375;if(this[_0x1cfae0(0x321)]>0x0){const _0x2f0975=this['_positionDuration'];this['x']=(this['x']*(_0x2f0975-0x1)+this[_0x1cfae0(0x1fe)])/_0x2f0975,this['y']=(this['y']*(_0x2f0975-0x1)+this[_0x1cfae0(0x2ae)])/_0x2f0975,this[_0x1cfae0(0x321)]--;}if(this['_positionDuration']<=0x0){this['x']=this[_0x1cfae0(0x1fe)],this['y']=this[_0x1cfae0(0x2ae)];if(this[_0x1cfae0(0x1c9)]<0xff&&!this[_0x1cfae0(0x29d)]&&this[_0x1cfae0(0x25c)]<=0x0){const _0x39c366=this[_0x1cfae0(0x296)]();_0x39c366&&(this[_0x1cfae0(0x2ed)]=_0x39c366[_0x1cfae0(0x1a2)]()&&_0x39c366[_0x1cfae0(0x32c)]()?0xff:0x0);}}},Sprite_OTB_TurnOrder_Battler['prototype'][_0x247375(0x2bd)]=function(){return 0x1;},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x18f)]=function(){const _0x366e8c=_0x247375;return SceneManager[_0x366e8c(0x1f9)][_0x366e8c(0x271)];},Sprite_OTB_TurnOrder_Battler['prototype'][_0x247375(0x34d)]=function(){const _0x11ed53=_0x247375,_0x21a69b=this[_0x11ed53(0x296)]();if(!_0x21a69b)return this[_0x11ed53(0x2bd)]();if(_0x21a69b===BattleManager['_subject'])return 0x0;if(BattleManager['_actionBattlers'][_0x11ed53(0x334)](_0x21a69b)){const _0x4ec2a8=BattleManager[_0x11ed53(0x2ff)]['indexOf'](_0x21a69b)+0x1;return _0x4ec2a8;}return this[_0x11ed53(0x2bd)]();},Sprite_OTB_TurnOrder_Battler['prototype'][_0x247375(0x2f0)]=function(_0x34d062){const _0x55c1e0=_0x247375,_0x2081e9=Window_OTB_TurnOrder[_0x55c1e0(0x1df)];this['_fadeDuration']=_0x2081e9[_0x55c1e0(0x388)],this[_0x55c1e0(0x2ed)]=_0x34d062;},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)]['checkOpacity']=function(){const _0x2b76ad=_0x247375,_0xa5fc34=this[_0x2b76ad(0x296)]();if(!_0xa5fc34)return;if(this['_isAlive']===_0xa5fc34[_0x2b76ad(0x1a2)]()&&this[_0x2b76ad(0x2f6)]===_0xa5fc34[_0x2b76ad(0x32c)]())return;this[_0x2b76ad(0x1bf)]=_0xa5fc34[_0x2b76ad(0x1a2)](),this[_0x2b76ad(0x2f6)]=_0xa5fc34[_0x2b76ad(0x32c)]();let _0x311d4b=this[_0x2b76ad(0x1bf)]&&this['_isAppeared']?0xff:0x0;this['startFade'](_0x311d4b);},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x39d)]=function(){const _0x561f55=_0x247375;if(this[_0x561f55(0x25c)]>0x0){const _0x352274=this[_0x561f55(0x25c)];this['opacity']=(this[_0x561f55(0x1c9)]*(_0x352274-0x1)+this[_0x561f55(0x2ed)])/_0x352274,this[_0x561f55(0x25c)]--,this['_fadeDuration']<=0x0&&(this[_0x561f55(0x1c9)]=this[_0x561f55(0x2ed)]);}if(this[_0x561f55(0x29d)])return;BattleManager[_0x561f55(0x2bc)]===_0x561f55(0x1d2)&&(this['_isBattleOver']=!![],this[_0x561f55(0x2f0)](0x0));},Sprite_OTB_TurnOrder_Battler['prototype'][_0x247375(0x373)]=function(){const _0x1985f4=_0x247375,_0x524ba3=this['battler']();if(!_0x524ba3)return;const _0x5320c0=Window_OTB_TurnOrder['Settings'],_0x584421=this['_unit']===$gameParty?'Actor':_0x1985f4(0x240);let _0x148899=_0x524ba3['TurnOrderOTBGraphicType']();if(_0x524ba3['isActor']()&&_0x148899===_0x1985f4(0x31c))_0x148899=_0x1985f4(0x1f8);else _0x524ba3[_0x1985f4(0x287)]()&&_0x148899===_0x1985f4(0x317)&&(_0x148899='enemy');if(this[_0x1985f4(0x2d8)]!==_0x148899)return this[_0x1985f4(0x3c8)]();switch(this['_graphicType']){case _0x1985f4(0x1f8):if(this['_graphicFaceName']!==_0x524ba3[_0x1985f4(0x204)]())return this[_0x1985f4(0x3c8)]();if(this[_0x1985f4(0x23d)]!==_0x524ba3['TurnOrderOTBGraphicFaceIndex']())return this[_0x1985f4(0x3c8)]();break;case _0x1985f4(0x1bb):if(this[_0x1985f4(0x196)]!==_0x524ba3[_0x1985f4(0x2ee)]())return this[_0x1985f4(0x3c8)]();break;case'enemy':if(_0x524ba3[_0x1985f4(0x31e)]()){if(this['_graphicSv']!==_0x524ba3[_0x1985f4(0x21d)]())return this[_0x1985f4(0x3c8)]();}else{if(this[_0x1985f4(0x28d)]!==_0x524ba3[_0x1985f4(0x26a)]())return this[_0x1985f4(0x3c8)]();}break;case _0x1985f4(0x317):if(_0x524ba3['isActor']()){if(this[_0x1985f4(0x37e)]!==_0x524ba3[_0x1985f4(0x26a)]())return this[_0x1985f4(0x3c8)]();}else{if(this[_0x1985f4(0x28d)]!==_0x524ba3['battlerName']())return this['processUpdateGraphic']();}break;}},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x3c8)]=function(){const _0x2fbcc0=_0x247375,_0x519aaa=this[_0x2fbcc0(0x296)]();if(!_0x519aaa)return;this[_0x2fbcc0(0x2d8)]=_0x519aaa[_0x2fbcc0(0x37d)]();if(_0x519aaa[_0x2fbcc0(0x33a)]()&&this['_graphicType']===_0x2fbcc0(0x31c))this['_graphicType']=_0x2fbcc0(0x1f8);else _0x519aaa[_0x2fbcc0(0x287)]()&&this[_0x2fbcc0(0x2d8)]===_0x2fbcc0(0x317)&&(this['_graphicType']=_0x2fbcc0(0x31c));let _0x95c361;switch(this[_0x2fbcc0(0x2d8)]){case'face':this[_0x2fbcc0(0x2ca)]=_0x519aaa[_0x2fbcc0(0x204)](),this[_0x2fbcc0(0x23d)]=_0x519aaa[_0x2fbcc0(0x254)](),_0x95c361=ImageManager[_0x2fbcc0(0x1af)](this[_0x2fbcc0(0x2ca)]),_0x95c361[_0x2fbcc0(0x1dd)](this[_0x2fbcc0(0x1e3)][_0x2fbcc0(0x2a5)](this,_0x95c361));break;case _0x2fbcc0(0x1bb):this[_0x2fbcc0(0x196)]=_0x519aaa['createTurnOrderOTBGraphicIconIndex'](),_0x95c361=ImageManager[_0x2fbcc0(0x1fb)](_0x2fbcc0(0x231)),_0x95c361[_0x2fbcc0(0x1dd)](this[_0x2fbcc0(0x1e5)][_0x2fbcc0(0x2a5)](this,_0x95c361));break;case _0x2fbcc0(0x31c):if(_0x519aaa[_0x2fbcc0(0x31e)]())this[_0x2fbcc0(0x37e)]=_0x519aaa[_0x2fbcc0(0x21d)](),_0x95c361=ImageManager['loadSvActor'](this[_0x2fbcc0(0x37e)]),_0x95c361[_0x2fbcc0(0x1dd)](this[_0x2fbcc0(0x2ea)][_0x2fbcc0(0x2a5)](this,_0x95c361));else $gameSystem['isSideView']()?(this[_0x2fbcc0(0x28d)]=_0x519aaa[_0x2fbcc0(0x26a)](),_0x95c361=ImageManager[_0x2fbcc0(0x2c5)](this[_0x2fbcc0(0x28d)]),_0x95c361[_0x2fbcc0(0x1dd)](this[_0x2fbcc0(0x23b)][_0x2fbcc0(0x2a5)](this,_0x95c361))):(this[_0x2fbcc0(0x28d)]=_0x519aaa['battlerName'](),_0x95c361=ImageManager[_0x2fbcc0(0x38c)](this[_0x2fbcc0(0x28d)]),_0x95c361[_0x2fbcc0(0x1dd)](this['changeEnemyGraphicBitmap'][_0x2fbcc0(0x2a5)](this,_0x95c361)));break;case'svactor':this[_0x2fbcc0(0x37e)]=_0x519aaa[_0x2fbcc0(0x26a)](),_0x95c361=ImageManager[_0x2fbcc0(0x1bc)](this[_0x2fbcc0(0x37e)]),_0x95c361[_0x2fbcc0(0x1dd)](this[_0x2fbcc0(0x2ea)][_0x2fbcc0(0x2a5)](this,_0x95c361));break;}},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x1e3)]=function(_0x3ee6b1){const _0x34b167=_0x247375,_0x316e3b=this[_0x34b167(0x23d)],_0x8d9ac8=this[_0x34b167(0x371)](),_0x863f54=this[_0x34b167(0x25b)](),_0xc67aaf=Math[_0x34b167(0x1de)](_0x8d9ac8,_0x863f54);this[_0x34b167(0x1e6)][_0x34b167(0x1b0)]=new Bitmap(_0x8d9ac8,_0x863f54);const _0x1989b1=this[_0x34b167(0x1e6)][_0x34b167(0x1b0)],_0x58193f=ImageManager[_0x34b167(0x2b6)],_0x1c910e=ImageManager[_0x34b167(0x3a3)],_0x4cc5e3=_0xc67aaf/Math[_0x34b167(0x1de)](_0x58193f,_0x1c910e),_0x10dfd5=ImageManager[_0x34b167(0x2b6)],_0x5f4e0a=ImageManager[_0x34b167(0x3a3)],_0x3c7a2c=_0x316e3b%0x4*_0x58193f+(_0x58193f-_0x10dfd5)/0x2,_0x30562e=Math[_0x34b167(0x230)](_0x316e3b/0x4)*_0x1c910e+(_0x1c910e-_0x5f4e0a)/0x2,_0x163263=(_0x8d9ac8-_0x58193f*_0x4cc5e3)/0x2,_0x3fe1cf=(_0x863f54-_0x1c910e*_0x4cc5e3)/0x2;_0x1989b1[_0x34b167(0x1b2)](_0x3ee6b1,_0x3c7a2c,_0x30562e,_0x10dfd5,_0x5f4e0a,_0x163263,_0x3fe1cf,_0xc67aaf,_0xc67aaf);},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x1e5)]=function(_0x55ef8b){const _0x594045=_0x247375,_0x429304=this[_0x594045(0x196)],_0x3693e6=this[_0x594045(0x371)](),_0x494597=this['bitmapHeight']();this[_0x594045(0x1e6)][_0x594045(0x1b0)]=new Bitmap(_0x3693e6,_0x494597);const _0x4285e5=this['_graphicSprite'][_0x594045(0x1b0)],_0x1d051a=ImageManager[_0x594045(0x29b)],_0x4b7a8a=ImageManager[_0x594045(0x312)],_0x4528d3=Math[_0x594045(0x308)](_0x1d051a,_0x4b7a8a,_0x3693e6,_0x494597),_0x272db9=_0x429304%0x10*_0x1d051a,_0x48d076=Math[_0x594045(0x230)](_0x429304/0x10)*_0x4b7a8a,_0x52febd=Math[_0x594045(0x230)](Math['max'](_0x3693e6-_0x4528d3,0x0)/0x2),_0x1d3887=Math['floor'](Math[_0x594045(0x1de)](_0x494597-_0x4528d3,0x0)/0x2);_0x4285e5[_0x594045(0x1b2)](_0x55ef8b,_0x272db9,_0x48d076,_0x1d051a,_0x4b7a8a,_0x52febd,_0x1d3887,_0x4528d3,_0x4528d3);},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)]['changeSvActorGraphicBitmap']=function(_0x1d818e){const _0x1e2191=_0x247375,_0x428f58=this[_0x1e2191(0x371)](),_0x84edca=this['bitmapHeight'](),_0x289fb=Math[_0x1e2191(0x308)](_0x428f58,_0x84edca);this[_0x1e2191(0x1e6)][_0x1e2191(0x1b0)]=new Bitmap(_0x428f58,_0x84edca);const _0x29654a=this[_0x1e2191(0x1e6)]['bitmap'],_0x332673=this[_0x1e2191(0x37e)][_0x1e2191(0x206)](/\$/i),_0x2a35e4=_0x332673?0x1:ImageManager['svActorHorzCells'],_0x4ae5d8=_0x332673?0x1:ImageManager['svActorVertCells'],_0x249fc1=_0x1d818e[_0x1e2191(0x266)]/_0x2a35e4,_0x41e47c=_0x1d818e[_0x1e2191(0x2d0)]/_0x4ae5d8,_0x192d9c=Math['min'](0x1,_0x289fb/_0x249fc1,_0x289fb/_0x41e47c),_0x276e4b=_0x249fc1*_0x192d9c,_0x3ea645=_0x41e47c*_0x192d9c,_0x404e78=Math[_0x1e2191(0x241)]((_0x428f58-_0x276e4b)/0x2),_0x408e2f=Math[_0x1e2191(0x241)]((_0x84edca-_0x3ea645)/0x2);_0x29654a[_0x1e2191(0x1b2)](_0x1d818e,0x0,0x0,_0x249fc1,_0x41e47c,_0x404e78,_0x408e2f,_0x276e4b,_0x3ea645);},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x23b)]=function(_0x270da6){const _0x3e85e7=_0x247375,_0x3a0fd3=Window_OTB_TurnOrder['Settings'],_0x5e7427=this[_0x3e85e7(0x371)](),_0x3c6bb2=this[_0x3e85e7(0x25b)](),_0x193b14=Math[_0x3e85e7(0x308)](_0x5e7427,_0x3c6bb2);this[_0x3e85e7(0x1e6)]['bitmap']=new Bitmap(_0x5e7427,_0x3c6bb2);const _0x976e79=this[_0x3e85e7(0x1e6)][_0x3e85e7(0x1b0)],_0x3a21ad=Math[_0x3e85e7(0x308)](0x1,_0x193b14/_0x270da6[_0x3e85e7(0x266)],_0x193b14/_0x270da6['height']),_0x1c02f2=_0x270da6[_0x3e85e7(0x266)]*_0x3a21ad,_0x35296c=_0x270da6[_0x3e85e7(0x2d0)]*_0x3a21ad,_0x5ece98=Math[_0x3e85e7(0x241)]((_0x5e7427-_0x1c02f2)/0x2),_0x16494c=Math['round']((_0x3c6bb2-_0x35296c)/0x2);_0x976e79[_0x3e85e7(0x1b2)](_0x270da6,0x0,0x0,_0x270da6['width'],_0x270da6[_0x3e85e7(0x2d0)],_0x5ece98,_0x16494c,_0x1c02f2,_0x35296c);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x247375(0x1d9)]=function(){const _0x29b2b4=_0x247375,_0x5a7afc=this[_0x29b2b4(0x296)]();if(!_0x5a7afc)return;if(!_0x5a7afc[_0x29b2b4(0x287)]())return;if(this['_graphicHue']===_0x5a7afc[_0x29b2b4(0x323)]())return;this[_0x29b2b4(0x39e)]=_0x5a7afc[_0x29b2b4(0x323)](),this['_graphicSprite'][_0x29b2b4(0x36d)](_0x5a7afc[_0x29b2b4(0x31e)]()?0x0:this[_0x29b2b4(0x39e)]);},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x1ab)]=function(){const _0x19acfb=_0x247375;if(!this['_letterSprite'])return;const _0x428f39=this[_0x19acfb(0x296)]();if(!_0x428f39)return;if(this[_0x19acfb(0x1e2)]===_0x428f39['_letter']&&this[_0x19acfb(0x1eb)]===_0x428f39[_0x19acfb(0x1eb)])return;this[_0x19acfb(0x1e2)]=_0x428f39['_letter'],this['_plural']=_0x428f39['_plural'];const _0xc07809=Window_OTB_TurnOrder[_0x19acfb(0x1df)],_0xab43ed=this[_0x19acfb(0x371)](),_0x1207e7=this[_0x19acfb(0x25b)](),_0x303da3=this['_letterSprite'][_0x19acfb(0x1b0)];_0x303da3[_0x19acfb(0x243)]();if(!this[_0x19acfb(0x1eb)])return;_0x303da3['fontFace']=_0xc07809['EnemyBattlerFontFace']||$gameSystem[_0x19acfb(0x295)](),_0x303da3[_0x19acfb(0x282)]=_0xc07809[_0x19acfb(0x3ab)]||0x10,_0xc07809[_0x19acfb(0x27b)]?_0x303da3[_0x19acfb(0x2b7)](this['_letter']['trim'](),_0xab43ed*0x1/0x8,_0x1207e7/0x2,_0xab43ed,_0x1207e7/0x2,_0x19acfb(0x28e)):_0x303da3['drawText'](this[_0x19acfb(0x1e2)][_0x19acfb(0x28f)](),0x0,_0x1207e7/0x2,_0xab43ed*0x7/0x8,_0x1207e7/0x2,'right');},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x2d3)]=function(){const _0x1c5ff5=_0x247375,_0x6abdbb=this[_0x1c5ff5(0x296)]();if(!_0x6abdbb)return;const _0x30498e=_0x6abdbb['battler']();if(!_0x30498e)return;const _0x1ba293=_0x30498e['mainSprite']();if(!_0x1ba293)return;this[_0x1c5ff5(0x291)](_0x1ba293['_blendColor']);},Sprite_OTB_TurnOrder_Battler['prototype'][_0x247375(0x3b4)]=function(){return null;},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x1e9)]=function(_0x509696){const _0x3819d1=_0x247375;this[_0x3819d1(0x3b7)]=_0x509696,this['calculateTargetPositions'](),this[_0x3819d1(0x3b7)]===null&&(this['_instance']=-0x1);},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x357)]=function(){const _0x155c7e=_0x247375,_0x952d4b=this[_0x155c7e(0x18f)]();if(!_0x952d4b)return;const _0x24c059=Window_OTB_TurnOrder[_0x155c7e(0x1df)],_0xb551bc=_0x24c059[_0x155c7e(0x27b)],_0x411d70=this[_0x155c7e(0x3b7)]===_0x952d4b[_0x155c7e(0x2be)]?!![]:![],_0x38f00c=this[_0x155c7e(0x351)]===-0x1&&BattleManager[_0x155c7e(0x335)]===this[_0x155c7e(0x296)](),_0x588837=_0x952d4b[_0x155c7e(0x252)]-_0x24c059[_0x155c7e(0x3a2)];let _0x4a1190=Math[_0x155c7e(0x23f)](_0x588837/(this[_0x155c7e(0x3b7)]['length']-0x1||0x1));_0x4a1190=Math['min'](_0x24c059[_0x155c7e(0x3a2)],_0x4a1190);let _0x2adf87=0x0,_0x1a4c7b=0x0,_0x4e678c=_0x38f00c?-0x1:this[_0x155c7e(0x3b7)]['indexOf'](this);!_0x38f00c&&(_0x4e678c=this[_0x155c7e(0x219)]());if(_0x38f00c)_0x2adf87=_0x952d4b['_subjectX'];else _0xb551bc?(_0x2adf87=(_0x411d70?_0x952d4b['_nextX']:_0x952d4b[_0x155c7e(0x1be)])+_0x588837,_0x2adf87-=_0x4e678c*_0x4a1190):(_0x2adf87=_0x411d70?_0x952d4b['_nextX']:_0x952d4b[_0x155c7e(0x1be)],_0x2adf87+=_0x4e678c*_0x4a1190);_0x2adf87+=this[_0x155c7e(0x22d)](_0x4e678c,_0x24c059[_0x155c7e(0x3a2)]-_0x4a1190),!_0x38f00c&&_0x4e678c<0x0&&(_0x2adf87=this['x'],_0x1a4c7b=this['y'],this[_0x155c7e(0x2f0)](0x0)),this['moveToPosition'](_0x2adf87,_0x1a4c7b);},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)][_0x247375(0x22d)]=function(_0x25ef18,_0x46b83a){return 0x0;},Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)]['calculateTargetIndex']=function(){const _0x2224fb=_0x247375,_0x3723e5=this['containerWindow']();if(!_0x3723e5)return 0x0;const _0x126bc2=this['_sourceArray']===_0x3723e5[_0x2224fb(0x2be)]?!![]:![],_0x556f2c=_0x126bc2?BattleManager[_0x2224fb(0x2d1)]:BattleManager['_actionBattlers'],_0x524647=this[_0x2224fb(0x296)](),_0x965a90=VisuMZ[_0x2224fb(0x2d9)][_0x2224fb(0x38a)](_0x524647,_0x556f2c);return _0x965a90[this[_0x2224fb(0x351)]]??_0x965a90[_0x965a90[_0x2224fb(0x33e)]-0x1]??-0x1;};function Sprite_OTB_TurnOrder_Preview(){const _0x2d6055=_0x247375;this[_0x2d6055(0x1cb)](...arguments);}Sprite_OTB_TurnOrder_Preview[_0x247375(0x23a)]=Object[_0x247375(0x31f)](Sprite_OTB_TurnOrder_Battler[_0x247375(0x23a)]),Sprite_OTB_TurnOrder_Preview[_0x247375(0x23a)][_0x247375(0x1d3)]=Sprite_OTB_TurnOrder_Preview,Sprite_OTB_TurnOrder_Preview[_0x247375(0x23a)]['initialize']=function(_0x27ff4b,_0x574916,_0x1529e1,_0xf57f8f){const _0x50445f=_0x247375;this[_0x50445f(0x1f1)]=_0xf57f8f,Sprite_OTB_TurnOrder_Battler['prototype']['initialize'][_0x50445f(0x269)](this,_0x27ff4b,_0x574916,_0x1529e1),this[_0x50445f(0x1a9)]();},Sprite_OTB_TurnOrder_Preview[_0x247375(0x23a)]['adjustForPreview']=function(){const _0x8badd2=_0x247375,_0x25031c=Window_OTB_TurnOrder[_0x8badd2(0x1df)];this[_0x8badd2(0x303)]['x']=this[_0x8badd2(0x303)]['y']=_0x25031c['PreviewScale'];},Sprite_OTB_TurnOrder_Preview[_0x247375(0x23a)][_0x247375(0x2a4)]=function(){const _0x5b1faf=_0x247375;return this[_0x5b1faf(0x328)]===$gameParty?_0x5b1faf(0x3cf):_0x5b1faf(0x2e1);},Sprite_OTB_TurnOrder_Preview[_0x247375(0x23a)][_0x247375(0x202)]=function(){const _0x2f1c10=Window_OTB_TurnOrder['Settings'];return Math['ceil'](_0x2f1c10['BorderThickness']/(_0x2f1c10['PreviewScale']||0.01));},Sprite_OTB_TurnOrder_Preview[_0x247375(0x23a)][_0x247375(0x305)]=function(_0x571458,_0x431207){const _0x38059e=_0x247375;Sprite_OTB_TurnOrder_Battler[_0x38059e(0x23a)][_0x38059e(0x305)][_0x38059e(0x269)](this,_0x571458,_0x431207),this['x']=this[_0x38059e(0x1fe)],this['y']=this[_0x38059e(0x2ae)];},Sprite_OTB_TurnOrder_Preview['prototype'][_0x247375(0x2f0)]=function(_0x2f8a4c){const _0x41474d=_0x247375;Sprite_OTB_TurnOrder_Battler['prototype'][_0x41474d(0x2f0)][_0x41474d(0x269)](this,_0x2f8a4c),_0x2f8a4c>0x0?this['_fadeDuration']=0x1:(this['_fadeDuration']/=0x2,this['_fadeDuration']=Math[_0x41474d(0x230)](this[_0x41474d(0x25c)]));},Sprite_OTB_TurnOrder_Preview[_0x247375(0x23a)][_0x247375(0x22d)]=function(_0x17bbdf,_0x4210ff){const _0x25589b=_0x247375,_0x511554=Window_OTB_TurnOrder[_0x25589b(0x1df)];if(_0x17bbdf>0x0){if(this[_0x25589b(0x1f1)]>0x0)return _0x511554[_0x25589b(0x27b)]?-_0x511554['SpriteThin']:_0x511554[_0x25589b(0x3a2)];else{if(this[_0x25589b(0x1f1)]<0x0)return _0x511554[_0x25589b(0x27b)]?-_0x4210ff:_0x4210ff;}}return 0x0;},Sprite_OTB_TurnOrder_Preview['prototype'][_0x247375(0x219)]=function(){const _0x23679e=_0x247375,_0x3388ca=this['containerWindow'](),_0x40b8c3=this['_sourceArray']===_0x3388ca['_nextTurn']?!![]:![],_0x4c99c6=_0x40b8c3?BattleManager['_otb_actionBattlersNext']:BattleManager['_actionBattlers'];let _0xca8c45=0x0,_0x43e558=_0x4c99c6[_0x23679e(0x33e)]-0x1;_0x40b8c3&&(_0xca8c45=Math[_0x23679e(0x1de)](0x0,VisuMZ[_0x23679e(0x2d9)][_0x23679e(0x1ba)](_0x4c99c6)));let _0x2bf94b=Sprite_OTB_TurnOrder_Battler[_0x23679e(0x23a)]['calculateTargetIndex'][_0x23679e(0x269)](this);return _0x2bf94b+=this[_0x23679e(0x1f1)],_0x2bf94b[_0x23679e(0x264)](_0xca8c45,_0x43e558);},Sprite_OTB_TurnOrder_Preview[_0x247375(0x23a)][_0x247375(0x2d3)]=function(){},Window_Selectable['prototype'][_0x247375(0x320)]=function(){return![];},VisuMZ['BattleSystemOTB'][_0x247375(0x27f)]=Window_Selectable[_0x247375(0x23a)][_0x247375(0x2f5)],Window_Selectable[_0x247375(0x23a)]['select']=function(_0x3b615d){const _0x27f57b=_0x247375;VisuMZ['BattleSystemOTB'][_0x27f57b(0x27f)][_0x27f57b(0x269)](this,_0x3b615d),this[_0x27f57b(0x320)]()&&this[_0x27f57b(0x30c)]&&this[_0x27f57b(0x3a7)]();},Window_Selectable[_0x247375(0x23a)]['applyBattleItemWindowOTB']=function(){BattleManager['otbPreviewOrderChange']();},VisuMZ['BattleSystemOTB'][_0x247375(0x356)]=Window_Help[_0x247375(0x23a)][_0x247375(0x1db)],Window_Help[_0x247375(0x23a)]['setItem']=function(_0x152a51){const _0x1bd872=_0x247375;BattleManager[_0x1bd872(0x35a)]()&&_0x152a51&&_0x152a51['note']&&_0x152a51['note']['match'](/<(?:OTB) HELP>\s*([\s\S]*)\s*<\/(?:OTB) HELP>/i)?this['setText'](String(RegExp['$1'])):VisuMZ['BattleSystemOTB'][_0x1bd872(0x356)]['call'](this,_0x152a51);},Window_ActorCommand[_0x247375(0x23a)][_0x247375(0x320)]=function(){const _0x34cd9c=_0x247375;return BattleManager[_0x34cd9c(0x35a)]();},Window_ActorCommand[_0x247375(0x23a)][_0x247375(0x3a7)]=function(){const _0x641298=_0x247375,_0xd53ac8=BattleManager['inputtingAction']();if(_0xd53ac8){const _0x404f42=this['currentSymbol']();switch(_0x404f42){case _0x641298(0x3a0):_0xd53ac8['setAttack']();break;case'guard':_0xd53ac8['setGuard']();break;case _0x641298(0x340):_0xd53ac8['setSkill'](this[_0x641298(0x237)]());break;default:_0xd53ac8['setSkill'](null);break;}}Window_Command[_0x641298(0x23a)][_0x641298(0x3a7)][_0x641298(0x269)](this);},Window_BattleSkill[_0x247375(0x23a)][_0x247375(0x320)]=function(){return BattleManager['isOTB']();},Window_BattleSkill[_0x247375(0x23a)][_0x247375(0x3a7)]=function(){const _0x511d49=_0x247375,_0x36a03b=this[_0x511d49(0x332)](),_0x2d1b37=BattleManager[_0x511d49(0x1d8)]();if(_0x2d1b37)_0x2d1b37[_0x511d49(0x309)](_0x36a03b?_0x36a03b['id']:null);Window_SkillList[_0x511d49(0x23a)][_0x511d49(0x3a7)][_0x511d49(0x269)](this);},Window_BattleItem[_0x247375(0x23a)][_0x247375(0x320)]=function(){const _0x416f4f=_0x247375;return BattleManager[_0x416f4f(0x35a)]();},Window_BattleItem[_0x247375(0x23a)][_0x247375(0x3a7)]=function(){const _0x40b8a4=_0x247375,_0x27c080=this[_0x40b8a4(0x332)](),_0x5923c9=BattleManager[_0x40b8a4(0x1d8)]();if(_0x5923c9)_0x5923c9[_0x40b8a4(0x1db)](_0x27c080?_0x27c080['id']:null);Window_ItemList['prototype'][_0x40b8a4(0x3a7)]['call'](this);},Window_BattleActor[_0x247375(0x23a)][_0x247375(0x320)]=function(){return BattleManager['isOTB']();},Window_BattleEnemy[_0x247375(0x23a)][_0x247375(0x320)]=function(){const _0xf723c6=_0x247375;return BattleManager[_0xf723c6(0x35a)]();};function Window_OTB_TurnOrder(){const _0x209bbf=_0x247375;this[_0x209bbf(0x1cb)](...arguments);}Window_OTB_TurnOrder[_0x247375(0x23a)]=Object[_0x247375(0x31f)](Window_Base[_0x247375(0x23a)]),Window_OTB_TurnOrder['prototype'][_0x247375(0x1d3)]=Window_OTB_TurnOrder,Window_OTB_TurnOrder[_0x247375(0x1df)]=VisuMZ[_0x247375(0x2d9)][_0x247375(0x1df)]['TurnOrder'],Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x1cb)]=function(){const _0x13c2ef=_0x247375,_0x42ec59=this['windowRect']();this[_0x13c2ef(0x27e)](_0x42ec59),Window_Base['prototype']['initialize']['call'](this,_0x42ec59),this[_0x13c2ef(0x1c9)]=0x0,this[_0x13c2ef(0x3a5)](),this[_0x13c2ef(0x257)](),this['createSpriteContainers'](),this[_0x13c2ef(0x2b9)]();},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x352)]=function(){const _0x2dcbe7=_0x247375,_0x482ecd=Window_OTB_TurnOrder[_0x2dcbe7(0x1df)],_0x3c13b8=SceneManager['_scene'][_0x2dcbe7(0x35d)]['height'];let _0xf3f992=Graphics[_0x2dcbe7(0x266)]-_0x482ecd[_0x2dcbe7(0x364)]*0x2,_0xc68a01=_0x482ecd[_0x2dcbe7(0x1f6)]+this[_0x2dcbe7(0x2b1)](),_0x27459c=_0x482ecd[_0x2dcbe7(0x364)],_0x27559b=0x0;switch(_0x482ecd[_0x2dcbe7(0x365)]){case _0x2dcbe7(0x34c):_0x27559b=Graphics['height']-_0x3c13b8-_0x482ecd[_0x2dcbe7(0x364)]-_0xc68a01;break;default:_0x27559b=_0x482ecd[_0x2dcbe7(0x364)];break;}if(Imported[_0x2dcbe7(0x385)]&&BattleManager[_0x2dcbe7(0x3c9)]()){const _0x11962a=VisuMZ[_0x2dcbe7(0x279)][_0x2dcbe7(0x1df)][_0x2dcbe7(0x34e)];_0xf3f992-=_0x11962a['WidthBase']+_0x11962a[_0x2dcbe7(0x2f9)],_0xf3f992-=_0x482ecd[_0x2dcbe7(0x364)];}return _0x27459c+=_0x482ecd['DisplayOffsetX']||0x0,_0x27559b+=_0x482ecd[_0x2dcbe7(0x29a)]||0x0,new Rectangle(_0x27459c,_0x27559b,_0xf3f992,_0xc68a01);},Window_OTB_TurnOrder[_0x247375(0x23a)]['initHomePositions']=function(_0x270a0f){const _0x2ffe42=_0x247375;this[_0x2ffe42(0x343)]=this[_0x2ffe42(0x248)]=_0x270a0f['x'],this['_targetHomeY']=this['_homeY']=_0x270a0f['y'],this[_0x2ffe42(0x2fb)]=0x0;const _0x310df6=Window_OTB_TurnOrder['Settings'];this[_0x2ffe42(0x252)]=Math[_0x2ffe42(0x23f)]((_0x270a0f[_0x2ffe42(0x266)]-_0x310df6['SpriteThin']-_0x310df6[_0x2ffe42(0x347)]*0x2)/0x2),_0x310df6[_0x2ffe42(0x27b)]?(this[_0x2ffe42(0x22a)]=_0x270a0f['width']-_0x310df6['SpriteThin'],this[_0x2ffe42(0x1be)]=this[_0x2ffe42(0x252)]+_0x310df6[_0x2ffe42(0x347)],this[_0x2ffe42(0x3bc)]=0x0):(this[_0x2ffe42(0x22a)]=0x0,this[_0x2ffe42(0x1be)]=_0x310df6['SpriteThin']+_0x310df6['SubjectDistance'],this[_0x2ffe42(0x3bc)]=this[_0x2ffe42(0x1be)]+_0x310df6[_0x2ffe42(0x347)]+this[_0x2ffe42(0x252)]);},Window_OTB_TurnOrder['prototype']['updatePadding']=function(){const _0x276584=_0x247375;this[_0x276584(0x29c)]=0x0;},Window_OTB_TurnOrder['prototype']['drawDimmedArea']=function(){const _0x53652b=_0x247375,_0x404827=Window_OTB_TurnOrder[_0x53652b(0x1df)];if(_0x404827[_0x53652b(0x194)]==='transparent')return;if(_0x404827[_0x53652b(0x194)]===_0x53652b(0x20d)&&_0x404827[_0x53652b(0x2fe)]!==''){const _0x5e9a5d=ImageManager[_0x53652b(0x1fb)](_0x404827['BgImageFilename']);_0x5e9a5d[_0x53652b(0x1dd)](this[_0x53652b(0x25d)]['bind'](this,_0x5e9a5d));return;};const _0x3cb906=this[_0x53652b(0x370)],_0x4c5f5f=ColorManager['dimColor1'](),_0x5e5d20=ColorManager['dimColor2'](),_0x37ec14=this[_0x53652b(0x22a)],_0x5e13d6=_0x404827[_0x53652b(0x3a2)],_0x28826e=0x0,_0xb04be4=_0x404827[_0x53652b(0x1f6)],_0x55201b=this[_0x53652b(0x1be)],_0x3e9126=this['_nextX'],_0x557502=this[_0x53652b(0x252)];switch(_0x404827[_0x53652b(0x194)]){case _0x53652b(0x315):_0x404827[_0x53652b(0x27b)]?(_0x3cb906[_0x53652b(0x1c6)](_0x37ec14,_0x28826e,_0x5e13d6/0x2,_0xb04be4,_0x5e5d20,_0x4c5f5f,![]),_0x3cb906[_0x53652b(0x3c1)](_0x37ec14+_0x5e13d6/0x2,_0x28826e,_0x5e13d6/0x2,_0xb04be4,_0x4c5f5f),_0x3cb906[_0x53652b(0x1c6)](_0x55201b,_0x28826e,_0x557502/0x2,_0xb04be4,_0x5e5d20,_0x4c5f5f,![]),_0x3cb906['fillRect'](_0x55201b+_0x557502/0x2,_0x28826e,_0x557502/0x2,_0xb04be4,_0x4c5f5f),_0x3cb906['gradientFillRect'](_0x3e9126,_0x28826e,_0x557502/0x2,_0xb04be4,_0x5e5d20,_0x4c5f5f,![]),_0x3cb906[_0x53652b(0x3c1)](_0x3e9126+_0x557502/0x2,_0x28826e,_0x557502/0x2,_0xb04be4,_0x4c5f5f)):(_0x3cb906[_0x53652b(0x3c1)](_0x37ec14,_0x28826e,_0x5e13d6/0x2,_0xb04be4,_0x4c5f5f),_0x3cb906[_0x53652b(0x1c6)](_0x37ec14+_0x5e13d6/0x2,_0x28826e,_0x5e13d6/0x2,_0xb04be4,_0x4c5f5f,_0x5e5d20,![]),_0x3cb906[_0x53652b(0x3c1)](_0x55201b,_0x28826e,_0x557502/0x2,_0xb04be4,_0x4c5f5f),_0x3cb906['gradientFillRect'](_0x55201b+_0x557502/0x2,_0x28826e,_0x557502/0x2,_0xb04be4,_0x4c5f5f,_0x5e5d20,![]),_0x3cb906[_0x53652b(0x3c1)](_0x3e9126,_0x28826e,_0x557502/0x2,_0xb04be4,_0x4c5f5f),_0x3cb906[_0x53652b(0x1c6)](_0x3e9126+_0x557502/0x2,_0x28826e,_0x557502/0x2,_0xb04be4,_0x4c5f5f,_0x5e5d20,![]));break;default:_0x3cb906[_0x53652b(0x3c1)](_0x37ec14,_0x28826e,_0x5e13d6,_0xb04be4,_0x4c5f5f),_0x3cb906[_0x53652b(0x3c1)](_0x55201b,_0x28826e,_0x557502,_0xb04be4,_0x4c5f5f),_0x3cb906['fillRect'](_0x3e9126,_0x28826e,_0x557502,_0xb04be4,_0x4c5f5f);break;}},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x25d)]=function(_0x2020af){const _0x399a48=_0x247375;this[_0x399a48(0x326)]=new Sprite(),this[_0x399a48(0x326)][_0x399a48(0x1b0)]=_0x2020af,this[_0x399a48(0x284)](this[_0x399a48(0x326)]);const _0xb119c4=Window_OTB_TurnOrder[_0x399a48(0x1df)];this[_0x399a48(0x326)]['x']=_0xb119c4[_0x399a48(0x229)],this[_0x399a48(0x326)]['y']=_0xb119c4[_0x399a48(0x195)];},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x257)]=function(){const _0x1fa4a1=_0x247375;this[_0x1fa4a1(0x307)]['clear'](),this[_0x1fa4a1(0x360)]();const _0x3dd106=Window_OTB_TurnOrder[_0x1fa4a1(0x1df)];this[_0x1fa4a1(0x307)][_0x1fa4a1(0x282)]=_0x3dd106['UiFontSize'];let _0x235473=_0x3dd106[_0x1fa4a1(0x31a)];_0x235473===_0x1fa4a1(0x2f1)&&(_0x235473=_0x3dd106['OrderDirection']?_0x1fa4a1(0x222):_0x1fa4a1(0x28e));let _0x49c8af=_0x3dd106['SpriteLength'];if(_0x3dd106[_0x1fa4a1(0x2c3)]!==''){const _0x13258b=this[_0x1fa4a1(0x22a)]+_0x3dd106[_0x1fa4a1(0x2dd)],_0x36238f=_0x49c8af+_0x3dd106['UiSubjectOffsetY'],_0x23cea8=_0x3dd106[_0x1fa4a1(0x3a2)];this[_0x1fa4a1(0x2b7)](_0x3dd106['UiSubjectText'],_0x13258b,_0x36238f,_0x23cea8,_0x1fa4a1(0x333));}if(_0x3dd106['UiCurrentText']!==''){const _0xa3d280=this['_currentX']+_0x3dd106[_0x1fa4a1(0x2de)],_0x42ff3e=_0x49c8af+_0x3dd106[_0x1fa4a1(0x2b8)],_0x44f4dd=this['_spriteGroupWidth'];this[_0x1fa4a1(0x2b7)](_0x3dd106[_0x1fa4a1(0x1bd)],_0xa3d280,_0x42ff3e,_0x44f4dd,_0x235473);}if(_0x3dd106[_0x1fa4a1(0x27d)]!==''){const _0x24f9fb=this['_nextX']+_0x3dd106['UiNextOffsetX'],_0x466ba1=_0x49c8af+_0x3dd106[_0x1fa4a1(0x256)],_0x2a1889=this['_spriteGroupWidth'];this[_0x1fa4a1(0x2b7)](_0x3dd106[_0x1fa4a1(0x27d)],_0x24f9fb,_0x466ba1,_0x2a1889,_0x235473);}},Window_OTB_TurnOrder['prototype'][_0x247375(0x3a4)]=function(){const _0x3f36ee=_0x247375,_0xa341f7=Window_OTB_TurnOrder[_0x3f36ee(0x1df)];this['_spriteContainer']=new Sprite(),this[_0x3f36ee(0x30a)](this[_0x3f36ee(0x1cc)]),this[_0x3f36ee(0x335)]=null,this[_0x3f36ee(0x345)]=[],this[_0x3f36ee(0x2be)]=[],this['_previewContainer']=new Sprite(),this[_0x3f36ee(0x3a9)]['x']=_0xa341f7[_0x3f36ee(0x361)],this[_0x3f36ee(0x3a9)]['y']=_0xa341f7['PreviewOffsetY'],this[_0x3f36ee(0x3a9)]['x']-=Math[_0x3f36ee(0x23f)](_0xa341f7[_0x3f36ee(0x3a2)]*0.5*_0xa341f7[_0x3f36ee(0x1b7)]),_0xa341f7[_0x3f36ee(0x27b)]&&(this[_0x3f36ee(0x3a9)]['x']+=_0xa341f7[_0x3f36ee(0x3a2)]),this['_previewContainer']['y']-=Math[_0x3f36ee(0x23f)](_0xa341f7['SpriteLength']*0.5*_0xa341f7['PreviewScale']),this[_0x3f36ee(0x30a)](this['_previewContainer']),this[_0x3f36ee(0x3ba)]=[],this[_0x3f36ee(0x1a5)]=[];},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x338)]=function(){const _0x3ca9ab=_0x247375;Window_Base[_0x3ca9ab(0x23a)]['update'][_0x3ca9ab(0x269)](this),this['updateTurnOrders'](),this[_0x3ca9ab(0x318)](),this['updateVisibility'](),this[_0x3ca9ab(0x2cf)]();},Window_OTB_TurnOrder[_0x247375(0x23a)]['requestUpdateTurnOrders']=function(){const _0x39880d=_0x247375;this[_0x39880d(0x1b6)]=!![];},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x2f8)]=function(){const _0x311c53=_0x247375;if(!this[_0x311c53(0x1b6)])return;this[_0x311c53(0x1b6)]=![];for(const _0xfed9c7 of this[_0x311c53(0x345)]){if(!_0xfed9c7)continue;_0xfed9c7[_0x311c53(0x357)]();}for(const _0xb33d2d of this['_nextTurn']){if(!_0xb33d2d)continue;_0xb33d2d[_0x311c53(0x357)]();}},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x318)]=function(){const _0x30c200=_0x247375,_0x3f903c=Window_OTB_TurnOrder['Settings'];if(_0x3f903c[_0x30c200(0x365)]!==_0x30c200(0x24a))return;if(!_0x3f903c[_0x30c200(0x27a)])return;const _0x213e08=SceneManager[_0x30c200(0x1f9)][_0x30c200(0x31d)];if(!_0x213e08)return;_0x213e08['visible']?(this['x']=this[_0x30c200(0x248)]+(_0x3f903c[_0x30c200(0x349)]||0x0),this['y']=this[_0x30c200(0x22c)]+(_0x3f903c['RepositionTopHelpY']||0x0)):(this['x']=this[_0x30c200(0x248)],this['y']=this['_homeY']);const _0x36ea06=SceneManager[_0x30c200(0x1f9)]['_windowLayer'];Window_OTB_TurnOrder[_0x30c200(0x263)]===undefined&&(Window_OTB_TurnOrder['_ogWindowLayerX']=Math[_0x30c200(0x241)]((Graphics['width']-Math['min'](Graphics[_0x30c200(0x346)],_0x36ea06[_0x30c200(0x266)]))/0x2));Window_OTB_TurnOrder[_0x30c200(0x1e8)]===undefined&&(Window_OTB_TurnOrder[_0x30c200(0x1e8)]=Math[_0x30c200(0x241)]((Graphics[_0x30c200(0x2d0)]-Math[_0x30c200(0x308)](Graphics['boxHeight'],_0x36ea06['height']))/0x2));;this['x']+=_0x36ea06['x']-Window_OTB_TurnOrder[_0x30c200(0x263)],this['y']+=_0x36ea06['y']-Window_OTB_TurnOrder['_ogWindowLayerY'];},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x2b9)]=function(){const _0x2bea15=_0x247375;this[_0x2bea15(0x225)]=$gameSystem['isBattleSystemOTBTurnOrderVisible']();if(BattleManager[_0x2bea15(0x2bc)]==='battleEnd'){if(!this[_0x2bea15(0x1e7)]){const _0x1abd92=Window_OTB_TurnOrder[_0x2bea15(0x1df)];this[_0x2bea15(0x1e7)]=Math[_0x2bea15(0x23f)](0xff/(_0x1abd92[_0x2bea15(0x388)]||0x1));}this['opacity']-=this[_0x2bea15(0x1e7)],this[_0x2bea15(0x310)]-=this[_0x2bea15(0x1e7)],this[_0x2bea15(0x3c3)][_0x2bea15(0x1c9)]-=this['_fadeSpeed'];}},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x2cf)]=function(){const _0x249fe3=_0x247375;if(!this[_0x249fe3(0x1cc)])return;const _0x34eba1=Window_OTB_TurnOrder[_0x249fe3(0x1df)],_0x409bfb=_0x34eba1['OrderDirection'];_0x409bfb?this[_0x249fe3(0x1cc)][_0x249fe3(0x39f)][_0x249fe3(0x383)]((_0x4cb69d,_0x48b04b)=>_0x4cb69d['x']-_0x48b04b['x']):this[_0x249fe3(0x1cc)][_0x249fe3(0x39f)][_0x249fe3(0x383)]((_0x542020,_0x4a2523)=>_0x4a2523['x']-_0x542020['x']);},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x1c0)]=function(_0x5b2dc2){const _0x88c19c=_0x247375;if(!_0x5b2dc2)return;_0x5b2dc2['_sourceArray']&&_0x5b2dc2[_0x88c19c(0x3b7)][_0x88c19c(0x369)](_0x5b2dc2);const _0x9cd92d=Window_OTB_TurnOrder[_0x88c19c(0x1df)],_0x140271=0x3e8/0x3c*_0x9cd92d['UpdateFrames']+0x1f4;_0x5b2dc2['startFade'](0x0),setTimeout(this[_0x88c19c(0x3ac)]['bind'](this,_0x5b2dc2),_0x140271);},Window_OTB_TurnOrder[_0x247375(0x23a)]['processSpriteRemoval']=function(_0x48f775){const _0x2e158a=_0x247375;_0x48f775[_0x2e158a(0x3b7)]&&_0x48f775[_0x2e158a(0x3b7)][_0x2e158a(0x369)](_0x48f775),this[_0x2e158a(0x1cc)]['removeChild'](_0x48f775),this[_0x2e158a(0x3a9)][_0x2e158a(0x36a)](_0x48f775);},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x3ae)]=function(){const _0x4643b0=_0x247375;if(!this['_subject'])return;this[_0x4643b0(0x1c0)](this[_0x4643b0(0x335)]);},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x205)]=function(){const _0x19c3f5=_0x247375;while(this[_0x19c3f5(0x345)][_0x19c3f5(0x33e)]){const _0x5d4ca1=this[_0x19c3f5(0x345)][_0x19c3f5(0x25a)]();_0x5d4ca1[_0x19c3f5(0x2f0)](0x0);}while(this[_0x19c3f5(0x2be)][_0x19c3f5(0x33e)]){const _0x56c44c=this[_0x19c3f5(0x2be)][_0x19c3f5(0x25a)]();if(!_0x56c44c)continue;this[_0x19c3f5(0x345)][_0x19c3f5(0x392)](_0x56c44c);}for(const _0x54a6eb of this[_0x19c3f5(0x345)]){if(!_0x54a6eb)continue;_0x54a6eb[_0x19c3f5(0x1e9)](this[_0x19c3f5(0x345)]);}},Window_OTB_TurnOrder['prototype'][_0x247375(0x2aa)]=function(_0x446170,_0x57dbeb){const _0x2fa9da=_0x247375,_0xf85902=_0x446170===BattleManager[_0x2fa9da(0x2ff)]?this['_currentTurn']:this[_0x2fa9da(0x2be)],_0x1722ef={};for(const _0x14459d of _0x446170){const _0x589d26=_0x2fa9da(0x277)[_0x2fa9da(0x1f2)](_0x14459d[_0x2fa9da(0x33a)]()?_0x2fa9da(0x363):_0x2fa9da(0x31c),_0x14459d[_0x2fa9da(0x38b)]());_0x1722ef[_0x589d26]=_0x1722ef[_0x589d26]||0x0;const _0x27695a=_0x1722ef[_0x589d26]++,_0x3723ba=new Sprite_OTB_TurnOrder_Battler(_0x14459d,_0x27695a,_0xf85902);this[_0x2fa9da(0x1cc)]['addChild'](_0x3723ba),_0xf85902[_0x2fa9da(0x392)](_0x3723ba);}for(const _0x151b20 of _0xf85902){if(!_0x151b20)continue;_0x151b20[_0x2fa9da(0x2f0)](0xff),_0x151b20['calculateTargetPositions'](),_0x57dbeb&&(_0x151b20['opacity']=0xff,_0x151b20['x']=_0x151b20[_0x2fa9da(0x1fe)],_0x151b20[_0x2fa9da(0x321)]=0x0);}},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x2fc)]=function(){const _0x1b5bc6=_0x247375,_0x294007=BattleManager[_0x1b5bc6(0x2d1)];this[_0x1b5bc6(0x2aa)](_0x294007);},Window_OTB_TurnOrder['prototype'][_0x247375(0x37a)]=function(_0x94e290,_0x24c90c){const _0x3f671f=_0x247375;this[_0x3f671f(0x3ae)]();for(const _0x42fc1a of this[_0x3f671f(0x345)]){if(!_0x42fc1a)continue;_0x42fc1a[_0x3f671f(0x296)]()===_0x94e290&&(_0x42fc1a['_instance']=_0x42fc1a[_0x3f671f(0x351)]||0x0,_0x42fc1a[_0x3f671f(0x351)]--);}const _0x52a697=this[_0x3f671f(0x345)]['findIndex'](_0x291044=>_0x291044['battler']()===_0x94e290);if(this['_currentTurn'][_0x52a697])this[_0x3f671f(0x335)]=this[_0x3f671f(0x345)][_0x52a697],this[_0x3f671f(0x345)][_0x52a697][_0x3f671f(0x357)](),this[_0x3f671f(0x345)]['splice'](_0x52a697,0x1);else{if(_0x94e290){const _0x104090=new Sprite_OTB_TurnOrder_Battler(_0x94e290,-0x1,null);this[_0x3f671f(0x1cc)]['addChild'](_0x104090),this[_0x3f671f(0x335)]=_0x104090,_0x104090[_0x3f671f(0x2f0)](0xff),_0x104090[_0x3f671f(0x321)]=0x258,_0x104090['x']=this['_subjectX'],_0x104090[_0x3f671f(0x1fe)]=this[_0x3f671f(0x22a)],_0x24c90c&&(_0x104090[_0x3f671f(0x1c9)]=0xff);}}for(const _0x39c68c of this[_0x3f671f(0x345)]){if(!_0x39c68c)continue;_0x39c68c['calculateTargetPositions']();}},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x1ff)]=function(){const _0x15bb09=_0x247375;for(const _0xa832bf of this[_0x15bb09(0x345)]){if(!_0xa832bf)continue;const _0x5680ad=_0xa832bf[_0x15bb09(0x296)]();if(BattleManager[_0x15bb09(0x2ff)]['includes'](_0x5680ad))continue;this['removeSprite'](_0xa832bf);}for(const _0x1db74e of this[_0x15bb09(0x2be)]){if(!_0x1db74e)continue;const _0x5394cd=_0x1db74e['battler']();if(BattleManager[_0x15bb09(0x2d1)][_0x15bb09(0x334)](_0x5394cd))continue;this[_0x15bb09(0x1c0)](_0x1db74e);}},Window_OTB_TurnOrder['prototype'][_0x247375(0x19d)]=function(_0xd0378a,_0x5e9775){const _0x27be3b=_0x247375,_0x25b1a2=_0x5e9775===BattleManager[_0x27be3b(0x2ff)]?this[_0x27be3b(0x345)]:this['_nextTurn'];if(!_0x25b1a2)return;const _0x9111d5=VisuMZ[_0x27be3b(0x2d9)][_0x27be3b(0x38a)](_0xd0378a,_0x5e9775),_0x2600e3=_0x9111d5['length']-0x1,_0x5d65c7=new Sprite_OTB_TurnOrder_Battler(_0xd0378a,_0x2600e3,_0x25b1a2);this[_0x27be3b(0x1cc)][_0x27be3b(0x30a)](_0x5d65c7),_0x25b1a2[_0x27be3b(0x392)](_0x5d65c7),_0x5d65c7[_0x27be3b(0x2f0)](0xff),this[_0x27be3b(0x19e)]();},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x302)]=function(_0x15e1f8,_0x11a251){const _0x4adaec=_0x247375,_0x4303be=_0x11a251===BattleManager[_0x4adaec(0x2ff)]?this[_0x4adaec(0x345)]:this[_0x4adaec(0x2be)];if(!_0x4303be)return;for(const _0x5e2adf of _0x4303be){if(!_0x5e2adf)continue;_0x5e2adf[_0x4adaec(0x296)]()===_0x15e1f8&&(_0x5e2adf['_instance']=_0x5e2adf['_instance']||0x0,_0x5e2adf[_0x4adaec(0x351)]++);}const _0x267f83=0x0,_0x22ef50=new Sprite_OTB_TurnOrder_Battler(_0x15e1f8,_0x267f83,_0x4303be);this[_0x4adaec(0x1cc)][_0x4adaec(0x30a)](_0x22ef50),_0x4303be[_0x4adaec(0x395)](_0x22ef50),_0x22ef50[_0x4adaec(0x2f0)](0xff),_0x22ef50['_positionDuration']=0x258,_0x22ef50['x']=this[_0x4adaec(0x22a)],this['requestUpdateTurnOrders']();},Window_OTB_TurnOrder['prototype'][_0x247375(0x306)]=function(_0x3c58e9,_0x1a77f5){const _0x1083dd=_0x247375,_0x8291a9=this[_0x1083dd(0x345)];if(!_0x8291a9)return;let _0x27fd41=0x0;for(let _0x20ef26=0x0;_0x20ef26<_0x1a77f5;_0x20ef26++){const _0x1d4de5=_0x8291a9[_0x20ef26];if(!_0x1d4de5)continue;if(_0x1d4de5[_0x1083dd(0x296)]()!==_0x3c58e9)continue;_0x27fd41=_0x1d4de5[_0x1083dd(0x351)]+0x1;}for(let _0x1920fb=_0x1a77f5;_0x1920fb<_0x8291a9[_0x1083dd(0x33e)];_0x1920fb++){const _0x399b96=_0x8291a9[_0x1920fb];if(!_0x399b96)continue;if(_0x399b96['battler']()!==_0x3c58e9)continue;_0x399b96[_0x1083dd(0x351)]=_0x399b96[_0x1083dd(0x351)]||0x0,_0x399b96['_instance']++;}const _0x28176a=new Sprite_OTB_TurnOrder_Battler(_0x3c58e9,_0x27fd41,_0x8291a9);this[_0x1083dd(0x1cc)][_0x1083dd(0x30a)](_0x28176a),_0x8291a9[_0x1083dd(0x1b9)](_0x1a77f5,0x0,_0x28176a),_0x28176a[_0x1083dd(0x2f0)](0xff),_0x28176a[_0x1083dd(0x321)]=0x258,_0x28176a['x']=this[_0x1083dd(0x22a)],this[_0x1083dd(0x19e)]();},Window_OTB_TurnOrder['prototype'][_0x247375(0x19b)]=function(){const _0xe8c59=_0x247375;this[_0xe8c59(0x2aa)](BattleManager[_0xe8c59(0x2ff)],!![]),this[_0xe8c59(0x2aa)](BattleManager['_otb_actionBattlersNext'],!![]),this['shiftTurnOrderForSubject'](BattleManager['_subject'],!![]),this[_0xe8c59(0x2cf)]();},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x221)]=function(_0x2bec66){const _0x292352=_0x247375;this[_0x292352(0x2c7)](),_0x2bec66&&_0x2bec66[_0x292352(0x332)]()!==null&&this[_0x292352(0x265)](_0x2bec66);},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x2c7)]=function(){const _0x23f55a=_0x247375;for(const _0x22a5a5 of this[_0x23f55a(0x3a9)][_0x23f55a(0x39f)]){if(!_0x22a5a5)continue;this['removeSprite'](_0x22a5a5);}},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x265)]=function(_0x17be48){const _0x45f1b7=_0x247375,_0x3685cc=_0x17be48[_0x45f1b7(0x1f7)](),_0x26c304=_0x17be48[_0x45f1b7(0x37f)](),_0x7cea9c=_0x17be48['otbCalcUserNextOrderChange']();_0x26c304!==0x0&&this[_0x45f1b7(0x355)](_0x3685cc,![],_0x26c304);_0x7cea9c!==0x0&&this[_0x45f1b7(0x355)](_0x3685cc,!![],_0x7cea9c);if(!_0x17be48[_0x45f1b7(0x38e)]())return;const _0x16a09a=SceneManager[_0x45f1b7(0x1f9)][_0x45f1b7(0x1a0)],_0x4a3caf=SceneManager['_scene'][_0x45f1b7(0x3b1)];let _0x35a678=null;if(_0x16a09a&&_0x16a09a[_0x45f1b7(0x30c)])_0x35a678=_0x16a09a[_0x45f1b7(0x363)](_0x16a09a['index']());else _0x4a3caf&&_0x4a3caf[_0x45f1b7(0x30c)]&&(_0x35a678=_0x4a3caf[_0x45f1b7(0x31c)]());if(!_0x35a678)return;const _0x1c8d94=_0x17be48['otbCalcTargetCurrentOrderChange'](_0x35a678),_0x17e701=_0x17be48['otbCalcTargetNextOrderChange'](_0x35a678);_0x1c8d94!==0x0&&this[_0x45f1b7(0x355)](_0x35a678,![],_0x1c8d94),_0x17e701!==0x0&&this[_0x45f1b7(0x355)](_0x35a678,!![],_0x17e701);},Window_OTB_TurnOrder[_0x247375(0x23a)][_0x247375(0x355)]=function(_0x3dfeba,_0x2cb142,_0x41b5fd){const _0x50f130=_0x247375;if(!_0x3dfeba)return;if(_0x41b5fd===0x0)return;const _0x14c978=_0x2cb142?BattleManager[_0x50f130(0x2d1)]:BattleManager['_actionBattlers'],_0x4febb1=VisuMZ[_0x50f130(0x2d9)][_0x50f130(0x38a)](_0x3dfeba,_0x14c978),_0x55864e=_0x2cb142?this[_0x50f130(0x2be)]:this[_0x50f130(0x345)],_0x2da96a=_0x2cb142?this[_0x50f130(0x1a5)]:this[_0x50f130(0x3ba)];if(_0x4febb1[_0x50f130(0x33e)]<=0x0)return;for(let _0x25bee7=0x0;_0x25bee7<_0x4febb1[_0x50f130(0x33e)];_0x25bee7++){const _0x5235c9=new Sprite_OTB_TurnOrder_Preview(_0x3dfeba,_0x25bee7,_0x55864e,_0x41b5fd);this[_0x50f130(0x3a9)][_0x50f130(0x30a)](_0x5235c9),_0x2da96a[_0x50f130(0x392)](_0x5235c9),_0x5235c9['calculateTargetPositions'](),_0x5235c9[_0x50f130(0x2f0)](0xff);}};var $otbAddBattlerToTurnEnd=function(_0x3a6eab,_0x20fbc3,_0x2e703b){const _0xcaee11=_0x247375;if(!SceneManager[_0xcaee11(0x190)]())return;if(!BattleManager[_0xcaee11(0x35a)]())return;if(!_0x3a6eab)return;if(!_0x3a6eab[_0xcaee11(0x1a2)]())return;if(!_0x3a6eab[_0xcaee11(0x2ec)]())return;_0x20fbc3=_0x20fbc3||0x1;if(_0x20fbc3<=0x0)return;if(!_0x2e703b)return;BattleManager[_0xcaee11(0x386)](_0x3a6eab,_0x20fbc3,_0x2e703b);},$otbAddBattlerToCurrentTurnEnd=function(_0x3001c1,_0x5835cf){const _0x1cee32=_0x247375,_0xe897e1=BattleManager['_actionBattlers'];BattleManager[_0x1cee32(0x386)](_0x3001c1,_0x5835cf,_0xe897e1);},$otbAddBattlerToNextTurnEnd=function(_0x10c1c5,_0x323ef8){const _0x168f46=_0x247375,_0x39d18b=BattleManager[_0x168f46(0x2d1)];BattleManager['otbAddBattlerToTurnOrderAtEnd'](_0x10c1c5,_0x323ef8,_0x39d18b);};function _0x32c3(){const _0x24a468=['note','TurnOrderOTBGraphicFaceIndex','BattleManager_setup','UiNextOffsetY','drawUiText','_stateIDs','finishActorInput','shift','bitmapHeight','_fadeDuration','drawBgImage','Scene_Battle_onSkillOk','isBattleSystemOTBTurnOrderVisible','otbShiftNextTurnSpritesToCurrentTurn','_otbTurnOrderVisible','map','_ogWindowLayerX','clamp','createOrderPreview','width','toUpperCase','RepositionLogWindow','call','battlerName','_hidden','onItemOk','initMembersOTB','exit','otbUnshiftBattlerToTurnOrders','updateStateTurns','_otbTurnOrderWindow','Game_Action_allowRandomSpeed','currentAction','createBackgroundSprite','ConvertAgiStateDownNext','removeActor','%1-%2','getStateIdWithName','SideviewBattleUI','RepositionTopForHelp','OrderDirection','recoverAll','UiNextText','initHomePositions','Window_Selectable_select','Scene_Battle_onActorCancel','ActorBattlerType','fontSize','Game_Battler_makeSpeed','addChildToBack','AllowRandomSpeed','createTurnOrderOTBGraphicFaceIndex','isEnemy','OTB_CONVERT_AGI_DEBUFF_CURRENT_TURN','56WIAQbX','_handlers','applyItemAddedActionOTB','randomInt','_graphicEnemy','left','trim','_backgroundSprite','setBlendColor','commandAttack','random','JSON','mainFontFace','battler','endTurn','getChildIndex','EFFECT_ADD_BUFF','DisplayOffsetY','iconWidth','padding','_isBattleOver','createChildren','EnemyBattlerIcon','clearMakeActionTimesCacheOTB','LogWindowOffsetY','isTurnBased','Game_BattlerBase_recoverAll','getUnitSideSide','bind','removeState','Scene_Battle_onItemOk','ARRAYSTR','_inputting','createTurnOrderSprites','Scene_Battle_onActorOk','Game_BattlerBase_appear','decideRandomTarget','_positionTargetY','ConvertAgiBuffCurrent','OtbTurnOrderActorIcon','lineHeight','ConvertAgiDebuffNext','createLetterSprite','UserFollOrder','commandGuard','faceWidth','drawText','UiCurrentOffsetY','updateVisibility','OTB_STUN_INFINITY_SPEED','_tempActor','_phase','defaultPosition','_nextTurn','onBattleEnd','dataId','traits','EnemyBattlerType','UiSubjectText','9032040gmCOPg','loadSvEnemy','ActionBattlersFilter','clearOrderPreview','Actor','registerCommand','_graphicFaceName','_speed','makeActions','OtbTurnOrderClearEnemyGraphic','OTB_CONVERT_AGI_DEBUFF_NEXT_TURN','sortContainer','height','_otb_actionBattlersNext','%1SystemBorder','updateSelectionEffect','_last_otb_actionPlusSetLength','cancel','filter','makeActionOrdersOTB','_graphicType','BattleSystemOTB','turnOrderChangeOTB','createInitialPositions','startActorInput','UiSubjectOffsetX','UiCurrentOffsetX','isPartyCommandWindowDisabled','UserAddActionCurrent','PreviewEnemy','ARRAYFUNC','Scene_Battle_onSkillCancel','_actorCommandWindow','ShowMarkerBg','_otbTimesActedThisTurn','canInput','BattleManager_processTurn','concat','changeSvActorGraphicBitmap','ConvertAgiDebuffCurrent','canMove','_fadeTarget','TurnOrderOTBGraphicIconIndex','677558Oduzgz','startFade','auto','otbRemoveUnableTurnOrderSprites','Game_Action_applyItemUserEffect','refresh','select','_isAppeared','anchor','updateTurnOrders','MoveDistance','OTB_STUN_INFINITY_CLAMP','_homeDuration','createNewTurnOrderSprites','OTB_CONVERT_AGI_STATE_UP_CURRENT_TURN','BgImageFilename','_actionBattlers','addChildAt','onTurnEndOTB','addBattlerToTurnOrderAtStart','scale','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','moveToPosition','addForceActionBattler','contents','min','setSkill','addChild','otbPreviewOrderChange','active','Visible','members','TRAIT_PARAM','contentsOpacity','otbCreateNewTurnOrderSprites','iconHeight','IconIndex','RegExp','gradient','_cache_makeActionTimesOTB','svactor','updatePosition','EVAL','UiAlignment','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','enemy','_helpWindow','hasSvBattler','create','isBattleItemWindowOTB','_positionDuration','commandFight','battlerHue','removeStatesAuto','Scene_Battle_createAllWindows','_bgImageSprite','5067710eugPJI','_unit','createTurnOrderOTBGraphicFaceName','STR','speed','isAppeared','BattleManager_finishActorInput','Mechanics','_preemptive','OTB','%1SystemBg','item','center','includes','_subject','preEndActionOTB','_forceAction','update','boxHeight','isActor','startActorCommandSelection','FaceName','name','length','createAllWindows','singleSkill','hide','isHorz','_targetHomeX','startInputOTB','_currentTurn','boxWidth','SubjectDistance','createTurnOrderOTBGraphicIconIndex','RepositionTopHelpX','otbGainInstant','applyItemTargetEffectOTB','bottom','containerPosition','StatusWindow','EFFECT_ADD_DEBUFF','TargetCurrOrder','_instance','windowRect','Enemies','battleMembers','createOrderPreviewSprite','Window_Help_setItem','calculateTargetPositions','postEndActionOTB','effects','isOTB','TargetAddActionNext','refreshTurnOrder','_statusWindow','RandomizeActionTimesOrder','Game_Battler_performCollapse','resetFontSettings','PreviewOffsetX','OTB_CONVERT_AGI_STATE_UP_NEXT_TURN','actor','ScreenBuffer','DisplayPosition','isBattleMember','reduce','selectNextActorOTB','remove','removeChild','_otbTurnOrderFaceName','parse','setHue','onBattleStart','isTpb','contentsBack','bitmapWidth','addState','updateGraphic','otbAddActions','deathStateId','createOTBTurnOrderWindow','BattleManager_startInput','selectNextCommand','_otbTurnOrderGraphicType','shiftTurnOrderForSubject','otbCalcTargetCurrentOrderChange','svActorVertCells','TurnOrderOTBGraphicType','_graphicSv','otbCalcUserCurrentOrderChange','Scene_Battle_commandGuard','ActionBattlersNextFilter','forceAction','sort','initBattleSystemOTB','VisuMZ_3_SideviewBattleUI','otbAddBattlerToTurnOrderAtEnd','return\x200','UpdateFrames','Game_Party_removeActor','GetAllIndicies','index','loadEnemy','Game_Battler_forceAction','needsSelection','createGraphicSprite','getBattleSystem','Instant','push','otbApplyActionTimes','SystemTurnOrderVisibility','unshift','OTB_ADDED_RANDOMIZE_ADDED_ACTION_ORDER','OTB_CONVERT_AGI_STATE_DN_CURRENT_TURN','Scene_Battle_actorCommandSingleSkill','OTB_CONVERT_AGI_STATE_DN_NEXT_TURN','STRUCT','FaceIndex','_lastTargetIndex','updateOpacity','_graphicHue','children','attack','Scene_Battle_createActorCommandWindow','SpriteThin','faceHeight','createSpriteContainers','drawDimmedArea','onBattleStartOTB','applyBattleItemWindowOTB','code','_previewContainer','OtbTurnOrderEnemyIcon','EnemyBattlerFontSize','processSpriteRemoval','getNextSubject','removeCurrentSubject','isNextOtbSubject','OTB_CONVERT_AGI_BUFF_CURRENT_TURN','_enemyWindow','_tempBattler','otbAddForceActionBattler','getStateTooltipBattler','EnemyBattlerFaceName','_surprise','_sourceArray','makeActionOrders','BattleManager_isActiveTpb','_previewCurrent','BattleManager_getNextSubject','_nextX','otbPreviewOrderClear','otbRemoveCurrentSubject','Actors','BorderThickness','fillRect','startInput','_contentsBackSprite','BattleManager_forceAction','TargetFollOrder','createTurnOrderOTBGraphicType','ARRAYJSON','processUpdateGraphic','isUsingSideviewUiLayout','Game_Actor_selectNextCommand','otbShiftTurnOrderForSubject','_otbTurnOrderFaceIndex','makeActionTimesOTB','_partyCommandWindow','PreviewActor','Scene_Battle_commandFight','performCollapse','onItemCancel','containerWindow','isSceneBattle','removeActionBattlersOTB','otbReturnBattlerToTurnOrders','Game_BattlerBase_hide','BgDimStyle','BgImageOffsetY','_graphicIconIndex','4782354kaIZsw','Scene_Battle_onEnemyOk','otbAddBattlerToTurnOrderAtStart','OtbTurnOrderActorFace','resumeTurnOrderSprites','Game_Party_addActor','addBattlerToTurnOrderAtEnd','requestUpdateTurnOrders','forceActionOTB','_actorWindow','Game_System_initialize','isAlive','onActorCancel','value','_previewNext','makeNextActionOrdersOTB','performActionEndOTB','ARRAYNUM','adjustForPreview','applyItemUserEffect','updateLetter','Scene_Battle_commandAttack','Game_Battler_onBattleStart','BattleManager_battleSys','loadFace','bitmap','BattleManager_selectNextActor','blt','getColor','Game_Battler_makeActionTimes','11576565jmgAyw','_requestTurnOrderUpdate','PreviewScale','makeActionTimes','splice','getInfinityClamp','icon','loadSvActor','UiCurrentText','_currentX','_isAlive','removeSprite','isActiveTpb','onBattleEndOTB','UserCurrOrder','setup','processTurnOTB','gradientFillRect','onSkillOk','ConvertAgiStateUpNext','opacity','#000000','initialize','_spriteContainer','otbProcessActionCheck','BattleManager_isTurnBased','OtbTurnOrderClearActorGraphic','ConvertParams','repositionLogWindowOTB','battleEnd','constructor','%1BgColor1','setOTBGraphicIconIndex','addActor','%1BorderColor','inputtingAction','updateGraphicHue','_letterSprite','setItem','selectNextActor','addLoadListener','max','Settings','isStateAffected','OTB_CONVERT_AGI_BUFF_NEXT_TURN','_letter','changeFaceGraphicBitmap','EFFECT_ADD_STATE','changeIconGraphicBitmap','_graphicSprite','_fadeSpeed','_ogWindowLayerY','changeSourceArray','checkOpacity','_plural','onActorOk','createBorderSprite','description','faceIndex','clearRect','_offset','format','%1BgColor2','Conversion','initMembers','SpriteLength','subject','face','_scene','processTurn','loadSystem','onTurnEnd','InitialSpeedJS','_positionTargetX','removeUnableTurnOrderSprites','UserAddActionNext','Scene_Battle_commandCancel','getBorderThickness','ConvertAgiStateUpCurrent','TurnOrderOTBGraphicFaceName','shiftNextTurnSpritesToCurrentTurn','match','EnemyBattlerFaceIndex','parameters','canChangeOtbTurnOrder','ConvertAgiStateDownCurrent','VisuMZ_2_PartySystem','setTarget','image','Game_Action_speed','Scene_Battle_onEnemyCancel','otbCalcTargetNextOrderChange','NUM','otbCalcUserNextOrderChange','_actions','Scene_Battle_onItemCancel','clearTurnOrderOTBGraphics','appear','onEnemyOk','96KXCZtp','calculateTargetIndex','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','InfinityClamp','onSkillCancel','svBattlerName','allowRandomSpeed','stepForward','_index','previewOrderByAction','right','isPreviousSceneBattleTransitionable','_currentActor','visible','allBattleMembers','_otbTurnOrderIconIndex','numActions','BgImageOffsetX','_subjectX','VisuMZ_0_CoreEngine','_homeY','additionalTargetXAdjustments','makeSpeed','1792828RTmxuq','floor','IconSet','setBattleSystemOTBTurnOrderVisible','commandCancelOTB','applyGlobal','applyGlobalBattleSystemOTB','ConvertSpeedJS','currentExt','endAction','_otb_createdFirstTurnOrders','prototype','changeEnemyGraphicBitmap','UserNextOrder','_graphicFaceIndex','battleSys','ceil','Enemy','round','actionPlusSet','clear','version','Game_Battler_addState','actorCommandSingleSkill','_logWindow','_homeX','OTB_ADDED_ACTION_TIMES','top','makeOTBSpeed','createActorCommandWindow','_forcedBattlers','isInfinitySpeedOTB','1DtIHNR','183548TXuRdE','Game_Battler_onBattleEnd','_spriteGroupWidth'];_0x32c3=function(){return _0x24a468;};return _0x32c3();}