//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.90;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.90] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Auto Save After New Game
 * 
 * Normally, when starting a new game through the "New Game" option, there is
 * no auto save trigger. However, if you start a new game or load a saved game,
 * then go to the Game End screen, return back to the title screen, then start
 * a New Game, the auto save trigger occurs when it shouldn't. The Core Engine
 * will now patch this and prevent the trigger from taking place.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
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
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 * - This does NOT set the max cap to be lower than the default cap.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * 
 * ---
 * 
 * === Tileset-Related Notetags ===
 * 
 * ---
 * 
 * <Taller By x: id>
 * 
 * - Used for: Tileset Notetags
 * - Changes any page B, C, D, E tile marked by terrain tag 'id' to be taller
 *   by 'x' tiles.
 *   - Replace 'x' with a number representing the tiles to be taller by.
 *   - Replace 'id' with a number representing the Terrain Tag you will use to
 *     mark this tile with in the Database editor.
 * - When placing these tiles on the map, all you have to do is just place the
 *   bottom tile.
 *   - ie.: For a tree that's one tile taller, just place the tile at the
 *     bottom where you see the trunk.
 *   - Then, in-game, the tree will appear taller by one tile as marked.
 * - Depending on the priority settings, the tile will appear on different
 *   layers.
 *   - O will place the tile on the below player layer.
 *   - X will place the tile on the same level as the player.
 *   - ★ will place the tile on the above player layer.
 *   - O/X layer tiles have a special property where tall sprites standing in
 *     front of it will no longer clip the top of the sprite, while sprites
 *     standing behind it will be covered by it.
 *   - The X layer sprite will only have a hitbox of 1x1 at the base.
 * - This does not work with events using tiles as graphics. Instead, if you
 *   want to do similar, use the Event & Movement Core's <Tile Expand> notetags
 *   for better control.
 * 
 * ---
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want to use it automatically.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 * - Use 'user' to refer to the currently equipping actor.
 *   - If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 *   - Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 *   - Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 *   - Turn this off if you do not want it.
 *   - You are responsible for any infinite loops this may cause.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <Grid>
 * <Battle Grid>
 * 
 * <No Grid>
 * <No Battle Grid>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Requires VisuMZ_2_BattleGridSystem!
 * - Changes the battle system to utilize the Battle Grid System or not.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * - If none of these notetags or comment tags are found, refer to the default
 *   settings found in the Plugin Parameters.
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
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Volume
 * - Changes the current BGS volume without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Volume:
 *   - Change the current BGS's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pitch
 * - Changes the current BGS pitch without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pitch:
 *   - Change the current BGS's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGS Pan
 * - Changes the current BGS pan without changing any of the current BGS's
 *   other properties and without restarting the BGS.
 * 
 *   Pan:
 *   - Change the current BGS's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 * 
 *   CTRL + n: Quick Load:
 *   - CTRL + a number from 1 to 9 will yield a quick load of that safe file.
 *   - Does not count auto saves.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - If multiple targets are recorded, then the first of the recorded
 *       targets will be set for this variable.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *     - This means you need to go to your own project's rmmz_core.js and
 *       modify Input.keyMapper to have buttons with "cancel" and "menu"
 *       instead of only "escape".
 *     - If there are none found, an error message will appear telling you to
 *       do so, or set the 'Split "Escape"' option to false.
 *     - If you are using Options Core's Rebind Keyboard option, be sure to
 *       have those have "cancel" and "menu" options inside there, too.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 * 
 *   Convert JS To Base?:
 *   - Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *     parameters to prevent infinite loops.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 * 
 *   State Icons Non-Frame:
 *   - Replace sprite frame system for non-frame.
 *   - Better for any instances where icons are zoomed.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Enable Masking:
 *   - Enable window masking (windows hide other windows behind them)?
 *   - WARNING: Turning it on can obscure data.
 * 
 *   Correct Skin Bleed:
 *   - Allows you to enable/disable the window skin bleeding correction for
 *     those who wish to use the 95 calculator instead of 96 to augment higher
 *     and larger screen resolutions.
 *   - Read the "Bug Fixes" section if you don't understand what the window
 *     skin bleeding problem is.
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * Version 1.90: February 16, 2026
 * * Feature Update!
 * ** Battle System settings for "TPB Active" and "TPB Wait" will no longer
 *    conflict with VisuMZ_2_BattleSystemATB and VisuMZ_1_OptionsCore "Active"
 *    or "Wait" mode options set by the player.
 * 
 * Version 1.89: December 15, 2025
 * * Feature Update!
 * ** Added extra failsafes to ensure TPB Charge Time does not become NaN or
 *    an illegal value. Update made by Arisu.
 * 
 * Version 1.88: September 18, 2025
 * * Documentation Update!
 * ** Extra notes for <JS param Plus/Rate/Flat: code> notetags
 * *** Use 'user' to refer to the currently equipping actor.
 * *** If you use code to refer to an actor's other stats like 'atk' and 'def',
 *     there is the potential to cause an infinite loop.
 * *** Use 'user.paramBase(x)' instead of 'user.atk', 'user.def', etc.
 * *** Plugin Parameter setting Parameters > "Convert JS To Base?" will
 *     automatically convert any instances of 'user.mhp', 'user.mmp',
 *     'user.atk', etc. to their base parameters.
 * *** Turn this off if you do not want it.
 * *** You are responsible for any infinite loops this may cause.
 * * Feature Update!
 * ** <JS param Plus/Rate/Flat: code> now support 'user' as a variable.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Parameters > Convert JS To Base?
 * **** Automatically convert <JS param Plus/Rate/Flat: code> to use base
 *      parameters to prevent infinite loops.
 * 
 * Version 1.87: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * *** Better compatibility with different icon sizes.
 * * Documentation Update!
 * ** Under Plugin Parameters: Menu Button Assist Window
 * *** Added text segments under Split "Escape"
 * **** This means you need to go to your own project's rmmz_core.js and
 *      modify Input.keyMapper to have buttons with "cancel" and "menu"
 *      instead of only "escape".
 * **** If there are none found, an error message will appear telling you to
 *      do so, or set the 'Split "Escape"' option to false.
 * **** If you are using Options Core's Rebind Keyboard option, be sure to
 *      have those have "cancel" and "menu" options inside there, too.
 * * Feature Update!
 * ** Plugin Parameters > Button Assist > Split "Escape" will now show an error
 *    message if a custom Input.keyMapper is not found with the "cancel" and
 *    "menu" keys implemented. Update made by Irina.
 * ** Updated Plugin Parameters > Button Assist > Split "Escape" description
 *    for Plugin Parameters to add in the following text: Requires custom
 *    Input.keyMapper with "cancel" and "menu".
 * ** Added better compatibility with WASD controls as to prioritize showing
 *    the arrow keys rather than the W, A, S, D keys. Also applies to any other
 *    rebindings.
 * 
 * Version 1.86: January 16, 2025
 * * Bug Fixes!
 * ** Fixed an issue where certain icons were not aligning properly at
 *    different line height settings. Fix made by Olivia.
 * 
 * Version 1.85: October 17, 2024
 * * Feature Updates!
 * ** Updated to fit RPG Maker MZ's updated 1.8.1 version better.
 * 
 * Version 1.84: August 29, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New notetags added by Arisu:
 * *** Tileset Notetag: <Taller By x: id>
 * **** Changes any page B, C, D, E tile marked by terrain tag 'id' to be
 *      taller by 'x' tiles.
 * **** When placing these tiles on the map, all you have to do is just place
 *      the bottom tile.
 * ***** ie.: For a tree that's one tile taller, just place the tile at the
 *       bottom where you see the trunk. Then, in-game, the tree will appear
 *       taller by one tile as marked.
 * **** O/X layer tiles have a special property where tall sprites standing in
 *      front of it will no longer clip the top of the sprite, while sprites
 *      standing behind it will be covered by it.
 * **** This does not work with events using tiles as graphics. Instead, if
 *      you want to do similar, use the Event & Movement Core's <Tile Expand>
 *      notetags for better control.
 * 
 * Version 1.83: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated documentation for <param Max: x> notetag.
 * *** This does not set the max cap to be lower than the default cap.
 * * New Feature!
 * ** New Plugin Parameters added by Olivia:
 * *** Plugin Parameters > UI Settings > State Icons Non-Frame
 * **** Replace sprite frame system for non-frame.
 * **** Better for any instances where icons are zoomed.
 * 
 * Version 1.82: April 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Added failsafe for $textPopup when some windows have not been initialized
 *    and requesting the text popup.
 * * New Feature!
 * ** New Plugin Parameter and playtest shortcut added by Arisu:
 * *** Plugin Parameters > QoL Settings > Playtest > CTRL + n: Quick Load
 * **** CTRL + a number from 1 to 9 will yield a quick load of that save file.
 * **** Does not count auto saves.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.81: February 15, 2024
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added for future plugin: VisuMZ_2_BattleGridSystem
 * *** <Grid>
 * *** <No Grid>
 * **** Requires the future plugin VisuMZ_2_BattleGridSystem!
 * **** Read the help section for more information on these.
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > Window > Correct Skin Bleed
 * **** Allows you to enable/disable the window skin bleeding correction for
 *      those who wish to use the 95 calculator instead of 96 to augment higher
 *      and larger screen resolutions.
 * **** Read the "Bug Fixes" section if you don't understand what the window
 *      skin bleeding problem is.
 * 
 * Version 1.80: January 18, 2024
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Auto Save After New Game
 * **** Normally, when starting a new game through the "New Game" option, there
 *      is no auto save trigger. However, if you start a new game or load a
 *      saved game, then go to the Game End screen, return back to the title
 *      screen, then start a New Game, the auto save trigger occurs when it
 *      shouldn't. The Core Engine will now patch this and prevent the trigger
 *      from taking place.
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param CtrlQuickLoad:eval
 * @text CTRL + n: Quick Load
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc CTRL + a number from 1 to 9 will yield a quick load of
 * that safe file. Does not count auto saves.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * Requires custom Input.keyMapper with "cancel" and "menu".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param ConvertToBase:eval
 * @text Convert JS To Base?
 * @parent BasicParameters
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc Automatically convert <JS param Plus/Rate/Flat: code>
 * to use base parameters to prevent infinite loops.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param StateIconsNonFrame:eval
 * @text State Icons Non-Frame
 * @parent UIArea
 * @type boolean
 * @on Non-Frame
 * @off Normal
 * @desc Replace sprite frame system for non-frame.
 * Better for any instances where icons are zoomed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param CorrectSkinBleeding:eval
 * @text Correct Skin Bleed
 * @parent WindowDefaults
 * @type boolean
 * @on Correct
 * @off Don't Correct
 * @desc Corrects window skin bleeding bug when used with higher
 * screen resolutions?
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x5d7dff=_0x195c;(function(_0x2f5f82,_0x2f9e67){const _0x5e0712=_0x195c,_0x7d9d7a=_0x2f5f82();while(!![]){try{const _0x486699=parseInt(_0x5e0712(0x6bf))/0x1*(parseInt(_0x5e0712(0x153))/0x2)+-parseInt(_0x5e0712(0x1a5))/0x3*(-parseInt(_0x5e0712(0x52e))/0x4)+parseInt(_0x5e0712(0x853))/0x5*(-parseInt(_0x5e0712(0x44c))/0x6)+parseInt(_0x5e0712(0x8da))/0x7+-parseInt(_0x5e0712(0x4c2))/0x8*(parseInt(_0x5e0712(0x76a))/0x9)+parseInt(_0x5e0712(0x427))/0xa+-parseInt(_0x5e0712(0x3a5))/0xb;if(_0x486699===_0x2f9e67)break;else _0x7d9d7a['push'](_0x7d9d7a['shift']());}catch(_0xdd6b86){_0x7d9d7a['push'](_0x7d9d7a['shift']());}}}(_0x5690,0x66bf9));var label='CoreEngine',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x45a514){const _0x35dec5=_0x195c;return _0x45a514[_0x35dec5(0x5b2)]&&_0x45a514[_0x35dec5(0x179)][_0x35dec5(0x617)]('['+label+']');})[0x0];VisuMZ[label][_0x5d7dff(0x37c)]=VisuMZ[label][_0x5d7dff(0x37c)]||{},VisuMZ[_0x5d7dff(0x30b)]=function(_0x5826c4,_0x18d395){const _0x420097=_0x5d7dff;for(const _0x4757dd in _0x18d395){if(_0x4757dd['match'](/(.*):(.*)/i)){const _0x42c6ec=String(RegExp['$1']),_0x4151ca=String(RegExp['$2'])[_0x420097(0x496)]()[_0x420097(0x6b5)]();let _0x20929e,_0x54d1c3,_0x4258fa;switch(_0x4151ca){case _0x420097(0x6c8):_0x20929e=_0x18d395[_0x4757dd]!==''?Number(_0x18d395[_0x4757dd]):0x0;break;case'ARRAYNUM':_0x54d1c3=_0x18d395[_0x4757dd]!==''?JSON[_0x420097(0x4a3)](_0x18d395[_0x4757dd]):[],_0x20929e=_0x54d1c3[_0x420097(0x386)](_0x4f6420=>Number(_0x4f6420));break;case _0x420097(0x3bf):_0x20929e=_0x18d395[_0x4757dd]!==''?eval(_0x18d395[_0x4757dd]):null;break;case _0x420097(0x842):_0x54d1c3=_0x18d395[_0x4757dd]!==''?JSON[_0x420097(0x4a3)](_0x18d395[_0x4757dd]):[],_0x20929e=_0x54d1c3[_0x420097(0x386)](_0x558f83=>eval(_0x558f83));break;case _0x420097(0x812):_0x20929e=_0x18d395[_0x4757dd]!==''?JSON[_0x420097(0x4a3)](_0x18d395[_0x4757dd]):'';break;case'ARRAYJSON':_0x54d1c3=_0x18d395[_0x4757dd]!==''?JSON[_0x420097(0x4a3)](_0x18d395[_0x4757dd]):[],_0x20929e=_0x54d1c3['map'](_0x493055=>JSON[_0x420097(0x4a3)](_0x493055));break;case _0x420097(0x5a4):_0x20929e=_0x18d395[_0x4757dd]!==''?new Function(JSON[_0x420097(0x4a3)](_0x18d395[_0x4757dd])):new Function(_0x420097(0x278));break;case'ARRAYFUNC':_0x54d1c3=_0x18d395[_0x4757dd]!==''?JSON[_0x420097(0x4a3)](_0x18d395[_0x4757dd]):[],_0x20929e=_0x54d1c3[_0x420097(0x386)](_0x56083f=>new Function(JSON[_0x420097(0x4a3)](_0x56083f)));break;case'STR':_0x20929e=_0x18d395[_0x4757dd]!==''?String(_0x18d395[_0x4757dd]):'';break;case _0x420097(0x555):_0x54d1c3=_0x18d395[_0x4757dd]!==''?JSON[_0x420097(0x4a3)](_0x18d395[_0x4757dd]):[],_0x20929e=_0x54d1c3['map'](_0x55e2b7=>String(_0x55e2b7));break;case _0x420097(0x8b7):_0x4258fa=_0x18d395[_0x4757dd]!==''?JSON[_0x420097(0x4a3)](_0x18d395[_0x4757dd]):{},_0x5826c4[_0x42c6ec]={},VisuMZ[_0x420097(0x30b)](_0x5826c4[_0x42c6ec],_0x4258fa);continue;case _0x420097(0x8d5):_0x54d1c3=_0x18d395[_0x4757dd]!==''?JSON[_0x420097(0x4a3)](_0x18d395[_0x4757dd]):[],_0x20929e=_0x54d1c3[_0x420097(0x386)](_0x9505e=>VisuMZ[_0x420097(0x30b)]({},JSON[_0x420097(0x4a3)](_0x9505e)));break;default:continue;}_0x5826c4[_0x42c6ec]=_0x20929e;}}return _0x5826c4;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0xbb)]=SceneManager['exit'],SceneManager[_0x5d7dff(0x3c9)]=function(){const _0x1e0409=_0x5d7dff;VisuMZ[_0x1e0409(0x7ac)][_0x1e0409(0xbb)][_0x1e0409(0x5d5)](this);if(Utils[_0x1e0409(0x6ee)]>=_0x1e0409(0x60e)){if(typeof nw==='object')nw[_0x1e0409(0x2e0)]['quit']();}},(_0x256efd=>{const _0x2d1df6=_0x5d7dff,_0x5291bc=_0x256efd[_0x2d1df6(0x814)];for(const _0x4e37b5 of dependencies){if(!Imported[_0x4e37b5]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2d1df6(0x106)](_0x5291bc,_0x4e37b5)),SceneManager[_0x2d1df6(0x3c9)]();break;}}const _0x106817=_0x256efd[_0x2d1df6(0x179)];if(_0x106817[_0x2d1df6(0x371)](/\[Version[ ](.*?)\]/i)){const _0x42ebc0=Number(RegExp['$1']);_0x42ebc0!==VisuMZ[label][_0x2d1df6(0x342)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x2d1df6(0x106)](_0x5291bc,_0x42ebc0)),SceneManager[_0x2d1df6(0x3c9)]());}if(_0x106817[_0x2d1df6(0x371)](/\[Tier[ ](\d+)\]/i)){const _0x439b63=Number(RegExp['$1']);_0x439b63<tier?(alert(_0x2d1df6(0x662)['format'](_0x5291bc,_0x439b63,tier)),SceneManager[_0x2d1df6(0x3c9)]()):tier=Math[_0x2d1df6(0xee)](_0x439b63,tier);}VisuMZ[_0x2d1df6(0x30b)](VisuMZ[label][_0x2d1df6(0x37c)],_0x256efd[_0x2d1df6(0x896)]);})(pluginData),((()=>{const _0x731f20=_0x5d7dff;if(VisuMZ[_0x731f20(0x7ac)][_0x731f20(0x37c)][_0x731f20(0x116)]['SubfolderParse']??!![])for(const _0x40971f in $plugins){const _0x2a511c=$plugins[_0x40971f];_0x2a511c[_0x731f20(0x814)][_0x731f20(0x371)](/(.*)\/(.*)/i)&&(_0x2a511c['name']=String(RegExp['$2']['trim']()));}})()),PluginManager[_0x5d7dff(0x25f)](pluginData['name'],_0x5d7dff(0x83f),_0x507dcb=>{const _0x5c9c39=_0x5d7dff;if(!SceneManager[_0x5c9c39(0x882)])return;if(!SceneManager[_0x5c9c39(0x882)][_0x5c9c39(0x1cb)])return;VisuMZ['ConvertParams'](_0x507dcb,_0x507dcb);const _0x3c4ef1=Math[_0x5c9c39(0xd6)](_0x507dcb['pointX']),_0x26b1b2=Math[_0x5c9c39(0xd6)](_0x507dcb[_0x5c9c39(0x70e)]);$gameTemp['requestPointAnimation'](_0x3c4ef1,_0x26b1b2,_0x507dcb[_0x5c9c39(0x40d)],_0x507dcb[_0x5c9c39(0x5a5)],_0x507dcb[_0x5c9c39(0x333)]);}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x73d),_0x47b26a=>{const _0x39ebeb=_0x5d7dff;VisuMZ[_0x39ebeb(0x30b)](_0x47b26a,_0x47b26a);const _0x5ebe7b=Math['round'](_0x47b26a[_0x39ebeb(0x2ee)])[_0x39ebeb(0x3aa)](0x0,0x64),_0x2e4f07=AudioManager[_0x39ebeb(0x1a7)];_0x2e4f07&&(_0x2e4f07[_0x39ebeb(0x2ee)]=_0x5ebe7b,_0x2e4f07[_0x39ebeb(0x629)]=AudioManager[_0x39ebeb(0x33a)][_0x39ebeb(0x2db)](),AudioManager[_0x39ebeb(0x300)](_0x2e4f07),AudioManager['playBgm'](_0x2e4f07,_0x2e4f07['pos']),AudioManager[_0x39ebeb(0x33a)][_0x39ebeb(0x335)](_0x2e4f07[_0x39ebeb(0x629)]));}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x6ca),_0x1906e2=>{const _0x43e051=_0x5d7dff;VisuMZ['ConvertParams'](_0x1906e2,_0x1906e2);const _0xf43dec=Math[_0x43e051(0xd6)](_0x1906e2[_0x43e051(0x185)])[_0x43e051(0x3aa)](0x32,0x96),_0x373e59=AudioManager[_0x43e051(0x1a7)];_0x373e59&&(_0x373e59[_0x43e051(0x185)]=_0xf43dec,_0x373e59[_0x43e051(0x629)]=AudioManager[_0x43e051(0x33a)][_0x43e051(0x2db)](),AudioManager[_0x43e051(0x300)](_0x373e59),AudioManager['playBgm'](_0x373e59,_0x373e59['pos']),AudioManager[_0x43e051(0x33a)][_0x43e051(0x335)](_0x373e59['pos']));}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x856),_0x33d8d5=>{const _0x28baf8=_0x5d7dff;VisuMZ[_0x28baf8(0x30b)](_0x33d8d5,_0x33d8d5);const _0x8f0cb9=Math[_0x28baf8(0xd6)](_0x33d8d5[_0x28baf8(0xbe)])['clamp'](-0x64,0x64),_0x488483=AudioManager['_currentBgm'];_0x488483&&(_0x488483[_0x28baf8(0xbe)]=_0x8f0cb9,_0x488483[_0x28baf8(0x629)]=AudioManager[_0x28baf8(0x33a)][_0x28baf8(0x2db)](),AudioManager['updateBgmParameters'](_0x488483),AudioManager[_0x28baf8(0x6b9)](_0x488483,_0x488483[_0x28baf8(0x629)]),AudioManager[_0x28baf8(0x33a)]['_startPlaying'](_0x488483[_0x28baf8(0x629)]));}),PluginManager['registerCommand'](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x3da),_0x44485f=>{const _0x43c50a=_0x5d7dff;VisuMZ[_0x43c50a(0x30b)](_0x44485f,_0x44485f);const _0x169093=Math[_0x43c50a(0xd6)](_0x44485f[_0x43c50a(0x2ee)])[_0x43c50a(0x3aa)](0x0,0x64),_0x2628ff=AudioManager[_0x43c50a(0x40b)];_0x2628ff&&(_0x2628ff[_0x43c50a(0x2ee)]=_0x169093,_0x2628ff[_0x43c50a(0x629)]=AudioManager[_0x43c50a(0x5aa)]['seek'](),AudioManager['updateBgsParameters'](_0x2628ff),AudioManager[_0x43c50a(0x7d1)](_0x2628ff,_0x2628ff[_0x43c50a(0x629)]),AudioManager['_bgsBuffer'][_0x43c50a(0x335)](_0x2628ff['pos']));}),PluginManager['registerCommand'](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x7e7),_0x4a437f=>{const _0x37bf31=_0x5d7dff;VisuMZ[_0x37bf31(0x30b)](_0x4a437f,_0x4a437f);const _0x12b15e=Math[_0x37bf31(0xd6)](_0x4a437f[_0x37bf31(0x185)])[_0x37bf31(0x3aa)](0x32,0x96),_0x3fd006=AudioManager['_currentBgs'];_0x3fd006&&(_0x3fd006['pitch']=_0x12b15e,_0x3fd006[_0x37bf31(0x629)]=AudioManager[_0x37bf31(0x5aa)]['seek'](),AudioManager[_0x37bf31(0x7b9)](_0x3fd006),AudioManager[_0x37bf31(0x7d1)](_0x3fd006,_0x3fd006[_0x37bf31(0x629)]),AudioManager[_0x37bf31(0x5aa)][_0x37bf31(0x335)](_0x3fd006[_0x37bf31(0x629)]));}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x256),_0x4eb1eb=>{const _0x2b1b54=_0x5d7dff;VisuMZ[_0x2b1b54(0x30b)](_0x4eb1eb,_0x4eb1eb);const _0x4b9d65=Math[_0x2b1b54(0xd6)](_0x4eb1eb[_0x2b1b54(0xbe)])[_0x2b1b54(0x3aa)](-0x64,0x64),_0x11bd6f=AudioManager[_0x2b1b54(0x40b)];_0x11bd6f&&(_0x11bd6f['pan']=_0x4b9d65,_0x11bd6f[_0x2b1b54(0x629)]=AudioManager[_0x2b1b54(0x5aa)][_0x2b1b54(0x2db)](),AudioManager[_0x2b1b54(0x7b9)](_0x11bd6f),AudioManager[_0x2b1b54(0x7d1)](_0x11bd6f,_0x11bd6f[_0x2b1b54(0x629)]),AudioManager[_0x2b1b54(0x5aa)][_0x2b1b54(0x335)](_0x11bd6f[_0x2b1b54(0x629)]));}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],'DebugConsoleLastControllerID',_0x2db8a9=>{const _0x4f2fdc=_0x5d7dff;if(!$gameTemp['isPlaytest']())return;const _0x2ffd08=Input[_0x4f2fdc(0x488)]();console[_0x4f2fdc(0x2eb)](_0x2ffd08);}),PluginManager['registerCommand'](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x1c9),_0x4d6aaa=>{const _0x35d685=_0x5d7dff;if(!$gameTemp[_0x35d685(0x898)]())return;if(!Utils[_0x35d685(0x7c2)]())return;SceneManager[_0x35d685(0x882)][_0x35d685(0x350)]=![],VisuMZ[_0x35d685(0x7ac)][_0x35d685(0x78a)]();}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x376),_0x532970=>{const _0x10a42c=_0x5d7dff;if(!$gameTemp[_0x10a42c(0x898)]())return;if(!Utils[_0x10a42c(0x7c2)]())return;SceneManager[_0x10a42c(0x882)][_0x10a42c(0x350)]=![],VisuMZ[_0x10a42c(0x7ac)][_0x10a42c(0x821)]();}),PluginManager[_0x5d7dff(0x25f)](pluginData['name'],_0x5d7dff(0x27b),_0x4ebf=>{const _0x2a1464=_0x5d7dff;if(!$gameTemp[_0x2a1464(0x898)]())return;if(!Utils[_0x2a1464(0x7c2)]())return;if(!$gameMap)return;if($gameMap['mapId']()<=0x0)return;VisuMZ[_0x2a1464(0x30b)](_0x4ebf,_0x4ebf);const _0x1973ba=_0x2a1464(0x3c2)['format']($gameMap[_0x2a1464(0x73c)]()[_0x2a1464(0x6c6)](0x3)),_0x58fb44=VisuMZ[_0x2a1464(0x7ac)][_0x2a1464(0x690)]($gameMap[_0x2a1464(0x73c)]());VisuMZ['CoreEngine'][_0x2a1464(0x712)](_0x58fb44,_0x1973ba,!![]);}),PluginManager['registerCommand'](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x192),_0x491fbd=>{const _0x4b4e61=_0x5d7dff;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameParty[_0x4b4e61(0x236)]())return;VisuMZ[_0x4b4e61(0x30b)](_0x491fbd,_0x491fbd);const _0x5b547e=_0x4b4e61(0x2cc)[_0x4b4e61(0x106)]($gameTroop[_0x4b4e61(0x2da)]['padZero'](0x4)),_0x54468c=VisuMZ[_0x4b4e61(0x7ac)][_0x4b4e61(0x484)]($gameTroop['_troopId']);VisuMZ[_0x4b4e61(0x7ac)][_0x4b4e61(0x712)](_0x54468c,_0x5b547e,!![]);}),VisuMZ['CoreEngine'][_0x5d7dff(0x712)]=function(_0x27df86,_0x5e63ec,_0x2c53ab){const _0x5bb523=_0x5d7dff,_0x1a2f10=require('fs');let _0x275a5e=_0x5bb523(0x4ec)[_0x5bb523(0x106)](_0x5e63ec||'0');_0x1a2f10[_0x5bb523(0x668)](_0x275a5e,_0x27df86,_0x3ff3b5=>{const _0x432465=_0x5bb523;if(_0x3ff3b5)throw err;else _0x2c53ab&&alert(_0x432465(0x190)['format'](_0x275a5e));});},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x78a)]=function(){const _0x23b8e2=_0x5d7dff,_0x2fa3d9=[];for(const _0x738837 of $dataMapInfos){if(!_0x738837)continue;_0x2fa3d9[_0x23b8e2(0x1a0)](_0x738837['id']);}const _0x1a46e3=_0x2fa3d9['length']*0x64+Math[_0x23b8e2(0x760)](0x64);alert('Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'['format'](_0x1a46e3)),this[_0x23b8e2(0x55e)]=[],this[_0x23b8e2(0x5bd)]=$dataMap;for(const _0x3ee5ad of _0x2fa3d9){VisuMZ[_0x23b8e2(0x7ac)][_0x23b8e2(0x46c)](_0x3ee5ad);}setTimeout(VisuMZ[_0x23b8e2(0x7ac)][_0x23b8e2(0x849)][_0x23b8e2(0x134)](this),_0x1a46e3);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x46c)]=function(_0x519336){const _0x43c8fb=_0x5d7dff,_0x55c49b=_0x43c8fb(0x7cf)[_0x43c8fb(0x106)](_0x519336[_0x43c8fb(0x6c6)](0x3)),_0x21f933=new XMLHttpRequest(),_0x50ae09=_0x43c8fb(0x8cf)+_0x55c49b;_0x21f933[_0x43c8fb(0x774)](_0x43c8fb(0x62b),_0x50ae09),_0x21f933[_0x43c8fb(0x481)](_0x43c8fb(0x20e)),_0x21f933[_0x43c8fb(0x5ad)]=()=>this[_0x43c8fb(0x58c)](_0x21f933,_0x519336,_0x55c49b,_0x50ae09),_0x21f933[_0x43c8fb(0x4aa)]=()=>DataManager[_0x43c8fb(0x6cd)]('$dataMap',_0x55c49b,_0x50ae09),_0x21f933[_0x43c8fb(0x249)]();},VisuMZ['CoreEngine']['storeMapData']=function(_0x345ecd,_0x3d8bba,_0x2403bd,_0x14daf0){const _0x244afe=_0x5d7dff;$dataMap=JSON['parse'](_0x345ecd['responseText']),DataManager[_0x244afe(0x353)]($dataMap),this['_storedMapText'][_0x3d8bba]=VisuMZ[_0x244afe(0x7ac)][_0x244afe(0x690)](_0x3d8bba),$dataMap=this['_currentMap'];},VisuMZ[_0x5d7dff(0x7ac)]['exportAllMapStrings']=function(){const _0xf5c981=_0x5d7dff,_0x10e425=_0xf5c981(0x63b);this[_0xf5c981(0x55e)]['remove'](undefined)[_0xf5c981(0x663)]('')[_0xf5c981(0x663)](null);const _0x161386=this[_0xf5c981(0x55e)][_0xf5c981(0x341)](_0xf5c981(0x89a))[_0xf5c981(0x6b5)]();VisuMZ[_0xf5c981(0x7ac)][_0xf5c981(0x712)](_0x161386,_0x10e425,!![]),SceneManager[_0xf5c981(0x882)][_0xf5c981(0x350)]=!![];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x690)]=function(_0x14acc1){const _0x3ecca9=_0x5d7dff;if(!$dataMap)return'';let _0x24dd8a='█'['repeat'](0x46)+'\x0a\x0a',_0x7112cf='═'[_0x3ecca9(0x6c4)](0x46)+'\x0a\x0a',_0xc46af8='';this[_0x3ecca9(0x5a7)]=0x0;for(const _0x5235a1 of $dataMap['events']){if(!_0x5235a1)continue;let _0x317051=_0x5235a1['id'],_0xb88812=_0x5235a1['name'],_0x1b9ebb=_0x5235a1['pages'];for(const _0x388199 of _0x1b9ebb){const _0x5018ba=_0x1b9ebb[_0x3ecca9(0x824)](_0x388199)+0x1;let _0x3320ad=_0x7112cf+'《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a',_0x4f4f1a=VisuMZ[_0x3ecca9(0x7ac)]['ExtractStrFromList'](_0x388199[_0x3ecca9(0x385)]);if(_0x4f4f1a[_0x3ecca9(0xfd)]>0x0){if(_0xc46af8[_0x3ecca9(0xfd)]>0x0)_0xc46af8+=_0x7112cf+_0x3ecca9(0x89a);else{const _0x5cab07=$dataMapInfos[_0x14acc1]['name'];_0xc46af8+=_0x24dd8a+'〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a'['format'](_0x14acc1,_0x5cab07||_0x3ecca9(0x7ff))+_0x24dd8a;}_0xc46af8+=_0x3320ad[_0x3ecca9(0x106)](_0x317051,_0xb88812,_0x5018ba,_0x4f4f1a);}}}return _0xc46af8[_0x3ecca9(0xfd)]>0x0&&(_0xc46af8+=_0x7112cf),_0xc46af8;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x821)]=function(){const _0xd644fe=_0x5d7dff,_0x3e4645=$dataTroops['length']*0xa+Math[_0xd644fe(0x760)](0xa);alert(_0xd644fe(0x892)[_0xd644fe(0x106)](_0x3e4645));const _0x230874=[];for(const _0x9e580 of $dataTroops){if(!_0x9e580)continue;const _0x20a58d=_0x9e580['id'];_0x230874[_0x20a58d]=VisuMZ['CoreEngine']['ExtractStrFromTroop'](_0x20a58d);}setTimeout(VisuMZ['CoreEngine'][_0xd644fe(0xc5)][_0xd644fe(0x134)](this,_0x230874),_0x3e4645);},VisuMZ[_0x5d7dff(0x7ac)]['ExtractStrFromTroop']=function(_0x43ff39){const _0x315d7b=_0x5d7dff;if(!$dataTroops[_0x43ff39])return'';let _0x444d80='█'[_0x315d7b(0x6c4)](0x46)+'\x0a\x0a',_0x1ad7cb='═'[_0x315d7b(0x6c4)](0x46)+'\x0a\x0a',_0x186691='';this[_0x315d7b(0x5a7)]=0x0;const _0x27a5ed=$dataTroops[_0x43ff39];let _0x388a3d=_0x27a5ed['pages'];for(const _0x5178ed of _0x388a3d){const _0x3cf338=_0x388a3d['indexOf'](_0x5178ed)+0x1;let _0x2b4f8b=_0x1ad7cb+_0x315d7b(0x82e),_0xd2b20f=VisuMZ[_0x315d7b(0x7ac)][_0x315d7b(0x1e8)](_0x5178ed[_0x315d7b(0x385)]);_0xd2b20f['length']>0x0&&(_0x186691['length']>0x0?_0x186691+=_0x1ad7cb+_0x315d7b(0x89a):_0x186691+=_0x444d80+_0x315d7b(0x76f)[_0x315d7b(0x106)](_0x43ff39,_0x27a5ed[_0x315d7b(0x814)]||'Unnamed')+_0x444d80,_0x186691+=_0x2b4f8b[_0x315d7b(0x106)](_0x3cf338,_0xd2b20f));}return _0x186691[_0x315d7b(0xfd)]>0x0&&(_0x186691+=_0x1ad7cb),_0x186691;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0xc5)]=function(_0x44eca5){const _0x1470f5=_0x5d7dff,_0x5e1d89=_0x1470f5(0x432);_0x44eca5[_0x1470f5(0x663)](undefined)[_0x1470f5(0x663)]('')['remove'](null);const _0x1e912f=_0x44eca5['join']('\x0a\x0a\x0a\x0a\x0a')[_0x1470f5(0x6b5)]();VisuMZ['CoreEngine'][_0x1470f5(0x712)](_0x1e912f,_0x5e1d89,!![]),SceneManager[_0x1470f5(0x882)][_0x1470f5(0x350)]=!![];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1e8)]=function(_0x49d372){const _0x1cdc19=_0x5d7dff;let _0x39f66d='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x5bac37='\x0a'+'┄'[_0x1cdc19(0x6c4)](0x46)+'\x0a',_0x216f48='';for(const _0x121cae of _0x49d372){if(!_0x121cae)continue;if(_0x121cae[_0x1cdc19(0x594)]===0x65)_0x216f48+=_0x39f66d+'\x0a',_0x216f48+=_0x1cdc19(0x65b),_0x121cae[_0x1cdc19(0x896)][0x4]!==''&&_0x121cae[_0x1cdc19(0x896)][0x4]!==undefined&&(_0x216f48+=_0x1cdc19(0x148)['format'](_0x121cae[_0x1cdc19(0x896)][0x4]));else{if(_0x121cae[_0x1cdc19(0x594)]===0x191)_0x216f48+=_0x1cdc19(0x80a)[_0x1cdc19(0x106)](_0x121cae[_0x1cdc19(0x896)][0x0]);else{if(_0x121cae[_0x1cdc19(0x594)]===0x192)_0x216f48+=_0x39f66d,_0x216f48+='%1〘Choice\x20%2〙\x20%3%1'[_0x1cdc19(0x106)](_0x5bac37,_0x121cae[_0x1cdc19(0x896)][0x0]+0x1,_0x121cae[_0x1cdc19(0x896)][0x1]);else{if(_0x121cae[_0x1cdc19(0x594)]===0x193)_0x216f48+=_0x39f66d,_0x216f48+=_0x1cdc19(0x340)[_0x1cdc19(0x106)](_0x5bac37);else{if(_0x121cae[_0x1cdc19(0x594)]===0x194)_0x216f48+=_0x39f66d,_0x216f48+=_0x1cdc19(0x403)[_0x1cdc19(0x106)](_0x5bac37);else{if(_0x121cae[_0x1cdc19(0x594)]===0x69)_0x216f48+=_0x39f66d+'\x0a',_0x216f48+=_0x1cdc19(0x323);else{if(_0x121cae[_0x1cdc19(0x594)]===0x6c)_0x216f48+=_0x39f66d+'\x0a',_0x216f48+=_0x1cdc19(0x5da)[_0x1cdc19(0x106)](_0x121cae[_0x1cdc19(0x896)][0x0]);else{if(_0x121cae[_0x1cdc19(0x594)]===0x198)_0x216f48+=_0x1cdc19(0x80a)[_0x1cdc19(0x106)](_0x121cae[_0x1cdc19(0x896)][0x0]);else{if(_0x121cae[_0x1cdc19(0x594)]===0x75){const _0x24cb22=$dataCommonEvents[_0x121cae[_0x1cdc19(0x896)][0x0]];if(_0x24cb22&&this[_0x1cdc19(0x5a7)]<=0xa){this['_commonEventLayers']++;let _0x4252a4=VisuMZ[_0x1cdc19(0x7ac)][_0x1cdc19(0x1e8)](_0x24cb22[_0x1cdc19(0x385)]);_0x4252a4[_0x1cdc19(0xfd)]>0x0&&(_0x216f48+=_0x39f66d,_0x216f48+=_0x5bac37,_0x216f48+=_0x1cdc19(0x3be)[_0x1cdc19(0x106)](_0x24cb22['id'],_0x24cb22[_0x1cdc19(0x814)]),_0x216f48+=_0x5bac37,_0x216f48+=_0x4252a4,_0x216f48+=_0x5bac37,_0x216f48+=_0x1cdc19(0x78b)[_0x1cdc19(0x106)](_0x24cb22['id'],_0x24cb22['name']),_0x216f48+=_0x5bac37),this[_0x1cdc19(0x5a7)]--;}}}}}}}}}}}return _0x216f48['length']>0x0&&(_0x216f48+=_0x39f66d),_0x216f48;},PluginManager['registerCommand'](pluginData['name'],_0x5d7dff(0x343),_0x2685be=>{const _0x546d4c=_0x5d7dff;VisuMZ[_0x546d4c(0x30b)](_0x2685be,_0x2685be);const _0x12f47b=_0x2685be[_0x546d4c(0x74f)];VisuMZ[_0x546d4c(0x24a)](_0x12f47b);}),PluginManager['registerCommand'](pluginData['name'],_0x5d7dff(0x205),_0x879dc8=>{const _0xdc3c64=_0x5d7dff;VisuMZ[_0xdc3c64(0x30b)](_0x879dc8,_0x879dc8);const _0x3ccee6=_0x879dc8[_0xdc3c64(0x3a8)]||0x0;$gameParty['gainGold'](_0x3ccee6);}),PluginManager[_0x5d7dff(0x25f)](pluginData['name'],_0x5d7dff(0x8c4),_0xff65d7=>{const _0xde70ca=_0x5d7dff;if(!SceneManager[_0xde70ca(0x3af)]())return;VisuMZ[_0xde70ca(0x30b)](_0xff65d7,_0xff65d7);const _0x1a20e8=_0xff65d7['CommonEventID'];SceneManager[_0xde70ca(0x882)][_0xde70ca(0x5cf)](_0x1a20e8);}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x87d),_0x18c4f3=>{const _0x72905b=_0x5d7dff;if(!$gameTemp[_0x72905b(0x898)]())return;if(!Utils[_0x72905b(0x7c2)]())return;VisuMZ[_0x72905b(0x30b)](_0x18c4f3,_0x18c4f3);const _0x3158bc=_0x18c4f3['PictureID']||0x1;$gameTemp['_pictureCoordinatesMode']=_0x3158bc;}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x677),_0x1d2168=>{const _0x27f0b6=_0x5d7dff;VisuMZ['ConvertParams'](_0x1d2168,_0x1d2168);const _0x56a3cf=_0x1d2168[_0x27f0b6(0x68d)]||0x1,_0x141de2=_0x1d2168[_0x27f0b6(0x625)]||_0x27f0b6(0x521),_0x3620a9=$gameScreen['picture'](_0x56a3cf);_0x3620a9&&_0x3620a9['setEasingType'](_0x141de2);}),PluginManager['registerCommand'](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x696),_0x3df6e2=>{const _0x5a16bf=_0x5d7dff;for(let _0x8aa71b=0x1;_0x8aa71b<=$gameScreen[_0x5a16bf(0x285)]();_0x8aa71b++){$gameScreen['erasePicture'](_0x8aa71b);}}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x25e),_0x53be2b=>{const _0x32d64d=_0x5d7dff;VisuMZ[_0x32d64d(0x30b)](_0x53be2b,_0x53be2b);const _0x2b8b0c=Math[_0x32d64d(0x172)](_0x53be2b[_0x32d64d(0x4c0)],_0x53be2b[_0x32d64d(0x146)]),_0x446ff1=Math[_0x32d64d(0xee)](_0x53be2b[_0x32d64d(0x4c0)],_0x53be2b[_0x32d64d(0x146)]);for(let _0xd704a4=_0x2b8b0c;_0xd704a4<=_0x446ff1;_0xd704a4++){$gameScreen[_0x32d64d(0x8a2)](_0xd704a4);}}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x538),_0x3bf6a7=>{const _0x255c32=_0x5d7dff;VisuMZ['ConvertParams'](_0x3bf6a7,_0x3bf6a7);const _0x2e7803=Math[_0x255c32(0xd6)](_0x3bf6a7['PictureID'])[_0x255c32(0x3aa)](0x1,0x64),_0x3d0fb5=-Number(_0x3bf6a7['AdjustAngle']||0x0),_0x2523d9=Math[_0x255c32(0xee)](_0x3bf6a7[_0x255c32(0x5d6)]||0x0,0x0),_0x46d1a4=_0x3bf6a7[_0x255c32(0x625)]||_0x255c32(0x521),_0x49bc67=_0x3bf6a7[_0x255c32(0x393)],_0x2a3846=$gameScreen[_0x255c32(0x370)](_0x2e7803);if(!_0x2a3846)return;_0x2a3846[_0x255c32(0x34b)](_0x3d0fb5,_0x2523d9,_0x46d1a4);if(_0x49bc67){const _0x41b062=$gameTemp[_0x255c32(0x84e)]();if(_0x41b062)_0x41b062[_0x255c32(0x6ef)](_0x2523d9);}}),PluginManager['registerCommand'](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x66c),_0x3cd281=>{const _0x445bf1=_0x5d7dff;VisuMZ[_0x445bf1(0x30b)](_0x3cd281,_0x3cd281);const _0x16168a=Math['round'](_0x3cd281[_0x445bf1(0x6e2)])[_0x445bf1(0x3aa)](0x1,0x64),_0x9312a4=-Number(_0x3cd281[_0x445bf1(0x220)]||0x0),_0x176dde=Math[_0x445bf1(0xee)](_0x3cd281['Duration']||0x0,0x0),_0x519757=_0x3cd281[_0x445bf1(0x625)]||_0x445bf1(0x521),_0x137e0d=_0x3cd281[_0x445bf1(0x393)],_0x2a9cac=$gameScreen[_0x445bf1(0x370)](_0x16168a);if(!_0x2a9cac)return;_0x2a9cac['setAnglePlusData'](_0x9312a4,_0x176dde,_0x519757);if(_0x137e0d){const _0x4503b0=$gameTemp[_0x445bf1(0x84e)]();if(_0x4503b0)_0x4503b0[_0x445bf1(0x6ef)](_0x176dde);}}),PluginManager['registerCommand'](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x659),_0x385db0=>{const _0x4cf019=_0x5d7dff;VisuMZ['ConvertParams'](_0x385db0,_0x385db0);const _0x5786d4=Math[_0x4cf019(0xd6)](_0x385db0[_0x4cf019(0x6e2)])[_0x4cf019(0x3aa)](0x1,0x64),_0x19cc97=_0x385db0[_0x4cf019(0x37c)],_0xf46214=_0x19cc97['Origin']['clamp'](0x0,0x1),_0x3d0059=Math['round'](_0x19cc97[_0x4cf019(0x3c4)]||0x0),_0x238575=Math[_0x4cf019(0xd6)](_0x19cc97['PositionY']||0x0),_0x38dc9b=Math['round'](_0x19cc97[_0x4cf019(0x3b2)]||0x0),_0x43fbcc=Math[_0x4cf019(0xd6)](_0x19cc97[_0x4cf019(0x794)]||0x0),_0x47df40=Math[_0x4cf019(0xd6)](_0x19cc97['Opacity'])[_0x4cf019(0x3aa)](0x0,0xff),_0x135c23=_0x19cc97['BlendMode'],_0x4e443c=_0x4cf019(0x416),_0x56a385=_0x385db0[_0x4cf019(0x180)]?_0x4cf019(0x180):_0x4cf019(0x8b1),_0x56e56e=_0x4e443c[_0x4cf019(0x106)](_0x385db0[_0x4cf019(0x8c9)],_0x56a385);$gameScreen['showPicture'](_0x5786d4,_0x56e56e,_0xf46214,_0x3d0059,_0x238575,_0x38dc9b,_0x43fbcc,_0x47df40,_0x135c23);}),PluginManager['registerCommand'](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x308),_0x26a098=>{const _0x2176d0=_0x5d7dff;VisuMZ[_0x2176d0(0x30b)](_0x26a098,_0x26a098);const _0x26f0ca=_0x26a098[_0x2176d0(0x893)]||_0x2176d0(0x34a),_0x56b4c4=_0x26a098['Power'][_0x2176d0(0x3aa)](0x1,0x9),_0x3c3df5=_0x26a098[_0x2176d0(0x4d5)][_0x2176d0(0x3aa)](0x1,0x9),_0x2e290b=_0x26a098['Duration']||0x1,_0xcecb71=_0x26a098['Wait'];$gameScreen['setCoreEngineScreenShakeStyle'](_0x26f0ca),$gameScreen[_0x2176d0(0x4a9)](_0x56b4c4,_0x3c3df5,_0x2e290b);if(_0xcecb71){const _0x261873=$gameTemp[_0x2176d0(0x84e)]();if(_0x261873)_0x261873[_0x2176d0(0x6ef)](_0x2e290b);}}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],'SwitchRandomizeOne',_0x3c3808=>{const _0x1129d5=_0x5d7dff;if($gameParty[_0x1129d5(0x236)]())return;VisuMZ[_0x1129d5(0x30b)](_0x3c3808,_0x3c3808);const _0x3a90cc=_0x3c3808[_0x1129d5(0x10f)],_0xc9349d=(_0x3c3808['Chance']||0x0)/0x64;for(const _0x22751f of _0x3a90cc){const _0x4ddbe7=Math['random']()<=_0xc9349d;$gameSwitches['setValue'](_0x22751f,_0x4ddbe7);}}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x369),_0x24b8b9=>{const _0xc55748=_0x5d7dff;if($gameParty[_0xc55748(0x236)]())return;VisuMZ[_0xc55748(0x30b)](_0x24b8b9,_0x24b8b9);const _0x536d69=Math[_0xc55748(0x172)](_0x24b8b9[_0xc55748(0x4c0)],_0x24b8b9[_0xc55748(0x146)]),_0x223515=Math[_0xc55748(0xee)](_0x24b8b9[_0xc55748(0x4c0)],_0x24b8b9['EndingID']),_0x4da6dd=(_0x24b8b9['Chance']||0x0)/0x64;for(let _0x52153c=_0x536d69;_0x52153c<=_0x223515;_0x52153c++){const _0x576b16=Math['random']()<=_0x4da6dd;$gameSwitches[_0xc55748(0x273)](_0x52153c,_0x576b16);}}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x321),_0x5ad7ef=>{const _0x1616ea=_0x5d7dff;if($gameParty['inBattle']())return;VisuMZ[_0x1616ea(0x30b)](_0x5ad7ef,_0x5ad7ef);const _0x3561d7=_0x5ad7ef[_0x1616ea(0x10f)];for(const _0x2fbbf9 of _0x3561d7){const _0x1bddb2=$gameSwitches[_0x1616ea(0x3a8)](_0x2fbbf9);$gameSwitches[_0x1616ea(0x273)](_0x2fbbf9,!_0x1bddb2);}}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x4af),_0x9eb8d0=>{const _0x26629f=_0x5d7dff;if($gameParty['inBattle']())return;VisuMZ[_0x26629f(0x30b)](_0x9eb8d0,_0x9eb8d0);const _0x48c4ca=Math[_0x26629f(0x172)](_0x9eb8d0[_0x26629f(0x4c0)],_0x9eb8d0[_0x26629f(0x146)]),_0xe5b275=Math[_0x26629f(0xee)](_0x9eb8d0['StartID'],_0x9eb8d0['EndingID']);for(let _0x3e130c=_0x48c4ca;_0x3e130c<=_0xe5b275;_0x3e130c++){const _0x41d5c6=$gameSwitches[_0x26629f(0x3a8)](_0x3e130c);$gameSwitches[_0x26629f(0x273)](_0x3e130c,!_0x41d5c6);}}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x3ff),_0x5e656d=>{const _0x2309bc=_0x5d7dff;VisuMZ['ConvertParams'](_0x5e656d,_0x5e656d);const _0x281cd4=_0x5e656d[_0x2309bc(0x49a)]||0x1;$gameSystem[_0x2309bc(0xc8)](_0x281cd4);}),PluginManager['registerCommand'](pluginData[_0x5d7dff(0x814)],'SystemSetSideView',_0x259b89=>{const _0x5d7537=_0x5d7dff;if($gameParty['inBattle']())return;VisuMZ[_0x5d7537(0x30b)](_0x259b89,_0x259b89);const _0xab2762=_0x259b89['option'];if(_0xab2762[_0x5d7537(0x371)](/Front/i))$gameSystem[_0x5d7537(0x154)](![]);else _0xab2762['match'](/Side/i)?$gameSystem['setSideView'](!![]):$gameSystem[_0x5d7537(0x154)](!$gameSystem[_0x5d7537(0x583)]());}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x413),_0x674553=>{const _0xd6f7f1=_0x5d7dff;if($gameParty['inBattle']())return;VisuMZ[_0xd6f7f1(0x30b)](_0x674553,_0x674553);const _0x3478ae=[_0xd6f7f1(0x6af),_0xd6f7f1(0xe0),'me','se'];for(const _0x2da0b5 of _0x3478ae){const _0x20bc82=_0x674553[_0x2da0b5],_0x3a6248=_0xd6f7f1(0x18e)[_0xd6f7f1(0x106)](_0x2da0b5);for(const _0x4544c0 of _0x20bc82){AudioManager[_0xd6f7f1(0x14c)](_0x3a6248,_0x4544c0);}}}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x1c3),_0x8ef986=>{const _0x2a0204=_0x5d7dff;if($gameParty[_0x2a0204(0x236)]())return;VisuMZ[_0x2a0204(0x30b)](_0x8ef986,_0x8ef986);const _0x4d897e=[_0x2a0204(0x883),_0x2a0204(0x61c),_0x2a0204(0x139),_0x2a0204(0x42d),_0x2a0204(0x131),_0x2a0204(0x46e),_0x2a0204(0x6be),'pictures',_0x2a0204(0x39b),'sv_enemies','system',_0x2a0204(0x5ce),'titles1',_0x2a0204(0x3ca)];for(const _0x2614bf of _0x4d897e){const _0x37871c=_0x8ef986[_0x2614bf],_0xc5d616=_0x2a0204(0x274)[_0x2a0204(0x106)](_0x2614bf);for(const _0x35a063 of _0x37871c){ImageManager[_0x2a0204(0x660)](_0xc5d616,_0x35a063);}}}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x61d),_0xc0da56=>{const _0x502ef0=_0x5d7dff;if($gameParty[_0x502ef0(0x236)]())return;VisuMZ[_0x502ef0(0x30b)](_0xc0da56,_0xc0da56);const _0x404b15=_0xc0da56[_0x502ef0(0x49a)][_0x502ef0(0x496)]()['trim'](),_0x5c7778=VisuMZ[_0x502ef0(0x7ac)][_0x502ef0(0x59b)](_0x404b15);$gameSystem[_0x502ef0(0x5bb)](_0x5c7778);}),VisuMZ[_0x5d7dff(0x7ac)]['CreateBattleSystemID']=function(_0x4b919a){const _0x46c68f=_0x5d7dff;_0x4b919a=_0x4b919a||_0x46c68f(0x56e),_0x4b919a=String(_0x4b919a)[_0x46c68f(0x496)]()['trim']();switch(_0x4b919a){case _0x46c68f(0x327):return 0x0;case _0x46c68f(0x21f):return 0x1;case _0x46c68f(0x299):return 0x2;case _0x46c68f(0x316):if(Imported[_0x46c68f(0x4ab)])return _0x46c68f(0x316);break;case _0x46c68f(0x8b0):if(Imported['VisuMZ_2_BattleSystemSTB'])return _0x46c68f(0x8b0);break;case'BTB':if(Imported[_0x46c68f(0x4c4)])return'BTB';break;case _0x46c68f(0x211):if(Imported[_0x46c68f(0x303)])return _0x46c68f(0x211);break;case _0x46c68f(0x2f3):if(Imported[_0x46c68f(0x466)])return _0x46c68f(0x2f3);break;case _0x46c68f(0x3e8):if(Imported[_0x46c68f(0x2ad)])return _0x46c68f(0x3e8);break;case _0x46c68f(0x305):if(Imported['VisuMZ_2_BattleSystemPTB'])return _0x46c68f(0x305);break;}return $dataSystem[_0x46c68f(0x30a)];},PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],'SystemSetWindowPadding',_0x4609f3=>{const _0x39b3d4=_0x5d7dff;VisuMZ['ConvertParams'](_0x4609f3,_0x4609f3);const _0xe0f2bb=_0x4609f3[_0x39b3d4(0x49a)]||0x1;$gameSystem[_0x39b3d4(0x69f)](_0xe0f2bb);}),PluginManager['registerCommand'](pluginData['name'],_0x5d7dff(0x7d4),_0x554b03=>{const _0x34dc9d=_0x5d7dff;VisuMZ[_0x34dc9d(0x30b)](_0x554b03,_0x554b03);const _0x204a29=_0x554b03[_0x34dc9d(0xc7)]||'';$textPopup(_0x204a29);}),PluginManager[_0x5d7dff(0x25f)](pluginData['name'],'VariableEvalReference',_0x5f2ea2=>{const _0x497d5a=_0x5d7dff;VisuMZ[_0x497d5a(0x30b)](_0x5f2ea2,_0x5f2ea2);const _0x4fd30e=_0x5f2ea2['id']||0x1,_0x106bd2=_0x5f2ea2[_0x497d5a(0x7dc)],_0x51bf0e=_0x5f2ea2[_0x497d5a(0x138)]||0x0;let _0x3dbb7f=$gameVariables['value'](_0x4fd30e)||0x0;switch(_0x106bd2){case'=':_0x3dbb7f=_0x51bf0e;break;case'+':_0x3dbb7f+=_0x51bf0e;break;case'-':_0x3dbb7f-=_0x51bf0e;break;case'*':_0x3dbb7f*=_0x51bf0e;break;case'/':_0x3dbb7f/=_0x51bf0e;break;case'%':_0x3dbb7f%=_0x51bf0e;break;}_0x3dbb7f=_0x3dbb7f||0x0,$gameVariables['setValue'](_0x4fd30e,_0x3dbb7f);}),PluginManager[_0x5d7dff(0x25f)](pluginData[_0x5d7dff(0x814)],_0x5d7dff(0x8ae),_0xfca75=>{const _0x25067a=_0x5d7dff;VisuMZ[_0x25067a(0x30b)](_0xfca75,_0xfca75);const _0x2921c7=_0xfca75['id']()||0x1,_0x7c3d72=_0xfca75[_0x25067a(0x7dc)],_0x46f7fd=_0xfca75[_0x25067a(0x138)]()||0x0;let _0x528a3d=$gameVariables['value'](_0x2921c7)||0x0;switch(_0x7c3d72){case'=':_0x528a3d=_0x46f7fd;break;case'+':_0x528a3d+=_0x46f7fd;break;case'-':_0x528a3d-=_0x46f7fd;break;case'*':_0x528a3d*=_0x46f7fd;break;case'/':_0x528a3d/=_0x46f7fd;break;case'%':_0x528a3d%=_0x46f7fd;break;}_0x528a3d=_0x528a3d||0x0,$gameVariables[_0x25067a(0x273)](_0x2921c7,_0x528a3d);}),VisuMZ[_0x5d7dff(0x7ac)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x694)],Scene_Boot['prototype']['onDatabaseLoaded']=function(){const _0x378ab8=_0x5d7dff;VisuMZ[_0x378ab8(0x7ac)][_0x378ab8(0x232)][_0x378ab8(0x5d5)](this),this[_0x378ab8(0x229)](),this['process_VisuMZ_CoreEngine_Notetags'](),this[_0x378ab8(0x846)](),this['process_VisuMZ_CoreEngine_Functions'](),this[_0x378ab8(0x24f)](),this[_0x378ab8(0x71e)](),VisuMZ[_0x378ab8(0x779)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x567)]={},Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x229)]=function(){const _0x54ff73=_0x5d7dff,_0x792405=['MAXHP',_0x54ff73(0x84f),'ATK',_0x54ff73(0xfe),_0x54ff73(0x5d2),'MDF','AGI',_0x54ff73(0x3b1)],_0x4b22d4=[_0x54ff73(0x56a),_0x54ff73(0x67e),'CRI',_0x54ff73(0x695),_0x54ff73(0x82c),_0x54ff73(0x734),_0x54ff73(0x85e),_0x54ff73(0x72b),_0x54ff73(0x49f),_0x54ff73(0x5f1)],_0x2c1528=[_0x54ff73(0x84a),_0x54ff73(0x2a7),_0x54ff73(0x600),_0x54ff73(0x483),'MCR',_0x54ff73(0x780),_0x54ff73(0xcd),_0x54ff73(0x26a),_0x54ff73(0x3a4),_0x54ff73(0x6a9)],_0x211332=[_0x792405,_0x4b22d4,_0x2c1528],_0x53ffca=['Plus','Plus1',_0x54ff73(0xe8),_0x54ff73(0x38f),_0x54ff73(0x173),_0x54ff73(0x4e1),_0x54ff73(0x294),_0x54ff73(0x378),_0x54ff73(0x238),_0x54ff73(0x4ca)];for(const _0xc1f333 of _0x211332){let _0x4ad26d='';if(_0xc1f333===_0x792405)_0x4ad26d=_0x54ff73(0x314);if(_0xc1f333===_0x4b22d4)_0x4ad26d=_0x54ff73(0x40e);if(_0xc1f333===_0x2c1528)_0x4ad26d='sparam';for(const _0x3dbf9f of _0x53ffca){let _0x7262aa='%1%2'['format'](_0x4ad26d,_0x3dbf9f);VisuMZ[_0x54ff73(0x7ac)][_0x54ff73(0x567)][_0x7262aa]=[],VisuMZ['CoreEngine'][_0x54ff73(0x567)][_0x7262aa+'JS']=[];let _0x1d888a=_0x54ff73(0x8ca);if([_0x54ff73(0x317),_0x54ff73(0x378)]['includes'](_0x3dbf9f))_0x1d888a+=_0x54ff73(0x66b);else{if([_0x54ff73(0x1ba),_0x54ff73(0x238)][_0x54ff73(0x617)](_0x3dbf9f))_0x1d888a+=_0x54ff73(0x540);else{if(['Plus2',_0x54ff73(0x4ca)][_0x54ff73(0x617)](_0x3dbf9f))_0x1d888a+=_0x54ff73(0x358);else{if(_0x3dbf9f===_0x54ff73(0x38f))_0x1d888a+=_0x54ff73(0x42a);else{if(_0x3dbf9f===_0x54ff73(0x4e1))_0x1d888a+=_0x54ff73(0x2e8);else _0x3dbf9f===_0x54ff73(0x294)&&(_0x1d888a+=_0x54ff73(0x601));}}}}for(const _0x338604 of _0xc1f333){let _0x4f238b=_0x3dbf9f[_0x54ff73(0x613)](/[\d+]/g,'')[_0x54ff73(0x496)]();const _0x29c61f=_0x1d888a[_0x54ff73(0x106)](_0x338604,_0x4f238b);VisuMZ[_0x54ff73(0x7ac)][_0x54ff73(0x567)][_0x7262aa][_0x54ff73(0x1a0)](new RegExp(_0x29c61f,'i'));const _0x2ab20d=_0x54ff73(0x415)[_0x54ff73(0x106)](_0x338604,_0x4f238b);VisuMZ[_0x54ff73(0x7ac)][_0x54ff73(0x567)][_0x7262aa+'JS'][_0x54ff73(0x1a0)](new RegExp(_0x2ab20d,'i'));}}}},Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x7b3)]=function(){const _0x1b9bb7=_0x5d7dff;if(VisuMZ[_0x1b9bb7(0x779)])return;},Scene_Boot['prototype'][_0x5d7dff(0x846)]=function(){const _0x4f65c2=_0x5d7dff,_0x6c4960=VisuMZ[_0x4f65c2(0x7ac)][_0x4f65c2(0x37c)];_0x6c4960[_0x4f65c2(0x116)][_0x4f65c2(0x8b8)]&&VisuMZ[_0x4f65c2(0x53f)](!![]);_0x6c4960['QoL'][_0x4f65c2(0x15c)]&&(Input[_0x4f65c2(0x157)][0x23]=_0x4f65c2(0x164),Input[_0x4f65c2(0x157)][0x24]=_0x4f65c2(0x1c8));if(_0x6c4960['ButtonAssist']){const _0x89e84c=_0x6c4960[_0x4f65c2(0x4f6)];_0x89e84c[_0x4f65c2(0x7c6)]=_0x89e84c[_0x4f65c2(0x7c6)]||_0x4f65c2(0x421),_0x89e84c[_0x4f65c2(0x73e)]=_0x89e84c[_0x4f65c2(0x73e)]||_0x4f65c2(0x6b3);}_0x6c4960[_0x4f65c2(0x59a)]['WASD']&&(Input[_0x4f65c2(0x157)][0x57]='up',Input['keyMapper'][0x41]=_0x4f65c2(0x63c),Input['keyMapper'][0x53]=_0x4f65c2(0x3cc),Input['keyMapper'][0x44]=_0x4f65c2(0x761),Input['keyMapper'][0x45]=_0x4f65c2(0xe5)),_0x6c4960[_0x4f65c2(0x59a)][_0x4f65c2(0x468)]&&(Input[_0x4f65c2(0x157)][0x52]=_0x4f65c2(0x18f)),_0x6c4960['Param'][_0x4f65c2(0x242)]=_0x6c4960[_0x4f65c2(0x3b6)][_0x4f65c2(0x242)]['map'](_0x33e7ce=>_0x33e7ce[_0x4f65c2(0x496)]()[_0x4f65c2(0x6b5)]()),_0x6c4960[_0x4f65c2(0x3b6)][_0x4f65c2(0x7ef)]=_0x6c4960[_0x4f65c2(0x3b6)][_0x4f65c2(0x7ef)][_0x4f65c2(0x386)](_0x51c68b=>_0x51c68b[_0x4f65c2(0x496)]()[_0x4f65c2(0x6b5)]()),_0x6c4960[_0x4f65c2(0x116)]['ShiftR_Toggle']=_0x6c4960['QoL'][_0x4f65c2(0x758)]??!![],_0x6c4960[_0x4f65c2(0x116)][_0x4f65c2(0x8ba)]=_0x6c4960['QoL'][_0x4f65c2(0x8ba)]??!![],_0x6c4960[_0x4f65c2(0x4f6)][_0x4f65c2(0x8bb)]&&VisuMZ[_0x4f65c2(0x7ac)][_0x4f65c2(0x6a8)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x6a8)]=function(){const _0x231222=_0x5d7dff;let _0x31aeea=![],_0x4e8e66=![];for(let _0x3d7a7a in Input[_0x231222(0x157)]){const _0x5471d2=Input[_0x231222(0x157)][_0x3d7a7a];if(_0x5471d2===_0x231222(0x277))_0x31aeea=!![];if(_0x5471d2===_0x231222(0x381))_0x4e8e66=!![];if(_0x31aeea&&_0x4e8e66)return;}let _0x4b5c78='ERROR!\x0a\x0aCore\x20Engine\x20>\x20Plugin\x20Parameters\x20>\x20Button\x20Assist\x20>\x20Split\x20Escape\x0a\x0a';_0x4b5c78+=_0x231222(0x806),_0x4b5c78+=_0x231222(0x279),_0x4b5c78+=_0x231222(0xba),_0x4b5c78+='If\x20you\x20don\x27t\x20want\x20this\x20option,\x20set\x20Split\x20Escape\x20option\x20back\x20to\x20false.',alert(_0x4b5c78),SceneManager['exit']();},Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x114)]=function(){const _0xf8342c=_0x5d7dff;this[_0xf8342c(0x6f4)]();},Scene_Boot[_0x5d7dff(0x4fa)]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x71931e=_0x5d7dff,_0x12e653=VisuMZ[_0x71931e(0x7ac)][_0x71931e(0x37c)][_0x71931e(0x361)];for(const _0x108d43 of _0x12e653){const _0x4a9f60=_0x108d43[_0x71931e(0x52a)][_0x71931e(0x613)](/[ ]/g,''),_0x321ff1=_0x108d43[_0x71931e(0x3db)];VisuMZ[_0x71931e(0x7ac)][_0x71931e(0x886)](_0x4a9f60,_0x321ff1);}},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x886)]=function(_0x185289,_0x2962ee){const _0x31e0ec=_0x5d7dff;if(!!window[_0x185289]){if($gameTemp[_0x31e0ec(0x898)]())console[_0x31e0ec(0x2eb)](_0x31e0ec(0x558)[_0x31e0ec(0x106)](_0x185289));}const _0x5f460c=_0x31e0ec(0x8d4)[_0x31e0ec(0x106)](_0x185289,_0x2962ee);window[_0x185289]=new Function(_0x5f460c);},Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x24f)]=function(){const _0x3f6f0b=_0x5d7dff,_0x1d3f56=VisuMZ[_0x3f6f0b(0x7ac)][_0x3f6f0b(0x37c)][_0x3f6f0b(0x596)];if(!_0x1d3f56)return;for(const _0x343255 of _0x1d3f56){if(!_0x343255)continue;VisuMZ[_0x3f6f0b(0x7ac)][_0x3f6f0b(0x88e)](_0x343255);}},VisuMZ['CoreEngine']['CustomParamNames']={},VisuMZ[_0x5d7dff(0x7ac)]['CustomParamIcons']={},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x71a)]={},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x120)]={},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x88e)]=function(_0x39aefe){const _0x45c220=_0x5d7dff,_0x36f48d=_0x39aefe[_0x45c220(0x1d0)],_0x16c39d=_0x39aefe[_0x45c220(0x71d)],_0x2dfd16=_0x39aefe['Icon'],_0x19daba=_0x39aefe['Type'],_0x10618c=new Function(_0x39aefe[_0x45c220(0x452)]);VisuMZ['CoreEngine'][_0x45c220(0x656)][_0x36f48d[_0x45c220(0x496)]()[_0x45c220(0x6b5)]()]=_0x16c39d,VisuMZ['CoreEngine']['CustomParamIcons'][_0x36f48d[_0x45c220(0x496)]()[_0x45c220(0x6b5)]()]=_0x2dfd16,VisuMZ['CoreEngine'][_0x45c220(0x71a)][_0x36f48d[_0x45c220(0x496)]()[_0x45c220(0x6b5)]()]=_0x19daba,VisuMZ[_0x45c220(0x7ac)][_0x45c220(0x120)][_0x36f48d[_0x45c220(0x496)]()[_0x45c220(0x6b5)]()]=_0x36f48d,Object[_0x45c220(0x2d6)](Game_BattlerBase[_0x45c220(0x4fa)],_0x36f48d,{'get'(){const _0x511867=_0x45c220,_0xc6bad=_0x10618c['call'](this);return _0x19daba===_0x511867(0x88b)?Math[_0x511867(0xd6)](_0xc6bad):_0xc6bad;}});},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x17c)]={},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x837)]={},Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x71e)]=function(){const _0x47050e=_0x5d7dff,_0xa6cb01=VisuMZ[_0x47050e(0x7ac)][_0x47050e(0x37c)][_0x47050e(0x17c)];for(const _0xa00d58 of _0xa6cb01){const _0x29c174=(_0xa00d58[_0x47050e(0x326)]||'')['toLowerCase']()['trim'](),_0x44f82e=(_0xa00d58['Match']||'')[_0x47050e(0x1e9)]()[_0x47050e(0x6b5)]();VisuMZ[_0x47050e(0x7ac)][_0x47050e(0x17c)][_0x29c174]=_0xa00d58,VisuMZ[_0x47050e(0x7ac)][_0x47050e(0x837)][_0x44f82e]=_0x29c174;}},VisuMZ[_0x5d7dff(0x779)]=function(){const _0x282a5f=_0x5d7dff;for(const _0x258f90 of $dataActors){if(_0x258f90)VisuMZ[_0x282a5f(0x275)](_0x258f90);}for(const _0xb9c16d of $dataClasses){if(_0xb9c16d)VisuMZ[_0x282a5f(0x1d9)](_0xb9c16d);}for(const _0x32d034 of $dataSkills){if(_0x32d034)VisuMZ['ParseSkillNotetags'](_0x32d034);}for(const _0x3ed866 of $dataItems){if(_0x3ed866)VisuMZ[_0x282a5f(0x715)](_0x3ed866);}for(const _0x5ec8ba of $dataWeapons){if(_0x5ec8ba)VisuMZ[_0x282a5f(0x3ef)](_0x5ec8ba);}for(const _0x3ff33d of $dataArmors){if(_0x3ff33d)VisuMZ[_0x282a5f(0x1c6)](_0x3ff33d);}for(const _0x253845 of $dataEnemies){if(_0x253845)VisuMZ[_0x282a5f(0x3ae)](_0x253845);}for(const _0x289d14 of $dataStates){if(_0x289d14)VisuMZ[_0x282a5f(0x151)](_0x289d14);}for(const _0x247501 of $dataTilesets){if(_0x247501)VisuMZ[_0x282a5f(0x53b)](_0x247501);}},VisuMZ[_0x5d7dff(0x275)]=function(_0x187e62){},VisuMZ['ParseClassNotetags']=function(_0x3ddb40){},VisuMZ[_0x5d7dff(0x556)]=function(_0x1ec121){},VisuMZ[_0x5d7dff(0x715)]=function(_0x107c1a){},VisuMZ[_0x5d7dff(0x3ef)]=function(_0x48f1da){},VisuMZ[_0x5d7dff(0x1c6)]=function(_0x325d9e){},VisuMZ[_0x5d7dff(0x3ae)]=function(_0x2126bd){},VisuMZ['ParseStateNotetags']=function(_0x375159){},VisuMZ[_0x5d7dff(0x53b)]=function(_0xe6f636){},VisuMZ['CoreEngine']['ParseActorNotetags']=VisuMZ[_0x5d7dff(0x275)],VisuMZ[_0x5d7dff(0x275)]=function(_0x4465a3){const _0x490b65=_0x5d7dff;VisuMZ[_0x490b65(0x7ac)][_0x490b65(0x275)][_0x490b65(0x5d5)](this,_0x4465a3);const _0x11fb9=_0x4465a3[_0x490b65(0x83e)];if(_0x11fb9[_0x490b65(0x371)](/<MAX LEVEL:[ ](\d+)>/i)){_0x4465a3[_0x490b65(0x291)]=Number(RegExp['$1']);if(_0x4465a3[_0x490b65(0x291)]===0x0)_0x4465a3[_0x490b65(0x291)]=Number[_0x490b65(0x382)];}_0x11fb9[_0x490b65(0x371)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x4465a3[_0x490b65(0x41e)]=Math[_0x490b65(0x172)](Number(RegExp['$1']),_0x4465a3[_0x490b65(0x291)]));},VisuMZ['CoreEngine']['ParseClassNotetags']=VisuMZ[_0x5d7dff(0x1d9)],VisuMZ['ParseClassNotetags']=function(_0x29ff83){const _0x2c767a=_0x5d7dff;VisuMZ[_0x2c767a(0x7ac)][_0x2c767a(0x1d9)][_0x2c767a(0x5d5)](this,_0x29ff83);if(_0x29ff83['learnings'])for(const _0x3664a7 of _0x29ff83[_0x2c767a(0x4f0)]){_0x3664a7[_0x2c767a(0x83e)]['match'](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x3664a7[_0x2c767a(0x286)]=Math['max'](Number(RegExp['$1']),0x1));}},VisuMZ[_0x5d7dff(0x7ac)]['ParseEnemyNotetags']=VisuMZ[_0x5d7dff(0x3ae)],VisuMZ['ParseEnemyNotetags']=function(_0x1a9def){const _0x162cdd=_0x5d7dff;VisuMZ['CoreEngine'][_0x162cdd(0x3ae)][_0x162cdd(0x5d5)](this,_0x1a9def),_0x1a9def[_0x162cdd(0x286)]=0x1;const _0x351d7c=_0x1a9def[_0x162cdd(0x83e)];if(_0x351d7c['match'](/<LEVEL:[ ](\d+)>/i))_0x1a9def['level']=Number(RegExp['$1']);if(_0x351d7c[_0x162cdd(0x371)](/<MAXHP:[ ](\d+)>/i))_0x1a9def[_0x162cdd(0x73f)][0x0]=Number(RegExp['$1']);if(_0x351d7c[_0x162cdd(0x371)](/<MAXMP:[ ](\d+)>/i))_0x1a9def[_0x162cdd(0x73f)][0x1]=Number(RegExp['$1']);if(_0x351d7c[_0x162cdd(0x371)](/<ATK:[ ](\d+)>/i))_0x1a9def[_0x162cdd(0x73f)][0x2]=Number(RegExp['$1']);if(_0x351d7c[_0x162cdd(0x371)](/<DEF:[ ](\d+)>/i))_0x1a9def[_0x162cdd(0x73f)][0x3]=Number(RegExp['$1']);if(_0x351d7c[_0x162cdd(0x371)](/<MAT:[ ](\d+)>/i))_0x1a9def[_0x162cdd(0x73f)][0x4]=Number(RegExp['$1']);if(_0x351d7c[_0x162cdd(0x371)](/<MDF:[ ](\d+)>/i))_0x1a9def[_0x162cdd(0x73f)][0x5]=Number(RegExp['$1']);if(_0x351d7c[_0x162cdd(0x371)](/<AGI:[ ](\d+)>/i))_0x1a9def[_0x162cdd(0x73f)][0x6]=Number(RegExp['$1']);if(_0x351d7c[_0x162cdd(0x371)](/<LUK:[ ](\d+)>/i))_0x1a9def[_0x162cdd(0x73f)][0x7]=Number(RegExp['$1']);if(_0x351d7c[_0x162cdd(0x371)](/<EXP:[ ](\d+)>/i))_0x1a9def[_0x162cdd(0x517)]=Number(RegExp['$1']);if(_0x351d7c[_0x162cdd(0x371)](/<GOLD:[ ](\d+)>/i))_0x1a9def[_0x162cdd(0x43a)]=Number(RegExp['$1']);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1ad)]=Graphics[_0x5d7dff(0x1e4)],Graphics[_0x5d7dff(0x1e4)]=function(){const _0x37b92f=_0x5d7dff;switch(VisuMZ[_0x37b92f(0x7ac)]['Settings']['QoL'][_0x37b92f(0x63f)]){case _0x37b92f(0x8aa):return!![];case _0x37b92f(0x76d):return![];default:return VisuMZ['CoreEngine'][_0x37b92f(0x1ad)][_0x37b92f(0x5d5)](this);}},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x38d)]=Graphics['printError'],Graphics[_0x5d7dff(0x5de)]=function(_0x40daa7,_0x2f2701,_0x1e1204=null){const _0x49938e=_0x5d7dff;VisuMZ['CoreEngine'][_0x49938e(0x38d)]['call'](this,_0x40daa7,_0x2f2701,_0x1e1204),VisuMZ['ShowDevTools'](![]);},VisuMZ['CoreEngine'][_0x5d7dff(0x6a7)]=Graphics['_centerElement'],Graphics[_0x5d7dff(0x3c3)]=function(_0x5d480c){const _0x57c148=_0x5d7dff;VisuMZ[_0x57c148(0x7ac)][_0x57c148(0x6a7)][_0x57c148(0x5d5)](this,_0x5d480c),this[_0x57c148(0x843)](_0x5d480c);},Graphics[_0x5d7dff(0x843)]=function(_0x5ae2b9){const _0x519b49=_0x5d7dff;VisuMZ[_0x519b49(0x7ac)][_0x519b49(0x37c)][_0x519b49(0x116)][_0x519b49(0x8a4)]&&(_0x5ae2b9[_0x519b49(0x5b0)][_0x519b49(0x168)]=_0x519b49(0x7a9));VisuMZ[_0x519b49(0x7ac)][_0x519b49(0x37c)]['QoL'][_0x519b49(0xe6)]&&(_0x5ae2b9[_0x519b49(0x5b0)][_0x519b49(0x495)]=_0x519b49(0x3e6));const _0x26bad5=Math[_0x519b49(0xee)](0x0,Math[_0x519b49(0x559)](_0x5ae2b9[_0x519b49(0x47e)]*this[_0x519b49(0x6e4)])),_0x4059f1=Math[_0x519b49(0xee)](0x0,Math[_0x519b49(0x559)](_0x5ae2b9[_0x519b49(0x8af)]*this[_0x519b49(0x6e4)]));_0x5ae2b9[_0x519b49(0x5b0)]['width']=_0x26bad5+'px',_0x5ae2b9[_0x519b49(0x5b0)]['height']=_0x4059f1+'px';},VisuMZ[_0x5d7dff(0x7ac)]['Bitmap_initialize']=Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)],Bitmap[_0x5d7dff(0x4fa)]['initialize']=function(_0x203aa8,_0x32c3f2){const _0x230bf3=_0x5d7dff;VisuMZ[_0x230bf3(0x7ac)]['Bitmap_initialize'][_0x230bf3(0x5d5)](this,_0x203aa8,_0x32c3f2),this[_0x230bf3(0x5ea)]=!(VisuMZ[_0x230bf3(0x7ac)][_0x230bf3(0x37c)][_0x230bf3(0x116)][_0x230bf3(0xe6)]??!![]);},Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x104)]=function(){this['_customModified']=!![];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x10d)]=Sprite['prototype'][_0x5d7dff(0x7f8)],Sprite[_0x5d7dff(0x4fa)][_0x5d7dff(0x7f8)]=function(){const _0x376f4c=_0x5d7dff;if(this[_0x376f4c(0x38c)])VisuMZ[_0x376f4c(0x7ac)][_0x376f4c(0x10d)][_0x376f4c(0x5d5)](this);this[_0x376f4c(0x64c)]();},Sprite[_0x5d7dff(0x4fa)][_0x5d7dff(0x64c)]=function(){const _0x1cb461=_0x5d7dff;if(!this['bitmap'])return;if(!this['bitmap']['_customModified'])return;this[_0x1cb461(0x78d)][_0x1cb461(0x6ac)]&&!this[_0x1cb461(0x41c)][_0x1cb461(0x6ac)]['destroyed']&&this[_0x1cb461(0x78d)][_0x1cb461(0x7f8)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x81f)]=Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x5ca)],Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x5ca)]=function(_0x230b9d,_0x45d6ef){const _0x1058a0=_0x5d7dff;VisuMZ[_0x1058a0(0x7ac)][_0x1058a0(0x81f)]['call'](this,_0x230b9d,_0x45d6ef),this['markCoreEngineModified']();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x77d)]=Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x6b6)],Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x6b6)]=function(_0x5f55c3,_0x22528e,_0x3f23a0,_0x149e9a,_0x1372b3,_0x5f1424,_0x20f4e8,_0x47f309,_0x260254){const _0x405235=_0x5d7dff;_0x22528e=Math[_0x405235(0xd6)](_0x22528e),_0x3f23a0=Math[_0x405235(0xd6)](_0x3f23a0),_0x149e9a=Math['round'](_0x149e9a),_0x1372b3=Math[_0x405235(0xd6)](_0x1372b3),_0x5f1424=Math[_0x405235(0xd6)](_0x5f1424),_0x20f4e8=Math[_0x405235(0xd6)](_0x20f4e8),VisuMZ[_0x405235(0x7ac)][_0x405235(0x77d)][_0x405235(0x5d5)](this,_0x5f55c3,_0x22528e,_0x3f23a0,_0x149e9a,_0x1372b3,_0x5f1424,_0x20f4e8,_0x47f309,_0x260254),this['markCoreEngineModified']();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x706)]=Bitmap['prototype'][_0x5d7dff(0x32d)],Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x32d)]=function(_0x100dff,_0x28d843,_0x474c39,_0x594454){const _0xce8ca3=_0x5d7dff;VisuMZ[_0xce8ca3(0x7ac)][_0xce8ca3(0x706)][_0xce8ca3(0x5d5)](this,_0x100dff,_0x28d843,_0x474c39,_0x594454),this[_0xce8ca3(0x104)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x2de)]=Bitmap['prototype'][_0x5d7dff(0x878)],Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x878)]=function(_0x4d0d8c,_0x3ddf84,_0x3c1721,_0x2434dc,_0x1ea228){const _0x5b2c8c=_0x5d7dff;VisuMZ[_0x5b2c8c(0x7ac)][_0x5b2c8c(0x2de)]['call'](this,_0x4d0d8c,_0x3ddf84,_0x3c1721,_0x2434dc,_0x1ea228),this[_0x5b2c8c(0x104)]();},VisuMZ['CoreEngine'][_0x5d7dff(0x678)]=Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x739)],Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x739)]=function(_0x5b5fda,_0x355dd3,_0x2acc83,_0x238288,_0x2b0e82){const _0x4edfd9=_0x5d7dff;VisuMZ[_0x4edfd9(0x7ac)][_0x4edfd9(0x678)]['call'](this,_0x5b5fda,_0x355dd3,_0x2acc83,_0x238288,_0x2b0e82),this[_0x4edfd9(0x104)]();},VisuMZ['CoreEngine'][_0x5d7dff(0x43c)]=Bitmap['prototype']['gradientFillRect'],Bitmap[_0x5d7dff(0x4fa)]['gradientFillRect']=function(_0x24039e,_0x456e67,_0x5c3a12,_0x37f98f,_0x138f24,_0x55150c,_0x11528d){const _0x4dce69=_0x5d7dff;VisuMZ[_0x4dce69(0x7ac)][_0x4dce69(0x43c)][_0x4dce69(0x5d5)](this,_0x24039e,_0x456e67,_0x5c3a12,_0x37f98f,_0x138f24,_0x55150c,_0x11528d),this['markCoreEngineModified']();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x2e1)]=Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x1b5)],Bitmap['prototype'][_0x5d7dff(0x1b5)]=function(_0x4fc0b0,_0x5c8e1f,_0x329c62,_0x529ac0){const _0x33d713=_0x5d7dff;_0x4fc0b0=Math[_0x33d713(0xd6)](_0x4fc0b0),_0x5c8e1f=Math[_0x33d713(0xd6)](_0x5c8e1f),_0x329c62=Math[_0x33d713(0xd6)](_0x329c62),VisuMZ[_0x33d713(0x7ac)][_0x33d713(0x2e1)][_0x33d713(0x5d5)](this,_0x4fc0b0,_0x5c8e1f,_0x329c62,_0x529ac0),this[_0x33d713(0x104)]();},VisuMZ[_0x5d7dff(0x7ac)]['Bitmap_measureTextWidth']=Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x586)],Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x586)]=function(_0x55b311){const _0x374aa5=_0x5d7dff;return Math[_0x374aa5(0x5c6)](VisuMZ[_0x374aa5(0x7ac)][_0x374aa5(0x3c8)][_0x374aa5(0x5d5)](this,_0x55b311));},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x6e7)]=Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x7f1)],Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x7f1)]=function(_0x16bd71,_0x456559,_0x1a046c,_0x362574,_0x1c494d,_0x21232f){const _0xbffa66=_0x5d7dff;_0x456559=Math[_0xbffa66(0xd6)](_0x456559),_0x1a046c=Math[_0xbffa66(0xd6)](_0x1a046c),_0x362574=Math[_0xbffa66(0x5c6)](_0x362574),_0x1c494d=Math[_0xbffa66(0x5c6)](_0x1c494d),VisuMZ[_0xbffa66(0x7ac)][_0xbffa66(0x6e7)][_0xbffa66(0x5d5)](this,_0x16bd71,_0x456559,_0x1a046c,_0x362574,_0x1c494d,_0x21232f),this[_0xbffa66(0x104)]();},VisuMZ['CoreEngine'][_0x5d7dff(0x46d)]=Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x3f4)],Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x3f4)]=function(_0x2286a2,_0x5280d5,_0x168666,_0x36a7a5){const _0xbba23c=_0x5d7dff;VisuMZ[_0xbba23c(0x7ac)][_0xbba23c(0x37c)][_0xbba23c(0x116)][_0xbba23c(0x3b7)]?this['_drawTextShadow'](_0x2286a2,_0x5280d5,_0x168666,_0x36a7a5):VisuMZ[_0xbba23c(0x7ac)][_0xbba23c(0x46d)][_0xbba23c(0x5d5)](this,_0x2286a2,_0x5280d5,_0x168666,_0x36a7a5);},Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x82b)]=function(_0x130624,_0x21651d,_0x1e7a4b,_0x5d0af0){const _0xc4e131=_0x5d7dff,_0x56399d=this[_0xc4e131(0x575)];_0x56399d[_0xc4e131(0x4c3)]=this[_0xc4e131(0x362)],_0x56399d[_0xc4e131(0x6e5)](_0x130624,_0x21651d+0x2,_0x1e7a4b+0x2,_0x5d0af0);},VisuMZ[_0x5d7dff(0x7ac)]['Input_clear']=Input[_0x5d7dff(0x577)],Input[_0x5d7dff(0x577)]=function(){const _0x2897ab=_0x5d7dff;VisuMZ[_0x2897ab(0x7ac)][_0x2897ab(0x4cf)][_0x2897ab(0x5d5)](this),this[_0x2897ab(0x51a)]=undefined,this['_inputSpecialKeyCode']=undefined,this[_0x2897ab(0x4ef)]=Input[_0x2897ab(0x76e)];},VisuMZ['CoreEngine'][_0x5d7dff(0x7c5)]=Input['update'],Input[_0x5d7dff(0x75f)]=function(){const _0x5dc2a4=_0x5d7dff;VisuMZ[_0x5dc2a4(0x7ac)][_0x5dc2a4(0x7c5)][_0x5dc2a4(0x5d5)](this);if(this['_gamepadWait'])this['_gamepadWait']--;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x11b)]=Input['_pollGamepads'],Input[_0x5d7dff(0x8cb)]=function(){const _0x431f77=_0x5d7dff;if(this[_0x431f77(0x4ef)])return;VisuMZ[_0x431f77(0x7ac)][_0x431f77(0x11b)][_0x431f77(0x5d5)](this);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x4f1)]=Input[_0x5d7dff(0x585)],Input[_0x5d7dff(0x585)]=function(){const _0x270c37=_0x5d7dff;VisuMZ['CoreEngine'][_0x270c37(0x4f1)][_0x270c37(0x5d5)](this),document[_0x270c37(0x3f3)](_0x270c37(0x573),this['_onKeyPress']['bind'](this));},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x682)]=Input[_0x5d7dff(0xd1)],Input['_onKeyDown']=function(_0x31b1b7){const _0x395bce=_0x5d7dff;this['_inputSpecialKeyCode']=_0x31b1b7[_0x395bce(0x22a)],VisuMZ[_0x395bce(0x7ac)][_0x395bce(0x682)][_0x395bce(0x5d5)](this,_0x31b1b7),this['setLastGamepadUsed'](null);},Input[_0x5d7dff(0x8b3)]=function(_0x517abb){const _0x568655=_0x5d7dff;this[_0x568655(0x174)](_0x517abb);},Input[_0x5d7dff(0x174)]=function(_0x52f240){const _0x5b199e=_0x5d7dff;this[_0x5b199e(0x4c7)]=_0x52f240[_0x5b199e(0x22a)];let _0x2538f9=String[_0x5b199e(0x5d4)](_0x52f240[_0x5b199e(0x72a)]);this[_0x5b199e(0x51a)]===undefined?this[_0x5b199e(0x51a)]=_0x2538f9:this[_0x5b199e(0x51a)]+=_0x2538f9;},VisuMZ[_0x5d7dff(0x7ac)]['Input_shouldPreventDefault']=Input[_0x5d7dff(0x664)],Input[_0x5d7dff(0x664)]=function(_0x29dcc5){const _0x129f48=_0x5d7dff;if(_0x29dcc5===0x8)return![];return VisuMZ['CoreEngine']['Input_shouldPreventDefault'][_0x129f48(0x5d5)](this,_0x29dcc5);},Input['isSpecialCode']=function(_0x2abd11){const _0x15db45=_0x5d7dff;if(_0x2abd11['match'](/backspace/i))return this[_0x15db45(0x4c7)]===0x8;if(_0x2abd11[_0x15db45(0x371)](/enter/i))return this[_0x15db45(0x4c7)]===0xd;if(_0x2abd11[_0x15db45(0x371)](/escape/i))return this['_inputSpecialKeyCode']===0x1b;},Input[_0x5d7dff(0x2f2)]=function(){const _0x126f41=_0x5d7dff;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39][_0x126f41(0x77e)](this[_0x126f41(0x4c7)]);},Input[_0x5d7dff(0x2dd)]=function(){const _0x299866=_0x5d7dff;return[0x25,0x26,0x27,0x28][_0x299866(0x77e)](this[_0x299866(0x4c7)]);},Input[_0x5d7dff(0x7c7)]=function(){const _0x49a59c=_0x5d7dff;if(navigator[_0x49a59c(0x32b)]){const _0x5c0ee0=navigator[_0x49a59c(0x32b)]();if(_0x5c0ee0)for(const _0x38ec57 of _0x5c0ee0){if(_0x38ec57&&_0x38ec57[_0x49a59c(0x1b6)])return!![];}}return![];},Input[_0x5d7dff(0x7c9)]=function(){const _0x34959d=_0x5d7dff;if(navigator['getGamepads']){const _0x420ffa=navigator[_0x34959d(0x32b)]();if(_0x420ffa)for(const _0x427048 of _0x420ffa){if(_0x427048&&_0x427048['connected']){if(this['isGamepadButtonPressed'](_0x427048))return!![];if(this[_0x34959d(0x66d)](_0x427048))return!![];}}}return![];},Input['isGamepadButtonPressed']=function(_0x4cdbf9){const _0x5cc080=_0x5d7dff,_0x4a4fdd=_0x4cdbf9[_0x5cc080(0x1e1)];for(let _0x447a23=0x0;_0x447a23<_0x4a4fdd[_0x5cc080(0xfd)];_0x447a23++){if(_0x4a4fdd[_0x447a23]['pressed'])return!![];}return![];},Input['isGamepadAxisMoved']=function(_0x2fe3ae){const _0x1106da=_0x5d7dff,_0x129027=_0x2fe3ae[_0x1106da(0x822)],_0x33934d=0.5;if(_0x129027[0x0]<-_0x33934d)return!![];if(_0x129027[0x0]>_0x33934d)return!![];if(_0x129027[0x1]<-_0x33934d)return!![];if(_0x129027[0x1]>_0x33934d)return!![];return![];},Input[_0x5d7dff(0x746)]=function(){const _0x563619=_0x5d7dff;return this[_0x563619(0x18d)]||null;},Input[_0x5d7dff(0x5e5)]=function(_0x229c7f){this['_lastGamepad']=_0x229c7f;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x7b0)]=Input[_0x5d7dff(0x4cd)],Input['_updateGamepadState']=function(_0x197033){const _0xd2c4b=_0x5d7dff;VisuMZ['CoreEngine'][_0xd2c4b(0x7b0)][_0xd2c4b(0x5d5)](this,_0x197033),(this[_0xd2c4b(0x456)](_0x197033)||this[_0xd2c4b(0x66d)](_0x197033))&&this[_0xd2c4b(0x5e5)](_0x197033);},Input[_0x5d7dff(0x488)]=function(){const _0x2675b1=_0x5d7dff;return this['_lastGamepad']?this[_0x2675b1(0x18d)]['id']:'Keyboard';},VisuMZ[_0x5d7dff(0x7ac)]['Tilemap_addShadow']=Tilemap[_0x5d7dff(0x4fa)][_0x5d7dff(0x5df)],Tilemap['prototype'][_0x5d7dff(0x5df)]=function(_0x5d98bb,_0x5c5774,_0x19f967,_0x35a06d){const _0x205b2d=_0x5d7dff;if($gameMap&&$gameMap[_0x205b2d(0x2c7)]())return;VisuMZ['CoreEngine'][_0x205b2d(0x26c)][_0x205b2d(0x5d5)](this,_0x5d98bb,_0x5c5774,_0x19f967,_0x35a06d);},Tilemap[_0x5d7dff(0x2d9)][_0x5d7dff(0x4fa)]['_createInternalTextures']=function(){const _0x5e9210=_0x5d7dff;this[_0x5e9210(0x870)]();for(let _0x292a6c=0x0;_0x292a6c<Tilemap[_0x5e9210(0x7fe)][_0x5e9210(0x49d)];_0x292a6c++){const _0x2be286=new PIXI[(_0x5e9210(0x112))]();_0x2be286[_0x5e9210(0x43b)](0x800,0x800),VisuMZ['CoreEngine']['Settings']['QoL'][_0x5e9210(0xe6)]&&(_0x2be286[_0x5e9210(0x775)]=PIXI[_0x5e9210(0x740)][_0x5e9210(0x7a4)]),this[_0x5e9210(0x25b)]['push'](_0x2be286);}},WindowLayer[_0x5d7dff(0x4fa)][_0x5d7dff(0x647)]=function(){const _0x12667c=_0x5d7dff;return SceneManager&&SceneManager[_0x12667c(0x882)]?SceneManager[_0x12667c(0x882)][_0x12667c(0x459)]():!![];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x35a)]=WindowLayer[_0x5d7dff(0x4fa)][_0x5d7dff(0x745)],WindowLayer[_0x5d7dff(0x4fa)]['render']=function render(_0x351889){const _0x16ba18=_0x5d7dff;this[_0x16ba18(0x647)]()?VisuMZ[_0x16ba18(0x7ac)][_0x16ba18(0x35a)][_0x16ba18(0x5d5)](this,_0x351889):this[_0x16ba18(0x81e)](_0x351889);},WindowLayer[_0x5d7dff(0x4fa)][_0x5d7dff(0x81e)]=function render(_0x34b305){const _0x32fb06=_0x5d7dff;if(!this['visible'])return;const _0xed71c7=new PIXI[(_0x32fb06(0xc4))](),_0x514416=_0x34b305['gl'],_0x325cf6=this[_0x32fb06(0x80c)][_0x32fb06(0x514)]();_0x34b305[_0x32fb06(0x47c)]['forceStencil'](),_0xed71c7[_0x32fb06(0x47d)]=this[_0x32fb06(0x47d)],_0x34b305[_0x32fb06(0x449)][_0x32fb06(0x1b8)](),_0x514416[_0x32fb06(0x463)](_0x514416[_0x32fb06(0x438)]);while(_0x325cf6['length']>0x0){const _0x5b16f7=_0x325cf6[_0x32fb06(0x226)]();_0x5b16f7[_0x32fb06(0x3d0)]&&_0x5b16f7[_0x32fb06(0x267)]&&_0x5b16f7['openness']>0x0&&(_0x514416[_0x32fb06(0x7d9)](_0x514416['EQUAL'],0x0,~0x0),_0x514416[_0x32fb06(0x753)](_0x514416[_0x32fb06(0x58a)],_0x514416['KEEP'],_0x514416[_0x32fb06(0x58a)]),_0x5b16f7[_0x32fb06(0x745)](_0x34b305),_0x34b305['batch'][_0x32fb06(0x1b8)](),_0xed71c7[_0x32fb06(0x577)](),_0x514416['stencilFunc'](_0x514416[_0x32fb06(0x508)],0x1,~0x0),_0x514416[_0x32fb06(0x753)](_0x514416['REPLACE'],_0x514416[_0x32fb06(0x7c0)],_0x514416['REPLACE']),_0x514416[_0x32fb06(0x1c4)](_0x514416['ZERO'],_0x514416['ONE']),_0xed71c7[_0x32fb06(0x745)](_0x34b305),_0x34b305[_0x32fb06(0x449)][_0x32fb06(0x1b8)](),_0x514416[_0x32fb06(0x1c4)](_0x514416[_0x32fb06(0x536)],_0x514416['ONE_MINUS_SRC_ALPHA']));}_0x514416[_0x32fb06(0x155)](_0x514416[_0x32fb06(0x438)]),_0x514416[_0x32fb06(0x577)](_0x514416[_0x32fb06(0x710)]),_0x514416[_0x32fb06(0x87c)](0x0),_0x34b305[_0x32fb06(0x449)][_0x32fb06(0x1b8)]();for(const _0x4dd4f5 of this['children']){!_0x4dd4f5['_isWindow']&&_0x4dd4f5[_0x32fb06(0x267)]&&_0x4dd4f5[_0x32fb06(0x745)](_0x34b305);}_0x34b305[_0x32fb06(0x449)][_0x32fb06(0x1b8)]();},DataManager[_0x5d7dff(0x50c)]=function(_0x31d361){const _0x1c5b78=_0x5d7dff;return this[_0x1c5b78(0x71c)](_0x31d361)&&_0x31d361['itypeId']===0x2;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x8c5)]=DataManager[_0x5d7dff(0x435)],DataManager[_0x5d7dff(0x435)]=function(){const _0x53ed89=_0x5d7dff;VisuMZ[_0x53ed89(0x7ac)][_0x53ed89(0x8c5)][_0x53ed89(0x5d5)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x53ed89(0x493)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x9147f4=_0x5d7dff;if($gameTemp[_0x9147f4(0x898)]()){const _0x939b8c=VisuMZ[_0x9147f4(0x7ac)][_0x9147f4(0x37c)][_0x9147f4(0x116)][_0x9147f4(0x434)];if(_0x939b8c>0x0)$gameTemp[_0x9147f4(0x1d8)](_0x939b8c);}},DataManager[_0x5d7dff(0x493)]=function(){const _0x3ed623=_0x5d7dff,_0x876860=VisuMZ[_0x3ed623(0x7ac)]['Settings'][_0x3ed623(0x116)][_0x3ed623(0x51b)]||0x0;if(_0x876860>0x0)$gameTemp[_0x3ed623(0x1d8)](_0x876860);},DataManager[_0x5d7dff(0x578)]=function(_0x5b80ca){const _0x3aecec=_0x5d7dff,_0x22ae1b=$dataTroops[_0x5b80ca];if(!_0x22ae1b)return'';let _0x9274ab='';_0x9274ab+=_0x22ae1b[_0x3aecec(0x814)];for(const _0x1b8e73 of _0x22ae1b[_0x3aecec(0x298)]){for(const _0x1dc14d of _0x1b8e73[_0x3aecec(0x385)]){[0x6c,0x198][_0x3aecec(0x617)](_0x1dc14d['code'])&&(_0x9274ab+='\x0a',_0x9274ab+=_0x1dc14d[_0x3aecec(0x896)][0x0]);}}return _0x9274ab;};(VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x116)][_0x5d7dff(0x194)]??!![])&&($scene=null,VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1ae)]=Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)],Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)]=function(){const _0x4ed3f3=_0x5d7dff;VisuMZ[_0x4ed3f3(0x7ac)][_0x4ed3f3(0x1ae)][_0x4ed3f3(0x5d5)](this),$scene=this;},$spriteset=null,VisuMZ[_0x5d7dff(0x7ac)]['Scene_Map_createSpriteset']=Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x10a)],Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x10a)]=function(){const _0x3b1ba8=_0x5d7dff;VisuMZ['CoreEngine'][_0x3b1ba8(0x54a)]['call'](this),$spriteset=this['_spriteset'];},VisuMZ['CoreEngine'][_0x5d7dff(0x553)]=Scene_Battle[_0x5d7dff(0x4fa)]['createSpriteset'],Scene_Battle[_0x5d7dff(0x4fa)][_0x5d7dff(0x10a)]=function(){const _0x560820=_0x5d7dff;VisuMZ['CoreEngine'][_0x560820(0x553)][_0x560820(0x5d5)](this),$spriteset=this['_spriteset'];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x13f)]=Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x7f2)],Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x7f2)]=function(){const _0x4fd254=_0x5d7dff;VisuMZ[_0x4fd254(0x7ac)][_0x4fd254(0x13f)][_0x4fd254(0x5d5)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37a)]=BattleManager[_0x5d7dff(0x75f)],BattleManager[_0x5d7dff(0x75f)]=function(_0x1bb336){const _0x3d7cf6=_0x5d7dff;VisuMZ[_0x3d7cf6(0x7ac)]['BattleManager_update']['call'](this,_0x1bb336),this['updateBattleVariables']();},BattleManager[_0x5d7dff(0x699)]=function(){const _0x345aea=_0x5d7dff;$subject=this[_0x345aea(0x545)],$targets=this[_0x345aea(0x782)],$target=this[_0x345aea(0x50a)]||this['_targets'][0x0];},$event=null,VisuMZ[_0x5d7dff(0x7ac)]['Game_Event_start']=Game_Event[_0x5d7dff(0x4fa)][_0x5d7dff(0x2b0)],Game_Event[_0x5d7dff(0x4fa)][_0x5d7dff(0x2b0)]=function(){const _0x18f8ad=_0x5d7dff;VisuMZ[_0x18f8ad(0x7ac)][_0x18f8ad(0x7b2)][_0x18f8ad(0x5d5)](this),$event=this;},VisuMZ[_0x5d7dff(0x7ac)]['Scene_Map_update']=Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x75f)],Scene_Map['prototype'][_0x5d7dff(0x75f)]=function(){const _0x586f1b=_0x5d7dff;VisuMZ['CoreEngine'][_0x586f1b(0x71b)]['call'](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x1f6)]=function(){!this['isEventRunning']()&&$event!==null&&($event=null);},$commonEvent=function(_0x5e1c95){const _0x204eed=_0x5d7dff;if($gameTemp)$gameTemp[_0x204eed(0x1d8)](_0x5e1c95);});;$onceParallel=function(_0x539c87,_0x163531){const _0x34a2d5=_0x5d7dff;if(SceneManager['isSceneMap']())SceneManager[_0x34a2d5(0x882)][_0x34a2d5(0x5cf)](_0x539c87,_0x163531);else{if(SceneManager[_0x34a2d5(0x718)]()){if(Imported[_0x34a2d5(0x436)])SceneManager[_0x34a2d5(0x882)][_0x34a2d5(0x5cf)](_0x539c87);else $gameTemp&&$gameTemp[_0x34a2d5(0x898)]()&&alert('Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!');}else $gameTemp&&$gameTemp[_0x34a2d5(0x898)]()&&alert(_0x34a2d5(0x39d));}},StorageManager[_0x5d7dff(0x10b)]=function(_0x374dfa){return new Promise((_0x1b8fc6,_0x5288f3)=>{const _0x543614=_0x195c;try{const _0x2c2985=pako[_0x543614(0x749)](_0x374dfa,{'to':'string','level':0x1});if(_0x2c2985[_0x543614(0xfd)]>=0xc350){}_0x1b8fc6(_0x2c2985);}catch(_0x3764c5){_0x5288f3(_0x3764c5);}});},TextManager[_0x5d7dff(0x679)]=['','','',_0x5d7dff(0x345),'','','HELP','',_0x5d7dff(0x7d6),_0x5d7dff(0x19c),'','','CLEAR',_0x5d7dff(0x723),_0x5d7dff(0x539),'',_0x5d7dff(0x717),_0x5d7dff(0x5bf),_0x5d7dff(0x29b),_0x5d7dff(0x4b1),_0x5d7dff(0x658),_0x5d7dff(0x52c),_0x5d7dff(0x59e),'JUNJA',_0x5d7dff(0x374),'HANJA','',_0x5d7dff(0x29c),_0x5d7dff(0x217),_0x5d7dff(0x620),'ACCEPT',_0x5d7dff(0x2cd),_0x5d7dff(0x72f),_0x5d7dff(0x344),_0x5d7dff(0x384),_0x5d7dff(0x175),_0x5d7dff(0x707),_0x5d7dff(0x77b),'UP',_0x5d7dff(0x72c),_0x5d7dff(0x45c),_0x5d7dff(0x671),_0x5d7dff(0x5be),_0x5d7dff(0x8c3),_0x5d7dff(0x899),_0x5d7dff(0x6d2),_0x5d7dff(0x737),'','0','1','2','3','4','5','6','7','8','9','COLON','SEMICOLON',_0x5d7dff(0x6d7),_0x5d7dff(0x5c2),_0x5d7dff(0x4b4),_0x5d7dff(0x289),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x5d7dff(0x839),'',_0x5d7dff(0x698),'','SLEEP',_0x5d7dff(0x554),'NUMPAD1','NUMPAD2',_0x5d7dff(0x4eb),_0x5d7dff(0x776),_0x5d7dff(0x33d),'NUMPAD6',_0x5d7dff(0x195),_0x5d7dff(0x89f),'NUMPAD9','MULTIPLY',_0x5d7dff(0x4e8),_0x5d7dff(0x3f1),_0x5d7dff(0x2b7),_0x5d7dff(0x6bb),_0x5d7dff(0x633),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x5d7dff(0x207),_0x5d7dff(0x3e3),_0x5d7dff(0x1da),_0x5d7dff(0x607),_0x5d7dff(0x61a),_0x5d7dff(0x4ff),_0x5d7dff(0x67b),_0x5d7dff(0x560),'F19',_0x5d7dff(0x4d0),'F21',_0x5d7dff(0xf3),_0x5d7dff(0x1fb),_0x5d7dff(0x26f),'','','','','','','','',_0x5d7dff(0x778),_0x5d7dff(0x764),_0x5d7dff(0x532),'WIN_OEM_FJ_MASSHOU','WIN_OEM_FJ_TOUROKU',_0x5d7dff(0x2be),'WIN_OEM_FJ_ROYA','','','','','','','','','',_0x5d7dff(0x602),_0x5d7dff(0xdf),_0x5d7dff(0x6df),_0x5d7dff(0x57e),_0x5d7dff(0x652),_0x5d7dff(0x178),_0x5d7dff(0x621),_0x5d7dff(0x1f8),'OPEN_PAREN',_0x5d7dff(0x1fa),'ASTERISK','PLUS',_0x5d7dff(0x451),_0x5d7dff(0xf8),_0x5d7dff(0x751),'CLOSE_CURLY_BRACKET',_0x5d7dff(0x549),'','','','',_0x5d7dff(0x3c1),_0x5d7dff(0x20f),_0x5d7dff(0x75d),'','','SEMICOLON',_0x5d7dff(0x5c2),_0x5d7dff(0x33e),'MINUS',_0x5d7dff(0x7d2),'SLASH','BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x5d7dff(0x204),_0x5d7dff(0x188),_0x5d7dff(0x21d),_0x5d7dff(0x2d2),'',_0x5d7dff(0x5f8),_0x5d7dff(0x6ab),'',_0x5d7dff(0x635),_0x5d7dff(0x5ec),'','WIN_ICO_CLEAR','','',_0x5d7dff(0x59c),_0x5d7dff(0x4e9),_0x5d7dff(0x5f9),_0x5d7dff(0x284),_0x5d7dff(0xbd),_0x5d7dff(0x1de),'WIN_OEM_CUSEL',_0x5d7dff(0x502),_0x5d7dff(0x875),_0x5d7dff(0x499),_0x5d7dff(0xcf),_0x5d7dff(0x505),'WIN_OEM_BACKTAB',_0x5d7dff(0x398),_0x5d7dff(0x70a),_0x5d7dff(0x2d4),_0x5d7dff(0x347),'PLAY','ZOOM','','PA1','WIN_OEM_CLEAR',''],TextManager['buttonAssistOk']=VisuMZ[_0x5d7dff(0x7ac)]['Settings']['ButtonAssist'][_0x5d7dff(0x152)],TextManager[_0x5d7dff(0xde)]=VisuMZ[_0x5d7dff(0x7ac)]['Settings'][_0x5d7dff(0x4f6)][_0x5d7dff(0x1fc)],TextManager[_0x5d7dff(0x268)]=VisuMZ[_0x5d7dff(0x7ac)]['Settings']['ButtonAssist'][_0x5d7dff(0xb9)],VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x3e7)]=TextManager[_0x5d7dff(0x314)],TextManager[_0x5d7dff(0x314)]=function(_0x4698e4){const _0xcec2cd=_0x5d7dff;return typeof _0x4698e4===_0xcec2cd(0x247)?VisuMZ['CoreEngine']['TextManager_param'][_0xcec2cd(0x5d5)](this,_0x4698e4):this[_0xcec2cd(0x2b9)](_0x4698e4);},TextManager[_0x5d7dff(0x2b9)]=function(_0xfcffe1){const _0xc3ffc5=_0x5d7dff;_0xfcffe1=String(_0xfcffe1||'')[_0xc3ffc5(0x496)]();const _0x589157=VisuMZ[_0xc3ffc5(0x7ac)][_0xc3ffc5(0x37c)][_0xc3ffc5(0x3b6)];if(_0xfcffe1===_0xc3ffc5(0x57c))return $dataSystem[_0xc3ffc5(0x550)]['params'][0x0];if(_0xfcffe1===_0xc3ffc5(0x84f))return $dataSystem[_0xc3ffc5(0x550)]['params'][0x1];if(_0xfcffe1===_0xc3ffc5(0x48b))return $dataSystem[_0xc3ffc5(0x550)][_0xc3ffc5(0x73f)][0x2];if(_0xfcffe1===_0xc3ffc5(0xfe))return $dataSystem['terms'][_0xc3ffc5(0x73f)][0x3];if(_0xfcffe1==='MAT')return $dataSystem[_0xc3ffc5(0x550)][_0xc3ffc5(0x73f)][0x4];if(_0xfcffe1===_0xc3ffc5(0x60c))return $dataSystem[_0xc3ffc5(0x550)][_0xc3ffc5(0x73f)][0x5];if(_0xfcffe1==='AGI')return $dataSystem[_0xc3ffc5(0x550)]['params'][0x6];if(_0xfcffe1===_0xc3ffc5(0x3b1))return $dataSystem[_0xc3ffc5(0x550)][_0xc3ffc5(0x73f)][0x7];if(_0xfcffe1===_0xc3ffc5(0x56a))return _0x589157['XParamVocab0'];if(_0xfcffe1===_0xc3ffc5(0x67e))return _0x589157['XParamVocab1'];if(_0xfcffe1===_0xc3ffc5(0x4a6))return _0x589157[_0xc3ffc5(0x462)];if(_0xfcffe1===_0xc3ffc5(0x695))return _0x589157[_0xc3ffc5(0x676)];if(_0xfcffe1===_0xc3ffc5(0x82c))return _0x589157[_0xc3ffc5(0x368)];if(_0xfcffe1===_0xc3ffc5(0x734))return _0x589157[_0xc3ffc5(0x329)];if(_0xfcffe1===_0xc3ffc5(0x85e))return _0x589157[_0xc3ffc5(0x49e)];if(_0xfcffe1===_0xc3ffc5(0x72b))return _0x589157['XParamVocab7'];if(_0xfcffe1===_0xc3ffc5(0x49f))return _0x589157[_0xc3ffc5(0x7b8)];if(_0xfcffe1==='TRG')return _0x589157['XParamVocab9'];if(_0xfcffe1==='TGR')return _0x589157[_0xc3ffc5(0x16c)];if(_0xfcffe1===_0xc3ffc5(0x2a7))return _0x589157['SParamVocab1'];if(_0xfcffe1==='REC')return _0x589157[_0xc3ffc5(0x280)];if(_0xfcffe1===_0xc3ffc5(0x483))return _0x589157[_0xc3ffc5(0x133)];if(_0xfcffe1===_0xc3ffc5(0x6b4))return _0x589157[_0xc3ffc5(0x1cd)];if(_0xfcffe1===_0xc3ffc5(0x780))return _0x589157[_0xc3ffc5(0x330)];if(_0xfcffe1===_0xc3ffc5(0xcd))return _0x589157[_0xc3ffc5(0x2c9)];if(_0xfcffe1===_0xc3ffc5(0x26a))return _0x589157[_0xc3ffc5(0xe4)];if(_0xfcffe1===_0xc3ffc5(0x3a4))return _0x589157[_0xc3ffc5(0x7fa)];if(_0xfcffe1===_0xc3ffc5(0x6a9))return _0x589157['SParamVocab9'];if(VisuMZ[_0xc3ffc5(0x7ac)][_0xc3ffc5(0x656)][_0xfcffe1])return VisuMZ[_0xc3ffc5(0x7ac)][_0xc3ffc5(0x656)][_0xfcffe1];return'';},TextManager[_0x5d7dff(0x2fe)]=function(_0x16997c){const _0x1dadc6=_0x5d7dff,_0x47615f=Input['getLastUsedGamepadType']();return _0x47615f===_0x1dadc6(0x36d)?this[_0x1dadc6(0x319)](_0x16997c):this[_0x1dadc6(0x240)](_0x47615f,_0x16997c);},TextManager[_0x5d7dff(0x319)]=function(_0x3ea5d8){const _0x1fcbfa=_0x5d7dff;let _0x70dab2=VisuMZ[_0x1fcbfa(0x7ac)][_0x1fcbfa(0x37c)][_0x1fcbfa(0x4f6)][_0x1fcbfa(0x8bb)];if(!_0x70dab2){if(_0x3ea5d8===_0x1fcbfa(0x381))_0x3ea5d8=_0x1fcbfa(0x877);if(_0x3ea5d8===_0x1fcbfa(0x277))_0x3ea5d8=_0x1fcbfa(0x877);}let _0x5f27d0=[];for(let _0x186241 in Input[_0x1fcbfa(0x157)]){_0x186241=Number(_0x186241);if(_0x186241>=0x60&&_0x186241<=0x69)continue;if([0x12,0x20][_0x1fcbfa(0x617)](_0x186241))continue;_0x3ea5d8===Input[_0x1fcbfa(0x157)][_0x186241]&&_0x5f27d0['push'](_0x186241);}for(let _0x4d3162=0x0;_0x4d3162<_0x5f27d0[_0x1fcbfa(0xfd)];_0x4d3162++){_0x5f27d0[_0x4d3162]=TextManager['stringKeyMap'][_0x5f27d0[_0x4d3162]];}return this[_0x1fcbfa(0x587)](_0x5f27d0);},TextManager[_0x5d7dff(0x587)]=function(_0x2a65de){const _0x19b02a=_0x5d7dff,_0x15ae37=VisuMZ['CoreEngine'][_0x19b02a(0x37c)][_0x19b02a(0x4f6)],_0x54a00e=_0x15ae37[_0x19b02a(0x60f)];let _0x146646='';if(_0x2a65de[_0x19b02a(0x617)]('UP'))_0x146646='UP';else{if(_0x2a65de[_0x19b02a(0x617)]('DOWN'))_0x146646=_0x19b02a(0x45c);else{if(_0x2a65de[_0x19b02a(0x617)](_0x19b02a(0x77b)))_0x146646=_0x19b02a(0x77b);else _0x2a65de['includes']('RIGHT')?_0x146646='RIGHT':_0x146646=_0x2a65de['pop']();}}const _0xef21ff=_0x19b02a(0x5d3)[_0x19b02a(0x106)](_0x146646);return _0x15ae37[_0xef21ff]?_0x15ae37[_0xef21ff]:_0x54a00e[_0x19b02a(0x106)](_0x146646);},TextManager[_0x5d7dff(0x18c)]=function(_0x2c6bff,_0x5e54a3){const _0x37ab68=_0x5d7dff,_0x2d34bc=VisuMZ['CoreEngine']['Settings'][_0x37ab68(0x4f6)],_0x5d0a6f=_0x2d34bc[_0x37ab68(0xe7)],_0x447406=this[_0x37ab68(0x2fe)](_0x2c6bff),_0x31e250=this[_0x37ab68(0x2fe)](_0x5e54a3);return _0x5d0a6f[_0x37ab68(0x106)](_0x447406,_0x31e250);},TextManager['getControllerInputButtonString']=function(_0x39b188,_0x31cdc9){const _0x461880=_0x5d7dff,_0x5d69bb=_0x39b188[_0x461880(0x1e9)]()[_0x461880(0x6b5)](),_0x40cb56=VisuMZ['CoreEngine'][_0x461880(0x17c)][_0x5d69bb];if(!_0x40cb56)return this[_0x461880(0x7d3)](_0x39b188,_0x31cdc9);return _0x40cb56[_0x31cdc9]||this['getKeyboardInputButtonString'](_0x39b188,_0x31cdc9);},TextManager[_0x5d7dff(0x7d3)]=function(_0x1e79fe,_0xede695){const _0x24c95c=_0x5d7dff,_0x2e8cbc=_0x1e79fe[_0x24c95c(0x1e9)]()[_0x24c95c(0x6b5)]();for(const _0x326afd in VisuMZ[_0x24c95c(0x7ac)][_0x24c95c(0x837)]){if(_0x2e8cbc[_0x24c95c(0x617)](_0x326afd)){const _0x49e605=VisuMZ[_0x24c95c(0x7ac)][_0x24c95c(0x837)][_0x326afd],_0xdb91ed=VisuMZ[_0x24c95c(0x7ac)]['ControllerButtons'][_0x49e605];return _0xdb91ed[_0xede695]||this[_0x24c95c(0x319)](_0xede695);}}return this[_0x24c95c(0x319)](_0xede695);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x564)]=ColorManager['loadWindowskin'],ColorManager[_0x5d7dff(0x455)]=function(){const _0x257b3f=_0x5d7dff;VisuMZ['CoreEngine'][_0x257b3f(0x564)]['call'](this),this[_0x257b3f(0x80e)]=this[_0x257b3f(0x80e)]||{};},ColorManager['getColorDataFromPluginParameters']=function(_0x5721b3,_0x1e0752){const _0x434963=_0x5d7dff;return _0x1e0752=String(_0x1e0752),this['_colorCache']=this['_colorCache']||{},_0x1e0752[_0x434963(0x371)](/#(.*)/i)?this[_0x434963(0x80e)][_0x5721b3]='#%1'['format'](String(RegExp['$1'])):this[_0x434963(0x80e)][_0x5721b3]=this[_0x434963(0x610)](Number(_0x1e0752)),this[_0x434963(0x80e)][_0x5721b3];},ColorManager[_0x5d7dff(0x803)]=function(_0x3a27b1){const _0x3692d2=_0x5d7dff;return _0x3a27b1=String(_0x3a27b1),_0x3a27b1[_0x3692d2(0x371)](/#(.*)/i)?_0x3692d2(0x15a)[_0x3692d2(0x106)](String(RegExp['$1'])):this['textColor'](Number(_0x3a27b1));},ColorManager['clearCachedKeys']=function(){const _0x38ba03=_0x5d7dff;this[_0x38ba03(0x80e)]={};},ColorManager[_0x5d7dff(0x2ff)]=function(){const _0x1aadfd=_0x5d7dff,_0x512dff=_0x1aadfd(0x477);this[_0x1aadfd(0x80e)]=this[_0x1aadfd(0x80e)]||{};if(this[_0x1aadfd(0x80e)][_0x512dff])return this[_0x1aadfd(0x80e)][_0x512dff];const _0x4a581f=VisuMZ[_0x1aadfd(0x7ac)]['Settings'][_0x1aadfd(0x1dc)][_0x1aadfd(0x5cd)];return this['getColorDataFromPluginParameters'](_0x512dff,_0x4a581f);},ColorManager[_0x5d7dff(0x1b2)]=function(){const _0x3152f7=_0x5d7dff,_0x8f98f2=_0x3152f7(0x4f8);this[_0x3152f7(0x80e)]=this[_0x3152f7(0x80e)]||{};if(this[_0x3152f7(0x80e)][_0x8f98f2])return this['_colorCache'][_0x8f98f2];const _0x25745d=VisuMZ[_0x3152f7(0x7ac)][_0x3152f7(0x37c)][_0x3152f7(0x1dc)][_0x3152f7(0x20d)];return this[_0x3152f7(0x339)](_0x8f98f2,_0x25745d);},ColorManager[_0x5d7dff(0x4b0)]=function(){const _0x5d8465=_0x5d7dff,_0x2ea86b='_stored_crisisColor';this[_0x5d8465(0x80e)]=this[_0x5d8465(0x80e)]||{};if(this['_colorCache'][_0x2ea86b])return this[_0x5d8465(0x80e)][_0x2ea86b];const _0x3a9d76=VisuMZ[_0x5d8465(0x7ac)][_0x5d8465(0x37c)][_0x5d8465(0x1dc)][_0x5d8465(0x595)];return this[_0x5d8465(0x339)](_0x2ea86b,_0x3a9d76);},ColorManager['deathColor']=function(){const _0x2987bf=_0x5d7dff,_0x29917e='_stored_deathColor';this[_0x2987bf(0x80e)]=this[_0x2987bf(0x80e)]||{};if(this[_0x2987bf(0x80e)][_0x29917e])return this['_colorCache'][_0x29917e];const _0x18a327=VisuMZ['CoreEngine'][_0x2987bf(0x37c)][_0x2987bf(0x1dc)]['ColorDeath'];return this[_0x2987bf(0x339)](_0x29917e,_0x18a327);},ColorManager[_0x5d7dff(0x39e)]=function(){const _0x3d36ab=_0x5d7dff,_0xa973c4=_0x3d36ab(0x4b6);this[_0x3d36ab(0x80e)]=this[_0x3d36ab(0x80e)]||{};if(this[_0x3d36ab(0x80e)][_0xa973c4])return this[_0x3d36ab(0x80e)][_0xa973c4];const _0x5bb4d4=VisuMZ[_0x3d36ab(0x7ac)][_0x3d36ab(0x37c)][_0x3d36ab(0x1dc)]['ColorGaugeBack'];return this[_0x3d36ab(0x339)](_0xa973c4,_0x5bb4d4);},ColorManager[_0x5d7dff(0x2c6)]=function(){const _0xdacabb=_0x5d7dff,_0x5e8324=_0xdacabb(0x17a);this['_colorCache']=this[_0xdacabb(0x80e)]||{};if(this['_colorCache'][_0x5e8324])return this[_0xdacabb(0x80e)][_0x5e8324];const _0x19a389=VisuMZ[_0xdacabb(0x7ac)][_0xdacabb(0x37c)][_0xdacabb(0x1dc)][_0xdacabb(0x799)];return this['getColorDataFromPluginParameters'](_0x5e8324,_0x19a389);},ColorManager[_0x5d7dff(0x14f)]=function(){const _0x5906b9=_0x5d7dff,_0x6754c=_0x5906b9(0x2f1);this[_0x5906b9(0x80e)]=this[_0x5906b9(0x80e)]||{};if(this[_0x5906b9(0x80e)][_0x6754c])return this[_0x5906b9(0x80e)][_0x6754c];const _0x17ad63=VisuMZ[_0x5906b9(0x7ac)]['Settings'][_0x5906b9(0x1dc)]['ColorHPGauge2'];return this['getColorDataFromPluginParameters'](_0x6754c,_0x17ad63);},ColorManager['mpGaugeColor1']=function(){const _0x5f07db=_0x5d7dff,_0x132799=_0x5f07db(0x580);this[_0x5f07db(0x80e)]=this['_colorCache']||{};if(this['_colorCache'][_0x132799])return this[_0x5f07db(0x80e)][_0x132799];const _0x34d3b0=VisuMZ[_0x5f07db(0x7ac)]['Settings'][_0x5f07db(0x1dc)][_0x5f07db(0x84b)];return this['getColorDataFromPluginParameters'](_0x132799,_0x34d3b0);},ColorManager[_0x5d7dff(0x82a)]=function(){const _0x3e27d9=_0x5d7dff,_0x2f0bf4=_0x3e27d9(0x14e);this[_0x3e27d9(0x80e)]=this[_0x3e27d9(0x80e)]||{};if(this[_0x3e27d9(0x80e)][_0x2f0bf4])return this[_0x3e27d9(0x80e)][_0x2f0bf4];const _0x13195b=VisuMZ['CoreEngine'][_0x3e27d9(0x37c)][_0x3e27d9(0x1dc)][_0x3e27d9(0x2a1)];return this[_0x3e27d9(0x339)](_0x2f0bf4,_0x13195b);},ColorManager['mpCostColor']=function(){const _0x4877e1=_0x5d7dff,_0x4e3ba7=_0x4877e1(0x3fd);this[_0x4877e1(0x80e)]=this['_colorCache']||{};if(this[_0x4877e1(0x80e)][_0x4e3ba7])return this[_0x4877e1(0x80e)][_0x4e3ba7];const _0x4d834c=VisuMZ[_0x4877e1(0x7ac)][_0x4877e1(0x37c)]['Color'][_0x4877e1(0x798)];return this['getColorDataFromPluginParameters'](_0x4e3ba7,_0x4d834c);},ColorManager['powerUpColor']=function(){const _0x511b16=_0x5d7dff,_0x2a0bd2=_0x511b16(0x7bc);this[_0x511b16(0x80e)]=this[_0x511b16(0x80e)]||{};if(this[_0x511b16(0x80e)][_0x2a0bd2])return this[_0x511b16(0x80e)][_0x2a0bd2];const _0x47a14d=VisuMZ[_0x511b16(0x7ac)][_0x511b16(0x37c)]['Color'][_0x511b16(0x880)];return this['getColorDataFromPluginParameters'](_0x2a0bd2,_0x47a14d);},ColorManager['powerDownColor']=function(){const _0x12028f=_0x5d7dff,_0xc2dfca=_0x12028f(0x6d0);this[_0x12028f(0x80e)]=this['_colorCache']||{};if(this[_0x12028f(0x80e)][_0xc2dfca])return this[_0x12028f(0x80e)][_0xc2dfca];const _0x2d2e1f=VisuMZ['CoreEngine'][_0x12028f(0x37c)][_0x12028f(0x1dc)]['ColorPowerDown'];return this[_0x12028f(0x339)](_0xc2dfca,_0x2d2e1f);},ColorManager[_0x5d7dff(0x19d)]=function(){const _0x53b0fa=_0x5d7dff,_0x15bea6=_0x53b0fa(0x31f);this[_0x53b0fa(0x80e)]=this[_0x53b0fa(0x80e)]||{};if(this[_0x53b0fa(0x80e)][_0x15bea6])return this[_0x53b0fa(0x80e)][_0x15bea6];const _0x20c038=VisuMZ['CoreEngine']['Settings'][_0x53b0fa(0x1dc)][_0x53b0fa(0x6d5)];return this['getColorDataFromPluginParameters'](_0x15bea6,_0x20c038);},ColorManager['ctGaugeColor2']=function(){const _0x4db169=_0x5d7dff,_0x6226e7=_0x4db169(0x460);this[_0x4db169(0x80e)]=this['_colorCache']||{};if(this[_0x4db169(0x80e)][_0x6226e7])return this[_0x4db169(0x80e)][_0x6226e7];const _0x2e37a6=VisuMZ[_0x4db169(0x7ac)]['Settings']['Color']['ColorCTGauge2'];return this[_0x4db169(0x339)](_0x6226e7,_0x2e37a6);},ColorManager[_0x5d7dff(0x3a7)]=function(){const _0x2260b8=_0x5d7dff,_0x427bb7=_0x2260b8(0x688);this[_0x2260b8(0x80e)]=this[_0x2260b8(0x80e)]||{};if(this[_0x2260b8(0x80e)][_0x427bb7])return this['_colorCache'][_0x427bb7];const _0x1a4160=VisuMZ[_0x2260b8(0x7ac)]['Settings'][_0x2260b8(0x1dc)][_0x2260b8(0x20c)];return this[_0x2260b8(0x339)](_0x427bb7,_0x1a4160);},ColorManager[_0x5d7dff(0x2e9)]=function(){const _0x5379d0=_0x5d7dff,_0x5e26c8=_0x5379d0(0x2d0);this[_0x5379d0(0x80e)]=this['_colorCache']||{};if(this[_0x5379d0(0x80e)][_0x5e26c8])return this[_0x5379d0(0x80e)][_0x5e26c8];const _0x57aa66=VisuMZ[_0x5379d0(0x7ac)][_0x5379d0(0x37c)][_0x5379d0(0x1dc)][_0x5379d0(0x4c6)];return this['getColorDataFromPluginParameters'](_0x5e26c8,_0x57aa66);},ColorManager[_0x5d7dff(0x7e6)]=function(){const _0x42f5c6=_0x5d7dff,_0x3c02c8=_0x42f5c6(0x395);this[_0x42f5c6(0x80e)]=this[_0x42f5c6(0x80e)]||{};if(this[_0x42f5c6(0x80e)][_0x3c02c8])return this['_colorCache'][_0x3c02c8];const _0x39027b=VisuMZ[_0x42f5c6(0x7ac)]['Settings']['Color'][_0x42f5c6(0x2a8)];return this['getColorDataFromPluginParameters'](_0x3c02c8,_0x39027b);},ColorManager[_0x5d7dff(0x889)]=function(){const _0x576361=_0x5d7dff,_0x3cadfd=_0x576361(0x6c5);this['_colorCache']=this[_0x576361(0x80e)]||{};if(this['_colorCache'][_0x3cadfd])return this[_0x576361(0x80e)][_0x3cadfd];const _0xa180e=VisuMZ[_0x576361(0x7ac)]['Settings'][_0x576361(0x1dc)][_0x576361(0x2a8)];return this[_0x576361(0x339)](_0x3cadfd,_0xa180e);},ColorManager[_0x5d7dff(0x2ea)]=function(){const _0x3974a1=_0x5d7dff,_0x16494d=_0x3974a1(0x6ea);this['_colorCache']=this[_0x3974a1(0x80e)]||{};if(this[_0x3974a1(0x80e)][_0x16494d])return this['_colorCache'][_0x16494d];const _0x22074b=VisuMZ['CoreEngine'][_0x3974a1(0x37c)][_0x3974a1(0x1dc)]['ColorExpGauge1'];return this[_0x3974a1(0x339)](_0x16494d,_0x22074b);},ColorManager['expGaugeColor2']=function(){const _0xe631b1=_0x5d7dff,_0x250a2d=_0xe631b1(0x6cf);this[_0xe631b1(0x80e)]=this[_0xe631b1(0x80e)]||{};if(this[_0xe631b1(0x80e)][_0x250a2d])return this[_0xe631b1(0x80e)][_0x250a2d];const _0x248a4d=VisuMZ[_0xe631b1(0x7ac)][_0xe631b1(0x37c)]['Color']['ColorExpGauge2'];return this[_0xe631b1(0x339)](_0x250a2d,_0x248a4d);},ColorManager[_0x5d7dff(0x304)]=function(){const _0x12bd49=_0x5d7dff,_0x65c90e=_0x12bd49(0x70c);this[_0x12bd49(0x80e)]=this[_0x12bd49(0x80e)]||{};if(this[_0x12bd49(0x80e)][_0x65c90e])return this['_colorCache'][_0x65c90e];const _0x3b69ee=VisuMZ['CoreEngine']['Settings'][_0x12bd49(0x1dc)][_0x12bd49(0x28b)];return this[_0x12bd49(0x339)](_0x65c90e,_0x3b69ee);},ColorManager[_0x5d7dff(0x227)]=function(){const _0x5528e5=_0x5d7dff,_0x5123c9=_0x5528e5(0x14d);this[_0x5528e5(0x80e)]=this['_colorCache']||{};if(this[_0x5528e5(0x80e)][_0x5123c9])return this[_0x5528e5(0x80e)][_0x5123c9];const _0xe20616=VisuMZ[_0x5528e5(0x7ac)][_0x5528e5(0x37c)][_0x5528e5(0x1dc)][_0x5528e5(0x599)];return this[_0x5528e5(0x339)](_0x5123c9,_0xe20616);},ColorManager[_0x5d7dff(0x169)]=function(_0x5635d6){const _0x1f5129=_0x5d7dff;return VisuMZ['CoreEngine'][_0x1f5129(0x37c)][_0x1f5129(0x1dc)][_0x1f5129(0xe9)][_0x1f5129(0x5d5)](this,_0x5635d6);},ColorManager[_0x5d7dff(0x534)]=function(_0x3a86cd){const _0x2028b4=_0x5d7dff;return VisuMZ['CoreEngine']['Settings'][_0x2028b4(0x1dc)]['ActorMPColor']['call'](this,_0x3a86cd);},ColorManager[_0x5d7dff(0x156)]=function(_0x3e21fa){const _0x11e696=_0x5d7dff;return VisuMZ[_0x11e696(0x7ac)][_0x11e696(0x37c)]['Color'][_0x11e696(0x826)][_0x11e696(0x5d5)](this,_0x3e21fa);},ColorManager[_0x5d7dff(0x3f9)]=function(_0x3b941b){const _0x43c7ba=_0x5d7dff;return VisuMZ[_0x43c7ba(0x7ac)][_0x43c7ba(0x37c)][_0x43c7ba(0x1dc)][_0x43c7ba(0x64b)][_0x43c7ba(0x5d5)](this,_0x3b941b);},ColorManager[_0x5d7dff(0x36a)]=function(_0x37e88f){const _0x1f63bb=_0x5d7dff;return VisuMZ[_0x1f63bb(0x7ac)]['Settings'][_0x1f63bb(0x1dc)][_0x1f63bb(0x6ce)][_0x1f63bb(0x5d5)](this,_0x37e88f);},ColorManager[_0x5d7dff(0x362)]=function(){const _0x1ebc29=_0x5d7dff;return VisuMZ[_0x1ebc29(0x7ac)][_0x1ebc29(0x37c)][_0x1ebc29(0x1dc)][_0x1ebc29(0x4b5)];},ColorManager['outlineColorDmg']=function(){const _0x43fbe2=_0x5d7dff;return VisuMZ[_0x43fbe2(0x7ac)][_0x43fbe2(0x37c)][_0x43fbe2(0x1dc)][_0x43fbe2(0x879)]||_0x43fbe2(0x5f6);},ColorManager[_0x5d7dff(0x894)]=function(){const _0x4f86ae=_0x5d7dff;return VisuMZ[_0x4f86ae(0x7ac)][_0x4f86ae(0x37c)][_0x4f86ae(0x1dc)][_0x4f86ae(0x4fb)]||_0x4f86ae(0x57b);},ColorManager[_0x5d7dff(0x3d4)]=function(){const _0x4efab0=_0x5d7dff;return VisuMZ[_0x4efab0(0x7ac)][_0x4efab0(0x37c)][_0x4efab0(0x1dc)][_0x4efab0(0x84d)];},ColorManager[_0x5d7dff(0x5ab)]=function(){const _0x3c8b9b=_0x5d7dff;return VisuMZ[_0x3c8b9b(0x7ac)]['Settings'][_0x3c8b9b(0x1dc)]['DimColor2'];},ColorManager[_0x5d7dff(0x73b)]=function(){const _0x3c5df6=_0x5d7dff;return VisuMZ[_0x3c5df6(0x7ac)][_0x3c5df6(0x37c)][_0x3c5df6(0x1dc)][_0x3c5df6(0x562)];},ColorManager['itemBackColor2']=function(){const _0x489055=_0x5d7dff;return VisuMZ[_0x489055(0x7ac)][_0x489055(0x37c)][_0x489055(0x1dc)][_0x489055(0x121)];},SceneManager[_0x5d7dff(0x730)]=[],SceneManager[_0x5d7dff(0x718)]=function(){const _0x37d93a=_0x5d7dff;return this[_0x37d93a(0x882)]&&this[_0x37d93a(0x882)][_0x37d93a(0x793)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0xdf672f=_0x5d7dff;return this[_0xdf672f(0x882)]&&this['_scene']['constructor']===Scene_Map;},SceneManager['isInstanceOfSceneMap']=function(){return this['_scene']&&this['_scene']instanceof Scene_Map;},VisuMZ[_0x5d7dff(0x7ac)]['SceneManager_initialize']=SceneManager[_0x5d7dff(0x186)],SceneManager[_0x5d7dff(0x186)]=function(){const _0x15252e=_0x5d7dff;VisuMZ['CoreEngine'][_0x15252e(0x3b5)][_0x15252e(0x5d5)](this),this[_0x15252e(0x5b1)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x3bc)]=SceneManager[_0x5d7dff(0x5a8)],SceneManager[_0x5d7dff(0x5a8)]=function(_0xe5cbd5){const _0xd2fb2e=_0x5d7dff;if($gameTemp)this[_0xd2fb2e(0x827)](_0xe5cbd5);VisuMZ[_0xd2fb2e(0x7ac)]['SceneManager_onKeyDown'][_0xd2fb2e(0x5d5)](this,_0xe5cbd5);},SceneManager[_0x5d7dff(0x827)]=function(_0x52a11c){const _0x2d82dc=_0x5d7dff;if(!_0x52a11c[_0x2d82dc(0x38e)]&&!_0x52a11c[_0x2d82dc(0x250)])switch(_0x52a11c['keyCode']){case 0x52:this[_0x2d82dc(0x5a1)]();break;case 0x54:this[_0x2d82dc(0x187)]();break;case 0x75:this[_0x2d82dc(0x1f0)]();break;case 0x76:if(Input[_0x2d82dc(0x150)](_0x2d82dc(0x226))||Input[_0x2d82dc(0x150)](_0x2d82dc(0x68c)))return;this['playTestF7']();break;}else{if(_0x52a11c['ctrlKey']){let _0x4981ba=_0x52a11c['keyCode'];if(_0x4981ba>=0x31&&_0x4981ba<=0x39){const _0x5aa703=_0x4981ba-0x30;return SceneManager[_0x2d82dc(0x687)](_0x5aa703);}else{if(_0x4981ba>=0x61&&_0x4981ba<=0x69){const _0x3e425c=_0x4981ba-0x60;return SceneManager[_0x2d82dc(0x687)](_0x3e425c);}}}}},SceneManager[_0x5d7dff(0x1f0)]=function(){const _0x4cd588=_0x5d7dff;if($gameTemp[_0x4cd588(0x898)]()&&VisuMZ['CoreEngine'][_0x4cd588(0x37c)][_0x4cd588(0x116)][_0x4cd588(0x1db)]){ConfigManager[_0x4cd588(0x648)]!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x4cd588(0x5e3)]=0x0,ConfigManager[_0x4cd588(0x311)]=0x0,ConfigManager['seVolume']=0x0):(ConfigManager['bgmVolume']=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x4cd588(0x648)]=0x64);ConfigManager[_0x4cd588(0x1b1)]();if(this[_0x4cd588(0x882)][_0x4cd588(0x793)]===Scene_Options){if(this[_0x4cd588(0x882)][_0x4cd588(0x851)])this[_0x4cd588(0x882)][_0x4cd588(0x851)][_0x4cd588(0x34c)]();if(this[_0x4cd588(0x882)][_0x4cd588(0x159)])this[_0x4cd588(0x882)][_0x4cd588(0x159)][_0x4cd588(0x34c)]();}}},SceneManager[_0x5d7dff(0x6a2)]=function(){const _0x3e5622=_0x5d7dff;$gameTemp[_0x3e5622(0x898)]()&&VisuMZ[_0x3e5622(0x7ac)]['Settings'][_0x3e5622(0x116)][_0x3e5622(0x2e2)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x3e5622(0x45f)]);},SceneManager['playTestShiftR']=function(){const _0x5d86ee=_0x5d7dff;if(!VisuMZ['CoreEngine']['Settings']['QoL'][_0x5d86ee(0x758)])return;if(!$gameTemp[_0x5d86ee(0x898)]())return;if(!SceneManager[_0x5d86ee(0x718)]())return;if(!Input['isPressed'](_0x5d86ee(0x226)))return;for(const _0x169fff of $gameParty[_0x5d86ee(0x3b4)]()){if(!_0x169fff)continue;_0x169fff[_0x5d86ee(0x245)]();}},SceneManager[_0x5d7dff(0x187)]=function(){const _0x11ff7a=_0x5d7dff;if(!VisuMZ['CoreEngine'][_0x11ff7a(0x37c)][_0x11ff7a(0x116)][_0x11ff7a(0x8ba)])return;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x11ff7a(0x718)]())return;if(!Input[_0x11ff7a(0x150)](_0x11ff7a(0x226)))return;for(const _0x1bb62b of $gameParty['members']()){if(!_0x1bb62b)continue;_0x1bb62b[_0x11ff7a(0x1b7)](_0x1bb62b[_0x11ff7a(0x589)]());}},SceneManager[_0x5d7dff(0x687)]=function(_0x48d57e){const _0x3cb4f1=_0x5d7dff;if(!$gameTemp[_0x3cb4f1(0x898)]())return;if(!DataManager['savefileInfo'](_0x48d57e))return;if(!(VisuMZ[_0x3cb4f1(0x7ac)][_0x3cb4f1(0x37c)]['QoL'][_0x3cb4f1(0x265)]??!![]))return;this[_0x3cb4f1(0x1a0)](Scene_QuickLoad),this[_0x3cb4f1(0x497)](_0x48d57e);},SceneManager[_0x5d7dff(0x5b1)]=function(){const _0x49cab1=_0x5d7dff;this[_0x49cab1(0x48a)]=![],this['_hideButtons']=!VisuMZ['CoreEngine'][_0x49cab1(0x37c)]['UI'][_0x49cab1(0x2ef)];},SceneManager['setSideButtonLayout']=function(_0x810085){const _0x5c4a6c=_0x5d7dff;VisuMZ[_0x5c4a6c(0x7ac)]['Settings']['UI'][_0x5c4a6c(0xce)]&&(this['_sideButtonLayout']=_0x810085);},SceneManager[_0x5d7dff(0x1cf)]=function(){return this['_sideButtonLayout'];},SceneManager['areButtonsHidden']=function(){const _0x2c6602=_0x5d7dff;return this[_0x2c6602(0x759)];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x339911=_0x5d7dff;return this[_0x339911(0x591)]()||this[_0x339911(0x1cf)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x719)]=SceneManager['isGameActive'],SceneManager[_0x5d7dff(0x1f2)]=function(){const _0x1bd0d2=_0x5d7dff;return VisuMZ[_0x1bd0d2(0x7ac)][_0x1bd0d2(0x37c)][_0x1bd0d2(0x116)][_0x1bd0d2(0x40c)]?VisuMZ['CoreEngine'][_0x1bd0d2(0x719)][_0x1bd0d2(0x5d5)](this):!![];},SceneManager[_0x5d7dff(0x5b6)]=function(_0x4d2bf3){const _0x36084a=_0x5d7dff;if(_0x4d2bf3 instanceof Error)this[_0x36084a(0x697)](_0x4d2bf3);else _0x4d2bf3 instanceof Array&&_0x4d2bf3[0x0]===_0x36084a(0x722)?this[_0x36084a(0x37b)](_0x4d2bf3):this['catchUnknownError'](_0x4d2bf3);this['stop']();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x628)]=BattleManager[_0x5d7dff(0xd4)],BattleManager[_0x5d7dff(0xd4)]=function(){const _0x2f625d=_0x5d7dff;return VisuMZ[_0x2f625d(0x7ac)][_0x2f625d(0x37c)]['QoL'][_0x2f625d(0x424)]?this[_0x2f625d(0x835)]():VisuMZ[_0x2f625d(0x7ac)][_0x2f625d(0x628)][_0x2f625d(0x5d5)](this);},BattleManager[_0x5d7dff(0x835)]=function(){const _0x456c21=_0x5d7dff;return $gameParty[_0x456c21(0x296)](),SoundManager[_0x456c21(0x582)](),this[_0x456c21(0x3e9)](),!![];},BattleManager[_0x5d7dff(0x3ea)]=function(){const _0x10ab51=_0x5d7dff;return $gameSystem[_0x10ab51(0x44e)]()>=0x1;},BattleManager[_0x5d7dff(0x8b9)]=function(){const _0x3151da=_0x5d7dff;return $gameSystem[_0x3151da(0x44e)]()===0x1;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x228)]=Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)],Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)]=function(){const _0x401899=_0x5d7dff;VisuMZ[_0x401899(0x7ac)][_0x401899(0x228)][_0x401899(0x5d5)](this),this[_0x401899(0x22b)](),this['createFauxAnimationQueue'](),this[_0x401899(0x101)]();},Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x22b)]=function(){const _0x222e5b=_0x5d7dff;VisuMZ['CoreEngine'][_0x222e5b(0x37c)][_0x222e5b(0x116)][_0x222e5b(0x74e)]&&(this['_isPlaytest']=![]);},Game_Temp['prototype'][_0x5d7dff(0x815)]=function(_0xf94cc3){this['_lastPluginCommandInterpreter']=_0xf94cc3;},Game_Temp['prototype'][_0x5d7dff(0x84e)]=function(){const _0x4effcf=_0x5d7dff;return this[_0x4effcf(0x498)];},Game_Temp[_0x5d7dff(0x4fa)]['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x5adb0b=_0x5d7dff;this[_0x5adb0b(0x126)]=undefined,this[_0x5adb0b(0x69c)]=undefined,this[_0x5adb0b(0x7ea)]=undefined;},Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x523)]=function(_0x42581b){const _0x287791=_0x5d7dff;$gameMap&&$dataMap&&$dataMap['note']&&this[_0x287791(0x7bb)]($dataMap[_0x287791(0x83e)]);const _0x120e73=$dataTroops[_0x42581b];if(_0x120e73){let _0x7d451a=DataManager['createTroopNote'](_0x120e73['id']);this[_0x287791(0x7bb)](_0x7d451a);}},Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x7bb)]=function(_0x7ac7fd){const _0x10713e=_0x5d7dff;if(!_0x7ac7fd)return;if(_0x7ac7fd[_0x10713e(0x371)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x7ac7fd[_0x10713e(0x371)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x10713e(0x126)]='SV';else{if(_0x7ac7fd[_0x10713e(0x371)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0xc4b8ec=String(RegExp['$1']);if(_0xc4b8ec['match'](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this['_forcedTroopView']='FV';else _0xc4b8ec[_0x10713e(0x371)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x10713e(0x126)]='SV');}}}if(_0x7ac7fd[_0x10713e(0x371)](/<(?:DTB)>/i))this[_0x10713e(0x69c)]=0x0;else{if(_0x7ac7fd[_0x10713e(0x371)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x10713e(0x69c)]=0x1;else{if(_0x7ac7fd[_0x10713e(0x371)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x10713e(0x69c)]=0x2;else{if(_0x7ac7fd[_0x10713e(0x371)](/<(?:TPB|ATB)>/i))this[_0x10713e(0x69c)]=0x2;else{if(_0x7ac7fd[_0x10713e(0x371)](/<(?:CTB)>/i))Imported[_0x10713e(0x4ab)]&&(this[_0x10713e(0x69c)]=_0x10713e(0x316));else{if(_0x7ac7fd[_0x10713e(0x371)](/<(?:STB)>/i))Imported[_0x10713e(0xeb)]&&(this[_0x10713e(0x69c)]=_0x10713e(0x8b0));else{if(_0x7ac7fd['match'](/<(?:BTB)>/i))Imported[_0x10713e(0x4c4)]&&(this[_0x10713e(0x69c)]=_0x10713e(0x766));else{if(_0x7ac7fd['match'](/<(?:FTB)>/i))Imported[_0x10713e(0x303)]&&(this[_0x10713e(0x69c)]=_0x10713e(0x211));else{if(_0x7ac7fd[_0x10713e(0x371)](/<(?:OTB)>/i))Imported[_0x10713e(0x466)]&&(this['_forcedBattleSys']='OTB');else{if(_0x7ac7fd['match'](/<(?:ETB)>/i))Imported[_0x10713e(0x2ad)]&&(this[_0x10713e(0x69c)]='ETB');else{if(_0x7ac7fd[_0x10713e(0x371)](/<(?:PTB)>/i))Imported['VisuMZ_2_BattleSystemPTB']&&(this['_forcedBattleSys']='PTB');else{if(_0x7ac7fd['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x8ceb8=String(RegExp['$1']);if(_0x8ceb8[_0x10713e(0x371)](/DTB/i))this[_0x10713e(0x69c)]=0x0;else{if(_0x8ceb8[_0x10713e(0x371)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x10713e(0x69c)]=0x1;else{if(_0x8ceb8[_0x10713e(0x371)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x10713e(0x69c)]=0x2;else{if(_0x8ceb8[_0x10713e(0x371)](/CTB/i))Imported[_0x10713e(0x4ab)]&&(this[_0x10713e(0x69c)]='CTB');else{if(_0x8ceb8['match'](/STB/i))Imported['VisuMZ_2_BattleSystemSTB']&&(this[_0x10713e(0x69c)]=_0x10713e(0x8b0));else{if(_0x8ceb8['match'](/BTB/i))Imported[_0x10713e(0x4c4)]&&(this[_0x10713e(0x69c)]=_0x10713e(0x766));else{if(_0x8ceb8[_0x10713e(0x371)](/FTB/i))Imported[_0x10713e(0x303)]&&(this[_0x10713e(0x69c)]=_0x10713e(0x211));else{if(_0x8ceb8['match'](/OTB/i))Imported['VisuMZ_2_BattleSystemOTB']&&(this[_0x10713e(0x69c)]=_0x10713e(0x2f3));else{if(_0x8ceb8[_0x10713e(0x371)](/ETB/i))Imported[_0x10713e(0x2ad)]&&(this[_0x10713e(0x69c)]='ETB');else _0x8ceb8[_0x10713e(0x371)](/PTB/i)&&(Imported[_0x10713e(0x11d)]&&(this[_0x10713e(0x69c)]='PTB'));}}}}}}}}}}}}}}}}}}}}if(_0x7ac7fd[_0x10713e(0x371)](/<(?:|BATTLE )GRID>/i))this[_0x10713e(0x7ea)]=!![];else _0x7ac7fd[_0x10713e(0x371)](/<NO (?:|BATTLE )GRID>/i)&&(this[_0x10713e(0x7ea)]=![]);},Game_Temp[_0x5d7dff(0x4fa)]['createFauxAnimationQueue']=function(){const _0xf12065=_0x5d7dff;this[_0xf12065(0x270)]=[];},Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x4b7)]=function(_0x4db52b,_0x1b7340,_0xf4ded5,_0x199d71){const _0x47f9f3=_0x5d7dff;if(!this['showFauxAnimations']())return;_0xf4ded5=_0xf4ded5||![],_0x199d71=_0x199d71||![];if($dataAnimations[_0x1b7340]){const _0x540b78={'targets':_0x4db52b,'animationId':_0x1b7340,'mirror':_0xf4ded5,'mute':_0x199d71};this[_0x47f9f3(0x270)][_0x47f9f3(0x1a0)](_0x540b78);for(const _0x521ece of _0x4db52b){_0x521ece['startAnimation']&&_0x521ece[_0x47f9f3(0xc9)]();}}},Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x674)]=function(){return!![];},Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x520)]=function(){const _0x2a75cc=_0x5d7dff;return this['_fauxAnimationQueue'][_0x2a75cc(0x226)]();},Game_Temp[_0x5d7dff(0x4fa)]['createPointAnimationQueue']=function(){const _0x5a5bfd=_0x5d7dff;this[_0x5a5bfd(0x7c1)]=[];},Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x63e)]=function(_0x4e2ec4,_0x344424,_0x199256,_0x21198b,_0x4f6cc2){const _0x20e78c=_0x5d7dff;if(!this[_0x20e78c(0x1d2)]())return;_0x21198b=_0x21198b||![],_0x4f6cc2=_0x4f6cc2||![];if($dataAnimations[_0x199256]){const _0x5de8ce={'x':_0x4e2ec4,'y':_0x344424,'animationId':_0x199256,'mirror':_0x21198b,'mute':_0x4f6cc2};this[_0x20e78c(0x7c1)]['push'](_0x5de8ce);}},Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x1d2)]=function(){return!![];},Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x419)]=function(){const _0x233f86=_0x5d7dff;return this[_0x233f86(0x7c1)][_0x233f86(0x226)]();},VisuMZ['CoreEngine'][_0x5d7dff(0x10c)]=Game_System[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)],Game_System[_0x5d7dff(0x4fa)]['initialize']=function(){const _0x591c2a=_0x5d7dff;VisuMZ[_0x591c2a(0x7ac)][_0x591c2a(0x10c)][_0x591c2a(0x5d5)](this),this[_0x591c2a(0x565)]();},Game_System[_0x5d7dff(0x4fa)][_0x5d7dff(0x565)]=function(){const _0x5d27d7=_0x5d7dff;this['_CoreEngineSettings']={'SideView':$dataSystem[_0x5d27d7(0x36f)],'BattleSystem':this[_0x5d27d7(0x22f)](),'FontSize':$dataSystem[_0x5d27d7(0x791)][_0x5d27d7(0x5bc)],'Padding':0xc};},Game_System[_0x5d7dff(0x4fa)][_0x5d7dff(0x583)]=function(){const _0x22cbaf=_0x5d7dff;if($gameTemp[_0x22cbaf(0x126)]==='SV')return!![];else{if($gameTemp[_0x22cbaf(0x126)]==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x22cbaf(0x565)]();if(this['_CoreEngineSettings'][_0x22cbaf(0x15e)]===undefined)this[_0x22cbaf(0x565)]();return this[_0x22cbaf(0x8be)][_0x22cbaf(0x15e)];},Game_System[_0x5d7dff(0x4fa)][_0x5d7dff(0x154)]=function(_0x53c86e){const _0x533197=_0x5d7dff;if(this[_0x533197(0x8be)]===undefined)this[_0x533197(0x565)]();if(this[_0x533197(0x8be)][_0x533197(0x15e)]===undefined)this[_0x533197(0x565)]();this[_0x533197(0x8be)]['SideView']=_0x53c86e;},Game_System[_0x5d7dff(0x4fa)][_0x5d7dff(0x4fe)]=function(){const _0x212e76=_0x5d7dff;if(this[_0x212e76(0x8be)]===undefined)this['initCoreEngine']();this[_0x212e76(0x8be)][_0x212e76(0x48c)]=this['initialBattleSystem']();},Game_System['prototype']['initialBattleSystem']=function(){const _0xaa2fbf=_0x5d7dff,_0x289a25=(VisuMZ[_0xaa2fbf(0x7ac)]['Settings'][_0xaa2fbf(0x48c)]||'DATABASE')['toUpperCase']()[_0xaa2fbf(0x6b5)]();return VisuMZ['CoreEngine']['CreateBattleSystemID'](_0x289a25);},Game_System[_0x5d7dff(0x4fa)][_0x5d7dff(0x44e)]=function(){const _0x33b4bb=_0x5d7dff;if($gameTemp[_0x33b4bb(0x69c)]!==undefined)return $gameTemp[_0x33b4bb(0x69c)];if(this[_0x33b4bb(0x8be)]===undefined)this[_0x33b4bb(0x565)]();if(this[_0x33b4bb(0x8be)][_0x33b4bb(0x48c)]===undefined)this['resetBattleSystem']();return this[_0x33b4bb(0x8be)][_0x33b4bb(0x48c)];},Game_System[_0x5d7dff(0x4fa)]['setBattleSystem']=function(_0x1a456f){const _0x170175=_0x5d7dff;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this[_0x170175(0x8be)][_0x170175(0x48c)]===undefined)this[_0x170175(0x4fe)]();this['_CoreEngineSettings'][_0x170175(0x48c)]=_0x1a456f;},Game_System[_0x5d7dff(0x4fa)]['mainFontSize']=function(){const _0x4fb940=_0x5d7dff;if(this[_0x4fb940(0x8be)]===undefined)this['initCoreEngine']();if(this[_0x4fb940(0x8be)][_0x4fb940(0x526)]===undefined)this[_0x4fb940(0x565)]();return this[_0x4fb940(0x8be)][_0x4fb940(0x526)];},Game_System['prototype'][_0x5d7dff(0xc8)]=function(_0x49785e){const _0x42032a=_0x5d7dff;if(this[_0x42032a(0x8be)]===undefined)this[_0x42032a(0x565)]();if(this[_0x42032a(0x8be)][_0x42032a(0x4da)]===undefined)this['initCoreEngine']();this[_0x42032a(0x8be)][_0x42032a(0x526)]=_0x49785e;},Game_System[_0x5d7dff(0x4fa)][_0x5d7dff(0x1e3)]=function(){const _0xe927cd=_0x5d7dff;if(this[_0xe927cd(0x8be)]===undefined)this[_0xe927cd(0x565)]();if(this[_0xe927cd(0x8be)]['Padding']===undefined)this[_0xe927cd(0x565)]();return this['_CoreEngineSettings'][_0xe927cd(0x713)];},Game_System[_0x5d7dff(0x4fa)]['setWindowPadding']=function(_0x5e99f9){const _0x18b347=_0x5d7dff;if(this[_0x18b347(0x8be)]===undefined)this['initCoreEngine']();if(this[_0x18b347(0x8be)]['TimeProgress']===undefined)this[_0x18b347(0x565)]();this[_0x18b347(0x8be)][_0x18b347(0x713)]=_0x5e99f9;},VisuMZ['CoreEngine'][_0x5d7dff(0x1a9)]=Game_Screen[_0x5d7dff(0x4fa)]['initialize'],Game_Screen['prototype']['initialize']=function(){const _0x2dfbde=_0x5d7dff;VisuMZ['CoreEngine']['Game_Screen_initialize'][_0x2dfbde(0x5d5)](this),this[_0x2dfbde(0x619)]();},Game_Screen[_0x5d7dff(0x4fa)]['initCoreEngineScreenShake']=function(){const _0x176ab9=_0x5d7dff,_0x482d94=VisuMZ[_0x176ab9(0x7ac)][_0x176ab9(0x37c)][_0x176ab9(0x308)];this[_0x176ab9(0x27f)]=_0x482d94?.[_0x176ab9(0x471)]||'random';},Game_Screen[_0x5d7dff(0x4fa)][_0x5d7dff(0x5b8)]=function(){const _0x563d45=_0x5d7dff;if(this[_0x563d45(0x27f)]===undefined)this['initCoreEngineScreenShake']();return this['_coreEngineShakeStyle'];},Game_Screen[_0x5d7dff(0x4fa)][_0x5d7dff(0x6f3)]=function(_0x3e0056){const _0x3a6b9c=_0x5d7dff;if(this[_0x3a6b9c(0x27f)]===undefined)this['initCoreEngineScreenShake']();this[_0x3a6b9c(0x27f)]=_0x3e0056['toLowerCase']()[_0x3a6b9c(0x6b5)]();},Game_Picture[_0x5d7dff(0x4fa)]['isMapScrollLinked']=function(){const _0x135baa=_0x5d7dff;if($gameParty[_0x135baa(0x236)]())return![];return this[_0x135baa(0x17d)]()&&this[_0x135baa(0x17d)]()[_0x135baa(0x440)](0x0)==='!';},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x17d)]=function(){const _0xc7c30=_0x5d7dff;return this[_0xc7c30(0x388)][_0xc7c30(0x767)]('/')[_0xc7c30(0x26b)]();},VisuMZ['CoreEngine'][_0x5d7dff(0x6f9)]=Game_Picture['prototype']['x'],Game_Picture['prototype']['x']=function(){const _0x4013d4=_0x5d7dff;return this[_0x4013d4(0x653)]()?this[_0x4013d4(0x6c3)]():VisuMZ[_0x4013d4(0x7ac)][_0x4013d4(0x6f9)][_0x4013d4(0x5d5)](this);},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x6c3)]=function(){const _0x5675d7=_0x5d7dff,_0x4f09bb=$gameMap['displayX']()*$gameMap[_0x5675d7(0x88d)]();return(this['_x']-_0x4f09bb)*$gameScreen[_0x5675d7(0x2c1)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1ee)]=Game_Picture[_0x5d7dff(0x4fa)]['y'],Game_Picture[_0x5d7dff(0x4fa)]['y']=function(){const _0x2f7ef5=_0x5d7dff;return this[_0x2f7ef5(0x653)]()?this[_0x2f7ef5(0x2dc)]():VisuMZ[_0x2f7ef5(0x7ac)][_0x2f7ef5(0x1ee)]['call'](this);},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x2dc)]=function(){const _0x34ce10=_0x5d7dff,_0x3b5c63=$gameMap[_0x34ce10(0x8d0)]()*$gameMap[_0x34ce10(0x472)]();return(this['_y']-_0x3b5c63)*$gameScreen['zoomScale']();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x7fc)]=Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x42f)],Game_Picture[_0x5d7dff(0x4fa)]['scaleX']=function(){const _0x4462fb=_0x5d7dff;let _0x2d427a=VisuMZ['CoreEngine'][_0x4462fb(0x7fc)][_0x4462fb(0x5d5)](this);return this[_0x4462fb(0x653)]()&&(_0x2d427a*=$gameScreen[_0x4462fb(0x2c1)]()),_0x2d427a;},VisuMZ['CoreEngine'][_0x5d7dff(0x7e5)]=Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x6f2)],Game_Picture['prototype'][_0x5d7dff(0x6f2)]=function(){const _0x1b3d5c=_0x5d7dff;let _0xfa4a59=VisuMZ[_0x1b3d5c(0x7ac)][_0x1b3d5c(0x7e5)][_0x1b3d5c(0x5d5)](this);return this[_0x1b3d5c(0x653)]()&&(_0xfa4a59*=$gameScreen[_0x1b3d5c(0x2c1)]()),_0xfa4a59;},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x510)]=function(_0x2d6d91){const _0x25270a=_0x5d7dff;this[_0x25270a(0x6da)]=_0x2d6d91;},VisuMZ['CoreEngine'][_0x5d7dff(0x6ae)]=Game_Picture[_0x5d7dff(0x4fa)]['calcEasing'],Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x4b2)]=function(_0x550b20){const _0xe1f6d3=_0x5d7dff;return this[_0xe1f6d3(0x6da)]=this[_0xe1f6d3(0x6da)]||0x0,[0x0,0x1,0x2,0x3][_0xe1f6d3(0x617)](this['_coreEasingType'])?VisuMZ[_0xe1f6d3(0x7ac)][_0xe1f6d3(0x6ae)][_0xe1f6d3(0x5d5)](this,_0x550b20):VisuMZ[_0xe1f6d3(0x2fd)](_0x550b20,this[_0xe1f6d3(0x6da)]);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x645)]=Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0xf5)],Game_Picture['prototype'][_0x5d7dff(0xf5)]=function(){const _0x1938b2=_0x5d7dff;VisuMZ[_0x1938b2(0x7ac)]['Game_Picture_initRotation'][_0x1938b2(0x5d5)](this),this[_0x1938b2(0x4dc)]();},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x4dc)]=function(){const _0x40e4ec=_0x5d7dff;this['_anglePlus']={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x40e4ec(0x521)};},VisuMZ['CoreEngine']['Game_Picture_angle']=Game_Picture[_0x5d7dff(0x4fa)]['angle'],Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x89b)]=function(){const _0x35ed5d=_0x5d7dff;let _0x5522df=VisuMZ['CoreEngine'][_0x35ed5d(0x21b)]['call'](this);return _0x5522df+=this[_0x35ed5d(0x11c)](),_0x5522df;},Game_Picture[_0x5d7dff(0x4fa)]['anglePlus']=function(){const _0x51d594=_0x5d7dff;if(this['_anglePlus']===undefined)this['initRotationCoreEngine']();return this[_0x51d594(0x51c)][_0x51d594(0x6a4)]||0x0;},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x832)]=function(_0x1282fe,_0x3e1e6d,_0x17296a){const _0x38e289=_0x5d7dff;if(this['_anglePlus']===undefined)this[_0x38e289(0x4dc)]();this[_0x38e289(0x51c)]['target']=_0x1282fe||0x0,this[_0x38e289(0x51c)][_0x38e289(0x494)]=_0x3e1e6d||0x0,this[_0x38e289(0x51c)][_0x38e289(0x7e1)]=_0x3e1e6d||0x0,this['_anglePlus'][_0x38e289(0x625)]=_0x17296a||_0x38e289(0x521),_0x3e1e6d<=0x0&&(this['_anglePlus'][_0x38e289(0x6a4)]=this['_anglePlus'][_0x38e289(0x315)]);},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x34b)]=function(_0x400551,_0x4e70b4,_0x275361){const _0x50a28e=_0x5d7dff;if(this['_anglePlus']===undefined)this['initRotationCoreEngine']();this[_0x50a28e(0x51c)][_0x50a28e(0x315)]+=_0x400551||0x0,this[_0x50a28e(0x51c)][_0x50a28e(0x494)]=_0x4e70b4||0x0,this['_anglePlus'][_0x50a28e(0x7e1)]=_0x4e70b4||0x0,this['_anglePlus'][_0x50a28e(0x625)]=_0x275361||_0x50a28e(0x521),_0x4e70b4<=0x0&&(this[_0x50a28e(0x51c)][_0x50a28e(0x6a4)]=this[_0x50a28e(0x51c)][_0x50a28e(0x315)]);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x81b)]=Game_Picture[_0x5d7dff(0x4fa)]['updateRotation'],Game_Picture[_0x5d7dff(0x4fa)]['updateRotation']=function(){const _0x468005=_0x5d7dff;VisuMZ[_0x468005(0x7ac)]['Game_Picture_updateRotation'][_0x468005(0x5d5)](this),this[_0x468005(0x80b)]();},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x80b)]=function(){const _0x4a0140=_0x5d7dff;if(this[_0x4a0140(0x51c)]===undefined)this[_0x4a0140(0x4dc)]();const _0x4227bd=this[_0x4a0140(0x51c)];if(_0x4227bd[_0x4a0140(0x494)]<=0x0)return;_0x4227bd['current']=this['applyEasingAnglePlus'](_0x4227bd[_0x4a0140(0x6a4)],_0x4227bd['target']),_0x4227bd['duration']--,_0x4227bd[_0x4a0140(0x494)]<=0x0&&(_0x4227bd[_0x4a0140(0x6a4)]=_0x4227bd['target']);},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x332)]=function(_0xe92936,_0x36d4b8){const _0xc1fbbd=_0x5d7dff,_0x12ad1a=this[_0xc1fbbd(0x51c)],_0x4e0f2a=_0x12ad1a[_0xc1fbbd(0x625)],_0x3661c9=_0x12ad1a[_0xc1fbbd(0x494)],_0x4860f0=_0x12ad1a[_0xc1fbbd(0x7e1)],_0x17f77d=VisuMZ[_0xc1fbbd(0x2fd)]((_0x4860f0-_0x3661c9)/_0x4860f0,_0x4e0f2a),_0x25081d=VisuMZ[_0xc1fbbd(0x2fd)]((_0x4860f0-_0x3661c9+0x1)/_0x4860f0,_0x4e0f2a),_0x44a209=(_0xe92936-_0x36d4b8*_0x17f77d)/(0x1-_0x17f77d);return _0x44a209+(_0x36d4b8-_0x44a209)*_0x25081d;},VisuMZ['CoreEngine'][_0x5d7dff(0x193)]=Game_Action['prototype']['itemHit'],Game_Action[_0x5d7dff(0x4fa)][_0x5d7dff(0x3a3)]=function(_0x44ea65){const _0x41edeb=_0x5d7dff;return VisuMZ[_0x41edeb(0x7ac)][_0x41edeb(0x37c)][_0x41edeb(0x116)][_0x41edeb(0x5e2)]?this['itemHitImprovedAccuracy'](_0x44ea65):VisuMZ[_0x41edeb(0x7ac)][_0x41edeb(0x193)][_0x41edeb(0x5d5)](this,_0x44ea65);},Game_Action['prototype'][_0x5d7dff(0x622)]=function(_0x4e0a75){const _0x56429c=_0x5d7dff,_0x42b4e5=this[_0x56429c(0x4d7)](_0x4e0a75),_0x1515f2=this[_0x56429c(0x5f4)](_0x4e0a75),_0x265915=this['targetEvaRate'](_0x4e0a75);return _0x42b4e5*(_0x1515f2-_0x265915);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x489)]=Game_Action[_0x5d7dff(0x4fa)][_0x5d7dff(0x209)],Game_Action[_0x5d7dff(0x4fa)]['itemEva']=function(_0x1d2854){const _0x7ef727=_0x5d7dff;return VisuMZ[_0x7ef727(0x7ac)][_0x7ef727(0x37c)][_0x7ef727(0x116)][_0x7ef727(0x5e2)]?0x0:VisuMZ['CoreEngine']['Game_Action_itemEva'][_0x7ef727(0x5d5)](this,_0x1d2854);},Game_Action['prototype'][_0x5d7dff(0x4d7)]=function(_0x159ba0){const _0xbdea46=_0x5d7dff;return this[_0xbdea46(0x546)]()[_0xbdea46(0x5ae)]*0.01;},Game_Action['prototype'][_0x5d7dff(0x5f4)]=function(_0x3087d2){const _0x5a7a5b=_0x5d7dff;if(VisuMZ[_0x5a7a5b(0x7ac)][_0x5a7a5b(0x37c)][_0x5a7a5b(0x116)][_0x5a7a5b(0x38b)]&&this[_0x5a7a5b(0x71c)]())return 0x1;return this[_0x5a7a5b(0xd9)]()?VisuMZ['CoreEngine'][_0x5a7a5b(0x37c)][_0x5a7a5b(0x116)][_0x5a7a5b(0x38b)]&&this[_0x5a7a5b(0x213)]()['isActor']()?this['subject']()[_0x5a7a5b(0x8b4)]+0.05:this[_0x5a7a5b(0x213)]()['hit']:0x1;},Game_Action[_0x5d7dff(0x4fa)][_0x5d7dff(0x74a)]=function(_0x13856b){const _0x3e89d9=_0x5d7dff;if(this[_0x3e89d9(0x213)]()[_0x3e89d9(0x86e)]()===_0x13856b[_0x3e89d9(0x86e)]())return 0x0;if(this[_0x3e89d9(0xd9)]())return VisuMZ['CoreEngine'][_0x3e89d9(0x37c)][_0x3e89d9(0x116)][_0x3e89d9(0x38b)]&&_0x13856b[_0x3e89d9(0x1a6)]()?_0x13856b[_0x3e89d9(0x201)]-0.05:_0x13856b[_0x3e89d9(0x201)];else return this[_0x3e89d9(0x509)]()?_0x13856b[_0x3e89d9(0x2fc)]:0x0;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x6fe)]=Game_Action[_0x5d7dff(0x4fa)][_0x5d7dff(0x47b)],Game_Action[_0x5d7dff(0x4fa)][_0x5d7dff(0x47b)]=function(_0x1d9665){const _0x4391d1=_0x5d7dff;VisuMZ[_0x4391d1(0x7ac)][_0x4391d1(0x6fe)][_0x4391d1(0x5d5)](this,_0x1d9665);if(VisuMZ[_0x4391d1(0x7ac)][_0x4391d1(0x37c)]['QoL'][_0x4391d1(0x5e2)])return;const _0x42592d=_0x1d9665['result']();_0x42592d[_0x4391d1(0x641)]&&(0x1-this[_0x4391d1(0x209)](_0x1d9665)>this['itemHit'](_0x1d9665)&&(_0x42592d['missed']=![],_0x42592d['evaded']=!![]));},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x724)]=Game_BattlerBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x87e)],Game_BattlerBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x87e)]=function(){const _0x4f39d3=_0x5d7dff;this[_0x4f39d3(0x2df)]={},VisuMZ['CoreEngine']['Game_BattlerBase_initMembers'][_0x4f39d3(0x5d5)](this);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x301)]=Game_BattlerBase['prototype'][_0x5d7dff(0x34c)],Game_BattlerBase['prototype']['refresh']=function(){const _0x249f66=_0x5d7dff;this[_0x249f66(0x2df)]={},VisuMZ[_0x249f66(0x7ac)][_0x249f66(0x301)]['call'](this);},Game_BattlerBase['prototype'][_0x5d7dff(0x3f0)]=function(_0x57f7f6){const _0x51aa7a=_0x5d7dff;return this[_0x51aa7a(0x2df)]=this[_0x51aa7a(0x2df)]||{},this['_cache'][_0x57f7f6]!==undefined;},VisuMZ['CoreEngine']['JsReplaceUserVar']=function(_0x33bff0){const _0x4b1a37=_0x5d7dff;return _0x33bff0=_0x33bff0||'',_0x33bff0='\x20'+_0x33bff0,(VisuMZ[_0x4b1a37(0x7ac)][_0x4b1a37(0x37c)][_0x4b1a37(0x3b6)][_0x4b1a37(0x69a)]??!![])&&(_0x33bff0=_0x33bff0[_0x4b1a37(0x613)](/\s(?:USER|THIS)\.mhp\b/gi,_0x4b1a37(0x512)),_0x33bff0=_0x33bff0[_0x4b1a37(0x613)](/\s(?:USER|THIS)\.mmp\b/gi,_0x4b1a37(0x469)),_0x33bff0=_0x33bff0[_0x4b1a37(0x613)](/\s(?:USER|THIS)\.atk\b/gi,_0x4b1a37(0x66f)),_0x33bff0=_0x33bff0[_0x4b1a37(0x613)](/\s(?:USER|THIS)\.def\b/gi,_0x4b1a37(0x4bb)),_0x33bff0=_0x33bff0[_0x4b1a37(0x613)](/\s(?:USER|THIS)\.mat\b/gi,_0x4b1a37(0x42b)),_0x33bff0=_0x33bff0[_0x4b1a37(0x613)](/\s(?:USER|THIS)\.mdf\b/gi,_0x4b1a37(0x8bd)),_0x33bff0=_0x33bff0[_0x4b1a37(0x613)](/\s(?:USER|THIS)\.agi\b/gi,_0x4b1a37(0x22d)),_0x33bff0=_0x33bff0[_0x4b1a37(0x613)](/\s(?:USER|THIS)\.luk\b/gi,_0x4b1a37(0x262)),_0x33bff0=_0x33bff0[_0x4b1a37(0x613)](/\s(?:USER|THIS)\.param\(/gi,_0x4b1a37(0x441))),_0x33bff0=_0x33bff0['replace'](/\suser\./gi,_0x4b1a37(0x665)),_0x33bff0;},Game_BattlerBase['prototype'][_0x5d7dff(0x2c5)]=function(_0x58f3bd){const _0x555473=_0x5d7dff,_0x59171c=(_0x46ae65,_0x10eb02)=>{const _0x13cded=_0x195c;if(!_0x10eb02)return _0x46ae65;if(_0x10eb02[_0x13cded(0x83e)][_0x13cded(0x371)](VisuMZ[_0x13cded(0x7ac)]['RegExp']['paramPlus'][_0x58f3bd])){var _0x103e15=Number(RegExp['$1']);_0x46ae65+=_0x103e15;}if(_0x10eb02[_0x13cded(0x83e)][_0x13cded(0x371)](VisuMZ[_0x13cded(0x7ac)][_0x13cded(0x567)][_0x13cded(0x3d7)][_0x58f3bd])){var _0x612db1=String(RegExp['$1']);_0x612db1=VisuMZ[_0x13cded(0x7ac)][_0x13cded(0x675)](_0x612db1);try{_0x46ae65+=eval(_0x612db1);}catch(_0x5843a8){if($gameTemp[_0x13cded(0x898)]())console[_0x13cded(0x2eb)](_0x5843a8);}}return _0x46ae65;};return this[_0x555473(0x757)]()[_0x555473(0x36e)](_0x59171c,this[_0x555473(0x89c)][_0x58f3bd]);},Game_BattlerBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x454)]=function(_0xb24aef){const _0x3a54ac=_0x5d7dff;var _0x1f30a=_0x3a54ac(0x2b1)+(this[_0x3a54ac(0x86e)]()?_0x3a54ac(0x21e):_0x3a54ac(0x81a))+_0x3a54ac(0x8dc)+_0xb24aef;if(this[_0x3a54ac(0x3f0)](_0x1f30a))return this[_0x3a54ac(0x2df)][_0x1f30a];this[_0x3a54ac(0x2df)][_0x1f30a]=eval(VisuMZ[_0x3a54ac(0x7ac)][_0x3a54ac(0x37c)]['Param'][_0x1f30a]);const _0x1bbb34=(_0x2b3aee,_0xb30a67)=>{const _0x3ee596=_0x3a54ac;if(!_0xb30a67)return _0x2b3aee;if(_0xb30a67[_0x3ee596(0x83e)][_0x3ee596(0x371)](VisuMZ[_0x3ee596(0x7ac)][_0x3ee596(0x567)][_0x3ee596(0x454)][_0xb24aef])){var _0xa7a2d7=Number(RegExp['$1']);if(_0xa7a2d7===0x0)_0xa7a2d7=Number[_0x3ee596(0x382)];_0x2b3aee=Math[_0x3ee596(0xee)](_0x2b3aee,_0xa7a2d7);}if(_0xb30a67[_0x3ee596(0x83e)][_0x3ee596(0x371)](VisuMZ[_0x3ee596(0x7ac)]['RegExp'][_0x3ee596(0x3e2)][_0xb24aef])){var _0x265474=String(RegExp['$1']);_0x265474=VisuMZ[_0x3ee596(0x7ac)][_0x3ee596(0x675)](_0x265474);try{_0x2b3aee=Math[_0x3ee596(0xee)](_0x2b3aee,Number(eval(_0x265474)));}catch(_0xe827c2){if($gameTemp[_0x3ee596(0x898)]())console[_0x3ee596(0x2eb)](_0xe827c2);}}return _0x2b3aee;};if(this[_0x3a54ac(0x2df)][_0x1f30a]===0x0)this[_0x3a54ac(0x2df)][_0x1f30a]=Number[_0x3a54ac(0x382)];return this['_cache'][_0x1f30a]=this[_0x3a54ac(0x757)]()[_0x3a54ac(0x36e)](_0x1bbb34,this[_0x3a54ac(0x2df)][_0x1f30a]),this[_0x3a54ac(0x2df)][_0x1f30a];},Game_BattlerBase['prototype'][_0x5d7dff(0x8b6)]=function(_0x18f37e){const _0x56e948=_0x5d7dff,_0x2c8fec=this[_0x56e948(0x769)](Game_BattlerBase['TRAIT_PARAM'],_0x18f37e),_0x55081a=(_0x27e222,_0x27b8e7)=>{const _0x5e54a0=_0x56e948;if(!_0x27b8e7)return _0x27e222;if(_0x27b8e7['note'][_0x5e54a0(0x371)](VisuMZ[_0x5e54a0(0x7ac)]['RegExp']['paramRate1'][_0x18f37e])){var _0x43b3e9=Number(RegExp['$1'])/0x64;_0x27e222*=_0x43b3e9;}if(_0x27b8e7[_0x5e54a0(0x83e)][_0x5e54a0(0x371)](VisuMZ[_0x5e54a0(0x7ac)][_0x5e54a0(0x567)][_0x5e54a0(0x802)][_0x18f37e])){var _0x43b3e9=Number(RegExp['$1']);_0x27e222*=_0x43b3e9;}if(_0x27b8e7['note'][_0x5e54a0(0x371)](VisuMZ[_0x5e54a0(0x7ac)]['RegExp'][_0x5e54a0(0x13a)][_0x18f37e])){var _0x381d38=String(RegExp['$1']);_0x381d38=VisuMZ[_0x5e54a0(0x7ac)][_0x5e54a0(0x675)](_0x381d38);try{_0x27e222*=eval(_0x381d38);}catch(_0x2d1770){if($gameTemp['isPlaytest']())console['log'](_0x2d1770);}}return _0x27e222;};return this[_0x56e948(0x757)]()[_0x56e948(0x36e)](_0x55081a,_0x2c8fec);},Game_BattlerBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x5fb)]=function(_0x13530c){const _0x27b33b=_0x5d7dff,_0x2b26d4=(_0x222336,_0x4f50da)=>{const _0x36662a=_0x195c;if(!_0x4f50da)return _0x222336;if(_0x4f50da[_0x36662a(0x83e)][_0x36662a(0x371)](VisuMZ[_0x36662a(0x7ac)][_0x36662a(0x567)][_0x36662a(0x51e)][_0x13530c])){var _0x1bde46=Number(RegExp['$1']);_0x222336+=_0x1bde46;}if(_0x4f50da[_0x36662a(0x83e)][_0x36662a(0x371)](VisuMZ[_0x36662a(0x7ac)][_0x36662a(0x567)][_0x36662a(0x1a1)][_0x13530c])){var _0x5ae3fa=String(RegExp['$1']);_0x5ae3fa=VisuMZ[_0x36662a(0x7ac)][_0x36662a(0x675)](_0x5ae3fa);try{_0x222336+=eval(_0x5ae3fa);}catch(_0x402a18){if($gameTemp[_0x36662a(0x898)]())console[_0x36662a(0x2eb)](_0x402a18);}}return _0x222336;};return this[_0x27b33b(0x757)]()[_0x27b33b(0x36e)](_0x2b26d4,0x0);},Game_BattlerBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x314)]=function(_0x2db8a5){const _0x1d2b5e=_0x5d7dff;let _0x4496c7='param'+_0x2db8a5+_0x1d2b5e(0x17b);if(this['checkCacheKey'](_0x4496c7))return this['_cache'][_0x4496c7];return this[_0x1d2b5e(0x2df)][_0x4496c7]=Math['round'](VisuMZ['CoreEngine'][_0x1d2b5e(0x37c)]['Param']['BasicParameterFormula'][_0x1d2b5e(0x5d5)](this,_0x2db8a5)),this[_0x1d2b5e(0x2df)][_0x4496c7];},Game_BattlerBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x3cb)]=function(_0x4f595f){const _0x3c135d=_0x5d7dff,_0x4f1710=(_0x2bd3c6,_0x4ae96b)=>{const _0x2bd693=_0x195c;if(!_0x4ae96b)return _0x2bd3c6;if(_0x4ae96b[_0x2bd693(0x83e)]['match'](VisuMZ[_0x2bd693(0x7ac)][_0x2bd693(0x567)][_0x2bd693(0x32e)][_0x4f595f])){var _0x1aa411=Number(RegExp['$1'])/0x64;_0x2bd3c6+=_0x1aa411;}if(_0x4ae96b[_0x2bd693(0x83e)][_0x2bd693(0x371)](VisuMZ[_0x2bd693(0x7ac)][_0x2bd693(0x567)][_0x2bd693(0x504)][_0x4f595f])){var _0x1aa411=Number(RegExp['$1']);_0x2bd3c6+=_0x1aa411;}if(_0x4ae96b[_0x2bd693(0x83e)][_0x2bd693(0x371)](VisuMZ[_0x2bd693(0x7ac)][_0x2bd693(0x567)]['xparamPlusJS'][_0x4f595f])){var _0x1eb074=String(RegExp['$1']);_0x1eb074=VisuMZ[_0x2bd693(0x7ac)][_0x2bd693(0x675)](_0x1eb074);try{_0x2bd3c6+=eval(_0x1eb074);}catch(_0x75d651){if($gameTemp[_0x2bd693(0x898)]())console['log'](_0x75d651);}}return _0x2bd3c6;};return this[_0x3c135d(0x757)]()['reduce'](_0x4f1710,0x0);},Game_BattlerBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x8bc)]=function(_0x149dc8){const _0x29b496=_0x5d7dff,_0x16a1a8=(_0x1f9471,_0x336caa)=>{const _0x172f88=_0x195c;if(!_0x336caa)return _0x1f9471;if(_0x336caa[_0x172f88(0x83e)][_0x172f88(0x371)](VisuMZ['CoreEngine'][_0x172f88(0x567)]['xparamRate1'][_0x149dc8])){var _0x33a69b=Number(RegExp['$1'])/0x64;_0x1f9471*=_0x33a69b;}if(_0x336caa[_0x172f88(0x83e)][_0x172f88(0x371)](VisuMZ[_0x172f88(0x7ac)][_0x172f88(0x567)][_0x172f88(0x750)][_0x149dc8])){var _0x33a69b=Number(RegExp['$1']);_0x1f9471*=_0x33a69b;}if(_0x336caa['note'][_0x172f88(0x371)](VisuMZ['CoreEngine'][_0x172f88(0x567)][_0x172f88(0x83d)][_0x149dc8])){var _0x3e0610=String(RegExp['$1']);_0x3e0610=VisuMZ[_0x172f88(0x7ac)]['JsReplaceUserVar'](_0x3e0610);try{_0x1f9471*=eval(_0x3e0610);}catch(_0x5a0616){if($gameTemp['isPlaytest']())console[_0x172f88(0x2eb)](_0x5a0616);}}return _0x1f9471;};return this[_0x29b496(0x757)]()[_0x29b496(0x36e)](_0x16a1a8,0x1);},Game_BattlerBase[_0x5d7dff(0x4fa)]['xparamFlatBonus']=function(_0x482652){const _0x4d2c5e=_0x5d7dff,_0x22b6d7=(_0x2cd2f8,_0x386282)=>{const _0x28f8ff=_0x195c;if(!_0x386282)return _0x2cd2f8;if(_0x386282[_0x28f8ff(0x83e)][_0x28f8ff(0x371)](VisuMZ[_0x28f8ff(0x7ac)][_0x28f8ff(0x567)][_0x28f8ff(0x123)][_0x482652])){var _0x1af80e=Number(RegExp['$1'])/0x64;_0x2cd2f8+=_0x1af80e;}if(_0x386282[_0x28f8ff(0x83e)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x28f8ff(0x231)][_0x482652])){var _0x1af80e=Number(RegExp['$1']);_0x2cd2f8+=_0x1af80e;}if(_0x386282[_0x28f8ff(0x83e)][_0x28f8ff(0x371)](VisuMZ[_0x28f8ff(0x7ac)][_0x28f8ff(0x567)][_0x28f8ff(0x2a0)][_0x482652])){var _0x435216=String(RegExp['$1']);_0x435216=VisuMZ[_0x28f8ff(0x7ac)][_0x28f8ff(0x675)](_0x435216);try{_0x2cd2f8+=eval(_0x435216);}catch(_0x2daf3b){if($gameTemp['isPlaytest']())console[_0x28f8ff(0x2eb)](_0x2daf3b);}}return _0x2cd2f8;};return this[_0x4d2c5e(0x757)]()['reduce'](_0x22b6d7,0x0);},Game_BattlerBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x40e)]=function(_0x546667){const _0x693a98=_0x5d7dff;let _0x57d0c9=_0x693a98(0x40e)+_0x546667+'Total';if(this['checkCacheKey'](_0x57d0c9))return this['_cache'][_0x57d0c9];return this[_0x693a98(0x2df)][_0x57d0c9]=VisuMZ[_0x693a98(0x7ac)][_0x693a98(0x37c)][_0x693a98(0x3b6)]['XParameterFormula']['call'](this,_0x546667),this['_cache'][_0x57d0c9];},Game_BattlerBase['prototype']['sparamPlus']=function(_0x3a60a8){const _0x44aef3=_0x5d7dff,_0x4d9f63=(_0x10a84b,_0x3a2093)=>{const _0x19c321=_0x195c;if(!_0x3a2093)return _0x10a84b;if(_0x3a2093['note'][_0x19c321(0x371)](VisuMZ[_0x19c321(0x7ac)][_0x19c321(0x567)]['sparamPlus1'][_0x3a60a8])){var _0x2aa468=Number(RegExp['$1'])/0x64;_0x10a84b+=_0x2aa468;}if(_0x3a2093[_0x19c321(0x83e)][_0x19c321(0x371)](VisuMZ['CoreEngine'][_0x19c321(0x567)][_0x19c321(0x632)][_0x3a60a8])){var _0x2aa468=Number(RegExp['$1']);_0x10a84b+=_0x2aa468;}if(_0x3a2093[_0x19c321(0x83e)][_0x19c321(0x371)](VisuMZ[_0x19c321(0x7ac)]['RegExp'][_0x19c321(0x8d6)][_0x3a60a8])){var _0x273403=String(RegExp['$1']);_0x273403=VisuMZ[_0x19c321(0x7ac)]['JsReplaceUserVar'](_0x273403);try{_0x10a84b+=eval(_0x273403);}catch(_0x529ac8){if($gameTemp['isPlaytest']())console[_0x19c321(0x2eb)](_0x529ac8);}}return _0x10a84b;};return this[_0x44aef3(0x757)]()[_0x44aef3(0x36e)](_0x4d9f63,0x0);},Game_BattlerBase['prototype'][_0x5d7dff(0x6de)]=function(_0x566bd8){const _0x41d7e3=_0x5d7dff,_0x40fe19=(_0x128db3,_0x315208)=>{const _0x8710da=_0x195c;if(!_0x315208)return _0x128db3;if(_0x315208[_0x8710da(0x83e)][_0x8710da(0x371)](VisuMZ[_0x8710da(0x7ac)][_0x8710da(0x567)][_0x8710da(0x605)][_0x566bd8])){var _0x471315=Number(RegExp['$1'])/0x64;_0x128db3*=_0x471315;}if(_0x315208[_0x8710da(0x83e)]['match'](VisuMZ[_0x8710da(0x7ac)][_0x8710da(0x567)][_0x8710da(0x171)][_0x566bd8])){var _0x471315=Number(RegExp['$1']);_0x128db3*=_0x471315;}if(_0x315208[_0x8710da(0x83e)][_0x8710da(0x371)](VisuMZ['CoreEngine'][_0x8710da(0x567)]['sparamRateJS'][_0x566bd8])){var _0x1213a9=String(RegExp['$1']);_0x1213a9=VisuMZ[_0x8710da(0x7ac)][_0x8710da(0x675)](_0x1213a9);try{_0x128db3*=eval(_0x1213a9);}catch(_0x144057){if($gameTemp[_0x8710da(0x898)]())console['log'](_0x144057);}}return _0x128db3;};return this[_0x41d7e3(0x757)]()[_0x41d7e3(0x36e)](_0x40fe19,0x1);},Game_BattlerBase['prototype'][_0x5d7dff(0x1e6)]=function(_0x176a0e){const _0x23cee8=(_0x409e5a,_0x1070b8)=>{const _0xa94dbb=_0x195c;if(!_0x1070b8)return _0x409e5a;if(_0x1070b8['note'][_0xa94dbb(0x371)](VisuMZ[_0xa94dbb(0x7ac)][_0xa94dbb(0x567)][_0xa94dbb(0x651)][_0x176a0e])){var _0x22152f=Number(RegExp['$1'])/0x64;_0x409e5a+=_0x22152f;}if(_0x1070b8[_0xa94dbb(0x83e)][_0xa94dbb(0x371)](VisuMZ[_0xa94dbb(0x7ac)][_0xa94dbb(0x567)][_0xa94dbb(0x683)][_0x176a0e])){var _0x22152f=Number(RegExp['$1']);_0x409e5a+=_0x22152f;}if(_0x1070b8[_0xa94dbb(0x83e)][_0xa94dbb(0x371)](VisuMZ['CoreEngine'][_0xa94dbb(0x567)]['sparamFlatJS'][_0x176a0e])){var _0x1d0f15=String(RegExp['$1']);_0x1d0f15=VisuMZ[_0xa94dbb(0x7ac)][_0xa94dbb(0x675)](_0x1d0f15);try{_0x409e5a+=eval(_0x1d0f15);}catch(_0xbc0830){if($gameTemp[_0xa94dbb(0x898)]())console['log'](_0xbc0830);}}return _0x409e5a;};return this['traitObjects']()['reduce'](_0x23cee8,0x0);},Game_BattlerBase[_0x5d7dff(0x4fa)]['sparam']=function(_0x251e19){const _0x2811f2=_0x5d7dff;let _0xa416ac=_0x2811f2(0x4cc)+_0x251e19+_0x2811f2(0x17b);if(this['checkCacheKey'](_0xa416ac))return this[_0x2811f2(0x2df)][_0xa416ac];return this[_0x2811f2(0x2df)][_0xa416ac]=VisuMZ[_0x2811f2(0x7ac)][_0x2811f2(0x37c)]['Param'][_0x2811f2(0x19e)][_0x2811f2(0x5d5)](this,_0x251e19),this[_0x2811f2(0x2df)][_0xa416ac];},Game_BattlerBase[_0x5d7dff(0x4fa)][_0x5d7dff(0xd5)]=function(_0x389ae1,_0xa69f0a){const _0x9b1b4c=_0x5d7dff;if(typeof paramId===_0x9b1b4c(0x247))return this[_0x9b1b4c(0x314)](_0x389ae1);_0x389ae1=String(_0x389ae1||'')[_0x9b1b4c(0x496)]();if(_0x389ae1==='MAXHP')return this[_0x9b1b4c(0x314)](0x0);if(_0x389ae1==='MAXMP')return this[_0x9b1b4c(0x314)](0x1);if(_0x389ae1===_0x9b1b4c(0x48b))return this['param'](0x2);if(_0x389ae1==='DEF')return this[_0x9b1b4c(0x314)](0x3);if(_0x389ae1===_0x9b1b4c(0x5d2))return this[_0x9b1b4c(0x314)](0x4);if(_0x389ae1===_0x9b1b4c(0x60c))return this[_0x9b1b4c(0x314)](0x5);if(_0x389ae1===_0x9b1b4c(0x21a))return this['param'](0x6);if(_0x389ae1==='LUK')return this[_0x9b1b4c(0x314)](0x7);if(_0x389ae1===_0x9b1b4c(0x56a))return _0xa69f0a?String(Math['round'](this[_0x9b1b4c(0x40e)](0x0)*0x64))+'%':this[_0x9b1b4c(0x40e)](0x0);if(_0x389ae1===_0x9b1b4c(0x67e))return _0xa69f0a?String(Math['round'](this[_0x9b1b4c(0x40e)](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x389ae1===_0x9b1b4c(0x4a6))return _0xa69f0a?String(Math['round'](this['xparam'](0x2)*0x64))+'%':this[_0x9b1b4c(0x40e)](0x2);if(_0x389ae1===_0x9b1b4c(0x695))return _0xa69f0a?String(Math[_0x9b1b4c(0xd6)](this[_0x9b1b4c(0x40e)](0x3)*0x64))+'%':this[_0x9b1b4c(0x40e)](0x3);if(_0x389ae1===_0x9b1b4c(0x82c))return _0xa69f0a?String(Math['round'](this['xparam'](0x4)*0x64))+'%':this[_0x9b1b4c(0x40e)](0x4);if(_0x389ae1===_0x9b1b4c(0x734))return _0xa69f0a?String(Math[_0x9b1b4c(0xd6)](this['xparam'](0x5)*0x64))+'%':this[_0x9b1b4c(0x40e)](0x5);if(_0x389ae1==='CNT')return _0xa69f0a?String(Math['round'](this['xparam'](0x6)*0x64))+'%':this[_0x9b1b4c(0x40e)](0x6);if(_0x389ae1===_0x9b1b4c(0x72b))return _0xa69f0a?String(Math[_0x9b1b4c(0xd6)](this[_0x9b1b4c(0x40e)](0x7)*0x64))+'%':this['xparam'](0x7);if(_0x389ae1===_0x9b1b4c(0x49f))return _0xa69f0a?String(Math[_0x9b1b4c(0xd6)](this[_0x9b1b4c(0x40e)](0x8)*0x64))+'%':this[_0x9b1b4c(0x40e)](0x8);if(_0x389ae1===_0x9b1b4c(0x5f1))return _0xa69f0a?String(Math[_0x9b1b4c(0xd6)](this[_0x9b1b4c(0x40e)](0x9)*0x64))+'%':this[_0x9b1b4c(0x40e)](0x9);if(_0x389ae1===_0x9b1b4c(0x84a))return _0xa69f0a?String(Math[_0x9b1b4c(0xd6)](this['sparam'](0x0)*0x64))+'%':this[_0x9b1b4c(0x4cc)](0x0);if(_0x389ae1==='GRD')return _0xa69f0a?String(Math[_0x9b1b4c(0xd6)](this['sparam'](0x1)*0x64))+'%':this[_0x9b1b4c(0x4cc)](0x1);if(_0x389ae1===_0x9b1b4c(0x600))return _0xa69f0a?String(Math[_0x9b1b4c(0xd6)](this[_0x9b1b4c(0x4cc)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x389ae1===_0x9b1b4c(0x483))return _0xa69f0a?String(Math['round'](this['sparam'](0x3)*0x64))+'%':this[_0x9b1b4c(0x4cc)](0x3);if(_0x389ae1===_0x9b1b4c(0x6b4))return _0xa69f0a?String(Math['round'](this['sparam'](0x4)*0x64))+'%':this[_0x9b1b4c(0x4cc)](0x4);if(_0x389ae1===_0x9b1b4c(0x780))return _0xa69f0a?String(Math[_0x9b1b4c(0xd6)](this[_0x9b1b4c(0x4cc)](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x389ae1===_0x9b1b4c(0xcd))return _0xa69f0a?String(Math['round'](this['sparam'](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x389ae1===_0x9b1b4c(0x26a))return _0xa69f0a?String(Math['round'](this[_0x9b1b4c(0x4cc)](0x7)*0x64))+'%':this[_0x9b1b4c(0x4cc)](0x7);if(_0x389ae1===_0x9b1b4c(0x3a4))return _0xa69f0a?String(Math['round'](this['sparam'](0x8)*0x64))+'%':this['sparam'](0x8);if(_0x389ae1===_0x9b1b4c(0x6a9))return _0xa69f0a?String(Math[_0x9b1b4c(0xd6)](this[_0x9b1b4c(0x4cc)](0x9)*0x64))+'%':this[_0x9b1b4c(0x4cc)](0x9);if(VisuMZ[_0x9b1b4c(0x7ac)][_0x9b1b4c(0x120)][_0x389ae1]){const _0x27a51d=VisuMZ[_0x9b1b4c(0x7ac)][_0x9b1b4c(0x120)][_0x389ae1],_0x50aaad=this[_0x27a51d];return VisuMZ[_0x9b1b4c(0x7ac)]['CustomParamType'][_0x389ae1]===_0x9b1b4c(0x88b)?_0x50aaad:_0xa69f0a?String(Math[_0x9b1b4c(0xd6)](_0x50aaad*0x64))+'%':_0x50aaad;}return'';},Game_BattlerBase[_0x5d7dff(0x4fa)]['isDying']=function(){const _0x7c009e=_0x5d7dff;return this[_0x7c009e(0x593)]()&&this[_0x7c009e(0xca)]<this[_0x7c009e(0x8d9)]*VisuMZ['CoreEngine'][_0x7c009e(0x37c)][_0x7c009e(0x3b6)][_0x7c009e(0x58e)];},Game_Battler[_0x5d7dff(0x4fa)][_0x5d7dff(0x110)]=function(){const _0x393447=_0x5d7dff;SoundManager[_0x393447(0x5a9)](),this[_0x393447(0x67a)](_0x393447(0x2e7));},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x800)]=Game_Actor[_0x5d7dff(0x4fa)][_0x5d7dff(0x46f)],Game_Actor[_0x5d7dff(0x4fa)][_0x5d7dff(0x46f)]=function(_0x35ae87){const _0x105e0a=_0x5d7dff;if(this['level']>0x63)return this[_0x105e0a(0x87f)](_0x35ae87);return VisuMZ[_0x105e0a(0x7ac)][_0x105e0a(0x800)][_0x105e0a(0x5d5)](this,_0x35ae87);},Game_Actor[_0x5d7dff(0x4fa)]['paramBaseAboveLevel99']=function(_0x5ca430){const _0x25aad6=_0x5d7dff,_0x3e2c13=this[_0x25aad6(0x807)]()[_0x25aad6(0x73f)][_0x5ca430][0x63],_0x166f21=this[_0x25aad6(0x807)]()[_0x25aad6(0x73f)][_0x5ca430][0x62];return _0x3e2c13+(_0x3e2c13-_0x166f21)*(this['level']-0x63);},VisuMZ[_0x5d7dff(0x7ac)]['Game_Actor_changeClass']=Game_Actor['prototype'][_0x5d7dff(0x7ec)],Game_Actor[_0x5d7dff(0x4fa)][_0x5d7dff(0x7ec)]=function(_0x3ede6d,_0x125ec8){const _0x4fef10=_0x5d7dff;$gameTemp[_0x4fef10(0x72e)]=!![],VisuMZ[_0x4fef10(0x7ac)][_0x4fef10(0x670)]['call'](this,_0x3ede6d,_0x125ec8),$gameTemp[_0x4fef10(0x72e)]=undefined;},VisuMZ[_0x5d7dff(0x7ac)]['Game_Actor_levelUp']=Game_Actor[_0x5d7dff(0x4fa)][_0x5d7dff(0x54f)],Game_Actor['prototype']['levelUp']=function(){const _0x7599ba=_0x5d7dff;VisuMZ[_0x7599ba(0x7ac)][_0x7599ba(0x5c9)][_0x7599ba(0x5d5)](this);if(!$gameTemp[_0x7599ba(0x72e)])this[_0x7599ba(0x6dc)]();},Game_Actor[_0x5d7dff(0x4fa)]['levelUpRecovery']=function(){const _0x25f817=_0x5d7dff;this['_cache']={};if(VisuMZ[_0x25f817(0x7ac)][_0x25f817(0x37c)][_0x25f817(0x116)][_0x25f817(0x28a)])this[_0x25f817(0xca)]=this['mhp'];if(VisuMZ['CoreEngine'][_0x25f817(0x37c)][_0x25f817(0x116)][_0x25f817(0xf4)])this['_mp']=this[_0x25f817(0x105)];},Game_Actor[_0x5d7dff(0x4fa)][_0x5d7dff(0xcc)]=function(){const _0x7e4004=_0x5d7dff;if(this[_0x7e4004(0x118)]())return 0x1;const _0x56fc2c=this['nextLevelExp']()-this[_0x7e4004(0xe3)](),_0x375fb3=this['currentExp']()-this[_0x7e4004(0xe3)]();return(_0x375fb3/_0x56fc2c)[_0x7e4004(0x3aa)](0x0,0x1);},Game_Actor[_0x5d7dff(0x4fa)]['traitObjects']=function(){const _0x1db652=_0x5d7dff,_0x33fd67=Game_Battler['prototype']['traitObjects'][_0x1db652(0x5d5)](this);for(const _0xfcb00b of this['equips']()){_0xfcb00b&&_0x33fd67[_0x1db652(0x1a0)](_0xfcb00b);}return _0x33fd67[_0x1db652(0x1a0)](this['currentClass'](),this['actor']()),_0x33fd67;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x6ba)]=Game_Actor['prototype'][_0x5d7dff(0x6f0)],Game_Actor[_0x5d7dff(0x4fa)][_0x5d7dff(0x6f0)]=function(){const _0xf20fee=_0x5d7dff;if(!$gameParty[_0xf20fee(0x236)]())return!![];return VisuMZ[_0xf20fee(0x7ac)][_0xf20fee(0x6ba)][_0xf20fee(0x5d5)](this);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1ef)]=Game_Unit[_0x5d7dff(0x4fa)][_0x5d7dff(0x7a6)],Game_Unit[_0x5d7dff(0x4fa)][_0x5d7dff(0x7a6)]=function(_0x42ba7e){const _0x1fe9b1=_0x5d7dff;this[_0x1fe9b1(0x1c1)]=!![],VisuMZ['CoreEngine'][_0x1fe9b1(0x1ef)]['call'](this,_0x42ba7e);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x7a5)]=Game_Unit[_0x5d7dff(0x4fa)][_0x5d7dff(0x7bd)],Game_Unit[_0x5d7dff(0x4fa)][_0x5d7dff(0x7bd)]=function(){const _0x2f908d=_0x5d7dff;for(const _0x110e18 of this[_0x2f908d(0x3b4)]()){_0x110e18&&!_0x110e18[_0x2f908d(0x6f0)]()&&_0x110e18[_0x2f908d(0x2d1)]();}VisuMZ[_0x2f908d(0x7ac)]['Game_Unit_onBattleEnd'][_0x2f908d(0x5d5)](this);},Object['defineProperty'](Game_Enemy[_0x5d7dff(0x4fa)],_0x5d7dff(0x286),{'get':function(){const _0x102332=_0x5d7dff;return this[_0x102332(0x293)]();},'configurable':!![]}),Game_Enemy[_0x5d7dff(0x4fa)][_0x5d7dff(0x293)]=function(){const _0x3f77af=_0x5d7dff;return this[_0x3f77af(0x5ed)]()[_0x3f77af(0x286)];},Game_Enemy['prototype'][_0x5d7dff(0x22c)]=function(){const _0x4bda54=_0x5d7dff;!this[_0x4bda54(0x103)]&&(this[_0x4bda54(0x17f)]+=Math['round']((Graphics[_0x4bda54(0x8af)]-0x270)/0x2),this['_screenY']-=Math[_0x4bda54(0x559)]((Graphics[_0x4bda54(0x8af)]-Graphics['boxHeight'])/0x2),$gameSystem['isSideView']()?this[_0x4bda54(0x70f)]-=Math[_0x4bda54(0x559)]((Graphics['width']-Graphics[_0x4bda54(0x312)])/0x2):this[_0x4bda54(0x70f)]+=Math[_0x4bda54(0xd6)]((Graphics[_0x4bda54(0x312)]-0x330)/0x2)),this[_0x4bda54(0x103)]=!![];},Game_Party[_0x5d7dff(0x4fa)][_0x5d7dff(0x506)]=function(){const _0x163cf2=_0x5d7dff;return VisuMZ['CoreEngine'][_0x163cf2(0x37c)][_0x163cf2(0x7bf)][_0x163cf2(0x40f)];},VisuMZ['CoreEngine'][_0x5d7dff(0x391)]=Game_Party[_0x5d7dff(0x4fa)]['consumeItem'],Game_Party[_0x5d7dff(0x4fa)][_0x5d7dff(0x200)]=function(_0x5f4f9c){const _0x3d64ba=_0x5d7dff;if(VisuMZ[_0x3d64ba(0x7ac)][_0x3d64ba(0x37c)]['QoL'][_0x3d64ba(0x48d)]&&DataManager[_0x3d64ba(0x50c)](_0x5f4f9c))return;VisuMZ[_0x3d64ba(0x7ac)]['Game_Party_consumeItem'][_0x3d64ba(0x5d5)](this,_0x5f4f9c);},Game_Party[_0x5d7dff(0x4fa)][_0x5d7dff(0x287)]=function(){const _0x3a8821=_0x5d7dff,_0x59bcf0=VisuMZ[_0x3a8821(0x7ac)][_0x3a8821(0x37c)][_0x3a8821(0x116)],_0x4aec15=_0x59bcf0[_0x3a8821(0x503)]??0x63;let _0x407335=[];(_0x59bcf0[_0x3a8821(0x840)]??!![])&&(_0x407335=_0x407335[_0x3a8821(0x2bc)]($dataItems));(_0x59bcf0[_0x3a8821(0x861)]??!![])&&(_0x407335=_0x407335[_0x3a8821(0x2bc)]($dataWeapons));(_0x59bcf0[_0x3a8821(0x3f8)]??!![])&&(_0x407335=_0x407335['concat']($dataArmors));for(const _0x4cb61c of _0x407335){if(!_0x4cb61c)continue;if(_0x4cb61c[_0x3a8821(0x814)][_0x3a8821(0x6b5)]()<=0x0)continue;if(_0x4cb61c['name'][_0x3a8821(0x371)](/-----/i))continue;this[_0x3a8821(0x684)](_0x4cb61c,_0x4aec15);}},VisuMZ[_0x5d7dff(0x7ac)]['Game_Troop_setup']=Game_Troop[_0x5d7dff(0x4fa)][_0x5d7dff(0x733)],Game_Troop[_0x5d7dff(0x4fa)][_0x5d7dff(0x733)]=function(_0x1c1e34){const _0x2a5cd1=_0x5d7dff;$gameTemp[_0x2a5cd1(0x8a7)](),$gameTemp[_0x2a5cd1(0x523)](_0x1c1e34),VisuMZ['CoreEngine']['Game_Troop_setup']['call'](this,_0x1c1e34);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x638)]=Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x733)],Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x733)]=function(_0x9153ef){const _0x585258=_0x5d7dff;VisuMZ[_0x585258(0x7ac)][_0x585258(0x638)]['call'](this,_0x9153ef),this[_0x585258(0x771)](),this[_0x585258(0x115)](_0x9153ef),this[_0x585258(0x61b)]();},Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x115)]=function(){const _0x18d071=_0x5d7dff;this['_hideTileShadows']=VisuMZ[_0x18d071(0x7ac)][_0x18d071(0x37c)][_0x18d071(0x116)][_0x18d071(0x73a)]||![];const _0x366702=VisuMZ['CoreEngine'][_0x18d071(0x37c)]['ScreenResolution'],_0x4f7ea3=$dataMap?$dataMap[_0x18d071(0x83e)]||'':'';if(_0x4f7ea3[_0x18d071(0x371)](/<SHOW TILE SHADOWS>/i))this[_0x18d071(0x30f)]=![];else _0x4f7ea3[_0x18d071(0x371)](/<HIDE TILE SHADOWS>/i)&&(this[_0x18d071(0x30f)]=!![]);if(_0x4f7ea3[_0x18d071(0x371)](/<SCROLL LOCK X>/i))this['centerCameraCheckData']()[_0x18d071(0xfa)]=!![],this['centerCameraCheckData']()['displayX']=_0x366702[_0x18d071(0x290)];else _0x4f7ea3[_0x18d071(0x371)](/<SCROLL LOCK X: (.*?)>/i)&&(this['centerCameraCheckData']()[_0x18d071(0xfa)]=!![],this[_0x18d071(0x65d)]()[_0x18d071(0x244)]=Number(RegExp['$1']));if(_0x4f7ea3[_0x18d071(0x371)](/<SCROLL LOCK Y>/i))this['centerCameraCheckData']()[_0x18d071(0x7fd)]=!![],this[_0x18d071(0x65d)]()[_0x18d071(0x8d0)]=_0x366702[_0x18d071(0x373)];else _0x4f7ea3[_0x18d071(0x371)](/<SCROLL LOCK Y: (.*?)>/i)&&(this['centerCameraCheckData']()[_0x18d071(0x7fd)]=!![],this[_0x18d071(0x65d)]()[_0x18d071(0x8d0)]=Number(RegExp['$1']));},Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x2c7)]=function(){const _0x3de32e=_0x5d7dff;if(this[_0x3de32e(0x30f)]===undefined)this['setupCoreEngine']();return this[_0x3de32e(0x30f)];},Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x771)]=function(){const _0x7ec9ac=_0x5d7dff,_0x31306d=VisuMZ['CoreEngine'][_0x7ec9ac(0x37c)][_0x7ec9ac(0x513)];this[_0x7ec9ac(0x1bb)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x31306d['AutoScrollLockX']){const _0x3dc8b8=Graphics[_0x7ec9ac(0x47e)]/this['tileWidth']();_0x3dc8b8%0x1!==0x0&&Math[_0x7ec9ac(0x5c6)](_0x3dc8b8)===this[_0x7ec9ac(0x47e)]()&&!this[_0x7ec9ac(0x406)]()&&(this['_centerCameraCheck'][_0x7ec9ac(0xfa)]=!![],this[_0x7ec9ac(0x1bb)][_0x7ec9ac(0x244)]=_0x31306d[_0x7ec9ac(0x290)]||0x0);}if(_0x31306d[_0x7ec9ac(0x5e6)]){const _0xd906f=Graphics['height']/this[_0x7ec9ac(0x472)]();_0xd906f%0x1!==0x0&&Math[_0x7ec9ac(0x5c6)](_0xd906f)===this['height']()&&!this[_0x7ec9ac(0x54d)]()&&(this[_0x7ec9ac(0x1bb)]['centerY']=!![],this[_0x7ec9ac(0x1bb)][_0x7ec9ac(0x8d0)]=_0x31306d[_0x7ec9ac(0x373)]||0x0);}$gameScreen[_0x7ec9ac(0x2c1)]()===0x1&&(this[_0x7ec9ac(0x65d)]()[_0x7ec9ac(0xfa)]&&(this[_0x7ec9ac(0x85c)]=this[_0x7ec9ac(0x65d)]()[_0x7ec9ac(0x244)]),this['centerCameraCheckData']()[_0x7ec9ac(0x7fd)]&&(this[_0x7ec9ac(0x86f)]=this['centerCameraCheckData']()[_0x7ec9ac(0x8d0)]));},VisuMZ['CoreEngine'][_0x5d7dff(0x399)]=Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x1a3)],Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x1a3)]=function(_0x201b6e,_0x3fe90b){const _0x4cc46c=_0x5d7dff;VisuMZ[_0x4cc46c(0x7ac)][_0x4cc46c(0x399)]['call'](this,_0x201b6e,_0x3fe90b),$gameScreen[_0x4cc46c(0x2c1)]()===0x1&&(!this['isLoopHorizontal']()&&this[_0x4cc46c(0x65d)]()[_0x4cc46c(0xfa)]&&(this[_0x4cc46c(0x85c)]=this[_0x4cc46c(0x65d)]()[_0x4cc46c(0x244)]),!this[_0x4cc46c(0x54d)]()&&this[_0x4cc46c(0x65d)]()['centerY']&&(this['_displayY']=this[_0x4cc46c(0x65d)]()['displayY']));},Game_Map['prototype'][_0x5d7dff(0x65d)]=function(){const _0x2b59ce=_0x5d7dff;if(this[_0x2b59ce(0x1bb)]===undefined)this[_0x2b59ce(0x771)]();return this[_0x2b59ce(0x1bb)];},VisuMZ[_0x5d7dff(0x7ac)]['Game_Map_scrollDown']=Game_Map[_0x5d7dff(0x4fa)]['scrollDown'],Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x2a3)]=function(_0x2ccbfc){const _0x4ceaa0=_0x5d7dff;if(this[_0x4ceaa0(0x65d)]()[_0x4ceaa0(0x7fd)]&&$gameScreen[_0x4ceaa0(0x2c1)]()===0x1){this[_0x4ceaa0(0x86f)]=this[_0x4ceaa0(0x65d)]()[_0x4ceaa0(0x8d0)];return;}VisuMZ[_0x4ceaa0(0x7ac)]['Game_Map_scrollDown']['call'](this,_0x2ccbfc);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x6bd)]=Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x3fe)],Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x3fe)]=function(_0x2d19dc){const _0x141962=_0x5d7dff;if(this[_0x141962(0x65d)]()['centerX']&&$gameScreen[_0x141962(0x2c1)]()===0x1){this[_0x141962(0x85c)]=this[_0x141962(0x65d)]()[_0x141962(0x244)];return;}VisuMZ['CoreEngine']['Game_Map_scrollLeft']['call'](this,_0x2d19dc);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x18a)]=Game_Map[_0x5d7dff(0x4fa)]['scrollRight'],Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x8a6)]=function(_0x1d800c){const _0xdde3ba=_0x5d7dff;if(this[_0xdde3ba(0x65d)]()[_0xdde3ba(0xfa)]&&$gameScreen[_0xdde3ba(0x2c1)]()===0x1){this[_0xdde3ba(0x85c)]=this[_0xdde3ba(0x65d)]()[_0xdde3ba(0x244)];return;}VisuMZ['CoreEngine'][_0xdde3ba(0x18a)]['call'](this,_0x1d800c);},VisuMZ['CoreEngine'][_0x5d7dff(0x1ec)]=Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x234)],Game_Map['prototype'][_0x5d7dff(0x234)]=function(_0x49c928){const _0x516394=_0x5d7dff;if(this[_0x516394(0x65d)]()[_0x516394(0x7fd)]&&$gameScreen['zoomScale']()===0x1){this[_0x516394(0x86f)]=this[_0x516394(0x65d)]()['displayY'];return;}VisuMZ[_0x516394(0x7ac)][_0x516394(0x1ec)][_0x516394(0x5d5)](this,_0x49c928);},Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x61b)]=function(){const _0x206cbf=_0x5d7dff;this[_0x206cbf(0x2bd)]={};const _0x4835b1=this[_0x206cbf(0x3fc)]();if(!_0x4835b1)return{};const _0x297242=_0x4835b1['note']||'',_0x597d4d=/<(?:TALLER|EXT|EXTEND|RAISE)[ ]BY[ ](\d+):[ ](.*)>/gi;let _0x50a574={};const _0x28f426=_0x297242[_0x206cbf(0x371)](_0x597d4d);if(_0x28f426)for(const _0x4716bb of _0x28f426){_0x4716bb[_0x206cbf(0x371)](_0x597d4d);const _0x535581=Number(RegExp['$1'])[_0x206cbf(0x3aa)](0x1,0x10),_0xcb32e9=String(RegExp['$2'])[_0x206cbf(0x767)](',')['map'](_0x338383=>Number(_0x338383)['clamp'](0x1,0x7));for(const _0x26f598 of _0xcb32e9){_0x50a574[_0x26f598]=_0x535581;}}this[_0x206cbf(0x2bd)]=_0x50a574;},Game_Map[_0x5d7dff(0x4fa)]['getTileExtendTerrainTags']=function(){const _0x272765=_0x5d7dff;if(this[_0x272765(0x2bd)]===undefined)this['setupTileExtendTerrainTags']();return this[_0x272765(0x2bd)];},Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0xf7)]=function(_0x4d7193){const _0x33c702=_0x5d7dff;if(_0x4d7193>=0x400)return![];const _0x23ea63=$gameMap[_0x33c702(0x4ad)]();if(Object['keys'](_0x23ea63)[_0x33c702(0xfd)]<=0x0)return![];const _0x1e285a=this['tilesetFlags'](),_0x1df7d0=_0x1e285a[_0x4d7193]>>0xc,_0xa8ed7d=_0x23ea63[_0x1df7d0]||0x0;return _0xa8ed7d>0x0;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x8db)]=Game_Map[_0x5d7dff(0x4fa)]['changeTileset'],Game_Map[_0x5d7dff(0x4fa)]['changeTileset']=function(_0x33e97e){const _0x3d9f6f=_0x5d7dff;VisuMZ[_0x3d9f6f(0x7ac)][_0x3d9f6f(0x8db)][_0x3d9f6f(0x5d5)](this,_0x33e97e),this[_0x3d9f6f(0x1b3)](),SceneManager[_0x3d9f6f(0x882)]['_spriteset'][_0x3d9f6f(0x75f)]();},Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x1b3)]=function(){const _0x3678c9=_0x5d7dff,_0x456a78=this[_0x3678c9(0x4ad)]();if(Object[_0x3678c9(0x383)](_0x456a78)[_0x3678c9(0xfd)]<=0x0)return;const _0x387e5c=SceneManager[_0x3678c9(0x882)][_0x3678c9(0x1cb)];_0x387e5c&&(_0x387e5c[_0x3678c9(0x4df)]&&_0x387e5c[_0x3678c9(0x4df)](),_0x387e5c['createTileExtendSprites']&&_0x387e5c[_0x3678c9(0x28f)]());},VisuMZ['CoreEngine'][_0x5d7dff(0x7ab)]=Game_Character[_0x5d7dff(0x4fa)][_0x5d7dff(0x1c5)],Game_Character[_0x5d7dff(0x4fa)][_0x5d7dff(0x1c5)]=function(_0xe8c44d){const _0x954d72=_0x5d7dff;try{VisuMZ[_0x954d72(0x7ac)][_0x954d72(0x7ab)][_0x954d72(0x5d5)](this,_0xe8c44d);}catch(_0x28cc4c){if($gameTemp['isPlaytest']())console[_0x954d72(0x2eb)](_0x28cc4c);}},Game_Player['prototype']['makeEncounterCount']=function(){const _0x1ffd65=_0x5d7dff,_0x89de80=$gameMap[_0x1ffd65(0x352)]();this[_0x1ffd65(0xe1)]=Math[_0x1ffd65(0x760)](_0x89de80)+Math[_0x1ffd65(0x760)](_0x89de80)+this[_0x1ffd65(0x7d0)]();},Game_Player[_0x5d7dff(0x4fa)][_0x5d7dff(0x7d0)]=function(){const _0x182a01=_0x5d7dff;return $dataMap&&$dataMap[_0x182a01(0x83e)]&&$dataMap[_0x182a01(0x83e)][_0x182a01(0x371)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x182a01(0x7ac)][_0x182a01(0x37c)]['QoL'][_0x182a01(0x752)];},VisuMZ[_0x5d7dff(0x7ac)]['Game_Event_isCollidedWithEvents']=Game_Event['prototype'][_0x5d7dff(0x50b)],Game_Event['prototype']['isCollidedWithEvents']=function(_0x1af9b1,_0x2f6a96){const _0x563d7b=_0x5d7dff;return this[_0x563d7b(0x784)]()?this['checkSmartEventCollision'](_0x1af9b1,_0x2f6a96):VisuMZ[_0x563d7b(0x7ac)][_0x563d7b(0x5b9)][_0x563d7b(0x5d5)](this,_0x1af9b1,_0x2f6a96);},Game_Event[_0x5d7dff(0x4fa)][_0x5d7dff(0x784)]=function(){const _0x18d15d=_0x5d7dff;return VisuMZ[_0x18d15d(0x7ac)]['Settings'][_0x18d15d(0x116)][_0x18d15d(0x871)];},Game_Event[_0x5d7dff(0x4fa)][_0x5d7dff(0x292)]=function(_0x316d4e,_0x3d60d5){const _0x5d5365=_0x5d7dff;if(!this[_0x5d5365(0x816)]())return![];else{const _0x3d9703=$gameMap[_0x5d5365(0x145)](_0x316d4e,_0x3d60d5)[_0x5d5365(0x1e5)](_0x1154c5=>_0x1154c5[_0x5d5365(0x816)]());return _0x3d9703[_0x5d5365(0xfd)]>0x0;}},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x4f2)]=Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x1a8)],Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x1a8)]=function(_0x4dfa97){const _0x1b0931=_0x5d7dff,_0x433cc7=this[_0x1b0931(0x830)]();return _0x433cc7['match'](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x1b0931(0x402)](_0x433cc7):VisuMZ['CoreEngine'][_0x1b0931(0x4f2)][_0x1b0931(0x5d5)](this,_0x4dfa97);},Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x830)]=function(){const _0x280f1e=_0x5d7dff;let _0xdbaeb1='',_0x18b225=this[_0x280f1e(0x26d)]+0x1;while(this[_0x280f1e(0x809)][_0x18b225]&&this[_0x280f1e(0x809)][_0x18b225]['code']===0x195){_0xdbaeb1+=this[_0x280f1e(0x809)][_0x18b225]['parameters'][0x0]+'\x0a',_0x18b225++;}return _0xdbaeb1;},Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x402)]=function(_0x4ca07e){const _0x4cee3a=_0x5d7dff;try{eval(_0x4ca07e);}catch(_0x2bb96d){$gameTemp[_0x4cee3a(0x898)]()&&(console[_0x4cee3a(0x2eb)](_0x4cee3a(0x474)),console[_0x4cee3a(0x2eb)](_0x2bb96d));}return!![];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x375)]=Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x4a5)],Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x4a5)]=function(_0xb8e797){const _0x3dfc1c=_0x5d7dff;try{VisuMZ[_0x3dfc1c(0x7ac)][_0x3dfc1c(0x375)][_0x3dfc1c(0x5d5)](this,_0xb8e797);}catch(_0x440fee){$gameTemp[_0x3dfc1c(0x898)]()&&(console['log'](_0x3dfc1c(0x716)),console['log'](_0x440fee)),this[_0x3dfc1c(0x39a)]();}return!![];},VisuMZ[_0x5d7dff(0x7ac)]['Game_Interpreter_command122']=Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x447)],Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x447)]=function(_0x435a65){const _0x13a0da=_0x5d7dff;try{VisuMZ[_0x13a0da(0x7ac)]['Game_Interpreter_command122'][_0x13a0da(0x5d5)](this,_0x435a65);}catch(_0x87d728){$gameTemp[_0x13a0da(0x898)]()&&(console['log'](_0x13a0da(0x666)),console[_0x13a0da(0x2eb)](_0x87d728));}return!![];},VisuMZ[_0x5d7dff(0x7ac)]['Game_Interpreter_command355']=Game_Interpreter[_0x5d7dff(0x4fa)]['command355'],Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x450)]=function(){const _0x7ced5=_0x5d7dff;try{VisuMZ[_0x7ced5(0x7ac)][_0x7ced5(0x24d)][_0x7ced5(0x5d5)](this);}catch(_0x54b0cd){$gameTemp['isPlaytest']()&&(console[_0x7ced5(0x2eb)](_0x7ced5(0x140)),console[_0x7ced5(0x2eb)](_0x54b0cd));}return!![];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1ce)]=Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x3ab)],Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x3ab)]=function(_0xa02808){const _0x14c154=_0x5d7dff;return $gameTemp[_0x14c154(0x815)](this),VisuMZ[_0x14c154(0x7ac)]['Game_Interpreter_PluginCommand'][_0x14c154(0x5d5)](this,_0xa02808);},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x7c4)]=function(){const _0x3090f4=_0x5d7dff;return VisuMZ[_0x3090f4(0x7ac)][_0x3090f4(0x37c)]['UI'][_0x3090f4(0x129)];},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x5ee)]=function(){const _0x1adafa=_0x5d7dff;return VisuMZ[_0x1adafa(0x7ac)][_0x1adafa(0x37c)]['UI']['BottomHelp'];},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x248)]=function(){const _0x40b5d0=_0x5d7dff;return VisuMZ['CoreEngine'][_0x40b5d0(0x37c)]['UI'][_0x40b5d0(0x5e0)];},Scene_Base['prototype'][_0x5d7dff(0x825)]=function(){const _0x4c141d=_0x5d7dff;return VisuMZ[_0x4c141d(0x7ac)]['Settings']['UI']['RightMenus'];},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x64d)]=function(){const _0x201d37=_0x5d7dff;return VisuMZ[_0x201d37(0x7ac)][_0x201d37(0x37c)]['UI'][_0x201d37(0x5fe)];},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x852)]=function(){const _0x119738=_0x5d7dff;return VisuMZ[_0x119738(0x7ac)][_0x119738(0x37c)]['UI'][_0x119738(0x13c)];},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x459)]=function(){const _0x5472d0=_0x5d7dff;return VisuMZ[_0x5472d0(0x7ac)][_0x5472d0(0x37c)][_0x5472d0(0x448)][_0x5472d0(0x77f)];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x8a9)]=Scene_Base['prototype'][_0x5d7dff(0x1fe)],Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x1fe)]=function(){const _0xe8d8cb=_0x5d7dff;VisuMZ[_0xe8d8cb(0x7ac)]['Scene_Base_createWindowLayer'][_0xe8d8cb(0x5d5)](this),this['createButtonAssistWindow'](),this['createTextPopupWindow'](),this[_0xe8d8cb(0x76b)]['x']=Math[_0xe8d8cb(0xd6)](this['_windowLayer']['x']),this[_0xe8d8cb(0x76b)]['y']=Math[_0xe8d8cb(0xd6)](this['_windowLayer']['y']);},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x47a)]=function(){},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x23d)]=function(){const _0x45956b=_0x5d7dff;this[_0x45956b(0x857)]=new Window_TextPopup(),this[_0x45956b(0x6e6)](this[_0x45956b(0x857)]);},$textPopup=function(_0x159fd4){const _0x335584=_0x5d7dff,_0x3ab0e0=SceneManager[_0x335584(0x882)][_0x335584(0x857)];_0x3ab0e0&&_0x3ab0e0[_0x335584(0x433)](_0x159fd4);},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x731)]=function(){const _0x76b43d=_0x5d7dff;return TextManager[_0x76b43d(0x18c)](_0x76b43d(0x786),_0x76b43d(0xe5));},Scene_Base['prototype'][_0x5d7dff(0x7b7)]=function(){const _0x159f62=_0x5d7dff;return TextManager[_0x159f62(0x2fe)](_0x159f62(0x7cb));},Scene_Base[_0x5d7dff(0x4fa)]['buttonAssistKey3']=function(){const _0x5d508f=_0x5d7dff;return TextManager[_0x5d508f(0x2fe)](_0x5d508f(0x226));},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x4d6)]=function(){const _0x333ec6=_0x5d7dff;return TextManager[_0x333ec6(0x2fe)]('ok');},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x25d)]=function(){const _0x4ab7a3=_0x5d7dff;return TextManager[_0x4ab7a3(0x2fe)](_0x4ab7a3(0x381));},Scene_Base['prototype']['buttonAssistText1']=function(){const _0x43e8eb=_0x5d7dff;return this[_0x43e8eb(0x60d)]&&this[_0x43e8eb(0x60d)]['visible']?TextManager['buttonAssistSwitch']:'';},Scene_Base['prototype'][_0x5d7dff(0x6cb)]=function(){return'';},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x45d)]=function(){return'';},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x729)]=function(){const _0x47ef76=_0x5d7dff;return TextManager[_0x47ef76(0x295)];},Scene_Base['prototype'][_0x5d7dff(0x4dd)]=function(){const _0x59a98e=_0x5d7dff;return TextManager[_0x59a98e(0xde)];},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x7be)]=function(){return 0x0;},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x61e)]=function(){return 0x0;},Scene_Base[_0x5d7dff(0x4fa)]['buttonAssistOffset3']=function(){return 0x0;},Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x14b)]=function(){return 0x0;},Scene_Base['prototype'][_0x5d7dff(0x360)]=function(){return 0x0;},VisuMZ[_0x5d7dff(0x7ac)]['Scene_Boot_loadSystemImages']=Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x31e)],Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x31e)]=function(){const _0x41e455=_0x5d7dff;VisuMZ['CoreEngine'][_0x41e455(0x7af)]['call'](this),this[_0x41e455(0xff)]();},Scene_Boot[_0x5d7dff(0x4fa)]['loadGameImagesCoreEngine']=function(){const _0x152813=_0x5d7dff,_0x126adc=[_0x152813(0x883),'battlebacks1','battlebacks2',_0x152813(0x42d),'enemies',_0x152813(0x46e),_0x152813(0x6be),_0x152813(0x264),_0x152813(0x39b),_0x152813(0x7ba),_0x152813(0x325),_0x152813(0x5ce),_0x152813(0x561),'titles2'];for(const _0x25b6da of _0x126adc){const _0x9699f1=VisuMZ[_0x152813(0x7ac)][_0x152813(0x37c)]['ImgLoad'][_0x25b6da],_0x163b43=_0x152813(0x274)[_0x152813(0x106)](_0x25b6da);for(const _0x45c2b7 of _0x9699f1){ImageManager['loadBitmap'](_0x163b43,_0x45c2b7);}}},VisuMZ['CoreEngine'][_0x5d7dff(0x531)]=Scene_Boot[_0x5d7dff(0x4fa)]['startNormalGame'],Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x68b)]=function(){const _0x2947aa=_0x5d7dff;Utils[_0x2947aa(0x4ea)](_0x2947aa(0x64e))&&VisuMZ[_0x2947aa(0x7ac)][_0x2947aa(0x37c)][_0x2947aa(0x116)][_0x2947aa(0x59d)]?this[_0x2947aa(0x542)]():VisuMZ[_0x2947aa(0x7ac)][_0x2947aa(0x531)][_0x2947aa(0x5d5)](this);},Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x542)]=function(){const _0xebe82d=_0x5d7dff;this['checkPlayerLocation'](),DataManager[_0xebe82d(0x435)](),SceneManager[_0xebe82d(0x271)](Scene_Map);},Scene_Boot['prototype'][_0x5d7dff(0x590)]=function(){const _0x25b496=_0x5d7dff,_0x83c78c=$dataSystem['advanced'][_0x25b496(0x863)],_0x4d8f00=$dataSystem[_0x25b496(0x791)][_0x25b496(0x1b9)],_0x153089=VisuMZ[_0x25b496(0x7ac)][_0x25b496(0x37c)]['UI'][_0x25b496(0x611)];Graphics[_0x25b496(0x312)]=_0x83c78c-_0x153089*0x2,Graphics[_0x25b496(0x1a2)]=_0x4d8f00-_0x153089*0x2,this[_0x25b496(0x74c)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x4f4)]=Scene_Boot[_0x5d7dff(0x4fa)]['updateDocumentTitle'],Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x1d7)]=function(){const _0x549acb=_0x5d7dff;this[_0x549acb(0x55c)]()?this[_0x549acb(0x3c5)]():VisuMZ[_0x549acb(0x7ac)][_0x549acb(0x4f4)][_0x549acb(0x5d5)](this);},Scene_Boot['prototype'][_0x5d7dff(0x55c)]=function(){const _0x707f86=_0x5d7dff;if(Scene_Title[_0x707f86(0x3e4)]==='')return![];if(Scene_Title[_0x707f86(0x3e4)]===_0x707f86(0x3a6))return![];if(Scene_Title[_0x707f86(0x342)]==='')return![];if(Scene_Title[_0x707f86(0x342)]==='0.00')return![];return!![];},Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x3c5)]=function(){const _0x927fcb=_0x5d7dff,_0x83cb9e=$dataSystem[_0x927fcb(0x54e)],_0x359e84=Scene_Title['subtitle']||'',_0x206b71=Scene_Title[_0x927fcb(0x342)]||'',_0x617e53=VisuMZ[_0x927fcb(0x7ac)][_0x927fcb(0x37c)][_0x927fcb(0x56c)]['Title']['DocumentTitleFmt'],_0x3ffeec=_0x617e53[_0x927fcb(0x106)](_0x83cb9e,_0x359e84,_0x206b71);document[_0x927fcb(0x5c0)]=_0x3ffeec;},Scene_Boot[_0x5d7dff(0x4fa)][_0x5d7dff(0x74c)]=function(){const _0xba59f=_0x5d7dff;if(VisuMZ[_0xba59f(0x7ac)]['Settings']['UI'][_0xba59f(0xce)]){const _0x293e46=Graphics[_0xba59f(0x47e)]-Graphics[_0xba59f(0x312)]-VisuMZ[_0xba59f(0x7ac)][_0xba59f(0x37c)]['UI'][_0xba59f(0x611)]*0x2,_0x1649b4=Sprite_Button[_0xba59f(0x4fa)][_0xba59f(0x8a1)][_0xba59f(0x5d5)](this)*0x4;if(_0x293e46>=_0x1649b4)SceneManager[_0xba59f(0x891)](!![]);}},Scene_Title[_0x5d7dff(0x3e4)]=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x56c)][_0x5d7dff(0xea)][_0x5d7dff(0x3a6)],Scene_Title[_0x5d7dff(0x342)]=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)]['MenuLayout']['Title'][_0x5d7dff(0x89e)],Scene_Title['pictureButtons']=VisuMZ['CoreEngine'][_0x5d7dff(0x37c)][_0x5d7dff(0x8d3)],VisuMZ[_0x5d7dff(0x7ac)]['Scene_Title_drawGameTitle']=Scene_Title['prototype'][_0x5d7dff(0x3d2)],Scene_Title[_0x5d7dff(0x4fa)][_0x5d7dff(0x3d2)]=function(){const _0x1165ae=_0x5d7dff;VisuMZ[_0x1165ae(0x7ac)][_0x1165ae(0x37c)][_0x1165ae(0x56c)][_0x1165ae(0xea)][_0x1165ae(0x3d2)][_0x1165ae(0x5d5)](this);if(Scene_Title[_0x1165ae(0x3e4)]!==''&&Scene_Title['subtitle']!==_0x1165ae(0x3a6))this[_0x1165ae(0x1bf)]();if(Scene_Title[_0x1165ae(0x342)]!==''&&Scene_Title['version']!=='0.00')this[_0x1165ae(0x1d6)]();},Scene_Title['prototype'][_0x5d7dff(0x1bf)]=function(){const _0x2eee99=_0x5d7dff;VisuMZ[_0x2eee99(0x7ac)]['Settings']['MenuLayout'][_0x2eee99(0xea)]['drawGameSubtitle'][_0x2eee99(0x5d5)](this);},Scene_Title[_0x5d7dff(0x4fa)]['drawGameVersion']=function(){const _0x3664d6=_0x5d7dff;VisuMZ[_0x3664d6(0x7ac)][_0x3664d6(0x37c)]['MenuLayout']['Title'][_0x3664d6(0x1d6)][_0x3664d6(0x5d5)](this);},Scene_Title[_0x5d7dff(0x4fa)][_0x5d7dff(0x2f8)]=function(){const _0x251bc0=_0x5d7dff;this[_0x251bc0(0x44f)]();const _0x15e38c=$dataSystem[_0x251bc0(0x197)][_0x251bc0(0x4ba)],_0x9126bb=this['commandWindowRect']();this[_0x251bc0(0x69b)]=new Window_TitleCommand(_0x9126bb),this['_commandWindow'][_0x251bc0(0x650)](_0x15e38c);const _0x4e0081=this[_0x251bc0(0x486)]();this['_commandWindow'][_0x251bc0(0x75c)](_0x4e0081['x'],_0x4e0081['y'],_0x4e0081['width'],_0x4e0081[_0x251bc0(0x8af)]),this['_commandWindow'][_0x251bc0(0x7f3)](),this['_commandWindow'][_0x251bc0(0x34c)](),this['_commandWindow'][_0x251bc0(0x25c)](),this[_0x251bc0(0x833)](this[_0x251bc0(0x69b)]);},Scene_Title[_0x5d7dff(0x4fa)]['commandWindowRows']=function(){const _0x3af3dc=_0x5d7dff;return this['_commandWindow']?this['_commandWindow'][_0x3af3dc(0x320)]():VisuMZ[_0x3af3dc(0x7ac)][_0x3af3dc(0x37c)][_0x3af3dc(0x639)][_0x3af3dc(0xfd)];},Scene_Title[_0x5d7dff(0x4fa)][_0x5d7dff(0x486)]=function(){const _0x17360a=_0x5d7dff;return VisuMZ[_0x17360a(0x7ac)]['Settings'][_0x17360a(0x56c)][_0x17360a(0xea)][_0x17360a(0x87b)][_0x17360a(0x5d5)](this);},Scene_Title[_0x5d7dff(0x4fa)][_0x5d7dff(0x44f)]=function(){const _0x975a28=_0x5d7dff;for(const _0x527a14 of Scene_Title[_0x975a28(0x23f)]){const _0x1cfa81=new Sprite_TitlePictureButton(_0x527a14);this['addChild'](_0x1cfa81);}},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x61f)]=Scene_Map[_0x5d7dff(0x4fa)]['initialize'],Scene_Map['prototype']['initialize']=function(){const _0x1ae2e7=_0x5d7dff;VisuMZ[_0x1ae2e7(0x7ac)][_0x1ae2e7(0x61f)][_0x1ae2e7(0x5d5)](this),$gameTemp[_0x1ae2e7(0x8a7)](),this[_0x1ae2e7(0x725)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x669)]=Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x7e8)],Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x7e8)]=function(){const _0xfed7ad=_0x5d7dff;VisuMZ[_0xfed7ad(0x7ac)]['Scene_Map_updateMainMultiply'][_0xfed7ad(0x5d5)](this),$gameTemp[_0xfed7ad(0x45f)]&&!$gameMessage['isBusy']()&&(this[_0xfed7ad(0x1d3)](),SceneManager['updateEffekseer']());},Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x7f2)]=function(){const _0x11cee1=_0x5d7dff;Scene_Message['prototype']['terminate']['call'](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x11cee1(0x1cb)]['update'](),this[_0x11cee1(0x6f8)][_0x11cee1(0x24e)](),this['_windowLayer'][_0x11cee1(0x267)]=![],SceneManager[_0x11cee1(0x221)]()),$gameScreen['clearZoom'](),this[_0x11cee1(0x725)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x68a)]=Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x50e)],Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x50e)]=function(){const _0x386adb=_0x5d7dff;VisuMZ['CoreEngine'][_0x386adb(0x68a)]['call'](this),SceneManager[_0x386adb(0x1cf)]()&&this[_0x386adb(0x72d)]();},Scene_Map[_0x5d7dff(0x4fa)]['moveMenuButtonSideButtonLayout']=function(){const _0x3698d9=_0x5d7dff;this[_0x3698d9(0x23b)]['x']=Graphics[_0x3698d9(0x312)]+0x4;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x642)]=Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x569)],Scene_Map['prototype'][_0x5d7dff(0x569)]=function(){const _0xf417a3=_0x5d7dff;VisuMZ['CoreEngine'][_0xf417a3(0x642)]['call'](this),this[_0xf417a3(0x253)]();},Scene_Map['prototype'][_0x5d7dff(0x253)]=function(){const _0x584497=_0x5d7dff;Input[_0x584497(0x7c8)](_0x584497(0x18f))&&(ConfigManager[_0x584497(0xdc)]=!ConfigManager[_0x584497(0xdc)],ConfigManager['save']());},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x405)]=Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x1d3)],Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x1d3)]=function(){const _0x1790fb=_0x5d7dff;VisuMZ[_0x1790fb(0x7ac)][_0x1790fb(0x405)][_0x1790fb(0x5d5)](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x725)]=function(){this['_onceParallelInterpreters']=[];},Scene_Map['prototype'][_0x5d7dff(0x763)]=function(){const _0x35fec2=_0x5d7dff;if(!this[_0x35fec2(0x26e)])return;for(const _0x269f06 of this[_0x35fec2(0x26e)]){_0x269f06&&_0x269f06['update']();}},Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x5cf)]=function(_0xb010b3,_0x384a21){const _0x51c7ea=_0x5d7dff,_0x480ff8=$dataCommonEvents[_0xb010b3];if(!_0x480ff8)return;const _0xe236ed=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0xe236ed),_0xe236ed[_0x51c7ea(0x813)](_0xb010b3),_0xe236ed[_0x51c7ea(0xcb)](_0x384a21);},Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x4ee)]=function(_0x429021){const _0x54f9bd=_0x5d7dff;this[_0x54f9bd(0x26e)]=this[_0x54f9bd(0x26e)]||[],this[_0x54f9bd(0x26e)]['push'](_0x429021);},Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x2aa)]=function(_0x46a97e){const _0x5c6b6b=_0x5d7dff;this['_onceParallelInterpreters']=this['_onceParallelInterpreters']||[],this[_0x5c6b6b(0x26e)][_0x5c6b6b(0x663)](_0x46a97e);};function Game_OnceParallelInterpreter(){const _0x1861a3=_0x5d7dff;this[_0x1861a3(0x186)](...arguments);}Game_OnceParallelInterpreter['prototype']=Object[_0x5d7dff(0x208)](Game_Interpreter[_0x5d7dff(0x4fa)]),Game_OnceParallelInterpreter['prototype']['constructor']=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x813)]=function(_0x1196ca){const _0x5bcefe=_0x5d7dff,_0x55147d=$dataCommonEvents[_0x1196ca];_0x55147d?this[_0x5bcefe(0x733)](_0x55147d['list'],0x0):this[_0x5bcefe(0x7f2)]();},Game_OnceParallelInterpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0xcb)]=function(_0x3d215c){const _0x1a3312=_0x5d7dff;this[_0x1a3312(0x7a0)]=_0x3d215c||0x0;},Game_OnceParallelInterpreter['prototype'][_0x5d7dff(0x7f2)]=function(){const _0x2af1c5=_0x5d7dff;if(!SceneManager['isSceneMap']())return;SceneManager['_scene'][_0x2af1c5(0x2aa)](this),Game_Interpreter[_0x2af1c5(0x4fa)]['terminate'][_0x2af1c5(0x5d5)](this);},VisuMZ['CoreEngine'][_0x5d7dff(0x649)]=Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x83b)],Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x83b)]=function(){const _0x2a5d39=_0x5d7dff;let _0x21b03d=0x0;return SceneManager[_0x2a5d39(0x667)]()?_0x21b03d=this[_0x2a5d39(0x55b)]():_0x21b03d=VisuMZ[_0x2a5d39(0x7ac)][_0x2a5d39(0x649)]['call'](this),_0x21b03d;},Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x55b)]=function(){const _0x5822ec=_0x5d7dff;return this[_0x5822ec(0x5ee)]()?this[_0x5822ec(0x5b3)]():0x0;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x431)]=Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0xd3)],Scene_MenuBase[_0x5d7dff(0x4fa)]['mainAreaTop']=function(){const _0x941923=_0x5d7dff;return SceneManager[_0x941923(0x667)]()?this['mainAreaTopSideButtonLayout']():VisuMZ[_0x941923(0x7ac)][_0x941923(0x431)][_0x941923(0x5d5)](this);},Scene_MenuBase['prototype'][_0x5d7dff(0x48e)]=function(){const _0x503720=_0x5d7dff;if(!this[_0x503720(0x5ee)]())return this[_0x503720(0x181)]();else return this['isMenuButtonAssistEnabled']()&&this[_0x503720(0x6cc)]()===_0x503720(0x401)?Window_ButtonAssist[_0x503720(0x4fa)][_0x503720(0x4bf)]():0x0;},VisuMZ[_0x5d7dff(0x7ac)]['Scene_MenuBase_mainAreaHeight']=Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x533)],Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x533)]=function(){const _0x5cb0ae=_0x5d7dff;let _0x296f66=0x0;return SceneManager[_0x5cb0ae(0x667)]()?_0x296f66=this[_0x5cb0ae(0x78c)]():_0x296f66=VisuMZ[_0x5cb0ae(0x7ac)]['Scene_MenuBase_mainAreaHeight'][_0x5cb0ae(0x5d5)](this),this[_0x5cb0ae(0x2ec)]()&&this[_0x5cb0ae(0x6cc)]()!==_0x5cb0ae(0xef)&&(_0x296f66-=Window_ButtonAssist['prototype']['lineHeight']()),_0x296f66;},Scene_MenuBase['prototype']['mainAreaHeightSideButtonLayout']=function(){const _0x2467d2=_0x5d7dff;return Graphics[_0x2467d2(0x1a2)]-this['helpAreaHeight']();},VisuMZ[_0x5d7dff(0x7ac)]['Scene_MenuBase_createBackground']=Scene_MenuBase['prototype']['createBackground'],Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x111)]=function(){const _0x2bd411=_0x5d7dff,_0x584967=VisuMZ['CoreEngine'][_0x2bd411(0x37c)][_0x2bd411(0x5af)][_0x2bd411(0x524)]??0x8;this[_0x2bd411(0x568)]=new PIXI[(_0x2bd411(0x12b))][(_0x2bd411(0x7b1))](_0x584967),this[_0x2bd411(0x7ca)]=new Sprite(),this[_0x2bd411(0x7ca)][_0x2bd411(0x78d)]=SceneManager['backgroundBitmap'](),this[_0x2bd411(0x7ca)][_0x2bd411(0x12b)]=[this[_0x2bd411(0x568)]],this[_0x2bd411(0x6e6)](this['_backgroundSprite']),this[_0x2bd411(0xf0)](0xc0),this[_0x2bd411(0xf0)](this[_0x2bd411(0x781)]()),this[_0x2bd411(0x467)]();},Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x781)]=function(){const _0x2f5d50=_0x5d7dff,_0x3ce6b0=String(this[_0x2f5d50(0x793)][_0x2f5d50(0x814)]),_0x2cebaf=this[_0x2f5d50(0x7aa)](_0x3ce6b0);return _0x2cebaf?_0x2cebaf[_0x2f5d50(0x7f0)]:0xc0;},Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x467)]=function(){const _0xe5e8ba=_0x5d7dff,_0x44f33c=String(this[_0xe5e8ba(0x793)][_0xe5e8ba(0x814)]),_0x528f93=this[_0xe5e8ba(0x7aa)](_0x44f33c);_0x528f93&&(_0x528f93[_0xe5e8ba(0x37e)]!==''||_0x528f93[_0xe5e8ba(0x3d3)]!=='')&&(this[_0xe5e8ba(0x70b)]=new Sprite(ImageManager[_0xe5e8ba(0x895)](_0x528f93[_0xe5e8ba(0x37e)])),this['_backSprite2']=new Sprite(ImageManager[_0xe5e8ba(0x276)](_0x528f93['BgFilename2'])),this['addChild'](this[_0xe5e8ba(0x70b)]),this[_0xe5e8ba(0x6e6)](this['_backSprite2']),this[_0xe5e8ba(0x70b)][_0xe5e8ba(0x78d)]['addLoadListener'](this[_0xe5e8ba(0x54b)][_0xe5e8ba(0x134)](this,this['_backSprite1'])),this[_0xe5e8ba(0x511)][_0xe5e8ba(0x78d)][_0xe5e8ba(0x81d)](this[_0xe5e8ba(0x54b)][_0xe5e8ba(0x134)](this,this[_0xe5e8ba(0x511)])));},Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x7aa)]=function(_0x2c6234){const _0x20d4d5=_0x5d7dff;return VisuMZ[_0x20d4d5(0x7ac)][_0x20d4d5(0x37c)][_0x20d4d5(0x5af)][_0x2c6234]||VisuMZ[_0x20d4d5(0x7ac)][_0x20d4d5(0x37c)][_0x20d4d5(0x5af)][_0x20d4d5(0x4cb)];},Scene_MenuBase[_0x5d7dff(0x4fa)]['adjustSprite']=function(_0x5dcc17){const _0x244bb5=_0x5d7dff;this[_0x244bb5(0x581)](_0x5dcc17),this[_0x244bb5(0x75e)](_0x5dcc17);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x390)]=Scene_MenuBase[_0x5d7dff(0x4fa)]['createCancelButton'],Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x170)]=function(){const _0x1bd52a=_0x5d7dff;VisuMZ['CoreEngine'][_0x1bd52a(0x390)][_0x1bd52a(0x5d5)](this),SceneManager['isSideButtonLayout']()&&this['moveCancelButtonSideButtonLayout']();},Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x2f7)]=function(){const _0x8890df=_0x5d7dff;this[_0x8890df(0x8b2)]['x']=Graphics[_0x8890df(0x312)]+0x4;},VisuMZ[_0x5d7dff(0x7ac)]['Scene_MenuBase_createPageButtons']=Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x331)],Scene_MenuBase['prototype'][_0x5d7dff(0x331)]=function(){const _0x3fe0e4=_0x5d7dff;VisuMZ[_0x3fe0e4(0x7ac)][_0x3fe0e4(0x41d)][_0x3fe0e4(0x5d5)](this),SceneManager[_0x3fe0e4(0x1cf)]()&&this['movePageButtonSideButtonLayout']();},Scene_MenuBase[_0x5d7dff(0x4fa)]['movePageButtonSideButtonLayout']=function(){const _0x1041f8=_0x5d7dff;this[_0x1041f8(0x60d)]['x']=-0x1*(this['_pageupButton'][_0x1041f8(0x47e)]+this['_pagedownButton'][_0x1041f8(0x47e)]+0x8),this[_0x1041f8(0x109)]['x']=-0x1*(this[_0x1041f8(0x109)]['width']+0x4);},Scene_MenuBase[_0x5d7dff(0x4fa)]['isMenuButtonAssistEnabled']=function(){const _0xfb8f84=_0x5d7dff;return VisuMZ[_0xfb8f84(0x7ac)][_0xfb8f84(0x37c)][_0xfb8f84(0x4f6)][_0xfb8f84(0x6d1)];},Scene_MenuBase[_0x5d7dff(0x4fa)]['getButtonAssistLocation']=function(){const _0x29c94f=_0x5d7dff;return SceneManager[_0x29c94f(0x1cf)]()||SceneManager[_0x29c94f(0x591)]()?VisuMZ[_0x29c94f(0x7ac)]['Settings'][_0x29c94f(0x4f6)][_0x29c94f(0x310)]:_0x29c94f(0xef);},Scene_MenuBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x47a)]=function(){const _0x1a6069=_0x5d7dff;if(!this['isMenuButtonAssistEnabled']())return;const _0x6c06a1=this[_0x1a6069(0x804)]();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x6c06a1),this[_0x1a6069(0x833)](this[_0x1a6069(0x1eb)]);},Scene_MenuBase['prototype'][_0x5d7dff(0x804)]=function(){const _0x2c5793=_0x5d7dff;return this['getButtonAssistLocation']()===_0x2c5793(0xef)?this['buttonAssistWindowButtonRect']():this[_0x2c5793(0x288)]();},Scene_MenuBase['prototype'][_0x5d7dff(0x482)]=function(){const _0x392123=_0x5d7dff,_0x506d95=ConfigManager[_0x392123(0x817)]?(Sprite_Button[_0x392123(0x4fa)][_0x392123(0x8a1)]()+0x6)*0x2:0x0,_0x10d991=this[_0x392123(0x122)](),_0x32d519=Graphics[_0x392123(0x312)]-_0x506d95*0x2,_0xb6b456=this[_0x392123(0x852)]();return new Rectangle(_0x506d95,_0x10d991,_0x32d519,_0xb6b456);},Scene_MenuBase['prototype'][_0x5d7dff(0x288)]=function(){const _0x211f79=_0x5d7dff,_0x522c58=Graphics['boxWidth'],_0x4df50f=Window_ButtonAssist[_0x211f79(0x4fa)]['lineHeight'](),_0x48ec23=0x0;let _0x198565=0x0;return this[_0x211f79(0x6cc)]()===_0x211f79(0x401)?_0x198565=0x0:_0x198565=Graphics['boxHeight']-_0x4df50f,new Rectangle(_0x48ec23,_0x198565,_0x522c58,_0x4df50f);},Scene_Menu[_0x5d7dff(0x6c0)]=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)]['MenuLayout'][_0x5d7dff(0x5c5)],VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x84c)]=Scene_Menu[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)],Scene_Menu['prototype']['create']=function(){const _0x28c50d=_0x5d7dff;VisuMZ[_0x28c50d(0x7ac)][_0x28c50d(0x84c)][_0x28c50d(0x5d5)](this),this[_0x28c50d(0x7d7)]();},Scene_Menu[_0x5d7dff(0x4fa)]['setCoreEngineUpdateWindowBg']=function(){const _0x11c426=_0x5d7dff;this[_0x11c426(0x69b)]&&this[_0x11c426(0x69b)][_0x11c426(0x650)](Scene_Menu['layoutSettings'][_0x11c426(0x3d1)]),this['_goldWindow']&&this[_0x11c426(0x19a)][_0x11c426(0x650)](Scene_Menu['layoutSettings']['GoldBgType']),this[_0x11c426(0x2ca)]&&this[_0x11c426(0x2ca)][_0x11c426(0x650)](Scene_Menu[_0x11c426(0x6c0)][_0x11c426(0x4e4)]);},Scene_Menu['prototype'][_0x5d7dff(0x486)]=function(){const _0x1b9aa1=_0x5d7dff;return Scene_Menu[_0x1b9aa1(0x6c0)][_0x1b9aa1(0x87b)][_0x1b9aa1(0x5d5)](this);},Scene_Menu[_0x5d7dff(0x4fa)][_0x5d7dff(0x7a8)]=function(){const _0x2c08b3=_0x5d7dff;return Scene_Menu['layoutSettings'][_0x2c08b3(0x5a2)][_0x2c08b3(0x5d5)](this);},Scene_Menu['prototype'][_0x5d7dff(0x79e)]=function(){const _0x528155=_0x5d7dff;return Scene_Menu[_0x528155(0x6c0)][_0x528155(0x15d)][_0x528155(0x5d5)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x56c)][_0x5d7dff(0x30c)],VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x81c)]=Scene_Item['prototype']['create'],Scene_Item[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)]=function(){const _0x2700e3=_0x5d7dff;VisuMZ[_0x2700e3(0x7ac)][_0x2700e3(0x81c)][_0x2700e3(0x5d5)](this),this[_0x2700e3(0x7d7)]();},Scene_Item[_0x5d7dff(0x4fa)][_0x5d7dff(0x7d7)]=function(){const _0x43ff1b=_0x5d7dff;this['_helpWindow']&&this[_0x43ff1b(0x3ee)]['setBackgroundType'](Scene_Item[_0x43ff1b(0x6c0)]['HelpBgType']),this['_categoryWindow']&&this[_0x43ff1b(0x640)][_0x43ff1b(0x650)](Scene_Item[_0x43ff1b(0x6c0)]['CategoryBgType']),this['_itemWindow']&&this['_itemWindow'][_0x43ff1b(0x650)](Scene_Item[_0x43ff1b(0x6c0)][_0x43ff1b(0x86b)]),this[_0x43ff1b(0x60a)]&&this[_0x43ff1b(0x60a)][_0x43ff1b(0x650)](Scene_Item[_0x43ff1b(0x6c0)][_0x43ff1b(0x770)]);},Scene_Item[_0x5d7dff(0x4fa)][_0x5d7dff(0x3f2)]=function(){const _0x436990=_0x5d7dff;return Scene_Item['layoutSettings'][_0x436990(0x33b)]['call'](this);},Scene_Item[_0x5d7dff(0x4fa)][_0x5d7dff(0x41a)]=function(){const _0x532ef6=_0x5d7dff;return Scene_Item[_0x532ef6(0x6c0)]['CategoryRect']['call'](this);},Scene_Item[_0x5d7dff(0x4fa)][_0x5d7dff(0x5cb)]=function(){const _0x5c0572=_0x5d7dff;return Scene_Item[_0x5c0572(0x6c0)]['ItemRect']['call'](this);},Scene_Item[_0x5d7dff(0x4fa)][_0x5d7dff(0x430)]=function(){const _0x46a16b=_0x5d7dff;return Scene_Item[_0x46a16b(0x6c0)][_0x46a16b(0x130)][_0x46a16b(0x5d5)](this);},Scene_Skill[_0x5d7dff(0x6c0)]=VisuMZ[_0x5d7dff(0x7ac)]['Settings']['MenuLayout'][_0x5d7dff(0xd8)],VisuMZ['CoreEngine'][_0x5d7dff(0x230)]=Scene_Skill[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)],Scene_Skill[_0x5d7dff(0x4fa)]['create']=function(){const _0x181508=_0x5d7dff;VisuMZ[_0x181508(0x7ac)][_0x181508(0x230)]['call'](this),this[_0x181508(0x7d7)]();},Scene_Skill[_0x5d7dff(0x4fa)]['setCoreEngineUpdateWindowBg']=function(){const _0x591e43=_0x5d7dff;this[_0x591e43(0x3ee)]&&this[_0x591e43(0x3ee)]['setBackgroundType'](Scene_Skill[_0x591e43(0x6c0)][_0x591e43(0x184)]),this[_0x591e43(0x828)]&&this[_0x591e43(0x828)][_0x591e43(0x650)](Scene_Skill[_0x591e43(0x6c0)]['SkillTypeBgType']),this['_statusWindow']&&this['_statusWindow'][_0x591e43(0x650)](Scene_Skill['layoutSettings'][_0x591e43(0x4e4)]),this[_0x591e43(0x492)]&&this[_0x591e43(0x492)][_0x591e43(0x650)](Scene_Skill['layoutSettings'][_0x591e43(0x86b)]),this[_0x591e43(0x60a)]&&this['_actorWindow'][_0x591e43(0x650)](Scene_Skill['layoutSettings'][_0x591e43(0x770)]);},Scene_Skill[_0x5d7dff(0x4fa)][_0x5d7dff(0x3f2)]=function(){const _0xea046f=_0x5d7dff;return Scene_Skill[_0xea046f(0x6c0)]['HelpRect'][_0xea046f(0x5d5)](this);},Scene_Skill['prototype']['skillTypeWindowRect']=function(){const _0x32fb3a=_0x5d7dff;return Scene_Skill[_0x32fb3a(0x6c0)][_0x32fb3a(0x5cc)][_0x32fb3a(0x5d5)](this);},Scene_Skill[_0x5d7dff(0x4fa)]['statusWindowRect']=function(){const _0x293bea=_0x5d7dff;return Scene_Skill[_0x293bea(0x6c0)][_0x293bea(0x15d)][_0x293bea(0x5d5)](this);},Scene_Skill[_0x5d7dff(0x4fa)][_0x5d7dff(0x5cb)]=function(){const _0x1af613=_0x5d7dff;return Scene_Skill[_0x1af613(0x6c0)][_0x1af613(0x2a9)][_0x1af613(0x5d5)](this);},Scene_Skill[_0x5d7dff(0x4fa)][_0x5d7dff(0x430)]=function(){const _0x4a5b21=_0x5d7dff;return Scene_Skill[_0x4a5b21(0x6c0)][_0x4a5b21(0x130)][_0x4a5b21(0x5d5)](this);},Scene_Equip[_0x5d7dff(0x6c0)]=VisuMZ['CoreEngine'][_0x5d7dff(0x37c)]['MenuLayout'][_0x5d7dff(0x44d)],VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x74b)]=Scene_Equip[_0x5d7dff(0x4fa)]['create'],Scene_Equip['prototype'][_0x5d7dff(0x208)]=function(){const _0x50609d=_0x5d7dff;VisuMZ[_0x50609d(0x7ac)][_0x50609d(0x74b)][_0x50609d(0x5d5)](this),this[_0x50609d(0x7d7)]();},Scene_Equip[_0x5d7dff(0x4fa)][_0x5d7dff(0x7d7)]=function(){const _0x2399bb=_0x5d7dff;this['_helpWindow']&&this[_0x2399bb(0x3ee)][_0x2399bb(0x650)](Scene_Equip[_0x2399bb(0x6c0)]['HelpBgType']),this['_statusWindow']&&this[_0x2399bb(0x2ca)][_0x2399bb(0x650)](Scene_Equip['layoutSettings']['StatusBgType']),this[_0x2399bb(0x69b)]&&this[_0x2399bb(0x69b)][_0x2399bb(0x650)](Scene_Equip[_0x2399bb(0x6c0)][_0x2399bb(0x3d1)]),this[_0x2399bb(0x634)]&&this[_0x2399bb(0x634)][_0x2399bb(0x650)](Scene_Equip['layoutSettings'][_0x2399bb(0x132)]),this[_0x2399bb(0x492)]&&this['_itemWindow']['setBackgroundType'](Scene_Equip[_0x2399bb(0x6c0)][_0x2399bb(0x86b)]);},Scene_Equip[_0x5d7dff(0x4fa)][_0x5d7dff(0x3f2)]=function(){const _0x594f19=_0x5d7dff;return Scene_Equip[_0x594f19(0x6c0)]['HelpRect'][_0x594f19(0x5d5)](this);},Scene_Equip[_0x5d7dff(0x4fa)][_0x5d7dff(0x79e)]=function(){const _0x123ebb=_0x5d7dff;return Scene_Equip[_0x123ebb(0x6c0)][_0x123ebb(0x15d)][_0x123ebb(0x5d5)](this);},Scene_Equip[_0x5d7dff(0x4fa)][_0x5d7dff(0x486)]=function(){const _0x56edbe=_0x5d7dff;return Scene_Equip[_0x56edbe(0x6c0)]['CommandRect'][_0x56edbe(0x5d5)](this);},Scene_Equip['prototype']['slotWindowRect']=function(){const _0x470e2d=_0x5d7dff;return Scene_Equip[_0x470e2d(0x6c0)][_0x470e2d(0x841)]['call'](this);},Scene_Equip['prototype'][_0x5d7dff(0x5cb)]=function(){const _0x9dcbe9=_0x5d7dff;return Scene_Equip[_0x9dcbe9(0x6c0)][_0x9dcbe9(0x2a9)]['call'](this);},Scene_Status['layoutSettings']=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x56c)][_0x5d7dff(0x2c4)],VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x2bb)]=Scene_Status['prototype']['create'],Scene_Status[_0x5d7dff(0x4fa)]['create']=function(){const _0x4c2e84=_0x5d7dff;VisuMZ['CoreEngine']['Scene_Status_create'][_0x4c2e84(0x5d5)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Status[_0x5d7dff(0x4fa)][_0x5d7dff(0x7d7)]=function(){const _0x48d246=_0x5d7dff;this['_profileWindow']&&this[_0x48d246(0x52b)][_0x48d246(0x650)](Scene_Status['layoutSettings'][_0x48d246(0x136)]),this[_0x48d246(0x2ca)]&&this['_statusWindow'][_0x48d246(0x650)](Scene_Status['layoutSettings']['StatusBgType']),this[_0x48d246(0x3cd)]&&this[_0x48d246(0x3cd)]['setBackgroundType'](Scene_Status[_0x48d246(0x6c0)]['StatusParamsBgType']),this[_0x48d246(0x364)]&&this['_statusEquipWindow'][_0x48d246(0x650)](Scene_Status[_0x48d246(0x6c0)][_0x48d246(0x4ae)]);},Scene_Status['prototype'][_0x5d7dff(0x6aa)]=function(){const _0x44a26e=_0x5d7dff;return Scene_Status['layoutSettings']['ProfileRect'][_0x44a26e(0x5d5)](this);},Scene_Status['prototype'][_0x5d7dff(0x79e)]=function(){const _0x1c5edf=_0x5d7dff;return Scene_Status['layoutSettings'][_0x1c5edf(0x15d)][_0x1c5edf(0x5d5)](this);},Scene_Status[_0x5d7dff(0x4fa)][_0x5d7dff(0x811)]=function(){const _0x5a2b27=_0x5d7dff;return Scene_Status['layoutSettings'][_0x5a2b27(0x223)][_0x5a2b27(0x5d5)](this);},Scene_Status[_0x5d7dff(0x4fa)][_0x5d7dff(0x464)]=function(){const _0x2a8178=_0x5d7dff;return Scene_Status['layoutSettings']['StatusEquipRect'][_0x2a8178(0x5d5)](this);},Scene_Options[_0x5d7dff(0x6c0)]=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)]['MenuLayout'][_0x5d7dff(0x7e0)],VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x24b)]=Scene_Options[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)],Scene_Options[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)]=function(){const _0x1b181b=_0x5d7dff;VisuMZ[_0x1b181b(0x7ac)][_0x1b181b(0x24b)][_0x1b181b(0x5d5)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x37ba34=_0x5d7dff;this[_0x37ba34(0x851)]&&this[_0x37ba34(0x851)][_0x37ba34(0x650)](Scene_Options[_0x37ba34(0x6c0)]['OptionsBgType']);},Scene_Options[_0x5d7dff(0x4fa)][_0x5d7dff(0x8ce)]=function(){const _0x2b55b2=_0x5d7dff;return Scene_Options[_0x2b55b2(0x6c0)][_0x2b55b2(0x233)]['call'](this);},Scene_Save[_0x5d7dff(0x6c0)]=VisuMZ[_0x5d7dff(0x7ac)]['Settings'][_0x5d7dff(0x56c)]['SaveMenu'],Scene_Save[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)]=function(){const _0x54b5fe=_0x5d7dff;Scene_File['prototype']['create'][_0x54b5fe(0x5d5)](this),this[_0x54b5fe(0x7d7)]();},Scene_Save[_0x5d7dff(0x4fa)][_0x5d7dff(0x7d7)]=function(){const _0x4a9b25=_0x5d7dff;this[_0x4a9b25(0x3ee)]&&this['_helpWindow'][_0x4a9b25(0x650)](Scene_Save['layoutSettings'][_0x4a9b25(0x184)]),this['_listWindow']&&this[_0x4a9b25(0x159)][_0x4a9b25(0x650)](Scene_Save['layoutSettings'][_0x4a9b25(0x58b)]);},Scene_Save[_0x5d7dff(0x4fa)][_0x5d7dff(0x3f2)]=function(){const _0x3b0b61=_0x5d7dff;return Scene_Save['layoutSettings'][_0x3b0b61(0x33b)]['call'](this);},Scene_Save[_0x5d7dff(0x4fa)][_0x5d7dff(0x397)]=function(){const _0x105135=_0x5d7dff;return Scene_Save[_0x105135(0x6c0)][_0x105135(0x88f)]['call'](this);},Scene_Load['layoutSettings']=VisuMZ[_0x5d7dff(0x7ac)]['Settings'][_0x5d7dff(0x56c)][_0x5d7dff(0x797)],Scene_Load[_0x5d7dff(0x4fa)]['create']=function(){const _0x13932b=_0x5d7dff;Scene_File[_0x13932b(0x4fa)][_0x13932b(0x208)]['call'](this),this[_0x13932b(0x7d7)]();},Scene_Load[_0x5d7dff(0x4fa)]['setCoreEngineUpdateWindowBg']=function(){const _0x48d910=_0x5d7dff;this[_0x48d910(0x3ee)]&&this[_0x48d910(0x3ee)]['setBackgroundType'](Scene_Load[_0x48d910(0x6c0)]['HelpBgType']),this[_0x48d910(0x159)]&&this[_0x48d910(0x159)][_0x48d910(0x650)](Scene_Load[_0x48d910(0x6c0)][_0x48d910(0x58b)]);},Scene_Load['prototype'][_0x5d7dff(0x3f2)]=function(){const _0x6ea2ce=_0x5d7dff;return Scene_Load['layoutSettings'][_0x6ea2ce(0x33b)][_0x6ea2ce(0x5d5)](this);},Scene_Load[_0x5d7dff(0x4fa)]['listWindowRect']=function(){const _0x2c1353=_0x5d7dff;return Scene_Load[_0x2c1353(0x6c0)][_0x2c1353(0x88f)][_0x2c1353(0x5d5)](this);};function Scene_QuickLoad(){const _0x451b16=_0x5d7dff;this[_0x451b16(0x186)](...arguments);}Scene_QuickLoad[_0x5d7dff(0x4fa)]=Object['create'](Scene_Load[_0x5d7dff(0x4fa)]),Scene_QuickLoad[_0x5d7dff(0x4fa)][_0x5d7dff(0x793)]=Scene_QuickLoad,Scene_QuickLoad[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)]=function(){const _0x2862ad=_0x5d7dff;Scene_Load['prototype'][_0x2862ad(0x186)][_0x2862ad(0x5d5)](this);},Scene_QuickLoad[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)]=function(){const _0x15a75f=_0x5d7dff;this[_0x15a75f(0x302)](this['_saveFileID']);},Scene_QuickLoad[_0x5d7dff(0x4fa)][_0x5d7dff(0x681)]=function(_0x372f64){const _0x48a64b=_0x5d7dff;this[_0x48a64b(0x819)]=_0x372f64;},Scene_QuickLoad[_0x5d7dff(0x4fa)][_0x5d7dff(0x2b0)]=function(){const _0x124d33=_0x5d7dff;Scene_MenuBase[_0x124d33(0x4fa)]['start'][_0x124d33(0x5d5)](this);},Scene_GameEnd['layoutSettings']=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x56c)][_0x5d7dff(0x862)],VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1af)]=Scene_GameEnd[_0x5d7dff(0x4fa)][_0x5d7dff(0x111)],Scene_GameEnd['prototype'][_0x5d7dff(0x111)]=function(){const _0x51b1c3=_0x5d7dff;Scene_MenuBase[_0x51b1c3(0x4fa)][_0x51b1c3(0x111)][_0x51b1c3(0x5d5)](this);},Scene_GameEnd[_0x5d7dff(0x4fa)][_0x5d7dff(0x2f8)]=function(){const _0x5a6129=_0x5d7dff,_0x30df77=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x30df77),this['_commandWindow'][_0x5a6129(0x198)](_0x5a6129(0x381),this[_0x5a6129(0x768)][_0x5a6129(0x134)](this)),this[_0x5a6129(0x833)](this[_0x5a6129(0x69b)]),this[_0x5a6129(0x69b)]['setBackgroundType'](Scene_GameEnd['layoutSettings']['CommandBgType']);},Scene_GameEnd[_0x5d7dff(0x4fa)]['commandWindowRect']=function(){const _0x1127e4=_0x5d7dff;return Scene_GameEnd[_0x1127e4(0x6c0)][_0x1127e4(0x87b)][_0x1127e4(0x5d5)](this);},Scene_Shop[_0x5d7dff(0x6c0)]=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x56c)][_0x5d7dff(0x8c8)],VisuMZ['CoreEngine']['Scene_Shop_create']=Scene_Shop[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)],Scene_Shop['prototype'][_0x5d7dff(0x208)]=function(){const _0x5d6f10=_0x5d7dff;VisuMZ['CoreEngine'][_0x5d6f10(0x1d4)][_0x5d6f10(0x5d5)](this),this[_0x5d6f10(0x7d7)]();},Scene_Shop['prototype'][_0x5d7dff(0x7d7)]=function(){const _0x4bdcc6=_0x5d7dff;this[_0x4bdcc6(0x3ee)]&&this[_0x4bdcc6(0x3ee)][_0x4bdcc6(0x650)](Scene_Shop[_0x4bdcc6(0x6c0)][_0x4bdcc6(0x184)]),this['_goldWindow']&&this['_goldWindow'][_0x4bdcc6(0x650)](Scene_Shop[_0x4bdcc6(0x6c0)][_0x4bdcc6(0x16d)]),this['_commandWindow']&&this[_0x4bdcc6(0x69b)][_0x4bdcc6(0x650)](Scene_Shop['layoutSettings'][_0x4bdcc6(0x3d1)]),this['_dummyWindow']&&this['_dummyWindow'][_0x4bdcc6(0x650)](Scene_Shop['layoutSettings'][_0x4bdcc6(0x216)]),this[_0x4bdcc6(0x6c7)]&&this[_0x4bdcc6(0x6c7)]['setBackgroundType'](Scene_Shop[_0x4bdcc6(0x6c0)]['NumberBgType']),this[_0x4bdcc6(0x2ca)]&&this[_0x4bdcc6(0x2ca)][_0x4bdcc6(0x650)](Scene_Shop[_0x4bdcc6(0x6c0)]['StatusBgType']),this[_0x4bdcc6(0x222)]&&this[_0x4bdcc6(0x222)][_0x4bdcc6(0x650)](Scene_Shop[_0x4bdcc6(0x6c0)]['BuyBgType']),this[_0x4bdcc6(0x640)]&&this[_0x4bdcc6(0x640)][_0x4bdcc6(0x650)](Scene_Shop[_0x4bdcc6(0x6c0)][_0x4bdcc6(0xe2)]),this[_0x4bdcc6(0xf1)]&&this[_0x4bdcc6(0xf1)][_0x4bdcc6(0x650)](Scene_Shop['layoutSettings']['SellBgType']);},Scene_Shop['prototype']['helpWindowRect']=function(){const _0x250808=_0x5d7dff;return Scene_Shop[_0x250808(0x6c0)][_0x250808(0x33b)]['call'](this);},Scene_Shop['prototype']['goldWindowRect']=function(){const _0x324289=_0x5d7dff;return Scene_Shop[_0x324289(0x6c0)][_0x324289(0x5a2)][_0x324289(0x5d5)](this);},Scene_Shop['prototype']['commandWindowRect']=function(){const _0x3c8327=_0x5d7dff;return Scene_Shop[_0x3c8327(0x6c0)][_0x3c8327(0x87b)][_0x3c8327(0x5d5)](this);},Scene_Shop[_0x5d7dff(0x4fa)][_0x5d7dff(0x142)]=function(){const _0xd3a40b=_0x5d7dff;return Scene_Shop[_0xd3a40b(0x6c0)][_0xd3a40b(0x33c)][_0xd3a40b(0x5d5)](this);},Scene_Shop[_0x5d7dff(0x4fa)][_0x5d7dff(0x20b)]=function(){const _0x107fa6=_0x5d7dff;return Scene_Shop['layoutSettings'][_0x107fa6(0x67d)][_0x107fa6(0x5d5)](this);},Scene_Shop[_0x5d7dff(0x4fa)][_0x5d7dff(0x79e)]=function(){const _0x1257c9=_0x5d7dff;return Scene_Shop[_0x1257c9(0x6c0)]['StatusRect'][_0x1257c9(0x5d5)](this);},Scene_Shop[_0x5d7dff(0x4fa)][_0x5d7dff(0x4e2)]=function(){const _0x12e5dc=_0x5d7dff;return Scene_Shop[_0x12e5dc(0x6c0)][_0x12e5dc(0x144)]['call'](this);},Scene_Shop[_0x5d7dff(0x4fa)]['categoryWindowRect']=function(){const _0x156808=_0x5d7dff;return Scene_Shop[_0x156808(0x6c0)][_0x156808(0x425)]['call'](this);},Scene_Shop['prototype'][_0x5d7dff(0x552)]=function(){const _0x5f1c71=_0x5d7dff;return Scene_Shop[_0x5f1c71(0x6c0)]['SellRect'][_0x5f1c71(0x5d5)](this);},Scene_Name[_0x5d7dff(0x6c0)]=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x56c)][_0x5d7dff(0x4f3)],VisuMZ[_0x5d7dff(0x7ac)]['Scene_Name_create']=Scene_Name['prototype'][_0x5d7dff(0x208)],Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x208)]=function(){const _0x157003=_0x5d7dff;VisuMZ[_0x157003(0x7ac)]['Scene_Name_create'][_0x157003(0x5d5)](this),this[_0x157003(0x7d7)]();},Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x7d7)]=function(){const _0x1c2db3=_0x5d7dff;this['_editWindow']&&this['_editWindow'][_0x1c2db3(0x650)](Scene_Name[_0x1c2db3(0x6c0)][_0x1c2db3(0x4a4)]),this['_inputWindow']&&this['_inputWindow'][_0x1c2db3(0x650)](Scene_Name[_0x1c2db3(0x6c0)][_0x1c2db3(0x7d5)]);},Scene_Name[_0x5d7dff(0x4fa)]['helpAreaHeight']=function(){return 0x0;},Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x874)]=function(){const _0x5717c7=_0x5d7dff;return Scene_Name[_0x5717c7(0x6c0)][_0x5717c7(0x78f)][_0x5717c7(0x5d5)](this);},Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x387)]=function(){const _0x312d7b=_0x5d7dff;return Scene_Name[_0x312d7b(0x6c0)][_0x312d7b(0x2e3)][_0x312d7b(0x5d5)](this);},Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x367)]=function(){const _0x49af22=_0x5d7dff;if(!this[_0x49af22(0x7a2)])return![];return VisuMZ['CoreEngine'][_0x49af22(0x37c)][_0x49af22(0x59a)]['EnableNameInput'];},Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x731)]=function(){const _0x4eda1c=_0x5d7dff;if(this[_0x4eda1c(0x367)]()&&this[_0x4eda1c(0x7a2)][_0x4eda1c(0x85b)]!==_0x4eda1c(0x82d))return TextManager[_0x4eda1c(0x18c)](_0x4eda1c(0x786),'pagedown');return Scene_MenuBase[_0x4eda1c(0x4fa)][_0x4eda1c(0x731)]['call'](this);},Scene_Name['prototype'][_0x5d7dff(0xdb)]=function(){const _0x21fac4=_0x5d7dff;return this[_0x21fac4(0x367)]()?TextManager['getInputButtonString'](_0x21fac4(0x7cb)):Scene_MenuBase[_0x21fac4(0x4fa)][_0x21fac4(0xdb)][_0x21fac4(0x5d5)](this);},Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x4d6)]=function(){const _0x4f05de=_0x5d7dff;if(this[_0x4f05de(0x367)]()&&this[_0x4f05de(0x7a2)][_0x4f05de(0x85b)]==='keyboard')return TextManager[_0x4f05de(0x587)]([_0x4f05de(0x723)]);return Scene_MenuBase[_0x4f05de(0x4fa)][_0x4f05de(0x4d6)][_0x4f05de(0x5d5)](this);},Scene_Name[_0x5d7dff(0x4fa)]['buttonAssistKey5']=function(){const _0x8f084d=_0x5d7dff;if(this['EnableNameInput']()&&this[_0x8f084d(0x7a2)][_0x8f084d(0x85b)]==='keyboard')return TextManager['makeInputButtonString']([_0x8f084d(0x202)]);return Scene_MenuBase['prototype']['buttonAssistKey5'][_0x8f084d(0x5d5)](this);},Scene_Name[_0x5d7dff(0x4fa)]['buttonAssistText1']=function(){const _0x29638c=_0x5d7dff;if(this['EnableNameInput']()&&this[_0x29638c(0x7a2)][_0x29638c(0x85b)]!=='keyboard'){const _0x303ffb=VisuMZ[_0x29638c(0x7ac)][_0x29638c(0x37c)][_0x29638c(0x59a)];return _0x303ffb['PageChange']||_0x29638c(0x2cb);}return Scene_MenuBase[_0x29638c(0x4fa)][_0x29638c(0xda)][_0x29638c(0x5d5)](this);},Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x45d)]=function(){const _0xc73bbd=_0x5d7dff;if(this[_0xc73bbd(0x367)]()){const _0x37325e=VisuMZ[_0xc73bbd(0x7ac)][_0xc73bbd(0x37c)][_0xc73bbd(0x59a)];return this[_0xc73bbd(0x7a2)][_0xc73bbd(0x85b)]===_0xc73bbd(0x82d)?_0x37325e[_0xc73bbd(0x36d)]||_0xc73bbd(0x36d):_0x37325e[_0xc73bbd(0x32f)]||_0xc73bbd(0x32f);}else return Scene_MenuBase['prototype']['buttonAssistText3'][_0xc73bbd(0x5d5)](this);},Scene_Name['prototype'][_0x5d7dff(0x729)]=function(){const _0x272a8d=_0x5d7dff;if(this['EnableNameInput']()){const _0x44b89c=VisuMZ['CoreEngine'][_0x272a8d(0x37c)][_0x272a8d(0x59a)];if(this[_0x272a8d(0x7a2)][_0x272a8d(0x85b)]===_0x272a8d(0x82d))return _0x44b89c['Finish']||'Finish';}return Scene_MenuBase['prototype']['buttonAssistText4'][_0x272a8d(0x5d5)](this);},VisuMZ['CoreEngine'][_0x5d7dff(0x1bd)]=Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x747)],Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x747)]=function(){const _0x55465c=_0x5d7dff;this[_0x55465c(0x260)]()?this[_0x55465c(0x844)]():VisuMZ['CoreEngine'][_0x55465c(0x1bd)][_0x55465c(0x5d5)](this);},Scene_Name['prototype'][_0x5d7dff(0x260)]=function(){const _0x5993d5=_0x5d7dff,_0x5a1bb2=VisuMZ[_0x5993d5(0x7ac)]['Settings'][_0x5993d5(0x59a)];if(!_0x5a1bb2)return![];const _0x288c10=_0x5a1bb2[_0x5993d5(0x7b5)];if(!_0x288c10)return![];const _0x14be6d=this['_editWindow'][_0x5993d5(0x814)]()[_0x5993d5(0x1e9)]();for(const _0x23361d of _0x288c10){if(_0x14be6d[_0x5993d5(0x617)](_0x23361d[_0x5993d5(0x1e9)]()))return!![];}return![];},Scene_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x844)]=function(){const _0x2ff8da=_0x5d7dff;SoundManager[_0x2ff8da(0x125)]();},VisuMZ[_0x5d7dff(0x7ac)]['Scene_Battle_update']=Scene_Battle['prototype']['update'],Scene_Battle[_0x5d7dff(0x4fa)][_0x5d7dff(0x75f)]=function(){const _0xf97015=_0x5d7dff;VisuMZ[_0xf97015(0x7ac)][_0xf97015(0x15f)][_0xf97015(0x5d5)](this);if($gameTemp[_0xf97015(0x45f)])this[_0xf97015(0x476)]();},Scene_Battle['prototype'][_0x5d7dff(0x476)]=function(){const _0x2b04db=_0x5d7dff;!BattleManager[_0x2b04db(0x4bd)]()&&!this[_0x2b04db(0x876)]&&!$gameMessage[_0x2b04db(0x62d)]()&&(this['_playtestF7Looping']=!![],this[_0x2b04db(0x75f)](),SceneManager[_0x2b04db(0x7ad)](),this[_0x2b04db(0x876)]=![]);},VisuMZ[_0x5d7dff(0x7ac)]['Scene_Battle_createCancelButton']=Scene_Battle[_0x5d7dff(0x4fa)][_0x5d7dff(0x170)],Scene_Battle['prototype']['createCancelButton']=function(){const _0x5dab9f=_0x5d7dff;VisuMZ[_0x5dab9f(0x7ac)][_0x5dab9f(0x3b3)]['call'](this),SceneManager[_0x5dab9f(0x1cf)]()&&this[_0x5dab9f(0x74d)]();},Scene_Battle[_0x5d7dff(0x4fa)][_0x5d7dff(0x74d)]=function(){const _0x5b5065=_0x5d7dff;this[_0x5b5065(0x8b2)]['x']=Graphics[_0x5b5065(0x312)]+0x4,this[_0x5b5065(0x248)]()?this[_0x5b5065(0x8b2)]['y']=Graphics[_0x5b5065(0x1a2)]-this['buttonAreaHeight']():this[_0x5b5065(0x8b2)]['y']=0x0;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1f5)]=Sprite_Button[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)],Sprite_Button[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)]=function(_0x1f22cc){const _0x4f785f=_0x5d7dff;VisuMZ[_0x4f785f(0x7ac)]['Sprite_Button_initialize'][_0x4f785f(0x5d5)](this,_0x1f22cc),this[_0x4f785f(0x79a)]();},Sprite_Button[_0x5d7dff(0x4fa)][_0x5d7dff(0x79a)]=function(){const _0x285493=_0x5d7dff,_0x207782=VisuMZ[_0x285493(0x7ac)][_0x285493(0x37c)]['UI'];this[_0x285493(0x3e5)]=![];switch(this['_buttonType']){case _0x285493(0x381):this[_0x285493(0x3e5)]=!_0x207782[_0x285493(0xc6)];break;case _0x285493(0x786):case _0x285493(0xe5):this[_0x285493(0x3e5)]=!_0x207782[_0x285493(0x4ac)];break;case _0x285493(0x3cc):case'up':case _0x285493(0x606):case'up2':case'ok':this[_0x285493(0x3e5)]=!_0x207782[_0x285493(0x446)];break;case _0x285493(0x277):this['_isButtonHidden']=!_0x207782['menuShowButton'];break;}},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x2d5)]=Sprite_Button[_0x5d7dff(0x4fa)][_0x5d7dff(0x357)],Sprite_Button[_0x5d7dff(0x4fa)][_0x5d7dff(0x357)]=function(){const _0x5da6b9=_0x5d7dff;SceneManager[_0x5da6b9(0x591)]()||this[_0x5da6b9(0x3e5)]?this[_0x5da6b9(0x4fd)]():VisuMZ[_0x5da6b9(0x7ac)]['Sprite_Button_updateOpacity'][_0x5da6b9(0x5d5)](this);},Sprite_Button[_0x5d7dff(0x4fa)]['hideButtonFromView']=function(){const _0xcc8482=_0x5d7dff;this['visible']=![],this['opacity']=0x0,this['x']=Graphics[_0xcc8482(0x47e)]*0xa,this['y']=Graphics[_0xcc8482(0x8af)]*0xa;},VisuMZ['CoreEngine'][_0x5d7dff(0x20a)]=Sprite_Battler[_0x5d7dff(0x4fa)][_0x5d7dff(0x748)],Sprite_Battler[_0x5d7dff(0x4fa)][_0x5d7dff(0x748)]=function(_0x29b5f5,_0x8ae921,_0x53b7a7){const _0x168dca=_0x5d7dff;(this['_targetOffsetX']!==_0x29b5f5||this[_0x168dca(0x6ad)]!==_0x8ae921)&&(this[_0x168dca(0x1d5)]('Linear'),this[_0x168dca(0x3b0)]=_0x53b7a7),VisuMZ[_0x168dca(0x7ac)][_0x168dca(0x20a)]['call'](this,_0x29b5f5,_0x8ae921,_0x53b7a7);},Sprite_Battler['prototype'][_0x5d7dff(0x1d5)]=function(_0x4546f8){const _0x405904=_0x5d7dff;this[_0x405904(0x60b)]=_0x4546f8;},Sprite_Battler['prototype'][_0x5d7dff(0x29a)]=function(){const _0x55000d=_0x5d7dff;if(this[_0x55000d(0x8a3)]<=0x0)return;const _0x2e761b=this[_0x55000d(0x8a3)],_0x4dbdd5=this[_0x55000d(0x3b0)],_0x32e7d=this[_0x55000d(0x60b)];this[_0x55000d(0x7de)]=this['applyEasing'](this[_0x55000d(0x7de)],this[_0x55000d(0x1b4)],_0x2e761b,_0x4dbdd5,_0x32e7d),this[_0x55000d(0x4e5)]=this[_0x55000d(0x75b)](this[_0x55000d(0x4e5)],this['_targetOffsetY'],_0x2e761b,_0x4dbdd5,_0x32e7d),this[_0x55000d(0x8a3)]--;if(this[_0x55000d(0x8a3)]<=0x0)this[_0x55000d(0x1e2)]();},Sprite_Battler[_0x5d7dff(0x4fa)]['applyEasing']=function(_0x4cac23,_0x1d59e9,_0x191baa,_0x3ad927,_0x4111be){const _0x567836=_0x5d7dff,_0x434a55=VisuMZ[_0x567836(0x2fd)]((_0x3ad927-_0x191baa)/_0x3ad927,_0x4111be||'Linear'),_0x43e338=VisuMZ[_0x567836(0x2fd)]((_0x3ad927-_0x191baa+0x1)/_0x3ad927,_0x4111be||_0x567836(0x521)),_0x55bf1d=(_0x4cac23-_0x1d59e9*_0x434a55)/(0x1-_0x434a55);return _0x55bf1d+(_0x1d59e9-_0x55bf1d)*_0x43e338;},VisuMZ[_0x5d7dff(0x7ac)]['Sprite_Actor_setActorHome']=Sprite_Actor['prototype']['setActorHome'],Sprite_Actor[_0x5d7dff(0x4fa)][_0x5d7dff(0x108)]=function(_0x1bd882){const _0x18c3d0=_0x5d7dff;VisuMZ[_0x18c3d0(0x7ac)][_0x18c3d0(0x37c)]['UI'][_0x18c3d0(0x3ac)]?this[_0x18c3d0(0x8c7)](_0x1bd882):VisuMZ['CoreEngine'][_0x18c3d0(0x4c5)][_0x18c3d0(0x5d5)](this,_0x1bd882);},Sprite_Actor[_0x5d7dff(0x4fa)]['setActorHomeRepositioned']=function(_0x5c7611){const _0x2cd9ce=_0x5d7dff;let _0x1e452f=Math['round'](Graphics['width']/0x2+0xc0);_0x1e452f-=Math[_0x2cd9ce(0x559)]((Graphics['width']-Graphics[_0x2cd9ce(0x312)])/0x2),_0x1e452f+=_0x5c7611*0x20;let _0x59dd3e=Graphics[_0x2cd9ce(0x8af)]-0xc8-$gameParty[_0x2cd9ce(0x67c)]()*0x30;_0x59dd3e-=Math['floor']((Graphics[_0x2cd9ce(0x8af)]-Graphics['boxHeight'])/0x2),_0x59dd3e+=_0x5c7611*0x30,this[_0x2cd9ce(0x182)](_0x1e452f,_0x59dd3e);},Sprite_Actor['prototype']['retreat']=function(){const _0xbf88e6=_0x5d7dff;this[_0xbf88e6(0x748)](0x4b0,0x0,0x78);},Sprite_Animation[_0x5d7dff(0x4fa)][_0x5d7dff(0x623)]=function(_0x4c0d40){const _0x23882e=_0x5d7dff;this[_0x23882e(0x28d)]=_0x4c0d40;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x598)]=Sprite_Animation['prototype'][_0x5d7dff(0x801)],Sprite_Animation[_0x5d7dff(0x4fa)][_0x5d7dff(0x801)]=function(){const _0x34011e=_0x5d7dff;if(this[_0x34011e(0x28d)])return;VisuMZ[_0x34011e(0x7ac)]['Sprite_Animation_processSoundTimings'][_0x34011e(0x5d5)](this);},VisuMZ[_0x5d7dff(0x7ac)]['Sprite_Animation_setViewport']=Sprite_Animation[_0x5d7dff(0x4fa)][_0x5d7dff(0x755)],Sprite_Animation[_0x5d7dff(0x4fa)]['setViewport']=function(_0x11b894){const _0x384a2b=_0x5d7dff;this[_0x384a2b(0x6a3)]()?this[_0x384a2b(0x519)](_0x11b894):VisuMZ[_0x384a2b(0x7ac)][_0x384a2b(0x5f5)][_0x384a2b(0x5d5)](this,_0x11b894);},Sprite_Animation['prototype'][_0x5d7dff(0x6a3)]=function(){const _0x20b3e9=_0x5d7dff;if(!this[_0x20b3e9(0x2ed)])return![];const _0x1dcd82=this[_0x20b3e9(0x2ed)][_0x20b3e9(0x814)]||'';if(_0x1dcd82[_0x20b3e9(0x371)](/<MIRROR OFFSET X>/i))return!![];if(_0x1dcd82[_0x20b3e9(0x371)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0x20b3e9(0x7ac)]['Settings']['QoL']['AnimationMirrorOffset'];},Sprite_Animation[_0x5d7dff(0x4fa)][_0x5d7dff(0x519)]=function(_0x2f911d){const _0x3cdafd=_0x5d7dff,_0x47e8c3=this[_0x3cdafd(0x16b)],_0xa63a29=this[_0x3cdafd(0x16b)],_0x508224=this[_0x3cdafd(0x2ed)][_0x3cdafd(0x7dd)]*(this[_0x3cdafd(0x3cf)]?-0x1:0x1)-_0x47e8c3/0x2,_0x1652f5=this[_0x3cdafd(0x2ed)][_0x3cdafd(0x86c)]-_0xa63a29/0x2,_0xbdf001=this[_0x3cdafd(0x27c)](_0x2f911d);_0x2f911d['gl']['viewport'](_0x508224+_0xbdf001['x'],_0x1652f5+_0xbdf001['y'],_0x47e8c3,_0xa63a29);},Sprite_Animation[_0x5d7dff(0x4fa)]['targetSpritePosition']=function(_0x2b83d9){const _0x21ea2f=_0x5d7dff;if(_0x2b83d9[_0x21ea2f(0x24c)]){}const _0x3ab788=this[_0x21ea2f(0x2ed)][_0x21ea2f(0x814)];let _0x214166=_0x2b83d9[_0x21ea2f(0x8af)]*_0x2b83d9[_0x21ea2f(0x1c7)]['y'],_0x3033dc=0x0,_0x68eb14=-_0x214166/0x2;if(_0x3ab788['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x68eb14=-_0x214166;if(_0x3ab788[_0x21ea2f(0x371)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x68eb14=0x0;if(this[_0x21ea2f(0x2ed)][_0x21ea2f(0x12d)])_0x68eb14=0x0;if(_0x3ab788[_0x21ea2f(0x371)](/<(?:LEFT)>/i))_0x3033dc=-_0x2b83d9[_0x21ea2f(0x47e)]/0x2;if(_0x3ab788[_0x21ea2f(0x371)](/<(?:RIGHT)>/i))_0x3033dc=_0x2b83d9['width']/0x2;_0x3ab788[_0x21ea2f(0x371)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x3033dc=Number(RegExp['$1'])*_0x2b83d9[_0x21ea2f(0x47e)]);_0x3ab788['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x68eb14=(0x1-Number(RegExp['$1']))*-_0x214166);_0x3ab788[_0x21ea2f(0x371)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x3033dc=Number(RegExp['$1'])*_0x2b83d9[_0x21ea2f(0x47e)],_0x68eb14=(0x1-Number(RegExp['$2']))*-_0x214166);if(_0x3ab788[_0x21ea2f(0x371)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x3033dc+=Number(RegExp['$1']);if(_0x3ab788[_0x21ea2f(0x371)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x68eb14+=Number(RegExp['$1']);_0x3ab788[_0x21ea2f(0x371)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x3033dc+=Number(RegExp['$1']),_0x68eb14+=Number(RegExp['$2']));const _0x2785d2=new Point(_0x3033dc,_0x68eb14);return _0x2b83d9[_0x21ea2f(0x7cc)](),_0x2b83d9['worldTransform'][_0x21ea2f(0x56d)](_0x2785d2);},Sprite_AnimationMV[_0x5d7dff(0x4fa)]['setupRate']=function(){const _0x1b2015=_0x5d7dff;this[_0x1b2015(0x686)]=VisuMZ['CoreEngine'][_0x1b2015(0x37c)]['QoL'][_0x1b2015(0x23a)]??0x4,this[_0x1b2015(0x225)](),this[_0x1b2015(0x686)]=this['_rate'][_0x1b2015(0x3aa)](0x1,0xa);},Sprite_AnimationMV[_0x5d7dff(0x4fa)][_0x5d7dff(0x225)]=function(){const _0x529795=_0x5d7dff;if(!this[_0x529795(0x2ed)]);const _0xae321a=this[_0x529795(0x2ed)][_0x529795(0x814)]||'';_0xae321a[_0x529795(0x371)](/<RATE:[ ](\d+)>/i)&&(this[_0x529795(0x686)]=(Number(RegExp['$1'])||0x1)['clamp'](0x1,0xa));},Sprite_AnimationMV[_0x5d7dff(0x4fa)]['setMute']=function(_0x28f79e){const _0x1d3dc7=_0x5d7dff;this[_0x1d3dc7(0x28d)]=_0x28f79e;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x64f)]=Sprite_AnimationMV[_0x5d7dff(0x4fa)]['processTimingData'],Sprite_AnimationMV[_0x5d7dff(0x4fa)]['processTimingData']=function(_0x419905){const _0x34dcca=_0x5d7dff;this[_0x34dcca(0x28d)]&&(_0x419905=JsonEx[_0x34dcca(0x69d)](_0x419905),_0x419905['se']&&(_0x419905['se']['volume']=0x0)),VisuMZ[_0x34dcca(0x7ac)][_0x34dcca(0x64f)][_0x34dcca(0x5d5)](this,_0x419905);},VisuMZ['CoreEngine'][_0x5d7dff(0x2f4)]=Sprite_AnimationMV['prototype'][_0x5d7dff(0x307)],Sprite_AnimationMV[_0x5d7dff(0x4fa)]['updatePosition']=function(){const _0x2da745=_0x5d7dff;VisuMZ[_0x2da745(0x7ac)][_0x2da745(0x2f4)]['call'](this);if(this[_0x2da745(0x2ed)][_0x2da745(0x113)]===0x3){if(this['x']===0x0)this['x']=Math[_0x2da745(0xd6)](Graphics['width']/0x2);if(this['y']===0x0)this['y']=Math[_0x2da745(0xd6)](Graphics[_0x2da745(0x8af)]/0x2);}},Sprite_Damage[_0x5d7dff(0x4fa)]['createDigits']=function(_0x42797f){const _0x3fa9f7=_0x5d7dff;let _0x19fccf=Math['abs'](_0x42797f)[_0x3fa9f7(0x27d)]();this['useDigitGrouping']()&&(_0x19fccf=VisuMZ[_0x3fa9f7(0x53c)](_0x19fccf));const _0x580e8e=this['fontSize'](),_0x184fe8=Math[_0x3fa9f7(0x559)](_0x580e8e*0.75);for(let _0x1be647=0x0;_0x1be647<_0x19fccf['length'];_0x1be647++){const _0x44c81d=this[_0x3fa9f7(0x4f5)](_0x184fe8,_0x580e8e);_0x44c81d[_0x3fa9f7(0x78d)][_0x3fa9f7(0x7f1)](_0x19fccf[_0x1be647],0x0,0x0,_0x184fe8,_0x580e8e,'center'),_0x44c81d['x']=(_0x1be647-(_0x19fccf[_0x3fa9f7(0xfd)]-0x1)/0x2)*_0x184fe8,_0x44c81d['dy']=-_0x1be647;}},Sprite_Damage[_0x5d7dff(0x4fa)][_0x5d7dff(0x2e6)]=function(){const _0x101639=_0x5d7dff;return VisuMZ[_0x101639(0x7ac)]['Settings'][_0x101639(0x116)][_0x101639(0x836)];},Sprite_Damage[_0x5d7dff(0x4fa)][_0x5d7dff(0x790)]=function(){const _0x13f8ef=_0x5d7dff;return ColorManager[_0x13f8ef(0xfb)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x266)]=Sprite_Gauge['prototype'][_0x5d7dff(0x4e0)],Sprite_Gauge[_0x5d7dff(0x4fa)][_0x5d7dff(0x4e0)]=function(){const _0x3d14fa=_0x5d7dff;return VisuMZ[_0x3d14fa(0x7ac)][_0x3d14fa(0x266)][_0x3d14fa(0x5d5)](this)['clamp'](0x0,0x1);},VisuMZ['CoreEngine']['Sprite_Gauge_currentValue']=Sprite_Gauge[_0x5d7dff(0x4fa)][_0x5d7dff(0x377)],Sprite_Gauge[_0x5d7dff(0x4fa)][_0x5d7dff(0x377)]=function(){const _0x10554d=_0x5d7dff;let _0x52f10d=VisuMZ[_0x10554d(0x7ac)]['Sprite_Gauge_currentValue'][_0x10554d(0x5d5)](this);return _0x52f10d;},Sprite_Gauge[_0x5d7dff(0x4fa)][_0x5d7dff(0x7ae)]=function(){const _0x27603e=_0x5d7dff;let _0x1fa30a=this[_0x27603e(0x377)]();this[_0x27603e(0x2e6)]()&&(_0x1fa30a=VisuMZ[_0x27603e(0x53c)](_0x1fa30a));const _0x5a7911=this[_0x27603e(0x36c)]()-0x1,_0x44537d=this['textHeight']?this[_0x27603e(0x3c7)]():this[_0x27603e(0x365)]();this[_0x27603e(0x56b)](),this['bitmap']['drawText'](_0x1fa30a,0x0,0x0,_0x5a7911,_0x44537d,_0x27603e(0x761));},Sprite_Gauge['prototype'][_0x5d7dff(0x46a)]=function(){return 0x3;},Sprite_Gauge[_0x5d7dff(0x4fa)][_0x5d7dff(0x2e6)]=function(){const _0x41a424=_0x5d7dff;return VisuMZ[_0x41a424(0x7ac)][_0x41a424(0x37c)][_0x41a424(0x116)]['DigitGroupingGaugeSprites'];},Sprite_Gauge[_0x5d7dff(0x4fa)]['valueOutlineColor']=function(){const _0x255447=_0x5d7dff;return ColorManager[_0x255447(0x894)]();},Sprite_StateIcon[_0x5d7dff(0x141)]=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)]['UI'][_0x5d7dff(0x805)]??!![],VisuMZ[_0x5d7dff(0x7ac)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon[_0x5d7dff(0x4fa)][_0x5d7dff(0x660)],Sprite_StateIcon[_0x5d7dff(0x4fa)][_0x5d7dff(0x660)]=function(){const _0x1beb13=_0x5d7dff;Sprite_StateIcon[_0x1beb13(0x141)]?this[_0x1beb13(0x50f)]():VisuMZ[_0x1beb13(0x7ac)][_0x1beb13(0x2e5)][_0x1beb13(0x5d5)](this);},Sprite_StateIcon['prototype'][_0x5d7dff(0x50f)]=function(){const _0x12528f=_0x5d7dff;this['bitmap']=new Bitmap(ImageManager[_0x12528f(0x6ed)],ImageManager[_0x12528f(0x8cc)]),this[_0x12528f(0x8a0)]=ImageManager[_0x12528f(0x12c)](_0x12528f(0x7f5));},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1e7)]=Sprite_StateIcon[_0x5d7dff(0x4fa)][_0x5d7dff(0x4bc)],Sprite_StateIcon[_0x5d7dff(0x4fa)]['updateFrame']=function(){const _0x34c6fb=_0x5d7dff;Sprite_StateIcon['NON_FRAME']?this[_0x34c6fb(0x88a)]():VisuMZ[_0x34c6fb(0x7ac)][_0x34c6fb(0x1e7)][_0x34c6fb(0x5d5)](this);},Sprite_StateIcon['prototype'][_0x5d7dff(0x88a)]=function(){const _0x54d917=_0x5d7dff;if(this[_0x54d917(0x6eb)]===this['_iconIndex'])return;this[_0x54d917(0x6eb)]=this[_0x54d917(0x2a6)];const _0x27f921=ImageManager['iconWidth'],_0x2e948c=ImageManager[_0x54d917(0x8cc)],_0x12cdec=this['_iconIndex']%0x10*_0x27f921,_0x1b32df=Math[_0x54d917(0x559)](this[_0x54d917(0x2a6)]/0x10)*_0x2e948c,_0x8dcddc=this[_0x54d917(0x8a0)],_0x861a85=this[_0x54d917(0x78d)];_0x861a85[_0x54d917(0x577)](),_0x861a85[_0x54d917(0x6b6)](_0x8dcddc,_0x12cdec,_0x1b32df,_0x27f921,_0x2e948c,0x0,0x0,_0x861a85[_0x54d917(0x47e)],_0x861a85['height']);},VisuMZ[_0x5d7dff(0x7ac)]['Sprite_Picture_loadBitmap']=Sprite_Picture['prototype'][_0x5d7dff(0x660)],Sprite_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x660)]=function(){const _0x11cd02=_0x5d7dff;this['_pictureName']&&this[_0x11cd02(0x1aa)][_0x11cd02(0x371)](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ[_0x11cd02(0x7ac)][_0x11cd02(0x32c)][_0x11cd02(0x5d5)](this);},Sprite_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x40a)]=function(_0x21a688){const _0x2121fb=_0x5d7dff,_0x7c9290=ImageManager[_0x2121fb(0x6ed)],_0x564b07=ImageManager[_0x2121fb(0x8cc)],_0x44dc6d=this['_pictureName']['match'](/SMOOTH/i);this['bitmap']=new Bitmap(_0x7c9290,_0x564b07);const _0x4659c9=ImageManager['loadSystem'](_0x2121fb(0x7f5)),_0x4b05b1=_0x21a688%0x10*_0x7c9290,_0x2aac11=Math[_0x2121fb(0x559)](_0x21a688/0x10)*_0x564b07;this[_0x2121fb(0x78d)][_0x2121fb(0x348)]=_0x44dc6d,this['bitmap'][_0x2121fb(0x6b6)](_0x4659c9,_0x4b05b1,_0x2aac11,_0x7c9290,_0x564b07,0x0,0x0,_0x7c9290,_0x564b07);};function _0x5690(){const _0x237cae=['IconParam2','_forcedBattleGridSystem','textWidth','changeClass','BarBodyColor','invokeCounterAttack','ExtDisplayedParams','SnapshotOpacity','drawText','terminate','createContents','redraw','IconSet','IconSParam0','tilesetFlags','destroy','targetContentsOpacity','SParamVocab8','FontWidthFix','Game_Picture_scaleX','centerY','Layer','Unnamed','Game_Actor_paramBase','processSoundTimings','paramRate2','getColor','buttonAssistWindowRect','StateIconsNonFrame','You\x20do\x20not\x20have\x20a\x20custom\x20Input.keyMapper\x20with\x20\x22cancel\x22\x20and\x20\x22menu\x22\x20','currentClass','_closing','_list','%1\x0a','updateAnglePlus','children','updatePictureSettings','_colorCache','isHandled','Tilemap_addSpotTile','statusParamsWindowRect','JSON','setCommonEvent','name','setLastPluginCommandInterpreter','isNormalPriority','touchUI','Window_Base_drawCharacter','_saveFileID','Enemy','Game_Picture_updateRotation','Scene_Item_create','addLoadListener','renderNoMask','Bitmap_resize','showIncompleteTilesetError','ExportStrFromAllTroops','axes','textAlign','indexOf','isRightInputMode','ActorTPColor','onKeyDownKeysF6F7','_skillTypeWindow','_drawTextBody','mpGaugeColor2','_drawTextShadow','MEV','keyboard','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','Window_MapName_refresh','getCombinedScrollingText','_fauxAnimationSprites','setAnglePlusData','addWindow','_editWindow','processAlwaysEscape','DigitGroupingDamageSprites','ControllerMatches','Window_Selectable_cursorDown','OS_KEY','PRESERVCONVERSION(%1)','helpAreaTop','IconParam0','xparamRateJS','note','AnimationPoint','BTestItems','SlotRect','ARRAYEVAL','_centerElementCoreEngine','onInputBannedWords','skillTypes','process_VisuMZ_CoreEngine_Settings','skills','isClosing','exportAllMapStrings','TGR','ColorMPGauge1','Scene_Menu_create','DimColor1','getLastPluginCommandInterpreter','MAXMP','OUTQUAD','_optionsWindow','buttonAreaHeight','23950KWthse','createPointAnimationSprite','CustomParamIcons','AudioChangeBgmPan','_textPopupWindow','anchorCoreEasing','processKeyboardHandling','itemHeight','_mode','_displayX','paintOpacity','CNT','IconParam3','createExtendedTileSprite','BTestWeapons','GameEnd','uiAreaWidth','IconParam6','canEquip','maxVert','Window_Selectable_processCursorMove','processCursorMove','charging','IconXParam9','ItemBgType','offsetY','animationId','isActor','_displayY','_destroyInternalTextures','SmartEventCollisionPriority','Scene_Map_shouldAutosave','allIcons','editWindowRect','WIN_OEM_FINISH','_playtestF7Looping','escape','fillRect','OutlineColorDmg','_shiftY','CommandRect','clearStencil','PictureCoordinatesMode','initMembers','paramBaseAboveLevel99','ColorPowerUp','stypeId','_scene','animations','gaugeLineHeight','_digitGroupingEx','createJsQuickFunction','DrawItemBackgroundJS','_colorTone','pendingColor','updateFrameCoreEngine','integer','IconXParam6','tileWidth','createCustomParameter','ListRect','OUTEXPO','setSideButtonLayout','Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','Type','outlineColorGauge','loadTitle1','parameters','processCursorMoveModernControls','isPlaytest','PRINTSCREEN','\x0a\x0a\x0a\x0a\x0a','angle','_paramPlus','INBOUNCE','Version','NUMPAD8','_srcBitmap','blockWidth','erasePicture','_movementDuration','FontSmoothing','_tpbState','scrollRight','clearForcedGameTroopSettingsCoreEngine','setEnemyAction','Scene_Base_createWindowLayer','stretch','DurationPerChat','updateOpen','addAnimationSpriteToContainer','VariableJsBlock','height','STB','Pixelated','_cancelButton','_onKeyPress','hit','nickname','paramRate','STRUCT','OpenConsole','isActiveTpb','ShiftT_Toggle','SplitEscape','xparamRate','this.paramBase(5)','_CoreEngineSettings','processKeyboardEnd','_scaleX','horzJS','Window_Base_destroyContents','EXECUTE','MapOnceParallel','DataManager_setupNewGame','_dimmerSprite','setActorHomeRepositioned','ShopMenu','IconIndex','<%1\x20%2:[\x20]','_pollGamepads','iconHeight','translucentOpacity','optionsWindowRect','data/','displayY','itypeId','_anchor','TitlePicButtons','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','ARRAYSTRUCT','sparamPlusJS','ShowScrollBar','Window_Base_drawText','mhp','2165555osPGMG','Game_Map_changeTileset','ParamMax','SwitchActorText','keys\x20for\x20both\x20\x22cancel\x22\x20and\x20\x22menu\x22!\x0a\x0a','SceneManager_exit','Window_NumberInput_processDigitChange','WIN_OEM_PA3','pan','darwin','cursorLeft','updatePictureCoordinates','_lastX','backspace','Graphics','exportAllTroopStrings','cancelShowButton','text','setMainFontSize','startAnimation','_hp','setEvent','expRate','PDR','SideButtons','WIN_OEM_AUTO','targetOpacity','_onKeyDown','Scene_Title','mainAreaTop','processEscape','paramValueByName','round','randomJS','SkillMenu','isPhysical','buttonAssistText1','buttonAssistKey3','alwaysDash','removeAllPointAnimations','buttonAssistCancel','EXCLAMATION','bgs','_encounterCount','CategoryBgType','currentLevelExp','SParamVocab7','pagedown','PixelateImageRendering','MultiKeyFmt','Plus2','ActorHPColor','Title','VisuMZ_2_BattleSystemSTB','isPointAnimationPlaying','outbounce','max','button','setBackgroundOpacity','_sellWindow','drawActorExpGauge','F22','LevelUpFullMp','initRotation','framesPerChar','isTileExtended','HYPHEN_MINUS','_scrollBarVert','centerX','outlineColorDmg','restore','length','DEF','loadGameImagesCoreEngine','_pictureCoordinatesWindow','createPointAnimationQueue','faceHeight','_repositioned','markCoreEngineModified','mmp','format','LineHeight','setActorHome','_pagedownButton','createSpriteset','jsonToZip','Game_System_initialize','Sprite_destroy','battlerHue','IDs','performMiss','createBackground','BaseTexture','position','process_VisuMZ_CoreEngine_Functions','setupCoreEngine','QoL','Spriteset_Base_update','isMaxLevel','mirror','_blank','Input_pollGamepads','anglePlus','VisuMZ_2_BattleSystemPTB','isAutoColorAffected','inbounce','CustomParamAbb','ItemBackColor2','buttonY','xparamFlat1','lastAnimationSprite','playBuzzer','_forcedTroopView','IconXParam7','_image','FadeSpeed','and\x20add\x20it\x20onto\x20this\x20one.','filters','loadSystem','alignBottom','createSubSprite','refreshWithTextCodeSupport','ActorRect','enemies','SlotBgType','SParamVocab3','bind','maxScrollY','ProfileBgType','isEnabled','operand','battlebacks2','paramRateJS','Scene_Base_terminateAnimationClearBugFix','ButtonHeight','needsUpdate','_opacity','Scene_Base_terminate','Script\x20Call\x20Error','NON_FRAME','dummyWindowRect','isEventTest','BuyRect','eventsXyNt','EndingID','NameInputMessage','【%1】\x0a','_startLoading','imageSmoothingEnabled','buttonAssistOffset4','createBuffer','_stored_maxLvGaugeColor2','_stored_mpGaugeColor2','hpGaugeColor2','isPressed','ParseStateNotetags','OkText','34588tnMvJS','setSideView','disable','tpColor','keyMapper','Spriteset_Base_updatePosition','_listWindow','#%1','updateOrigin','ModernControls','StatusRect','SideView','Scene_Battle_update','offOpacity','addChildToBack','updateFauxAnimations','updatePositionCoreEngineShakeRand','end','processKeyboardHome','drawNewParam','Spriteset_Map_createTilemap','font-smooth','hpColor','globalAlpha','_viewportSize','SParamVocab0','GoldBgType','targetBackOpacity','overallWidth','createCancelButton','sparamRate2','min','Rate','_registerKeyInput','END','updateData','_timerSprite','PERCENT','description','_stored_hpGaugeColor1','Total','ControllerButtons','onlyfilename','IconXParam5','_screenY','Smooth','helpAreaBottom','setHome','initDigitGrouping','HelpBgType','pitch','initialize','playTestShiftT','BACK_SLASH','select','Game_Map_scrollRight','MaxDuration','getInputMultiButtonStrings','_lastGamepad','%1/','dashToggle','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','INOUTEXPO','ExportCurTroopText','Game_Action_itemHit','ShortcutScripts','NUMPAD7','drawActorSimpleStatus','titleCommandWindow','setHandler','initBasic','_goldWindow','makeAutoBattleActions','TAB','ctGaugeColor1','SParameterFormula','atypeId','push','paramFlatJS','boxHeight','setDisplayPos','IconParam1','651OZpOLN','isEnemy','_currentBgm','command105','Game_Screen_initialize','_pictureName','DEFAULT_SHIFT_Y','Spriteset_Base_initialize','Graphics_defaultStretchMode','Scene_Base_create','Scene_GameEnd_createBackground','playCursor','save','systemColor','refreshSpritesetForExtendedTiles','_targetOffsetX','drawCircle','connected','gainSilentTp','flush','uiAreaHeight','Plus1','_centerCameraCheck','updateTpbChargeTime','Scene_Name_onInputOk','framesMax','drawGameSubtitle','original','_inBattle','_animationSprites','SystemLoadImages','blendFunc','processMoveCommand','ParseArmorNotetags','scale','home','ExportAllMapText','isOpen','_spriteset','_onError','SParamVocab4','Game_Interpreter_PluginCommand','isSideButtonLayout','Abbreviation','updateClose','showPointAnimations','updateMain','Scene_Shop_create','setMoveEasingType','drawGameVersion','updateDocumentTitle','reserveCommonEvent','ParseClassNotetags','F13','F6key','Color','Sprite_Picture_updateOrigin','WIN_OEM_WSCTRL','sceneTerminationClearEffects','Game_Picture_updateMove','buttons','onMoveEnd','windowPadding','_defaultStretchMode','filter','sparamFlatBonus','Sprite_StateIcon_updateFrame','ExtractStrFromList','toLowerCase','%1:\x20Exit\x20','_buttonAssistWindow','Game_Map_scrollUp','measureText','Game_Picture_y','Game_Unit_onBattleStart','playTestF6','IconSParam6','isGameActive','playCursorSound','_mapY','Sprite_Button_initialize','updateCurrentEvent','index','UNDERSCORE','EnableNumberInput','CLOSE_PAREN','F23','CancelText','_effectsContainer','createWindowLayer','ItemHeight','consumeItem','eva','BKSP','_clickHandler','OPEN_BRACKET','GoldChange','isOpenAndActive','F11','create','itemEva','Sprite_Battler_startMove','numberWindowRect','ColorTPGauge1','ColorSystem','application/json','VOLUME_DOWN','allTiles','FTB','INBACK','subject','resetFontSettings','type','DummyBgType','CONVERT','createKeyJS','animationBaseDelay','AGI','Game_Picture_angle','updatePositionCoreEngineShakeHorz','CLOSE_BRACKET','Actor','TPB\x20ACTIVE','TargetAngle','snapForBackground','_buyWindow','StatusParamsRect','_text','setupCustomRateCoreEngine','shift','maxLvGaugeColor2','Game_Temp_initialize','process_VisuMZ_CoreEngine_RegExp','keyCode','forceOutOfPlaytest','moveRelativeToResolutionChange','this.paramBase(6)','DefaultMode','initialBattleSystem','Scene_Skill_create','xparamFlat2','Scene_Boot_onDatabaseLoaded','OptionsRect','scrollUp','scrollbar','inBattle','Game_Picture_show','Flat1','_scrollDuration','MvAnimationRate','_menuButton','key%1','createTextPopupWindow','smoothSelect','pictureButtons','getControllerInputButtonString','isCursorMovable','DisplayedParams','ParamArrow','displayX','recoverAll','buttonAssistText%1','number','isBottomButtonMode','send','openURL','Scene_Options_create','_mainSprite','Game_Interpreter_command355','hide','process_VisuMZ_CoreEngine_CustomParameters','altKey','INOUTBACK','deactivate','updateDashToggle','sqrt','Untitled','AudioChangeBgsPan','_battlerName','checkScrollBarBitmap','show','Spriteset_Base_isAnimationPlaying','_internalTextures','selectLast','buttonAssistKey5','PictureEraseRange','registerCommand','doesNameContainBannedWords','shake','this.paramBase(7)','sin','pictures','CtrlQuickLoad','Sprite_Gauge_gaugeRate','visible','buttonAssistSwitch','isPlaying','MDR','pop','Tilemap_addShadow','_index','_onceParallelInterpreters','F24','_fauxAnimationQueue','goto','processCursorHomeEndTrigger','setValue','img/%1/','ParseActorNotetags','loadTitle2','menu','return\x200','buttons!\x20Go\x20to\x20project\x27s\x20rmmz_core.js\x20and\x20modify\x20Input.keyMapper\x20','onButtonImageLoad','ExportCurMapText','targetPosition','toString','openingSpeed','_coreEngineShakeStyle','SParamVocab2','faceWidth','MIN_SAFE_INTEGER','_margin','WIN_OEM_PA2','maxPictures','level','setupBattleTestItems','buttonAssistWindowSideRect','QUESTION_MARK','LevelUpFullHp','ColorMaxLvGauge1','smallParamFontSize','_muteSound','loadTileset','createTileExtendSprites','DisplayLockX','maxLevel','checkSmartEventCollision','getLevel','Rate2','buttonAssistOk','performEscape','setColorTone','pages','TPB\x20WAIT','updateMove','ALT','ESC','Window_SkillList_includes','Game_Picture_move','_windowskin','xparamFlatJS','ColorMPGauge2','origin','scrollDown','drawParamText','usableSkills','_iconIndex','GRD','ColorTPCost','ItemRect','removeOnceParallelInterpreter','RepositionEnemies130','TextStr','VisuMZ_2_BattleSystemETB','_refreshPauseSign','maxScrollbar','start','Basic','animationNextDelay','horz','adjustX','getPointAnimationLayer','requiredWtypeId1','SUBTRACT','Game_Action_numRepeats','paramName','setupCoreEasing','Scene_Status_create','concat','_tileExtendTerrainTags','WIN_OEM_FJ_LOYA','processKeyboardDelete','GoldFontSize','zoomScale','mainFontSize','pow','StatusMenu','paramPlus','hpGaugeColor1','areTileShadowsHidden','drawActorClass','SParamVocab6','_statusWindow','Page','Troop%1','MODECHANGE','Window_TitleCommand_selectLast','expGaugeColor2','_stored_tpGaugeColor2','clearTp','QUOTE','onActorChange','EXSEL','Sprite_Button_updateOpacity','defineProperty','_data','maxTurns','Renderer','_troopId','seek','yScrollLinkedOffset','isArrowPressed','Bitmap_fillRect','_cache','App','Bitmap_drawCircle','F7key','InputRect','ExtJS','Sprite_StateIcon_loadBitmap','useDigitGrouping','evade','(\x5cd+)([%％])>','tpGaugeColor2','expGaugeColor1','log','isMenuButtonAssistEnabled','_animation','volume','ShowButtons','CommandList','_stored_hpGaugeColor2','isNumpadPressed','OTB','Sprite_AnimationMV_updatePosition','setGuard','_width','moveCancelButtonSideButtonLayout','createCommandWindow','_targetScaleY','string','OUTBACK','mev','ApplyEasing','getInputButtonString','normalColor','updateBgmParameters','Game_BattlerBase_refresh','executeLoad','VisuMZ_2_BattleSystemFTB','maxLvGaugeColor1','PTB','Scene_Load','updatePosition','ScreenShake','targetObjects','battleSystem','ConvertParams','ItemMenu','Window_Base_update','TextCodeNicknames','_hideTileShadows','Location','meVolume','boxWidth','Window_Selectable_itemRect','param','target','CTB','Plus','_refreshBack','getKeyboardInputButtonString','_timeDuration','DETACH_PICTURE_CONTAINER','refreshActor','_maxDigits','loadSystemImages','_stored_ctGaugeColor1','maxItems','SwitchToggleOne','VisuMZ_4_UniqueTileEffects','〘Scrolling\x20Text〙\x0a','processDigitChange','system','Name','DTB','fillAll','XParamVocab5','Window_Selectable_drawBackgroundRect','getGamepads','Sprite_Picture_loadBitmap','clearRect','xparamPlus1','Manual','SParamVocab5','createPageButtons','applyEasingAnglePlus','Mute','displayName','_startPlaying','arePageButtonsEnabled','scrollY','anchor','getColorDataFromPluginParameters','_bgmBuffer','HelpRect','DummyRect','NUMPAD5','COMMA','updateScrollBarPosition','%1〘Choice\x20Cancel〙%1','join','version','OpenURL','PGUP','CANCEL','TextJS','EREOF','smooth','baseTextRect','random','changeAnglePlusData','refresh','thickness','backOpacity','loadPicture','_active','LINEAR','encounterStep','onLoad','originalJS','openness','standardIconHeight','updateOpacity','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','_displayedPassageError','WindowLayer_render','targets','_actor','Game_Interpreter_updateWaitMode','updateScrollBarVisibility','vertJS','buttonAssistOffset5','jsQuickFunc','outlineColor','removePointAnimation','_statusEquipWindow','bitmapHeight','Window_NameInput_cursorRight','EnableNameInput','XParamVocab4','SwitchRandomizeRange','damageColor','OUTELASTIC','bitmapWidth','Keyboard','reduce','optSideView','picture','match','State-%1-%2','DisplayLockY','FINAL','Game_Interpreter_command111','ExportAllTroopText','currentValue','Flat','%2%1%3','BattleManager_update','catchLoadError','Settings','scrollX','BgFilename1','Window_Base_drawFace','_targetScaleX','cancel','MAX_SAFE_INTEGER','keys','PGDN','list','map','inputWindowRect','_name','Window_NameInput_cursorLeft','updatePositionCoreEngineShakeOriginal','AccuracyBoost','_texture','Graphics_printError','ctrlKey','Max','Scene_MenuBase_createCancelButton','Game_Party_consumeItem','itemLineRect','Wait','canUse','_stored_tpCostColor','turn','listWindowRect','ATTN','Game_Map_setDisplayPos','skipBranch','sv_actors','isCancelled','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','gaugeBackColor','OffBarOpacity','createEnemies','playOk','Window_NameInput_cursorDown','itemHit','FDR','4550799egBGAy','Subtitle','tpGaugeColor1','value','INOUTQUART','clamp','command357','RepositionActors','repositionEnemiesByResolution','ParseEnemyNotetags','isSceneMap','_movementWholeDuration','LUK','ScaleX','Scene_Battle_createCancelButton','members','SceneManager_initialize','Param','FontShadows','expParams','MapNameTextCode','shouldAutosave','_destroyCanvas','SceneManager_onKeyDown','windowOpacity','〘Common\x20Event\x20%1:\x20%2〙\x20Start','EVAL','_loadingState','VOLUME_MUTE','Map%1','_centerElement','PositionX','makeDocumentTitle','textSizeEx','textHeight','Bitmap_measureTextWidth','exit','titles2','xparamPlus','down','_statusParamsWindow','nw.gui','_mirror','_isWindow','CommandBgType','drawGameTitle','BgFilename2','dimColor1','updateText','createFauxAnimationSprite','paramPlusJS','get','TranslucentOpacity','AudioChangeBgsVolume','CodeJS','_context','createTextState','isTouchedInsideFrame','Window_Base_drawIcon','endAction','_tempActor','paramMaxJS','F12','subtitle','_isButtonHidden','pixelated','TextManager_param','ETB','onEscapeSuccess','isTpb','updateWaitMode','Window_NumberInput_start','_originalViewport','_helpWindow','ParseWeaponNotetags','checkCacheKey','SEPARATOR','helpWindowRect','addEventListener','_drawTextOutline','IconXParam4','Window_NameInput_cursorPagedown','slice','BTestArmors','paramchangeTextColor','drawTextTopAligned','removeChild','tileset','_stored_mpCostColor','scrollLeft','SystemSetFontSize','updatePointAnimations','top','runCombinedScrollingTextAsCode','%1〘End\x20Choice\x20Selection〙%1','IconSParam8','Scene_Map_updateMain','isLoopHorizontal','_targetY','_pictureContainer','_startDecrypting','loadIconBitmap','_currentBgs','RequireFocus','AnimationID','xparam','GoldMax','loading','active','drawItem','SystemLoadAudio','onClick','<JS\x20%1\x20%2:[\x20](.*)>','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','drawBackground','setupButtonImage','retrievePointAnimation','categoryWindowRect','Window_Base_createTextState','_bitmap','Scene_MenuBase_createPageButtons','initialLevel','itemRect','updateShadow','\x5c}❪SHIFT❫\x5c{','Game_Picture_initBasic','updateCoreEasing','EscapeAlways','CategoryRect','Window_refreshBack','3050230Uhwkdg','layeredTiles','colSpacing','(\x5cd+)>','this.paramBase(4)','initTpbChargeTime','characters','INELASTIC','scaleX','actorWindowRect','Scene_MenuBase_mainAreaTop','AllTroops','addQueue','NewGameCommonEvent','setupNewGame','VisuMZ_1_BattleCore','Scene_Battle_createSpritesetFix','STENCIL_TEST','_lastOrigin','gold','setSize','Bitmap_gradientFillRect','IconParam5','_bypassCanCounterCheck','processHandling','charAt','this.paramBase(','drawRightArrow','isMVAnimation','playLoad','center','numberShowButton','command122','Window','batch','setTileFrame','processKeyboardDigitChange','330hOmvId','EquipMenu','getBattleSystem','createTitleButtons','command355','PIPE','ValueJS','SCROLLBAR','paramMax','loadWindowskin','isGamepadButtonPressed','_digitGrouping','Scene_Map_createSpritesetFix','isWindowMaskingEnabled','INSINE','onTpbCharged','DOWN','buttonAssistText3','processBack','_playTestFastMode','_stored_ctGaugeColor2','updatePositionCoreEngine','XParamVocab2','enable','statusEquipWindowRect','Spriteset_Battle_createEnemies','VisuMZ_2_BattleSystemOTB','createCustomBackgroundImages','DashToggleR','this.paramBase(1)','valueOutlineWidth','createPointAnimation','loadMapData','Bitmap_drawTextOutline','faces','paramBase','_origin','DefaultStyle','tileHeight','IconXParam8','Show\x20Scrolling\x20Text\x20Script\x20Error','_previousClass','updatePlayTestF7','_stored_normalColor','switchModes','_pictureCoordinatesMode','createButtonAssistWindow','updateLastTarget','framebuffer','transform','width','DigitGroupingLocale','updateBackOpacity','overrideMimeType','buttonAssistWindowButtonRect','PHA','ExtractStrFromTroop','drawGauge','commandWindowRect','font','getLastUsedGamepadType','Game_Action_itemEva','_sideButtonLayout','ATK','BattleSystem','KeyItemProtect','mainAreaTopSideButtonLayout','_duration','_coreEasing','contentsOpacity','_itemWindow','reserveNewGameCommonEvent','duration','image-rendering','toUpperCase','prepareNextScene','_lastPluginCommandInterpreter','WIN_OEM_COPY','option','isExpGaugeDrawn','removeFauxAnimation','MAX_GL_TEXTURES','XParamVocab6','MRG','Window_Scrollable_update','isAnimationForEach','Center','parse','EditBgType','command111','CRI','drawAllParams','drawCharacter','startShake','onerror','VisuMZ_2_BattleSystemCTB','pagedownShowButton','getTileExtendTerrainTags','StatusEquipBgType','SwitchToggleRange','crisisColor','PAUSE','calcEasing','drawActorIcons','GREATER_THAN','OutlineColor','_stored_gaugeBackColor','requestFauxAnimation','Window_Gold_refresh','Scene_SingleLoadTransition','background','this.paramBase(3)','updateFrame','isInputting','_battleField','lineHeight','StartID','INCUBIC','2040RLGeOB','fillStyle','VisuMZ_2_BattleSystemBTB','Sprite_Actor_setActorHome','ColorTPGauge2','_inputSpecialKeyCode','Spriteset_Base_destroy','_targetAnchor','Flat2','Scene_Unlisted','sparam','_updateGamepadState','Window_ShopSell_isEnabled','Input_clear','F20','checkSubstitute','asin','createFauxAnimation','setClickHandler','Speed','buttonAssistKey4','itemSuccessRate','processDrawIcon','Window_Base_createContents','TimeProgress','_hovered','initRotationCoreEngine','buttonAssistText5','wtypeId','removeTileExtendSprites','gaugeRate','Rate1','buyWindowRect','en-US','StatusBgType','_offsetY','Window_NameInput_cursorPageup','_balloonQueue','ADD','WIN_OEM_JUMP','isOptionValid','NUMPAD3','Exported_Script_%1.txt','updatePictureAntiZoom','addOnceParallelInterpreter','_gamepadWait','learnings','Input_setupEventHandlers','Game_Interpreter_command105','NameMenu','Scene_Boot_updateDocumentTitle','createChildSprite','ButtonAssist','DrawIcons','_stored_systemColor','QwertyLayout','prototype','OutlineColorGauge','currencyUnit','hideButtonFromView','resetBattleSystem','F16','BattleManager_checkSubstitute','_cacheScaleX','WIN_OEM_ATTN','BTestAddedQuantity','xparamPlus2','WIN_OEM_ENLW','maxGold','updateAnchor','ALWAYS','isMagical','_target','isCollidedWithEvents','isKeyItem','_shakeSpeed','createMenuButton','loadBitmapCoreEngine','setEasingType','_backSprite2','this.paramBase(0)','ScreenResolution','clone','ShowJS','enableDigitGroupingEx','exp','updateScrollBars','setViewportCoreEngineFix','_inputString','NewGameCommonEventAll','_anglePlus','Window_EquipItem_isEnabled','paramFlat','skillId','retrieveFauxAnimation','Linear','opacity','applyForcedGameTroopSettingsCoreEngine','BlurStrength','innerWidth','FontSize','guardSkillId','IconSParam9','updateMotion','FunctionName','_profileWindow','KANA','numActions','20LkAPdY','INOUTELASTIC','_shakeDuration','Scene_Boot_startNormalGame','WIN_OEM_FJ_JISHO','mainAreaHeight','mpColor','Window_Selectable_cursorUp','ONE','_upArrowSprite','PictureRotateBy','ENTER_SPECIAL','ItemPadding','ParseTilesetNotetags','GroupDigits','cursorPageup','IconXParam0','ShowDevTools','([\x5c+\x5c-]\x5cd+)([%％])>','Window_StatusBase_drawActorSimpleStatus','startAutoNewGame','Window_StatusBase_drawActorLevel','makeFontBigger','_subject','item','Scene_Map_createSpriteset_detach','OffBarColor','TILDE','Scene_Map_createSpriteset','adjustSprite','setAnchor','isLoopVertical','gameTitle','levelUp','terms','INCIRC','sellWindowRect','Scene_Battle_createSpriteset','NUMPAD0','ARRAYSTR','ParseSkillNotetags','_tile','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','floor','maxScrollX','helpAreaTopSideButtonLayout','isFullDocumentTitle','INEXPO','_storedMapText','xdg-open','F18','titles1','ItemBackColor1','setTopRow','ColorManager_loadWindowskin','initCoreEngine','filterArea','RegExp','_backgroundFilter','updateScene','HIT','setupValueFont','MenuLayout','apply','DATABASE','_pointAnimationSprites','_tilemap','Actor-%1-%2','offColor','keypress','makeCoreEngineCommandList','context','playCancel','clear','createTroopNote','isAnimationPlaying','makeFontSmaller','rgba(0,\x200,\x200,\x201.0)','MAXHP','refreshDimmerBitmap','HASH','Window_NameInput_processTouch','_stored_mpGaugeColor1','scaleSprite','playEscape','isSideView','isSpecialCode','_setupEventHandlers','measureTextWidth','makeInputButtonString','resetTextColor','maxTp','KEEP','ListBgType','storeMapData','Armor-%1-%2','CrisisRate','_onLoad','adjustBoxSize','areButtonsHidden','drawFace','isAlive','code','ColorCrisis','CustomParam','INOUTBOUNCE','Sprite_Animation_processSoundTimings','ColorMaxLvGauge2','KeyboardInput','CreateBattleSystemID','WIN_OEM_RESET','NewGameBoot','EISU','showDevTools','_shakePower','playTestShiftR','GoldRect','_tileExtendSprites','FUNC','Mirror','useDigitGroupingEx','_commonEventLayers','onKeyDown','playMiss','_bgsBuffer','dimColor2','setupScrollBarBitmap','onload','successRate','MenuBg','style','initVisuMZCoreEngine','status','mainAreaBottom','IconSParam3','removeAllFauxAnimations','catchException','toLocaleString','getCoreEngineScreenShakeStyle','Game_Event_isCollidedWithEvents','Symbol','setBattleSystem','fontSize','_currentMap','PRINT','CTRL','title','substring','EQUALS','refreshScrollBarBitmap','BgType','MainMenu','ceil','isFauxAnimationPlaying','_mapX','Game_Actor_levelUp','resize','itemWindowRect','SkillTypeRect','ColorNormal','tilesets','playOnceParallelInterpreter','canAttack','checkPassage','MAT','Key%1','fromCharCode','call','Duration','_commandList','_number','PositionJS','》Comment《\x0a%1\x0a','cursorPagedown','BattleManager_invokeCounterAttack','Item-%1-%2','printError','_addShadow','BottomButtons','win32','ImprovedAccuracySystem','bgsVolume','toFixed','setLastGamepadUsed','AutoScrollLockY','Weapon-%1-%2','isItemStyle','overallHeight','_smooth','cursorRight','WIN_ICO_00','enemy','isBottomHelpMode','processTouch','cursorDown','TRG','OUTQUART','standardIconWidth','subjectHitRate','Sprite_Animation_setViewport','rgba(0,\x200,\x200,\x200.7)','scrollbarHeight','META','WIN_OEM_PA1','_targetOpacity','paramFlatBonus','setupFont','add','CommandWidth','changeTextColor','REC','(\x5cd+\x5c.?\x5cd+)>','CIRCUMFLEX','actor','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','sparamRate1','down2','F14','VisuMZ_3_EventChainReact','INOUTCIRC','_actorWindow','_moveEasingType','MDF','_pageupButton','1.4.4','KeyUnlisted','textColor','BoxMargin','targetScaleX','replace','_makeFontNameText','drawActorNickname','offset','includes','drawIcon','initCoreEngineScreenShake','F15','setupTileExtendTerrainTags','battlebacks1','SystemSetBattleSystem','buttonAssistOffset2','Scene_Map_initialize','NONCONVERT','AMPERSAND','itemHitImprovedAccuracy','setMute','_patternHeight','easingType','adjustPictureAntiZoom','GetParamIcon','BattleManager_processEscape','pos','Window_NameInput_processHandling','GET','mute','isBusy','useFontWidthFix','GoldOverlap','adjustY','processFauxAnimationRequests','sparamPlus2','DIVIDE','_slotWindow','WIN_ICO_HELP','_opening','getParameter','Game_Map_setup','TitleCommandList','enableDigitGrouping','AllMaps','left','processPointAnimationRequests','requestPointAnimation','AutoStretch','_categoryWindow','missed','Scene_Map_updateScene','allowShiftScrolling','rowSpacing','Game_Picture_initRotation','makeActionList','isMaskingEnabled','seVolume','Scene_MenuBase_helpAreaTop','setFrame','ParamChange','destroyCoreEngineMarkedBitmaps','mainCommandWidth','test','Sprite_AnimationMV_processTimingData','setBackgroundType','sparamFlat1','DOLLAR','isMapScrollLinked','Window_Base_initialize','RowSpacing','CustomParamNames','RevertPreserveNumbers','CAPSLOCK','PictureShowIcon','TextFmt','〘Show\x20Text〙\x0a','nah','centerCameraCheckData','innerHeight','addCommand','loadBitmap','Window_NameInput_cursorUp','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','remove','_shouldPreventDefault','\x20this.','Control\x20Variables\x20Script\x20Error','areButtonsOutsideMainUI','writeFile','Scene_Map_updateMainMultiply','isScrollBarVisible','([\x5c+\x5c-]\x5cd+)>','PictureRotate','isGamepadAxisMoved','setTargetAnchor','this.paramBase(2)','Game_Actor_changeClass','SELECT','processKeyboardBackspace','contents','showFauxAnimations','JsReplaceUserVar','XParamVocab3','PictureEasingType','Bitmap_strokeRect','stringKeyMap','requestMotion','F17','maxBattleMembers','NumberRect','EVA','makeTargetSprites','targetY','prepare','Input_onKeyDown','sparamFlat2','gainItem','removeAnimationFromContainer','_rate','playtestQuickLoad','_stored_tpGaugeColor1','Window_Selectable_processTouch','Scene_Map_createMenuButton','startNormalGame','ctrl','pictureId','etypeId','paramWidth','ExtractStrFromMap','evaluate','_lastY','_downArrowSprite','onDatabaseLoaded','CEV','PictureEraseAll','catchNormalError','CONTEXT_MENU','updateBattleVariables','ConvertToBase','_commandWindow','_forcedBattleSys','makeDeepCopy','drawIconBySize','setWindowPadding','removeAnimation','OpenSpeed','playTestF7','isAnimationOffsetXMirrored','current','_cacheScaleY','platform','Graphics_centerElement','CheckSplitEscape','EXR','profileWindowRect','ALTGR','_baseTexture','_targetOffsetY','Game_Picture_calcEasing','bgm','DetachBattlePictureContainer','buttonAssistKey%1','_allTextHeight','\x5c}❪TAB❫\x5c{','MCR','trim','blt','OnLoadJS','processTouchModernControls','playBgm','Game_Actor_isPreserveTp','DECIMAL','loadTileBitmap','Game_Map_scrollLeft','parallaxes','37YWSKXr','layoutSettings','destroyScrollBarBitmaps','initCoreEasing','xScrollLinkedOffset','repeat','_stored_pendingColor','padZero','_numberWindow','NUM','tpbAcceleration','AudioChangeBgmPitch','buttonAssistText2','getButtonAssistLocation','onXhrError','DamageColor','_stored_expGaugeColor2','_stored_powerDownColor','Enable','INSERT','_logWindow','updatePositionCoreEngineShakeVert','ColorCTGauge1','worldTransform','LESS_THAN','destroyContents','1.3.0','_coreEasingType','attackSkillId','levelUpRecovery','coreEngineRepositionEnemies','sparamRate','DOUBLE_QUOTE','updateKeyText','OUTSINE','PictureID','waiting','_realScale','fillText','addChild','Bitmap_drawText','deselect','Game_Action_setAttack','_stored_expGaugeColor1','_lastIconIndex','_textQueue','iconWidth','RPGMAKER_VERSION','wait','isPreserveTp','_pauseSignSprite','scaleY','setCoreEngineScreenShakeStyle','process_VisuMZ_CoreEngine_jsQuickFunctions','Game_Battler_initTpbChargeTime','setSkill','default','_mapNameWindow','Game_Picture_x','_tpbChargeTime','applyCoreEasing','_updateFilterArea','calcCoreEasing','Game_Action_updateLastTarget','cursorUp','windowRect','Y:\x20%1','Window_NameInput_refresh','SETTINGS','autoRemovalTiming','createTilemap','Bitmap_clearRect','HOME','CallHandlerJS','bodyColor','CRSEL','_backSprite1','_stored_maxLvGaugeColor1','drawSegment','pointY','_screenX','STENCIL_BUFFER_BIT','_lastScrollBarValues','ExportString','Padding','createAnimationSprite','ParseItemNotetags','Conditional\x20Branch\x20Script\x20Error','SHIFT','isSceneBattle','SceneManager_isGameActive','CustomParamType','Scene_Map_update','isItem','ParamName','process_VisuMZ_CoreEngine_ControllerButtons','animationShouldMirror','maxCols','updatePadding','LoadError','ENTER','Game_BattlerBase_initMembers','clearOnceParallelInterpreters','itemPadding','UpdatePictureCoordinates','MinDuration','buttonAssistText4','charCode','HRG','RIGHT','moveMenuButtonSideButtonLayout','_changingClass','SPACE','_storedStack','buttonAssistKey1','isUseModernControls','setup','MRF','isRepeated','_stypeId','DELETE','isClosed','strokeRect','NoTileShadows','itemBackColor1','mapId','AudioChangeBgmVolume','KeyTAB','params','SCALE_MODES','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','createDimmerSprite','endAnimation','initMembersCoreEngine','render','getLastGamepadUsed','onInputOk','startMove','deflate','targetEvaRate','Scene_Equip_create','determineSideButtonLayoutValid','repositionCancelButtonSideButtonLayout','ForceNoPlayTest','URL','xparamRate2','OPEN_CURLY_BRACKET','EncounterRateMinimum','stencilOp','GoldIcon','setViewport','drawActorLevel','traitObjects','ShiftR_Toggle','_hideButtons','alphabetic','applyEasing','move','VOLUME_UP','centerSprite','update','randomInt','right','gradientFillRect','updateOnceParallelInterpreters','SCROLL_LOCK','consumable','BTB','split','popScene','traitsPi','5553lSyytS','_windowLayer','CorrectSkinBleeding','normal','keyRepeatWait','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','ActorBgType','checkCoreEngineDisplayCenter','INOUTSINE','_lastCommandSymbol','open','scaleMode','NUMPAD4','Enemy-%1-%2','NUM_LOCK','ParseAllNotetags','PreserveNumbers','LEFT','isOpening','Bitmap_blt','contains','EnableMasking','TCR','getBackgroundOpacity','_targets','drawTextEx','isSmartEventCollisionOn','maxVisibleItems','pageup','updateDuration','createPointAnimationTargets','drawParamName','ExportStrFromAllMaps','〘Common\x20Event\x20%1:\x20%2〙\x20End','mainAreaHeightSideButtonLayout','bitmap','_clientArea','EditRect','valueOutlineColor','advanced','_height','constructor','ScaleY','drawBackgroundRect','hasEncryptedImages','LoadMenu','ColorMPCost','ColorHPGauge1','initButtonHidden','INOUTQUAD','activate','baseId','statusWindowRect','padding','_eventId','Scene_Battle_createSpriteset_detach','_inputWindow','numRepeats','NEAREST','Game_Unit_onBattleEnd','onBattleStart','contentsBack','goldWindowRect','none','getCustomBackgroundSettings','Game_Character_processMoveCommand','CoreEngine','updateEffekseer','drawValue','Scene_Boot_loadSystemImages','Input_updateGamepadState','BlurFilter','Game_Event_start','process_VisuMZ_CoreEngine_Notetags','_addSpotTile','BannedWords','DigitGroupingExText','buttonAssistKey2','XParamVocab8','updateBgsParameters','sv_enemies','parseForcedGameTroopSettingsCoreEngine','_stored_powerUpColor','onBattleEnd','buttonAssistOffset1','Gold','REPLACE','_pointAnimationQueue','isNwjs','setAttack','fadeSpeed','Input_update','KeySHIFT','isGamepadConnected','isTriggered','isGamepadTriggered','_backgroundSprite','tab','updateTransform','Window_NameInput_initialize','ButtonFadeSpeed','Map%1.json','encounterStepsMinimum','playBgs','PERIOD','getControllerInputButtonMatch','TextPopupShow','InputBgType','BACKSPACE','setCoreEngineUpdateWindowBg','_scrollBarHorz','stencilFunc','IconSParam7','gaugeHeight','operation','offsetX','_offsetX','_scaleY','OptionsMenu','wholeDuration','_tileSprite','rightArrowWidth','paramX','Game_Picture_scaleY','tpCostColor','AudioChangeBgsPitch','updateMainMultiply'];_0x5690=function(){return _0x237cae;};return _0x5690();}function _0x195c(_0x2647a4,_0x40322b){const _0x5690f3=_0x5690();return _0x195c=function(_0x195c89,_0x59fb35){_0x195c89=_0x195c89-0xb9;let _0x8021ac=_0x5690f3[_0x195c89];return _0x8021ac;},_0x195c(_0x2647a4,_0x40322b);}function Sprite_TitlePictureButton(){const _0x159241=_0x5d7dff;this[_0x159241(0x186)](...arguments);}Sprite_TitlePictureButton[_0x5d7dff(0x4fa)]=Object[_0x5d7dff(0x208)](Sprite_Clickable[_0x5d7dff(0x4fa)]),Sprite_TitlePictureButton[_0x5d7dff(0x4fa)][_0x5d7dff(0x793)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)]=function(_0x57d3e3){const _0x169e23=_0x5d7dff;Sprite_Clickable['prototype'][_0x169e23(0x186)][_0x169e23(0x5d5)](this),this['_data']=_0x57d3e3,this[_0x169e23(0x203)]=null,this[_0x169e23(0x733)]();},Sprite_TitlePictureButton['prototype']['setup']=function(){const _0x6ff166=_0x5d7dff;this['x']=Graphics[_0x6ff166(0x47e)],this['y']=Graphics['height'],this[_0x6ff166(0x267)]=![],this['setupButtonImage']();},Sprite_TitlePictureButton[_0x5d7dff(0x4fa)][_0x5d7dff(0x418)]=function(){const _0x432cbc=_0x5d7dff;this[_0x432cbc(0x78d)]=ImageManager[_0x432cbc(0x34f)](this[_0x432cbc(0x2d7)]['PictureFilename']),this[_0x432cbc(0x78d)][_0x432cbc(0x81d)](this[_0x432cbc(0x27a)]['bind'](this));},Sprite_TitlePictureButton[_0x5d7dff(0x4fa)][_0x5d7dff(0x27a)]=function(){const _0x5ecbbf=_0x5d7dff;this[_0x5ecbbf(0x2d7)][_0x5ecbbf(0x6b7)][_0x5ecbbf(0x5d5)](this),this[_0x5ecbbf(0x2d7)][_0x5ecbbf(0x5d9)]['call'](this),this[_0x5ecbbf(0x4d4)](this[_0x5ecbbf(0x2d7)]['CallHandlerJS'][_0x5ecbbf(0x134)](this));},Sprite_TitlePictureButton[_0x5d7dff(0x4fa)]['update']=function(){const _0x589186=_0x5d7dff;Sprite_Clickable[_0x589186(0x4fa)][_0x589186(0x75f)]['call'](this),this[_0x589186(0x357)](),this[_0x589186(0x5ef)]();},Sprite_TitlePictureButton[_0x5d7dff(0x4fa)][_0x5d7dff(0x7c4)]=function(){const _0x48f9b3=_0x5d7dff;return VisuMZ[_0x48f9b3(0x7ac)][_0x48f9b3(0x37c)][_0x48f9b3(0x56c)][_0x48f9b3(0xea)][_0x48f9b3(0x7ce)];},Sprite_TitlePictureButton[_0x5d7dff(0x4fa)][_0x5d7dff(0x357)]=function(){const _0x33774e=_0x5d7dff;this['_pressed']||this[_0x33774e(0x4db)]?this[_0x33774e(0x522)]=0xff:(this[_0x33774e(0x522)]+=this[_0x33774e(0x267)]?this[_0x33774e(0x7c4)]():-0x1*this[_0x33774e(0x7c4)](),this['opacity']=Math['min'](0xc0,this['opacity']));},Sprite_TitlePictureButton[_0x5d7dff(0x4fa)]['setClickHandler']=function(_0x59a9cf){this['_clickHandler']=_0x59a9cf;},Sprite_TitlePictureButton['prototype'][_0x5d7dff(0x414)]=function(){const _0x3535a6=_0x5d7dff;this[_0x3535a6(0x203)]&&this[_0x3535a6(0x203)]();};function Sprite_ExtendedTile(){const _0x4674e6=_0x5d7dff;this[_0x4674e6(0x186)](...arguments);}Sprite_ExtendedTile[_0x5d7dff(0x4fa)]=Object[_0x5d7dff(0x208)](Sprite[_0x5d7dff(0x4fa)]),Sprite_ExtendedTile[_0x5d7dff(0x4fa)][_0x5d7dff(0x793)]=Sprite_ExtendedTile,Sprite_ExtendedTile['prototype']['initialize']=function(_0x282ef2,_0x31c17b,_0x45bcaa,_0x3cac0a){const _0x711a41=_0x5d7dff;this[_0x711a41(0x87a)]=Game_CharacterBase[_0x711a41(0x1ab)]||-0x6,this['_mapX']=_0x282ef2,this[_0x711a41(0x1f4)]=_0x31c17b,this[_0x711a41(0x557)]=_0x45bcaa,this['_patternHeight']=_0x3cac0a,Sprite[_0x711a41(0x4fa)]['initialize']['call'](this),this[_0x711a41(0x12e)](),this[_0x711a41(0x6bc)](),this[_0x711a41(0x44a)](),this['update']();},Sprite_ExtendedTile[_0x5d7dff(0x4fa)]['createSubSprite']=function(){const _0x4ffea3=_0x5d7dff;this[_0x4ffea3(0x7e2)]=new Sprite(),this['_tileSprite'][_0x4ffea3(0x338)]['x']=0.5,this[_0x4ffea3(0x7e2)][_0x4ffea3(0x338)]['y']=0x1,this[_0x4ffea3(0x7e2)]['y']=-this[_0x4ffea3(0x87a)]+0x1,this[_0x4ffea3(0x6e6)](this[_0x4ffea3(0x7e2)]);},Sprite_ExtendedTile[_0x5d7dff(0x4fa)][_0x5d7dff(0x6bc)]=function(){const _0x217013=_0x5d7dff,_0x3bee15=$gameMap['tileset'](),_0x5c0dd4=0x5+Math['floor'](this['_tile']/0x100);this['_tileSprite'][_0x217013(0x78d)]=ImageManager[_0x217013(0x28e)](_0x3bee15['tilesetNames'][_0x5c0dd4]);},Sprite_ExtendedTile[_0x5d7dff(0x4fa)][_0x5d7dff(0x44a)]=function(){const _0xf3809c=_0x5d7dff,_0x1349a6=this[_0xf3809c(0x557)],_0x18f779=$gameMap[_0xf3809c(0x88d)](),_0x1123c2=$gameMap[_0xf3809c(0x472)](),_0x19876b=(Math[_0xf3809c(0x559)](_0x1349a6/0x80)%0x2*0x8+_0x1349a6%0x8)*_0x18f779,_0x30efec=Math[_0xf3809c(0x559)](_0x1349a6%0x100/0x8)%0x10*_0x1123c2,_0x372f56=this[_0xf3809c(0x624)]*_0x1123c2;this[_0xf3809c(0x7e2)][_0xf3809c(0x64a)](_0x19876b,_0x30efec-_0x372f56,_0x18f779,_0x1123c2+_0x372f56);},Sprite_ExtendedTile['prototype'][_0x5d7dff(0x75f)]=function(){const _0x25220e=_0x5d7dff;Sprite[_0x25220e(0x4fa)][_0x25220e(0x75f)]['call'](this),this[_0x25220e(0x307)]();},Sprite_ExtendedTile[_0x5d7dff(0x4fa)][_0x5d7dff(0x307)]=function(){const _0x53a7ed=_0x5d7dff,_0x2b77d9=$gameMap[_0x53a7ed(0x88d)](),_0x5e5d1e=$gameMap[_0x53a7ed(0x472)](),_0x33927c=this[_0x53a7ed(0x5c8)],_0x2759ef=this['_mapY'];this['x']=Math[_0x53a7ed(0x559)](($gameMap[_0x53a7ed(0x2b4)](_0x33927c)+0.5)*_0x2b77d9),this['y']=Math[_0x53a7ed(0x559)](($gameMap[_0x53a7ed(0x630)](_0x2759ef)+0x1)*_0x5e5d1e)+this[_0x53a7ed(0x87a)]-0x1;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1ac)]=Spriteset_Base['prototype'][_0x5d7dff(0x186)],Spriteset_Base[_0x5d7dff(0x4fa)]['initialize']=function(){const _0x3613a9=_0x5d7dff;VisuMZ[_0x3613a9(0x7ac)][_0x3613a9(0x1ac)][_0x3613a9(0x5d5)](this),this[_0x3613a9(0x744)]();},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x744)]=function(){const _0x1c77b2=_0x5d7dff;this[_0x1c77b2(0x831)]=[],this[_0x1c77b2(0x56f)]=[],this[_0x1c77b2(0x501)]=this[_0x1c77b2(0x1c7)]['x'],this[_0x1c77b2(0x6a5)]=this[_0x1c77b2(0x1c7)]['y'];},VisuMZ[_0x5d7dff(0x7ac)]['Spriteset_Base_destroy']=Spriteset_Base[_0x5d7dff(0x4fa)]['destroy'],Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x7f8)]=function(_0x495a38){const _0x9d973a=_0x5d7dff;this[_0x9d973a(0x5b5)](),this[_0x9d973a(0xdd)](),VisuMZ[_0x9d973a(0x7ac)][_0x9d973a(0x4c8)][_0x9d973a(0x5d5)](this,_0x495a38);},VisuMZ['CoreEngine']['Spriteset_Base_update']=Spriteset_Base[_0x5d7dff(0x4fa)]['update'],Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x75f)]=function(){const _0x2ad2d8=_0x5d7dff;VisuMZ['CoreEngine'][_0x2ad2d8(0x117)]['call'](this),this[_0x2ad2d8(0x80d)](),this[_0x2ad2d8(0x4ed)](),this[_0x2ad2d8(0x162)](),this[_0x2ad2d8(0x400)]();},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x80d)]=function(){},Spriteset_Base[_0x5d7dff(0x4fa)]['updatePictureAntiZoom']=function(){const _0xbdb629=_0x5d7dff;if(!VisuMZ['CoreEngine'][_0xbdb629(0x37c)][_0xbdb629(0x116)]['AntiZoomPictures'])return;if(this[_0xbdb629(0x501)]===this[_0xbdb629(0x1c7)]['x']&&this['_cacheScaleY']===this[_0xbdb629(0x1c7)]['y'])return;this[_0xbdb629(0x626)](),this[_0xbdb629(0x501)]=this['scale']['x'],this['_cacheScaleY']=this[_0xbdb629(0x1c7)]['y'];},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x626)]=function(){const _0x2ba3dd=_0x5d7dff;if(SceneManager[_0x2ba3dd(0x3af)]()&&Spriteset_Map[_0x2ba3dd(0x31b)])return;else{if(SceneManager[_0x2ba3dd(0x718)]()&&Spriteset_Battle[_0x2ba3dd(0x31b)])return;}this[_0x2ba3dd(0x1c7)]['x']!==0x0&&(this[_0x2ba3dd(0x408)]['scale']['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x2ba3dd(0x1c7)]['x'])),this[_0x2ba3dd(0x1c7)]['y']!==0x0&&(this[_0x2ba3dd(0x408)]['scale']['y']=0x1/this[_0x2ba3dd(0x1c7)]['y'],this[_0x2ba3dd(0x408)]['y']=-(this['y']/this[_0x2ba3dd(0x1c7)]['y']));},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x158)]=Spriteset_Base[_0x5d7dff(0x4fa)]['updatePosition'],Spriteset_Base[_0x5d7dff(0x4fa)]['updatePosition']=function(){const _0x36a982=_0x5d7dff;VisuMZ[_0x36a982(0x7ac)][_0x36a982(0x158)][_0x36a982(0x5d5)](this),this[_0x36a982(0x461)]();},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x461)]=function(){const _0x2798e1=_0x5d7dff;if(!$gameScreen)return;if($gameScreen['_shakeDuration']<=0x0)return;this['x']-=Math[_0x2798e1(0xd6)]($gameScreen[_0x2798e1(0x261)]());const _0x21eef4=$gameScreen[_0x2798e1(0x5b8)]();switch($gameScreen[_0x2798e1(0x5b8)]()){case _0x2798e1(0x1c0):this[_0x2798e1(0x38a)]();break;case'horizontal':this[_0x2798e1(0x21c)]();break;case'vertical':this[_0x2798e1(0x6d4)]();break;default:this[_0x2798e1(0x163)]();break;}},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x38a)]=function(){const _0xe2f455=_0x5d7dff,_0x1115b7=VisuMZ[_0xe2f455(0x7ac)][_0xe2f455(0x37c)]['ScreenShake'];if(_0x1115b7&&_0x1115b7[_0xe2f455(0x354)])return _0x1115b7['originalJS'][_0xe2f455(0x5d5)](this);this['x']+=Math[_0xe2f455(0xd6)]($gameScreen[_0xe2f455(0x261)]());},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x163)]=function(){const _0x5cf4ee=_0x5d7dff,_0x3201ab=VisuMZ[_0x5cf4ee(0x7ac)][_0x5cf4ee(0x37c)]['ScreenShake'];if(_0x3201ab&&_0x3201ab[_0x5cf4ee(0xd7)])return _0x3201ab[_0x5cf4ee(0xd7)][_0x5cf4ee(0x5d5)](this);const _0x5ef7ba=$gameScreen[_0x5cf4ee(0x5a0)]*0.75,_0x4b3c80=$gameScreen['_shakeSpeed']*0.6,_0x575887=$gameScreen[_0x5cf4ee(0x530)];this['x']+=Math[_0x5cf4ee(0xd6)](Math['randomInt'](_0x5ef7ba)-Math['randomInt'](_0x4b3c80))*(Math['min'](_0x575887,0x1e)*0.5),this['y']+=Math[_0x5cf4ee(0xd6)](Math[_0x5cf4ee(0x760)](_0x5ef7ba)-Math[_0x5cf4ee(0x760)](_0x4b3c80))*(Math[_0x5cf4ee(0x172)](_0x575887,0x1e)*0.5);},Spriteset_Base[_0x5d7dff(0x4fa)]['updatePositionCoreEngineShakeHorz']=function(){const _0x366eb0=_0x5d7dff,_0x5509cf=VisuMZ[_0x366eb0(0x7ac)][_0x366eb0(0x37c)][_0x366eb0(0x308)];if(_0x5509cf&&_0x5509cf[_0x366eb0(0x8c1)])return _0x5509cf[_0x366eb0(0x8c1)]['call'](this);const _0x312437=$gameScreen['_shakePower']*0.75,_0x1b1ea4=$gameScreen[_0x366eb0(0x50d)]*0.6,_0x2c0acd=$gameScreen[_0x366eb0(0x530)];this['x']+=Math[_0x366eb0(0xd6)](Math['randomInt'](_0x312437)-Math[_0x366eb0(0x760)](_0x1b1ea4))*(Math[_0x366eb0(0x172)](_0x2c0acd,0x1e)*0.5);},Spriteset_Base['prototype'][_0x5d7dff(0x6d4)]=function(){const _0x52bab6=_0x5d7dff,_0x3f9d75=VisuMZ[_0x52bab6(0x7ac)][_0x52bab6(0x37c)][_0x52bab6(0x308)];if(_0x3f9d75&&_0x3f9d75[_0x52bab6(0x35f)])return _0x3f9d75[_0x52bab6(0x35f)]['call'](this);const _0x1020c6=$gameScreen['_shakePower']*0.75,_0x216f09=$gameScreen[_0x52bab6(0x50d)]*0.6,_0x106da7=$gameScreen['_shakeDuration'];this['y']+=Math[_0x52bab6(0xd6)](Math[_0x52bab6(0x760)](_0x1020c6)-Math[_0x52bab6(0x760)](_0x216f09))*(Math[_0x52bab6(0x172)](_0x106da7,0x1e)*0.5);},Spriteset_Base['prototype']['updateFauxAnimations']=function(){const _0x2ec650=_0x5d7dff;for(const _0x222d3f of this[_0x2ec650(0x831)]){!_0x222d3f[_0x2ec650(0x269)]()&&this[_0x2ec650(0x49c)](_0x222d3f);}this[_0x2ec650(0x631)]();},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x631)]=function(){const _0x3f8154=_0x5d7dff;for(;;){const _0x17eb6d=$gameTemp[_0x3f8154(0x520)]();if(_0x17eb6d)this['createFauxAnimation'](_0x17eb6d);else break;}},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x4d3)]=function(_0x391722){const _0x4acddd=_0x5d7dff,_0x191a72=$dataAnimations[_0x391722[_0x4acddd(0x86d)]],_0x3c6e66=_0x391722[_0x4acddd(0x35b)],_0x50391f=_0x391722[_0x4acddd(0x119)],_0x3c3ce6=_0x391722[_0x4acddd(0x62c)];let _0x149303=this['animationBaseDelay']();const _0x15ae10=this[_0x4acddd(0x2b2)]();if(this[_0x4acddd(0x4a1)](_0x191a72))for(const _0x1430ff of _0x3c6e66){this['createFauxAnimationSprite']([_0x1430ff],_0x191a72,_0x50391f,_0x149303,_0x3c3ce6),_0x149303+=_0x15ae10;}else this[_0x4acddd(0x3d6)](_0x3c6e66,_0x191a72,_0x50391f,_0x149303,_0x3c3ce6);},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x714)]=function(_0x35f740,_0x33a7e7,_0x133cd9,_0x44de57){const _0x36f184=_0x5d7dff,_0x34d013=this[_0x36f184(0x443)](_0x33a7e7),_0x26aaf4=new(_0x34d013?Sprite_AnimationMV:Sprite_Animation)(),_0x3bdd23=this[_0x36f184(0x67f)](_0x35f740),_0x30ae8f=this[_0x36f184(0x219)](),_0x49df4c=_0x44de57>_0x30ae8f?this[_0x36f184(0x124)]():null;this[_0x36f184(0x71f)](_0x35f740[0x0])&&(_0x133cd9=!_0x133cd9),_0x26aaf4[_0x36f184(0x309)]=_0x35f740,_0x26aaf4[_0x36f184(0x733)](_0x3bdd23,_0x33a7e7,_0x133cd9,_0x44de57,_0x49df4c),this['addAnimationSpriteToContainer'](_0x26aaf4),this[_0x36f184(0x1c2)][_0x36f184(0x1a0)](_0x26aaf4);},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x3d6)]=function(_0x44ce3a,_0x10205f,_0x4c4dd7,_0xfcae80,_0x5c693e){const _0x10e143=_0x5d7dff,_0x34cbd7=this[_0x10e143(0x443)](_0x10205f),_0x5c45e9=new(_0x34cbd7?Sprite_AnimationMV:Sprite_Animation)(),_0x133ab6=this[_0x10e143(0x67f)](_0x44ce3a);this[_0x10e143(0x71f)](_0x44ce3a[0x0])&&(_0x4c4dd7=!_0x4c4dd7);_0x5c45e9[_0x10e143(0x309)]=_0x44ce3a,_0x5c45e9[_0x10e143(0x733)](_0x133ab6,_0x10205f,_0x4c4dd7,_0xfcae80),_0x5c45e9[_0x10e143(0x623)](_0x5c693e),this[_0x10e143(0x8ad)](_0x5c45e9);if(this['_animationSprites'])this[_0x10e143(0x1c2)]['remove'](_0x5c45e9);this[_0x10e143(0x831)][_0x10e143(0x1a0)](_0x5c45e9);},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x8ad)]=function(_0x52a88b){const _0xbc3671=_0x5d7dff;this['_effectsContainer'][_0xbc3671(0x6e6)](_0x52a88b);},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x6a0)]=function(_0x53a620){const _0x4b50b9=_0x5d7dff;this[_0x4b50b9(0x1c2)][_0x4b50b9(0x663)](_0x53a620),this[_0x4b50b9(0x685)](_0x53a620);for(const _0x2ae74f of _0x53a620[_0x4b50b9(0x309)]){_0x2ae74f[_0x4b50b9(0x743)]&&_0x2ae74f[_0x4b50b9(0x743)]();}_0x53a620[_0x4b50b9(0x7f8)]();},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x49c)]=function(_0x2ab5fb){const _0x4cbc3b=_0x5d7dff;this[_0x4cbc3b(0x831)]['remove'](_0x2ab5fb),this[_0x4cbc3b(0x685)](_0x2ab5fb);for(const _0x4a54ef of _0x2ab5fb[_0x4cbc3b(0x309)]){_0x4a54ef['endAnimation']&&_0x4a54ef['endAnimation']();}_0x2ab5fb['destroy']();},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x685)]=function(_0x4b26e){const _0x309a86=_0x5d7dff;this['_effectsContainer'][_0x309a86(0x3fb)](_0x4b26e);},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x5b5)]=function(){const _0x1d746b=_0x5d7dff;for(const _0x485167 of this[_0x1d746b(0x831)]){this[_0x1d746b(0x49c)](_0x485167);}},Spriteset_Base['prototype'][_0x5d7dff(0x5c7)]=function(){const _0x2e03bf=_0x5d7dff;return this[_0x2e03bf(0x831)][_0x2e03bf(0xfd)]>0x0;},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x400)]=function(){const _0x4750de=_0x5d7dff;for(const _0x637cbe of this[_0x4750de(0x56f)]){!_0x637cbe[_0x4750de(0x269)]()&&this[_0x4750de(0x363)](_0x637cbe);}this[_0x4750de(0x63d)]();},Spriteset_Base[_0x5d7dff(0x4fa)]['processPointAnimationRequests']=function(){const _0x2f303c=_0x5d7dff;for(;;){const _0x8708ef=$gameTemp[_0x2f303c(0x419)]();if(_0x8708ef)this['createPointAnimation'](_0x8708ef);else break;}},Spriteset_Base['prototype'][_0x5d7dff(0x46b)]=function(_0x1f325b){const _0x443668=_0x5d7dff,_0x5f4309=$dataAnimations[_0x1f325b['animationId']],_0x46fffa=this[_0x443668(0x788)](_0x1f325b),_0x2f7534=_0x1f325b[_0x443668(0x119)],_0x2ea685=_0x1f325b[_0x443668(0x62c)];let _0x57e34b=this['animationBaseDelay']();const _0x2788f3=this['animationNextDelay']();if(this[_0x443668(0x4a1)](_0x5f4309))for(const _0x3d86bf of _0x46fffa){this[_0x443668(0x854)]([_0x3d86bf],_0x5f4309,_0x2f7534,_0x57e34b,_0x2ea685),_0x57e34b+=_0x2788f3;}else this[_0x443668(0x854)](_0x46fffa,_0x5f4309,_0x2f7534,_0x57e34b,_0x2ea685);},Spriteset_Base[_0x5d7dff(0x4fa)]['createPointAnimationTargets']=function(_0x105c98){const _0x19b252=_0x5d7dff,_0x33929d=new Sprite_Clickable(),_0x1a9f62=this['getPointAnimationLayer']();_0x33929d['x']=_0x105c98['x']-_0x1a9f62['x'],_0x33929d['y']=_0x105c98['y']-_0x1a9f62['y'],_0x33929d['z']=0x64;const _0x42205c=this[_0x19b252(0x2b5)]();return _0x42205c[_0x19b252(0x6e6)](_0x33929d),[_0x33929d];},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x2b5)]=function(){return this;},Spriteset_Map['prototype'][_0x5d7dff(0x2b5)]=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x5d7dff(0x4fa)][_0x5d7dff(0x2b5)]=function(){const _0x5b5357=_0x5d7dff;return this[_0x5b5357(0x4be)]||this;},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x854)]=function(_0x16a124,_0x94f586,_0x1d6bbf,_0x109c80,_0x5ac576){const _0x35f863=_0x5d7dff,_0x233681=this['isMVAnimation'](_0x94f586),_0x269678=new(_0x233681?Sprite_AnimationMV:Sprite_Animation)();_0x269678[_0x35f863(0x309)]=_0x16a124,_0x269678[_0x35f863(0x733)](_0x16a124,_0x94f586,_0x1d6bbf,_0x109c80),_0x269678[_0x35f863(0x623)](_0x5ac576),this[_0x35f863(0x8ad)](_0x269678),this[_0x35f863(0x56f)][_0x35f863(0x1a0)](_0x269678);},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x363)]=function(_0x5c2aea){const _0x2cb8ad=_0x5d7dff;this[_0x2cb8ad(0x56f)][_0x2cb8ad(0x663)](_0x5c2aea),this[_0x2cb8ad(0x1fd)][_0x2cb8ad(0x3fb)](_0x5c2aea);for(const _0x2b95fe of _0x5c2aea[_0x2cb8ad(0x309)]){_0x2b95fe[_0x2cb8ad(0x743)]&&_0x2b95fe['endAnimation']();const _0x3a3e21=this['getPointAnimationLayer']();if(_0x3a3e21)_0x3a3e21['removeChild'](_0x2b95fe);}_0x5c2aea[_0x2cb8ad(0x7f8)]();},Spriteset_Base['prototype']['removeAllPointAnimations']=function(){const _0x48e943=_0x5d7dff;for(const _0x32c8a0 of this[_0x48e943(0x56f)]){this[_0x48e943(0x363)](_0x32c8a0);}},Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0xec)]=function(){const _0x7101=_0x5d7dff;return this[_0x7101(0x56f)][_0x7101(0xfd)]>0x0;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x25a)]=Spriteset_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x579)],Spriteset_Base['prototype'][_0x5d7dff(0x579)]=function(){const _0x442925=_0x5d7dff;return VisuMZ[_0x442925(0x7ac)][_0x442925(0x25a)][_0x442925(0x5d5)](this)||this[_0x442925(0xec)]();},Spriteset_Map[_0x5d7dff(0x31b)]=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x116)]['DetachMapPictureContainer']||![],VisuMZ['CoreEngine'][_0x5d7dff(0x547)]=Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x10a)],Scene_Map['prototype']['createSpriteset']=function(){const _0x1400e8=_0x5d7dff;VisuMZ[_0x1400e8(0x7ac)]['Scene_Map_createSpriteset_detach'][_0x1400e8(0x5d5)](this);if(!Spriteset_Map[_0x1400e8(0x31b)])return;const _0x42cecd=this[_0x1400e8(0x1cb)];if(!_0x42cecd)return;this[_0x1400e8(0x408)]=_0x42cecd['_pictureContainer'];if(!this['_pictureContainer'])return;this[_0x1400e8(0x6e6)](this[_0x1400e8(0x408)]);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x167)]=Spriteset_Map['prototype'][_0x5d7dff(0x705)],Spriteset_Map[_0x5d7dff(0x4fa)]['createTilemap']=function(){const _0x24cb5a=_0x5d7dff;VisuMZ['CoreEngine'][_0x24cb5a(0x167)]['call'](this),this[_0x24cb5a(0x28f)]();},Spriteset_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x28f)]=function(){const _0x5a5c3e=_0x5d7dff,_0x513ebe=$gameMap['tileset']();if(!_0x513ebe)return;const _0x3e12a6=$gameMap[_0x5a5c3e(0x4ad)]();if(Object[_0x5a5c3e(0x383)](_0x3e12a6)['length']<=0x0)return;const _0x322fed=$gameMap[_0x5a5c3e(0x7f7)]();this[_0x5a5c3e(0x5a3)]=this[_0x5a5c3e(0x5a3)]||[];for(let _0xc4b6d9=0x0;_0xc4b6d9<$gameMap['height']();_0xc4b6d9++){for(let _0x3d2312=0x0;_0x3d2312<$gameMap[_0x5a5c3e(0x47e)]();_0x3d2312++){for(const _0x595bae of $gameMap[_0x5a5c3e(0x428)](_0x3d2312,_0xc4b6d9)){const _0x116195=_0x322fed[_0x595bae]>>0xc,_0x53c5fc=_0x3e12a6[_0x116195]||0x0;if(_0x53c5fc<=0x0)continue;this[_0x5a5c3e(0x860)](_0x3d2312,_0xc4b6d9,_0x595bae,_0x53c5fc);}}}},Spriteset_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x4df)]=function(){const _0x56f0ae=_0x5d7dff;this[_0x56f0ae(0x5a3)]=this[_0x56f0ae(0x5a3)]||[];for(const _0x1c4c50 of this[_0x56f0ae(0x5a3)]){this[_0x56f0ae(0x570)]['removeChild'](_0x1c4c50);}this[_0x56f0ae(0x5a3)]=[];},Spriteset_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x860)]=function(_0x5a234d,_0x5be9cf,_0x3be20b,_0x498711){const _0x5dbc70=_0x5d7dff,_0x17d9c9=new Sprite_ExtendedTile(_0x5a234d,_0x5be9cf,_0x3be20b,_0x498711),_0x3c4785=$gameMap[_0x5dbc70(0x7f7)]();_0x3c4785[_0x3be20b]&0x10?_0x17d9c9['z']=0x4:_0x17d9c9['z']=0x3,this[_0x5dbc70(0x570)][_0x5dbc70(0x6e6)](_0x17d9c9),this[_0x5dbc70(0x5a3)][_0x5dbc70(0x1a0)](_0x17d9c9);},VisuMZ[_0x5d7dff(0x7ac)]['Tilemap_addSpotTile']=Tilemap[_0x5d7dff(0x4fa)][_0x5d7dff(0x7b4)],Tilemap[_0x5d7dff(0x4fa)][_0x5d7dff(0x7b4)]=function(_0x2871b1,_0x3fc2e7,_0xc1efa7){const _0x5cc30c=_0x5d7dff;if($gameMap['isTileExtended'](_0x2871b1))return;VisuMZ['CoreEngine'][_0x5cc30c(0x810)][_0x5cc30c(0x5d5)](this,_0x2871b1,_0x3fc2e7,_0xc1efa7);},Spriteset_Battle['DETACH_PICTURE_CONTAINER']=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x116)][_0x5d7dff(0x6b0)]||![],VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x7a1)]=Scene_Battle[_0x5d7dff(0x4fa)][_0x5d7dff(0x10a)],Scene_Battle[_0x5d7dff(0x4fa)]['createSpriteset']=function(){const _0x295131=_0x5d7dff;VisuMZ[_0x295131(0x7ac)][_0x295131(0x7a1)][_0x295131(0x5d5)](this);if(!Spriteset_Battle[_0x295131(0x31b)])return;const _0x7880d6=this[_0x295131(0x1cb)];if(!_0x7880d6)return;this[_0x295131(0x408)]=_0x7880d6[_0x295131(0x408)];if(!this[_0x295131(0x408)])return;this[_0x295131(0x6e6)](this['_pictureContainer']);},Spriteset_Battle['prototype']['createBackground']=function(){const _0x194a9b=_0x5d7dff;this['_backgroundFilter']=new PIXI[(_0x194a9b(0x12b))][(_0x194a9b(0x7b1))](clamp=!![]),this[_0x194a9b(0x7ca)]=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager['backgroundBitmap'](),this[_0x194a9b(0x7ca)][_0x194a9b(0x12b)]=[this['_backgroundFilter']],this['_baseSprite'][_0x194a9b(0x6e6)](this[_0x194a9b(0x7ca)]);},VisuMZ['CoreEngine'][_0x5d7dff(0x465)]=Spriteset_Battle['prototype'][_0x5d7dff(0x3a0)],Spriteset_Battle[_0x5d7dff(0x4fa)][_0x5d7dff(0x3a0)]=function(){const _0x447de4=_0x5d7dff;this[_0x447de4(0x6dd)]()&&this[_0x447de4(0x3ad)](),VisuMZ[_0x447de4(0x7ac)][_0x447de4(0x465)][_0x447de4(0x5d5)](this);},Spriteset_Battle[_0x5d7dff(0x4fa)][_0x5d7dff(0x6dd)]=function(){const _0x1ba061=_0x5d7dff,_0x4a95ea=VisuMZ['CoreEngine']['Settings'][_0x1ba061(0x513)];if(!_0x4a95ea)return![];if(Utils[_0x1ba061(0x6ee)]>=_0x1ba061(0x6d9)&&!_0x4a95ea[_0x1ba061(0x2ab)])return![];return _0x4a95ea['RepositionEnemies'];},Spriteset_Battle[_0x5d7dff(0x4fa)][_0x5d7dff(0x3ad)]=function(){const _0x17030d=_0x5d7dff;for(member of $gameTroop[_0x17030d(0x3b4)]()){member['moveRelativeToResolutionChange']();}},VisuMZ['CoreEngine'][_0x5d7dff(0x654)]=Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)],Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)]=function(_0x343f08){const _0xc315c1=_0x5d7dff;_0x343f08['x']=Math['round'](_0x343f08['x']),_0x343f08['y']=Math['round'](_0x343f08['y']),_0x343f08[_0xc315c1(0x47e)]=Math['round'](_0x343f08[_0xc315c1(0x47e)]),_0x343f08[_0xc315c1(0x8af)]=Math[_0xc315c1(0xd6)](_0x343f08[_0xc315c1(0x8af)]),this[_0xc315c1(0x183)](),VisuMZ['CoreEngine'][_0xc315c1(0x654)][_0xc315c1(0x5d5)](this,_0x343f08),this[_0xc315c1(0x6c2)]();},Window_Base['prototype'][_0x5d7dff(0x183)]=function(){const _0x4d3191=_0x5d7dff;this['_digitGrouping']=VisuMZ[_0x4d3191(0x7ac)][_0x4d3191(0x37c)][_0x4d3191(0x116)]['DigitGroupingStandardText'],this['_digitGroupingEx']=VisuMZ[_0x4d3191(0x7ac)][_0x4d3191(0x37c)]['QoL'][_0x4d3191(0x7b6)];},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x4bf)]=function(){const _0x1d80fe=_0x5d7dff;return VisuMZ[_0x1d80fe(0x7ac)][_0x1d80fe(0x37c)][_0x1d80fe(0x448)][_0x1d80fe(0x107)];},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x726)]=function(){const _0x4fa093=_0x5d7dff;return VisuMZ['CoreEngine'][_0x4fa093(0x37c)]['Window'][_0x4fa093(0x53a)];},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x480)]=function(){const _0x5e4d26=_0x5d7dff;$gameSystem[_0x5e4d26(0x3bd)]?this[_0x5e4d26(0x34e)]=$gameSystem[_0x5e4d26(0x3bd)]():this[_0x5e4d26(0x34e)]=VisuMZ[_0x5e4d26(0x7ac)]['Settings'][_0x5e4d26(0x448)]['BackOpacity'];},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x8cd)]=function(){const _0x342d9f=_0x5d7dff;return VisuMZ[_0x342d9f(0x7ac)]['Settings'][_0x342d9f(0x448)][_0x342d9f(0x3d9)];},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x27e)]=function(){const _0x280e05=_0x5d7dff;return VisuMZ['CoreEngine']['Settings'][_0x280e05(0x448)][_0x280e05(0x6a1)];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x30d)]=Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x75f)],Window_Base[_0x5d7dff(0x4fa)]['update']=function(){const _0x5b059c=_0x5d7dff;VisuMZ[_0x5b059c(0x7ac)][_0x5b059c(0x30d)]['call'](this),this[_0x5b059c(0x423)]();},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x8ac)]=function(){const _0x296dc8=_0x5d7dff;this[_0x296dc8(0x636)]&&(this[_0x296dc8(0x355)]+=this[_0x296dc8(0x27e)](),this[_0x296dc8(0x1ca)]()&&(this[_0x296dc8(0x636)]=![]));},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x1d1)]=function(){const _0x2ea35e=_0x5d7dff;this['_closing']&&(this[_0x2ea35e(0x355)]-=this['openingSpeed'](),this[_0x2ea35e(0x738)]()&&(this[_0x2ea35e(0x808)]=![]));},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x8d8)]=Window_Base['prototype'][_0x5d7dff(0x7f1)],Window_Base[_0x5d7dff(0x4fa)]['drawText']=function(_0x4641e1,_0x342693,_0x59b1b5,_0x30a5b2,_0x5667b7){const _0x4f812e=_0x5d7dff;if(this[_0x4f812e(0x2e6)]())_0x4641e1=VisuMZ['GroupDigits'](_0x4641e1);VisuMZ[_0x4f812e(0x7ac)][_0x4f812e(0x8d8)][_0x4f812e(0x5d5)](this,_0x4641e1,_0x342693,_0x59b1b5,_0x30a5b2,_0x5667b7);},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x2e6)]=function(){const _0x584b9=_0x5d7dff;return this[_0x584b9(0x457)];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x41b)]=Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x3dd)],Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x3dd)]=function(_0xa2f6b0,_0x35004d,_0x344751,_0x3bb964){const _0x31ff40=_0x5d7dff;var _0x2bdf7e=VisuMZ[_0x31ff40(0x7ac)][_0x31ff40(0x41b)][_0x31ff40(0x5d5)](this,_0xa2f6b0,_0x35004d,_0x344751,_0x3bb964);if(this[_0x31ff40(0x5a6)]())_0x2bdf7e[_0x31ff40(0xc7)]=String(VisuMZ['GroupDigits'](_0x2bdf7e[_0x31ff40(0xc7)]))||'';return _0x2bdf7e;},Window_Base['prototype'][_0x5d7dff(0x5a6)]=function(){const _0x112ac4=_0x5d7dff;return this[_0x112ac4(0x885)];},Window_Base['prototype'][_0x5d7dff(0x63a)]=function(_0x241a11){const _0x4c8c4a=_0x5d7dff;this[_0x4c8c4a(0x457)]=_0x241a11;},Window_Base['prototype'][_0x5d7dff(0x516)]=function(_0x2bee09){this['_digitGroupingEx']=_0x2bee09;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x3df)]=Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x618)],Window_Base['prototype'][_0x5d7dff(0x618)]=function(_0x34778c,_0x35b3cd,_0x391ef6){const _0x3e9d35=_0x5d7dff;_0x35b3cd=Math['round'](_0x35b3cd),_0x391ef6=Math[_0x3e9d35(0xd6)](_0x391ef6),VisuMZ[_0x3e9d35(0x7ac)]['Window_Base_drawIcon']['call'](this,_0x34778c,_0x35b3cd,_0x391ef6);},VisuMZ['CoreEngine'][_0x5d7dff(0x37f)]=Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x592)],Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x592)]=function(_0x144319,_0xf6fc1c,_0x3ca7e9,_0x4f1ccd,_0x4d060b,_0x2f267c){const _0x55dcc5=_0x5d7dff;_0x4d060b=_0x4d060b||ImageManager[_0x55dcc5(0x281)],_0x2f267c=_0x2f267c||ImageManager[_0x55dcc5(0x102)],_0x3ca7e9=Math['round'](_0x3ca7e9),_0x4f1ccd=Math[_0x55dcc5(0xd6)](_0x4f1ccd),_0x4d060b=Math['round'](_0x4d060b),_0x2f267c=Math[_0x55dcc5(0xd6)](_0x2f267c),VisuMZ[_0x55dcc5(0x7ac)]['Window_Base_drawFace'][_0x55dcc5(0x5d5)](this,_0x144319,_0xf6fc1c,_0x3ca7e9,_0x4f1ccd,_0x4d060b,_0x2f267c);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x818)]=Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x4a8)],Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x4a8)]=function(_0x27d0cf,_0x3a95a8,_0x13711b,_0x299f8f){const _0x150c37=_0x5d7dff;_0x13711b=Math[_0x150c37(0xd6)](_0x13711b),_0x299f8f=Math[_0x150c37(0xd6)](_0x299f8f),VisuMZ[_0x150c37(0x7ac)]['Window_Base_drawCharacter'][_0x150c37(0x5d5)](this,_0x27d0cf,_0x3a95a8,_0x13711b,_0x299f8f);},VisuMZ[_0x5d7dff(0x7ac)]['Window_Selectable_itemRect']=Window_Selectable['prototype'][_0x5d7dff(0x41f)],Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x41f)]=function(_0x1929c7){const _0x4650e6=_0x5d7dff;let _0x51d038=VisuMZ[_0x4650e6(0x7ac)][_0x4650e6(0x313)][_0x4650e6(0x5d5)](this,_0x1929c7);return _0x51d038['x']=Math[_0x4650e6(0xd6)](_0x51d038['x']),_0x51d038['y']=Math[_0x4650e6(0xd6)](_0x51d038['y']),_0x51d038[_0x4650e6(0x47e)]=Math[_0x4650e6(0xd6)](_0x51d038[_0x4650e6(0x47e)]),_0x51d038[_0x4650e6(0x8af)]=Math['round'](_0x51d038[_0x4650e6(0x8af)]),_0x51d038;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x541)]=Window_StatusBase['prototype'][_0x5d7dff(0x196)],Window_StatusBase['prototype'][_0x5d7dff(0x196)]=function(_0x22e8f5,_0x37180d,_0x5ed988){const _0x45a04e=_0x5d7dff;_0x37180d=Math[_0x45a04e(0xd6)](_0x37180d),_0x5ed988=Math['round'](_0x5ed988),VisuMZ['CoreEngine'][_0x45a04e(0x541)][_0x45a04e(0x5d5)](this,_0x22e8f5,_0x37180d,_0x5ed988);},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x6c2)]=function(){const _0x289e55=_0x5d7dff;this[_0x289e55(0x490)]={'duration':0x0,'wholeDuration':0x0,'type':_0x289e55(0x351),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x289e55(0x1c7)]['x'],'targetScaleY':this[_0x289e55(0x1c7)]['y'],'targetOpacity':this[_0x289e55(0x522)],'targetBackOpacity':this[_0x289e55(0x34e)],'targetContentsOpacity':this[_0x289e55(0x491)]};},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x423)]=function(){const _0x413c38=_0x5d7dff;if(!this[_0x413c38(0x490)])return;if(this['_coreEasing'][_0x413c38(0x494)]<=0x0)return;this['x']=this[_0x413c38(0x6fb)](this['x'],this[_0x413c38(0x490)]['targetX']),this['y']=this['applyCoreEasing'](this['y'],this[_0x413c38(0x490)]['targetY']),this[_0x413c38(0x1c7)]['x']=this[_0x413c38(0x6fb)](this['scale']['x'],this['_coreEasing'][_0x413c38(0x612)]),this[_0x413c38(0x1c7)]['y']=this[_0x413c38(0x6fb)](this[_0x413c38(0x1c7)]['y'],this[_0x413c38(0x490)]['targetScaleY']),this[_0x413c38(0x522)]=this[_0x413c38(0x6fb)](this['opacity'],this[_0x413c38(0x490)][_0x413c38(0xd0)]),this['backOpacity']=this[_0x413c38(0x6fb)](this[_0x413c38(0x34e)],this[_0x413c38(0x490)][_0x413c38(0x16e)]),this[_0x413c38(0x491)]=this[_0x413c38(0x6fb)](this[_0x413c38(0x491)],this[_0x413c38(0x490)][_0x413c38(0x7f9)]),this[_0x413c38(0x490)][_0x413c38(0x494)]--;},Window_Base[_0x5d7dff(0x4fa)]['applyCoreEasing']=function(_0x33e4ef,_0x5affe1){const _0x59dd94=_0x5d7dff;if(!this[_0x59dd94(0x490)])return _0x5affe1;const _0xaf9b88=this['_coreEasing'][_0x59dd94(0x494)],_0x4d33e8=this[_0x59dd94(0x490)][_0x59dd94(0x7e1)],_0x4d6e2c=this[_0x59dd94(0x6fd)]((_0x4d33e8-_0xaf9b88)/_0x4d33e8),_0x589a88=this[_0x59dd94(0x6fd)]((_0x4d33e8-_0xaf9b88+0x1)/_0x4d33e8),_0x5ca8e2=(_0x33e4ef-_0x5affe1*_0x4d6e2c)/(0x1-_0x4d6e2c);return _0x5ca8e2+(_0x5affe1-_0x5ca8e2)*_0x589a88;},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x6fd)]=function(_0x41df3e){const _0x515955=_0x5d7dff;if(!this[_0x515955(0x490)])return _0x41df3e;return VisuMZ[_0x515955(0x2fd)](_0x41df3e,this[_0x515955(0x490)][_0x515955(0x215)]||_0x515955(0x351));},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x858)]=function(_0x4571bd,_0x20c099){const _0x2eeca7=_0x5d7dff;if(!this[_0x2eeca7(0x490)])return;this['x']=this['_coreEasing']['targetX'],this['y']=this[_0x2eeca7(0x490)][_0x2eeca7(0x680)],this[_0x2eeca7(0x1c7)]['x']=this['_coreEasing'][_0x2eeca7(0x612)],this[_0x2eeca7(0x1c7)]['y']=this['_coreEasing']['targetScaleY'],this[_0x2eeca7(0x522)]=this[_0x2eeca7(0x490)][_0x2eeca7(0xd0)],this[_0x2eeca7(0x34e)]=this[_0x2eeca7(0x490)][_0x2eeca7(0x16e)],this[_0x2eeca7(0x491)]=this[_0x2eeca7(0x490)]['targetContentsOpacity'],this[_0x2eeca7(0x2ba)](_0x4571bd,_0x20c099,this['x'],this['y'],this[_0x2eeca7(0x1c7)]['x'],this[_0x2eeca7(0x1c7)]['y'],this[_0x2eeca7(0x522)],this[_0x2eeca7(0x34e)],this[_0x2eeca7(0x491)]);},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x2ba)]=function(_0x597354,_0x44824c,_0x520e2c,_0x1f77f7,_0x5dc80a,_0x136e78,_0x5347a8,_0x500ba8,_0x4d5f74){const _0x5ccb38=_0x5d7dff;this[_0x5ccb38(0x490)]={'duration':_0x597354,'wholeDuration':_0x597354,'type':_0x44824c,'targetX':_0x520e2c,'targetY':_0x1f77f7,'targetScaleX':_0x5dc80a,'targetScaleY':_0x136e78,'targetOpacity':_0x5347a8,'targetBackOpacity':_0x500ba8,'targetContentsOpacity':_0x4d5f74};},Window_Base[_0x5d7dff(0x4fa)]['drawCurrencyValue']=function(_0x521540,_0x3026dc,_0x9386c5,_0x17589d,_0x5f56c5){const _0x90fcc6=_0x5d7dff;this['resetFontSettings'](),this['contents'][_0x90fcc6(0x5bc)]=VisuMZ['CoreEngine'][_0x90fcc6(0x37c)]['Gold'][_0x90fcc6(0x2c0)];const _0x59ea4b=VisuMZ[_0x90fcc6(0x7ac)][_0x90fcc6(0x37c)][_0x90fcc6(0x7bf)][_0x90fcc6(0x754)];if(_0x59ea4b>0x0&&_0x3026dc===TextManager[_0x90fcc6(0x4fc)]){const _0x19bbc5=_0x17589d+(this[_0x90fcc6(0x4bf)]()-ImageManager[_0x90fcc6(0x8cc)])/0x2;this[_0x90fcc6(0x618)](_0x59ea4b,_0x9386c5+(_0x5f56c5-ImageManager[_0x90fcc6(0x6ed)]),_0x19bbc5),_0x5f56c5-=ImageManager[_0x90fcc6(0x6ed)]+0x4;}else this['changeTextColor'](ColorManager['systemColor']()),this[_0x90fcc6(0x7f1)](_0x3026dc,_0x9386c5,_0x17589d,_0x5f56c5,_0x90fcc6(0x761)),_0x5f56c5-=this[_0x90fcc6(0x7eb)](_0x3026dc)+0x6;this[_0x90fcc6(0x588)]();const _0x1d8177=this[_0x90fcc6(0x7eb)](this[_0x90fcc6(0x457)]?VisuMZ['GroupDigits'](_0x521540):_0x521540);_0x1d8177>_0x5f56c5?this[_0x90fcc6(0x7f1)](VisuMZ[_0x90fcc6(0x7ac)][_0x90fcc6(0x37c)][_0x90fcc6(0x7bf)][_0x90fcc6(0x62f)],_0x9386c5,_0x17589d,_0x5f56c5,'right'):this[_0x90fcc6(0x7f1)](_0x521540,_0x9386c5,_0x17589d,_0x5f56c5,_0x90fcc6(0x761)),this[_0x90fcc6(0x214)]();},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x69e)]=function(_0x52fb08,_0x4ed540,_0xa0f2b5,_0x295bce,_0x3b9fd6){const _0x319864=_0x5d7dff,_0x12df47=ImageManager[_0x319864(0x12c)](_0x319864(0x7f5)),_0x1ad694=ImageManager[_0x319864(0x6ed)],_0x4837c3=ImageManager[_0x319864(0x8cc)],_0x54a759=_0x52fb08%0x10*_0x1ad694,_0x2d4ba7=Math[_0x319864(0x559)](_0x52fb08/0x10)*_0x4837c3,_0x4653be=_0x295bce,_0x371074=_0x295bce;this[_0x319864(0x673)][_0x319864(0x3dc)][_0x319864(0x14a)]=_0x3b9fd6,this[_0x319864(0x673)][_0x319864(0x6b6)](_0x12df47,_0x54a759,_0x2d4ba7,_0x1ad694,_0x4837c3,_0x4ed540,_0xa0f2b5,_0x4653be,_0x371074),this[_0x319864(0x673)][_0x319864(0x3dc)]['imageSmoothingEnabled']=!![];},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x485)]=function(_0xb3d795,_0x1ed234,_0x1bf168,_0x108cd4,_0x7b2249,_0x31fe0a){const _0x432dd6=_0x5d7dff,_0x403c2b=Math[_0x432dd6(0x559)]((_0x1bf168-0x2)*_0x108cd4),_0x4ecbcc=Sprite_Gauge[_0x432dd6(0x4fa)][_0x432dd6(0x7db)]['call'](this),_0x133720=_0x1ed234+this[_0x432dd6(0x4bf)]()-_0x4ecbcc-0x2;this[_0x432dd6(0x673)][_0x432dd6(0x878)](_0xb3d795,_0x133720,_0x1bf168,_0x4ecbcc,ColorManager[_0x432dd6(0x39e)]()),this[_0x432dd6(0x673)][_0x432dd6(0x762)](_0xb3d795+0x1,_0x133720+0x1,_0x403c2b,_0x4ecbcc-0x2,_0x7b2249,_0x31fe0a);},Window_Scrollable[_0x5d7dff(0x453)]={'enabled':VisuMZ['CoreEngine'][_0x5d7dff(0x37c)][_0x5d7dff(0x448)][_0x5d7dff(0x8d7)]??!![],'thickness':VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x448)]['BarThickness']??0x2,'offset':VisuMZ[_0x5d7dff(0x7ac)]['Settings'][_0x5d7dff(0x448)]['BarOffset']??0x2,'bodyColor':VisuMZ['CoreEngine']['Settings']['Window'][_0x5d7dff(0x7ed)]??0x0,'offColor':VisuMZ['CoreEngine']['Settings'][_0x5d7dff(0x448)][_0x5d7dff(0x548)]??0x7,'offOpacity':VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x448)][_0x5d7dff(0x39f)]??0x80},Window_Base['prototype'][_0x5d7dff(0x66a)]=function(){const _0xbd2ee6=_0x5d7dff;return Window_Scrollable[_0xbd2ee6(0x453)]['enabled']&&Window_Scrollable[_0xbd2ee6(0x453)]['thickness']>0x0;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x4d9)]=Window_Base[_0x5d7dff(0x4fa)]['createContents'],Window_Base['prototype']['createContents']=function(){const _0x388bda=_0x5d7dff;VisuMZ[_0x388bda(0x7ac)][_0x388bda(0x4d9)]['call'](this),this['createScrollBarSprites'](),this[_0x388bda(0x5ac)](!![]),this[_0x388bda(0x5ac)](![]);},Window_Base[_0x5d7dff(0x4fa)]['createScrollBarSprites']=function(){const _0x450611=_0x5d7dff;if(!this[_0x450611(0x66a)]())return;if(this[_0x450611(0x7d8)]||this[_0x450611(0xf9)])return;this[_0x450611(0x711)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x450611(0x7d8)]=new Sprite(),this['_scrollBarVert']=new Sprite(),this[_0x450611(0x6e6)](this[_0x450611(0x7d8)]),this[_0x450611(0x6e6)](this[_0x450611(0xf9)]);},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x5ac)]=function(_0xe06890){const _0x351cc7=_0x5d7dff,_0x5ebe9e=_0xe06890?this['_scrollBarHorz']:this[_0x351cc7(0xf9)];if(!_0x5ebe9e)return;const _0x463135=Window_Scrollable[_0x351cc7(0x453)],_0x3ef38e=_0x463135[_0x351cc7(0x34d)],_0x197118=_0xe06890?this[_0x351cc7(0x525)]-_0x3ef38e*0x2:_0x3ef38e,_0x363642=_0xe06890?_0x3ef38e:this[_0x351cc7(0x65e)]-_0x3ef38e*0x2;_0x5ebe9e[_0x351cc7(0x78d)]=new Bitmap(_0x197118,_0x363642),_0x5ebe9e[_0x351cc7(0x64a)](0x0,0x0,_0x197118,_0x363642),this[_0x351cc7(0x33f)](_0xe06890);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x8c2)]=Window_Base[_0x5d7dff(0x4fa)]['destroyContents'],Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x6d8)]=function(){const _0x4c43e1=_0x5d7dff;VisuMZ[_0x4c43e1(0x7ac)][_0x4c43e1(0x8c2)]['call'](this),this[_0x4c43e1(0x6c1)]();},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x6c1)]=function(){const _0x65e1a7=_0x5d7dff,_0x6c674=[this[_0x65e1a7(0x7d8)],this[_0x65e1a7(0xf9)]];for(const _0x2272f4 of _0x6c674){if(_0x2272f4&&_0x2272f4[_0x65e1a7(0x78d)])_0x2272f4[_0x65e1a7(0x78d)][_0x65e1a7(0x7f8)]();}},VisuMZ['CoreEngine'][_0x5d7dff(0x4a0)]=Window_Scrollable[_0x5d7dff(0x4fa)][_0x5d7dff(0x75f)],Window_Scrollable[_0x5d7dff(0x4fa)]['update']=function(){const _0x49678d=_0x5d7dff;VisuMZ[_0x49678d(0x7ac)][_0x49678d(0x4a0)][_0x49678d(0x5d5)](this),this[_0x49678d(0x518)]();},Window_Scrollable[_0x5d7dff(0x4fa)]['updateScrollBars']=function(){const _0x351d2d=_0x5d7dff;this[_0x351d2d(0x35e)](),this[_0x351d2d(0x258)](!![]),this['checkScrollBarBitmap'](![]),this[_0x351d2d(0x33f)](!![]),this[_0x351d2d(0x33f)](![]);},Window_Scrollable[_0x5d7dff(0x4fa)][_0x5d7dff(0x35e)]=function(){const _0x48db71=_0x5d7dff,_0x7a4c2=[this[_0x48db71(0x7d8)],this[_0x48db71(0xf9)]];for(const _0x1b2793 of _0x7a4c2){_0x1b2793&&(_0x1b2793[_0x48db71(0x267)]=this[_0x48db71(0x66a)]()&&this['isOpen']());}},Window_Scrollable[_0x5d7dff(0x4fa)]['checkScrollBarBitmap']=function(_0x453a12){const _0x6fa6f5=_0x5d7dff;if(!this[_0x6fa6f5(0x711)])return;const _0xcd2a0c=this['scrollbar'](_0x453a12),_0x445025=this['maxScrollbar'](_0x453a12),_0x53d200=_0x453a12?_0x6fa6f5(0x2b3):'vert',_0x1dc085=_0x453a12?'maxHorz':_0x6fa6f5(0x866);(this[_0x6fa6f5(0x711)][_0x53d200]!==_0xcd2a0c||this[_0x6fa6f5(0x711)][_0x1dc085]!==_0x445025)&&(this[_0x6fa6f5(0x711)][_0x53d200]=_0xcd2a0c,this[_0x6fa6f5(0x711)][_0x1dc085]=_0x445025,this[_0x6fa6f5(0x5c3)](_0x453a12,_0xcd2a0c,_0x445025));},Window_Scrollable[_0x5d7dff(0x4fa)][_0x5d7dff(0x235)]=function(_0x1c01c3){const _0x360099=_0x5d7dff;if(this['_allTextHeight']!==undefined)return _0x1c01c3?this[_0x360099(0x37d)]():this['origin']['y'];return _0x1c01c3?this[_0x360099(0x37d)]():this[_0x360099(0x337)]();},Window_Scrollable[_0x5d7dff(0x4fa)][_0x5d7dff(0x2af)]=function(_0x3e38dc){const _0x329cb5=_0x5d7dff;if(this['_allTextHeight']!==undefined)return _0x3e38dc?this[_0x329cb5(0x55a)]():Math[_0x329cb5(0xee)](0x0,this[_0x329cb5(0x6b2)]-this[_0x329cb5(0x65e)]);return _0x3e38dc?this[_0x329cb5(0x55a)]():this[_0x329cb5(0x135)]();},Window_Scrollable[_0x5d7dff(0x4fa)][_0x5d7dff(0x5f7)]=function(){const _0x53839e=_0x5d7dff;if(this[_0x53839e(0x6b2)]!==undefined)return Math[_0x53839e(0xee)](0x0,this[_0x53839e(0x6b2)]);return this[_0x53839e(0x5e9)]();},Window_Scrollable[_0x5d7dff(0x4fa)][_0x5d7dff(0x5c3)]=function(_0x4c3189,_0x496251,_0x1ee9e2){const _0x5c4939=_0x5d7dff,_0x30d3ee=_0x4c3189?this[_0x5c4939(0x7d8)]:this[_0x5c4939(0xf9)];if(!_0x30d3ee)return;if(!_0x30d3ee[_0x5c4939(0x78d)])return;const _0x1db402=_0x30d3ee[_0x5c4939(0x78d)];_0x1db402[_0x5c4939(0x577)]();if(_0x1ee9e2<=0x0)return;const _0x1ee133=_0x4c3189?this['innerWidth']/this[_0x5c4939(0x16f)]():this[_0x5c4939(0x65e)]/this[_0x5c4939(0x5f7)](),_0x202f29=_0x4c3189?Math[_0x5c4939(0xd6)](_0x496251*_0x1ee133):0x0,_0x52764b=_0x4c3189?0x0:Math['round'](_0x496251*_0x1ee133),_0x46e7c1=_0x4c3189?Math['round'](_0x1db402[_0x5c4939(0x47e)]*_0x1ee133):_0x1db402[_0x5c4939(0x47e)],_0x298476=_0x4c3189?_0x1db402[_0x5c4939(0x8af)]:Math[_0x5c4939(0xd6)](_0x1db402[_0x5c4939(0x8af)]*_0x1ee133),_0x4c9a18=Window_Scrollable['SCROLLBAR'],_0x417a0f=ColorManager['getColor'](_0x4c9a18[_0x5c4939(0x572)]),_0x2abb9f=ColorManager[_0x5c4939(0x803)](_0x4c9a18[_0x5c4939(0x709)]),_0x1e5f62=_0x4c9a18[_0x5c4939(0x160)];_0x1db402[_0x5c4939(0x85d)]=_0x1e5f62,_0x1db402[_0x5c4939(0x328)](_0x417a0f),_0x1db402['paintOpacity']=0xff,_0x1db402[_0x5c4939(0x878)](_0x202f29,_0x52764b,_0x46e7c1,_0x298476,_0x2abb9f);},Window_Base[_0x5d7dff(0x4fa)]['updateScrollBarPosition']=function(_0x2358a8){const _0x121d86=_0x5d7dff,_0x2cdd1b=_0x2358a8?this[_0x121d86(0x7d8)]:this[_0x121d86(0xf9)];if(!_0x2cdd1b)return;const _0xfd425e=Window_Scrollable[_0x121d86(0x453)],_0x446a68=_0xfd425e[_0x121d86(0x34d)],_0x4e8a2a=_0xfd425e[_0x121d86(0x616)];if(!_0x2cdd1b[_0x121d86(0x47d)])return;_0x2cdd1b['x']=this[_0x121d86(0x79f)]+(_0x2358a8?_0x446a68:this[_0x121d86(0x525)]+_0x4e8a2a),_0x2cdd1b['y']=this[_0x121d86(0x79f)]+(_0x2358a8?this[_0x121d86(0x65e)]+_0x4e8a2a:_0x446a68);},Window_Selectable['prototype'][_0x5d7dff(0x5f0)]=function(_0x570ae6){const _0x4194a5=_0x5d7dff;let _0x3d14ec=this['index']();const _0x2ad40b=this[_0x4194a5(0x320)](),_0x51d7e0=this[_0x4194a5(0x720)]();if(this[_0x4194a5(0x732)]()&&(_0x3d14ec<_0x2ad40b||_0x570ae6&&_0x51d7e0===0x1)){_0x3d14ec+=_0x51d7e0;if(_0x3d14ec>=_0x2ad40b)_0x3d14ec=_0x2ad40b-0x1;this['smoothSelect'](_0x3d14ec);}else!this[_0x4194a5(0x732)]()&&((_0x3d14ec<_0x2ad40b-_0x51d7e0||_0x570ae6&&_0x51d7e0===0x1)&&this[_0x4194a5(0x23e)]((_0x3d14ec+_0x51d7e0)%_0x2ad40b));},VisuMZ[_0x5d7dff(0x7ac)]['Window_Selectable_cursorDown']=Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x5f0)],Window_Selectable['prototype'][_0x5d7dff(0x5f0)]=function(_0x5f3a37){const _0x468364=_0x5d7dff;this[_0x468364(0x732)]()&&_0x5f3a37&&this['maxCols']()===0x1&&this[_0x468364(0x1f7)]()===this[_0x468364(0x320)]()-0x1?this[_0x468364(0x23e)](0x0):VisuMZ[_0x468364(0x7ac)][_0x468364(0x838)]['call'](this,_0x5f3a37);},Window_Selectable['prototype'][_0x5d7dff(0x6ff)]=function(_0x3f4ed9){const _0x4bbdb9=_0x5d7dff;let _0x53e583=Math['max'](0x0,this['index']());const _0x183d22=this['maxItems'](),_0x4df1db=this[_0x4bbdb9(0x720)]();if(this[_0x4bbdb9(0x732)]()&&_0x53e583>0x0||_0x3f4ed9&&_0x4df1db===0x1){_0x53e583-=_0x4df1db;if(_0x53e583<=0x0)_0x53e583=0x0;this['smoothSelect'](_0x53e583);}else!this[_0x4bbdb9(0x732)]()&&((_0x53e583>=_0x4df1db||_0x3f4ed9&&_0x4df1db===0x1)&&this['smoothSelect']((_0x53e583-_0x4df1db+_0x183d22)%_0x183d22));},VisuMZ['CoreEngine']['Window_Selectable_cursorUp']=Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x6ff)],Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x6ff)]=function(_0x1b716c){const _0x26812c=_0x5d7dff;this[_0x26812c(0x732)]()&&_0x1b716c&&this[_0x26812c(0x720)]()===0x1&&this[_0x26812c(0x1f7)]()===0x0?this[_0x26812c(0x23e)](this[_0x26812c(0x320)]()-0x1):VisuMZ[_0x26812c(0x7ac)][_0x26812c(0x535)][_0x26812c(0x5d5)](this,_0x1b716c);},Window_Selectable['prototype'][_0x5d7dff(0x732)]=function(){const _0x3eff15=_0x5d7dff;return VisuMZ[_0x3eff15(0x7ac)][_0x3eff15(0x37c)][_0x3eff15(0x116)][_0x3eff15(0x15c)];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x867)]=Window_Selectable[_0x5d7dff(0x4fa)]['processCursorMove'],Window_Selectable['prototype'][_0x5d7dff(0x868)]=function(){const _0x26910d=_0x5d7dff;this['isUseModernControls']()?(this['processCursorMoveModernControls'](),this[_0x26910d(0x272)]()):VisuMZ[_0x26910d(0x7ac)][_0x26910d(0x867)][_0x26910d(0x5d5)](this);},Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x643)]=function(){return!![];},Window_Selectable['prototype'][_0x5d7dff(0x897)]=function(){const _0x2751f0=_0x5d7dff;if(this[_0x2751f0(0x241)]()){const _0x4157d7=this[_0x2751f0(0x1f7)]();Input[_0x2751f0(0x735)](_0x2751f0(0x3cc))&&(Input[_0x2751f0(0x150)](_0x2751f0(0x226))&&this[_0x2751f0(0x643)]()?this[_0x2751f0(0x5db)]():this[_0x2751f0(0x5f0)](Input[_0x2751f0(0x7c8)](_0x2751f0(0x3cc)))),Input[_0x2751f0(0x735)]('up')&&(Input[_0x2751f0(0x150)](_0x2751f0(0x226))&&this['allowShiftScrolling']()?this[_0x2751f0(0x53d)]():this[_0x2751f0(0x6ff)](Input[_0x2751f0(0x7c8)]('up'))),Input[_0x2751f0(0x735)](_0x2751f0(0x761))&&this[_0x2751f0(0x5eb)](Input[_0x2751f0(0x7c8)]('right')),Input[_0x2751f0(0x735)]('left')&&this[_0x2751f0(0xc0)](Input[_0x2751f0(0x7c8)](_0x2751f0(0x63c))),!this[_0x2751f0(0x80f)](_0x2751f0(0xe5))&&Input[_0x2751f0(0x735)](_0x2751f0(0xe5))&&this['cursorPagedown'](),!this[_0x2751f0(0x80f)]('pageup')&&Input[_0x2751f0(0x735)](_0x2751f0(0x786))&&this[_0x2751f0(0x53d)](),this['index']()!==_0x4157d7&&this['playCursorSound']();}},Window_Selectable['prototype'][_0x5d7dff(0x272)]=function(){const _0x536516=_0x5d7dff;if(this[_0x536516(0x241)]()){const _0x33946f=this[_0x536516(0x1f7)]();Input[_0x536516(0x7c8)](_0x536516(0x1c8))&&this[_0x536516(0x23e)](Math[_0x536516(0x172)](this[_0x536516(0x1f7)](),0x0)),Input[_0x536516(0x7c8)](_0x536516(0x164))&&this[_0x536516(0x23e)](Math['max'](this[_0x536516(0x1f7)](),this['maxItems']()-0x1)),this['index']()!==_0x33946f&&this[_0x536516(0x1f3)]();}},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x689)]=Window_Selectable['prototype'][_0x5d7dff(0x5ef)],Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x5ef)]=function(){const _0x2b22f2=_0x5d7dff;this[_0x2b22f2(0x732)]()?this[_0x2b22f2(0x6b8)]():VisuMZ[_0x2b22f2(0x7ac)]['Window_Selectable_processTouch'][_0x2b22f2(0x5d5)](this);},Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x6b8)]=function(){const _0x48c052=_0x5d7dff;VisuMZ['CoreEngine']['Window_Selectable_processTouch'][_0x48c052(0x5d5)](this);},Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x429)]=function(){const _0x75e062=_0x5d7dff;return VisuMZ[_0x75e062(0x7ac)][_0x75e062(0x37c)][_0x75e062(0x448)]['ColSpacing'];},Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x644)]=function(){const _0x1cac91=_0x5d7dff;return VisuMZ[_0x1cac91(0x7ac)][_0x1cac91(0x37c)]['Window'][_0x1cac91(0x655)];},Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x85a)]=function(){const _0x2ec4b0=_0x5d7dff;return Window_Scrollable[_0x2ec4b0(0x4fa)]['itemHeight'][_0x2ec4b0(0x5d5)](this)+VisuMZ[_0x2ec4b0(0x7ac)][_0x2ec4b0(0x37c)][_0x2ec4b0(0x448)][_0x2ec4b0(0x1ff)];;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x32a)]=Window_Selectable[_0x5d7dff(0x4fa)][_0x5d7dff(0x795)],Window_Selectable[_0x5d7dff(0x4fa)]['drawBackgroundRect']=function(_0x56085b){const _0x328b64=_0x5d7dff,_0x1c748d=VisuMZ[_0x328b64(0x7ac)][_0x328b64(0x37c)][_0x328b64(0x448)];if(_0x1c748d['ShowItemBackground']===![])return;_0x1c748d[_0x328b64(0x887)]?_0x1c748d['DrawItemBackgroundJS'][_0x328b64(0x5d5)](this,_0x56085b):VisuMZ['CoreEngine'][_0x328b64(0x32a)][_0x328b64(0x5d5)](this,_0x56085b);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x4b8)]=Window_Gold[_0x5d7dff(0x4fa)][_0x5d7dff(0x34c)],Window_Gold[_0x5d7dff(0x4fa)]['refresh']=function(){const _0xe4694c=_0x5d7dff;this[_0xe4694c(0x5e8)]()?this['drawGoldItemStyle']():VisuMZ[_0xe4694c(0x7ac)]['Window_Gold_refresh'][_0xe4694c(0x5d5)](this);},Window_Gold[_0x5d7dff(0x4fa)][_0x5d7dff(0x5e8)]=function(){const _0x31c6ce=_0x5d7dff;if(TextManager[_0x31c6ce(0x4fc)]!==this[_0x31c6ce(0x4fc)]())return![];return VisuMZ[_0x31c6ce(0x7ac)]['Settings'][_0x31c6ce(0x7bf)]['ItemStyle'];},Window_Gold[_0x5d7dff(0x4fa)]['drawGoldItemStyle']=function(){const _0x2f2358=_0x5d7dff;this[_0x2f2358(0x214)](),this[_0x2f2358(0x673)]['clear'](),this['contents'][_0x2f2358(0x5bc)]=VisuMZ[_0x2f2358(0x7ac)][_0x2f2358(0x37c)][_0x2f2358(0x7bf)]['GoldFontSize'];const _0x3c2e09=VisuMZ['CoreEngine'][_0x2f2358(0x37c)][_0x2f2358(0x7bf)][_0x2f2358(0x754)],_0x1f3d06=this['itemLineRect'](0x0);if(_0x3c2e09>0x0){const _0x59bb88=ImageManager['standardIconWidth']||0x20,_0x409e98=_0x59bb88-ImageManager[_0x2f2358(0x6ed)],_0x38be6a=_0x1f3d06['y']+(this[_0x2f2358(0x4bf)]()-ImageManager[_0x2f2358(0x8cc)])/0x2;this[_0x2f2358(0x618)](_0x3c2e09,_0x1f3d06['x']+Math[_0x2f2358(0x5c6)](_0x409e98/0x2),_0x38be6a);const _0x344f01=_0x59bb88+0x4;_0x1f3d06['x']+=_0x344f01,_0x1f3d06[_0x2f2358(0x47e)]-=_0x344f01;}this['changeTextColor'](ColorManager[_0x2f2358(0x1b2)]()),this[_0x2f2358(0x7f1)](this[_0x2f2358(0x4fc)](),_0x1f3d06['x'],_0x1f3d06['y'],_0x1f3d06[_0x2f2358(0x47e)],_0x2f2358(0x63c));const _0x4161b6=this['textWidth'](this[_0x2f2358(0x4fc)]())+0x6;;_0x1f3d06['x']+=_0x4161b6,_0x1f3d06[_0x2f2358(0x47e)]-=_0x4161b6,this[_0x2f2358(0x588)]();const _0x4a2f9e=this[_0x2f2358(0x3a8)](),_0x166493=this[_0x2f2358(0x7eb)](this[_0x2f2358(0x457)]?VisuMZ[_0x2f2358(0x53c)](this[_0x2f2358(0x3a8)]()):this['value']());_0x166493>_0x1f3d06['width']?this[_0x2f2358(0x7f1)](VisuMZ[_0x2f2358(0x7ac)][_0x2f2358(0x37c)]['Gold'][_0x2f2358(0x62f)],_0x1f3d06['x'],_0x1f3d06['y'],_0x1f3d06[_0x2f2358(0x47e)],'right'):this[_0x2f2358(0x7f1)](this[_0x2f2358(0x3a8)](),_0x1f3d06['x'],_0x1f3d06['y'],_0x1f3d06['width'],_0x2f2358(0x761)),this[_0x2f2358(0x214)]();},Window_StatusBase['prototype'][_0x5d7dff(0x2a4)]=function(_0x4eacaf,_0x7b3bc6,_0x554bb4,_0x44629e,_0x50bb0b){const _0x59a2e9=_0x5d7dff;_0x44629e=String(_0x44629e||'')[_0x59a2e9(0x496)]();if(VisuMZ[_0x59a2e9(0x7ac)][_0x59a2e9(0x37c)][_0x59a2e9(0x3b6)][_0x59a2e9(0x4f7)]){const _0x41cdd6=VisuMZ['GetParamIcon'](_0x44629e);if(_0x50bb0b)this[_0x59a2e9(0x69e)](_0x41cdd6,_0x4eacaf,_0x7b3bc6,this[_0x59a2e9(0x884)]()),_0x554bb4-=this['gaugeLineHeight']()+0x2,_0x4eacaf+=this[_0x59a2e9(0x884)]()+0x2;else{const _0x25a0e2=ImageManager[_0x59a2e9(0x5f3)]||0x20,_0x413b93=ImageManager['standardIconHeight']||0x20,_0x2a7ef1=_0x25a0e2-ImageManager['iconWidth'],_0x34eb8d=_0x413b93-ImageManager[_0x59a2e9(0x8cc)];let _0x502064=0x2,_0x4ba79a=0x2;this[_0x59a2e9(0x4bf)]()!==0x24&&(_0x4ba79a=Math[_0x59a2e9(0x559)]((this['lineHeight']()-_0x413b93)/0x2));const _0x3c44d5=_0x4eacaf+Math[_0x59a2e9(0x559)](_0x2a7ef1/0x2)+_0x502064,_0x108b15=_0x7b3bc6+Math[_0x59a2e9(0x559)](_0x34eb8d/0x2)+_0x4ba79a;this[_0x59a2e9(0x618)](_0x41cdd6,_0x3c44d5,_0x108b15),_0x554bb4-=_0x25a0e2+0x4,_0x4eacaf+=_0x25a0e2+0x4;}}const _0x39d6a4=TextManager[_0x59a2e9(0x314)](_0x44629e);this['resetFontSettings'](),this[_0x59a2e9(0x5ff)](ColorManager[_0x59a2e9(0x1b2)]()),_0x50bb0b?(this['contents'][_0x59a2e9(0x5bc)]=this[_0x59a2e9(0x28c)](),this[_0x59a2e9(0x673)]['drawText'](_0x39d6a4,_0x4eacaf,_0x7b3bc6,_0x554bb4,this[_0x59a2e9(0x884)](),_0x59a2e9(0x63c))):this[_0x59a2e9(0x7f1)](_0x39d6a4,_0x4eacaf,_0x7b3bc6,_0x554bb4),this['resetFontSettings']();},Window_StatusBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x28c)]=function(){const _0x5539b8=_0x5d7dff;return $gameSystem[_0x5539b8(0x2c2)]()-0x8;},Window_StatusBase['prototype'][_0x5d7dff(0x2c8)]=function(_0xace90f,_0x18eb8c,_0x286bd5,_0x21bc87){const _0x242086=_0x5d7dff;_0x21bc87=_0x21bc87||0xa8,this[_0x242086(0x588)]();if(VisuMZ['CoreEngine'][_0x242086(0x37c)]['UI']['TextCodeClassNames'])this[_0x242086(0x783)](_0xace90f[_0x242086(0x807)]()[_0x242086(0x814)],_0x18eb8c,_0x286bd5,_0x21bc87);else{const _0x281c5a=_0xace90f['currentClass']()[_0x242086(0x814)][_0x242086(0x613)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x281c5a,_0x18eb8c,_0x286bd5,_0x21bc87);}},Window_StatusBase['prototype'][_0x5d7dff(0x615)]=function(_0x4a7420,_0x5b846e,_0x3ad28f,_0x2fc2ad){const _0x2fe60e=_0x5d7dff;_0x2fc2ad=_0x2fc2ad||0x10e,this[_0x2fe60e(0x588)]();if(VisuMZ[_0x2fe60e(0x7ac)]['Settings']['UI'][_0x2fe60e(0x30e)])this[_0x2fe60e(0x783)](_0x4a7420[_0x2fe60e(0x8b5)](),_0x5b846e,_0x3ad28f,_0x2fc2ad);else{const _0x2c6b54=_0x4a7420[_0x2fe60e(0x8b5)]()[_0x2fe60e(0x613)](/\\I\[(\d+)\]/gi,'');this[_0x2fe60e(0x7f1)](_0x4a7420[_0x2fe60e(0x8b5)](),_0x5b846e,_0x3ad28f,_0x2fc2ad);}},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x543)]=Window_StatusBase['prototype'][_0x5d7dff(0x756)],Window_StatusBase['prototype'][_0x5d7dff(0x756)]=function(_0x2df9d8,_0x3e057f,_0x57ff4d){const _0x5abd15=_0x5d7dff;if(VisuMZ[_0x5abd15(0x7ac)]['Settings'][_0x5abd15(0x3b6)]['ShowActorLevel']===![])return;if(this[_0x5abd15(0x49b)]())this['drawActorExpGauge'](_0x2df9d8,_0x3e057f,_0x57ff4d);VisuMZ['CoreEngine']['Window_StatusBase_drawActorLevel']['call'](this,_0x2df9d8,_0x3e057f,_0x57ff4d);},Window_StatusBase[_0x5d7dff(0x4fa)]['isExpGaugeDrawn']=function(){const _0x224a5a=_0x5d7dff;return VisuMZ[_0x224a5a(0x7ac)][_0x224a5a(0x37c)]['UI']['LvExpGauge'];},Window_StatusBase[_0x5d7dff(0x4fa)][_0x5d7dff(0xf2)]=function(_0x18fecb,_0x2b8ab2,_0x21497f){const _0x1e2c33=_0x5d7dff;if(!_0x18fecb)return;if(!_0x18fecb[_0x1e2c33(0x86e)]())return;const _0x30532e=0x80,_0x4191ef=_0x18fecb[_0x1e2c33(0xcc)]();let _0x1ff6ff=ColorManager[_0x1e2c33(0x2ea)](),_0x39ced8=ColorManager[_0x1e2c33(0x2cf)]();_0x4191ef>=0x1&&(_0x1ff6ff=ColorManager['maxLvGaugeColor1'](),_0x39ced8=ColorManager[_0x1e2c33(0x227)]()),this['drawGauge'](_0x2b8ab2,_0x21497f,_0x30532e,_0x4191ef,_0x1ff6ff,_0x39ced8);},Window_EquipStatus[_0x5d7dff(0x4fa)][_0x5d7dff(0x4a7)]=function(){const _0x492183=_0x5d7dff;let _0x18584b=0x0;for(const _0x2b6fa6 of VisuMZ['CoreEngine']['Settings'][_0x492183(0x3b6)][_0x492183(0x242)]){const _0x2eb7ca=this['itemPadding'](),_0x59ee22=this['paramY'](_0x18584b);this[_0x492183(0x412)](_0x2eb7ca,_0x59ee22,_0x2b6fa6),_0x18584b++;}},Window_EquipStatus[_0x5d7dff(0x4fa)][_0x5d7dff(0x789)]=function(_0x3d6326,_0x1a944f,_0x49e840){const _0x1bfa28=_0x5d7dff,_0x400ab2=this[_0x1bfa28(0x7e4)]()-this[_0x1bfa28(0x726)]()*0x2;this[_0x1bfa28(0x2a4)](_0x3d6326,_0x1a944f,_0x400ab2,_0x49e840,![]);},Window_EquipStatus['prototype']['drawCurrentParam']=function(_0x1818f5,_0x13bf5f,_0x273705){const _0x2d5870=_0x5d7dff,_0x5acd49=this[_0x2d5870(0x68f)]();this['resetTextColor'](),this['drawText'](this[_0x2d5870(0x35c)]['paramValueByName'](_0x273705,!![]),_0x1818f5,_0x13bf5f,_0x5acd49,_0x2d5870(0x761));},Window_EquipStatus['prototype'][_0x5d7dff(0x442)]=function(_0x28e38d,_0x3b82cb){const _0x2b73a4=_0x5d7dff,_0x2f4c32=this[_0x2b73a4(0x7e3)]();this[_0x2b73a4(0x5ff)](ColorManager[_0x2b73a4(0x1b2)]());const _0x56f68e=VisuMZ[_0x2b73a4(0x7ac)][_0x2b73a4(0x37c)]['UI'][_0x2b73a4(0x243)];this[_0x2b73a4(0x7f1)](_0x56f68e,_0x28e38d,_0x3b82cb,_0x2f4c32,'center');},Window_EquipStatus['prototype'][_0x5d7dff(0x166)]=function(_0x4994d2,_0x36b4d7,_0x44379b){const _0x4ed276=_0x5d7dff,_0x544ae3=this[_0x4ed276(0x68f)](),_0x2407d7=this[_0x4ed276(0x3e1)][_0x4ed276(0xd5)](_0x44379b),_0x1ce8d5=_0x2407d7-this['_actor']['paramValueByName'](_0x44379b);this[_0x4ed276(0x5ff)](ColorManager[_0x4ed276(0x3f9)](_0x1ce8d5)),this[_0x4ed276(0x7f1)](this[_0x4ed276(0x3e1)][_0x4ed276(0xd5)](_0x44379b,!![]),_0x4994d2,_0x36b4d7,_0x544ae3,'right');},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x51d)]=Window_EquipItem[_0x5d7dff(0x4fa)][_0x5d7dff(0x137)],Window_EquipItem[_0x5d7dff(0x4fa)][_0x5d7dff(0x137)]=function(_0x471b98){const _0x2078c7=_0x5d7dff;return _0x471b98&&this[_0x2078c7(0x35c)]?this[_0x2078c7(0x35c)][_0x2078c7(0x865)](_0x471b98):VisuMZ[_0x2078c7(0x7ac)][_0x2078c7(0x51d)][_0x2078c7(0x5d5)](this,_0x471b98);},Window_StatusParams[_0x5d7dff(0x4fa)]['maxItems']=function(){const _0x1c796f=_0x5d7dff;return VisuMZ[_0x1c796f(0x7ac)][_0x1c796f(0x37c)][_0x1c796f(0x3b6)][_0x1c796f(0x242)][_0x1c796f(0xfd)];},Window_StatusParams['prototype'][_0x5d7dff(0x412)]=function(_0x3ab313){const _0x262ddc=_0x5d7dff,_0x2251c7=this[_0x262ddc(0x392)](_0x3ab313),_0x4c390b=VisuMZ[_0x262ddc(0x7ac)][_0x262ddc(0x37c)]['Param'][_0x262ddc(0x242)][_0x3ab313],_0x1cc905=TextManager[_0x262ddc(0x314)](_0x4c390b),_0x5b6c40=this[_0x262ddc(0x35c)][_0x262ddc(0xd5)](_0x4c390b,!![]);this['drawParamText'](_0x2251c7['x'],_0x2251c7['y'],0xa0,_0x4c390b,![]),this[_0x262ddc(0x588)](),this[_0x262ddc(0x7f1)](_0x5b6c40,_0x2251c7['x']+0xa0,_0x2251c7['y'],0x3c,_0x262ddc(0x761));};if(VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x59a)][_0x5d7dff(0x367)]){VisuMZ[_0x5d7dff(0x7ac)]['Settings']['KeyboardInput'][_0x5d7dff(0x4f9)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20',_0x5d7dff(0x2cb),'OK']);;VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x7cd)]=Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)],Window_NameInput[_0x5d7dff(0x4fa)]['initialize']=function(_0x4dd1de){const _0x55a015=_0x5d7dff;this[_0x55a015(0x85b)]=this['defaultInputMode'](),VisuMZ[_0x55a015(0x7ac)]['Window_NameInput_initialize'][_0x55a015(0x5d5)](this,_0x4dd1de),this[_0x55a015(0x85b)]===_0x55a015(0x6f7)?this[_0x55a015(0x189)](0x0):(Input[_0x55a015(0x577)](),this['deselect']());},Window_NameInput[_0x5d7dff(0x4fa)]['defaultInputMode']=function(){const _0x2a8697=_0x5d7dff;if(Input[_0x2a8697(0x7c7)]())return _0x2a8697(0x6f7);return VisuMZ[_0x2a8697(0x7ac)][_0x2a8697(0x37c)]['KeyboardInput'][_0x2a8697(0x22e)]||_0x2a8697(0x82d);},VisuMZ['CoreEngine']['Window_NameInput_processHandling']=Window_NameInput['prototype'][_0x5d7dff(0x43f)],Window_NameInput[_0x5d7dff(0x4fa)]['processHandling']=function(){const _0x34d172=_0x5d7dff;if(!this[_0x34d172(0x1ca)]())return;if(!this[_0x34d172(0x411)])return;if(this[_0x34d172(0x85b)]===_0x34d172(0x82d)&&Input['isGamepadTriggered']())this[_0x34d172(0x478)]('default');else{if(Input[_0x34d172(0x584)](_0x34d172(0xc3)))Input[_0x34d172(0x577)](),this[_0x34d172(0x45e)]();else{if(Input[_0x34d172(0x7c8)](_0x34d172(0x7cb)))Input[_0x34d172(0x577)](),this[_0x34d172(0x85b)]===_0x34d172(0x82d)?this[_0x34d172(0x478)]('default'):this['switchModes'](_0x34d172(0x82d));else{if(this['_mode']==='keyboard')this[_0x34d172(0x859)]();else Input[_0x34d172(0x584)](_0x34d172(0x877))?(Input[_0x34d172(0x577)](),this[_0x34d172(0x478)](_0x34d172(0x82d))):VisuMZ[_0x34d172(0x7ac)][_0x34d172(0x62a)][_0x34d172(0x5d5)](this);}}}},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x57f)]=Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x5ef)],Window_NameInput['prototype'][_0x5d7dff(0x5ef)]=function(){const _0x3f1bd3=_0x5d7dff;if(!this[_0x3f1bd3(0x206)]())return;if(this[_0x3f1bd3(0x85b)]===_0x3f1bd3(0x82d)){if(TouchInput[_0x3f1bd3(0x7c8)]()&&this[_0x3f1bd3(0x3de)]())this[_0x3f1bd3(0x478)](_0x3f1bd3(0x6f7));else TouchInput[_0x3f1bd3(0x39c)]()&&this[_0x3f1bd3(0x478)]('default');}else VisuMZ[_0x3f1bd3(0x7ac)][_0x3f1bd3(0x57f)][_0x3f1bd3(0x5d5)](this);},Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x859)]=function(){const _0x1f829f=_0x5d7dff;if(Input[_0x1f829f(0x584)]('enter'))Input[_0x1f829f(0x577)](),this['onNameOk']();else{if(Input[_0x1f829f(0x51a)]!==undefined){let _0x462673=Input[_0x1f829f(0x51a)],_0x3eba9b=_0x462673[_0x1f829f(0xfd)];for(let _0x5103ac=0x0;_0x5103ac<_0x3eba9b;++_0x5103ac){this[_0x1f829f(0x834)][_0x1f829f(0x5fd)](_0x462673[_0x5103ac])?SoundManager['playOk']():SoundManager[_0x1f829f(0x125)]();}Input['clear']();}}},Window_NameInput[_0x5d7dff(0x4fa)]['switchModes']=function(_0x40673c){const _0x103f09=_0x5d7dff;let _0xd4f01=this[_0x103f09(0x85b)];this['_mode']=_0x40673c,_0xd4f01!==this['_mode']&&(this[_0x103f09(0x34c)](),SoundManager[_0x103f09(0x3a1)](),this['_mode']==='default'?this[_0x103f09(0x189)](0x0):this[_0x103f09(0x189)](-0x1));},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x3a2)]=Window_NameInput['prototype'][_0x5d7dff(0x5f0)],Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x5f0)]=function(_0x472fc5){const _0x29dc68=_0x5d7dff;if(this['_mode']==='keyboard'&&!Input[_0x29dc68(0x2dd)]())return;if(Input[_0x29dc68(0x2f2)]())return;VisuMZ[_0x29dc68(0x7ac)][_0x29dc68(0x3a2)][_0x29dc68(0x5d5)](this,_0x472fc5),this[_0x29dc68(0x478)](_0x29dc68(0x6f7));},VisuMZ[_0x5d7dff(0x7ac)]['Window_NameInput_cursorUp']=Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x6ff)],Window_NameInput['prototype']['cursorUp']=function(_0xe3c570){const _0x12655f=_0x5d7dff;if(this['_mode']==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x12655f(0x2f2)]())return;VisuMZ[_0x12655f(0x7ac)][_0x12655f(0x661)]['call'](this,_0xe3c570),this['switchModes'](_0x12655f(0x6f7));},VisuMZ['CoreEngine'][_0x5d7dff(0x366)]=Window_NameInput['prototype']['cursorRight'],Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x5eb)]=function(_0x40a2c7){const _0x549983=_0x5d7dff;if(this['_mode']===_0x549983(0x82d)&&!Input[_0x549983(0x2dd)]())return;if(Input[_0x549983(0x2f2)]())return;VisuMZ[_0x549983(0x7ac)]['Window_NameInput_cursorRight']['call'](this,_0x40a2c7),this[_0x549983(0x478)](_0x549983(0x6f7));},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x389)]=Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0xc0)],Window_NameInput[_0x5d7dff(0x4fa)]['cursorLeft']=function(_0x46ba1a){const _0x33842b=_0x5d7dff;if(this[_0x33842b(0x85b)]==='keyboard'&&!Input['isArrowPressed']())return;if(Input[_0x33842b(0x2f2)]())return;VisuMZ[_0x33842b(0x7ac)][_0x33842b(0x389)]['call'](this,_0x46ba1a),this['switchModes'](_0x33842b(0x6f7));},VisuMZ['CoreEngine'][_0x5d7dff(0x3f6)]=Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x5db)],Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x5db)]=function(){const _0x176732=_0x5d7dff;if(this['_mode']===_0x176732(0x82d))return;if(Input[_0x176732(0x2f2)]())return;VisuMZ['CoreEngine'][_0x176732(0x3f6)][_0x176732(0x5d5)](this),this[_0x176732(0x478)](_0x176732(0x6f7));},VisuMZ[_0x5d7dff(0x7ac)]['Window_NameInput_cursorPageup']=Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x53d)],Window_NameInput[_0x5d7dff(0x4fa)]['cursorPageup']=function(){const _0x3cfaab=_0x5d7dff;if(this[_0x3cfaab(0x85b)]===_0x3cfaab(0x82d))return;if(Input[_0x3cfaab(0x2f2)]())return;VisuMZ[_0x3cfaab(0x7ac)][_0x3cfaab(0x4e6)][_0x3cfaab(0x5d5)](this),this['switchModes'](_0x3cfaab(0x6f7));},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x702)]=Window_NameInput['prototype'][_0x5d7dff(0x34c)],Window_NameInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x34c)]=function(){const _0x577da6=_0x5d7dff;if(this[_0x577da6(0x85b)]===_0x577da6(0x82d)){this[_0x577da6(0x673)]['clear'](),this[_0x577da6(0x7a7)][_0x577da6(0x577)](),this['resetTextColor']();let _0x425aee=VisuMZ[_0x577da6(0x7ac)][_0x577da6(0x37c)][_0x577da6(0x59a)][_0x577da6(0x147)][_0x577da6(0x767)]('\x0a'),_0x2e862d=_0x425aee['length'],_0x2aa1d6=(this[_0x577da6(0x65e)]-_0x2e862d*this[_0x577da6(0x4bf)]())/0x2;for(let _0x3ddace=0x0;_0x3ddace<_0x2e862d;++_0x3ddace){let _0x226d53=_0x425aee[_0x3ddace],_0x49c8cd=this[_0x577da6(0x3c6)](_0x226d53)[_0x577da6(0x47e)],_0x29fde9=Math['floor']((this[_0x577da6(0x673)][_0x577da6(0x47e)]-_0x49c8cd)/0x2);this[_0x577da6(0x783)](_0x226d53,_0x29fde9,_0x2aa1d6),_0x2aa1d6+=this[_0x577da6(0x4bf)]();}}else VisuMZ[_0x577da6(0x7ac)][_0x577da6(0x702)][_0x577da6(0x5d5)](this);};};VisuMZ['CoreEngine']['Window_ShopSell_isEnabled']=Window_ShopSell[_0x5d7dff(0x4fa)][_0x5d7dff(0x137)],Window_ShopSell[_0x5d7dff(0x4fa)][_0x5d7dff(0x137)]=function(_0x3ac2da){const _0x19b4a3=_0x5d7dff;return VisuMZ[_0x19b4a3(0x7ac)][_0x19b4a3(0x37c)][_0x19b4a3(0x116)][_0x19b4a3(0x48d)]&&DataManager[_0x19b4a3(0x50c)](_0x3ac2da)?![]:VisuMZ[_0x19b4a3(0x7ac)][_0x19b4a3(0x4ce)]['call'](this,_0x3ac2da);},Window_NumberInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x732)]=function(){return![];};VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x59a)][_0x5d7dff(0x1f9)]&&(VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x3ec)]=Window_NumberInput[_0x5d7dff(0x4fa)]['start'],Window_NumberInput['prototype']['start']=function(){const _0x1a7b08=_0x5d7dff;VisuMZ[_0x1a7b08(0x7ac)]['Window_NumberInput_start'][_0x1a7b08(0x5d5)](this),this[_0x1a7b08(0x189)](this[_0x1a7b08(0x31d)]-0x1),Input[_0x1a7b08(0x577)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0xbc)]=Window_NumberInput['prototype']['processDigitChange'],Window_NumberInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x324)]=function(){const _0x136edd=_0x5d7dff;if(!this[_0x136edd(0x206)]())return;if(Input[_0x136edd(0x2f2)]())this[_0x136edd(0x44b)]();else{if(Input[_0x136edd(0x584)](_0x136edd(0xc3)))this[_0x136edd(0x672)]();else{if(Input[_0x136edd(0x4c7)]===0x2e)this[_0x136edd(0x2bf)]();else{if(Input[_0x136edd(0x4c7)]===0x24)this[_0x136edd(0x165)]();else Input[_0x136edd(0x4c7)]===0x23?this[_0x136edd(0x8bf)]():VisuMZ[_0x136edd(0x7ac)][_0x136edd(0xbc)][_0x136edd(0x5d5)](this);}}}},Window_NumberInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x868)]=function(){const _0x24dbb1=_0x5d7dff;if(!this['isCursorMovable']())return;Input[_0x24dbb1(0x2f2)]()?this[_0x24dbb1(0x44b)]():Window_Selectable[_0x24dbb1(0x4fa)][_0x24dbb1(0x868)][_0x24dbb1(0x5d5)](this);},Window_NumberInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x272)]=function(){},Window_NumberInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x44b)]=function(){const _0x4f552e=_0x5d7dff;if(String(this[_0x4f552e(0x5d8)])[_0x4f552e(0xfd)]>=this[_0x4f552e(0x31d)])return;const _0x56b146=Number(String(this[_0x4f552e(0x5d8)])+Input['_inputString']);if(isNaN(_0x56b146))return;this[_0x4f552e(0x5d8)]=_0x56b146;const _0x547504='9'['repeat'](this[_0x4f552e(0x31d)]);this['_number']=this[_0x4f552e(0x5d8)][_0x4f552e(0x3aa)](0x0,_0x547504),Input[_0x4f552e(0x577)](),this[_0x4f552e(0x34c)](),SoundManager[_0x4f552e(0x1b0)](),this[_0x4f552e(0x189)](this[_0x4f552e(0x31d)]-0x1);},Window_NumberInput['prototype'][_0x5d7dff(0x672)]=function(){const _0x1a6548=_0x5d7dff;this['_number']=Number(String(this[_0x1a6548(0x5d8)])[_0x1a6548(0x3f7)](0x0,-0x1)),this['_number']=Math[_0x1a6548(0xee)](0x0,this[_0x1a6548(0x5d8)]),Input[_0x1a6548(0x577)](),this[_0x1a6548(0x34c)](),SoundManager[_0x1a6548(0x1b0)](),this[_0x1a6548(0x189)](this[_0x1a6548(0x31d)]-0x1);},Window_NumberInput['prototype'][_0x5d7dff(0x2bf)]=function(){const _0x36cecf=_0x5d7dff;this[_0x36cecf(0x5d8)]=Number(String(this['_number'])[_0x36cecf(0x5c1)](0x1)),this[_0x36cecf(0x5d8)]=Math[_0x36cecf(0xee)](0x0,this['_number']),Input[_0x36cecf(0x577)](),this[_0x36cecf(0x34c)](),SoundManager[_0x36cecf(0x1b0)](),this[_0x36cecf(0x189)](this[_0x36cecf(0x31d)]-0x1);},Window_NumberInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x165)]=function(){const _0x46a023=_0x5d7dff;if(this[_0x46a023(0x1f7)]()===0x0)return;Input['clear'](),this[_0x46a023(0x34c)](),SoundManager['playCursor'](),this[_0x46a023(0x189)](0x0);},Window_NumberInput[_0x5d7dff(0x4fa)][_0x5d7dff(0x8bf)]=function(){const _0x14f3d4=_0x5d7dff;if(this['index']()===this['_maxDigits']-0x1)return;Input[_0x14f3d4(0x577)](),this['refresh'](),SoundManager['playCursor'](),this['select'](this['_maxDigits']-0x1);});;VisuMZ[_0x5d7dff(0x7ac)]['Window_MapName_refresh']=Window_MapName[_0x5d7dff(0x4fa)][_0x5d7dff(0x34c)],Window_MapName['prototype'][_0x5d7dff(0x34c)]=function(){const _0x585979=_0x5d7dff;VisuMZ[_0x585979(0x7ac)][_0x585979(0x37c)][_0x585979(0x116)][_0x585979(0x3b9)]?this[_0x585979(0x12f)]():VisuMZ[_0x585979(0x7ac)][_0x585979(0x82f)][_0x585979(0x5d5)](this);},Window_MapName[_0x5d7dff(0x4fa)][_0x5d7dff(0x12f)]=function(){const _0x5ddb68=_0x5d7dff;this[_0x5ddb68(0x673)][_0x5ddb68(0x577)]();if($gameMap[_0x5ddb68(0x334)]()){const _0x1f81dc=this['innerWidth'];this[_0x5ddb68(0x417)](0x0,0x0,_0x1f81dc,this[_0x5ddb68(0x4bf)]());const _0x33a238=this['textSizeEx']($gameMap[_0x5ddb68(0x334)]())[_0x5ddb68(0x47e)];this[_0x5ddb68(0x783)]($gameMap[_0x5ddb68(0x334)](),Math[_0x5ddb68(0x559)]((_0x1f81dc-_0x33a238)/0x2),0x0);}},Window_TitleCommand[_0x5d7dff(0x5d7)]=VisuMZ[_0x5d7dff(0x7ac)]['Settings'][_0x5d7dff(0x639)],Window_TitleCommand[_0x5d7dff(0x4fa)]['makeCommandList']=function(){const _0x50c1c2=_0x5d7dff;this[_0x50c1c2(0x574)]();},Window_TitleCommand[_0x5d7dff(0x4fa)][_0x5d7dff(0x574)]=function(){const _0x3ec0a7=_0x5d7dff;for(const _0xbe07e3 of Window_TitleCommand[_0x3ec0a7(0x5d7)]){if(_0xbe07e3['ShowJS'][_0x3ec0a7(0x5d5)](this)){const _0x2da44b=_0xbe07e3[_0x3ec0a7(0x5ba)];let _0x482357=_0xbe07e3[_0x3ec0a7(0x2ac)];if(['',_0x3ec0a7(0x255)]['includes'](_0x482357))_0x482357=_0xbe07e3[_0x3ec0a7(0x346)][_0x3ec0a7(0x5d5)](this);const _0x3be11e=_0xbe07e3['EnableJS'][_0x3ec0a7(0x5d5)](this),_0x240e6a=_0xbe07e3['ExtJS']['call'](this);this[_0x3ec0a7(0x65f)](_0x482357,_0x2da44b,_0x3be11e,_0x240e6a),this[_0x3ec0a7(0x198)](_0x2da44b,_0xbe07e3[_0x3ec0a7(0x708)][_0x3ec0a7(0x134)](this,_0x240e6a));}}},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x2ce)]=Window_TitleCommand['prototype'][_0x5d7dff(0x25c)],Window_TitleCommand[_0x5d7dff(0x4fa)][_0x5d7dff(0x25c)]=function(){const _0x8a5882=_0x5d7dff;VisuMZ['CoreEngine'][_0x8a5882(0x2ce)]['call'](this);if(!Window_TitleCommand[_0x8a5882(0x773)])return;const _0x558603=this['findSymbol'](Window_TitleCommand['_lastCommandSymbol']),_0x2ee4d4=Math[_0x8a5882(0x559)](this[_0x8a5882(0x785)]()/0x2)-0x1;this[_0x8a5882(0x23e)](_0x558603),this[_0x8a5882(0x239)]>0x1&&(this[_0x8a5882(0x239)]=0x1,this['updateSmoothScroll']()),this[_0x8a5882(0x563)](_0x558603-_0x2ee4d4);},Window_GameEnd[_0x5d7dff(0x5d7)]=VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)]['MenuLayout']['GameEnd'][_0x5d7dff(0x2f0)],Window_GameEnd[_0x5d7dff(0x4fa)]['makeCommandList']=function(){const _0x3abe0b=_0x5d7dff;this[_0x3abe0b(0x574)]();},Window_GameEnd['prototype']['makeCoreEngineCommandList']=function(){const _0x1e4287=_0x5d7dff;for(const _0xb2ecd4 of Window_GameEnd[_0x1e4287(0x5d7)]){if(_0xb2ecd4[_0x1e4287(0x515)][_0x1e4287(0x5d5)](this)){const _0x518871=_0xb2ecd4[_0x1e4287(0x5ba)];let _0x1ea523=_0xb2ecd4['TextStr'];if(['',_0x1e4287(0x255)][_0x1e4287(0x617)](_0x1ea523))_0x1ea523=_0xb2ecd4[_0x1e4287(0x346)]['call'](this);const _0x186868=_0xb2ecd4['EnableJS'][_0x1e4287(0x5d5)](this),_0x2152e2=_0xb2ecd4[_0x1e4287(0x2e4)][_0x1e4287(0x5d5)](this);this[_0x1e4287(0x65f)](_0x1ea523,_0x518871,_0x186868,_0x2152e2),this[_0x1e4287(0x198)](_0x518871,_0xb2ecd4['CallHandlerJS'][_0x1e4287(0x134)](this,_0x2152e2));}}};function Window_ButtonAssist(){const _0x9add85=_0x5d7dff;this[_0x9add85(0x186)](...arguments);}Window_ButtonAssist[_0x5d7dff(0x4fa)]=Object[_0x5d7dff(0x208)](Window_Base['prototype']),Window_ButtonAssist[_0x5d7dff(0x4fa)][_0x5d7dff(0x793)]=Window_ButtonAssist,Window_ButtonAssist[_0x5d7dff(0x4fa)][_0x5d7dff(0x186)]=function(_0x44ce5f){const _0x1f7ba1=_0x5d7dff;this[_0x1f7ba1(0x2d7)]={},Window_Base[_0x1f7ba1(0x4fa)]['initialize'][_0x1f7ba1(0x5d5)](this,_0x44ce5f),this[_0x1f7ba1(0x650)](VisuMZ[_0x1f7ba1(0x7ac)][_0x1f7ba1(0x37c)][_0x1f7ba1(0x4f6)][_0x1f7ba1(0x5c4)]||0x0),this[_0x1f7ba1(0x34c)]();},Window_ButtonAssist[_0x5d7dff(0x4fa)][_0x5d7dff(0x4bf)]=function(){const _0x1a3bad=_0x5d7dff;return this[_0x1a3bad(0x65e)]||Window_Base['prototype']['lineHeight'][_0x1a3bad(0x5d5)](this);},Window_ButtonAssist[_0x5d7dff(0x4fa)][_0x5d7dff(0x544)]=function(){const _0xf05d76=_0x5d7dff;this[_0xf05d76(0x673)][_0xf05d76(0x5bc)]<=0x60&&(this[_0xf05d76(0x673)][_0xf05d76(0x5bc)]+=0x6);},Window_ButtonAssist[_0x5d7dff(0x4fa)][_0x5d7dff(0x57a)]=function(){const _0x3871df=_0x5d7dff;this[_0x3871df(0x673)]['fontSize']>=0x18&&(this[_0x3871df(0x673)][_0x3871df(0x5bc)]-=0x6);},Window_ButtonAssist[_0x5d7dff(0x4fa)][_0x5d7dff(0x75f)]=function(){const _0x44bf16=_0x5d7dff;Window_Base[_0x44bf16(0x4fa)][_0x44bf16(0x75f)][_0x44bf16(0x5d5)](this),this[_0x44bf16(0x6e0)]();},Window_ButtonAssist[_0x5d7dff(0x4fa)]['updatePadding']=function(){const _0x418f51=_0x5d7dff;this[_0x418f51(0x79f)]=SceneManager[_0x418f51(0x882)][_0x418f51(0x6cc)]()!==_0x418f51(0xef)?0x0:0x8;},Window_ButtonAssist[_0x5d7dff(0x4fa)][_0x5d7dff(0x6e0)]=function(){const _0x30e636=_0x5d7dff,_0x34a5e9=SceneManager['_scene'];for(let _0x10f258=0x1;_0x10f258<=0x5;_0x10f258++){if(this[_0x30e636(0x2d7)][_0x30e636(0x23c)['format'](_0x10f258)]!==_0x34a5e9['buttonAssistKey%1'['format'](_0x10f258)]())return this[_0x30e636(0x34c)]();if(this[_0x30e636(0x2d7)]['text%1'[_0x30e636(0x106)](_0x10f258)]!==_0x34a5e9[_0x30e636(0x246)[_0x30e636(0x106)](_0x10f258)]())return this[_0x30e636(0x34c)]();}},Window_ButtonAssist[_0x5d7dff(0x4fa)][_0x5d7dff(0x34c)]=function(){const _0x34acd7=_0x5d7dff;this[_0x34acd7(0x673)]['clear']();for(let _0x488485=0x1;_0x488485<=0x5;_0x488485++){this[_0x34acd7(0x70d)](_0x488485);}},Window_ButtonAssist['prototype'][_0x5d7dff(0x70d)]=function(_0x20aeff){const _0x4814f3=_0x5d7dff,_0x85e4fd=this['innerWidth']/0x5,_0x1f22bd=SceneManager[_0x4814f3(0x882)],_0x598e54=_0x1f22bd[_0x4814f3(0x6b1)[_0x4814f3(0x106)](_0x20aeff)](),_0x280569=_0x1f22bd[_0x4814f3(0x246)['format'](_0x20aeff)]();this['_data'][_0x4814f3(0x23c)[_0x4814f3(0x106)](_0x20aeff)]=_0x598e54,this['_data']['text%1'['format'](_0x20aeff)]=_0x280569;if(_0x598e54==='')return;if(_0x280569==='')return;const _0x3cbea5=_0x1f22bd['buttonAssistOffset%1'['format'](_0x20aeff)](),_0x503464=this[_0x4814f3(0x726)](),_0x1b0c46=_0x85e4fd*(_0x20aeff-0x1)+_0x503464+_0x3cbea5,_0x12000e=VisuMZ[_0x4814f3(0x7ac)]['Settings'][_0x4814f3(0x4f6)][_0x4814f3(0x65a)];this[_0x4814f3(0x783)](_0x12000e[_0x4814f3(0x106)](_0x598e54,_0x280569),_0x1b0c46,0x0,_0x85e4fd-_0x503464*0x2);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x35d)]=Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x3eb)],Game_Interpreter[_0x5d7dff(0x4fa)][_0x5d7dff(0x3eb)]=function(){const _0x29ed96=_0x5d7dff;if($gameTemp['_pictureCoordinatesMode']!==undefined)return VisuMZ['CoreEngine'][_0x29ed96(0x727)]();return VisuMZ[_0x29ed96(0x7ac)][_0x29ed96(0x35d)]['call'](this);},VisuMZ[_0x5d7dff(0x7ac)]['UpdatePictureCoordinates']=function(){const _0x5e80c0=_0x5d7dff,_0x253d11=$gameTemp[_0x5e80c0(0x479)]||0x0;(_0x253d11<0x0||_0x253d11>0x64||TouchInput[_0x5e80c0(0x39c)]()||Input[_0x5e80c0(0x7c8)](_0x5e80c0(0x381)))&&($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0x5e80c0(0x577)](),TouchInput[_0x5e80c0(0x577)]());const _0x4615d7=$gameScreen[_0x5e80c0(0x370)](_0x253d11);return _0x4615d7&&(_0x4615d7['_x']=TouchInput['_x'],_0x4615d7['_y']=TouchInput['_y']),VisuMZ['CoreEngine'][_0x5e80c0(0xc1)](),$gameTemp['_pictureCoordinatesMode']!==undefined;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0xc1)]=function(){const _0x13b0db=_0x5d7dff,_0x1df3fe=SceneManager[_0x13b0db(0x882)];if(!_0x1df3fe)return;!_0x1df3fe[_0x13b0db(0x100)]&&(SoundManager[_0x13b0db(0x444)](),_0x1df3fe[_0x13b0db(0x100)]=new Window_PictureCoordinates(),_0x1df3fe[_0x13b0db(0x6e6)](_0x1df3fe['_pictureCoordinatesWindow'])),$gameTemp[_0x13b0db(0x479)]===undefined&&(SoundManager[_0x13b0db(0x576)](),_0x1df3fe[_0x13b0db(0x3fb)](_0x1df3fe[_0x13b0db(0x100)]),_0x1df3fe[_0x13b0db(0x100)]=undefined);};function Window_PictureCoordinates(){const _0x5e5e47=_0x5d7dff;this[_0x5e5e47(0x186)](...arguments);}Window_PictureCoordinates['prototype']=Object[_0x5d7dff(0x208)](Window_Base[_0x5d7dff(0x4fa)]),Window_PictureCoordinates[_0x5d7dff(0x4fa)][_0x5d7dff(0x793)]=Window_PictureCoordinates,Window_PictureCoordinates['prototype'][_0x5d7dff(0x186)]=function(){const _0x32d722=_0x5d7dff;this[_0x32d722(0x439)]=_0x32d722(0x65c),this['_lastX']=_0x32d722(0x65c),this[_0x32d722(0x692)]=_0x32d722(0x65c);const _0x5d2691=this['windowRect']();Window_Base['prototype']['initialize'][_0x32d722(0x5d5)](this,_0x5d2691),this[_0x32d722(0x650)](0x2);},Window_PictureCoordinates[_0x5d7dff(0x4fa)][_0x5d7dff(0x700)]=function(){const _0x18a776=_0x5d7dff;let _0x322f32=0x0,_0x3af2c4=Graphics[_0x18a776(0x8af)]-this[_0x18a776(0x4bf)](),_0x44d573=Graphics[_0x18a776(0x47e)],_0xfe28cc=this['lineHeight']();return new Rectangle(_0x322f32,_0x3af2c4,_0x44d573,_0xfe28cc);},Window_PictureCoordinates[_0x5d7dff(0x4fa)][_0x5d7dff(0x721)]=function(){const _0x49c61a=_0x5d7dff;this[_0x49c61a(0x79f)]=0x0;},Window_PictureCoordinates[_0x5d7dff(0x4fa)][_0x5d7dff(0x75f)]=function(){const _0x525b03=_0x5d7dff;Window_Base[_0x525b03(0x4fa)]['update'][_0x525b03(0x5d5)](this),this[_0x525b03(0x176)]();},Window_PictureCoordinates['prototype'][_0x5d7dff(0x176)]=function(){const _0xf467b2=_0x5d7dff;if(!this[_0xf467b2(0x13d)]())return;this['refresh']();},Window_PictureCoordinates[_0x5d7dff(0x4fa)][_0x5d7dff(0x13d)]=function(){const _0x4cee11=_0x5d7dff,_0x14b659=$gameTemp[_0x4cee11(0x479)],_0x1a07ea=$gameScreen[_0x4cee11(0x370)](_0x14b659);return _0x1a07ea?this[_0x4cee11(0x439)]!==_0x1a07ea['_origin']||this[_0x4cee11(0xc2)]!==_0x1a07ea['_x']||this[_0x4cee11(0x692)]!==_0x1a07ea['_y']:![];},Window_PictureCoordinates[_0x5d7dff(0x4fa)][_0x5d7dff(0x34c)]=function(){const _0x13ad81=_0x5d7dff;this[_0x13ad81(0x673)][_0x13ad81(0x577)]();const _0x163dc1=$gameTemp['_pictureCoordinatesMode'],_0x200254=$gameScreen[_0x13ad81(0x370)](_0x163dc1);if(!_0x200254)return;this[_0x13ad81(0x439)]=_0x200254[_0x13ad81(0x470)],this['_lastX']=_0x200254['_x'],this[_0x13ad81(0x692)]=_0x200254['_y'];const _0x4f05ad=ColorManager[_0x13ad81(0x73b)]();this[_0x13ad81(0x673)][_0x13ad81(0x878)](0x0,0x0,this['innerWidth'],this['innerHeight'],_0x4f05ad);const _0x2adc72='\x20Origin:\x20%1'[_0x13ad81(0x106)](_0x200254[_0x13ad81(0x470)]===0x0?'Upper\x20Left':_0x13ad81(0x4a2)),_0x565277='X:\x20%1'['format'](_0x200254['_x']),_0x9535ad=_0x13ad81(0x701)['format'](_0x200254['_y']),_0xda12fa=_0x13ad81(0x1ea)['format'](TextManager[_0x13ad81(0x2fe)](_0x13ad81(0x381)));let _0x373238=Math[_0x13ad81(0x559)](this[_0x13ad81(0x525)]/0x4);this[_0x13ad81(0x7f1)](_0x2adc72,_0x373238*0x0,0x0,_0x373238),this[_0x13ad81(0x7f1)](_0x565277,_0x373238*0x1,0x0,_0x373238,_0x13ad81(0x445)),this[_0x13ad81(0x7f1)](_0x9535ad,_0x373238*0x2,0x0,_0x373238,_0x13ad81(0x445));const _0x5ea740=this[_0x13ad81(0x3c6)](_0xda12fa)[_0x13ad81(0x47e)],_0x363f6b=this[_0x13ad81(0x525)]-_0x5ea740;this[_0x13ad81(0x783)](_0xda12fa,_0x363f6b,0x0,_0x5ea740);};function Window_TextPopup(){this['initialize'](...arguments);}Window_TextPopup[_0x5d7dff(0x4fa)]=Object['create'](Window_Base[_0x5d7dff(0x4fa)]),Window_TextPopup[_0x5d7dff(0x4fa)][_0x5d7dff(0x793)]=Window_TextPopup,Window_TextPopup[_0x5d7dff(0x703)]={'framesPerChar':VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x448)][_0x5d7dff(0x8ab)]??1.5,'framesMin':VisuMZ[_0x5d7dff(0x7ac)]['Settings'][_0x5d7dff(0x448)][_0x5d7dff(0x728)]??0x5a,'framesMax':VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x37c)][_0x5d7dff(0x448)][_0x5d7dff(0x18b)]??0x12c},Window_TextPopup[_0x5d7dff(0x4fa)]['initialize']=function(){const _0x1d103f=_0x5d7dff,_0x43006f=new Rectangle(0x0,0x0,0x1,0x1);Window_Base['prototype']['initialize'][_0x1d103f(0x5d5)](this,_0x43006f),this[_0x1d103f(0x355)]=0x0,this[_0x1d103f(0x224)]='',this['_textQueue']=[],this[_0x1d103f(0x31a)]=0x0;},Window_TextPopup[_0x5d7dff(0x4fa)][_0x5d7dff(0x11e)]=function(){return!![];},Window_TextPopup[_0x5d7dff(0x4fa)][_0x5d7dff(0x433)]=function(_0x34aa21){const _0x3ac4d4=_0x5d7dff;if(this[_0x3ac4d4(0x6ec)][this['_textQueue'][_0x3ac4d4(0xfd)]-0x1]===_0x34aa21)return;this[_0x3ac4d4(0x6ec)][_0x3ac4d4(0x1a0)](_0x34aa21),SceneManager['_scene']['addChild'](this);},Window_TextPopup[_0x5d7dff(0x4fa)][_0x5d7dff(0x75f)]=function(){const _0x3135e7=_0x5d7dff;Window_Base[_0x3135e7(0x4fa)][_0x3135e7(0x75f)][_0x3135e7(0x5d5)](this),this[_0x3135e7(0x3d5)](),this['updateDuration']();},Window_TextPopup[_0x5d7dff(0x4fa)][_0x5d7dff(0x3d5)]=function(){const _0x25dee9=_0x5d7dff;if(this['_text']!=='')return;if(this[_0x25dee9(0x6ec)]['length']<=0x0)return;if(!this[_0x25dee9(0x738)]())return;this[_0x25dee9(0x224)]=this[_0x25dee9(0x6ec)][_0x25dee9(0x226)]();const _0x4dc7bd=Window_TextPopup[_0x25dee9(0x703)],_0x1f1889=Math[_0x25dee9(0x5c6)](this[_0x25dee9(0x224)][_0x25dee9(0xfd)]*_0x4dc7bd[_0x25dee9(0xf6)]);this[_0x25dee9(0x31a)]=_0x1f1889[_0x25dee9(0x3aa)](_0x4dc7bd['framesMin'],_0x4dc7bd[_0x25dee9(0x1be)]);const _0x2acd7d=this['textSizeEx'](this[_0x25dee9(0x224)]);let _0x5e15c3=_0x2acd7d[_0x25dee9(0x47e)]+this[_0x25dee9(0x726)]()*0x2;_0x5e15c3+=$gameSystem[_0x25dee9(0x1e3)]()*0x2;let _0x53955b=Math['max'](_0x2acd7d[_0x25dee9(0x8af)],this[_0x25dee9(0x4bf)]());_0x53955b+=$gameSystem[_0x25dee9(0x1e3)]()*0x2;const _0x13a199=Math[_0x25dee9(0xd6)]((Graphics[_0x25dee9(0x47e)]-_0x5e15c3)/0x2),_0x170808=Math[_0x25dee9(0xd6)]((Graphics[_0x25dee9(0x8af)]-_0x53955b)/0x2),_0x5818d1=new Rectangle(_0x13a199,_0x170808,_0x5e15c3,_0x53955b);this['move'](_0x5818d1['x'],_0x5818d1['y'],_0x5818d1['width'],_0x5818d1[_0x25dee9(0x8af)]),this[_0x25dee9(0x7f3)](),this[_0x25dee9(0x34c)](),this[_0x25dee9(0x774)](),SceneManager[_0x25dee9(0x882)]['addChild'](this);},Window_TextPopup[_0x5d7dff(0x4fa)][_0x5d7dff(0x34c)]=function(){const _0x2cb894=_0x5d7dff,_0x5fccfc=this[_0x2cb894(0x349)]();this[_0x2cb894(0x673)][_0x2cb894(0x577)](),this[_0x2cb894(0x783)](this['_text'],_0x5fccfc['x'],_0x5fccfc['y'],_0x5fccfc[_0x2cb894(0x47e)]);},Window_TextPopup[_0x5d7dff(0x4fa)][_0x5d7dff(0x787)]=function(){const _0x58547a=_0x5d7dff;if(this[_0x58547a(0x77c)]()||this[_0x58547a(0x848)]())return;if(this[_0x58547a(0x31a)]<=0x0)return;this[_0x58547a(0x31a)]--,this['_timeDuration']<=0x0&&(this['close'](),this['_text']='');},VisuMZ[_0x5d7dff(0x53f)]=function(_0x5657c3){const _0x4f1d9e=_0x5d7dff;if(Utils[_0x4f1d9e(0x4ea)](_0x4f1d9e(0x64e))){var _0x4d0f1d=require(_0x4f1d9e(0x3ce))['Window'][_0x4f1d9e(0x3d8)]();SceneManager[_0x4f1d9e(0x59f)]();if(_0x5657c3)setTimeout(_0x4d0f1d['focus'][_0x4f1d9e(0x134)](_0x4d0f1d),0x190);}},VisuMZ['ApplyEasing']=function(_0x1c0f94,_0x5d574c){const _0x1b0c47=_0x5d7dff;_0x5d574c=_0x5d574c[_0x1b0c47(0x496)]();var _0x16f735=1.70158,_0x27955c=0.7;switch(_0x5d574c){case'LINEAR':return _0x1c0f94;case _0x1b0c47(0x45a):return-0x1*Math['cos'](_0x1c0f94*(Math['PI']/0x2))+0x1;case _0x1b0c47(0x6e1):return Math[_0x1b0c47(0x263)](_0x1c0f94*(Math['PI']/0x2));case _0x1b0c47(0x772):return-0.5*(Math['cos'](Math['PI']*_0x1c0f94)-0x1);case'INQUAD':return _0x1c0f94*_0x1c0f94;case _0x1b0c47(0x850):return _0x1c0f94*(0x2-_0x1c0f94);case _0x1b0c47(0x79b):return _0x1c0f94<0.5?0x2*_0x1c0f94*_0x1c0f94:-0x1+(0x4-0x2*_0x1c0f94)*_0x1c0f94;case _0x1b0c47(0x4c1):return _0x1c0f94*_0x1c0f94*_0x1c0f94;case'OUTCUBIC':var _0x56789a=_0x1c0f94-0x1;return _0x56789a*_0x56789a*_0x56789a+0x1;case'INOUTCUBIC':return _0x1c0f94<0.5?0x4*_0x1c0f94*_0x1c0f94*_0x1c0f94:(_0x1c0f94-0x1)*(0x2*_0x1c0f94-0x2)*(0x2*_0x1c0f94-0x2)+0x1;case'INQUART':return _0x1c0f94*_0x1c0f94*_0x1c0f94*_0x1c0f94;case _0x1b0c47(0x5f2):var _0x56789a=_0x1c0f94-0x1;return 0x1-_0x56789a*_0x56789a*_0x56789a*_0x56789a;case _0x1b0c47(0x3a9):var _0x56789a=_0x1c0f94-0x1;return _0x1c0f94<0.5?0x8*_0x1c0f94*_0x1c0f94*_0x1c0f94*_0x1c0f94:0x1-0x8*_0x56789a*_0x56789a*_0x56789a*_0x56789a;case'INQUINT':return _0x1c0f94*_0x1c0f94*_0x1c0f94*_0x1c0f94*_0x1c0f94;case'OUTQUINT':var _0x56789a=_0x1c0f94-0x1;return 0x1+_0x56789a*_0x56789a*_0x56789a*_0x56789a*_0x56789a;case'INOUTQUINT':var _0x56789a=_0x1c0f94-0x1;return _0x1c0f94<0.5?0x10*_0x1c0f94*_0x1c0f94*_0x1c0f94*_0x1c0f94*_0x1c0f94:0x1+0x10*_0x56789a*_0x56789a*_0x56789a*_0x56789a*_0x56789a;case _0x1b0c47(0x55d):if(_0x1c0f94===0x0)return 0x0;return Math[_0x1b0c47(0x2c3)](0x2,0xa*(_0x1c0f94-0x1));case _0x1b0c47(0x890):if(_0x1c0f94===0x1)return 0x1;return-Math[_0x1b0c47(0x2c3)](0x2,-0xa*_0x1c0f94)+0x1;case _0x1b0c47(0x191):if(_0x1c0f94===0x0||_0x1c0f94===0x1)return _0x1c0f94;var _0x19c0a=_0x1c0f94*0x2,_0xe190bf=_0x19c0a-0x1;if(_0x19c0a<0x1)return 0.5*Math[_0x1b0c47(0x2c3)](0x2,0xa*_0xe190bf);return 0.5*(-Math[_0x1b0c47(0x2c3)](0x2,-0xa*_0xe190bf)+0x2);case _0x1b0c47(0x551):var _0x19c0a=_0x1c0f94/0x1;return-0x1*(Math[_0x1b0c47(0x254)](0x1-_0x19c0a*_0x1c0f94)-0x1);case'OUTCIRC':var _0x56789a=_0x1c0f94-0x1;return Math['sqrt'](0x1-_0x56789a*_0x56789a);case _0x1b0c47(0x609):var _0x19c0a=_0x1c0f94*0x2,_0xe190bf=_0x19c0a-0x2;if(_0x19c0a<0x1)return-0.5*(Math[_0x1b0c47(0x254)](0x1-_0x19c0a*_0x19c0a)-0x1);return 0.5*(Math[_0x1b0c47(0x254)](0x1-_0xe190bf*_0xe190bf)+0x1);case _0x1b0c47(0x212):return _0x1c0f94*_0x1c0f94*((_0x16f735+0x1)*_0x1c0f94-_0x16f735);case _0x1b0c47(0x2fb):var _0x19c0a=_0x1c0f94/0x1-0x1;return _0x19c0a*_0x19c0a*((_0x16f735+0x1)*_0x19c0a+_0x16f735)+0x1;break;case _0x1b0c47(0x251):var _0x19c0a=_0x1c0f94*0x2,_0x15512a=_0x19c0a-0x2,_0x3eae7f=_0x16f735*1.525;if(_0x19c0a<0x1)return 0.5*_0x19c0a*_0x19c0a*((_0x3eae7f+0x1)*_0x19c0a-_0x3eae7f);return 0.5*(_0x15512a*_0x15512a*((_0x3eae7f+0x1)*_0x15512a+_0x3eae7f)+0x2);case _0x1b0c47(0x42e):if(_0x1c0f94===0x0||_0x1c0f94===0x1)return _0x1c0f94;var _0x19c0a=_0x1c0f94/0x1,_0xe190bf=_0x19c0a-0x1,_0x40ef4a=0x1-_0x27955c,_0x3eae7f=_0x40ef4a/(0x2*Math['PI'])*Math[_0x1b0c47(0x4d2)](0x1);return-(Math[_0x1b0c47(0x2c3)](0x2,0xa*_0xe190bf)*Math[_0x1b0c47(0x263)]((_0xe190bf-_0x3eae7f)*(0x2*Math['PI'])/_0x40ef4a));case _0x1b0c47(0x36b):var _0x40ef4a=0x1-_0x27955c,_0x19c0a=_0x1c0f94*0x2;if(_0x1c0f94===0x0||_0x1c0f94===0x1)return _0x1c0f94;var _0x3eae7f=_0x40ef4a/(0x2*Math['PI'])*Math[_0x1b0c47(0x4d2)](0x1);return Math[_0x1b0c47(0x2c3)](0x2,-0xa*_0x19c0a)*Math[_0x1b0c47(0x263)]((_0x19c0a-_0x3eae7f)*(0x2*Math['PI'])/_0x40ef4a)+0x1;case _0x1b0c47(0x52f):var _0x40ef4a=0x1-_0x27955c;if(_0x1c0f94===0x0||_0x1c0f94===0x1)return _0x1c0f94;var _0x19c0a=_0x1c0f94*0x2,_0xe190bf=_0x19c0a-0x1,_0x3eae7f=_0x40ef4a/(0x2*Math['PI'])*Math[_0x1b0c47(0x4d2)](0x1);if(_0x19c0a<0x1)return-0.5*(Math[_0x1b0c47(0x2c3)](0x2,0xa*_0xe190bf)*Math['sin']((_0xe190bf-_0x3eae7f)*(0x2*Math['PI'])/_0x40ef4a));return Math[_0x1b0c47(0x2c3)](0x2,-0xa*_0xe190bf)*Math[_0x1b0c47(0x263)]((_0xe190bf-_0x3eae7f)*(0x2*Math['PI'])/_0x40ef4a)*0.5+0x1;case'OUTBOUNCE':var _0x19c0a=_0x1c0f94/0x1;if(_0x19c0a<0x1/2.75)return 7.5625*_0x19c0a*_0x19c0a;else{if(_0x19c0a<0x2/2.75){var _0x15512a=_0x19c0a-1.5/2.75;return 7.5625*_0x15512a*_0x15512a+0.75;}else{if(_0x19c0a<2.5/2.75){var _0x15512a=_0x19c0a-2.25/2.75;return 7.5625*_0x15512a*_0x15512a+0.9375;}else{var _0x15512a=_0x19c0a-2.625/2.75;return 7.5625*_0x15512a*_0x15512a+0.984375;}}}case _0x1b0c47(0x89d):var _0x4ebd19=0x1-VisuMZ[_0x1b0c47(0x2fd)](0x1-_0x1c0f94,_0x1b0c47(0xed));return _0x4ebd19;case _0x1b0c47(0x597):if(_0x1c0f94<0.5)var _0x4ebd19=VisuMZ[_0x1b0c47(0x2fd)](_0x1c0f94*0x2,_0x1b0c47(0x11f))*0.5;else var _0x4ebd19=VisuMZ[_0x1b0c47(0x2fd)](_0x1c0f94*0x2-0x1,_0x1b0c47(0xed))*0.5+0.5;return _0x4ebd19;default:return _0x1c0f94;}},VisuMZ[_0x5d7dff(0x627)]=function(_0x5a1f57){const _0x36cfc2=_0x5d7dff;_0x5a1f57=String(_0x5a1f57)[_0x36cfc2(0x496)]();const _0x51bd60=VisuMZ[_0x36cfc2(0x7ac)][_0x36cfc2(0x37c)][_0x36cfc2(0x3b6)];if(_0x5a1f57===_0x36cfc2(0x57c))return _0x51bd60[_0x36cfc2(0x83c)];if(_0x5a1f57===_0x36cfc2(0x84f))return _0x51bd60[_0x36cfc2(0x1a4)];if(_0x5a1f57===_0x36cfc2(0x48b))return _0x51bd60[_0x36cfc2(0x7e9)];if(_0x5a1f57===_0x36cfc2(0xfe))return _0x51bd60[_0x36cfc2(0x85f)];if(_0x5a1f57===_0x36cfc2(0x5d2))return _0x51bd60['IconParam4'];if(_0x5a1f57===_0x36cfc2(0x60c))return _0x51bd60[_0x36cfc2(0x43d)];if(_0x5a1f57===_0x36cfc2(0x21a))return _0x51bd60[_0x36cfc2(0x864)];if(_0x5a1f57===_0x36cfc2(0x3b1))return _0x51bd60['IconParam7'];if(_0x5a1f57===_0x36cfc2(0x56a))return _0x51bd60[_0x36cfc2(0x53e)];if(_0x5a1f57===_0x36cfc2(0x67e))return _0x51bd60['IconXParam1'];if(_0x5a1f57===_0x36cfc2(0x4a6))return _0x51bd60['IconXParam2'];if(_0x5a1f57===_0x36cfc2(0x695))return _0x51bd60['IconXParam3'];if(_0x5a1f57===_0x36cfc2(0x82c))return _0x51bd60[_0x36cfc2(0x3f5)];if(_0x5a1f57===_0x36cfc2(0x734))return _0x51bd60[_0x36cfc2(0x17e)];if(_0x5a1f57===_0x36cfc2(0x85e))return _0x51bd60[_0x36cfc2(0x88c)];if(_0x5a1f57===_0x36cfc2(0x72b))return _0x51bd60[_0x36cfc2(0x127)];if(_0x5a1f57===_0x36cfc2(0x49f))return _0x51bd60[_0x36cfc2(0x473)];if(_0x5a1f57==='TRG')return _0x51bd60[_0x36cfc2(0x86a)];if(_0x5a1f57===_0x36cfc2(0x84a))return _0x51bd60[_0x36cfc2(0x7f6)];if(_0x5a1f57==='GRD')return _0x51bd60['IconSParam1'];if(_0x5a1f57===_0x36cfc2(0x600))return _0x51bd60['IconSParam2'];if(_0x5a1f57===_0x36cfc2(0x483))return _0x51bd60[_0x36cfc2(0x5b4)];if(_0x5a1f57==='MCR')return _0x51bd60['IconSParam4'];if(_0x5a1f57===_0x36cfc2(0x780))return _0x51bd60['IconSParam5'];if(_0x5a1f57===_0x36cfc2(0xcd))return _0x51bd60[_0x36cfc2(0x1f1)];if(_0x5a1f57===_0x36cfc2(0x26a))return _0x51bd60[_0x36cfc2(0x7da)];if(_0x5a1f57==='FDR')return _0x51bd60[_0x36cfc2(0x404)];if(_0x5a1f57===_0x36cfc2(0x6a9))return _0x51bd60[_0x36cfc2(0x528)];if(VisuMZ[_0x36cfc2(0x7ac)][_0x36cfc2(0x855)][_0x5a1f57])return VisuMZ[_0x36cfc2(0x7ac)][_0x36cfc2(0x855)][_0x5a1f57]||0x0;return 0x0;},VisuMZ['ConvertNumberToString']=function(_0x4dbd61,_0x2115b4,_0x1968ae){const _0x255e0e=_0x5d7dff;if(_0x1968ae===undefined&&_0x4dbd61%0x1===0x0)return _0x4dbd61;if(_0x1968ae!==undefined&&[_0x255e0e(0x57c),'MAXMP',_0x255e0e(0x48b),_0x255e0e(0xfe),_0x255e0e(0x5d2),_0x255e0e(0x60c),_0x255e0e(0x21a),_0x255e0e(0x3b1)][_0x255e0e(0x617)](String(_0x1968ae)[_0x255e0e(0x496)]()['trim']()))return _0x4dbd61;_0x2115b4=_0x2115b4||0x0;if(VisuMZ[_0x255e0e(0x7ac)]['CustomParamAbb'][_0x1968ae])return VisuMZ[_0x255e0e(0x7ac)]['CustomParamType'][_0x1968ae]===_0x255e0e(0x88b)?_0x4dbd61:String((_0x4dbd61*0x64)[_0x255e0e(0x5e4)](_0x2115b4))+'%';return String((_0x4dbd61*0x64)[_0x255e0e(0x5e4)](_0x2115b4))+'%';},VisuMZ[_0x5d7dff(0x53c)]=function(_0x20f9e5){const _0x3ea056=_0x5d7dff;_0x20f9e5=String(_0x20f9e5);if(!_0x20f9e5)return _0x20f9e5;if(typeof _0x20f9e5!==_0x3ea056(0x2fa))return _0x20f9e5;const _0x4eb0e5=VisuMZ[_0x3ea056(0x7ac)][_0x3ea056(0x37c)][_0x3ea056(0x116)][_0x3ea056(0x47f)]||_0x3ea056(0x4e3),_0x39a8a1={'maximumFractionDigits':0x6};_0x20f9e5=_0x20f9e5[_0x3ea056(0x613)](/\[(.*?)\]/g,(_0x416b0c,_0x5bd2fc)=>{return VisuMZ['PreserveNumbers'](_0x5bd2fc,'[',']');}),_0x20f9e5=_0x20f9e5['replace'](/<(.*?)>/g,(_0x88103c,_0x5914d6)=>{const _0x1bec52=_0x3ea056;return VisuMZ[_0x1bec52(0x77a)](_0x5914d6,'<','>');}),_0x20f9e5=_0x20f9e5[_0x3ea056(0x613)](/\{\{(.*?)\}\}/g,(_0x41d5a7,_0x509914)=>{const _0x392fed=_0x3ea056;return VisuMZ[_0x392fed(0x77a)](_0x509914,'','');}),_0x20f9e5=_0x20f9e5['replace'](/(\d+\.?\d*)/g,(_0x376119,_0x3aef9c)=>{const _0x25f470=_0x3ea056;let _0xc8dba4=_0x3aef9c;if(_0xc8dba4[0x0]==='0')return _0xc8dba4;if(_0xc8dba4[_0xc8dba4[_0x25f470(0xfd)]-0x1]==='.')return Number(_0xc8dba4)['toLocaleString'](_0x4eb0e5,_0x39a8a1)+'.';else return _0xc8dba4[_0xc8dba4[_0x25f470(0xfd)]-0x1]===','?Number(_0xc8dba4)[_0x25f470(0x5b7)](_0x4eb0e5,_0x39a8a1)+',':Number(_0xc8dba4)['toLocaleString'](_0x4eb0e5,_0x39a8a1);});let _0x54cfd3=0x3;while(_0x54cfd3--){_0x20f9e5=VisuMZ['RevertPreserveNumbers'](_0x20f9e5);}return _0x20f9e5;},VisuMZ[_0x5d7dff(0x77a)]=function(_0x16edf1,_0x3edcc2,_0x12f571){const _0x3a68ec=_0x5d7dff;return _0x16edf1=_0x16edf1['replace'](/(\d)/gi,(_0x402bf3,_0x5897cc)=>_0x3a68ec(0x83a)[_0x3a68ec(0x106)](Number(_0x5897cc))),_0x3a68ec(0x379)[_0x3a68ec(0x106)](_0x16edf1,_0x3edcc2,_0x12f571);},VisuMZ[_0x5d7dff(0x657)]=function(_0x489509){const _0x560ba4=_0x5d7dff;return _0x489509=_0x489509[_0x560ba4(0x613)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4e2f63,_0xffcfd1)=>Number(parseInt(_0xffcfd1))),_0x489509;},VisuMZ['openURL']=function(_0x39044a){const _0x2ec79d=_0x5d7dff;SoundManager['playOk']();if(!Utils[_0x2ec79d(0x7c2)]()){const _0x39831a=window[_0x2ec79d(0x774)](_0x39044a,_0x2ec79d(0x11a));}else{const _0x244065=process[_0x2ec79d(0x6a6)]==_0x2ec79d(0xbf)?_0x2ec79d(0x774):process['platform']==_0x2ec79d(0x5e1)?_0x2ec79d(0x2b0):_0x2ec79d(0x55f);require('child_process')['exec'](_0x244065+'\x20'+_0x39044a);}},VisuMZ[_0x5d7dff(0x218)]=function(_0xf402a5,_0x125ef3){const _0x1c0d38=_0x5d7dff;if(!_0xf402a5)return'';const _0x4fc52c=_0xf402a5[_0x1c0d38(0x79d)]||_0xf402a5['id'];let _0xa915f5='';return _0xf402a5['initialLevel']!==undefined&&_0xf402a5[_0x1c0d38(0x8b5)]!==undefined&&(_0xa915f5=_0x1c0d38(0x571)[_0x1c0d38(0x106)](_0x4fc52c,_0x125ef3)),_0xf402a5[_0x1c0d38(0x3b8)]!==undefined&&_0xf402a5[_0x1c0d38(0x4f0)]!==undefined&&(_0xa915f5='Class-%1-%2'[_0x1c0d38(0x106)](_0x4fc52c,_0x125ef3)),_0xf402a5[_0x1c0d38(0x881)]!==undefined&&_0xf402a5[_0x1c0d38(0x2b6)]!==undefined&&(_0xa915f5='Skill-%1-%2'[_0x1c0d38(0x106)](_0x4fc52c,_0x125ef3)),_0xf402a5[_0x1c0d38(0x8d1)]!==undefined&&_0xf402a5[_0x1c0d38(0x765)]!==undefined&&(_0xa915f5=_0x1c0d38(0x5dd)[_0x1c0d38(0x106)](_0x4fc52c,_0x125ef3)),_0xf402a5[_0x1c0d38(0x4de)]!==undefined&&_0xf402a5['etypeId']===0x1&&(_0xa915f5=_0x1c0d38(0x5e7)[_0x1c0d38(0x106)](_0x4fc52c,_0x125ef3)),_0xf402a5[_0x1c0d38(0x19f)]!==undefined&&_0xf402a5[_0x1c0d38(0x68e)]>0x1&&(_0xa915f5=_0x1c0d38(0x58d)[_0x1c0d38(0x106)](_0x4fc52c,_0x125ef3)),_0xf402a5['dropItems']!==undefined&&_0xf402a5[_0x1c0d38(0x10e)]!==undefined&&(_0xa915f5=_0x1c0d38(0x777)[_0x1c0d38(0x106)](_0x4fc52c,_0x125ef3)),_0xf402a5[_0x1c0d38(0x704)]!==undefined&&_0xf402a5[_0x1c0d38(0x2d8)]!==undefined&&(_0xa915f5=_0x1c0d38(0x372)[_0x1c0d38(0x106)](_0x4fc52c,_0x125ef3)),_0xa915f5;},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x4d8)]=function(_0x4b92d0,_0x55d79e){const _0x3ce972=_0x5d7dff,_0x549668=ImageManager[_0x3ce972(0x5f3)]||0x20,_0x2eacda=ImageManager[_0x3ce972(0x356)]||0x20;if(_0x55d79e['drawing']){const _0x1ff294=_0x549668-ImageManager['iconWidth'],_0x41dde9=_0x2eacda-ImageManager['iconHeight'];let _0x470efd=0x2,_0x33d7aa=0x2;this[_0x3ce972(0x4bf)]()!==0x24&&(_0x33d7aa=Math[_0x3ce972(0x559)]((this[_0x3ce972(0x4bf)]()-_0x2eacda)/0x2));const _0x3777b7=_0x55d79e['x']+Math[_0x3ce972(0x559)](_0x1ff294/0x2)+_0x470efd,_0x583de8=_0x55d79e['y']+Math[_0x3ce972(0x559)](_0x41dde9/0x2)+_0x33d7aa;this[_0x3ce972(0x618)](_0x4b92d0,_0x3777b7,_0x583de8);}_0x55d79e['x']+=_0x549668+0x4;},Window_StatusBase[_0x5d7dff(0x4fa)][_0x5d7dff(0x4b3)]=function(_0x7fce1,_0x4d0921,_0x45cbb4,_0x3e8945){const _0x1dff72=_0x5d7dff;_0x3e8945=_0x3e8945||0x90;const _0x6685b0=ImageManager[_0x1dff72(0x5f3)]||0x20,_0x367473=ImageManager[_0x1dff72(0x356)]||0x20,_0x5cb2c3=_0x6685b0-ImageManager['iconWidth'],_0x21bf8d=_0x367473-ImageManager[_0x1dff72(0x8cc)],_0x30057c=_0x6685b0,_0x37a03f=_0x7fce1[_0x1dff72(0x873)]()[_0x1dff72(0x3f7)](0x0,Math[_0x1dff72(0x559)](_0x3e8945/_0x30057c));let _0x21dad4=_0x4d0921+Math[_0x1dff72(0x5c6)](_0x5cb2c3/0x2),_0x3c16ca=_0x45cbb4+Math[_0x1dff72(0x5c6)](_0x21bf8d/0x2);for(const _0x1dcf30 of _0x37a03f){this[_0x1dff72(0x618)](_0x1dcf30,_0x21dad4,_0x3c16ca),_0x21dad4+=_0x30057c;}},Game_Picture[_0x5d7dff(0x4fa)]['anchor']=function(){const _0x4c662e=_0x5d7dff;return this[_0x4c662e(0x8d2)];},VisuMZ['CoreEngine'][_0x5d7dff(0x422)]=Game_Picture[_0x5d7dff(0x4fa)]['initBasic'],Game_Picture['prototype'][_0x5d7dff(0x199)]=function(){const _0x938330=_0x5d7dff;VisuMZ[_0x938330(0x7ac)][_0x938330(0x422)][_0x938330(0x5d5)](this),this['_anchor']={'x':0x0,'y':0x0},this[_0x938330(0x4c9)]={'x':0x0,'y':0x0};},VisuMZ[_0x5d7dff(0x7ac)]['Game_Picture_updateMove']=Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x29a)],Game_Picture[_0x5d7dff(0x4fa)]['updateMove']=function(){const _0x1ab497=_0x5d7dff;this[_0x1ab497(0x507)]();const _0x131dba=this[_0x1ab497(0x48f)];VisuMZ[_0x1ab497(0x7ac)][_0x1ab497(0x1e0)]['call'](this),_0x131dba>0x0&&this['_duration']<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x1ab497(0x407)],this[_0x1ab497(0x8c0)]=this[_0x1ab497(0x380)],this[_0x1ab497(0x7df)]=this[_0x1ab497(0x2f9)],this[_0x1ab497(0x13e)]=this[_0x1ab497(0x5fa)],this[_0x1ab497(0x8d2)]&&(this[_0x1ab497(0x8d2)]['x']=this['_targetAnchor']['x'],this[_0x1ab497(0x8d2)]['y']=this[_0x1ab497(0x4c9)]['y']));},VisuMZ['CoreEngine'][_0x5d7dff(0x237)]=Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x259)],Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x259)]=function(_0x558dfc,_0x220ea2,_0x287c8d,_0x185d04,_0x421350,_0xe9d523,_0x168ee0,_0x223f95){const _0x45132b=_0x5d7dff;VisuMZ[_0x45132b(0x7ac)]['Game_Picture_show'][_0x45132b(0x5d5)](this,_0x558dfc,_0x220ea2,_0x287c8d,_0x185d04,_0x421350,_0xe9d523,_0x168ee0,_0x223f95),this[_0x45132b(0x54c)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x220ea2]||{'x':0x0,'y':0x0});},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x29e)]=Game_Picture[_0x5d7dff(0x4fa)]['move'],Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x75c)]=function(_0x404914,_0x4d343e,_0x2e6be7,_0x575910,_0x4d5210,_0x2eab2d,_0x3ffb8a,_0x2efd9b,_0x345ce0){const _0x1714a1=_0x5d7dff;VisuMZ[_0x1714a1(0x7ac)][_0x1714a1(0x29e)]['call'](this,_0x404914,_0x4d343e,_0x2e6be7,_0x575910,_0x4d5210,_0x2eab2d,_0x3ffb8a,_0x2efd9b,_0x345ce0),this[_0x1714a1(0x66e)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x404914]||{'x':0x0,'y':0x0});},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x507)]=function(){const _0x383b96=_0x5d7dff;this[_0x383b96(0x48f)]>0x0&&(this['_anchor']['x']=this[_0x383b96(0x75b)](this[_0x383b96(0x8d2)]['x'],this['_targetAnchor']['x']),this['_anchor']['y']=this[_0x383b96(0x75b)](this[_0x383b96(0x8d2)]['y'],this[_0x383b96(0x4c9)]['y']));},Game_Picture['prototype'][_0x5d7dff(0x54c)]=function(_0x2b04c4){const _0x377a21=_0x5d7dff;this[_0x377a21(0x8d2)]=_0x2b04c4,this[_0x377a21(0x4c9)]=JsonEx[_0x377a21(0x69d)](this[_0x377a21(0x8d2)]);},Game_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x66e)]=function(_0x1ae577){this['_targetAnchor']=_0x1ae577;},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x1dd)]=Sprite_Picture['prototype'][_0x5d7dff(0x15b)],Sprite_Picture[_0x5d7dff(0x4fa)][_0x5d7dff(0x15b)]=function(){const _0x38617a=_0x5d7dff,_0x592629=this[_0x38617a(0x370)]();!_0x592629[_0x38617a(0x338)]()?VisuMZ['CoreEngine'][_0x38617a(0x1dd)][_0x38617a(0x5d5)](this):(this[_0x38617a(0x338)]['x']=_0x592629[_0x38617a(0x338)]()['x'],this[_0x38617a(0x338)]['y']=_0x592629['anchor']()['y']);},Game_Action[_0x5d7dff(0x4fa)][_0x5d7dff(0x8a8)]=function(_0x52a21f){const _0x3512d2=_0x5d7dff;if(_0x52a21f){const _0x10ff3d=_0x52a21f[_0x3512d2(0x51f)];if(_0x10ff3d===0x1&&this[_0x3512d2(0x213)]()[_0x3512d2(0x6db)]()!==0x1)this['setAttack']();else _0x10ff3d===0x2&&this[_0x3512d2(0x213)]()[_0x3512d2(0x527)]()!==0x2?this[_0x3512d2(0x2f5)]():this[_0x3512d2(0x6f6)](_0x10ff3d);}else this[_0x3512d2(0x577)]();},Game_Actor[_0x5d7dff(0x4fa)][_0x5d7dff(0x2a5)]=function(){const _0x4c1a82=_0x5d7dff;return this[_0x4c1a82(0x847)]()['filter'](_0x5029df=>this[_0x4c1a82(0x394)](_0x5029df)&&this[_0x4c1a82(0x845)]()[_0x4c1a82(0x617)](_0x5029df[_0x4c1a82(0x881)]));},Window_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x742)]=function(){const _0x4b037f=_0x5d7dff;this['_dimmerSprite']=new Sprite(),this[_0x4b037f(0x8c6)][_0x4b037f(0x78d)]=new Bitmap(0x0,0x0),this[_0x4b037f(0x8c6)]['x']=0x0,this[_0x4b037f(0x161)](this[_0x4b037f(0x8c6)]);},Window_Base['prototype'][_0x5d7dff(0x57d)]=function(){const _0x3f12f6=_0x5d7dff;if(this['_dimmerSprite']){const _0x508ea5=this[_0x3f12f6(0x8c6)]['bitmap'],_0x431088=this['width'],_0x27b1c7=this[_0x3f12f6(0x8af)],_0x533467=this[_0x3f12f6(0x79f)],_0xfd954a=ColorManager[_0x3f12f6(0x3d4)](),_0x238953=ColorManager[_0x3f12f6(0x5ab)]();_0x508ea5[_0x3f12f6(0x5ca)](_0x431088,_0x27b1c7),_0x508ea5[_0x3f12f6(0x762)](0x0,0x0,_0x431088,_0x533467,_0x238953,_0xfd954a,!![]),_0x508ea5[_0x3f12f6(0x878)](0x0,_0x533467,_0x431088,_0x27b1c7-_0x533467*0x2,_0xfd954a),_0x508ea5['gradientFillRect'](0x0,_0x27b1c7-_0x533467,_0x431088,_0x533467,_0xfd954a,_0x238953,!![]),this['_dimmerSprite'][_0x3f12f6(0x64a)](0x0,0x0,_0x431088,_0x27b1c7);}},Game_Actor[_0x5d7dff(0x4fa)][_0x5d7dff(0x19b)]=function(){const _0x5ce438=_0x5d7dff;for(let _0x5d6a33=0x0;_0x5d6a33<this['numActions']();_0x5d6a33++){const _0xd39093=this[_0x5ce438(0x646)]();let _0x6deade=Number[_0x5ce438(0x282)];this['setAction'](_0x5d6a33,_0xd39093[0x0]);for(const _0x29e027 of _0xd39093){const _0x28ed05=_0x29e027[_0x5ce438(0x691)]();_0x28ed05>_0x6deade&&(_0x6deade=_0x28ed05,this['setAction'](_0x5d6a33,_0x29e027));}}this['setActionState'](_0x5ce438(0x6e3));},Window_BattleItem[_0x5d7dff(0x4fa)][_0x5d7dff(0x137)]=function(_0x4e4529){const _0x5eeb68=_0x5d7dff;return BattleManager[_0x5eeb68(0x603)]()?BattleManager[_0x5eeb68(0x603)]()['canUse'](_0x4e4529):Window_ItemList['prototype'][_0x5eeb68(0x137)]['call'](this,_0x4e4529);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x458)]=Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x10a)],Scene_Map['prototype']['createSpriteset']=function(){const _0x4a935a=_0x5d7dff;VisuMZ[_0x4a935a(0x7ac)][_0x4a935a(0x458)][_0x4a935a(0x5d5)](this);const _0x52dd57=this[_0x4a935a(0x1cb)]['_timerSprite'];if(_0x52dd57)this[_0x4a935a(0x6e6)](_0x52dd57);},VisuMZ['CoreEngine']['Scene_Battle_createSpritesetFix']=Scene_Battle['prototype'][_0x5d7dff(0x10a)],Scene_Battle[_0x5d7dff(0x4fa)]['createSpriteset']=function(){const _0x432abf=_0x5d7dff;VisuMZ[_0x432abf(0x7ac)][_0x432abf(0x437)][_0x432abf(0x5d5)](this);const _0x1be391=this[_0x432abf(0x1cb)][_0x432abf(0x177)];if(_0x1be391)this[_0x432abf(0x6e6)](_0x1be391);},Sprite_Actor[_0x5d7dff(0x4fa)][_0x5d7dff(0x75f)]=function(){const _0x52daa9=_0x5d7dff;Sprite_Battler[_0x52daa9(0x4fa)]['update'][_0x52daa9(0x5d5)](this),this[_0x52daa9(0x420)]();if(this['_actor'])this[_0x52daa9(0x529)]();else this[_0x52daa9(0x257)]!==''&&(this['_battlerName']='');},Window[_0x5d7dff(0x4fa)]['_refreshArrows']=function(){const _0x1a80eb=_0x5d7dff,_0x362c1b=this[_0x1a80eb(0x2f6)],_0x2e5e4c=this['_height'],_0x1ea9cd=0x18,_0x5d28a8=_0x1ea9cd/0x2,_0x1f587c=0x60+_0x1ea9cd,_0x2433d6=0x0+_0x1ea9cd;this[_0x1a80eb(0x693)][_0x1a80eb(0x78d)]=this[_0x1a80eb(0x29f)],this[_0x1a80eb(0x693)][_0x1a80eb(0x338)]['x']=0.5,this[_0x1a80eb(0x693)][_0x1a80eb(0x338)]['y']=0.5,this['_downArrowSprite'][_0x1a80eb(0x64a)](_0x1f587c+_0x5d28a8,_0x2433d6+_0x5d28a8+_0x1ea9cd,_0x1ea9cd,_0x5d28a8),this[_0x1a80eb(0x693)]['move'](Math[_0x1a80eb(0xd6)](_0x362c1b/0x2),Math[_0x1a80eb(0xd6)](_0x2e5e4c-_0x5d28a8)),this[_0x1a80eb(0x537)][_0x1a80eb(0x78d)]=this[_0x1a80eb(0x29f)],this[_0x1a80eb(0x537)][_0x1a80eb(0x338)]['x']=0.5,this[_0x1a80eb(0x537)][_0x1a80eb(0x338)]['y']=0.5,this[_0x1a80eb(0x537)][_0x1a80eb(0x64a)](_0x1f587c+_0x5d28a8,_0x2433d6,_0x1ea9cd,_0x5d28a8),this[_0x1a80eb(0x537)]['move'](Math['round'](_0x362c1b/0x2),Math['round'](_0x5d28a8));},Window['prototype'][_0x5d7dff(0x2ae)]=function(){const _0x4e5806=_0x5d7dff,_0x40a2e3=0x90,_0x2a6f42=0x60,_0x5f180c=0x18;this[_0x4e5806(0x6f1)][_0x4e5806(0x78d)]=this[_0x4e5806(0x29f)],this[_0x4e5806(0x6f1)][_0x4e5806(0x338)]['x']=0.5,this['_pauseSignSprite'][_0x4e5806(0x338)]['y']=0x1,this['_pauseSignSprite'][_0x4e5806(0x75c)](Math[_0x4e5806(0xd6)](this[_0x4e5806(0x2f6)]/0x2),this[_0x4e5806(0x792)]),this[_0x4e5806(0x6f1)]['setFrame'](_0x40a2e3,_0x2a6f42,_0x5f180c,_0x5f180c),this[_0x4e5806(0x6f1)]['alpha']=0xff;},Window[_0x5d7dff(0x4fa)][_0x5d7dff(0x6fc)]=function(){const _0x5bf7b8=_0x5d7dff,_0x2dac96=this[_0x5bf7b8(0x78e)][_0x5bf7b8(0x6d6)][_0x5bf7b8(0x56d)](new Point(0x0,0x0)),_0xea33da=this[_0x5bf7b8(0x78e)][_0x5bf7b8(0x566)];_0xea33da['x']=_0x2dac96['x']+this[_0x5bf7b8(0x2a2)]['x'],_0xea33da['y']=_0x2dac96['y']+this[_0x5bf7b8(0x2a2)]['y'],_0xea33da[_0x5bf7b8(0x47e)]=Math['ceil'](this[_0x5bf7b8(0x525)]*this['scale']['x']),_0xea33da[_0x5bf7b8(0x8af)]=Math[_0x5bf7b8(0x5c6)](this[_0x5bf7b8(0x65e)]*this['scale']['y']);},VisuMZ['CoreEngine'][_0x5d7dff(0x426)]=Window[_0x5d7dff(0x4fa)][_0x5d7dff(0x318)],Window[_0x5d7dff(0x4fa)][_0x5d7dff(0x318)]=function(){const _0x59caf5=_0x5d7dff,_0xc10adf=VisuMZ[_0x59caf5(0x7ac)][_0x59caf5(0x37c)][_0x59caf5(0x448)][_0x59caf5(0x76c)]??!![];if(!_0xc10adf)return VisuMZ[_0x59caf5(0x7ac)][_0x59caf5(0x426)][_0x59caf5(0x5d5)](this);const _0x16e39a=this[_0x59caf5(0x283)],_0x3385d9=Math[_0x59caf5(0xee)](0x0,this[_0x59caf5(0x2f6)]-_0x16e39a*0x2),_0x28f0fd=Math[_0x59caf5(0xee)](0x0,this[_0x59caf5(0x792)]-_0x16e39a*0x2),_0x21c4db=this['_backSprite'],_0x33e2ed=_0x21c4db[_0x59caf5(0x80c)][0x0];_0x21c4db[_0x59caf5(0x78d)]=this[_0x59caf5(0x29f)],_0x21c4db[_0x59caf5(0x64a)](0x0,0x0,0x60,0x60),_0x21c4db[_0x59caf5(0x75c)](_0x16e39a,_0x16e39a),_0x21c4db[_0x59caf5(0x1c7)]['x']=_0x3385d9/0x60,_0x21c4db[_0x59caf5(0x1c7)]['y']=_0x28f0fd/0x60,_0x33e2ed[_0x59caf5(0x78d)]=this[_0x59caf5(0x29f)],_0x33e2ed[_0x59caf5(0x64a)](0x0,0x60,0x60,0x60),_0x33e2ed[_0x59caf5(0x75c)](0x0,0x0,_0x3385d9,_0x28f0fd),_0x33e2ed[_0x59caf5(0x1c7)]['x']=0x1/_0x21c4db[_0x59caf5(0x1c7)]['x'],_0x33e2ed['scale']['y']=0x1/_0x21c4db[_0x59caf5(0x1c7)]['y'],_0x21c4db[_0x59caf5(0x297)](this[_0x59caf5(0x888)]);},Game_Temp[_0x5d7dff(0x4fa)][_0x5d7dff(0x1df)]=function(){const _0x401af3=_0x5d7dff;this['_animationQueue']=[],this['_fauxAnimationQueue']=[],this[_0x401af3(0x7c1)]=[],this[_0x401af3(0x4e7)]=[];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x13b)]=Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x7f2)],Scene_Base[_0x5d7dff(0x4fa)][_0x5d7dff(0x7f2)]=function(){const _0x28ef20=_0x5d7dff;if($gameTemp)$gameTemp[_0x28ef20(0x1df)]();VisuMZ[_0x28ef20(0x7ac)][_0x28ef20(0x13b)][_0x28ef20(0x5d5)](this);},Bitmap[_0x5d7dff(0x4fa)]['measureTextWidthNoRounding']=function(_0x228fc7){const _0x5a9148=_0x5d7dff,_0x374825=this[_0x5a9148(0x575)];_0x374825['save'](),_0x374825[_0x5a9148(0x487)]=this[_0x5a9148(0x614)]();const _0xdefc8d=_0x374825[_0x5a9148(0x1ed)](_0x228fc7)[_0x5a9148(0x47e)];return _0x374825[_0x5a9148(0xfc)](),_0xdefc8d;},Window_Message[_0x5d7dff(0x4fa)][_0x5d7dff(0x7eb)]=function(_0x1c0aab){const _0x1c138a=_0x5d7dff;return this['useFontWidthFix']()?this['contents']['measureTextWidthNoRounding'](_0x1c0aab):Window_Base[_0x1c138a(0x4fa)][_0x1c138a(0x7eb)][_0x1c138a(0x5d5)](this,_0x1c0aab);},Window_Message[_0x5d7dff(0x4fa)][_0x5d7dff(0x62e)]=function(){const _0x1c9d78=_0x5d7dff;return VisuMZ[_0x1c9d78(0x7ac)][_0x1c9d78(0x37c)]['QoL'][_0x1c9d78(0x7fb)]??!![];},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x2b8)]=Game_Action[_0x5d7dff(0x4fa)][_0x5d7dff(0x7a3)],Game_Action[_0x5d7dff(0x4fa)][_0x5d7dff(0x7a3)]=function(){const _0x35f2df=_0x5d7dff;return this['item']()?VisuMZ[_0x35f2df(0x7ac)][_0x35f2df(0x2b8)]['call'](this):0x0;},VisuMZ['CoreEngine'][_0x5d7dff(0x6e9)]=Game_Action[_0x5d7dff(0x4fa)][_0x5d7dff(0x7c3)],Game_Action[_0x5d7dff(0x4fa)][_0x5d7dff(0x7c3)]=function(){const _0x44a336=_0x5d7dff;if(this[_0x44a336(0x213)]()&&this[_0x44a336(0x213)]()[_0x44a336(0x5d0)]())VisuMZ['CoreEngine'][_0x44a336(0x6e9)]['call'](this);else BattleManager[_0x44a336(0x43e)]?VisuMZ[_0x44a336(0x7ac)][_0x44a336(0x6e9)][_0x44a336(0x5d5)](this):this['clear']();},VisuMZ['CoreEngine'][_0x5d7dff(0x5dc)]=BattleManager[_0x5d7dff(0x7ee)],BattleManager[_0x5d7dff(0x7ee)]=function(_0x448f2c,_0x4db08d){const _0x4de60d=_0x5d7dff;this[_0x4de60d(0x43e)]=!![],VisuMZ[_0x4de60d(0x7ac)][_0x4de60d(0x5dc)][_0x4de60d(0x5d5)](this,_0x448f2c,_0x4db08d),this[_0x4de60d(0x43e)]=undefined;},Sprite_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x365)]=function(){return 0x24;},Sprite_Name[_0x5d7dff(0x4fa)][_0x5d7dff(0x7f4)]=function(){const _0x13e8dc=_0x5d7dff,_0x428894=this['name'](),_0x42bb7c=this[_0x13e8dc(0x36c)](),_0x16e212=this[_0x13e8dc(0x365)]();this[_0x13e8dc(0x5fc)](),this[_0x13e8dc(0x78d)][_0x13e8dc(0x577)](),this[_0x13e8dc(0x78d)]['drawTextTopAligned'](_0x428894,0x4,0x0,_0x42bb7c-0xa,_0x16e212,_0x13e8dc(0x63c));},Bitmap[_0x5d7dff(0x4fa)][_0x5d7dff(0x3fa)]=function(_0x382662,_0x1d60a5,_0x420973,_0x3db210,_0x2b0205,_0x3dbf87){const _0x122b16=_0x5d7dff,_0x4d5aaa=this[_0x122b16(0x575)],_0x5214a7=_0x4d5aaa[_0x122b16(0x16a)];_0x3db210=_0x3db210||0xffffffff;let _0x809894=_0x1d60a5,_0x1c8c33=Math[_0x122b16(0xd6)](_0x420973+0x18/0x2+this[_0x122b16(0x5bc)]*0.35);_0x3dbf87===_0x122b16(0x445)&&(_0x809894+=_0x3db210/0x2),_0x3dbf87==='right'&&(_0x809894+=_0x3db210),_0x4d5aaa[_0x122b16(0x1b1)](),_0x4d5aaa[_0x122b16(0x487)]=this[_0x122b16(0x614)](),_0x4d5aaa[_0x122b16(0x823)]=_0x3dbf87,_0x4d5aaa['textBaseline']=_0x122b16(0x75a),_0x4d5aaa[_0x122b16(0x16a)]=0x1,this[_0x122b16(0x3f4)](_0x382662,_0x809894,_0x1c8c33,_0x3db210),_0x4d5aaa[_0x122b16(0x16a)]=_0x5214a7,this[_0x122b16(0x829)](_0x382662,_0x809894,_0x1c8c33,_0x3db210),_0x4d5aaa[_0x122b16(0xfc)](),this['_baseTexture'][_0x122b16(0x75f)]();},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x500)]=BattleManager[_0x5d7dff(0x4d1)],BattleManager[_0x5d7dff(0x4d1)]=function(_0x1b507c){const _0x1a80e8=_0x5d7dff;if(this[_0x1a80e8(0x545)]&&this[_0x1a80e8(0x545)][_0x1a80e8(0x86e)]()===_0x1b507c[_0x1a80e8(0x86e)]())return![];return VisuMZ[_0x1a80e8(0x7ac)]['BattleManager_checkSubstitute'][_0x1a80e8(0x5d5)](this,_0x1b507c);},BattleManager[_0x5d7dff(0x3e0)]=function(){const _0x5f0f1b=_0x5d7dff;if(this[_0x5f0f1b(0x545)])this[_0x5f0f1b(0x6d3)]['endAction'](this['_subject']);this['_phase']=_0x5f0f1b(0x396),this[_0x5f0f1b(0x545)]&&this[_0x5f0f1b(0x545)][_0x5f0f1b(0x52d)]()===0x0&&(this['endBattlerActions'](this[_0x5f0f1b(0x545)]),this['_subject']=null);},Bitmap['prototype'][_0x5d7dff(0x149)]=function(){const _0x2c65f4=_0x5d7dff;this[_0x2c65f4(0x128)]=new Image(),this[_0x2c65f4(0x128)]['onload']=this[_0x2c65f4(0x58f)][_0x2c65f4(0x134)](this),this['_image'][_0x2c65f4(0x4aa)]=this[_0x2c65f4(0x1cc)][_0x2c65f4(0x134)](this),this[_0x2c65f4(0x3bb)](),this[_0x2c65f4(0x3c0)]=_0x2c65f4(0x410),Utils[_0x2c65f4(0x796)]()?this[_0x2c65f4(0x409)]():(this[_0x2c65f4(0x128)]['src']=this['_url'],![]&&this[_0x2c65f4(0x128)]['width']>0x0&&(this[_0x2c65f4(0x128)][_0x2c65f4(0x5ad)]=null,this[_0x2c65f4(0x58f)]()));},Scene_Skill[_0x5d7dff(0x4fa)][_0x5d7dff(0x2d3)]=function(){const _0x4cb120=_0x5d7dff;Scene_MenuBase[_0x4cb120(0x4fa)]['onActorChange'][_0x4cb120(0x5d5)](this),this[_0x4cb120(0x31c)](),this[_0x4cb120(0x492)][_0x4cb120(0x252)](),this[_0x4cb120(0x492)][_0x4cb120(0x6e8)](),this['_skillTypeWindow'][_0x4cb120(0x79c)]();},Scene_Skill[_0x5d7dff(0x4fa)][_0x5d7dff(0x336)]=function(){const _0x12876e=_0x5d7dff;return this[_0x12876e(0x828)]&&this['_skillTypeWindow'][_0x12876e(0x411)];},Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x5d1)]=function(_0x47a6f1,_0xd04e18,_0x4a083e){const _0x4cdc74=_0x5d7dff,_0x18d30c=this[_0x4cdc74(0x7f7)](),_0x5ca03d=this[_0x4cdc74(0x210)](_0x47a6f1,_0xd04e18);for(const _0x3df62c of _0x5ca03d){const _0x41ceee=_0x18d30c[_0x3df62c];if(_0x41ceee===undefined||_0x41ceee===null){if($gameTemp[_0x4cdc74(0x898)]()&&!DataManager[_0x4cdc74(0x143)]()){let _0x5d6f5e=_0x4cdc74(0x741)+'\x0a';_0x5d6f5e+=_0x4cdc74(0x604)+'\x0a',_0x5d6f5e+=_0x4cdc74(0x12a);if(this['showIncompleteTilesetError']())alert(_0x5d6f5e),SceneManager[_0x4cdc74(0x3c9)]();else{if(!this['_displayedPassageError'])console[_0x4cdc74(0x2eb)](_0x5d6f5e);this[_0x4cdc74(0x359)]=!![];}}}if((_0x41ceee&0x10)!==0x0)continue;if((_0x41ceee&_0x4a083e)===0x0)return!![];if((_0x41ceee&_0x4a083e)===_0x4a083e)return![];}return![];},Game_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x820)]=function(){const _0x494bfd=_0x5d7dff;if(Imported[_0x494bfd(0x608)])return!![];if(Imported[_0x494bfd(0x322)])return!![];return![];},Sprite_Animation['prototype']['saveViewport']=function(_0x99ad84){const _0x1fdbe1=_0x5d7dff;!this[_0x1fdbe1(0x3ed)]&&(this[_0x1fdbe1(0x3ed)]=_0x99ad84['gl'][_0x1fdbe1(0x637)](_0x99ad84['gl']['VIEWPORT']));},VisuMZ[_0x5d7dff(0x7ac)]['Scene_Map_shouldAutosave']=Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x3ba)],Scene_Map[_0x5d7dff(0x4fa)][_0x5d7dff(0x3ba)]=function(){const _0xd636d6=_0x5d7dff,_0x18906a=SceneManager[_0xd636d6(0x475)][_0xd636d6(0x814)];if([_0xd636d6(0xd2),_0xd636d6(0x306),'Scene_TitleTransition',_0xd636d6(0x4b9)][_0xd636d6(0x617)](_0x18906a))return![];return VisuMZ[_0xd636d6(0x7ac)][_0xd636d6(0x872)][_0xd636d6(0x5d5)](this);},VisuMZ['CoreEngine'][_0x5d7dff(0x29d)]=Window_SkillList['prototype'][_0x5d7dff(0x617)],Window_SkillList['prototype'][_0x5d7dff(0x617)]=function(_0x561772){const _0x26e73a=_0x5d7dff;if(this[_0x26e73a(0x736)]<=0x0)return![];return VisuMZ[_0x26e73a(0x7ac)][_0x26e73a(0x29d)][_0x26e73a(0x5d5)](this,_0x561772);},VisuMZ[_0x5d7dff(0x7ac)][_0x5d7dff(0x6f5)]=Game_Battler[_0x5d7dff(0x4fa)]['initTpbChargeTime'],Game_Battler[_0x5d7dff(0x4fa)][_0x5d7dff(0x42c)]=function(_0x22f4f8){const _0x4eaea8=_0x5d7dff;VisuMZ[_0x4eaea8(0x7ac)]['Game_Battler_initTpbChargeTime'][_0x4eaea8(0x5d5)](this,_0x22f4f8),isNaN(this[_0x4eaea8(0x6fa)])&&(VisuMZ[_0x4eaea8(0x7ac)][_0x4eaea8(0x6f5)][_0x4eaea8(0x5d5)](this,_0x22f4f8),isNaN(this[_0x4eaea8(0x6fa)])&&(this[_0x4eaea8(0x6fa)]=0x0));},Game_Battler['prototype'][_0x5d7dff(0x1bc)]=function(){const _0x46f678=_0x5d7dff;this[_0x46f678(0x8a5)]===_0x46f678(0x869)&&(this[_0x46f678(0x6fa)]+=this[_0x46f678(0x6c9)](),isNaN(this[_0x46f678(0x6fa)])&&(this[_0x46f678(0x6fa)]=this['tpbAcceleration'](),isNaN(this[_0x46f678(0x6fa)])&&(this[_0x46f678(0x6fa)]=0x0)),this[_0x46f678(0x6fa)]>=0x1&&(this[_0x46f678(0x6fa)]=0x1,this[_0x46f678(0x45b)]()));};