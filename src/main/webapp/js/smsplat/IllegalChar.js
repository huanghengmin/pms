﻿var illegalChars = "我操|fuck you|TMD|他妈的|我日|妈的|操|fuck|2b|2B|SB|共产|党|共产党|国民党|国民|胡锦涛|习近平|江泽民|自焚|迫害|镇压|恐怖|法轮功|全能神|薄熙来|周永康|反腐|事件|人大|中全会|垃圾|民主|邪教|传销|骗|西藏|推翻|反|中共|中央|嘿咻|政变|造反|部队|军队|台湾|台独|钓鱼岛|独立|日本|屠杀|法|天安门|暗杀|闹事|情妇|二奶|小姐|鸡|同志|gay|基友|女同|上门|服务|点击|彭丽媛|主席|夫人|国务院|政法|李克强|访问|蒙|独|蒙古|新疆|胡|锦|涛|掏|韬|红灯区|反社会|反|人类|邓小平|回名|暴动|恐怖|砍杀|暴|江|习|近平|迫害|海外|华人|毛|老毛|江澤民|抗议|共党|真相|真人真事|报道|报导|分裂|国家|论坛|总|书记|中国|两个中国|两会|善|恶|温家宝|推翻|维吾尔|";

var specialChars = "#$%^&*<>";

var checkSpecialChars = function (str) {
    if (str != "") {
        for (var i = 0; i < specialChars.length; i++) {
            if (str.indexOf(specialChars.charAt(i)) != -1) {
                return false;
            }
        }
        return true;
    }
    
}