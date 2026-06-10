//=============================================================================
// RPG Maker MZ - Button Picture
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Makes a picture clickable.
 * @author Yoji Ojima
 *
 * @help ButtonPicture.js
 *
 * This plugin provides a command to call a common event when a picture is
 * clicked. On click, game variable #1 is set to the clicked picture number.
 *
 * Use it in the following procedure.
 *   1. Execute "Show Picture" to display your button image.
 *   2. Call the plugin command "Set Button Picture", or from script:
 *        ButtonPicture.setButtonPicture(pictureId, commonEventId);
 *
 * @command set
 * @text Set Button Picture
 * @desc Makes the specified picture clickable.
 *
 * @arg pictureId
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * @text Picture Number
 * @desc Control number of the picture.
 *
 * @arg commonEventId
 * @type common_event
 * @default 1
 * @text Common Event
 * @desc Common event to call when the picture is clicked.
 */

/*:ja
 * @target MZ
 * @plugindesc ピクチャをクリック可能にします。
 * @author Yoji Ojima
 *
 * @help ButtonPicture.js
 *
 * このプラグインは、ピクチャのクリック時にコモンイベントを呼び出すコマンドを
 * 提供します。クリック時にゲーム変数 1 号にピクチャ番号を代入します。
 *
 * 次の手順で使用してください。
 *   1. 「ピクチャの表示」を実行して、ボタン画像を表示します。
 *   2. プラグインコマンド「ボタンピクチャの設定」を呼び出すか、スクリプトで
 *        ButtonPicture.setButtonPicture(ピクチャ番号, コモンイベントID);
 *
 * @command set
 * @text ボタンピクチャの設定
 * @desc 指定したピクチャをクリック可能にします。
 *
 * @arg pictureId
 * @type number
 * @min 1
 * @max 100
 * @default 1
 * @text ピクチャ番号
 * @desc ピクチャの管理番号です。
 *
 * @arg commonEventId
 * @type common_event
 * @default 1
 * @text コモンイベント
 * @desc ピクチャがクリックされた時に呼び出すコモンイベントです。
 */

(() => {
    const pluginName = "ButtonPicture";
    const CLICKED_PICTURE_VARIABLE_ID = 1;

    function setButtonPicture(pictureId, commonEventId) {
        const picture = $gameScreen.picture(Number(pictureId));
        if (picture) {
            picture.mzkp_commonEventId = Number(commonEventId);
            return true;
        }
        return false;
    }

    PluginManager.registerCommand(pluginName, "set", args => {
        setButtonPicture(args.pictureId, args.commonEventId);
    });

    globalThis.ButtonPicture = globalThis.ButtonPicture || {};
    globalThis.ButtonPicture.setButtonPicture = setButtonPicture;
    globalThis.ButtonPicture.clickedPictureVariableId =
        CLICKED_PICTURE_VARIABLE_ID;

    Sprite_Picture.prototype.isClickEnabled = function() {
        const picture = this.picture();
        return picture && picture.mzkp_commonEventId && !$gameMessage.isBusy();
    };

    Sprite_Picture.prototype.onClick = function() {
        const picture = this.picture();
        if (!picture || !picture.mzkp_commonEventId) {
            return;
        }
        $gameVariables.setValue(CLICKED_PICTURE_VARIABLE_ID, this._pictureId);
        $gameTemp.reserveCommonEvent(picture.mzkp_commonEventId);
    };

    Spriteset_Base.prototype.mzkp_isAnyPicturePressed = function() {
        return this._pictureContainer.children.some(sprite =>
            sprite.isPressed()
        );
    };

    const _Scene_Map_isAnyButtonPressed =
        Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
        return (
            _Scene_Map_isAnyButtonPressed.apply(this, arguments) ||
            this._spriteset.mzkp_isAnyPicturePressed()
        );
    };
})();
