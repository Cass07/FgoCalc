$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

var servTable;//csv 데이터 저장 배열
var EnemyPresetTable;
var supportTable;
var supportSkillTable;
//csv 데이터 호출, 파싱 함수
function getData() {
    //(StartStat,MaxStat, Rare, GrailLev)
    var data = Papa.parse("https://raw.githubusercontent.com/goingtofgo/FgoCalc/develop2/Data/npRecharge.csv",{
        delimiter : ",",
        download: true,
        header:true,
        dynamicTyping:true,
        complete: function(results){
            servTable = results.data;
            //Var1 = servTable.length;
            for (var i = 0; i < servTable.length - 1; i++)
            {
                Servant.innerHTML += "<option value = \"" + servTable[i]["name"] + "\">"+servTable[i]["name_list"]+"</option>";
            }
            //Servant table 0 index의 값으로 초기화
            NpRate.value = servTable[0]["npa"];
            HiddenClass.value = servTable[0]["hidden"];
            NpCommand.value = servTable[0]["command"];
            ServantATK.value = Number(servTable[0]["atk"])+1000; //은포우 기본 적용
            NpMagTable = [servTable[0]["mag1"],servTable[0]["mag2"],servTable[0]["mag3"],servTable[0]["mag4"],
                servTable[0]["mag5"],servTable[0]["mag6"],servTable[0]["mag7"],servTable[0]["mag8"],
                servTable[0]["mag9"],servTable[0]["mag10"]];
            NpUpgrade.value = servTable[0]["npupgrade"];
            NpCount = servTable[0]["npcount"];
            ServantClass = servTable[0]["class"];
            var NpMag_tmp = NpDmTable[0] + 100 * NpUpgrade.value;
            if(NpCommand.value == 3) {
                NpMag.value=NpMag_tmp*1.5;
            }else
            {
                NpMag.value= NpMag_tmp*2;
            }
        }
    });
    var servdata = Papa.parse("https://raw.githubusercontent.com/goingtofgo/FgoCalc/develop2/Data/ServDataBase.csv",{
        delimiter : ",",
        download: true,
        header:true,
        dynamicTyping:true,
        complete: function(results){
            servTable2 = results.data;

        }
    });

    var data2 = Papa.parse("https://raw.githubusercontent.com/Cass07/FgoCalc/master/Data/EnemyPreset.csv",{
        delimiter : ",",
        download: true,
        header:true,
        dynamicTyping:true,
        complete: function(results){
            EnemyPresetTable = results.data;
            for(var i = 1; i < EnemyPresetTable.length-1; i++) {
                EnemyDataPreset.innerHTML += "<option value = \"" + String(i) + "\">"+EnemyPresetTable[i]["name"]+"</option>";
            }
        }
    });
    //console.log(data);
    var supportdata = Papa.parse("https://raw.githubusercontent.com/goingtofgo/FgoCalc/develop2/Data/SupporterData.csv",{
        delimiter : ",",
        download: true,
        header:true,
        dynamicTyping:true,
        complete: function(results){
            supportTable = results.data;
            for(var i = 0; i < supportTable.length-1; i++) {
                Supporter1.innerHTML += "<option value = \"" + String(i) + "\">"+supportTable[i]["name"]+"</option>";
                Supporter2.innerHTML += "<option value = \"" + String(i) + "\">"+supportTable[i]["name"]+"</option>";
                Supporter3.innerHTML += "<option value = \"" + String(i) + "\">"+supportTable[i]["name"]+"</option>";
            }
        }
    });

    var skilldata = Papa.parse("https://raw.githubusercontent.com/goingtofgo/FgoCalc/develop2/Data/SupporterSKillData.csv",{
        delimiter : ",",
        download: true,
        header:true,
        dynamicTyping:true,
        complete: function(results){
            supportSkillTable = results.data;
        }
    });
}

var UpdateDate = document.getElementById("UpdateDate");

//입력 데이터 선언-서번트 데이터
var Servant = document.getElementById("Servant");
var ServantATK = document.getElementById("ServantATK");
var CraftATK = document.getElementById("CraftATK");
var Goldfow = document.getElementById("Goldfow");
var Grail = document.getElementById("Grail");
var ATK;
var GrailATK;
var SupportBuff = new Array(12);
var Supporter1 = document.getElementById("Supporter1");
var Supporter2 = document.getElementById("Supporter2");
var Supporter3 = document.getElementById("Supporter3");
var Skill1_1 = document.getElementById("Skill1_1");
var Skill1_2 = document.getElementById("Skill1_2");
var Skill1_3 = document.getElementById("Skill1_3");
var Bond1 = document.getElementById("Bond1");
var Support_busterbuf;
var Support_artsbuf;
var Support_quickbuf;
var Support_npgainbuf;
var Support_atkbuf;
var Support_npplus;
var Support_dmgplus;
var Support_criiticalbuf;
var Support_startbuf;
var Support_npbuf;
var Support_npextramul;

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

//입력 데이터 선언-에너미 데이터
var IsNotEnemy1 = document.getElementById("IsNotEnemy1");
var Enemy1HP = document.getElementById("Enemy1HP");
var Enemy1Class = document.getElementById("Enemy1Class");
var IsEnemy1Case2 = document.getElementById("IsEnemy1Case2");
var Enemy1HiddenClass = document.getElementById("Enemy1HiddenClass");
var Enemy1Def = document.getElementById("Enemy1Def");
var Enemy1Cmd = document.getElementById("Enemy1Cmd");
var Enemy1NpDmg = document.getElementById("Enemy1NpDmg");

var IsNotEnemy2 = document.getElementById("IsNotEnemy2");
var Enemy2HP = document.getElementById("Enemy2HP");
var Enemy2Class = document.getElementById("Enemy2Class");
var IsEnemy2Case2 = document.getElementById("IsEnemy2Case2");
var Enemy2HiddenClass = document.getElementById("Enemy2HiddenClass");
var Enemy2Def = document.getElementById("Enemy2Def");
var Enemy2Cmd = document.getElementById("Enemy2Cmd");
var Enemy2NpDmg = document.getElementById("Enemy2NpDmg");

var IsNotEnemy3 = document.getElementById("IsNotEnemy3");
var Enemy3HP = document.getElementById("Enemy3HP");
var Enemy3Class = document.getElementById("Enemy3Class");
var IsEnemy3Case2 = document.getElementById("IsEnemy3Case2");
var Enemy3HiddenClass = document.getElementById("Enemy3HiddenClass");
var Enemy3Def = document.getElementById("Enemy3Def");
var Enemy3Cmd = document.getElementById("Enemy3Cmd");
var Enemy3NpDmg = document.getElementById("Enemy3NpDmg");

var EnemyDataPreset = document.getElementById("EnemyDataPreset");
var EnemyDataPresetResetBtn = document.getElementById("EnemyDataPresetResetBtn");

//평균 보구 대미지 출력용 변수
var AverNpDmg = document.getElementById("AverNpDmg");

//출력 테이블용 변수
var Enemy1OverNumMin = document.getElementById("Enemy1OverNumMin");
var Enemy2OverNumMin = document.getElementById("Enemy2OverNumMin");
var Enemy3OverNumMin = document.getElementById("Enemy3OverNumMin");

var Enemy1OverNpMin = document.getElementById("Enemy1OverNpMin");
var Enemy2OverNpMin = document.getElementById("Enemy2OverNpMin");
var Enemy3OverNpMin = document.getElementById("Enemy3OverNpMin");
var OverNpMinSum = document.getElementById("OverNpMinSum");

var Enemy1OverNumMax = document.getElementById("Enemy1OverNumMax");
var Enemy2OverNumMax = document.getElementById("Enemy2OverNumMax");
var Enemy3OverNumMax = document.getElementById("Enemy3OverNumMax");

var Enemy1OverNpMax = document.getElementById("Enemy1OverNpMax");
var Enemy2OverNpMax = document.getElementById("Enemy2OverNpMax");
var Enemy3OverNpMax = document.getElementById("Enemy3OverNpMax");
var OverNpMaxSum = document.getElementById("OverNpMaxSum");

//계산 버튼
var calcBtn = document.getElementById("calc");

var GotoTop = document.getElementById("GotoTop");
var GotoMain = document.getElementById("GotoMain");


//계산용 전역변수 선언
var NpCount;
var ServantClass;
var NpMagTable = new Array();

//각종 데이터 상수 테이블 선언&초기화
const NpDmTable = new Array(300, 400, 450, 475, 500);//보구계수
const NpDmTableSp = [
    [400,500,550,575,600],//파라켈
    [900,1200,1350,1425,1500] //진궁
];

const ClassDmgMagTable = new Array (1,0.95,1.05,1,0.9,0.9,1.1,1,1.1,1.1,1,1,1);//클래스 보정계수
const ClassNpRechargeMagTable = new Array(1,1,1,1.1,1.2,0.9,0.8,1,1,1,1.2,1,1);//적 클래스 NP보정계수
const CommandMagTable = {
  1 : 0.8,
  3 : 1
};//커멘드 보정계수

const ClassIndexTable=//클래스 텍스트 인덱스 테이블
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
const ClassDefMag =
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
const HiddenClassDefMag =
    [
        [1,1.1,0.9,1,1],//천
        [0.9,1,1.1,1,1],//지
        [1.1,0.9,1,1,1],//인
        [1,1,1,1,1.1],//성
        [1,1,1,1.1,1]//수
    ];

document.addEventListener('DOMContentLoaded',function () {
    getData();//parsing 진행 1회
    printDate(UpdateDate);
},false);

window.onload  = function()
{
/**/
}

//계산 함수
function NpDmgCalc()//무상성 비난수 보구 대미지 계산&출력
{
    var tmp1 = Number(ATK)*0.23*CommandMagTable[NpCommand.value]*ClassDmgMagTable[ClassIndexTable[ServantClass]];
    var AllBuff = (100+Number(AtkBuff.value))/100*(100+Number(CmdBuff.value))/100*(100+Number(NpDmgBuff.value))/100;
    var NpOriSp_tmp = Number(NpOriSp.value)*0.01;
    if(NpOriSp_tmp == 0) {
        NpOriSp_tmp = 1;
    }
    if(ServantClass == "berserker")
    {
        NpOriSp_tmp *= 1.5;
    }
    var Damage = Math.floor(tmp1*AllBuff*NpOriSp_tmp*Number(NpMag.value)/100)+Number(DmgPlus.value);
    AverNpDmg.innerHTML = "무상성 난수 1 보구 대미지 : " + Number(Damage).toFixed();

}

function NpDmgCalc_Serv(EnemyClass, EnemyHiddenClass,EnemyDef, EnemyCmd, EnemyNpDmg,RanNum)//에너미별 실제 보구 대미지 계산, param은 Number로 받을것
{
    var tmp1 = Number(ATK)*0.23*CommandMagTable[NpCommand.value]*ClassDmgMagTable[ClassIndexTable[ServantClass]]//공*0.23*커멘계수*클래스보정
    *ClassDefMag[ClassIndexTable[ServantClass]][EnemyClass]//상성계수
    *HiddenClassDefMag[HiddenClass.value-1][EnemyHiddenClass-1]//히든상성
    *Number(NpMag.value)/100*RanNum;//보구배율/100*난수

    var tmp2 = (100+Number(AtkBuff.value)+EnemyDef)/100//공뻥+방깎
        *(100+Number(CmdBuff.value)+EnemyCmd)/100//색뻥+색깎
        *(100+Number(NpDmgBuff.value)+EnemyNpDmg)/100;//보뻥+보깎

    var tmp3 = Number(NpOriSp.value)*0.01;
    if(tmp3 == 0) {
        tmp3 = 1;
    }

    return Math.floor(tmp1 * tmp2 * tmp3) + Number(DmgPlus.value);
}

function OverkillCal(NpDmgFinal, EnemyHP)//오버킬 횟수 계산
{
    var tmp = 0;
    var OvkCnt = 0;
    if(NpDmgFinal < EnemyHP)//보구딜 < 적 HP면 오버킬 0회
    {
        return 0;
    }
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

function NpRechargeCal(EnemyClass,IsEnemyCase2,OverkillCnt,EnemyCmd)
{
    var tmp1 = Number(NpRate.value)*Number(NpCommand.value)*(100+EnemyCmd+Number(CmdBuff.value))//기본수급*커멘카드계수(1,3)*커멘뻥*100
    *ClassNpRechargeMagTable[Number(EnemyClass)]*(100+Number(NpBuff.value))/100;//적 클래스 수급보정*수급뻥
    if(IsEnemyCase2.checked === true)//case2의 경우 수급보정 1.2배 가산
    {
        tmp1 = tmp1 * 1.2;
    }

    tmp1 = Math.round(tmp1*1000)*0.001;
    tmp1 = Math.floor(tmp1);//소수점 2자리 내림

    //진궁처럼 보구에 추가 데미지가 달린 보구의 경우, 오버차지 없어도 보구로 적이 죽지 않으면 원 보구 타수만큼 0%의 추가 대미지를 입힘
    //따라서 오버킬 횟수가 0인 경우, 보구 타수가 2배가 되기에 NP차지도 2배로 하게 되어 이를 예외처리함
    if((Servant.value == "ChenGong") && (OverkillCnt == 0))
        return Math.floor(tmp1*NpCount*2)/100;

    return Math.floor(tmp1*(1.5*OverkillCnt + (NpCount-OverkillCnt)))/100;//(오버킬*1.5 + 비오버킬) 후 소수점 내림
}

function EnemyDataAllAvail()//에너미 데이터 칸 모두 잠금해제
{
    $('#Enemy1HP').prop('readonly',false);
    $('#Enemy1Class').prop('disabled',false);
    $('#IsEnemy1Case2').prop('disabled',false);
    $('#Enemy1HiddenClass').prop('disabled',false);
    $('#IsNotEnemy1').prop('disabled',false);
    $('#Enemy1Def').prop('readonly',false);
    $('#Enemy1Cmd').prop('readonly',false);
    $('#Enemy1NpDmg').prop('readonly',false);
    $('#IsNotEnemy1').prop('checked', false);

    $('#Enemy2HP').prop('readonly',false);
    $('#Enemy2Class').prop('disabled',false);
    $('#IsEnemy2Case2').prop('disabled',false);
    $('#Enemy2HiddenClass').prop('disabled',false);
    $('#IsNotEnemy2').prop('disabled',false);
    $('#Enemy2Def').prop('readonly',false);
    $('#Enemy2Cmd').prop('readonly',false);
    $('#Enemy2NpDmg').prop('readonly',false);
    $('#IsNotEnemy2').prop('checked', false);

    $('#Enemy3HP').prop('readonly',false);
    $('#Enemy3Class').prop('disabled',false);
    $('#IsEnemy3Case2').prop('disabled',false);
    $('#Enemy3HiddenClass').prop('disabled',false);
    $('#IsNotEnemy3').prop('disabled',false);
    $('#Enemy3Def').prop('readonly',false);
    $('#Enemy3Cmd').prop('readonly',false);
    $('#Enemy3NpDmg').prop('readonly',false);
    $('#IsNotEnemy3').prop('checked', false);
}


//입력 폼&드롭다운&체크박스 선택 이벤트 함수
Servant.addEventListener("change",function(){//서번트 드롭다운 이벤트
    for(var i = 0; i < servTable.length-1; i++)
    {
        if(servTable[i]["name"]==Servant.value)
        {
            var servId = Number(servTable[i]["id"]);
            NpRate.value = servTable[i]["npa"];
            HiddenClass.value = servTable[i]["hidden"];
            NpCommand.value = servTable[i]["command"];
            NpUpgrade.value = servTable[i]["npupgrade"];
            ServantATK.value = Number(servTable[i]["atk"]) + 1000;
            if(Goldfow.checked === true)
            {
                ServantATK.value = Number(ServantATK.value) + 1000;
            }
            var atk_init = servTable2[servId]["atk_init"];
            var atk_final = servTable2[servId]["atk"];
            var rare = servTable2[servId]["rare"];
            var atk_100 = FGOcal.GetGrailStat(atk_init,atk_final, rare, 100);
            GrailATK = Number(atk_100) - Number(atk_final);
            if(Grail.checked === true)
            {
                ServantATK.value = Number(ServantATK.value) + GrailATK;
            }

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
            if(servTable[i]["name"] == "Frankenstein")
            {
                NpMag.value = Number(NpMag.value)+100;
            }
            if(servTable[i]["name"] == "Paracelsus")
            {
                NpMag.value = NpMag_tmp;
            }
            if(servTable[i]["name"] == "ChenGong")
            {
                NpMag.value = NpMag_tmp * 3;
            }

            break;
        }

    }

})
function changeSupporter(support) {
    var id;
    if(support===1){
        id = Supporter1.value;
    }
    /*
    else if(support===2){
        id = Supporter2.value;
    }
    else if(support===3){
        id = Supporter3.value;
    }
*/
    SupportBuff = new Array(12);
    console.log('array = '+SupportBuff);    
    if(Number(id) === 0) return ;
    if(Bond1.checked === true) changeSupporterSkill(id,0,true);
    if(Skill1_1.checked === true) changeSupporterSkill(id,1,true);
    if(Skill1_2.checked === true) changeSupporterSkill(id,2,true);
    if(Skill1_3.checked === true) changeSupporterSkill(id,3,true);
    //busterbuf,artsbuf,quickbuf,npgainbuf,atkbuf,dmgplus,npplus,starbuf,npbuf,criticalbuf,npextramul,maxbondt,maxbondv
    //supportTable[i]["atkbuf"] = supportTable[i]["atkbuf"] + 30;

}
function changeSupporterSkill(id, skill, onoff){
    if(Number(id) === 0) return ;
    var i = Number(id) + Number(skill);
    var date = i;
    UpdateDate.innerHTML = "업데이트 날짜 : " + date;
    //supportSkillTable[i];
    /*
    Support_atkbuf = supportTable[i]["atkbuf"];
    Support_busterbuf = supportTable[i]["busterbuf"];
    Support_artsbuf = supportTable[i]["artsbuf"];
    Support_quickbuf = supportTable[i]["quickbuf"];
    Support_dmgplus = supportTable[i]["dmgplus"];
    Support_npplus = supportTable[i]["npplus"];
    Support_npgainbuf = supportTable[i]["npgainbuf"];
    Support_starbuf = supportTable[i]["starbuf"];
    Support_npextramul = supportTable[i]["npextramul"];
    Support_criiticalbuf = supportTable[i]["criticalbuf"];
 */
    AtkBuff.value = Number(AtkBuff.value) + Number(Support_atkbuf);


}

Supporter1.addEventListener("change",function(){//서포터1 변경 이벤트
    changeSupporter(1);
})

Bond1.addEventListener("change",function(){//서포터1 인연예장 변경 이벤트
    var id = Supporter1.value;
    if(this.checked === true)
    {
        changeSupporterSkill(id,0,true)
    }
    else{
        changeSupporterSkill(id,0,false)
    }
})
Skill1_1.addEventListener("change",function(){//서포터1 스킬1 변경 이벤트
    var id = Supporter1.value;
    if(this.checked === true)
    {
        changeSupporterSkill(id,1,true)
    }
    else{
        changeSupporterSkill(id,1,false)
    }
})
Skill1_2.addEventListener("change",function(){//서포터1 스킬2 변경 이벤트
    var id = Supporter1.value;
    if(this.checked === true)
    {
        changeSupporterSkill(id,2,true)
    }
    else{
        changeSupporterSkill(id,2,false)
    }
})
Skill1_3.addEventListener("change",function(){//서포터1 스킬3 변경 이벤트
    var id = Supporter1.value;
    if(this.checked === true)
    {
        changeSupporterSkill(id,3,true)
    }
    else{
        changeSupporterSkill(id,3,false)
    }
})

NpLev.addEventListener("change",function(){//보구레벨 드롭다운 이벤트
    var NpMag_tmp = NpDmTable[NpLev.value - 1] + 100 * NpUpgrade.value;
    if(NpCommand.value == 3) {
        NpMag.value=NpMag_tmp*1.5;
    }else
    {
        NpMag.value= NpMag_tmp*2;
    }
    if(Servant.value === "Frankenstein")
    {
        NpMag.value = Number(NpMag.value)+100;
    }
    if(Servant.value == "Paracelsus")
    {
        NpMag.value = NpMag_tmp;
    }
    if(Servant.value == "ChenGong")
    {
        NpMag.value = NpMag_tmp * 3;
    }
})

NpUpgrade.addEventListener("change",function() {//보구강화 드롭다운 이벤트
    var NpMag_tmp = NpDmTable[NpLev.value - 1] + 100 * NpUpgrade.value;
    if (NpCommand.value == 3) {
        NpMag.value = NpMag_tmp * 1.5;
    } else {
        NpMag.value = NpMag_tmp * 2;
    }
    if(Servant.value === "Frankenstein")
    {
        NpMag.value = Number(NpMag.value)+100;
    }
    if(Servant.value == "Paracelsus")
    {
        NpMag.value = NpMag_tmp;
    }
    if(Servant.value == "ChenGong")
    {
        NpMag.value = NpMag_tmp * 3;
    }
})

EnemyDataPreset.addEventListener("change",function(){
    if(EnemyDataPreset.value == 0)
    {
        EnemyDataAllAvail();
    }else
    {
        var tmp;
        tmp = EnemyPresetTable[Number(EnemyDataPreset.value)]["e1hp"];
        Enemy1HP.value = tmp;
        if(tmp == 0)
        {
            $('#IsNotEnemy1').prop('checked', true);
            $('#Enemy1Def').prop('readonly',true);
            $('#Enemy1Cmd').prop('readonly',true);
            $('#Enemy1NpDmg').prop('readonly',true);
        }else
        {
            $('#IsNotEnemy1').prop('checked', false);
            $('#Enemy1Def').prop('readonly',false);
            $('#Enemy1Cmd').prop('readonly',false);
            $('#Enemy1NpDmg').prop('readonly',false);
        }
        Enemy1Class.value = EnemyPresetTable[Number(EnemyDataPreset.value)]["e1class"];
        Enemy1HiddenClass.value = EnemyPresetTable[Number(EnemyDataPreset.value)]["e1hidden"];
        if( EnemyPresetTable[Number(EnemyDataPreset.value)]["e1case2"] == 1) {
            $('#IsEnemy1Case2').prop('checked', true);
        }else
        {
            $('#IsEnemy1Case2').prop('checked', false);
        }

        tmp = EnemyPresetTable[Number(EnemyDataPreset.value)]["e2hp"];
        Enemy2HP.value = tmp;
        if(tmp == 0)
        {
            $('#IsNotEnemy2').prop('checked', true);
            $('#Enemy2Def').prop('readonly',true);
            $('#Enemy2Cmd').prop('readonly',true);
            $('#Enemy2NpDmg').prop('readonly',true);
        }else
        {
            $('#IsNotEnemy2').prop('checked', false);
            $('#Enemy2Def').prop('readonly',false);
            $('#Enemy2Cmd').prop('readonly',false);
            $('#Enemy2NpDmg').prop('readonly',false);
        }
        Enemy2Class.value = EnemyPresetTable[Number(EnemyDataPreset.value)]["e2class"];
        Enemy2HiddenClass.value = EnemyPresetTable[Number(EnemyDataPreset.value)]["e2hidden"];
        if( EnemyPresetTable[Number(EnemyDataPreset.value)]["e2case2"] == 1) {
            $('#IsEnemy2Case2').prop('checked', true);
        }else
        {
            $('#IsEnemy2Case2').prop('checked', false);
        }

        tmp = EnemyPresetTable[Number(EnemyDataPreset.value)]["e3hp"];
        Enemy3HP.value = tmp;
        if(tmp == 0)
        {
            $('#IsNotEnemy3').prop('checked', true);
            $('#Enemy3Def').prop('readonly',true);
            $('#Enemy3Cmd').prop('readonly',true);
            $('#Enemy3NpDmg').prop('readonly',true);
        }else
        {
            $('#IsNotEnemy3').prop('checked', false);
            $('#Enemy3Def').prop('readonly',false);
            $('#Enemy3Cmd').prop('readonly',false);
            $('#Enemy3NpDmg').prop('readonly',false);
        }
        Enemy3HP.value = EnemyPresetTable[Number(EnemyDataPreset.value)]["e3hp"];
        Enemy3Class.value = EnemyPresetTable[Number(EnemyDataPreset.value)]["e3class"];
        Enemy3HiddenClass.value = EnemyPresetTable[Number(EnemyDataPreset.value)]["e3hidden"];
        if( EnemyPresetTable[Number(EnemyDataPreset.value)]["e3case2"] == 1) {
            $('#IsEnemy3Case2').prop('checked', true);
        }else
        {
            $('#IsEnemy3Case2').prop('checked', false);
        }

        $('#Enemy1HP').prop('readonly',true);
        $('#Enemy1Class').prop('disabled',true);
        $('#IsEnemy1Case2').prop('disabled',true);
        $('#Enemy1HiddenClass').prop('disabled',true);
        $('#IsNotEnemy1').prop('disabled',true);
        $('#Enemy2HP').prop('readonly',true);
        $('#Enemy2Class').prop('disabled',true);
        $('#IsEnemy2Case2').prop('disabled',true);
        $('#Enemy2HiddenClass').prop('disabled',true);
        $('#IsNotEnemy2').prop('disabled',true);
        $('#Enemy3HP').prop('readonly',true);
        $('#Enemy3Class').prop('disabled',true);
        $('#IsEnemy3Case2').prop('disabled',true);
        $('#Enemy3HiddenClass').prop('disabled',true);
        $('#IsNotEnemy3').prop('disabled',true);
    }
})

EnemyDataPresetResetBtn.addEventListener("click",function(){
    EnemyDataPreset.value = 0;

    EnemyDataAllAvail();

    Enemy1HP.value = 0;
    Enemy1Class.value = 0;
    Enemy1HiddenClass.value = 1;
    $('#IsEnemy1Case2').prop('checked', false);
    Enemy1Def.value = 0;
    Enemy1Cmd.value = 0;
    Enemy1NpDmg.value = 0;

    Enemy2HP.value = 0;
    Enemy2Class.value = 0;
    Enemy2HiddenClass.value = 1;
    $('#IsEnemy2Case2').prop('checked', false);
    Enemy2Def.value = 0;
    Enemy2Cmd.value = 0;
    Enemy2NpDmg.value = 0;

    Enemy3HP.value = 0;
    Enemy3Class.value = 0;
    Enemy3HiddenClass.value = 1;
    $('#IsEnemy3Case2').prop('checked', false);
    Enemy3Def.value = 0;
    Enemy3Cmd.value = 0;
    Enemy3NpDmg.value = 0;

})

Goldfow.addEventListener("change",function(){//금포우 체크박스 이벤트
    if(this.checked === true)
    {
        ServantATK.value = Number(ServantATK.value) + 1000;
    }
    else{
        ServantATK.value = Number(ServantATK.value) - 1000;
    }
})
Grail.addEventListener("change",function(){//성배작 체크박스 이벤트
    if(this.checked === true)
    {
        ServantATK.value = Number(ServantATK.value) + GrailATK;
    }
    else{
        ServantATK.value = Number(ServantATK.value) - GrailATK;
    }
})

IsNotEnemy1.addEventListener("change",function(){//에너미1 존재 체크박스 이벤트
    if(this.checked === true)
    {
        $('#Enemy1HP').prop('readonly',true);
        $('#Enemy1Class').prop('disabled',true);
        $('#IsEnemy1Case2').prop('disabled',true);
        $('#Enemy1HiddenClass').prop('disabled',true);
        $('#Enemy1Def').prop('readonly',true);
        $('#Enemy1Cmd').prop('readonly',true);
        $('#Enemy1NpDmg').prop('readonly',true);
    }else
    {
        $('#Enemy1HP').prop('readonly',false);
        $('#Enemy1Class').prop('disabled',false);
        $('#IsEnemy1Case2').prop('disabled',false);
        $('#Enemy1HiddenClass').prop('disabled',false);
        $('#Enemy1Def').prop('readonly',false);
        $('#Enemy1Cmd').prop('readonly',false);
        $('#Enemy1NpDmg').prop('readonly',false);
    }
})

IsNotEnemy2.addEventListener("change",function(){//에너미2 존재 체크박스 이벤트
    if(this.checked === true)
    {
        $('#Enemy2HP').prop('readonly',true);
        $('#Enemy2Class').prop('disabled',true);
        $('#IsEnemy2Case2').prop('disabled',true);
        $('#Enemy2HiddenClass').prop('disabled',true);
        $('#Enemy2Def').prop('readonly',true);
        $('#Enemy2Cmd').prop('readonly',true);
        $('#Enemy2NpDmg').prop('readonly',true);
    }else
    {
        $('#Enemy2HP').prop('readonly',false);
        $('#Enemy2Class').prop('disabled',false);
        $('#IsEnemy2Case2').prop('disabled',false);
        $('#Enemy2HiddenClass').prop('disabled',false);
        $('#Enemy2Def').prop('readonly',false);
        $('#Enemy2Cmd').prop('readonly',false);
        $('#Enemy2NpDmg').prop('readonly',false);
    }
})

IsNotEnemy3.addEventListener("change",function(){//에너미3 존재 체크박스 이벤트
    if(this.checked === true)
    {
        $('#Enemy3HP').prop('readonly',true);
        $('#Enemy3Class').prop('disabled',true);
        $('#IsEnemy3Case2').prop('disabled',true);
        $('#Enemy3HiddenClass').prop('disabled',true);
        $('#Enemy3Def').prop('readonly',true);
        $('#Enemy3Cmd').prop('readonly',true);
        $('#Enemy3NpDmg').prop('readonly',true);
    }else
    {
        $('#Enemy3HP').prop('readonly',false);
        $('#Enemy3Class').prop('disabled',false);
        $('#IsEnemy3Case2').prop('disabled',false);
        $('#Enemy3HiddenClass').prop('disabled',false);
        $('#Enemy3Def').prop('readonly',false);
        $('#Enemy3Cmd').prop('readonly',false);
        $('#Enemy3NpDmg').prop('readonly',false);
    }
})


//계산 버튼 클릭 이벤트 함수
calcBtn.addEventListener("click",function(){

    $('#calcBtn').prop('disabled',true);
    calcBtn.innerHTML = "Processing...";

    var tmp1, tmp2, tmp3, tmp4, tmp5;
    tmp4 = 0;
    tmp5 = 0;
    ATK = Number(ServantATK.value) + Number(CraftATK.value);
    NpDmgCalc();
    //Enemy1 calculate
    if(IsNotEnemy1.checked === true)
    {
        Enemy1OverNpMax.innerHTML = 0;
        Enemy1OverNpMin.innerHTML = 0;
        Enemy1OverNumMax.innerHTML = 0;
        Enemy1OverNumMin.innerHTML = 0;
    }else
    {
        //난수 1.1
        tmp1 = NpDmgCalc_Serv(Number(Enemy1Class.value), Number(Enemy1HiddenClass.value),
            Number(Enemy1Def.value), Number(Enemy1Cmd.value), Number(Enemy1NpDmg.value), 1.1);
        tmp2 = OverkillCal(tmp1, Number(Enemy1HP.value));
        tmp3 = NpRechargeCal(Number(Enemy1Class.value), IsEnemy1Case2, tmp2, Number(Enemy1Cmd.value));

        Enemy1OverNumMax.innerHTML = tmp2.toFixed();
        Enemy1OverNpMax.innerHTML = tmp3.toFixed(2);
        tmp4 += tmp3;

        //난수 0.9
        tmp1 = NpDmgCalc_Serv(Number(Enemy1Class.value), Number(Enemy1HiddenClass.value),
            Number(Enemy1Def.value), Number(Enemy1Cmd.value), Number(Enemy1NpDmg.value), 0.9);
        tmp2 = OverkillCal(tmp1, Number(Enemy1HP.value));
        tmp3 = NpRechargeCal(Number(Enemy1Class.value), IsEnemy1Case2, tmp2, Number(Enemy1Cmd.value));

        Enemy1OverNumMin.innerHTML = tmp2.toFixed();
        Enemy1OverNpMin.innerHTML = tmp3.toFixed(2);
        tmp5 += tmp3;
    }
    //Enemy2 calculate
    if(IsNotEnemy2.checked === true)
    {
        Enemy2OverNpMax.innerHTML = 0;
        Enemy2OverNpMin.innerHTML = 0;
        Enemy2OverNumMax.innerHTML = 0;
        Enemy2OverNumMin.innerHTML = 0;
    }else
    {
        //난수 1.1
        tmp1 = NpDmgCalc_Serv(Number(Enemy2Class.value), Number(Enemy2HiddenClass.value),
            Number(Enemy2Def.value), Number(Enemy2Cmd.value), Number(Enemy2NpDmg.value), 1.1);
        tmp2 = OverkillCal(tmp1, Number(Enemy2HP.value));
        tmp3 = NpRechargeCal(Number(Enemy2Class.value), IsEnemy2Case2, tmp2, Number(Enemy2Cmd.value));

        Enemy2OverNumMax.innerHTML = tmp2.toFixed();
        Enemy2OverNpMax.innerHTML = tmp3.toFixed(2);
        tmp4 += tmp3;

        //난수 0.9
        tmp1 = NpDmgCalc_Serv(Number(Enemy2Class.value), Number(Enemy2HiddenClass.value),
            Number(Enemy2Def.value), Number(Enemy2Cmd.value), Number(Enemy2NpDmg.value), 0.9);
        tmp2 = OverkillCal(tmp1, Number(Enemy2HP.value));
        tmp3 = NpRechargeCal(Number(Enemy2Class.value), IsEnemy2Case2, tmp2, Number(Enemy2Cmd.value));

        Enemy2OverNumMin.innerHTML = tmp2.toFixed();
        Enemy2OverNpMin.innerHTML = tmp3.toFixed(2);
        tmp5 += tmp3;
    }
    //Enemy3 calculate
    if(IsNotEnemy3.checked === true)
    {
        Enemy3OverNpMax.innerHTML = 0;
        Enemy3OverNpMin.innerHTML = 0;
        Enemy3OverNumMax.innerHTML = 0;
        Enemy3OverNumMin.innerHTML = 0;
    }else
    {
        //난수 1.1
        tmp1 = NpDmgCalc_Serv(Number(Enemy3Class.value), Number(Enemy3HiddenClass.value),
            Number(Enemy3Def.value), Number(Enemy3Cmd.value), Number(Enemy3NpDmg.value), 1.1);
        tmp2 = OverkillCal(tmp1, Number(Enemy3HP.value));
        tmp3 = NpRechargeCal(Number(Enemy3Class.value), IsEnemy3Case2, tmp2, Number(Enemy3Cmd.value));

        Enemy3OverNumMax.innerHTML = tmp2.toFixed();
        Enemy3OverNpMax.innerHTML = tmp3.toFixed(2);
        tmp4 += tmp3;

        //난수 0.9
        tmp1 = NpDmgCalc_Serv(Number(Enemy3Class.value), Number(Enemy3HiddenClass.value),
            Number(Enemy3Def.value), Number(Enemy3Cmd.value), Number(Enemy3NpDmg.value), 0.9);
        tmp2 = OverkillCal(tmp1, Number(Enemy3HP.value));
        tmp3 = NpRechargeCal(Number(Enemy3Class.value), IsEnemy3Case2, tmp2, Number(Enemy3Cmd.value));

        Enemy3OverNumMin.innerHTML = tmp2.toFixed();
        Enemy3OverNpMin.innerHTML = tmp3.toFixed(2);
        tmp5 += tmp3;
    }

    OverNpMaxSum.innerHTML = tmp4.toFixed(2);
    OverNpMinSum.innerHTML = tmp5.toFixed(2);

    $('#calcBtn').prop('disabled',false);
    calcBtn.innerHTML = "계산하기";

    //아래로 스크롤함
    var body = document.getElementsByTagName("body")[0];
    window.scroll({
        behavior:'smooth',
        left:0,
        top:body.offsetHeight
    });
})

function loadFile(filePath)//날짜
{
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if(xmlhttp.status == 200)
        result = xmlhttp.responseText;
    return result;
}

function printDate(dateid)//UpdateDate
{
    var date = loadFile("https://raw.githubusercontent.com/Cass07/FgoCalc/master/Data/updateDate.txt")
    dateid.innerHTML = "업데이트 날짜 : " + date;
}

//top 버튼 클릭 이벤트 함수
GotoTop.addEventListener("click",function(){
    var body = document.getElementsByTagName("body")[0];
    window.scroll({
            behavior:'smooth',
            left:0,
            top:body.offsetTop
        });
})

//main버튼 클릭 이벤트 함수
GotoMain.addEventListener("click",function()
{
    window.location = '../';
})

