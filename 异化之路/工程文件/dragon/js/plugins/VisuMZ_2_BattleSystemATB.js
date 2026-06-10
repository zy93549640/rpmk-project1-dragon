//=============================================================================
// VisuStella MZ - Battle System ATB - Active Turn Battle
// VisuMZ_2_BattleSystemATB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemATB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemATB = VisuMZ.BattleSystemATB || {};
VisuMZ.BattleSystemATB.version = 1.31;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.31] [BattleSystemATB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_ATB_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The RPG Maker MZ Time Progress Battle (TPB) system is only a few steps away
 * from the acclaimed Active Turn Battle (ATB) system. This plugin will grant
 * it the various features needed to turn it from TPB into ATB.
 * 
 * This plugin will grant control over how the various mechanics work, ranging
 * from penalties to calculations, to actions that can manipulate the ATB gauge
 * of battlers. Battlers that are in the middle of casting a spell can also be
 * interrupted with specific notetag traits.
 * 
 * ATB Gauges can also be displayed on enemies and/or allies, giving the player
 * full access to the current battle state. The ATB Gauges are also improved,
 * showing different colors for different states and showing a new gauge for
 * the casting state.
 * 
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Full control over the TPB/ATB mechanics such as speed, calculations, etc.
 * * Notetags that give skills and items access to ATB Gauge manipulation, by
 *   altering how filled they are.
 * * Interrupts can be used on battlers in the middle of casting a skill.
 * * Visual ATB Gauges can be displayed over battlers' heads.
 * * ATB Gauges have extra coloring options added to them to let the player
 *   quickly know the current speed state of the ATB Gauge.
 * * A field-wide ATB Gauge that positions actor and enemy markers on it to
 *   show how far along actors and enemies are relative to each other's turns.
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
 * - VisuMZ_1_BattleCore
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
 * *NOTE* You will need to set the game project to run in either TPB mode,
 * Time Progress (Active) or Time Progress (Wait), for these new ATB effects
 * to work. You can find this setting in Database > System 1.
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
 * ATB Gauges
 * 
 * The gauges are now revamped to show different colors to depict the various
 * ATB states a battler can be in. These various states include the following:
 * 
 * - When a battler's speed is fully stopped.
 * - When a battler's speed is slower/faster past a specific rating.
 * - When a battler is ready for an action.
 * - When a battler is casting an action (those with negative speed values).
 * 
 * The colors used for these states can be found and altered in the Plugin
 * Parameters under Gauge Color Settings.
 *
 * ---
 * 
 * Skill & Item Speeds
 * 
 * With TPB, skills and items with negative speed values will cause the battler
 * to enter a "casting" state, meaning they have to wait extra time before the
 * action takes off. With this delayed action execution, one might assume that
 * if there is a positive speed value, the battler would require less time for
 * their next turn.
 * 
 * However, this isn't the case with RPG Maker MZ's TPB. By changing it to ATB,
 * skills and items with positive speed values will have an impact on how full
 * their ATB Gauges will be in the following turn. A value of 2000 will put the
 * gauge at 50% full, 1000 will put the gauge at 25% full, 500 will put it at
 * 12.5% full, and so on. Notetags can also be used to influence this.
 * 
 * ---
 * 
 * JS Calculation Mechanics
 * 
 * While the calculation mechanics aren't changed from their original RPG Maker
 * MZ formulas, the functions for them have been overwritten to allow you, the
 * game developer, to alter them as you see fit.
 * 
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - ATB Interrupts can have animations played when they trigger if the
 * VisuStella Core Engine is installed.
 *
 * ---
 * 
 * VisuMZ_1_OptionsCore
 * 
 * - Having the VisuStella Options Core available will allow you to adjust the
 * speed at which the ATB gauges fill up.
 * 
 * - The VisuStella Options Core also gives the player the option to toggle
 * between Active and Wait-based ATB.
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
 * === General ATB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 *
 * ---
 * 
 * <ATB Help>
 *  description
 *  description
 * </ATB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under TPB/ATB.
 * - This is primarily used if the skill behaves differently in TPB/ATB versus
 *   any other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to TPB/ATB.
 * 
 * ---
 *
 * <Hide ATB Gauge>
 *
 * - Used for: Enemy Notetags
 * - If you don't want an enemy to show their ATB Gauge, use this notetag.
 * 
 * ---
 * 
 * === ATB Field Gauge-Related Notetags ===
 * 
 * These notetags only work if the ATB Field Gauge is enabled.
 * 
 * ---
 *
 * <ATB Field Gauge Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <ATB Field Gauge Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the marker graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <ATB Field Gauge Face: Monster, 1>
 * 
 * ---
 * 
 * === ATB Gauge Manipulation-Related Notetags ===
 * 
 * These notetags are used for ATB Gauge manipulation purposes.
 * 
 * ---
 *
 * <ATB After Gauge: x%>
 *
 * - Used for: Skill, Item Notetags
 * - After using the skill/item, the user's ATB Gauge will be set to x%.
 * - Replace 'x' with a percentile value representing the amount you want the
 *   ATB Gauge to reset to after the skill/item's usage.
 * 
 * ---
 * 
 * <ATB Charge Gauge: x%>
 * <ATB Charge Gauge: +x%>
 * <ATB Charge Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a charging state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a charging state.
 * 
 * ---
 * 
 * <ATB Cast Gauge: x%>
 * <ATB Cast Gauge: +x%>
 * <ATB Cast Gauge: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is in a casting state, change the target's gauge amount to
 *   x% or by x% (if using the +/- variants).
 * - Replace 'x' with a percentile value representing the amount of the ATB
 *   Gauge you wish to alter it to/by.
 * - This only affects targets who are in a casting state.
 * 
 * ---
 *
 * <ATB Interrupt>
 *
 * - Used for: Skill, Item Notetags
 * - If this skill/item hits a target who is in a casting state, interrupt that
 *   action to cancel it and reset the target's ATB Gauge to 0%.
 * 
 * ---
 *
 * <ATB Cannot Be Interrupted>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill/item immune to ATB Interruptions.
 * 
 * ---
 * 
 * <ATB Battle Start Gauge: +x%>
 * <ATB Battle Start Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
 * - Determine how much extra or less ATB Gauge the battler will start with if
 *   associated with one of these database objects.
 * - Replace 'x' with a percentile value determining how much extra or less ATB
 *   Gauge value the battler will start battle with.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * <ATB After Gauge: +x%>
 * <ATB After Gauge: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Determine how much influence there is on the ATB Gauge after finishing a
 *   skill/item. Increase or decrease the amount after each action.
 * - Replace 'x' with a percentile value determining how much influence there
 *   is on the ATB Gauge after the skill/item has finished performing.
 * - These values are additive when stacked.
 *
 * ---
 * 
 * === JavaScript Notetags: ATB Gauge Manipulation ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * give more control over conditional ATB Gauge Manipulation.
 * 
 * ---
 * 
 * <JS ATB Charge Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Charge Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a charging state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a charging state.
 * 
 * ---
 * 
 * <JS ATB Cast Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB Cast Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to if the target is in a casting state.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to the target's current ATB Gauge rate
 *   if the target is in a casting state.
 * 
 * ---
 * 
 * <JS ATB After Gauge>
 *  code
 *  code
 *  rate = code;
 * </JS ATB After Gauge>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   ATB Gauge to after performing this skill/item action.
 * - The 'rate' variable represents rate value the ATB Gauge will change to
 *   between the values of 0 and 1.
 * - The 'rate' variable will default to 0.
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
 * Actor: Change Field Gauge Icon
 * - Changes the icons used for the specific actor(s) on the ATB Field Gauge.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 * 
 * Actor: Change Field Gauge Face
 * - Changes the faces used for the specific actor(s) on the ATB Field Gauge.
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
 * Actor: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the actor(s).
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
 * Enemy: Change Field Gauge Icon
 * - Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change Field Gauge Face
 * - Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * Enemy: Clear Field Gauge Graphic
 * - Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * System: ATB Field Gauge Visibility
 * - Determine the visibility of the ATB Field Gauge.
 * 
 *   Visibility:
 *   - Changes the visibility of the ATB Field Gauge.
 * 
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings used for Battle System ATB. The majority of these are
 * JavaScript-based and will require knowledge of JavaScript to fully utilize
 * the plugin parameters.
 *
 * ---
 *
 * Mechanics
 * 
 *   Escape Fail Penalty:
 *   - Gauge penalty if an escape attempt fails.
 * 
 *   Stuns Reset Gauge?:
 *   - Should stuns reset the ATB Gauge?
 * 
 *   JS: Initial Gauge:
 *   - JavaScript code to determine how much ATB gauge to give each battler at
 *     the start of battle.
 * 
 *   JS: Speed:
 *   - JavaScript code to determine how much speed a battler has.
 * 
 *   JS: Base Speed:
 *   - JavaScript code to determine how much base speed a battler has.
 * 
 *   JS: Relative Speed:
 *   - JavaScript code to determine what is the relative speed of a battler.
 * 
 *   JS: Acceleration:
 *   - JavaScript code to determine how much gauges accelerate by relative to
 *     reference time.
 * 
 *   JS: Cast Time:
 *   - JavaScript code to determine how much cast time is used for skills/items
 *     with negative speed modifiers.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Interrupt Settings
 * ============================================================================
 *
 * Interrupt settings used for Battle System ATB.
 *
 * ---
 *
 * Interrupt
 * 
 *   Animation ID:
 *   - Play this animation when a unit is interrupted.
 *   - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mirror Animation:
 *     - Mirror the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *     Mute Animation:
 *     - Mute the interrupt animation?
 *     - Requires VisuMZ_0_CoreEngine.
 * 
 *   Text Popup:
 *   - Text used for popup when interrupts happen.
 *   - Leave empty for no popup.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *     Flash Color:
 *     - Adjust the popup's flash color.
 *     - Format: [red, green, blue, alpha]
 * 
 *     Flash Duration:
 *     - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Gauge Settings
 * ============================================================================
 *
 * General gauge settings used for ATB Gauges.
 *
 * ---
 *
 * General
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the ATB Gauge sprite's anchor X/Y to be?
 *   - Use values between 0 and 1 to be safe.
 * 
 *   Scale:
 *   - How large/small do you want the ATB Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the ATB Gauge's X/Y by?
 *
 * ---
 *
 * AGI Gauge Rates
 * 
 *   Slow Rate:
 *   - How much should the AGI rate be at to be considered slow?
 * 
 *   Fast Rate:
 *   - How much should the AGI rate be at to be considered fast?
 *
 * ---
 *
 * Actors
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Show Status Gauges:
 *   - Show ATB Gauges in the status window?
 *   - Applies only to sideview.
 *
 * ---
 *
 * Enemies
 * 
 *   Show Sprite Gauges:
 *   - Show ATB Gauges over the enemy sprites' heads?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Field Gauge Settings
 * ============================================================================
 * 
 * The ATB Field Gauge is a large gauge placed on the screen with all of the
 * current battle's active participants shown on it. The participants are
 * represented by a marker. Each marker's position on the gauge indicates its
 * battler's ATB progress towards a turn.
 * 
 * In order for this feature to work, enable "Use Field Gauge?" in the
 * Plugin Parameters.
 *
 * ---
 *
 * General
 * 
 *   Use Field Gauge?:
 *   - This value must be set to true in order for the ATB Field Gauge
 *     to appear.
 *   - This needs to be on in order for this feature to work.
 * 
 *   Display Position:
 *   - Select where the Field Gauge will appear on the screen.
 *   - Top
 *   - Bottom
 *   - Left
 *   - Right
 * 
 *   Offset X:
 *   Offset Y:
 *   - How much to offset the X/Y coordinates by.
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the gauge when the
 *     help window is open?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Field Gauge.
 *   - Settings may vary depending on position.
 *   - Left to Right
 *   - Right to Left
 *   - Up to Down
 *   - Down to Up
 *
 * ---
 *
 * Field Gauge Settings
 * 
 *   Gauge Skin:
 *   - Optional. Select an image to place behind the gauge.
 *   - This will be centered on the Field Gauge's position.
 * 
 *   Show Gauge?:
 *   - Decide if you want the gauge to be shown.
 * 
 *   Horizontal Length:
 *   - The length of the Field Gauge if placed horizontally.
 * 
 *   Vertical Length:
 *   - The length of the Field Gauge if placed vertically.
 * 
 *   Thickness:
 *   - The thickness of the Field Gauge for either direction.
 * 
 *   Split Location:
 *   - Determine where the gauge should split.
 *   - Use 0.00 for the start. Use 1.00 for the end.
 *
 * ---
 *
 * Marker Sprites
 * 
 *   Actor Marker Side:
 *   - Which side do you want the actor markers to appear?
 * 
 *   Enemy Marker Side:
 *   - Which side do you want the enemy markers to appear?
 * 
 *   Marker Offset:
 *   - How many pixels do you want to offset the markers by?
 * 
 *   Marker Size:
 *   - How pixels wide and tall do you want the markers to be?
 * 
 *   Marker Speed:
 *   - How many pixels maximum can a marker travel in one frame?
 * 
 *   Opacity Rate:
 *   - If a marker has to change opacity, how fast should it change by?
 *
 * ---
 *
 * Marker Border
 * 
 *   Show Border?:
 *   - Show borders for the marker sprites?
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
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Sprites
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
 * Marker Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the marker sprite?
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
 * Marker Background
 * 
 *   Show Background?:
 *   - Show the background on the marker sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
 *
 * ---
 *
 * Marker Arrow
 * 
 *   Show Arrow?:
 *   - Show the arrow sprite pointing towards the Field Gauge?
 * 
 *   Arrow Skin:
 *   - Pick a window skin to draw arrows from.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Color Settings
 * ============================================================================
 *
 * Gauge color settings used for ATB Gauges.
 *
 * ---
 *
 * Colors
 * 
 *   Default Color 1:
 *   Default Color 2:
 *   Full Color 1:
 *   Full Color 2:
 *   Cast Color 1:
 *   Cast Color 2:
 *   Fast Color 1:
 *   Fast Color 2:
 *   Slow Color 1:
 *   Slow Color 2:
 *   Stop Color 1:
 *   Stop Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Settings
 * ============================================================================
 *
 * Options settings used for Battle System ATB.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show ATB Gauges' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
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
 * Version 1.31: April 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where sideview battlers would have misplaced ATB gauge
 *    positions. Fix made by Olivia.
 * 
 * Version 1.30: August 17, 2023
 * * Bug Fixes!
 * ** Fixed an error that would cause multi-actions under restrictions to
 *    desynchronize skill speeds and result in softlocks. Fix made by Olivia.
 * ** Fixed an error that would cause slow speeds to all equal one another.
 *    Fix made by Olivia.
 * 
 * Version 1.29: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an error with casting times for battlers not working properly when
 *    the numeric values are too small. Fix made by Olivia.
 * 
 * Version 1.28: June 15, 2023
 * * Bug Fixes!
 * ** Crash should no longer occur for the end of ATB actions. Fix made
 *    by Olivia.
 * 
 * Version 1.27: May 18, 2023
 * * Bug Fixes!
 * ** Enemies no longer soft-lock themselves if they get stunned via a counter
 *    attack with an attack-state that applies stun. Fix made by Olivia.
 * 
 * Version 1.26: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused a clash when loaded together with certain
 *    combinations of plugins. Fix made by Olivia.
 * 
 * Version 1.25: February 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented initial ATB Gauge settings and features from
 *    working properly. Fix made by Irina.
 * 
 * Version 1.24: December 15, 2022
 * * Bug Fixes!
 * ** The Battle Core's <JS Pre-Start Turn> and <JS Post-Start Turn> notetags
 *    were previously disabled by this plugin. They should now be working again
 *    without problems. Fix made by Olivia.
 * 
 * Version 1.23: November 10, 2022
 * * Bug Fixes!
 * ** ATB Gauges will now display for ANIMATED sideview enemies depending on
 *    the Show Enemy Gauge setting. Fix made by Olivia.
 * 
 * Version 1.22: September 29, 2022
 * * Bug Fixes!
 * ** After enemies recover from a stun, enemies no longer take an immediate
 *    action regardless of their time gauge state. Fix made by Olivia.
 * 
 * Version 1.21: August 25, 2022
 * * Bug Fixes!
 * ** Restricted enemies will no longer be action-locked after removing the
 *    restriction state. Fix made by Olivia.
 * 
 * Version 1.20: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the ATB Field Gauge faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.19: July 21, 2022
 * * Bug Fixes!
 * ** Battlers under a "Cannot Move" state will no longer reset their ATB gauge
 *    after their "turn" comes up to update it. Fix made by Olivia.
 * 
 * Version 1.18: June 2, 2022
 * * Bug Fixes!
 * ** Notetag effect for <ATB After Gauge: x%> should now be working properly.
 *    Fix made by Olivia.
 * ** Notetag effect for <JS ATB After Gauge> should now be working properly.
 *    Fix made by Olivia.
 * 
 * Version 1.17: February 17, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.16: August 13, 2021
 * * Bug Fixes!
 * ** Crash prevented with certain Plugin Parameter combinations enabled when
 *    the ATB Gauge is filled up. Fix made by Irina.
 * 
 * Version 1.15: July 23, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly for SV Enemies, too. Fix made by Irina.
 * 
 * Version 1.14: July 16, 2021
 * * Bug Fixes!
 * ** When enemies appear out from a troop event, Visual ATB Gauges above their
 *    heads should now appear properly. Fix made by Olivia.
 * 
 * Version 1.13: May 21, 2021
 * * Bug Fixes!
 * ** When slip damage is allowed to kill, dying actors will have their TPB
 *    state reset to charging in order to prevent lock-ups. Fix by Olivia.
 * 
 * Version 1.12: May 7, 2021
 * * Feature Update!
 * ** Actions with 0 or positive speed will now act immediately without
 *    allowing a single gauge tick pass through. Update made by Olivia.
 * 
 * Version 1.11: April 16, 2021
 * * Bug Fixes!
 * ** ATB Gauge visibility is now properly updated across various events such
 *    as party removal and other obstruction effects. Fix made by Olivia.
 * 
 * Version 1.10: March 12, 2021
 * * Hot Fix!
 * ** Fixed calculation errors due to field gauge. Fix made by Olivia.
 * * Feature Update!
 * ** Slight change to the way calculations are made for the bottom aligned
 *    field gauge position. Update made by Olivia.
 * 
 * Version 1.09: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.08: November 22, 2020
 * * Feature Update!
 * ** ATB Interrupts will not clear all actions (including queued ones) for
 *    mechanical compatibility. Change made by Yanfly.
 * 
 * Version 1.07: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.06: November 1, 2020
 * * Documentation Update!
 * ** Help file updated with new features.
 * * New Features!
 * ** New Plugin Command by Irina!
 * *** Actor: Change Field Gauge Face
 * **** Changes the faces used for the specific actor(s) on the ATB
 *      Field Gauge.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin should now be compatible with older saves when changing to a save
 *    that didn't use a Field Gauge to one that does. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated with new features.
 * * Feature Update!
 * ** <ATB Field Gauge Face: filename, index> notetag now works with actors.
 *    Update made by Irina.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Documentation Update
 * ** Help file updated with new features.
 * * Feature Update!
 * ** Enemy letters are no longer drawn on the Field Gauge unless there are
 *    multiple enemies of the same type. Added by Arisu.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and Yanfly.
 * *** Plugin Parameters > Field Gauge > Offset X and Y
 * **** How much to offset the X/Y coordinates of the Field Gauge by.
 * 
 * Version 1.02: October 4, 2020
 * * New Features!
 * ** New Plugin Command added "System: ATB Field Gauge Visibility" to let you
 *    show or hide the Field Gauge during battle. Added by Arisu.
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** ATB Cast and Charge notetags no longer cause crashes. Fix made by Olivia.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > Mechanics > Stuns Reset Gauge?
 * **** Should stuns reset the ATB Gauge?
 *
 * Version 1.00: September 21, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeActorIcon
 * @text Actor: Change Field Gauge Icon
 * @desc Changes the icons used for the specific actor(s) on the ATB Field Gauge.
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
 * @command FieldGaugeActorFace
 * @text Actor: Change Field Gauge Face
 * @desc Changes the faces used for the specific actor(s) on the ATB Field Gauge.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command FieldGaugeClearActorGraphic
 * @text Actor: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the actor(s).
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
 * @command FieldGaugeEnemyIcon
 * @text Enemy: Change Field Gauge Icon
 * @desc Changes the icons used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeEnemyFace
 * @text Enemy: Change Field Gauge Face
 * @desc Changes the faces used for the specific enemy(ies) on the ATB Field Gauge.
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
 * @command FieldGaugeClearEnemyGraphic
 * @text Enemy: Clear Field Gauge Graphic
 * @desc Clears the ATB Field Gauge graphics for the enemy(ies).
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
 * @command SystemFieldGaugeVisibility
 * @text System: ATB Field Gauge Visibility
 * @desc Determine the visibility of the ATB Field Gauge.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the ATB Field Gauge.
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
 * @param BattleSystemATB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings used for Battle System ATB.
 * @default {"General":"","EscapeFailPenalty:num":"-1.00","StunsResetGauge:eval":"false","JavaScript":"","InitialGaugeJS:str":"Math.random() * 0.5","TpbSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\n\\n// Process Calculation\\nlet speed = Math.sqrt(user.agi) + 1;\\n\\n// Return Value\\nreturn speed;\"","TpbBaseSpeedCalcJS:func":"\"// Declare Constants\\nconst user = this;\\nconst baseAgility = user.paramBasePlus(6);\\n\\n// Process Calculation\\nlet speed = Math.sqrt(baseAgility) + 1;\\n\\n// Return Value\\nreturn speed;\"","BattlerRelativeSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbSpeed()\\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\\n\\n// Process Calculation\\nlet relativeSpeed = speed / partyBaseSpeed;\\n\\n// Return Value\\nreturn relativeSpeed;\"","TpbAccelerationJS:func":"\"// Declare Constants\\nconst user = this;\\nconst speed = user.tpbRelativeSpeed();\\nconst referenceTime = $gameParty.tpbReferenceTime();\\n\\n// Process Calculation\\nlet acceleration = speed / referenceTime;\\n\\n// Return Value\\nreturn acceleration;\"","TpbCastTimeJS:func":"\"// Declare Constants\\nconst user = this;\\nconst actions = user._actions.filter(action => action.isValid());\\nconst items = actions.map(action => action.item());\\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\\n\\n// Process Calculation\\nlet time = Math.sqrt(delay) / user.tpbSpeed();\\n\\n// Return Value\\nreturn time;\""}
 *
 * @param Interrupt:struct
 * @text Interrupt Settings
 * @type struct<Interrupt>
 * @desc Interrupt settings used for Battle System ATB.
 * @default {"Interrupt":"","InterruptAnimationID:num":"11","InterruptMirror:eval":"false","InterruptMute:eval":"false","InterruptText:str":"INTERRUPTED!","InterruptTextColor:str":"0","InterruptFlashColor:eval":"[255, 0, 0, 160]","InterruptFlashDuration:num":"60"}
 *
 * @param Gauge:struct
 * @text General Gauge Settings
 * @type struct<Gauge>
 * @desc General gauge settings used for ATB Gauges.
 * @default {"General":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"2","AGIGaugeRates":"","SlowRate:num":"0.60","FastRate:num":"1.40","Actors":"","ShowActorGauge:eval":"true","ShowStatusGauge:eval":"false","Enemies":"","ShowEnemyGauge:eval":"true"}
 *
 * @param FieldGauge:struct
 * @text Field Gauge Settings
 * @type struct<FieldGauge>
 * @desc Make a field-wide ATB gauge for all the battlers.
 * @default {"General":"","UseFieldGauge:eval":"false","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","RepositionTopForHelp:eval":"true","GaugeDirection:eval":"true","Gauge":"","GaugeSystemSkin:str":"","DrawGauge:eval":"true","GaugeLengthHorz:num":"600","GaugeLengthVert:num":"400","GaugeThick:num":"16","GaugeSplit:num":"0.70","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"48","Markers":"","ActorSide:eval":"true","EnemySide:eval":"false","MarkerOffset:num":"28","MarkerSize:num":"32","MarkerSpeed:num":"36","OpacityRate:num":"4","BorderThickness:num":"2","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"1","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"10","EnemyBgColor2:str":"18","EnemySystemBg:str":"","Arrow":"","ShowMarkerArrow:eval":"true","MarkerArrowWindowSkin:str":"Window"}
 *
 * @param Color:struct
 * @text Gauge Color Settings
 * @type struct<Color>
 * @desc Gauge color settings used for ATB Gauges.
 * @default {"default1:str":"26","default2:str":"27","full1:str":"14","full2:str":"6","cast1:str":"2","cast2:str":"10","fast1:str":"27","fast2:str":"18","slow1:str":"22","slow2:str":"23","stop1:str":"7","stop2:str":"8"}
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings used for Battle System ATB.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show ATB Gauges"}
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
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param General
 * 
 * @param EscapeFailPenalty:num
 * @text Escape Fail Penalty
 * @parent General
 * @desc Gauge penalty if an escape attempt fails.
 * @default -1.00
 *
 * @param StunsResetGauge:eval
 * @text Stuns Reset Gauge?
 * @parent General
 * @type boolean
 * @on Reset Gauge
 * @off Don't Reset
 * @desc Should stuns reset the ATB Gauge?
 * @default false
 *
 * @param JavaScript
 *
 * @param InitialGaugeJS:str
 * @text JS: Initial Gauge
 * @parent JavaScript
 * @desc JavaScript code to determine how much ATB gauge to give
 * each battler at the start of battle.
 * @default Math.random() * 0.5
 *
 * @param TpbSpeedCalcJS:func
 * @text JS: Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much speed a battler has.
 * @default "// Declare Constants\nconst user = this;\n\n// Process Calculation\nlet speed = Math.sqrt(user.agi) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param TpbBaseSpeedCalcJS:func
 * @text JS: Base Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much base speed a battler has.
 * @default "// Declare Constants\nconst user = this;\nconst baseAgility = user.paramBasePlus(6);\n\n// Process Calculation\nlet speed = Math.sqrt(baseAgility) + 1;\n\n// Return Value\nreturn speed;"
 * 
 * @param BattlerRelativeSpeedJS:func
 * @text JS: Relative Speed
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine what is the relative speed of a battler.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbSpeed()\nconst partyBaseSpeed = $gameParty.tpbBaseSpeed();\n\n// Process Calculation\nlet relativeSpeed = speed / partyBaseSpeed;\n\n// Return Value\nreturn relativeSpeed;"
 * 
 * @param TpbAccelerationJS:func
 * @text JS: Acceleration
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much gauges accelerate by relative to reference time.
 * @default "// Declare Constants\nconst user = this;\nconst speed = user.tpbRelativeSpeed();\nconst referenceTime = $gameParty.tpbReferenceTime();\n\n// Process Calculation\nlet acceleration = speed / referenceTime;\n\n// Return Value\nreturn acceleration;"
 * 
 * @param TpbCastTimeJS:func
 * @text JS: Cast Time
 * @parent JavaScript
 * @type note
 * @desc JavaScript code to determine how much cast time is used for skills/items with negative speed modifiers.
 * @default "// Declare Constants\nconst user = this;\nconst actions = user._actions.filter(action => action.isValid());\nconst items = actions.map(action => action.item());\nconst delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);\n\n// Process Calculation\nlet time = Math.sqrt(delay) / user.tpbSpeed();\n\n// Return Value\nreturn time;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Interrupt Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Interrupt:
 *
 * @param Interrupt
 *
 * @param InterruptAnimationID:num
 * @text Animation ID
 * @parent Interrupt
 * @type animation
 * @desc Play this animation when a unit is interrupted.
 * Requires VisuMZ_0_CoreEngine.
 * @default 11
 *
 * @param InterruptMirror:eval
 * @text Mirror Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptMute:eval
 * @text Mute Animation
 * @parent InterruptAnimationID:num
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the interrupt animation?
 * Requires VisuMZ_0_CoreEngine.
 * @default false
 *
 * @param InterruptText:str
 * @text Text Popup
 * @parent Interrupt
 * @desc Text used for popup when interrupts happen.
 * Leave empty for no popup.
 * @default INTERRUPTED!
 *
 * @param InterruptTextColor:str
 * @text Text Color
 * @parent InterruptText:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param InterruptFlashColor:eval
 * @text Flash Color
 * @parent InterruptText:str
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @param InterruptFlashDuration:num
 * @text Flash Duration
 * @parent InterruptText:str
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor X to be?
 * Use values between 0 and 1 to be safe.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent General
 * @desc Where do you want the ATB Gauge sprite's anchor Y to be?
 * Use values between 0 and 1 to be safe.
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent General
 * @desc How large/small do you want the ATB Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent General
 * @desc How many pixels to offset the ATB Gauge's Y by?
 * @default 2
 *
 * @param AGIGaugeRates
 * @text AGI Gauge Rates
 *
 * @param SlowRate:num
 * @text Slow Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered slow?
 * @default 0.60
 *
 * @param FastRate:num
 * @text Fast Rate
 * @parent AGIGaugeRates
 * @desc How much should the AGI rate be at to be considered fast?
 * @default 1.40
 *
 * @param Actors
 *
 * @param ShowActorGauge:eval
 * @text Show Sprite Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowStatusGauge:eval
 * @text Show Status Gauges
 * @parent Actors
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges in the status window?
 * Applies only to sideview.
 * @default false
 *
 * @param Enemies
 *
 * @param ShowEnemyGauge:eval
 * @text Show Sprite Gauges
 * @parent Enemies
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show ATB Gauges over the enemy sprites' heads?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param default1:str
 * @text Default Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param default2:str
 * @text Default Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param full1:str
 * @text Full Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param full2:str
 * @text Full Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param cast1:str
 * @text Cast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param cast2:str
 * @text Cast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 10
 *
 * @param fast1:str
 * @text Fast Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param fast2:str
 * @text Fast Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param slow1:str
 * @text Slow Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param slow2:str
 * @text Slow Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param stop1:str
 * @text Stop Color 1
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param stop2:str
 * @text Stop Color 2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 8
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show ATB Gauges' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show ATB Gauges
 *
 */
/* ----------------------------------------------------------------------------
 * Field Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~FieldGauge:
 *
 * @param General
 *
 * @param UseFieldGauge:eval
 * @text Use Field Gauge?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc This value must be set to true in order for the ATB Field Gauge to appear.
 * @default false
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Field Gauge will appear on the screen.
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
 * gauge when the help window is open?
 * @default true
 *
 * @param GaugeDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Up to Down
 * @off Right to Left / Down to Up
 * @desc Decide on the direction of the Field Gauge.
 * Settings may vary depending on position.
 * @default true
 *
 * @param Gauge
 * @text Field Gauge Settings
 *
 * @param GaugeSystemSkin:str
 * @text Gauge Skin
 * @parent Gauge
 * @type file
 * @dir img/system/
 * @desc Optional. Select an image to place behind the gauge.
 * This will be centered on the Field Gauge's position.
 * @default 
 *
 * @param DrawGauge:eval
 * @text Show Gauge?
 * @parent Gauge
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Decide if you want the gauge to be shown.
 * @default true
 *
 * @param GaugeLengthHorz:num
 * @text Horizontal Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed horizontally.
 * @default 600
 *
 * @param GaugeLengthVert:num
 * @text Vertical Length
 * @parent Gauge
 * @type number
 * @min 10
 * @desc The length of the Field Gauge if placed vertically.
 * @default 400
 *
 * @param GaugeThick:num
 * @text Thickness
 * @parent Gauge
 * @type number
 * @min 3
 * @desc The thickness of the Field Gauge for either direction.
 * @default 16
 *
 * @param GaugeSplit:num
 * @text Split Location
 * @parent Gauge
 * @desc Determine where the gauge should split.
 * Use 0.00 for the start. Use 1.00 for the end.
 * @default 0.70
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the gauge's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the gauge's Y coordinates by this much when
 * the Help Window is visible.
 * @default 48
 *
 * @param Markers
 * @text Marker Sprites
 *
 * @param ActorSide:eval
 * @text Actor Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the actor markers to appear?
 * @default true
 *
 * @param EnemySide:eval
 * @text Enemy Marker Side
 * @parent Markers
 * @type boolean
 * @on Top / Right
 * @off Bottom / Left
 * @desc Which side do you want the enemy markers to appear?
 * @default false
 *
 * @param MarkerOffset:num
 * @text Marker Offset
 * @parent Markers
 * @desc How many pixels do you want to offset the markers by?
 * @default 28
 *
 * @param MarkerSize:num
 * @text Marker Size
 * @parent Markers
 * @type number
 * @min 10
 * @desc How pixels wide and tall do you want the markers to be?
 * @default 32
 *
 * @param MarkerSpeed:num
 * @text Marker Speed
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels maximum can a marker travel in one frame?
 * @default 36
 *
 * @param OpacityRate:num
 * @text Opacity Rate
 * @parent Markers
 * @type number
 * @min 1
 * @desc If a marker has to change opacity, how fast should it change by?
 * @default 4
 *
 * @param Border
 * @text Marker Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the marker sprites?
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
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
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
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Marker Sprites
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
 * @text Marker Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the marker sprite?
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
 * @text Marker Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the marker sprite?
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
 * @default 1
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
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
 * @default 10
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 * @param Arrow
 * @text Marker Arrow
 *
 * @param ShowMarkerArrow:eval
 * @text Show Arrow?
 * @parent Arrow
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the arrow sprite pointing towards the Field Gauge?
 * @default true
 *
 * @param MarkerArrowWindowSkin:str
 * @text Arrow Skin
 * @parent Arrow
 * @type file
 * @dir img/system/
 * @desc Pick a window skin to draw arrows from.
 * @default Window
 *
 */
//=============================================================================

const _0x3ee134=_0x567d;function _0x567d(_0x44bdbc,_0x4fde77){const _0x51a25d=_0x51a2();return _0x567d=function(_0x567de3,_0x501927){_0x567de3=_0x567de3-0xe1;let _0x648e37=_0x51a25d[_0x567de3];return _0x648e37;},_0x567d(_0x44bdbc,_0x4fde77);}(function(_0x482d3e,_0x25128b){const _0x568fb1=_0x567d,_0xcd49a4=_0x482d3e();while(!![]){try{const _0x306e9a=-parseInt(_0x568fb1(0x2af))/0x1*(parseInt(_0x568fb1(0x275))/0x2)+parseInt(_0x568fb1(0x19a))/0x3*(parseInt(_0x568fb1(0xf1))/0x4)+parseInt(_0x568fb1(0x130))/0x5+parseInt(_0x568fb1(0x291))/0x6+parseInt(_0x568fb1(0x1a6))/0x7*(-parseInt(_0x568fb1(0x242))/0x8)+parseInt(_0x568fb1(0x16e))/0x9+parseInt(_0x568fb1(0x184))/0xa*(-parseInt(_0x568fb1(0x250))/0xb);if(_0x306e9a===_0x25128b)break;else _0xcd49a4['push'](_0xcd49a4['shift']());}catch(_0x16b590){_0xcd49a4['push'](_0xcd49a4['shift']());}}}(_0x51a2,0xf29cf));var label=_0x3ee134(0x2d4),tier=tier||0x0,dependencies=[_0x3ee134(0x269)],pluginData=$plugins[_0x3ee134(0x2c2)](function(_0x1bf5b8){const _0x52da67=_0x3ee134;return _0x1bf5b8[_0x52da67(0x247)]&&_0x1bf5b8['description'][_0x52da67(0x299)]('['+label+']');})[0x0];function _0x51a2(){const _0x18d7f7=['MwPXL','atbCurrentValue','updatePositionOffset','canMakeTpbActionsAtStartTpbTurn','onAtbInterrupt','FieldGauge','appear','RegExp','_homeX','ARRAYSTRUCT','setFrame','updateGraphic','_atbGaugeSprite','InterruptText','TpbCastTimeJS','_tpbTurnCount','CQbBH','isHidden','LFWod','YCQiD','mainSprite','visualAtbGauge','updateVisibility','svactor','AnchorY','isSceneBattle','FZgKo','_tpbTurnEnd','pfsfG','15584112xSEvZu','length','map','Game_Battler_clearTpbChargeTime','bDDIG','_atbFieldGaugeVisible','_horz','top','InterruptFlashDuration','createGaugeSprite','isAttack','addGeneralOptions','XFTlk','isActiveTpb','LHrpr','Game_Battler_tpbAcceleration','onRestrict','setup','(?:ATB|TPB)','registerCommand','_battler','Scene_Battle_createAllWindows','12115280zSNLRf','TpbSpeedCalcJS','FaceIndex','(?:GAUGE|TIME|SPEED)','startEffect','isEnemy','showVisualAtbGauge','Game_Battler_applyTpbPenalty','isAtbChargingState','getStateTooltipBattler','Color','_graphicType','svActorHorzCells','Enemies','fontFace','NhGcq','qmrTl','createKeyJS','traitObjects','tpbBaseSpeed','makeTpbActions','DisplayPosition','193365yZpCut','revive','ParseItemNotetags','ShowMarkerBorder','FieldGaugeActorFace','temPR','Options','RepositionTopHelpX','createGraphicSprite','AnchorX','Actor-%1-%2','SdUZj','34783guWhYq','tpbAcceleration','_scene','_svBattlerSprite','Sprite_Gauge_gaugeColor1','fieldAtbGraphicFaceName','_fnord','DrawGauge','battleUIOffsetX','updateSelectionEffect','_graphicFaceIndex','Game_Battler_initTpbChargeTime','createAtbGaugeSprite','#%1','gaugeBackColor','_graphicHue','changeEnemyGraphicBitmap','_tpbIdleTime','ParseSkillNotetags','IOhWi','floor','XidFP','prototype','Sprite_Gauge_gaugeColor2','changeIconGraphicBitmap','isDead','Scene_Boot_onDatabaseLoaded','%1BorderColor','createBattlerSprites','FqnbX','max','canMove','default%1','currentAction','toUpperCase','Settings','Enemy-%1-%2','RepositionTopForHelp','Parse_Notetags_CreateJS','SlowRate','YbndI','subject','Sprite_Gauge_currentValue','yhgNM','addCommand','IMIAT','setAtbGraphicIconIndex','drawGaugeBitmap','slow','tpbRequiredCastTime','GaugeDirection','updatePositionOnGauge','ConvertParams','Game_BattlerBase_appear','startTpbTurn','bitmap','Sprite_Actor_createStateSprite','stop%1','Window_Help_setItem','YkIBo','time','name','gaugeColor1','iQxFO','Game_Battler_onRestrict','fieldAtbGraphicType','TAXts','After','scale','_letter','State-%1-%2','EjAqP','Interrupt','_battlerContainer','%1SystemBorder','Window_SideviewUiBattleStatus','battleUIOffsetY','createFieldGaugeSkin','addChild','initTpbChargeTime','EnemyBattlerFaceName','fshGl','VisibleGauge','_backgroundSprite','ARRAYEVAL','Game_Battler_removeState','ARRAYFUNC','GaugeThick','updateAtbGaugeSpritePosition','_index','XYZkt','_graphicSprite','_statusWindow','full','isATB','initMembers','ready','charging','left','currentMaxValue','slow%1','textColor','call','updateAtbGaugeSpriteVisibility','applyData','atbStopped','OmQdT','loadSystem','isTpb','fast%1','updateTpb','Game_Actor_clearActions','endBattlerActions','createBackgroundSprite','isCTB','pbvgr','Enemy','isActor','EnemyBattlerIcon','EnemyBattlerDrawLetter','YBZIB','Class-%1-%2','EnemyBattlerType','process_VisuMZ_BattleSystemATB_CreateRegExp','abs','battlerHue','xwhkw','clamp','isGaugeHorizontal','oClRe','concat','isAtbCastingState','targetOpacity','Scene_Options_maxCommands','clearFieldAtbGraphics','setupArrowSprite','_windowskin','%1SystemBg','_fieldAtbGaugeFaceIndex','ShowEnemyGauge','RVFfJ','djsdi','loadEnemy','bottom','startTpbCasting','tpbSpeed','atbColor','parameters','lineHeight','ApeQZ','members','STRUCT','processUpdateGraphic','BattleManager_endBattlerActions','cgQes','SObda','2392WjvEHW','setBattler','EnemyBattlerFontSize','loadFace','SFglw','status','hasSvBattler','VisuMZ_2_AggroControlSystem','format','UOqJR','actor','item','epJGo','Sprite_Gauge_currentMaxValue','11JQhxbY','maxCommands','createBattlerSprite','checkAggroControlSystemOffsetYAdjustment','battlerName','_letterSprite','Game_Unit_updateTpb','ePokc','Gauge','setAtbChargeTime','svActorVertCells','processBattleCoreJS','xOCxI','createFieldGaugeSpriteATB','atbInterrupt','_atbColors','maxBattleMembers','disappear','MarkerOffset','boxWidth','_statusType','applyGlobalBattleSystemATBEffects','IBJog','PreStartTurnJS','tpbRelativeSpeed','VisuMZ_1_BattleCore','boxHeight','AddOption','Window_StatusBase_placeGauge','Actors','ColorManager_loadWindowskin','_originalSpeed','Skill-%1-%2','getAtbCastTimeRate','applyTpbPenalty','full%1','_fieldAtbGaugeGraphicType','2625586Yzaaly','atbActive','setActionState','createFieldGaugeContainerATB','_homeY','IconIndex','setItem','applyATBPenalty','loadSvActor','InterruptAnimationID','changeAtbChargeTime','gaugeColor2','_fieldGaugeATB','cast2','sOvoK','_needsAtbClear','Aggro','Game_Battler_tpbRelativeSpeed','_unit','casting','_plural','createBorderSprite','ShowStatusGauge','create','Game_Action_applyGlobal','JSON','vpEHW','setText','7254666ATmjmN','%1Side','cast%1','GaugeSplit','NUM','_fieldGaugeATB_Container','createLetterSprite','Window_Options_addGeneralOptions','includes','fgdXP','note','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','createStateSprite','wRaJR','ShowMarkerBg','tpbChargeTime','addLoadListener','jeOgS','ctGaugeColor1','isSideView','atbSpeed','RepositionTopHelpY','BorderThickness','update','llvvf','WyBcT','exit','ActorBattlerType','xkVXb','fieldAtbGraphicIconIndex','1DqKmAU','gradientFillRect','currentValue','%1BgColor1','etDUR','brmGf','updateGraphicHue','createFieldAtbGraphicFaceName','_tpbCastTime','atbAcceleration','getColor','tVPxO','NRStJ','initTpbChargeTimeATB','drawText','WjfAk','_fieldAtbGaugeFaceName','FaceName','rNxoV','filter','Sprite_Enemy_startEffect','battler','GaugeLengthVert','_graphicIconIndex','setupBattleSystemATBColors','Game_Battler_tpbBaseSpeed','isAppeared','requestFauxAnimation','DisplayOffsetY','speed','isTpbCharged','<JS\x20%2\x20%1\x20%3>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/JS\x20%2\x20%1\x20%3>','GUpPv','MarkerSize','FieldGaugeClearActorGraphic','FieldGaugeClearEnemyGraphic','Game_Battler_startTpbCasting','BattleSystemATB','ShZwU','atbCurrentMaxValue','SdLbe','_actions','LZgDj','Sprite_Battler_updateMain','_graphicEnemy','kCdRH','zqAup','Scale','icon','fontSize','ConfigManager_makeData','match','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','kVeKd','sort','createArrowSprite','Item-%1-%2','visible','setBlendColor','_graphicFaceName','setHomeLocation','initBattleSystemATB','_tpbState','GTuIc','updateOpacity','die','createGaugeBitmap','numActions','updateBattleContainerOrder','clearTpbChargeTime','createFieldAtbGraphicType','atbGaugeColor','setupTextPopup','placeGauge','svBattlerName','setAtbAfterSpeed','_skinSprite','Game_BattlerBase_die','alXcA','TpbBaseSpeedCalcJS','ctGaugeColor2','MAaVf','version','children','_atbAfterSpeed','VisuMZ_2_BattleSystemCTB','clear','removeState','isShowAtbGauge','_tpbChargeTime','_fieldAtbGaugeIconIndex','RxIty','loadSvEnemy','UWYSG','QJdRC','createFieldAtbGraphicIconIndex','faceHeight','_arrowSprite','UseFieldGauge','addBattleSystemATBShowGaugeCommand','createEnemySprites','OffsetY','right','hvbjM','yeoUy','isStateAffected','cast1','opacity','height','msbyI','compareBattlerSprites','Game_Action_applyItemUserEffect','min','undecided','ParseAllNotetags','OffsetX','createFieldAtbGraphicFaceIndex','_graphicSv','IconSet','round','HGnRk','_windowLayer','40SIPQut','Charge','face','InterruptTextColor','fieldAtbGraphicFaceIndex','trim','changeAtbCastTime','Cast','gaugeHeight','changeSvActorGraphicBitmap','reduce','makeData','bind','updateLetter','constructor','createStateIconSprite','InterruptFlashColor','Game_System_initialize','createChildren','tAGAu','acting','SystemFieldGaugeVisibility','Armor-%1-%2','skills','anchor','blt','stop','width','Weapon-%1-%2','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','etyFd','AggroControlSystem','ueNLV','setAtbCastTime','paramRate','EnemyBattlerFontFace','applyItemUserEffect','nVGAd','clearRect','Visible','allBattleMembers','Sprite_Battler_setBattler','aggroGauge','ActorBattlerIcon','zKtsP','setupAtbGaugeSprite','paramBuffRate','gZGsn','isRestricted','isBattleSystemATBFieldGaugeVisible','WSywt','applyItemBattleSystemATBUserEffect','TpbAccelerationJS','loadWindowskin','OpacityRate','eQAMa','addChildAt','PostStartTurnJS','ceil','parse','Game_Battler_tpbSpeed','initialize','Actor','7092830eoDXGG','Sprite_Battler_update','faceName','bUIAt','process_VisuMZ_BattleSystemATB_JS_Notetags','zbrwS','Mechanics','iconHeight','enemy','createBattlerContainer','faceWidth','mainFontFace','_onRestrictBypassAtbReset','iconWidth','attackSpeed','EnemyBattlerFaceIndex','setBattleSystemATBFieldGaugeVisible','Wwudm','updatePosition','UtwjV','applyGlobal','changeFaceGraphicBitmap','createActorSprites','updateMain','_gaugeSprite','Sprite_Enemy_createStateIconSprite','_forcing','clearActions','bnsRc','applyBattleSystemATBUserEffect','AdjustRect','fillRect','kSTce'];_0x51a2=function(){return _0x18d7f7;};return _0x51a2();}VisuMZ[label][_0x3ee134(0x1c9)]=VisuMZ[label][_0x3ee134(0x1c9)]||{},VisuMZ['ConvertParams']=function(_0x4b2f5a,_0x3972bb){const _0x2af3ed=_0x3ee134;for(const _0x281ad3 in _0x3972bb){if(_0x281ad3[_0x2af3ed(0x2e2)](/(.*):(.*)/i)){if(_0x2af3ed(0x25c)!==_0x2af3ed(0x123)){const _0x42f37b=String(RegExp['$1']),_0x269590=String(RegExp['$2'])[_0x2af3ed(0x1c8)]()[_0x2af3ed(0xf6)]();let _0x24e144,_0x14de9a,_0x1b72ac;switch(_0x269590){case _0x2af3ed(0x295):_0x24e144=_0x3972bb[_0x281ad3]!==''?Number(_0x3972bb[_0x281ad3]):0x0;break;case'ARRAYNUM':_0x14de9a=_0x3972bb[_0x281ad3]!==''?JSON[_0x2af3ed(0x12c)](_0x3972bb[_0x281ad3]):[],_0x24e144=_0x14de9a[_0x2af3ed(0x170)](_0x3eeb04=>Number(_0x3eeb04));break;case'EVAL':_0x24e144=_0x3972bb[_0x281ad3]!==''?eval(_0x3972bb[_0x281ad3]):null;break;case _0x2af3ed(0x1fa):_0x14de9a=_0x3972bb[_0x281ad3]!==''?JSON[_0x2af3ed(0x12c)](_0x3972bb[_0x281ad3]):[],_0x24e144=_0x14de9a['map'](_0x24bd71=>eval(_0x24bd71));break;case _0x2af3ed(0x28e):_0x24e144=_0x3972bb[_0x281ad3]!==''?JSON[_0x2af3ed(0x12c)](_0x3972bb[_0x281ad3]):'';break;case'ARRAYJSON':_0x14de9a=_0x3972bb[_0x281ad3]!==''?JSON[_0x2af3ed(0x12c)](_0x3972bb[_0x281ad3]):[],_0x24e144=_0x14de9a[_0x2af3ed(0x170)](_0x5cd4aa=>JSON['parse'](_0x5cd4aa));break;case'FUNC':_0x24e144=_0x3972bb[_0x281ad3]!==''?new Function(JSON[_0x2af3ed(0x12c)](_0x3972bb[_0x281ad3])):new Function('return\x200');break;case _0x2af3ed(0x1fc):_0x14de9a=_0x3972bb[_0x281ad3]!==''?JSON['parse'](_0x3972bb[_0x281ad3]):[],_0x24e144=_0x14de9a[_0x2af3ed(0x170)](_0x4d5bff=>new Function(JSON[_0x2af3ed(0x12c)](_0x4d5bff)));break;case'STR':_0x24e144=_0x3972bb[_0x281ad3]!==''?String(_0x3972bb[_0x281ad3]):'';break;case'ARRAYSTR':_0x14de9a=_0x3972bb[_0x281ad3]!==''?JSON[_0x2af3ed(0x12c)](_0x3972bb[_0x281ad3]):[],_0x24e144=_0x14de9a['map'](_0x1a9a1b=>String(_0x1a9a1b));break;case _0x2af3ed(0x23d):_0x1b72ac=_0x3972bb[_0x281ad3]!==''?JSON[_0x2af3ed(0x12c)](_0x3972bb[_0x281ad3]):{},_0x24e144=VisuMZ[_0x2af3ed(0x1da)]({},_0x1b72ac);break;case _0x2af3ed(0x15a):_0x14de9a=_0x3972bb[_0x281ad3]!==''?JSON[_0x2af3ed(0x12c)](_0x3972bb[_0x281ad3]):[],_0x24e144=_0x14de9a[_0x2af3ed(0x170)](_0x1d9820=>VisuMZ[_0x2af3ed(0x1da)]({},JSON['parse'](_0x1d9820)));break;default:continue;}_0x4b2f5a[_0x42f37b]=_0x24e144;}else return this[_0x2af3ed(0x20b)](_0x229c7e(_0x1c7ca7));}}return _0x4b2f5a;},(_0x4ca69a=>{const _0x4a4f98=_0x3ee134,_0x353a45=_0x4ca69a[_0x4a4f98(0x1e3)];for(const _0x4121ae of dependencies){if(_0x4a4f98(0x194)===_0x4a4f98(0x194)){if(!Imported[_0x4121ae]){alert(_0x4a4f98(0x10e)[_0x4a4f98(0x24a)](_0x353a45,_0x4121ae)),SceneManager[_0x4a4f98(0x2ab)]();break;}}else this[_0x4a4f98(0x148)]=new _0x2d364a(),this[_0x4a4f98(0x1f4)](this[_0x4a4f98(0x148)]),this['createGaugeBitmap']();}const _0x433393=_0x4ca69a['description'];if(_0x433393[_0x4a4f98(0x2e2)](/\[Version[ ](.*?)\]/i)){const _0x4b6a8a=Number(RegExp['$1']);_0x4b6a8a!==VisuMZ[label][_0x4a4f98(0x301)]&&(alert(_0x4a4f98(0x29c)['format'](_0x353a45,_0x4b6a8a)),SceneManager[_0x4a4f98(0x2ab)]());}if(_0x433393[_0x4a4f98(0x2e2)](/\[Tier[ ](\d+)\]/i)){const _0x48a576=Number(RegExp['$1']);_0x48a576<tier?(alert(_0x4a4f98(0x2e3)[_0x4a4f98(0x24a)](_0x353a45,_0x48a576,tier)),SceneManager[_0x4a4f98(0x2ab)]()):tier=Math[_0x4a4f98(0x1c4)](_0x48a576,tier);}VisuMZ[_0x4a4f98(0x1da)](VisuMZ[label][_0x4a4f98(0x1c9)],_0x4ca69a[_0x4a4f98(0x239)]);})(pluginData),PluginManager[_0x3ee134(0x181)](pluginData[_0x3ee134(0x1e3)],'FieldGaugeActorIcon',_0x345573=>{const _0xc24430=_0x3ee134;VisuMZ[_0xc24430(0x1da)](_0x345573,_0x345573);const _0x185da6=_0x345573[_0xc24430(0x26d)],_0x563c5d=_0x345573[_0xc24430(0x27a)];for(const _0x37c541 of _0x185da6){if(_0xc24430(0x2aa)!==_0xc24430(0x2aa))_0x2bc75a[_0xc24430(0x2d4)][_0xc24430(0x131)]['call'](this),!this[_0xc24430(0x182)]&&this[_0xc24430(0x15d)]&&(this[_0xc24430(0x15d)][_0xc24430(0x2e8)]=![],this['_svBattlerSprite']&&(this[_0xc24430(0x1a9)]['_atbGaugeSprite'][_0xc24430(0x2e8)]=![]));else{const _0x3bfa0b=$gameActors[_0xc24430(0x24c)](_0x37c541);if(!_0x3bfa0b)continue;_0x3bfa0b[_0xc24430(0x274)]=_0xc24430(0x2df),_0x3bfa0b[_0xc24430(0x309)]=_0x563c5d;}}}),PluginManager[_0x3ee134(0x181)](pluginData[_0x3ee134(0x1e3)],_0x3ee134(0x19e),_0x1078da=>{const _0x2632d0=_0x3ee134;VisuMZ[_0x2632d0(0x1da)](_0x1078da,_0x1078da);const _0x1c222e=_0x1078da[_0x2632d0(0x26d)],_0xbe254a=_0x1078da['FaceName'],_0x4bf3bd=_0x1078da[_0x2632d0(0x186)];for(const _0x5c699a of _0x1c222e){const _0x3609b4=$gameActors[_0x2632d0(0x24c)](_0x5c699a);if(!_0x3609b4)continue;_0x3609b4[_0x2632d0(0x274)]=_0x2632d0(0xf3),_0x3609b4[_0x2632d0(0x2bf)]=_0xbe254a,_0x3609b4[_0x2632d0(0x230)]=_0x4bf3bd;}}),PluginManager[_0x3ee134(0x181)](pluginData[_0x3ee134(0x1e3)],_0x3ee134(0x2d1),_0x4fe620=>{const _0x37bc1f=_0x3ee134;VisuMZ['ConvertParams'](_0x4fe620,_0x4fe620);const _0x42b232=_0x4fe620['Actors'];for(const _0x14143f of _0x42b232){const _0x39687c=$gameActors[_0x37bc1f(0x24c)](_0x14143f);if(!_0x39687c)continue;_0x39687c[_0x37bc1f(0x22c)]();}}),PluginManager[_0x3ee134(0x181)](pluginData[_0x3ee134(0x1e3)],'FieldGaugeEnemyIcon',_0x5afdf3=>{const _0x4ca39d=_0x3ee134;VisuMZ['ConvertParams'](_0x5afdf3,_0x5afdf3);const _0x4f5ffc=_0x5afdf3[_0x4ca39d(0x191)],_0x21ad57=_0x5afdf3[_0x4ca39d(0x27a)];for(const _0x2005eb of _0x4f5ffc){const _0x1fb601=$gameTroop[_0x4ca39d(0x23c)]()[_0x2005eb];if(!_0x1fb601)continue;_0x1fb601['_fieldAtbGaugeGraphicType']='icon',_0x1fb601[_0x4ca39d(0x309)]=_0x21ad57;}}),PluginManager[_0x3ee134(0x181)](pluginData[_0x3ee134(0x1e3)],'FieldGaugeEnemyFace',_0x3a8952=>{const _0x1bcf9b=_0x3ee134;VisuMZ[_0x1bcf9b(0x1da)](_0x3a8952,_0x3a8952);const _0x5f1358=_0x3a8952['Enemies'],_0x4ea157=_0x3a8952[_0x1bcf9b(0x2c0)],_0x21039e=_0x3a8952['FaceIndex'];for(const _0xd4e88c of _0x5f1358){if('KGHos'!==_0x1bcf9b(0xef)){const _0x16edaf=$gameTroop[_0x1bcf9b(0x23c)]()[_0xd4e88c];if(!_0x16edaf)continue;_0x16edaf[_0x1bcf9b(0x274)]='face',_0x16edaf[_0x1bcf9b(0x2bf)]=_0x4ea157,_0x16edaf['_fieldAtbGaugeFaceIndex']=_0x21039e;}else{if(_0x382eb1['VisuMZ_2_BattleSystemCTB']&&this[_0x1bcf9b(0x218)]())return![];return this['isTpb']();}}}),PluginManager[_0x3ee134(0x181)](pluginData['name'],_0x3ee134(0x2d2),_0x45ca40=>{const _0x50c28f=_0x3ee134;VisuMZ['ConvertParams'](_0x45ca40,_0x45ca40);const _0x4fb779=_0x45ca40[_0x50c28f(0x191)];for(const _0x534541 of _0x4fb779){const _0x1caa07=$gameTroop[_0x50c28f(0x23c)]()[_0x534541];if(!_0x1caa07)continue;_0x1caa07[_0x50c28f(0x22c)]();}}),PluginManager['registerCommand'](pluginData[_0x3ee134(0x1e3)],_0x3ee134(0x106),_0x5482b7=>{const _0x1c1e2e=_0x3ee134;VisuMZ[_0x1c1e2e(0x1da)](_0x5482b7,_0x5482b7);const _0x394fb5=_0x5482b7[_0x1c1e2e(0x118)];$gameSystem[_0x1c1e2e(0x140)](_0x394fb5);}),VisuMZ['BattleSystemATB'][_0x3ee134(0x1c0)]=Scene_Boot[_0x3ee134(0x1bc)]['onDatabaseLoaded'],Scene_Boot[_0x3ee134(0x1bc)]['onDatabaseLoaded']=function(){const _0x17923d=_0x3ee134;this['process_VisuMZ_BattleSystemATB_CreateRegExp'](),VisuMZ[_0x17923d(0x2d4)][_0x17923d(0x1c0)]['call'](this),this[_0x17923d(0x134)]();},VisuMZ[_0x3ee134(0x2d4)]['RegExp']={},Scene_Boot[_0x3ee134(0x1bc)][_0x3ee134(0x221)]=function(){const _0x543f9f=_0x3ee134,_0x57e5a3=VisuMZ['BattleCore'][_0x543f9f(0x158)],_0x5dd29f=_0x543f9f(0x2ce),_0x4bb97a=[_0x543f9f(0xf2),'Cast','After'];for(const _0x65ed3 of _0x4bb97a){const _0x5c9596=_0x5dd29f[_0x543f9f(0x24a)](_0x65ed3[_0x543f9f(0x1c8)]()[_0x543f9f(0xf6)](),_0x543f9f(0x180),_0x543f9f(0x187)),_0x2932e4=new RegExp(_0x5c9596,'i');VisuMZ[_0x543f9f(0x2d4)][_0x543f9f(0x158)][_0x65ed3]=_0x2932e4;}},Scene_Boot[_0x3ee134(0x1bc)][_0x3ee134(0x134)]=function(){const _0x29fc8b=_0x3ee134;if(VisuMZ[_0x29fc8b(0xe9)])return;const _0x4680d5=$dataSkills[_0x29fc8b(0x228)]($dataItems);for(const _0x122e1d of _0x4680d5){if('rzOHc'!==_0x29fc8b(0x317)){if(!_0x122e1d)continue;VisuMZ[_0x29fc8b(0x2d4)][_0x29fc8b(0x1cc)](_0x122e1d);}else{if(this['isEnemy']()){if(!this[_0x29fc8b(0x2cd)]())return![];}}}},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x1b8)]=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x3ee134(0x1b8)]=function(_0xfc7f4a){const _0x3fac0b=_0x3ee134;VisuMZ['BattleSystemATB']['ParseSkillNotetags']['call'](this,_0xfc7f4a),VisuMZ[_0x3fac0b(0x2d4)][_0x3fac0b(0x1cc)](_0xfc7f4a);},VisuMZ['BattleSystemATB'][_0x3ee134(0x19c)]=VisuMZ[_0x3ee134(0x19c)],VisuMZ['ParseItemNotetags']=function(_0x4290bd){const _0x28c960=_0x3ee134;VisuMZ[_0x28c960(0x2d4)][_0x28c960(0x19c)][_0x28c960(0x20c)](this,_0x4290bd),VisuMZ[_0x28c960(0x2d4)][_0x28c960(0x1cc)](_0x4290bd);},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x1cc)]=function(_0xd5c642){const _0x4375f8=_0x3ee134,_0x5ccc31=['Charge',_0x4375f8(0xf8),_0x4375f8(0x1e9)];for(const _0x202059 of _0x5ccc31){VisuMZ[_0x4375f8(0x2d4)]['createJS'](_0xd5c642,_0x202059);}},VisuMZ[_0x3ee134(0x2d4)]['JS']={},VisuMZ[_0x3ee134(0x2d4)]['createJS']=function(_0x297a57,_0x466fb5){const _0x407ca5=_0x3ee134,_0x53f3ce=_0x297a57[_0x407ca5(0x29b)];if(_0x53f3ce['match'](VisuMZ['BattleSystemATB'][_0x407ca5(0x158)][_0x466fb5])){const _0x18340b=String(RegExp['$1']),_0x515b94='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x407ca5(0x24a)](_0x18340b,_0x466fb5),_0x50ea93=VisuMZ[_0x407ca5(0x2d4)][_0x407ca5(0x195)](_0x297a57,_0x466fb5);VisuMZ[_0x407ca5(0x2d4)]['JS'][_0x50ea93]=new Function(_0x515b94);}},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x195)]=function(_0x5243a2,_0x232775){const _0x4905cb=_0x3ee134;if(VisuMZ[_0x4905cb(0x195)])return VisuMZ['createKeyJS'](_0x5243a2,_0x232775);let _0x48ac2f='';if($dataActors[_0x4905cb(0x299)](_0x5243a2))_0x48ac2f=_0x4905cb(0x1a4)[_0x4905cb(0x24a)](_0x5243a2['id'],_0x232775);if($dataClasses[_0x4905cb(0x299)](_0x5243a2))_0x48ac2f=_0x4905cb(0x21f)[_0x4905cb(0x24a)](_0x5243a2['id'],_0x232775);if($dataSkills['includes'](_0x5243a2))_0x48ac2f=_0x4905cb(0x270)[_0x4905cb(0x24a)](_0x5243a2['id'],_0x232775);if($dataItems[_0x4905cb(0x299)](_0x5243a2))_0x48ac2f='Item-%1-%2'[_0x4905cb(0x24a)](_0x5243a2['id'],_0x232775);if($dataWeapons[_0x4905cb(0x299)](_0x5243a2))_0x48ac2f=_0x4905cb(0x10d)['format'](_0x5243a2['id'],_0x232775);if($dataArmors[_0x4905cb(0x299)](_0x5243a2))_0x48ac2f=_0x4905cb(0x107)[_0x4905cb(0x24a)](_0x5243a2['id'],_0x232775);if($dataEnemies['includes'](_0x5243a2))_0x48ac2f=_0x4905cb(0x1ca)[_0x4905cb(0x24a)](_0x5243a2['id'],_0x232775);if($dataStates[_0x4905cb(0x299)](_0x5243a2))_0x48ac2f=_0x4905cb(0x1ec)['format'](_0x5243a2['id'],_0x232775);return _0x48ac2f;},ConfigManager[_0x3ee134(0x166)]=!![],VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x2e1)]=ConfigManager[_0x3ee134(0xfc)],ConfigManager[_0x3ee134(0xfc)]=function(){const _0x167327=_0x3ee134,_0x5dddd6=VisuMZ[_0x167327(0x2d4)][_0x167327(0x2e1)]['call'](this);return _0x5dddd6[_0x167327(0x166)]=this['visualAtbGauge'],_0x5dddd6;},VisuMZ['BattleSystemATB']['ConfigManager_applyData']=ConfigManager[_0x3ee134(0x20e)],ConfigManager[_0x3ee134(0x20e)]=function(_0x12e052){const _0xa334d5=_0x3ee134;VisuMZ[_0xa334d5(0x2d4)]['ConfigManager_applyData'][_0xa334d5(0x20c)](this,_0x12e052);if('visualAtbGauge'in _0x12e052){if(_0xa334d5(0x30a)===_0xa334d5(0x30a))this['visualAtbGauge']=_0x12e052[_0xa334d5(0x166)];else return _0x5d2e7f['x']-_0x3d28a2['x'];}else this[_0xa334d5(0x166)]=!![];},ImageManager[_0x3ee134(0x190)]=ImageManager[_0x3ee134(0x190)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0x3ee134(0x25a)]||0x6,TextManager[_0x3ee134(0x166)]=VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x1c9)][_0x3ee134(0x1a0)]['Name'],VisuMZ['BattleSystemATB'][_0x3ee134(0x26e)]=ColorManager[_0x3ee134(0x126)],ColorManager[_0x3ee134(0x126)]=function(){const _0x5cc231=_0x3ee134;VisuMZ[_0x5cc231(0x2d4)][_0x5cc231(0x26e)][_0x5cc231(0x20c)](this),this[_0x5cc231(0x22e)]['addLoadListener'](this[_0x5cc231(0x2c7)][_0x5cc231(0xfd)](this));},ColorManager[_0x3ee134(0x2b9)]=function(_0x859aba){const _0x3ea430=_0x3ee134;return _0x859aba=String(_0x859aba),_0x859aba['match'](/#(.*)/i)?_0x3ea430(0x1b3)[_0x3ea430(0x24a)](String(RegExp['$1'])):this[_0x3ea430(0x20b)](Number(_0x859aba));},ColorManager['setupBattleSystemATBColors']=function(){const _0x5024e4=_0x3ee134,_0x59ec00=['default',_0x5024e4(0x203),'cast','fast',_0x5024e4(0x1d6),_0x5024e4(0x10b)],_0x582f0f=VisuMZ[_0x5024e4(0x2d4)][_0x5024e4(0x1c9)][_0x5024e4(0x18e)];this[_0x5024e4(0x25f)]={};for(const _0x9f571 of _0x59ec00){for(let _0x578468=0x1;_0x578468<=0x2;_0x578468++){const _0xe663ed=_0x9f571+_0x578468;this[_0x5024e4(0x25f)][_0xe663ed]=this[_0x5024e4(0x2b9)](_0x582f0f[_0xe663ed]);}}},ColorManager[_0x3ee134(0x238)]=function(_0x48485e){const _0x58e60f=_0x3ee134;if(this[_0x58e60f(0x25f)]===undefined)this['setupBattleSystemATBColors']();return this[_0x58e60f(0x25f)][_0x48485e]||'#000000';},SceneManager[_0x3ee134(0x16a)]=function(){const _0x485eeb=_0x3ee134;return this[_0x485eeb(0x1a8)]&&this[_0x485eeb(0x1a8)][_0x485eeb(0xff)]===Scene_Battle;},BattleManager[_0x3ee134(0x204)]=function(){const _0x3cf5d9=_0x3ee134;if(Imported[_0x3cf5d9(0x304)]&&this[_0x3cf5d9(0x218)]())return![];return this[_0x3cf5d9(0x212)]();},VisuMZ[_0x3ee134(0x2d4)]['BattleManager_isActiveTpb']=BattleManager[_0x3ee134(0x17b)],BattleManager[_0x3ee134(0x17b)]=function(){const _0x2eab5a=_0x3ee134;if(!this[_0x2eab5a(0x212)]()){if('etDUR'===_0x2eab5a(0x2b3))return![];else this[_0x2eab5a(0xe2)]=_0x5434b5['max'](_0x931547,this[_0x2eab5a(0xe2)]-_0x31864c);}else{if(ConfigManager&&ConfigManager[_0x2eab5a(0x276)]!==undefined){if(_0x2eab5a(0x300)===_0x2eab5a(0x283))this[_0x2eab5a(0x15d)][_0x2eab5a(0x2e8)]=![],this['_svBattlerSprite']&&(this[_0x2eab5a(0x1a9)][_0x2eab5a(0x15d)]['visible']=![]);else return ConfigManager['atbActive'];}else{if('GUpPv'!==_0x2eab5a(0x2cf)){const _0x35ba23=this[_0x2eab5a(0x24c)]()['note'];if(_0x35ba23[_0x2eab5a(0x2e2)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x4c3ed0(_0x1d84f0['$1']);return _0x44ca6c[_0x2eab5a(0x1c9)][_0x2eab5a(0x11c)];}else return VisuMZ[_0x2eab5a(0x2d4)]['BattleManager_isActiveTpb'][_0x2eab5a(0x20c)](this);}}},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x102)]=Game_System[_0x3ee134(0x1bc)][_0x3ee134(0x12e)],Game_System[_0x3ee134(0x1bc)][_0x3ee134(0x12e)]=function(){const _0x15c9d4=_0x3ee134;VisuMZ['BattleSystemATB'][_0x15c9d4(0x102)][_0x15c9d4(0x20c)](this),this['initBattleSystemATB']();},Game_System[_0x3ee134(0x1bc)][_0x3ee134(0x2ec)]=function(){const _0x513f35=_0x3ee134;this[_0x513f35(0x173)]=!![];},Game_System[_0x3ee134(0x1bc)]['isBattleSystemATBFieldGaugeVisible']=function(){const _0x2e1528=_0x3ee134;return this['_atbFieldGaugeVisible']===undefined&&(_0x2e1528(0x2e4)!==_0x2e1528(0x1c3)?this['initBattleSystemATB']():_0x1b070e[_0x2e1528(0x204)]()?this['initTpbChargeTimeATB'](_0x1a5554):_0x87e0bf[_0x2e1528(0x2d4)][_0x2e1528(0x1b1)]['call'](this,_0xc37c3f)),this[_0x2e1528(0x173)];},Game_System[_0x3ee134(0x1bc)]['setBattleSystemATBFieldGaugeVisible']=function(_0x106291){const _0x16a8ed=_0x3ee134;this[_0x16a8ed(0x173)]===undefined&&this[_0x16a8ed(0x2ec)](),this['_atbFieldGaugeVisible']=_0x106291;},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0xe6)]=Game_Action['prototype'][_0x3ee134(0x115)],Game_Action[_0x3ee134(0x1bc)][_0x3ee134(0x115)]=function(_0x2ee699){const _0x1e5eb3=_0x3ee134;VisuMZ[_0x1e5eb3(0x2d4)][_0x1e5eb3(0xe6)][_0x1e5eb3(0x20c)](this,_0x2ee699),this['applyBattleSystemATBUserEffect'](_0x2ee699);},Game_Action[_0x3ee134(0x1bc)][_0x3ee134(0x14d)]=function(_0x4a79d0){const _0x2e2e19=_0x3ee134;if(!SceneManager[_0x2e2e19(0x16a)]())return;if(!BattleManager[_0x2e2e19(0x204)]())return;if(this[_0x2e2e19(0x24d)]())this[_0x2e2e19(0x124)](_0x4a79d0);},Game_Action[_0x3ee134(0x1bc)][_0x3ee134(0x124)]=function(_0x5a7483){const _0x2a5e51=_0x3ee134,_0x734c26=this[_0x2a5e51(0x24d)]()['note'];if(_0x5a7483[_0x2a5e51(0x18c)]()){if(_0x2a5e51(0x29e)===_0x2a5e51(0x29e)){const _0x497af8=VisuMZ[_0x2a5e51(0x2d4)][_0x2a5e51(0x195)](this[_0x2a5e51(0x24d)](),_0x2a5e51(0xf2));if(VisuMZ[_0x2a5e51(0x2d4)]['JS'][_0x497af8]){const _0x57800d=VisuMZ[_0x2a5e51(0x2d4)]['JS'][_0x497af8][_0x2a5e51(0x20c)](this,this[_0x2a5e51(0x1cf)](),_0x5a7483);_0x5a7483[_0x2a5e51(0x259)](_0x57800d);}_0x734c26[_0x2a5e51(0x2e2)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&_0x5a7483[_0x2a5e51(0x259)](Number(RegExp['$1'])*0.01),_0x734c26[_0x2a5e51(0x2e2)](/<(?:ATB|TPB) CHARGE (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)&&_0x5a7483[_0x2a5e51(0x27f)](Number(RegExp['$1'])*0.01);}else _0x59cf54[_0x2a5e51(0x2d4)][_0x2a5e51(0x2da)][_0x2a5e51(0x20c)](this),this[_0x2a5e51(0x1fe)]();}else{if(_0x5a7483[_0x2a5e51(0x229)]()){const _0xe77b82=VisuMZ[_0x2a5e51(0x2d4)][_0x2a5e51(0x195)](this['item'](),_0x2a5e51(0xf8));if(VisuMZ[_0x2a5e51(0x2d4)]['JS'][_0xe77b82]){const _0xe7b863=VisuMZ[_0x2a5e51(0x2d4)]['JS'][_0xe77b82][_0x2a5e51(0x20c)](this,this[_0x2a5e51(0x1cf)](),_0x5a7483);_0x5a7483[_0x2a5e51(0x112)](_0xe7b863);}_0x734c26['match'](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&('gfZts'!==_0x2a5e51(0x224)?_0x5a7483[_0x2a5e51(0x112)](Number(RegExp['$1'])*0.01):(_0x3e9679[_0x2a5e51(0x15b)](_0x33b9ab+_0x4e0fed,_0x11b2a1,_0xe06a1f,_0x2d06cd),_0x4cf24d['y']-=_0x53b068,_0x43db9a['anchor']['y']=0x1));if(_0x734c26[_0x2a5e51(0x2e2)](/<(?:ATB|TPB) CAST (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i)){if(_0x2a5e51(0x30c)!=='Jnqhf')_0x5a7483[_0x2a5e51(0xf7)](Number(RegExp['$1'])*0.01);else return this[_0x2a5e51(0x23e)]();}_0x734c26[_0x2a5e51(0x2e2)](/<(?:ATB|TPB) INTERRUPT>/i)&&_0x5a7483['atbInterrupt']();}}},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x28d)]=Game_Action[_0x3ee134(0x1bc)]['applyGlobal'],Game_Action[_0x3ee134(0x1bc)][_0x3ee134(0x144)]=function(){const _0x3ab0fe=_0x3ee134;VisuMZ['BattleSystemATB'][_0x3ab0fe(0x28d)][_0x3ab0fe(0x20c)](this),this[_0x3ab0fe(0x265)]();},Game_Action[_0x3ee134(0x1bc)][_0x3ee134(0x265)]=function(){const _0x12573d=_0x3ee134;if(!this[_0x12573d(0x24d)]())return;if(!BattleManager[_0x12573d(0x204)]())return;const _0x1bb6f9=this['item']()['note'];let _0x40f6eb=0x0;this[_0x12573d(0x14a)]&&(_0x40f6eb=this[_0x12573d(0x1cf)]()[_0x12573d(0x308)]);const _0xd42822=VisuMZ['BattleSystemATB']['createKeyJS'](this[_0x12573d(0x24d)](),_0x12573d(0x1e9));VisuMZ[_0x12573d(0x2d4)]['JS'][_0xd42822]&&(_0x12573d(0x10f)==='etyFd'?_0x40f6eb=VisuMZ['BattleSystemATB']['JS'][_0xd42822][_0x12573d(0x20c)](this,this[_0x12573d(0x1cf)](),this[_0x12573d(0x1cf)]()):(_0x31bbf4[_0x12573d(0x15b)](_0x1c7ff1,_0x200ae6+_0x540f44,_0x5bdea2,_0x3fff6b),_0x53b9b7['x']-=_0x4ccc68[_0x12573d(0x12b)](_0x21c17b*1.75),_0x3df008[_0x12573d(0x109)]['x']=0x0));let _0x5e9002=this['item']()['speed']>0x0?this[_0x12573d(0x24d)]()[_0x12573d(0x2cc)]:0x0;if(this[_0x12573d(0x178)]())_0x5e9002+=this['subject']()[_0x12573d(0x13e)]();_0x40f6eb+=(_0x5e9002/0xfa0)[_0x12573d(0x225)](0x0,0x1);this[_0x12573d(0x24d)]()[_0x12573d(0x29b)][_0x12573d(0x2e2)](/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ](\d+)([%％])>/i)&&(_0x40f6eb=Number(RegExp['$1'])*0.01);const _0x46483e=this[_0x12573d(0x1cf)]()[_0x12573d(0x196)]()[_0x12573d(0x228)](this[_0x12573d(0x1cf)]()[_0x12573d(0x108)]()),_0x53320d=/<(?:ATB|TPB) AFTER (?:GAUGE|TIME|SPEED):[ ]([\+\-]\d+)([%％])>/i,_0x263cb5=_0x46483e[_0x12573d(0x170)](_0x3245e1=>_0x3245e1&&_0x3245e1[_0x12573d(0x29b)]['match'](_0x53320d)?Number(RegExp['$1'])*0.01:0x0);_0x40f6eb=_0x263cb5[_0x12573d(0xfb)]((_0x50c3df,_0x3b70b0)=>_0x50c3df+_0x3b70b0,_0x40f6eb),this[_0x12573d(0x24d)]()[_0x12573d(0x29b)][_0x12573d(0x2e2)](/<(?:ATB|TPB) INSTANT>/i)&&(_0x40f6eb=0xa),this['subject']()[_0x12573d(0x2fa)](_0x40f6eb);},Game_BattlerBase['prototype'][_0x3ee134(0x259)]=function(_0xed15cf){const _0x6d4dfc=_0x3ee134;this[_0x6d4dfc(0x308)]=_0xed15cf[_0x6d4dfc(0x225)](0x0,0x1);},Game_BattlerBase['prototype'][_0x3ee134(0x27f)]=function(_0x47c4a7){const _0x233687=_0x3ee134;this[_0x233687(0x259)](this[_0x233687(0x308)]+_0x47c4a7);},Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x112)]=function(_0x55d1e3){const _0x10bb2d=_0x3ee134,_0x446f9a=this[_0x10bb2d(0x1d7)]();this[_0x10bb2d(0x2b7)]=(_0x446f9a*_0x55d1e3)[_0x10bb2d(0x225)](0x0,_0x446f9a);},Game_BattlerBase[_0x3ee134(0x1bc)]['changeAtbCastTime']=function(_0x29a8df){const _0x5b26f7=_0x3ee134,_0x2e1533=this[_0x5b26f7(0x1d7)](),_0x18b644=_0x2e1533*_0x29a8df;this['_tpbCastTime']=(this[_0x5b26f7(0x2b7)]+_0x18b644)[_0x5b26f7(0x225)](0x0,_0x2e1533);},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x2fc)]=Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x2f0)],Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x2f0)]=function(){const _0x4bacb=_0x3ee134;VisuMZ['BattleSystemATB'][_0x4bacb(0x2fc)][_0x4bacb(0x20c)](this),BattleManager[_0x4bacb(0x212)]()&&this[_0x4bacb(0x2f4)]();},VisuMZ[_0x3ee134(0x2d4)]['Game_BattlerBase_revive']=Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x19b)],Game_BattlerBase['prototype']['revive']=function(){const _0x1a4c53=_0x3ee134;VisuMZ[_0x1a4c53(0x2d4)]['Game_BattlerBase_revive'][_0x1a4c53(0x20c)](this),BattleManager[_0x1a4c53(0x212)]()&&(_0x1a4c53(0x161)!==_0x1a4c53(0x161)?_0xf15be3[_0x1a4c53(0x1ea)]['x']=-_0x8634a4['abs'](_0x1496c5['scale']['x']):this[_0x1a4c53(0x2f4)]());},VisuMZ['BattleSystemATB']['Game_Battler_initTpbChargeTime']=Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x1f5)],Game_Battler[_0x3ee134(0x1bc)]['initTpbChargeTime']=function(_0xb52b84){const _0x4b913e=_0x3ee134;BattleManager[_0x4b913e(0x204)]()?this[_0x4b913e(0x2bc)](_0xb52b84):VisuMZ[_0x4b913e(0x2d4)]['Game_Battler_initTpbChargeTime'][_0x4b913e(0x20c)](this,_0xb52b84);},Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x2bc)]=function(_0x21d0d0){const _0xe97aec=_0x3ee134,_0x2f8faa=VisuMZ[_0xe97aec(0x2d4)]['Settings'][_0xe97aec(0x136)];let _0xf5089c=this[_0xe97aec(0x268)]()*eval(_0x2f8faa['InitialGaugeJS']);const _0x38ac0b=this['traitObjects']()[_0xe97aec(0x228)](this[_0xe97aec(0x108)]()),_0x3cd6c9=/<(?:ATB|TPB) (?:BATTLE START|START) (?:GAUGE|TIME|SPEED): ([\+\-]\d+)([%％])>/i,_0xaf6f83=_0x38ac0b[_0xe97aec(0x170)](_0x23a6ee=>_0x23a6ee&&_0x23a6ee['note'][_0xe97aec(0x2e2)](_0x3cd6c9)?Number(RegExp['$1'])*0.01:0x0);_0xf5089c=_0xaf6f83[_0xe97aec(0xfb)]((_0x2f3376,_0x4928d3)=>_0x2f3376+_0x4928d3,_0xf5089c),this[_0xe97aec(0x2ed)]='charging',this['_tpbChargeTime']=(_0x21d0d0?0x1:_0xf5089c)['clamp'](0x0,0x1),this[_0xe97aec(0x121)]()&&(this['_tpbChargeTime']=0x0);},Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x18c)]=function(){const _0xff37ba=_0x3ee134;return this['_tpbState']===_0xff37ba(0x207);},Game_Battler['prototype']['isAtbCastingState']=function(){const _0x2f2431=_0x3ee134;return this[_0x2f2431(0x2ed)]===_0x2f2431(0x288)&&this[_0x2f2431(0x1c7)]()&&this[_0x2f2431(0x1c7)]()[_0x2f2431(0x24d)]()&&this[_0x2f2431(0x1c7)]()['item']()['speed']<0x0;},Game_BattlerBase['prototype'][_0x3ee134(0x271)]=function(){const _0x2a2e28=_0x3ee134;return this[_0x2a2e28(0x229)]()?this['_tpbCastTime']/this[_0x2a2e28(0x1d7)]():0x0;},Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x20f)]=function(){const _0x581bb2=_0x3ee134;return!this[_0x581bb2(0x1c5)]();},Game_Battler['prototype']['setAtbAfterSpeed']=function(_0x143949){this['_atbAfterSpeed']=_0x143949;},VisuMZ['BattleSystemATB'][_0x3ee134(0x23f)]=BattleManager[_0x3ee134(0x216)],BattleManager[_0x3ee134(0x216)]=function(_0x33138a){const _0x1bdc65=_0x3ee134;this[_0x1bdc65(0x212)]()&&!_0x33138a[_0x1bdc65(0x1c5)]()&&(_0x33138a[_0x1bdc65(0x13c)]=!![]),VisuMZ[_0x1bdc65(0x2d4)][_0x1bdc65(0x23f)][_0x1bdc65(0x20c)](this,_0x33138a),_0x33138a[_0x1bdc65(0x189)]()&&this[_0x1bdc65(0x212)]()&&!_0x33138a[_0x1bdc65(0x1c5)]()&&(_0x33138a[_0x1bdc65(0x13c)]=![]);},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x171)]=Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x2f4)],Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x2f4)]=function(){const _0x333c09=_0x3ee134;if(this[_0x333c09(0x13c)])return;VisuMZ[_0x333c09(0x2d4)][_0x333c09(0x171)]['call'](this),this[_0x333c09(0x308)]+=this[_0x333c09(0x303)]||0x0;},Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x25e)]=function(){const _0x10875f=_0x3ee134;if(!this['isAtbCastingState']())return;if(!this[_0x10875f(0x1c7)]())return;if(!this[_0x10875f(0x1c7)]()[_0x10875f(0x24d)]())return;if(this[_0x10875f(0x1c7)]()[_0x10875f(0x24d)]()[_0x10875f(0x29b)][_0x10875f(0x2e2)](/<(?:ATB|TPB) CANNOT (?:BE INTERRUPTED|INTERRUPT)>/i))return;this[_0x10875f(0x14b)](),this[_0x10875f(0x2f4)](),this['_tpbCastTime']=0x0,this[_0x10875f(0x155)]();},Game_Battler['prototype'][_0x3ee134(0x155)]=function(){const _0x5148fa=_0x3ee134,_0x160bdd=VisuMZ['BattleSystemATB'][_0x5148fa(0x1c9)][_0x5148fa(0x1ee)];if(Imported['VisuMZ_0_CoreEngine']){if(_0x5148fa(0x2d7)!==_0x5148fa(0x2d7)){const _0x1df725=_0x556ab1[_0x5148fa(0x1c9)],_0x4cd01a=_0x1df725[_0x5148fa(0x2d0)],_0x5dda9f=this['_graphicIconIndex'];this[_0x5148fa(0x201)][_0x5148fa(0x1dd)]=new _0x487ad3(_0x4cd01a,_0x4cd01a);const _0x2984ea=this[_0x5148fa(0x201)]['bitmap'],_0x242114=_0x43ef46['iconWidth'],_0x6561e5=_0x14bcb5[_0x5148fa(0x137)],_0x3fc343=_0x5dda9f%0x10*_0x242114,_0x4a182d=_0x103e3b[_0x5148fa(0x1ba)](_0x5dda9f/0x10)*_0x6561e5;_0x2984ea[_0x5148fa(0x10a)](_0x31eed0,_0x3fc343,_0x4a182d,_0x242114,_0x6561e5,0x0,0x0,_0x4cd01a,_0x4cd01a);}else{const _0x554eb3=_0x160bdd[_0x5148fa(0x27e)],_0x184d5f=_0x160bdd['InterruptMirror'],_0x24db94=_0x160bdd['InterruptMute'];$gameTemp[_0x5148fa(0x2ca)]([this],_0x554eb3,_0x184d5f,_0x24db94);}}if(this[_0x5148fa(0x2c4)]()&&_0x160bdd['InterruptText'][_0x5148fa(0x16f)]>0x0){if(_0x5148fa(0x2dc)!==_0x5148fa(0x241)){const _0x3e71e6=_0x160bdd[_0x5148fa(0x15e)],_0x4d0c81={'textColor':ColorManager[_0x5148fa(0x2b9)](_0x160bdd[_0x5148fa(0xf4)]),'flashColor':_0x160bdd[_0x5148fa(0x101)],'flashDuration':_0x160bdd[_0x5148fa(0x176)]};this[_0x5148fa(0x2f7)](_0x3e71e6,_0x4d0c81);}else{if(!_0x563408[_0x5148fa(0x249)])return![];if(this[_0x5148fa(0x182)]&&this[_0x5148fa(0x182)][_0x5148fa(0x189)]())return![];const _0x310dbe=_0x1a38f2[_0x5148fa(0x110)]['Settings']['Aggro'];if(!_0x310dbe['VisibleGauge'])return![];if(!_0x41d187[_0x5148fa(0x11b)])return![];const _0x3e56bb=_0x20fc38['BattleSystemATB']['Settings'][_0x5148fa(0x258)];return _0x310dbe[_0x5148fa(0x2de)]===_0x3e56bb['Scale']&&_0x310dbe[_0x5148fa(0x1a3)]===_0x3e56bb[_0x5148fa(0x1a3)]&&_0x310dbe['AnchorY']===_0x3e56bb['AnchorY']&&_0x310dbe[_0x5148fa(0xea)]===_0x3e56bb['OffsetX']&&_0x310dbe[_0x5148fa(0x314)]===_0x3e56bb[_0x5148fa(0x314)]&&!![];}}},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x2d3)]=Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x236)],Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x236)]=function(){const _0x45d56e=_0x3ee134;VisuMZ[_0x45d56e(0x2d4)][_0x45d56e(0x2d3)][_0x45d56e(0x20c)](this),BattleManager['isATB']()&&(this['_tpbCastTime']>=this['tpbRequiredCastTime']()&&(this['_tpbState']='ready'));},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x256)]=Game_Unit['prototype'][_0x3ee134(0x214)],Game_Unit[_0x3ee134(0x1bc)]['updateTpb']=function(){const _0x1bebf1=_0x3ee134;if(BattleManager[_0x1bebf1(0x204)]()){if(_0x1bebf1(0x1f7)!=='VbXzo'){if(BattleManager[_0x1bebf1(0x119)]()['some'](_0x26c690=>_0x26c690&&_0x26c690['isAlive']()&&_0x26c690[_0x1bebf1(0x2c9)]()&&_0x26c690[_0x1bebf1(0x2ed)]===_0x1bebf1(0x206)))return;}else _0x54e2b2[_0x1bebf1(0x2d4)]['Game_Action_applyItemUserEffect']['call'](this,_0x1d6db3),this[_0x1bebf1(0x14d)](_0x558430);}VisuMZ[_0x1bebf1(0x2d4)][_0x1bebf1(0x256)]['call'](this);},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x1e6)]=Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x17e)],Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x17e)]=function(){const _0x35c132=_0x3ee134;!VisuMZ['BattleSystemATB'][_0x35c132(0x1c9)][_0x35c132(0x136)]['StunsResetGauge']&&('NhGcq'===_0x35c132(0x193)?this[_0x35c132(0x13c)]=BattleManager['isATB']():_0x466028=_0x35c132(0xf3)),VisuMZ['BattleSystemATB'][_0x35c132(0x1e6)]['call'](this),BattleManager[_0x35c132(0x212)]()&&this[_0x35c132(0x2ed)]===_0x35c132(0x105)&&this[_0x35c132(0x189)]()&&(_0x35c132(0x2fd)!==_0x35c132(0x16d)?this[_0x35c132(0x284)]=!![]:_0x2293dc[_0x35c132(0x259)](_0x485af2(_0x38093a['$1'])*0.01)),this[_0x35c132(0x13c)]=undefined;},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x215)]=Game_Actor[_0x3ee134(0x1bc)]['clearActions'],Game_Actor['prototype'][_0x3ee134(0x14b)]=function(){const _0x4ebd84=_0x3ee134;if(this['_onRestrictBypassAtbReset']){if(_0x4ebd84(0x30d)==='QJdRC'){if(!this[_0x4ebd84(0x229)]())return;}else _0x23419c+=this['_battler'][_0x4ebd84(0x1f2)]();}VisuMZ[_0x4ebd84(0x2d4)][_0x4ebd84(0x215)][_0x4ebd84(0x20c)](this);},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x1fb)]=Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x306)],Game_Battler['prototype'][_0x3ee134(0x306)]=function(_0x45a477){const _0x31bd4f=_0x3ee134,_0x264b2f=!this[_0x31bd4f(0x1c5)]()&&BattleManager[_0x31bd4f(0x212)](),_0x2859eb=this[_0x31bd4f(0x318)](_0x45a477);VisuMZ[_0x31bd4f(0x2d4)][_0x31bd4f(0x1fb)][_0x31bd4f(0x20c)](this,_0x45a477);if(this[_0x31bd4f(0x189)]()&&_0x2859eb&&!this[_0x31bd4f(0x318)](_0x45a477)){if(_0x31bd4f(0x1ce)!==_0x31bd4f(0x1ce))_0x16832e=_0x330708-0x1,_0x350220=_0x1aefd2-0x3-_0x3c23cc,_0xf9df54[_0x31bd4f(0x2b0)](0x1,0x2+_0x2a7f87,_0xf5552f-0x2,_0x45f877,_0x577478,_0x3e91ca,!![]),_0x4ff468[_0x31bd4f(0x2b0)](0x1,0x1,_0x22aa22-0x2,_0x21a1ca,_0x3d558f,_0x25b8aa,!![]);else{if(_0x264b2f&&this[_0x31bd4f(0x1c5)]()&&this[_0x31bd4f(0x284)]){if(_0x31bd4f(0x141)!==_0x31bd4f(0x2a9))this[_0x31bd4f(0x2f4)](),this[_0x31bd4f(0x14b)](),this['_tpbCastTime']=0x0;else{if(_0x51eeb7[_0x31bd4f(0x195)])return _0x393e12[_0x31bd4f(0x195)](_0x34fb96,_0x33560e);let _0x33ce78='';if(_0x149a66[_0x31bd4f(0x299)](_0x13e195))_0x33ce78='Actor-%1-%2'['format'](_0x98dac6['id'],_0x5bc1c6);if(_0x2381d3[_0x31bd4f(0x299)](_0x555715))_0x33ce78='Class-%1-%2'[_0x31bd4f(0x24a)](_0x204822['id'],_0x17fe44);if(_0x20755d[_0x31bd4f(0x299)](_0xdc6cea))_0x33ce78=_0x31bd4f(0x270)[_0x31bd4f(0x24a)](_0x1cea90['id'],_0x491b8f);if(_0x4e4241[_0x31bd4f(0x299)](_0x34d72e))_0x33ce78=_0x31bd4f(0x2e7)['format'](_0x10a55d['id'],_0x147d78);if(_0x1d5e18[_0x31bd4f(0x299)](_0x572a07))_0x33ce78=_0x31bd4f(0x10d)[_0x31bd4f(0x24a)](_0x336e91['id'],_0x11b613);if(_0x4baddd[_0x31bd4f(0x299)](_0x254865))_0x33ce78=_0x31bd4f(0x107)[_0x31bd4f(0x24a)](_0x572810['id'],_0x264cf0);if(_0x56f342['includes'](_0x10f674))_0x33ce78=_0x31bd4f(0x1ca)[_0x31bd4f(0x24a)](_0x3a4f28['id'],_0x1aaa40);if(_0x4ef4dc['includes'](_0x23c916))_0x33ce78=_0x31bd4f(0x1ec)[_0x31bd4f(0x24a)](_0x2d349f['id'],_0x414966);return _0x33ce78;}}this[_0x31bd4f(0x277)](_0x31bd4f(0xe8));}}else{if(_0x264b2f&&this[_0x31bd4f(0x1c5)]()&&this[_0x31bd4f(0x2f2)]()<=0x0){if(_0x31bd4f(0x219)===_0x31bd4f(0x163))return this[_0x31bd4f(0x23e)]();else this['makeActions'](),this[_0x31bd4f(0x2ed)]=_0x31bd4f(0x207),this[_0x31bd4f(0x13c)]=undefined;}}},Game_Battler['prototype'][_0x3ee134(0x1dc)]=function(){const _0x28f545=_0x3ee134;this[_0x28f545(0x25b)](_0x28f545(0x267)),this[_0x28f545(0x16c)]=![],this[_0x28f545(0x160)]++,this[_0x28f545(0x1b7)]=0x0,this[_0x28f545(0x154)]()&&this[_0x28f545(0x198)](),this[_0x28f545(0x25b)](_0x28f545(0x12a));},Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x154)]=function(){const _0x30c5f9=_0x3ee134;if(this[_0x30c5f9(0x2f2)]()!==0x0)return![];if(BattleManager['isATB']()){if('GmPGt'!==_0x30c5f9(0x227)){if(this[_0x30c5f9(0x189)]()){if(!this[_0x30c5f9(0x2cd)]())return![];}}else return _0x30c5f9(0x2df);}return!![];},VisuMZ['BattleSystemATB'][_0x3ee134(0x18b)]=Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x272)],Game_Battler['prototype'][_0x3ee134(0x272)]=function(){const _0x37ac5f=_0x3ee134;BattleManager[_0x37ac5f(0x204)]()?'OmQdT'===_0x37ac5f(0x210)?this[_0x37ac5f(0x27c)]():this[_0x37ac5f(0x303)]=_0x5359fe:VisuMZ[_0x37ac5f(0x2d4)][_0x37ac5f(0x18b)][_0x37ac5f(0x20c)](this);},Game_Battler['prototype']['applyATBPenalty']=function(){const _0x5f16ee=_0x3ee134;this[_0x5f16ee(0x2ed)]='charging',this[_0x5f16ee(0x308)]+=VisuMZ[_0x5f16ee(0x2d4)][_0x5f16ee(0x1c9)][_0x5f16ee(0x136)]['EscapeFailPenalty']||0x0;},VisuMZ['BattleSystemATB'][_0x3ee134(0x12d)]=Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x237)],Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x237)]=function(){const _0x1ad58d=_0x3ee134;if(BattleManager[_0x1ad58d(0x204)]()){if(_0x1ad58d(0x233)===_0x1ad58d(0x16b)){const _0x4f2139=_0x237b39[_0x1ad58d(0x1c9)];if(!_0x4f2139[_0x1ad58d(0x21d)])return;if(this['_unit']===_0x416fe9)return;const _0x9bb868=_0x4f2139['MarkerSize'],_0xbb0579=new _0x184255();_0xbb0579['anchor']['x']=this[_0x1ad58d(0x109)]['x'],_0xbb0579[_0x1ad58d(0x109)]['y']=this[_0x1ad58d(0x109)]['y'],_0xbb0579['bitmap']=new _0x5234c1(_0x9bb868,_0x9bb868),this[_0x1ad58d(0x255)]=_0xbb0579,this[_0x1ad58d(0x1f4)](this[_0x1ad58d(0x255)]);}else return VisuMZ[_0x1ad58d(0x2d4)][_0x1ad58d(0x1c9)]['Mechanics'][_0x1ad58d(0x185)]['call'](this,this);}else return VisuMZ['BattleSystemATB'][_0x1ad58d(0x12d)][_0x1ad58d(0x20c)](this);},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x2c8)]=Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x197)],Game_Battler['prototype'][_0x3ee134(0x197)]=function(){const _0x9ac04=_0x3ee134;if(BattleManager[_0x9ac04(0x204)]()){if('hzeQl'!==_0x9ac04(0x1a5))return VisuMZ[_0x9ac04(0x2d4)][_0x9ac04(0x1c9)]['Mechanics'][_0x9ac04(0x2fe)][_0x9ac04(0x20c)](this,this);else{const _0xe86e2c=_0x571be4[_0x9ac04(0x24a)](_0x2f5444[_0x9ac04(0x1c8)]()[_0x9ac04(0xf6)](),_0x9ac04(0x180),'(?:GAUGE|TIME|SPEED)'),_0x42cd60=new _0x58e1f8(_0xe86e2c,'i');_0x5cf76d[_0x9ac04(0x2d4)][_0x9ac04(0x158)][_0x234fe0]=_0x42cd60;}}else{if(_0x9ac04(0x17a)!==_0x9ac04(0x17a)){const _0x386d1d=this[_0x9ac04(0x138)]()['note'];if(_0x386d1d['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0xf70caf(_0x97c294['$2']);return _0x4781b9[_0x9ac04(0x1c9)][_0x9ac04(0x13f)];}else return VisuMZ['BattleSystemATB']['Game_Battler_tpbBaseSpeed']['call'](this);}},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x286)]=Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x268)],Game_Battler[_0x3ee134(0x1bc)]['tpbRelativeSpeed']=function(){const _0x19289d=_0x3ee134;if(BattleManager[_0x19289d(0x204)]()){if(_0x19289d(0x120)!==_0x19289d(0x120))_0x1c7943['y']+=_0x1d1273[_0x19289d(0xf9)]()*_0x4088c2['Scale']-0x1;else return VisuMZ[_0x19289d(0x2d4)][_0x19289d(0x1c9)]['Mechanics']['BattlerRelativeSpeedJS'][_0x19289d(0x20c)](this,this);}else return VisuMZ['BattleSystemATB']['Game_Battler_tpbRelativeSpeed'][_0x19289d(0x20c)](this);},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x17d)]=Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x1a7)],Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x1a7)]=function(){const _0x51258a=_0x3ee134;return BattleManager[_0x51258a(0x204)]()?this[_0x51258a(0x2b8)]():VisuMZ[_0x51258a(0x2d4)][_0x51258a(0x17d)]['call'](this);},Game_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x2b8)]=function(){const _0x222950=_0x3ee134;let _0x74e2cb=VisuMZ['BattleSystemATB']['Settings'][_0x222950(0x136)]['TpbAccelerationJS'][_0x222950(0x20c)](this,this);if(ConfigManager&&ConfigManager[_0x222950(0x2a5)]!==undefined){const _0x5ddde5=ConfigManager[_0x222950(0x2a5)]-0x3;if(_0x5ddde5>0x0)return _0x74e2cb*(_0x5ddde5*0x2);else{if(_0x5ddde5<0x0){if('tVPxO'===_0x222950(0x2ba))return _0x74e2cb*(0x1/(_0x5ddde5*-0x2));else{const _0x4a8714=_0x359f38['visualAtbGauge'],_0xa504f7=_0x222950(0x166);this[_0x222950(0x1d2)](_0x4a8714,_0xa504f7);}}}}return _0x74e2cb;},VisuMZ[_0x3ee134(0x2d4)]['Game_Battler_tpbRequiredCastTime']=Game_Battler[_0x3ee134(0x1bc)]['tpbRequiredCastTime'],Game_Battler[_0x3ee134(0x1bc)]['tpbRequiredCastTime']=function(){const _0x542397=_0x3ee134;if(BattleManager[_0x542397(0x204)]()){const _0xc9dfdd=this[_0x542397(0x2d8)][_0x542397(0x170)](_0x2b842f=>_0x2b842f[_0x542397(0x24d)]());for(const _0x44fb3c of _0xc9dfdd){if(!_0x44fb3c)continue;_0x44fb3c[_0x542397(0x26f)]=_0x44fb3c[_0x542397(0x26f)]??_0x44fb3c[_0x542397(0x2cc)];}let _0x109c2f=VisuMZ[_0x542397(0x2d4)]['Settings']['Mechanics'][_0x542397(0x15f)][_0x542397(0x20c)](this,this);for(const _0x4b22ce of _0xc9dfdd){if(!_0x4b22ce)continue;_0x4b22ce[_0x542397(0x2cc)]=_0x4b22ce[_0x542397(0x26f)];}return _0x109c2f;}else return VisuMZ[_0x542397(0x2d4)]['Game_Battler_tpbRequiredCastTime'][_0x542397(0x20c)](this);},VisuMZ[_0x3ee134(0x2d4)]['Scene_Options_maxCommands']=Scene_Options[_0x3ee134(0x1bc)][_0x3ee134(0x251)],Scene_Options[_0x3ee134(0x1bc)][_0x3ee134(0x251)]=function(){const _0x5be343=_0x3ee134;let _0x1ec142=VisuMZ[_0x5be343(0x2d4)][_0x5be343(0x22b)]['call'](this);const _0x16732d=VisuMZ['BattleSystemATB'][_0x5be343(0x1c9)];if(_0x16732d['Options'][_0x5be343(0x26b)]&&_0x16732d[_0x5be343(0x1a0)][_0x5be343(0x14e)]&&BattleManager[_0x5be343(0x204)]())_0x1ec142++;return _0x1ec142;},Sprite_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x1b2)]=function(){const _0x185f44=_0x3ee134;if(!BattleManager[_0x185f44(0x204)]())return;if(!ConfigManager[_0x185f44(0x166)])return;const _0x2ffeb2=VisuMZ[_0x185f44(0x2d4)][_0x185f44(0x1c9)][_0x185f44(0x258)],_0x402c0a=new Sprite_Gauge();_0x402c0a['anchor']['x']=_0x2ffeb2['AnchorX'],_0x402c0a[_0x185f44(0x109)]['y']=_0x2ffeb2['AnchorY'],_0x402c0a['scale']['x']=_0x402c0a[_0x185f44(0x1ea)]['y']=_0x2ffeb2[_0x185f44(0x2de)],this['_atbGaugeSprite']=_0x402c0a,this[_0x185f44(0x1f4)](this[_0x185f44(0x15d)]);},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x11a)]=Sprite_Battler['prototype'][_0x3ee134(0x243)],Sprite_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x243)]=function(_0xbd3715){const _0x379e51=_0x3ee134;VisuMZ[_0x379e51(0x2d4)][_0x379e51(0x11a)][_0x379e51(0x20c)](this,_0xbd3715),this[_0x379e51(0x11e)](_0xbd3715),this[_0x379e51(0x20d)]();},Sprite_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x11e)]=function(_0x5401f1){const _0x3a44c8=_0x3ee134;if(!_0x5401f1)return;if(!this[_0x3a44c8(0x15d)])return;if(_0x5401f1[_0x3a44c8(0x21b)]()){}else{if(_0x5401f1[_0x3a44c8(0x189)]()){if('ePokc'===_0x3a44c8(0x257)){if(this[_0x3a44c8(0xff)]===Sprite_Enemy&&_0x5401f1['hasSvBattler']())return;if(this['constructor']===Sprite_SvEnemy&&!_0x5401f1[_0x3a44c8(0x248)]())return;}else return!this[_0x3a44c8(0x1c5)]();}}this['_atbGaugeSprite'][_0x3a44c8(0x17f)](_0x5401f1,_0x3a44c8(0x1e2));},Sprite_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x20d)]=function(){const _0x2acb18=_0x3ee134;if(!this['_atbGaugeSprite'])return;const _0x529cde=this[_0x2acb18(0x182)]&&this[_0x2acb18(0x182)]['isAppeared']()&&!this[_0x2acb18(0x182)][_0x2acb18(0x162)]();this['_atbGaugeSprite'][_0x2acb18(0x2e8)]=_0x529cde;if(this[_0x2acb18(0x1a9)]&&this['_svBattlerSprite'][_0x2acb18(0x15d)]){if(_0x2acb18(0x1d1)===_0x2acb18(0x1d1))this['_svBattlerSprite']['_atbGaugeSprite']['visible']=_0x529cde;else return![];}},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x2da)]=Sprite_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x147)],Sprite_Battler['prototype'][_0x3ee134(0x147)]=function(){const _0x3a05c7=_0x3ee134;VisuMZ['BattleSystemATB']['Sprite_Battler_updateMain'][_0x3a05c7(0x20c)](this),this[_0x3a05c7(0x1fe)]();},Sprite_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x1fe)]=function(){const _0x45dd33=_0x3ee134;if(!this[_0x45dd33(0x182)])return;if(!this[_0x45dd33(0x15d)])return;if(this[_0x45dd33(0x182)]&&this['_battler'][_0x45dd33(0x189)]()&&this[_0x45dd33(0x182)]['hasSvBattler']()){if(this[_0x45dd33(0xff)]===Sprite_Enemy)return;}const _0x36c663=VisuMZ[_0x45dd33(0x2d4)][_0x45dd33(0x1c9)][_0x45dd33(0x258)],_0xf148dd=this[_0x45dd33(0x15d)];let _0x137baf=_0x36c663[_0x45dd33(0xea)];if(this[_0x45dd33(0x182)][_0x45dd33(0x1ae)]){if(_0x45dd33(0x104)!=='tAGAu'){const _0x4ebe71=_0x6b8d22['Settings'],_0x40e376=this[_0x45dd33(0x226)](),_0x3a9bb8=this[_0x45dd33(0x287)]===_0x5dfaaa?'Actor':_0x45dd33(0x21a),_0x46906e=_0x4ebe71[_0x45dd33(0x262)],_0x45c567=_0x4ebe71[_0x45dd33(0x292)[_0x45dd33(0x24a)](_0x3a9bb8)];_0x40e376?(this['y']=_0x4ebe71[_0x45dd33(0x1fd)]/0x2,this['y']+=_0x45c567?-_0x46906e:_0x46906e):(this['x']=_0x4ebe71['GaugeThick']/0x2,this['x']+=_0x45c567?_0x46906e:-_0x46906e);}else _0x137baf+=this[_0x45dd33(0x182)][_0x45dd33(0x1ae)]();}let _0x58be5b=_0x36c663[_0x45dd33(0x314)];if(this[_0x45dd33(0x182)][_0x45dd33(0x1f2)]){if(_0x45dd33(0x1d3)!==_0x45dd33(0x1d3)){const _0x2c38ed=_0x480061[_0x45dd33(0x2a5)]-0x3;if(_0x2c38ed>0x0)return _0x2eac5c*(_0x2c38ed*0x2);else{if(_0x2c38ed<0x0)return _0x457db9*(0x1/(_0x2c38ed*-0x2));}}else _0x58be5b+=this['_battler'][_0x45dd33(0x1f2)]();}_0xf148dd['x']=_0x137baf;let _0x4ce470=this['height'];if(this[_0x45dd33(0x182)]&&this[_0x45dd33(0x182)][_0x45dd33(0x189)]()&&this[_0x45dd33(0x182)]['hasSvBattler']()){if(_0x45dd33(0x24b)!==_0x45dd33(0x24b)){const _0x4f254f=this['actor']()[_0x45dd33(0x29b)];if(_0x4f254f['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x45dd33(0xf3);else{if(_0x4f254f[_0x45dd33(0x2e2)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return'icon';}return _0x3be657[_0x45dd33(0x1c9)][_0x45dd33(0x2ac)];}else _0x4ce470=this[_0x45dd33(0x182)]['svBattlerData']()['height']||0x1;}_0xf148dd['y']=-_0x4ce470+_0x58be5b,this[_0x45dd33(0x182)][_0x45dd33(0x189)]()&&(_0x45dd33(0x21e)==='YBZIB'?this[_0x45dd33(0x182)][_0x45dd33(0x138)]()[_0x45dd33(0x29b)][_0x45dd33(0x2e2)](/<HIDE (?:ATB|TPB) GAUGE>/i)&&(_0xf148dd['visible']=![]):this['createBattlerSprite'](_0x529787,_0x4928ad)),this[_0x45dd33(0x253)]()&&(_0xf148dd['y']+=_0xf148dd[_0x45dd33(0xf9)]()*_0x36c663['Scale']-0x1),this[_0x45dd33(0x1ea)]['x']<0x0&&(_0xf148dd['scale']['x']=-Math[_0x45dd33(0x222)](_0xf148dd['scale']['x']));},Sprite_Battler[_0x3ee134(0x1bc)]['checkAggroControlSystemOffsetYAdjustment']=function(){const _0x4ebe97=_0x3ee134;if(!Imported['VisuMZ_2_AggroControlSystem'])return![];if(this['_battler']&&this[_0x4ebe97(0x182)][_0x4ebe97(0x189)]())return![];const _0x558d84=VisuMZ[_0x4ebe97(0x110)][_0x4ebe97(0x1c9)][_0x4ebe97(0x285)];if(!_0x558d84[_0x4ebe97(0x1f8)])return![];if(!ConfigManager[_0x4ebe97(0x11b)])return![];const _0x2ecca0=VisuMZ['BattleSystemATB']['Settings'][_0x4ebe97(0x258)];return _0x558d84[_0x4ebe97(0x2de)]===_0x2ecca0[_0x4ebe97(0x2de)]&&_0x558d84[_0x4ebe97(0x1a3)]===_0x2ecca0[_0x4ebe97(0x1a3)]&&_0x558d84[_0x4ebe97(0x169)]===_0x2ecca0[_0x4ebe97(0x169)]&&_0x558d84[_0x4ebe97(0xea)]===_0x2ecca0[_0x4ebe97(0xea)]&&_0x558d84[_0x4ebe97(0x314)]===_0x2ecca0['OffsetY']&&!![];},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x131)]=Sprite_Battler['prototype']['update'],Sprite_Battler[_0x3ee134(0x1bc)][_0x3ee134(0x2a8)]=function(){const _0x3ab93c=_0x3ee134;VisuMZ[_0x3ab93c(0x2d4)]['Sprite_Battler_update'][_0x3ab93c(0x20c)](this),!this[_0x3ab93c(0x182)]&&this[_0x3ab93c(0x15d)]&&(this['_atbGaugeSprite'][_0x3ab93c(0x2e8)]=![],this[_0x3ab93c(0x1a9)]&&(this[_0x3ab93c(0x1a9)][_0x3ab93c(0x15d)][_0x3ab93c(0x2e8)]=![]));},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x1de)]=Sprite_Actor['prototype'][_0x3ee134(0x29d)],Sprite_Actor[_0x3ee134(0x1bc)][_0x3ee134(0x29d)]=function(){const _0x52c1bc=_0x3ee134;VisuMZ[_0x52c1bc(0x2d4)][_0x52c1bc(0x1de)][_0x52c1bc(0x20c)](this),this['isShowAtbGauge']()&&(_0x52c1bc(0x111)==='ueNLV'?this[_0x52c1bc(0x1b2)]():_0x451124[_0x52c1bc(0x2e8)]=![]);},Sprite_Actor[_0x3ee134(0x1bc)][_0x3ee134(0x307)]=function(){const _0x328696=_0x3ee134;return VisuMZ[_0x328696(0x2d4)]['Settings'][_0x328696(0x258)]['ShowActorGauge'];},Sprite_SvEnemy[_0x3ee134(0x1bc)][_0x3ee134(0x307)]=function(){const _0x25cb21=_0x3ee134;return VisuMZ[_0x25cb21(0x2d4)][_0x25cb21(0x1c9)][_0x25cb21(0x258)][_0x25cb21(0x231)];},VisuMZ[_0x3ee134(0x2d4)]['Sprite_Enemy_createStateIconSprite']=Sprite_Enemy[_0x3ee134(0x1bc)][_0x3ee134(0x100)],Sprite_Enemy[_0x3ee134(0x1bc)][_0x3ee134(0x100)]=function(){const _0x4241d5=_0x3ee134;VisuMZ[_0x4241d5(0x2d4)]['Settings'][_0x4241d5(0x258)][_0x4241d5(0x231)]&&('GTuIc'===_0x4241d5(0x2ee)?this[_0x4241d5(0x1b2)]():(_0x1afee8['BattleSystemATB'][_0x4241d5(0x11a)][_0x4241d5(0x20c)](this,_0x32d8e1),this[_0x4241d5(0x11e)](_0xec720a),this[_0x4241d5(0x20d)]())),VisuMZ['BattleSystemATB'][_0x4241d5(0x149)][_0x4241d5(0x20c)](this);},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x2c3)]=Sprite_Enemy[_0x3ee134(0x1bc)]['startEffect'],Sprite_Enemy[_0x3ee134(0x1bc)][_0x3ee134(0x188)]=function(_0x4200ab){const _0x311f52=_0x3ee134;VisuMZ[_0x311f52(0x2d4)][_0x311f52(0x2c3)][_0x311f52(0x20c)](this,_0x4200ab);if(_0x4200ab===_0x311f52(0x157)||_0x311f52(0x261)){if(_0x311f52(0x232)!==_0x311f52(0x200))this[_0x311f52(0x20d)]();else{const _0x54db96=new _0x11d29a();_0x54db96[_0x311f52(0x109)]['x']=this['anchor']['x'],_0x54db96[_0x311f52(0x109)]['y']=this[_0x311f52(0x109)]['y'],this[_0x311f52(0x201)]=_0x54db96,this[_0x311f52(0x1f4)](this[_0x311f52(0x201)]),this[_0x311f52(0x23e)]();}}},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x1db)]=Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x157)],Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x157)]=function(){const _0x1baa4f=_0x3ee134;VisuMZ['BattleSystemATB']['Game_BattlerBase_appear'][_0x1baa4f(0x20c)](this),this[_0x1baa4f(0x189)]()&&BattleManager['isATB']()&&this[_0x1baa4f(0x2c4)]()&&(this[_0x1baa4f(0x2c4)]()[_0x1baa4f(0x1ac)]=!![],this[_0x1baa4f(0x2c4)]()[_0x1baa4f(0x20d)]());},VisuMZ['BattleSystemATB'][_0x3ee134(0x1aa)]=Sprite_Gauge[_0x3ee134(0x1bc)][_0x3ee134(0x1e4)],Sprite_Gauge[_0x3ee134(0x1bc)][_0x3ee134(0x1e4)]=function(){const _0xf36d5f=_0x3ee134;if(this['_statusType']==='time')return this[_0xf36d5f(0x2f6)](0x1);return VisuMZ[_0xf36d5f(0x2d4)]['Sprite_Gauge_gaugeColor1'][_0xf36d5f(0x20c)](this);},VisuMZ['BattleSystemATB'][_0x3ee134(0x1bd)]=Sprite_Gauge['prototype'][_0x3ee134(0x280)],Sprite_Gauge[_0x3ee134(0x1bc)][_0x3ee134(0x280)]=function(){const _0xc66ce5=_0x3ee134;if(this[_0xc66ce5(0x264)]===_0xc66ce5(0x1e2))return this[_0xc66ce5(0x2f6)](0x2);return VisuMZ[_0xc66ce5(0x2d4)][_0xc66ce5(0x1bd)][_0xc66ce5(0x20c)](this);},Sprite_Gauge[_0x3ee134(0x1bc)][_0x3ee134(0x2f6)]=function(_0x27de3c){const _0x598be3=_0x3ee134;if(!this['_battler'])return ColorManager[_0x598be3(0x238)](_0x598be3(0x1c6)['format'](_0x27de3c));if(this[_0x598be3(0x182)][_0x598be3(0x20f)]())return ColorManager['atbColor'](_0x598be3(0x1df)[_0x598be3(0x24a)](_0x27de3c));if(this[_0x598be3(0x182)]['isAtbCastingState']())return ColorManager['atbColor'](_0x598be3(0x293)['format'](_0x27de3c));if(this['gaugeRate']()>=0x1)return ColorManager[_0x598be3(0x238)](_0x598be3(0x273)[_0x598be3(0x24a)](_0x27de3c));const _0x28fee6=VisuMZ[_0x598be3(0x2d4)][_0x598be3(0x1c9)][_0x598be3(0x258)],_0x6c6413=this[_0x598be3(0x182)][_0x598be3(0x113)](0x6)*this[_0x598be3(0x182)][_0x598be3(0x11f)](0x6);if(_0x6c6413<=_0x28fee6[_0x598be3(0x1cd)])return ColorManager['atbColor'](_0x598be3(0x20a)[_0x598be3(0x24a)](_0x27de3c));if(_0x6c6413>=_0x28fee6['FastRate'])return ColorManager[_0x598be3(0x238)](_0x598be3(0x213)[_0x598be3(0x24a)](_0x27de3c));return ColorManager['atbColor'](_0x598be3(0x1c6)['format'](_0x27de3c));},VisuMZ[_0x3ee134(0x2d4)]['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x3ee134(0x1bc)][_0x3ee134(0x2b1)],Sprite_Gauge[_0x3ee134(0x1bc)][_0x3ee134(0x2b1)]=function(){const _0x35c7e1=_0x3ee134;if(this[_0x35c7e1(0x182)]&&this[_0x35c7e1(0x264)]===_0x35c7e1(0x1e2))return this[_0x35c7e1(0x152)]();return VisuMZ[_0x35c7e1(0x2d4)][_0x35c7e1(0x1d0)][_0x35c7e1(0x20c)](this);},Sprite_Gauge['prototype'][_0x3ee134(0x152)]=function(){const _0x527fea=_0x3ee134;return this[_0x527fea(0x182)]['isAtbCastingState']()?_0x527fea(0x19f)==='OBxKq'?(this[_0x527fea(0x274)]===_0x22e417&&(this[_0x527fea(0x274)]=this[_0x527fea(0x2f5)]()),this[_0x527fea(0x274)]):Math[_0x527fea(0x1c4)](this[_0x527fea(0x182)]['_tpbCastTime'],0x0):VisuMZ[_0x527fea(0x2d4)]['Sprite_Gauge_currentValue'][_0x527fea(0x20c)](this);},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x24f)]=Sprite_Gauge[_0x3ee134(0x1bc)]['currentMaxValue'],Sprite_Gauge[_0x3ee134(0x1bc)][_0x3ee134(0x209)]=function(){const _0x47e56a=_0x3ee134;if(this['_battler']&&this[_0x47e56a(0x264)]===_0x47e56a(0x1e2))return this[_0x47e56a(0x2d6)]();return VisuMZ['BattleSystemATB']['Sprite_Gauge_currentMaxValue'][_0x47e56a(0x20c)](this);},Sprite_Gauge[_0x3ee134(0x1bc)][_0x3ee134(0x2d6)]=function(){const _0x171b00=_0x3ee134;if(this[_0x171b00(0x182)][_0x171b00(0x229)]())return _0x171b00(0x1b9)==='zXvPa'?(this[_0x171b00(0x173)]===_0x3d59b8&&this[_0x171b00(0x2ec)](),this[_0x171b00(0x173)]):Math[_0x171b00(0x1c4)](this[_0x171b00(0x182)][_0x171b00(0x1d7)](),1e-9);else{if(_0x171b00(0x266)!==_0x171b00(0x266))this[_0x171b00(0x2f4)]();else return VisuMZ[_0x171b00(0x2d4)][_0x171b00(0x24f)]['call'](this);}},VisuMZ['BattleSystemATB'][_0x3ee134(0x1e0)]=Window_Help[_0x3ee134(0x1bc)][_0x3ee134(0x27b)],Window_Help[_0x3ee134(0x1bc)][_0x3ee134(0x27b)]=function(_0x4ce6e8){const _0xeb71e1=_0x3ee134;if(BattleManager['isATB']()&&_0x4ce6e8&&_0x4ce6e8['note']&&_0x4ce6e8[_0xeb71e1(0x29b)]['match'](/<(?:ATB|TPB) HELP>\s*([\s\S]*)\s*<\/(?:ATB|TPB) HELP>/i)){if(_0xeb71e1(0x133)!==_0xeb71e1(0x2a2))this[_0xeb71e1(0x290)](String(RegExp['$1']));else{let _0x3ee803=_0x205c89['BattleSystemATB']['Settings'][_0xeb71e1(0x136)][_0xeb71e1(0x125)][_0xeb71e1(0x20c)](this,this);if(_0x261420&&_0x530907[_0xeb71e1(0x2a5)]!==_0x31e303){const _0x298688=_0x23b128[_0xeb71e1(0x2a5)]-0x3;if(_0x298688>0x0)return _0x3ee803*(_0x298688*0x2);else{if(_0x298688<0x0)return _0x3ee803*(0x1/(_0x298688*-0x2));}}return _0x3ee803;}}else VisuMZ['BattleSystemATB']['Window_Help_setItem'][_0xeb71e1(0x20c)](this,_0x4ce6e8);},VisuMZ['BattleSystemATB'][_0x3ee134(0x26c)]=Window_StatusBase[_0x3ee134(0x1bc)]['placeGauge'],Window_StatusBase[_0x3ee134(0x1bc)][_0x3ee134(0x2f8)]=function(_0xf7e6cf,_0x28b0ca,_0x5957a6,_0x364e99){const _0x1d22a0=_0x3ee134;if(!this[_0x1d22a0(0x18a)](_0x28b0ca))return;VisuMZ[_0x1d22a0(0x2d4)][_0x1d22a0(0x26c)][_0x1d22a0(0x20c)](this,_0xf7e6cf,_0x28b0ca,_0x5957a6,_0x364e99);},Window_StatusBase['prototype'][_0x3ee134(0x18a)]=function(_0x105b7f){const _0x3633bf=_0x3ee134;if(_0x105b7f!=='time')return!![];if(!['Window_BattleStatus',_0x3633bf(0x1f1)][_0x3633bf(0x299)](this[_0x3633bf(0xff)][_0x3633bf(0x1e3)]))return![];if(!BattleManager[_0x3633bf(0x204)]())return![];if(!ConfigManager['visualAtbGauge'])return![];return VisuMZ[_0x3633bf(0x2d4)][_0x3633bf(0x1c9)]['Gauge'][_0x3633bf(0x28b)];},VisuMZ[_0x3ee134(0x2d4)][_0x3ee134(0x298)]=Window_Options[_0x3ee134(0x1bc)][_0x3ee134(0x179)],Window_Options[_0x3ee134(0x1bc)]['addGeneralOptions']=function(){const _0x7263ab=_0x3ee134;VisuMZ['BattleSystemATB'][_0x7263ab(0x298)][_0x7263ab(0x20c)](this),this['addBattleSystemATBCommands']();},Window_Options[_0x3ee134(0x1bc)]['addBattleSystemATBCommands']=function(){const _0x51a93b=_0x3ee134;if(!BattleManager[_0x51a93b(0x204)]())return;VisuMZ[_0x51a93b(0x2d4)][_0x51a93b(0x1c9)]['Options'][_0x51a93b(0x26b)]&&this[_0x51a93b(0x312)]();},Window_Options[_0x3ee134(0x1bc)][_0x3ee134(0x312)]=function(){const _0x28bec5=_0x3ee134,_0x48a0a9=TextManager[_0x28bec5(0x166)],_0x5901a5='visualAtbGauge';this[_0x28bec5(0x1d2)](_0x48a0a9,_0x5901a5);},Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x22c)]=function(){const _0x43588a=_0x3ee134;delete this[_0x43588a(0x274)],delete this[_0x43588a(0x2bf)],delete this[_0x43588a(0x230)],delete this[_0x43588a(0x309)];},Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x1e7)]=function(){const _0x5ac47a=_0x3ee134;return this[_0x5ac47a(0x274)]===undefined&&(_0x5ac47a(0x1e8)!==_0x5ac47a(0x116)?this[_0x5ac47a(0x274)]=this[_0x5ac47a(0x2f5)]():(this['createFieldGaugeSkin'](),this[_0x5ac47a(0x177)](),this[_0x5ac47a(0x139)]())),this['_fieldAtbGaugeGraphicType'];},Game_BattlerBase['prototype'][_0x3ee134(0x2f5)]=function(){const _0x26a76e=_0x3ee134;return Sprite_FieldGaugeATB[_0x26a76e(0x1c9)][_0x26a76e(0x220)];},Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x1ab)]=function(){const _0x2d1abd=_0x3ee134;return this[_0x2d1abd(0x2bf)]===undefined&&(this[_0x2d1abd(0x2bf)]=this[_0x2d1abd(0x2b6)]()),this[_0x2d1abd(0x2bf)];},Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x2b6)]=function(){const _0x239376=_0x3ee134;return Sprite_FieldGaugeATB[_0x239376(0x1c9)][_0x239376(0x1f6)];},Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0xf5)]=function(){const _0x4c6c25=_0x3ee134;return this[_0x4c6c25(0x230)]===undefined&&(this[_0x4c6c25(0x230)]=this[_0x4c6c25(0xeb)]()),this[_0x4c6c25(0x230)];},Game_BattlerBase[_0x3ee134(0x1bc)]['createFieldAtbGraphicFaceIndex']=function(){const _0x3bebf1=_0x3ee134;return Sprite_FieldGaugeATB[_0x3bebf1(0x1c9)][_0x3bebf1(0x13f)];},Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x2ae)]=function(){const _0x762df6=_0x3ee134;return this[_0x762df6(0x309)]===undefined&&(this[_0x762df6(0x309)]=this[_0x762df6(0x30e)]()),this['_fieldAtbGaugeIconIndex'];},Game_BattlerBase['prototype'][_0x3ee134(0x30e)]=function(){const _0x2a9c74=_0x3ee134;return Sprite_FieldGaugeATB[_0x2a9c74(0x1c9)][_0x2a9c74(0x21c)];},Game_BattlerBase[_0x3ee134(0x1bc)][_0x3ee134(0x1d4)]=function(_0x5da4b5){this['_fieldAtbGaugeIconIndex']=_0x5da4b5;},Game_Actor['prototype'][_0x3ee134(0x2f5)]=function(){const _0x324ce0=_0x3ee134,_0x2e6b55=this[_0x324ce0(0x24c)]()['note'];if(_0x2e6b55['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x324ce0(0xf3);else{if(_0x2e6b55[_0x324ce0(0x2e2)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x324ce0(0x29a)!==_0x324ce0(0x29a)?this[_0x324ce0(0x23e)]():'icon';}return Sprite_FieldGaugeATB[_0x324ce0(0x1c9)][_0x324ce0(0x2ac)];},Game_Actor[_0x3ee134(0x1bc)][_0x3ee134(0x2b6)]=function(){const _0x365057=_0x3ee134,_0xabd1be=this['actor']()[_0x365057(0x29b)];if(_0xabd1be[_0x365057(0x2e2)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return this[_0x365057(0x132)]();},Game_Actor['prototype'][_0x3ee134(0xeb)]=function(){const _0x9f72bd=_0x3ee134,_0x3dc291=this[_0x9f72bd(0x24c)]()[_0x9f72bd(0x29b)];if(_0x3dc291['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x9f72bd(0x2d9)!==_0x9f72bd(0x2d9))this['process_VisuMZ_BattleSystemATB_CreateRegExp'](),_0x275952[_0x9f72bd(0x2d4)][_0x9f72bd(0x1c0)][_0x9f72bd(0x20c)](this),this[_0x9f72bd(0x134)]();else return Number(RegExp['$2']);}return this['faceIndex']();},Game_Actor[_0x3ee134(0x1bc)]['createFieldAtbGraphicIconIndex']=function(){const _0x4660f3=_0x3ee134,_0x2b9740=this[_0x4660f3(0x24c)]()[_0x4660f3(0x29b)];if(_0x2b9740[_0x4660f3(0x2e2)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB['Settings'][_0x4660f3(0x11c)];},Game_Enemy[_0x3ee134(0x1bc)]['createFieldAtbGraphicType']=function(){const _0x232d6e=_0x3ee134,_0x5312e7=this['enemy']()[_0x232d6e(0x29b)];if(_0x5312e7[_0x232d6e(0x2e2)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return'face';else{if(_0x5312e7[_0x232d6e(0x2e2)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return _0x232d6e(0x2df);}return Sprite_FieldGaugeATB['Settings'][_0x232d6e(0x220)];},Game_Enemy[_0x3ee134(0x1bc)][_0x3ee134(0x2b6)]=function(){const _0x3711f4=_0x3ee134,_0x59a512=this['enemy']()[_0x3711f4(0x29b)];if(_0x59a512[_0x3711f4(0x2e2)](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if(_0x3711f4(0x2c1)!==_0x3711f4(0x2c1)){const _0x2ad099=_0x4d62ed(_0x1a2888['$1']),_0x2cc902='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20keyType\x20=\x20\x27%2\x27;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20rate\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(keyType\x20===\x20\x27Charge\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbChargeTime;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20else\x20if\x20(keyType\x20===\x20\x27Cast\x27)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20target._tpbCastTime\x20/\x20Math.max(target.tpbRequiredCastTime(),\x201);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20rate;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(rate)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20rate\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20rate\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20rate\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20rate;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x2ad099,_0x193c53),_0x284526=_0x33813f[_0x3711f4(0x2d4)]['createKeyJS'](_0x348d2e,_0x2ad765);_0xcd32[_0x3711f4(0x2d4)]['JS'][_0x284526]=new _0x534cee(_0x2cc902);}else return String(RegExp['$1']);}return Sprite_FieldGaugeATB[_0x3711f4(0x1c9)][_0x3711f4(0x1f6)];},Game_Enemy[_0x3ee134(0x1bc)][_0x3ee134(0xeb)]=function(){const _0x561624=_0x3ee134,_0x14af48=this[_0x561624(0x138)]()['note'];if(_0x14af48['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i)){if('WysrH'===_0x561624(0x135))_0x441d35['BattleSystemATB'][_0x561624(0x26e)][_0x561624(0x20c)](this),this['_windowskin']['addLoadListener'](this[_0x561624(0x2c7)][_0x561624(0xfd)](this));else return Number(RegExp['$2']);}return Sprite_FieldGaugeATB[_0x561624(0x1c9)][_0x561624(0x13f)];},Game_Enemy[_0x3ee134(0x1bc)]['createFieldAtbGraphicIconIndex']=function(){const _0x59ad14=_0x3ee134,_0x33a754=this[_0x59ad14(0x138)]()['note'];if(_0x33a754[_0x59ad14(0x2e2)](/<ATB FIELD GAUGE ICON:[ ](\d+)>/i))return Number(RegExp['$1']);return Sprite_FieldGaugeATB['Settings'][_0x59ad14(0x21c)];},VisuMZ['BattleSystemATB']['Scene_Battle_createAllWindows']=Scene_Battle[_0x3ee134(0x1bc)]['createAllWindows'],Scene_Battle['prototype']['createAllWindows']=function(){const _0x3d75db=_0x3ee134;this[_0x3d75db(0x278)](),VisuMZ['BattleSystemATB'][_0x3d75db(0x183)][_0x3d75db(0x20c)](this),this[_0x3d75db(0x25d)]();},Scene_Battle[_0x3ee134(0x1bc)][_0x3ee134(0x278)]=function(){const _0x4e6405=_0x3ee134;if(!BattleManager[_0x4e6405(0x204)]())return;if(!Sprite_FieldGaugeATB[_0x4e6405(0x1c9)][_0x4e6405(0x311)])return;if(!ConfigManager['visualAtbGauge'])return;this['_fieldGaugeATB_Container']=new Window_Base(new Rectangle(0x0,0x0,0x0,0x0));const _0x1971c3=this['getChildIndex'](this[_0x4e6405(0xf0)]);this[_0x4e6405(0x129)](this['_fieldGaugeATB_Container'],_0x1971c3);},Scene_Battle[_0x3ee134(0x1bc)][_0x3ee134(0x25d)]=function(){const _0x251e0e=_0x3ee134;if(!BattleManager['isATB']())return;if(!Sprite_FieldGaugeATB[_0x251e0e(0x1c9)]['UseFieldGauge'])return;if(!ConfigManager['visualAtbGauge'])return;this[_0x251e0e(0x281)]=new Sprite_FieldGaugeATB(),this[_0x251e0e(0x296)]['addChild'](this[_0x251e0e(0x281)]);};function Sprite_FieldGaugeATB(){const _0x475695=_0x3ee134;this[_0x475695(0x12e)](...arguments);}Sprite_FieldGaugeATB['prototype']=Object[_0x3ee134(0x28c)](Sprite[_0x3ee134(0x1bc)]),Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0xff)]=Sprite_FieldGaugeATB,Sprite_FieldGaugeATB[_0x3ee134(0x1c9)]=JsonEx['makeDeepCopy'](VisuMZ['BattleSystemATB']['Settings'][_0x3ee134(0x156)]),Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x12e)]=function(){const _0x20fa4c=_0x3ee134;Sprite['prototype']['initialize'][_0x20fa4c(0x20c)](this),this[_0x20fa4c(0x205)](),this['setHomeLocation'](),this['createChildren']();},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x205)]=function(){const _0x5a4c86=_0x3ee134;this[_0x5a4c86(0x109)]['x']=0.5,this['anchor']['y']=0.5;},Sprite_FieldGaugeATB['prototype'][_0x3ee134(0x226)]=function(){const _0x1b488c=_0x3ee134;if(this['_horz']!==undefined)return this[_0x1b488c(0x174)];const _0xfd0bc4=Sprite_FieldGaugeATB[_0x1b488c(0x1c9)][_0x1b488c(0x199)];return this[_0x1b488c(0x174)]=[_0x1b488c(0x175),_0x1b488c(0x235)]['includes'](_0xfd0bc4),this[_0x1b488c(0x174)];},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x2eb)]=function(){const _0x37ba44=_0x3ee134,_0x5526a8=Sprite_FieldGaugeATB[_0x37ba44(0x1c9)]['DisplayPosition']['toLowerCase']()[_0x37ba44(0xf6)](),_0x5853ff=Window_Base[_0x37ba44(0x1bc)][_0x37ba44(0x23a)](),_0x495516=SceneManager[_0x37ba44(0x1a8)][_0x37ba44(0x202)]['height']+Math['round'](_0x5853ff*0.5);this[_0x37ba44(0x159)]=0x0,this[_0x37ba44(0x279)]=0x0;switch(_0x5526a8){case _0x37ba44(0x175):this[_0x37ba44(0x159)]=Math[_0x37ba44(0xee)](Graphics[_0x37ba44(0x263)]*0.5),this[_0x37ba44(0x279)]=0x60;break;case _0x37ba44(0x235):this['_homeX']=Math['round'](Graphics[_0x37ba44(0x263)]*0.5),this[_0x37ba44(0x279)]=Graphics[_0x37ba44(0x26a)]-_0x495516;break;case _0x37ba44(0x208):this[_0x37ba44(0x159)]=0x50,this[_0x37ba44(0x279)]=Math[_0x37ba44(0xee)]((Graphics[_0x37ba44(0x26a)]-_0x495516)/0x2);break;case _0x37ba44(0x315):this[_0x37ba44(0x159)]=Graphics[_0x37ba44(0x263)]-0x50,this['_homeY']=Math[_0x37ba44(0xee)]((Graphics['boxHeight']-_0x495516)/0x2);break;}this[_0x37ba44(0x159)]+=Sprite_FieldGaugeATB[_0x37ba44(0x1c9)]['DisplayOffsetX']||0x0,this['_homeY']+=Sprite_FieldGaugeATB[_0x37ba44(0x1c9)][_0x37ba44(0x2cb)]||0x0,this['x']=this[_0x37ba44(0x159)],this['y']=this[_0x37ba44(0x279)];},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x103)]=function(){const _0x23374b=_0x3ee134;this[_0x23374b(0x1f3)](),this['createGaugeSprite'](),this['createBattlerContainer']();},Sprite_FieldGaugeATB['prototype'][_0x3ee134(0x1f3)]=function(){const _0x5584b7=_0x3ee134;this[_0x5584b7(0x2fb)]=new Sprite(),this[_0x5584b7(0x2fb)][_0x5584b7(0x109)]['x']=0.5,this[_0x5584b7(0x2fb)][_0x5584b7(0x109)]['y']=0.5,this[_0x5584b7(0x1f4)](this[_0x5584b7(0x2fb)]);const _0x36aae9=Sprite_FieldGaugeATB['Settings']['GaugeSystemSkin'];if(_0x36aae9)this[_0x5584b7(0x2fb)][_0x5584b7(0x1dd)]=ImageManager[_0x5584b7(0x211)](_0x36aae9);},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)]['createGaugeSprite']=function(){const _0x28b70c=_0x3ee134;this[_0x28b70c(0x148)]=new Sprite(),this[_0x28b70c(0x1f4)](this['_gaugeSprite']),this[_0x28b70c(0x2f1)]();},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x2f1)]=function(){const _0x214bf3=_0x3ee134,_0x3a905d=Sprite_FieldGaugeATB[_0x214bf3(0x1c9)],_0x38f56b=this[_0x214bf3(0x226)](),_0xa2eea1=_0x38f56b?_0x3a905d['GaugeLengthHorz']:_0x3a905d[_0x214bf3(0x1fd)],_0x5ed88b=_0x38f56b?_0x3a905d[_0x214bf3(0x1fd)]:_0x3a905d[_0x214bf3(0x2c5)];this['_gaugeSprite']['bitmap']=new Bitmap(_0xa2eea1,_0x5ed88b),this[_0x214bf3(0x1d5)](),this[_0x214bf3(0x148)]['x']=Math[_0x214bf3(0x12b)](_0xa2eea1/-0x2),this[_0x214bf3(0x148)]['y']=Math[_0x214bf3(0x12b)](_0x5ed88b/-0x2);},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x1d5)]=function(){const _0x34048e=_0x3ee134;if(!Sprite_FieldGaugeATB[_0x34048e(0x1c9)][_0x34048e(0x1ad)])return;const _0x4f0097=Sprite_FieldGaugeATB[_0x34048e(0x1c9)],_0xc227f1=this['_gaugeSprite'][_0x34048e(0x1dd)],_0x4a54b9=_0xc227f1['width'],_0x2be383=_0xc227f1[_0x34048e(0xe3)],_0x4257aa=ColorManager[_0x34048e(0x1b4)](),_0xa04aed=ColorManager[_0x34048e(0x2a3)](),_0x290842=ColorManager[_0x34048e(0x2ff)](),_0x1b87df=ColorManager[_0x34048e(0x238)](_0x34048e(0xe1)),_0x455abb=ColorManager[_0x34048e(0x238)](_0x34048e(0x282)),_0x18130c=this[_0x34048e(0x226)](),_0xc1dda=_0x4f0097[_0x34048e(0x1d8)],_0x387334=_0x4f0097['GaugeSplit']['clamp'](0x0,0x1),_0x335b19=Math['ceil'](((_0x18130c?_0x4a54b9:_0x2be383)-0x2)*_0x387334);_0xc227f1[_0x34048e(0x14f)](0x0,0x0,_0x4a54b9,_0x2be383,_0x4257aa);let _0x1a9d22=0x0,_0x10ac6d=0x0,_0x34faf8=0x0,_0x2ca738=0x0;if(_0x18130c&&_0xc1dda)_0x1a9d22=_0x335b19-0x1,_0x34faf8=_0x4a54b9-0x3-_0x1a9d22,_0xc227f1[_0x34048e(0x2b0)](0x1,0x1,_0x1a9d22,_0x2be383-0x2,_0xa04aed,_0x290842,![]),_0xc227f1[_0x34048e(0x2b0)](0x2+_0x1a9d22,0x1,_0x34faf8,_0x2be383-0x2,_0x1b87df,_0x455abb,![]);else{if(_0x18130c&&!_0xc1dda){if('PPcpi'===_0x34048e(0x151)){if(!this[_0x34048e(0x255)])return;const _0x458905=this['battler']();if(!_0x458905)return;if(this['_letter']===_0x458905[_0x34048e(0x1eb)]&&this['_plural']===_0x458905[_0x34048e(0x289)])return;this['_letter']=_0x458905['_letter'],this['_plural']=_0x458905[_0x34048e(0x289)];const _0x12fe06=_0x28ee6f['Settings'],_0x89b08b=_0x12fe06[_0x34048e(0x2d0)],_0x1f73ef=_0x4f5b25[_0x34048e(0x1ba)](_0x89b08b/0x2),_0x3edb63=this[_0x34048e(0x255)][_0x34048e(0x1dd)];_0x3edb63[_0x34048e(0x305)]();if(!this['_plural'])return;_0x3edb63[_0x34048e(0x192)]=_0x12fe06[_0x34048e(0x114)]||_0x3551b4[_0x34048e(0x13b)](),_0x3edb63[_0x34048e(0x2e0)]=_0x12fe06[_0x34048e(0x244)]||0x10,_0x3edb63[_0x34048e(0x2bd)](this[_0x34048e(0x1eb)],0x2,_0x1f73ef,_0x89b08b-0x4,_0x1f73ef-0x2,'right');}else _0x1a9d22=_0x335b19-0x1,_0x34faf8=_0x4a54b9-0x3-_0x1a9d22,_0xc227f1[_0x34048e(0x2b0)](0x2+_0x34faf8,0x1,_0x1a9d22,_0x2be383-0x2,_0xa04aed,_0x290842,![]),_0xc227f1[_0x34048e(0x2b0)](0x1,0x1,_0x34faf8,_0x2be383-0x2,_0x1b87df,_0x455abb,![]);}else{if(!_0x18130c&&_0xc1dda){if(_0x34048e(0x1ed)===_0x34048e(0x14c))return this[_0x34048e(0x2bf)]===_0x1435d5&&(this['_fieldAtbGaugeFaceName']=this[_0x34048e(0x2b6)]()),this[_0x34048e(0x2bf)];else _0x10ac6d=_0x335b19-0x1,_0x2ca738=_0x2be383-0x3-_0x10ac6d,_0xc227f1['gradientFillRect'](0x1,0x1,_0x4a54b9-0x2,_0x10ac6d,_0xa04aed,_0x290842,!![]),_0xc227f1['gradientFillRect'](0x1,0x2+_0x10ac6d,_0x4a54b9-0x2,_0x2ca738,_0x1b87df,_0x455abb,!![]);}else!_0x18130c&&!_0xc1dda&&(_0x34048e(0x24e)===_0x34048e(0x2bb)?this[_0x34048e(0x252)](_0x39be9e,_0x5e10e4):(_0x10ac6d=_0x335b19-0x1,_0x2ca738=_0x2be383-0x3-_0x10ac6d,_0xc227f1[_0x34048e(0x2b0)](0x1,0x2+_0x2ca738,_0x4a54b9-0x2,_0x10ac6d,_0xa04aed,_0x290842,!![]),_0xc227f1[_0x34048e(0x2b0)](0x1,0x1,_0x4a54b9-0x2,_0x2ca738,_0x1b87df,_0x455abb,!![])));}}},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x139)]=function(){const _0x10afd9=_0x3ee134;this[_0x10afd9(0x1ef)]&&(_0x10afd9(0x240)!==_0x10afd9(0x17c)?this[_0x10afd9(0x148)]['removeChild'](this[_0x10afd9(0x1ef)]):(_0x4a6a0c&&this['canMove']()&&this[_0x10afd9(0x284)]&&(this[_0x10afd9(0x2f4)](),this['clearActions'](),this['_tpbCastTime']=0x0),this[_0x10afd9(0x277)]('undecided'))),this[_0x10afd9(0x1ef)]=new Sprite(),this[_0x10afd9(0x148)][_0x10afd9(0x1f4)](this[_0x10afd9(0x1ef)]),this[_0x10afd9(0x1c2)]();},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x1c2)]=function(){const _0x4344c7=_0x3ee134;this[_0x4344c7(0x313)](),this[_0x4344c7(0x146)]();},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x313)]=function(){const _0x146edf=_0x3ee134,_0x32dcff=$gameTroop['members'](),_0x26b8b8=_0x32dcff[_0x146edf(0x16f)];for(let _0x522916=0x0;_0x522916<_0x26b8b8;_0x522916++){this['createBattlerSprite'](_0x522916,$gameTroop);}},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x146)]=function(){const _0x3b45b0=_0x3ee134,_0x4d2506=$gameParty[_0x3b45b0(0x260)]();for(let _0x4bb12f=0x0;_0x4bb12f<_0x4d2506;_0x4bb12f++){this[_0x3b45b0(0x252)](_0x4bb12f,$gameParty);}},Sprite_FieldGaugeATB['prototype'][_0x3ee134(0x252)]=function(_0x34a7cc,_0x1d1a22){const _0x428892=_0x3ee134,_0x59b04c=new Sprite_FieldMarkerATB(_0x34a7cc,_0x1d1a22,this[_0x428892(0x148)]);this[_0x428892(0x1ef)]['addChild'](_0x59b04c);},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x2a8)]=function(){const _0x1c2f7d=_0x3ee134;Sprite[_0x1c2f7d(0x1bc)][_0x1c2f7d(0x2a8)]['call'](this),this[_0x1c2f7d(0x142)](),this[_0x1c2f7d(0x2f3)](),this[_0x1c2f7d(0x167)]();},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)]['updatePosition']=function(){const _0x473182=_0x3ee134,_0x16e1de=Sprite_FieldGaugeATB[_0x473182(0x1c9)];if(_0x16e1de[_0x473182(0x199)]!==_0x473182(0x175))return;if(!_0x16e1de[_0x473182(0x1cb)])return;const _0x50bd59=SceneManager[_0x473182(0x1a8)]['_helpWindow'];if(!_0x50bd59)return;_0x50bd59[_0x473182(0x2e8)]?_0x473182(0x172)!==_0x473182(0x2ad)?(this['x']=this[_0x473182(0x159)]+(_0x16e1de[_0x473182(0x1a1)]||0x0),this['y']=this['_homeY']+(_0x16e1de[_0x473182(0x2a6)]||0x0)):this[_0x473182(0x2ec)]():'IjXWa'===_0x473182(0x2dd)?_0x3bee0c[_0x473182(0x2d4)][_0x473182(0x1e0)][_0x473182(0x20c)](this,_0x577ce2):(this['x']=this[_0x473182(0x159)],this['y']=this['_homeY']);const _0x260a1d=SceneManager[_0x473182(0x1a8)][_0x473182(0xf0)];this['x']+=_0x260a1d['x'],this['y']+=_0x260a1d['y'];},Sprite_FieldGaugeATB['prototype']['updateBattleContainerOrder']=function(){const _0x2d3d9f=_0x3ee134;if(!this['_battlerContainer'])return;const _0x4153d2=this['_battlerContainer'][_0x2d3d9f(0x302)];if(!_0x4153d2)return;_0x4153d2[_0x2d3d9f(0x2e5)](this[_0x2d3d9f(0xe5)][_0x2d3d9f(0xfd)](this));},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0xe5)]=function(_0x535c66,_0x4a2b40){const _0x6fc27e=_0x3ee134,_0xb0de1d=this[_0x6fc27e(0x226)](),_0x83ca2f=Sprite_FieldGaugeATB[_0x6fc27e(0x1c9)][_0x6fc27e(0x1d8)];if(_0xb0de1d&&_0x83ca2f){if(_0x6fc27e(0x2b4)!=='utZWL')return _0x535c66['x']-_0x4a2b40['x'];else{if(!_0x5eb17b[_0x6fc27e(0x204)]())return;if(!_0x3d253b[_0x6fc27e(0x166)])return;const _0x32eb83=_0x5f05fd[_0x6fc27e(0x2d4)]['Settings'][_0x6fc27e(0x258)],_0x3e8b85=new _0x686de();_0x3e8b85['anchor']['x']=_0x32eb83[_0x6fc27e(0x1a3)],_0x3e8b85[_0x6fc27e(0x109)]['y']=_0x32eb83[_0x6fc27e(0x169)],_0x3e8b85[_0x6fc27e(0x1ea)]['x']=_0x3e8b85[_0x6fc27e(0x1ea)]['y']=_0x32eb83[_0x6fc27e(0x2de)],this['_atbGaugeSprite']=_0x3e8b85,this['addChild'](this['_atbGaugeSprite']);}}else{if(_0xb0de1d&&!_0x83ca2f)return _0x4a2b40['x']-_0x535c66['x'];else{if(!_0xb0de1d&&_0x83ca2f){if(_0x6fc27e(0x23b)===_0x6fc27e(0x23b))return _0x535c66['y']-_0x4a2b40['y'];else _0x148df0=_0x2c2be6[_0x6fc27e(0x1c4)](_0x1faaa6,_0x557bf0);}else{if(!_0xb0de1d&&!_0x83ca2f){if(_0x6fc27e(0x28f)!==_0x6fc27e(0x28f)){if(!_0x122272['isSceneBattle']())return;if(!_0x4dc1f1[_0x6fc27e(0x204)]())return;if(this['item']())this['applyItemBattleSystemATBUserEffect'](_0x416fd4);}else return _0x4a2b40['y']-_0x535c66['y'];}}}}},Sprite_FieldGaugeATB[_0x3ee134(0x1bc)][_0x3ee134(0x167)]=function(){const _0xc6262f=_0x3ee134;this[_0xc6262f(0x2e8)]=$gameSystem[_0xc6262f(0x122)]();};function Sprite_FieldMarkerATB(){const _0x165e17=_0x3ee134;this[_0x165e17(0x12e)](...arguments);}Sprite_FieldMarkerATB[_0x3ee134(0x1bc)]=Object[_0x3ee134(0x28c)](Sprite_Clickable[_0x3ee134(0x1bc)]),Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0xff)]=Sprite_FieldMarkerATB,Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x12e)]=function(_0x401692,_0x363e9e,_0x1e8d4a){const _0x312c72=_0x3ee134;this['_index']=_0x401692,this[_0x312c72(0x287)]=_0x363e9e,this[_0x312c72(0x148)]=_0x1e8d4a,Sprite_Clickable[_0x312c72(0x1bc)][_0x312c72(0x12e)][_0x312c72(0x20c)](this),this[_0x312c72(0x205)](),this[_0x312c72(0x103)](),this[_0x312c72(0xe2)]=this[_0x312c72(0x22a)]();},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x205)]=function(){const _0x2c6f3f=_0x3ee134;this[_0x2c6f3f(0x109)]['x']=0.5,this['anchor']['y']=0.5;},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)]['createChildren']=function(){const _0x78215f=_0x3ee134;this[_0x78215f(0x217)](),this[_0x78215f(0x1a2)](),this[_0x78215f(0x28a)](),this[_0x78215f(0x297)](),this['createArrowSprite'](),this[_0x78215f(0x1d9)](!![]);},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x217)]=function(){const _0x526b51=_0x3ee134;if(!Sprite_FieldGaugeATB[_0x526b51(0x1c9)][_0x526b51(0x29f)])return;const _0x5456b5=Sprite_FieldGaugeATB['Settings'],_0x1068c6=this[_0x526b51(0x287)]===$gameParty?_0x526b51(0x12f):_0x526b51(0x21a),_0x3c9627=_0x526b51(0x22f)[_0x526b51(0x24a)](_0x1068c6),_0x4ffa7f=new Sprite();_0x4ffa7f['anchor']['x']=this['anchor']['x'],_0x4ffa7f[_0x526b51(0x109)]['y']=this['anchor']['y'];if(_0x5456b5[_0x3c9627])_0x4ffa7f['bitmap']=ImageManager[_0x526b51(0x211)](_0x5456b5[_0x3c9627]);else{const _0x45514e=_0x5456b5['MarkerSize'];_0x4ffa7f[_0x526b51(0x1dd)]=new Bitmap(_0x45514e,_0x45514e);const _0x26a9e0=ColorManager[_0x526b51(0x2b9)](_0x5456b5[_0x526b51(0x2b2)[_0x526b51(0x24a)](_0x1068c6)]),_0x18c181=ColorManager['getColor'](_0x5456b5['%1BgColor2'[_0x526b51(0x24a)](_0x1068c6)]);_0x4ffa7f[_0x526b51(0x1dd)][_0x526b51(0x2b0)](0x0,0x0,_0x45514e,_0x45514e,_0x26a9e0,_0x18c181,!![]);}this[_0x526b51(0x1f9)]=_0x4ffa7f,this[_0x526b51(0x1f4)](this['_backgroundSprite']),this[_0x526b51(0x10c)]=this['_backgroundSprite']['width'],this[_0x526b51(0xe3)]=this[_0x526b51(0x1f9)][_0x526b51(0xe3)];},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x1a2)]=function(){const _0x12966e=_0x3ee134,_0x23675f=new Sprite();_0x23675f['anchor']['x']=this[_0x12966e(0x109)]['x'],_0x23675f[_0x12966e(0x109)]['y']=this[_0x12966e(0x109)]['y'],this[_0x12966e(0x201)]=_0x23675f,this[_0x12966e(0x1f4)](this[_0x12966e(0x201)]),this[_0x12966e(0x23e)]();},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x28a)]=function(){const _0x49dab4=_0x3ee134;if(!Sprite_FieldGaugeATB[_0x49dab4(0x1c9)][_0x49dab4(0x19d)])return;const _0x21564e=Sprite_FieldGaugeATB[_0x49dab4(0x1c9)],_0x315b38=this['_unit']===$gameParty?_0x49dab4(0x12f):'Enemy',_0x49ce82=_0x49dab4(0x1f0)[_0x49dab4(0x24a)](_0x315b38),_0x48e034=new Sprite();_0x48e034[_0x49dab4(0x109)]['x']=this[_0x49dab4(0x109)]['x'],_0x48e034[_0x49dab4(0x109)]['y']=this[_0x49dab4(0x109)]['y'];if(_0x21564e[_0x49ce82])_0x48e034[_0x49dab4(0x1dd)]=ImageManager[_0x49dab4(0x211)](_0x21564e[_0x49ce82]);else{let _0x1496fb=_0x21564e[_0x49dab4(0x2d0)],_0x4ac874=_0x21564e[_0x49dab4(0x2a7)];_0x48e034[_0x49dab4(0x1dd)]=new Bitmap(_0x1496fb,_0x1496fb);const _0x1f678c='#000000',_0x4ee86c=ColorManager[_0x49dab4(0x2b9)](_0x21564e[_0x49dab4(0x1c1)[_0x49dab4(0x24a)](_0x315b38)]);_0x48e034[_0x49dab4(0x1dd)][_0x49dab4(0x14f)](0x0,0x0,_0x1496fb,_0x1496fb,_0x1f678c),_0x1496fb-=0x2,_0x48e034[_0x49dab4(0x1dd)]['fillRect'](0x1,0x1,_0x1496fb,_0x1496fb,_0x4ee86c),_0x1496fb-=_0x4ac874*0x2,_0x48e034[_0x49dab4(0x1dd)][_0x49dab4(0x14f)](0x1+_0x4ac874,0x1+_0x4ac874,_0x1496fb,_0x1496fb,_0x1f678c),_0x1496fb-=0x2,_0x4ac874+=0x1,_0x48e034['bitmap'][_0x49dab4(0x117)](0x1+_0x4ac874,0x1+_0x4ac874,_0x1496fb,_0x1496fb);}this['_backgroundSprite']=_0x48e034,this[_0x49dab4(0x1f4)](this[_0x49dab4(0x1f9)]);},Sprite_FieldMarkerATB['prototype'][_0x3ee134(0x297)]=function(){const _0x25c39a=_0x3ee134,_0x29a649=Sprite_FieldGaugeATB[_0x25c39a(0x1c9)];if(!_0x29a649[_0x25c39a(0x21d)])return;if(this[_0x25c39a(0x287)]===$gameParty)return;const _0x6c8703=_0x29a649['MarkerSize'],_0x555c5f=new Sprite();_0x555c5f['anchor']['x']=this[_0x25c39a(0x109)]['x'],_0x555c5f[_0x25c39a(0x109)]['y']=this[_0x25c39a(0x109)]['y'],_0x555c5f['bitmap']=new Bitmap(_0x6c8703,_0x6c8703),this[_0x25c39a(0x255)]=_0x555c5f,this[_0x25c39a(0x1f4)](this[_0x25c39a(0x255)]);},Sprite_FieldMarkerATB['prototype'][_0x3ee134(0x2e6)]=function(){const _0x38638d=_0x3ee134,_0x18e862=Sprite_FieldGaugeATB[_0x38638d(0x1c9)];if(!_0x18e862['ShowMarkerArrow'])return;const _0x46de2c=new Sprite();_0x46de2c['anchor']['x']=this[_0x38638d(0x109)]['x'],_0x46de2c[_0x38638d(0x109)]['y']=this['anchor']['y'],this[_0x38638d(0x22d)](_0x46de2c),this[_0x38638d(0x310)]=_0x46de2c,this['addChild'](this[_0x38638d(0x310)]);},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)]['setupArrowSprite']=function(_0x213703){const _0x2467fd=_0x3ee134,_0x22550a=Sprite_FieldGaugeATB[_0x2467fd(0x1c9)],_0x123dd0=_0x22550a[_0x2467fd(0x2d0)],_0x4c3f6e=Math['round'](_0x123dd0/0x2),_0x5f5144=this[_0x2467fd(0x226)](),_0x540abb=this[_0x2467fd(0x287)]===$gameParty?_0x2467fd(0x12f):_0x2467fd(0x21a),_0xf1686=_0x22550a[_0x2467fd(0x292)[_0x2467fd(0x24a)](_0x540abb)];_0x213703[_0x2467fd(0x1dd)]=ImageManager['loadSystem'](_0x22550a['MarkerArrowWindowSkin']);const _0x9177f9=0x18,_0x1a734c=_0x9177f9/0x2,_0x2e4e7f=0x60+_0x9177f9,_0x14716c=0x0+_0x9177f9;if(_0x5f5144&&_0xf1686){if(_0x2467fd(0x2d5)!==_0x2467fd(0x150))_0x213703[_0x2467fd(0x15b)](_0x2e4e7f+_0x1a734c,_0x14716c+_0x1a734c+_0x9177f9,_0x9177f9,_0x1a734c),_0x213703['y']+=_0x4c3f6e,_0x213703[_0x2467fd(0x109)]['y']=0x0;else{const _0x297956=new _0x5abd39(_0x41bc57,_0x3bfa88,this['_gaugeSprite']);this[_0x2467fd(0x1ef)]['addChild'](_0x297956);}}else{if(_0x5f5144&&!_0xf1686)_0x213703[_0x2467fd(0x15b)](_0x2e4e7f+_0x1a734c,_0x14716c,_0x9177f9,_0x1a734c),_0x213703['y']-=_0x4c3f6e,_0x213703[_0x2467fd(0x109)]['y']=0x1;else{if(!_0x5f5144&&_0xf1686)'fOOvP'!==_0x2467fd(0x143)?(_0x213703[_0x2467fd(0x15b)](_0x2e4e7f,_0x14716c+_0x1a734c,_0x1a734c,_0x9177f9),_0x213703['x']-=Math[_0x2467fd(0x12b)](_0x4c3f6e*1.75),_0x213703[_0x2467fd(0x109)]['x']=0x0):(_0x1f4a9e[_0x2467fd(0x15b)](_0x2c2994+_0x27ebf5+_0x45d33d,_0x4a0a6f+_0x3a79f4,_0x9931c7,_0x548398),_0x3e31eb['x']+=_0x31a3c0['ceil'](_0x6d1cdf*1.75),_0x3e73f4[_0x2467fd(0x109)]['x']=0x1);else!_0x5f5144&&!_0xf1686&&(_0x213703[_0x2467fd(0x15b)](_0x2e4e7f+_0x9177f9+_0x1a734c,_0x14716c+_0x1a734c,_0x1a734c,_0x9177f9),_0x213703['x']+=Math[_0x2467fd(0x12b)](_0x4c3f6e*1.75),_0x213703['anchor']['x']=0x1);}}},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x2c4)]=function(){const _0x590ae2=_0x3ee134;return this[_0x590ae2(0x287)]===$gameParty?$gameParty['battleMembers']()[this[_0x590ae2(0x1ff)]]:$gameTroop[_0x590ae2(0x23c)]()[this[_0x590ae2(0x1ff)]];},Sprite_FieldMarkerATB['prototype'][_0x3ee134(0x2a8)]=function(){const _0x4194ad=_0x3ee134;Sprite_Clickable['prototype'][_0x4194ad(0x2a8)][_0x4194ad(0x20c)](this),this[_0x4194ad(0x2ef)](),this[_0x4194ad(0x153)](),this['updatePositionOnGauge'](),this[_0x4194ad(0x15c)](),this['updateGraphicHue'](),this[_0x4194ad(0xfe)](),this['updateSelectionEffect']();},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)]['updateOpacity']=function(){const _0x522e2a=_0x3ee134,_0x18d80f=this[_0x522e2a(0x22a)](),_0x2ca33f=Sprite_FieldGaugeATB[_0x522e2a(0x1c9)][_0x522e2a(0x127)];if(this[_0x522e2a(0xe2)]>_0x18d80f)this[_0x522e2a(0xe2)]=Math[_0x522e2a(0x1c4)](_0x18d80f,this[_0x522e2a(0xe2)]-_0x2ca33f);else this[_0x522e2a(0xe2)]<_0x18d80f&&(this[_0x522e2a(0xe2)]=Math['min'](_0x18d80f,this[_0x522e2a(0xe2)]+_0x2ca33f));},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x22a)]=function(){const _0x5e6772=_0x3ee134,_0x2d6723=this[_0x5e6772(0x2c4)]();if(!_0x2d6723)return 0x0;if(_0x2d6723['isHidden']())return 0x0;if(_0x2d6723[_0x5e6772(0x1bf)]())return 0x0;return 0xff;},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)]['isGaugeHorizontal']=function(){const _0x2cefdd=_0x3ee134;if(this[_0x2cefdd(0x174)]!==undefined)return this['_horz'];const _0x3cb3f2=Sprite_FieldGaugeATB[_0x2cefdd(0x1c9)][_0x2cefdd(0x199)];return this[_0x2cefdd(0x174)]=[_0x2cefdd(0x175),_0x2cefdd(0x235)]['includes'](_0x3cb3f2),this[_0x2cefdd(0x174)];},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x153)]=function(){const _0x3c845b=_0x3ee134,_0x28b480=Sprite_FieldGaugeATB['Settings'],_0x2d9a94=this[_0x3c845b(0x226)](),_0x5b5d75=this[_0x3c845b(0x287)]===$gameParty?_0x3c845b(0x12f):_0x3c845b(0x21a),_0x9f639c=_0x28b480[_0x3c845b(0x262)],_0x30d0e1=_0x28b480[_0x3c845b(0x292)[_0x3c845b(0x24a)](_0x5b5d75)];_0x2d9a94?(this['y']=_0x28b480[_0x3c845b(0x1fd)]/0x2,this['y']+=_0x30d0e1?-_0x9f639c:_0x9f639c):(this['x']=_0x28b480[_0x3c845b(0x1fd)]/0x2,this['x']+=_0x30d0e1?_0x9f639c:-_0x9f639c);},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)]['updatePositionOnGauge']=function(_0xb71a66){const _0x62f34a=_0x3ee134,_0x17b39c=this[_0x62f34a(0x2c4)]();if(!_0x17b39c)return;const _0x435a50=Sprite_FieldGaugeATB['Settings'],_0x424cf2=this[_0x62f34a(0x226)](),_0x3a3b1f=this['targetPositionOnGauge'](),_0x10eeaf=_0xb71a66?Infinity:_0x435a50['MarkerSpeed'];if(_0x424cf2&&this['x']!==_0x3a3b1f){if(this['x']>_0x3a3b1f)this['x']=Math[_0x62f34a(0x1c4)](_0x3a3b1f,this['x']-_0x10eeaf);if(this['x']<_0x3a3b1f)this['x']=Math[_0x62f34a(0xe7)](_0x3a3b1f,this['x']+_0x10eeaf);}else{if(!_0x424cf2&&this['x']!==_0x3a3b1f){if(this['y']>_0x3a3b1f)this['y']=Math['max'](_0x3a3b1f,this['y']-_0x10eeaf);if(this['y']<_0x3a3b1f)this['y']=Math[_0x62f34a(0xe7)](_0x3a3b1f,this['y']+_0x10eeaf);}}},Sprite_FieldMarkerATB['prototype']['targetPositionOnGauge']=function(){const _0xcd944b=_0x3ee134,_0x50e878=Sprite_FieldGaugeATB[_0xcd944b(0x1c9)],_0x512039=this[_0xcd944b(0x2c4)](),_0x5a0800=this[_0xcd944b(0x226)](),_0x19fa9e=this[_0xcd944b(0x148)]['bitmap'][_0xcd944b(0x10c)],_0x2f8aef=this[_0xcd944b(0x148)][_0xcd944b(0x1dd)][_0xcd944b(0xe3)],_0x148f74=_0x50e878[_0xcd944b(0x294)][_0xcd944b(0x225)](0x0,0x1),_0x44050f=_0x50e878[_0xcd944b(0x1d8)];let _0x2cb918=_0x512039[_0xcd944b(0x2a0)]()*_0x148f74;_0x2cb918+=(0x1-_0x148f74)*_0x512039[_0xcd944b(0x271)]();if(_0x512039===BattleManager['_subject'])_0x2cb918=0x1;if(!_0x44050f)_0x2cb918=0x1-_0x2cb918;let _0x3f1a8a=0x0;if(_0x5a0800)_0x3f1a8a=_0x2cb918*_0x19fa9e;else!_0x5a0800&&(_0x3f1a8a=_0x2cb918*_0x2f8aef);return Math['round'](_0x3f1a8a);},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)]['updateGraphic']=function(){const _0x45aaed=_0x3ee134,_0x5a1526=this[_0x45aaed(0x2c4)]();if(!_0x5a1526)return;const _0x374d66=Sprite_FieldGaugeATB['Settings'],_0x56cc28=this[_0x45aaed(0x287)]===$gameParty?_0x45aaed(0x12f):_0x45aaed(0x21a);let _0x26d00c=_0x5a1526[_0x45aaed(0x1e7)]();if(_0x5a1526['isActor']()&&_0x26d00c===_0x45aaed(0x138))_0x26d00c=_0x45aaed(0xf3);else _0x5a1526[_0x45aaed(0x189)]()&&_0x26d00c==='svactor'&&(_0x26d00c='enemy');if(this[_0x45aaed(0x18f)]!==_0x26d00c){if(_0x45aaed(0xe4)===_0x45aaed(0x1e1)){if(this[_0x45aaed(0xec)]!==_0x2af82f[_0x45aaed(0x254)]())return this[_0x45aaed(0x23e)]();}else return this['processUpdateGraphic']();}switch(this[_0x45aaed(0x18f)]){case _0x45aaed(0xf3):if(this[_0x45aaed(0x2ea)]!==_0x5a1526[_0x45aaed(0x1ab)]())return this[_0x45aaed(0x23e)]();if(this[_0x45aaed(0x1b0)]!==_0x5a1526[_0x45aaed(0xf5)]())return this[_0x45aaed(0x23e)]();break;case _0x45aaed(0x2df):if(this[_0x45aaed(0x2c6)]!==_0x5a1526[_0x45aaed(0x2ae)]()){if(_0x45aaed(0x164)===_0x45aaed(0x164))return this[_0x45aaed(0x23e)]();else{if(!_0x32c179['isATB']())return;_0x65f8e1[_0x45aaed(0x2d4)][_0x45aaed(0x1c9)]['Options']['AddOption']&&this['addBattleSystemATBShowGaugeCommand']();}}break;case _0x45aaed(0x138):if(_0x5a1526[_0x45aaed(0x248)]()){if(_0x45aaed(0x11d)===_0x45aaed(0x11d)){if(this[_0x45aaed(0xec)]!==_0x5a1526[_0x45aaed(0x2f9)]()){if(_0x45aaed(0x246)!==_0x45aaed(0x246))this['y']=_0x2bd9a0[_0x45aaed(0x1fd)]/0x2,this['y']+=_0x57121b?-_0x4f28d3:_0x44254f;else return this[_0x45aaed(0x23e)]();}}else return _0x332f31[_0x45aaed(0x204)]()?this[_0x45aaed(0x2b8)]():_0x11c5d8[_0x45aaed(0x2d4)][_0x45aaed(0x17d)][_0x45aaed(0x20c)](this);}else{if(this[_0x45aaed(0x2db)]!==_0x5a1526[_0x45aaed(0x254)]())return this[_0x45aaed(0x23e)]();}break;case _0x45aaed(0x168):if(_0x5a1526[_0x45aaed(0x21b)]()){if(this[_0x45aaed(0xec)]!==_0x5a1526[_0x45aaed(0x254)]())return this['processUpdateGraphic']();}else{if(this['_graphicEnemy']!==_0x5a1526[_0x45aaed(0x254)]())return this[_0x45aaed(0x23e)]();}break;}},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x23e)]=function(){const _0x3675ed=_0x3ee134,_0xb0564c=this[_0x3675ed(0x2c4)]();if(!_0xb0564c)return;this['_graphicType']=_0xb0564c[_0x3675ed(0x1e7)]();if(_0xb0564c[_0x3675ed(0x21b)]()&&this[_0x3675ed(0x18f)]===_0x3675ed(0x138)){if(_0x3675ed(0x2be)!==_0x3675ed(0x2be)){const _0x4ef01c=this[_0x3675ed(0x138)]()[_0x3675ed(0x29b)];if(_0x4ef01c['match'](/<ATB FIELD GAUGE FACE:[ ](.*),[ ](\d+)>/i))return _0x40bb5c(_0x18813b['$1']);return _0x2bc498['Settings'][_0x3675ed(0x1f6)];}else this[_0x3675ed(0x18f)]=_0x3675ed(0xf3);}else _0xb0564c['isEnemy']()&&this['_graphicType']===_0x3675ed(0x168)&&(_0x3675ed(0x128)!==_0x3675ed(0x128)?this[_0x3675ed(0x2bc)](_0x2ae1c8):this['_graphicType']=_0x3675ed(0x138));let _0x1af34e;switch(this['_graphicType']){case _0x3675ed(0xf3):this[_0x3675ed(0x2ea)]=_0xb0564c[_0x3675ed(0x1ab)](),this[_0x3675ed(0x1b0)]=_0xb0564c[_0x3675ed(0xf5)](),_0x1af34e=ImageManager[_0x3675ed(0x245)](this[_0x3675ed(0x2ea)]),_0x1af34e['addLoadListener'](this['changeFaceGraphicBitmap']['bind'](this,_0x1af34e));break;case'icon':this['_graphicIconIndex']=_0xb0564c[_0x3675ed(0x2ae)](),_0x1af34e=ImageManager['loadSystem'](_0x3675ed(0xed)),_0x1af34e[_0x3675ed(0x2a1)](this['changeIconGraphicBitmap']['bind'](this,_0x1af34e));break;case _0x3675ed(0x138):if(_0xb0564c[_0x3675ed(0x248)]())_0x3675ed(0x1e5)===_0x3675ed(0x1bb)?_0x1c35f6[_0x3675ed(0x13c)]=![]:(this[_0x3675ed(0xec)]=_0xb0564c['svBattlerName'](),_0x1af34e=ImageManager['loadSvActor'](this['_graphicSv']),_0x1af34e['addLoadListener'](this['changeSvActorGraphicBitmap'][_0x3675ed(0xfd)](this,_0x1af34e)));else{if($gameSystem[_0x3675ed(0x2a4)]())this[_0x3675ed(0x2db)]=_0xb0564c[_0x3675ed(0x254)](),_0x1af34e=ImageManager[_0x3675ed(0x30b)](this['_graphicEnemy']),_0x1af34e['addLoadListener'](this[_0x3675ed(0x1b6)]['bind'](this,_0x1af34e));else{if(_0x3675ed(0x316)!==_0x3675ed(0x316)){const _0xacd4e2=_0x476471[_0x3675ed(0x2d4)]['ConfigManager_makeData']['call'](this);return _0xacd4e2[_0x3675ed(0x166)]=this[_0x3675ed(0x166)],_0xacd4e2;}else this['_graphicEnemy']=_0xb0564c[_0x3675ed(0x254)](),_0x1af34e=ImageManager[_0x3675ed(0x234)](this[_0x3675ed(0x2db)]),_0x1af34e[_0x3675ed(0x2a1)](this['changeEnemyGraphicBitmap'][_0x3675ed(0xfd)](this,_0x1af34e));}}break;case _0x3675ed(0x168):this[_0x3675ed(0xec)]=_0xb0564c[_0x3675ed(0x254)](),_0x1af34e=ImageManager[_0x3675ed(0x27d)](this[_0x3675ed(0xec)]),_0x1af34e[_0x3675ed(0x2a1)](this[_0x3675ed(0xfa)][_0x3675ed(0xfd)](this,_0x1af34e));break;}},Sprite_FieldMarkerATB['prototype'][_0x3ee134(0x145)]=function(_0x45dc85){const _0x1467f6=_0x3ee134,_0x3bd478=Sprite_FieldGaugeATB[_0x1467f6(0x1c9)],_0x4bd2d4=_0x3bd478[_0x1467f6(0x2d0)],_0x34180f=this[_0x1467f6(0x1b0)];this['_graphicSprite'][_0x1467f6(0x1dd)]=new Bitmap(_0x4bd2d4,_0x4bd2d4);const _0x957668=this[_0x1467f6(0x201)][_0x1467f6(0x1dd)],_0x4cd1d0=ImageManager['faceWidth'],_0x478a47=ImageManager[_0x1467f6(0x30f)],_0x42a002=ImageManager[_0x1467f6(0x13a)],_0x1a2c61=ImageManager[_0x1467f6(0x30f)],_0x5070cb=_0x34180f%0x4*_0x4cd1d0+(_0x4cd1d0-_0x42a002)/0x2,_0x275dcb=Math[_0x1467f6(0x1ba)](_0x34180f/0x4)*_0x478a47+(_0x478a47-_0x1a2c61)/0x2;_0x957668[_0x1467f6(0x10a)](_0x45dc85,_0x5070cb,_0x275dcb,_0x42a002,_0x1a2c61,0x0,0x0,_0x4bd2d4,_0x4bd2d4);},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x1be)]=function(_0x13d6e4){const _0x4613ce=_0x3ee134,_0x3fc96b=Sprite_FieldGaugeATB[_0x4613ce(0x1c9)],_0x261597=_0x3fc96b[_0x4613ce(0x2d0)],_0x47a537=this['_graphicIconIndex'];this[_0x4613ce(0x201)]['bitmap']=new Bitmap(_0x261597,_0x261597);const _0x4ee7ff=this[_0x4613ce(0x201)][_0x4613ce(0x1dd)],_0x1eae48=ImageManager[_0x4613ce(0x13d)],_0x2fa5b3=ImageManager[_0x4613ce(0x137)],_0x195485=_0x47a537%0x10*_0x1eae48,_0x4c76ca=Math[_0x4613ce(0x1ba)](_0x47a537/0x10)*_0x2fa5b3;_0x4ee7ff[_0x4613ce(0x10a)](_0x13d6e4,_0x195485,_0x4c76ca,_0x1eae48,_0x2fa5b3,0x0,0x0,_0x261597,_0x261597);},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)]['changeSvActorGraphicBitmap']=function(_0x21907b){const _0x24019b=_0x3ee134,_0x33f773=Sprite_FieldGaugeATB[_0x24019b(0x1c9)],_0x5439a0=_0x33f773[_0x24019b(0x2d0)];this[_0x24019b(0x201)][_0x24019b(0x1dd)]=new Bitmap(_0x5439a0,_0x5439a0);const _0x512bf1=this['_graphicSprite'][_0x24019b(0x1dd)],_0x1184d2=this[_0x24019b(0xec)][_0x24019b(0x2e2)](/\$/i),_0x11f861=_0x1184d2?0x1:ImageManager['svActorHorzCells'],_0x2655e6=_0x1184d2?0x1:ImageManager['svActorVertCells'],_0x597672=_0x21907b['width']/_0x11f861,_0x66f0f8=_0x21907b['height']/_0x2655e6,_0x4f139d=Math['min'](0x1,_0x5439a0/_0x597672,_0x5439a0/_0x66f0f8),_0x20df3d=_0x597672*_0x4f139d,_0x175292=_0x66f0f8*_0x4f139d,_0x4f0820=Math[_0x24019b(0xee)]((_0x5439a0-_0x20df3d)/0x2),_0x375669=Math[_0x24019b(0xee)]((_0x5439a0-_0x175292)/0x2);_0x512bf1[_0x24019b(0x10a)](_0x21907b,0x0,0x0,_0x597672,_0x66f0f8,_0x4f0820,_0x375669,_0x20df3d,_0x175292);},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x1b6)]=function(_0x1c4cdb){const _0x4cb853=_0x3ee134,_0x15cf69=Sprite_FieldGaugeATB[_0x4cb853(0x1c9)],_0x1d1371=_0x15cf69[_0x4cb853(0x2d0)];this['_graphicSprite']['bitmap']=new Bitmap(_0x1d1371,_0x1d1371);const _0x5f2716=this[_0x4cb853(0x201)][_0x4cb853(0x1dd)],_0x48f70a=Math['min'](0x1,_0x1d1371/_0x1c4cdb[_0x4cb853(0x10c)],_0x1d1371/_0x1c4cdb['height']),_0x3b1fd4=_0x1c4cdb[_0x4cb853(0x10c)]*_0x48f70a,_0x3854d7=_0x1c4cdb[_0x4cb853(0xe3)]*_0x48f70a,_0x3002b2=Math['round']((_0x1d1371-_0x3b1fd4)/0x2),_0x5a49cb=Math[_0x4cb853(0xee)]((_0x1d1371-_0x3854d7)/0x2);_0x5f2716['blt'](_0x1c4cdb,0x0,0x0,_0x1c4cdb[_0x4cb853(0x10c)],_0x1c4cdb['height'],_0x3002b2,_0x5a49cb,_0x3b1fd4,_0x3854d7);},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x2b5)]=function(){const _0x208e1b=_0x3ee134,_0x1f6ac9=this['battler']();if(!_0x1f6ac9)return;if(!_0x1f6ac9[_0x208e1b(0x189)]())return;if(this[_0x208e1b(0x1b5)]===_0x1f6ac9['battlerHue']())return;this[_0x208e1b(0x1b5)]=_0x1f6ac9[_0x208e1b(0x223)](),this[_0x208e1b(0x201)]['setHue'](_0x1f6ac9[_0x208e1b(0x248)]()?0x0:this['_graphicHue']);},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0xfe)]=function(){const _0x48c769=_0x3ee134;if(!this[_0x48c769(0x255)])return;const _0x195560=this['battler']();if(!_0x195560)return;if(this[_0x48c769(0x1eb)]===_0x195560[_0x48c769(0x1eb)]&&this[_0x48c769(0x289)]===_0x195560[_0x48c769(0x289)])return;this[_0x48c769(0x1eb)]=_0x195560['_letter'],this[_0x48c769(0x289)]=_0x195560[_0x48c769(0x289)];const _0x25c3a4=Sprite_FieldGaugeATB[_0x48c769(0x1c9)],_0x3c7f0b=_0x25c3a4[_0x48c769(0x2d0)],_0x476b99=Math['floor'](_0x3c7f0b/0x2),_0x44a1f5=this['_letterSprite'][_0x48c769(0x1dd)];_0x44a1f5['clear']();if(!this[_0x48c769(0x289)])return;_0x44a1f5[_0x48c769(0x192)]=_0x25c3a4[_0x48c769(0x114)]||$gameSystem[_0x48c769(0x13b)](),_0x44a1f5[_0x48c769(0x2e0)]=_0x25c3a4[_0x48c769(0x244)]||0x10,_0x44a1f5['drawText'](this['_letter'],0x2,_0x476b99,_0x3c7f0b-0x4,_0x476b99-0x2,'right');},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x1af)]=function(){const _0x2e424e=_0x3ee134,_0x6dc8f8=this[_0x2e424e(0x2c4)]();if(!_0x6dc8f8)return;const _0xde6002=_0x6dc8f8[_0x2e424e(0x2c4)]();if(!_0xde6002)return;const _0x3322d2=_0xde6002[_0x2e424e(0x165)]();if(!_0x3322d2)return;this[_0x2e424e(0x2e9)](_0x3322d2['_blendColor']);},Sprite_FieldMarkerATB[_0x3ee134(0x1bc)][_0x3ee134(0x18d)]=function(){const _0x1de71e=_0x3ee134;return this[_0x1de71e(0x2c4)]();};