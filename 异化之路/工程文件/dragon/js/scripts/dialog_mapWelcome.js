///本脚本为显示进入关卡的文本

const stageName = $dataStageNames;
const stage_id = $gameVariables.value(3);
const stage_name = stageName[stage_id];
const dialog = '你来到了'+stage_name+ '\n' + '现在需要往前探索';

//代入变量ID6
$gameVariables.setValue(6, dialog);