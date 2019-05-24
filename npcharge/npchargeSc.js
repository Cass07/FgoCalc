$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
var servTable;
var Var1 = 1;
//../Data/npRecharge.csv
function getData() {
    var data = Papa.parse("https://raw.githubusercontent.com/Cass07/FgoCalc/master/Data/npRecharge.csv",{
        delimiter : ",",
        download: true,
        header:true,
        dynamicTyping:true,
        complete: function(results){
            servTable = results.data;
            //Var1 = servTable.length;
        }
    });
    //console.log(data);
}


var Servant = document.getElementById("Servant");
var ATK = document.getElementById("ATK");

var NpLev = document.getElementById("NpLev");
var NpCommand = document.getElementById("NpCommand");
var NpUpgrade = document.getElementById("NpUpgrade");
var NpMag = document.getElementById("NpMag");

var NpOriSp = document.getElementById("NpOriSp");
var NpBuff = document.getElementById("NpBuff");
var HiddenClass = document.getElementById("HiddenClass");
var NpRate = document.getElementById("NpRate");

var AtkBuff = document.getElementById("AtkBuff");
var CmdBuff = document.getElementById("CmdBuff");
var NpDmgBuff = document.getElementById("NpDmgBuff");
var DmgPlus = document.getElementById("DmgPlus");

var AverNpDmg = document.getElementById("AverNpDmg");

var calcBtn = document.getElementById("calc");


var NpCount;
var ServantClass;
var NpMagTable = new Array();
var NpDmTable = new Array(300, 400, 450, 475, 500);

var ClassDmgMagTable = new Array (1,0.95,1.05,1,0.9,0.9,1.1,1,1.1,1.1,1,1,1);
var CommandMagTable = {
  1.5 : 0.8,
  3 : 1
};
var ClassIndexTable=
    {
        "saber" : 0,
        "archer" : 1,
        "lancer" : 2,
        "rider" : 3,
        "caster" : 4,
        "assassin" : 5,
        "berserker" : 6,
        "sheilder" : 7,
        "ruler" : 8,
        "avenger" : 9,
        "mooncancer" : 10,
        "alterego" : 11,
        "foreigner" : 12
    };

//클래스 상성계수 출력 배열 : [공격][방어] ClassIndexTable 활용
var ClassDefMag =
    [
        [1,0.5,2,1,1,1,2,1,0.5,1,1,1,1],//saber
        [2,1,0.5,1,1,1,2,1,0.5,1,1,1,1],//archer
        [0.5,2,1,1,1,1,2,1,0.5,1,1,1,1],//lancer
        [1,1,1,1,2,0.5,2,1,0.5,1,1,1,1],//rider
        [1,1,1,0.5,1,2,2,1,0.5,1,1,1,1],//caster
        [1,1,1,2,0.5,1,2,1,0.5,1,1,1,1],//assassin
        [1.5,1.5,1.5,1.5,1.5,1.5,1.5,1,1.5,1.5,1.5,1.5,0.5],//berserker
        [1,1,1,1,1,1,1,1,1,1,1,1,1],//sheilder
        [1,1,1,1,1,1,2,1,1,0.5,2,1,1],//ruler
        [1,1,1,1,1,1,2,1,2,1,0.5,1,1],//avenger
        [1,1,1,1,1,1,2,1,0.5,2,1,1,1],//mooncancer
        [0.5,0.5,0.5,1.5,1.5,1.5,2,1,1,1,1,1,2],//alterego
        [1,1,1,1,1,1,2,1,1,1,1,0.5,2]//foreigner

    ];
//히든상성계수 출력 배열 [공격][방어] 천지인성수 1~5
var HiddenClassDefMag =
    [
        [1,1.1,0.9,1,1],//천
        [0.9,1,1.1,1,1],//지
        [1.1,0.9,1,1,1],//인
        [1,1,1,1,1.1],//성
        [1,1,1,1.1,1]//수
    ];
var Testvar = document.getElementById("Testvar"); //디버깅용

getData();//parsing 진행

function NpDmgCalc()
{
    var tmp1 = Number(ATK.value)*0.23*CommandMagTable[NpCommand.value]*ClassDmgMagTable[ClassIndexTable[ServantClass]];
    var AllBuff = (100+Number(AtkBuff.value))/100*(100+Number(CmdBuff.value))/100*(100+Number(NpDmgBuff.value))/100;
    var NpOriSp_tmp = Number(NpOriSp.value)*0.01;
    if(NpOriSp_tmp == 0) {
        NpOriSp_tmp = 1;
    }
    var Damage = Math.floor(tmp1*AllBuff*NpOriSp_tmp*Number(NpMag.value)/100);
    AverNpDmg.innerHTML = "무상성 난수 1 보구 대미지 : " + Number(Damage).toFixed();

}

function OverkillCal(NpDmgFinal, EnemyHP)
{
    var tmp = 0;
    var OvkCnt = 0;
    for (var i = 0; i < NpCount; i++)
    {
        if(i == NpCount-1)
        {
            tmp = NpDmgFinal;
        }else {
            tmp = tmp + Math.floor(NpDmgFinal * NpMagTable[i]/100);
        }
        if(EnemyHP <= tmp)
        {
            OvkCnt = NpCount-i;
            break;
        }
    }
    return OvkCnt;
}



Servant.addEventListener("change",function(){
    for(var i = 0; i < servTable.length-1; i++)
    {
        if(servTable[i]["name"]==Servant.value)
        {
            NpRate.value = servTable[i]["npa"];
            HiddenClass.value = servTable[i]["hidden"];
            NpCommand.value = servTable[i]["command"];
            NpUpgrade.value = servTable[i]["npupgrade"];
            NpCount = servTable[i]["npcount"];
            ServantClass = servTable[i]["class"];
            for(var j = 1; j < 11; j++)
            {
                NpMagTable[j-1] = servTable[i]["mag"+String(j)];
            }
            var NpMag_tmp = NpDmTable[NpLev.value - 1] + 100 * NpUpgrade.value;
            if(NpCommand.value == 3) {
                NpMag.value=NpMag_tmp*1.5;
            }else
            {
                NpMag.value= NpMag_tmp*2;
            }




            break;
        }

    }

})

NpLev.addEventListener("change",function(){
    var NpMag_tmp = NpDmTable[NpLev.value - 1] + 100 * NpUpgrade.value;
    if(NpCommand.value == 3) {
        NpMag.value=NpMag_tmp*1.5;
    }else
    {
        NpMag.value= NpMag_tmp*2;
    }
})



calcBtn.addEventListener("click",function(){

    $('#calcBtn').prop('disabled',true);
    calcBtn.innerHTML = "Processing...";
    NpDmgCalc();
    var ockcnt = OverkillCal(110000,20900);
    Var1 = Var1+"오버킬 : " + ockcnt.toString();
    Testvar.innerHTML = Var1;

    $('#calcBtn').prop('disabled',false);
    calcBtn.innerHTML = "계산하기";
})