//=============================================================================
// ScriptLoader.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 提供动态加载 js/scripts/ 目录下脚本文件的功能
 * @author YourName
 *
 * @help ScriptLoader.js
 *
 * 这个插件允许你在"脚本"指令中使用 $loadScriptContent("文件名") 函数
 * 来加载 js/scripts/ 目录下的 JavaScript 文件内容。
 *
 * 使用方法：
 *   在脚本指令中写入：
 *   $loadScriptContent("stage_draw");
 *   // 其他代码...
 *
 * 插件会将 $loadScriptContent("文件名") 替换为对应文件的内容，
 * 然后与脚本指令中的其他代码一起执行。
 *
 * @param ScriptPath
 * @text 脚本路径
 * @desc 脚本文件所在的目录路径
 * @default js/scripts/
 */

(() => {
    const pluginName = "ScriptLoader";
    const parameters = PluginManager.parameters(pluginName);
    const scriptPath = parameters["ScriptPath"] || "js/scripts/";

    // 同步读取文件内容的辅助函数
    function loadScriptFileSync(filename) {
        const url = scriptPath + filename + ".js";
        try {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, false); // 同步请求
            xhr.overrideMimeType("text/javascript; charset=utf-8");
            xhr.send(null);
            
            // 在 file:// 协议下，状态码可能是 0
            if (xhr.status === 0 || xhr.status === 200) {
                return xhr.responseText;
            } else {
                console.error(`[ScriptLoader] 无法加载文件: ${url} (状态码: ${xhr.status})`);
                return "";
            }
        } catch (e) {
            console.error(`[ScriptLoader] 加载文件时出错: ${url}`, e);
            return "";
        }
    }

    // 预处理脚本字符串，替换 $loadScriptContent("xxx") 调用
    function preprocessScript(script) {
        // 匹配 $loadScriptContent("文件名") 或 $loadScriptContent('文件名')
        const pattern = /\$loadScriptContent\s*\(\s*["']([^"']+)["']\s*\)/g;
        
        return script.replace(pattern, (match, filename) => {
            const fileContent = loadScriptFileSync(filename);
            if (fileContent) {
                // 返回文件内容，并确保末尾有换行
                return fileContent + (fileContent.endsWith("\n") ? "" : "\n");
            }
            // 如果加载失败，返回空字符串
            return "";
        });
    }

    // 保存原始的 command355 函数
    const _Game_Interpreter_command355 = Game_Interpreter.prototype.command355;

    // 重写 command355 函数
    Game_Interpreter.prototype.command355 = function() {
        let script = this.currentCommand().parameters[0] + "\n";
        
        // 收集所有脚本行（包括延续行，事件代码655）
        while (this.nextEventCode() === 655) {
            this._index++;
            script += this.currentCommand().parameters[0] + "\n";
        }
        
        // 预处理脚本，替换 $loadScriptContent() 调用
        script = preprocessScript(script);
        
        // 执行处理后的脚本
        eval(script);
        return true;
    };
})();
