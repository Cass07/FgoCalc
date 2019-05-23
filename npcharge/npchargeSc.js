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


var NpCount;
var ServantClass;
var NpMagTable = new Array();
var NpDmTable = new Array(300, 400, 450, 475, 500);

var ClassDmgMagTable =
    {
        "saber" : 1,
        "archer" : 0.95,
        "lancer" : 1.05,
        "rider" : 1,
        "caster" : 0.9,
        "assassin" : 0.9,
        "berserker" : 1.1,
        "avenger" : 1.1,
        "ruler" : 1.1,
        "alterego" : 1,
        "mooncancer" : 1,
        "foreigner" : 1
    };
var CommandMagTable = {
  1.5 : 0.8,
  3 : 1
};

var Testvar = document.getElementById("Testvar"); //디버깅용

var calcBtn = document.getElementById("calc");

getData();//parsing 진행

function NpDmgCalc()
{
    var tmp1 = Number(ATK.value)*0.23*CommandMagTable[NpCommand.value]*ClassDmgMagTable[ServantClass];
    var AllBuff = (100+Number(AtkBuff.value))/100*(100+Number(CmdBuff.value))/100*(100+Number(NpDmgBuff.value))/100;
    var NpOriSp_tmp = Number(NpOriSp.value)*0.01;
    if(NpOriSp_tmp == 0) {
        NpOriSp_tmp = 1;
    }

    var Damage = Math.floor(tmp1*AllBuff*NpOriSp_tmp*Number(NpMag.value)/100);
    AverNpDmg.innerHTML = "무상성 난수 1 보구 대미지 : " + Number(Damage).toFixed();

}

//클래스 상성계수 출력함수
function ClassDefMag(attaker, defender)
{
    var tmp = 1;
    switch (attaker) {
        case "saber":
            if(defender=="archer" || defender == "ruler")
            {
                tmp = 0.5;
            }else if(defender == "lancer"||defender == "berserker")
            {
                tmp = 2;
            }
            break;
        case "archer":

    }


    return tmp;
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

    Testvar.innerHTML = NpMag.value;

    $('#calcBtn').prop('disabled',false);
    calcBtn.innerHTML = "계산하기";
})