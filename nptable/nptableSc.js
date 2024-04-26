let UpdateDate = document.getElementById("UpdateDate");

//1. table sorters
let index1SortUp = document.getElementById("index1SortUp");
let index1SortDown = document.getElementById("index1SortDown");
let index4SortUp = document.getElementById("index4SortUp");
let index4SortDown = document.getElementById("index4SortDown");
let index5SortUp = document.getElementById("index5SortUp");
let index5SortDown = document.getElementById("index5SortDown");
let index6SortUp = document.getElementById("index6SortUp");
let index6SortDown = document.getElementById("index6SortDown");
let index7SortUp = document.getElementById("index7SortUp");
let index7SortDown = document.getElementById("index7SortDown");
let index8SortUp = document.getElementById("index8SortUp");
let index8SortDown = document.getElementById("index8SortDown");
let index9SortUp = document.getElementById("index9SortUp");
let index9SortDown = document.getElementById("index9SortDown");
let index10SortUp = document.getElementById("index10SortUp");
let index10SortDown = document.getElementById("index10SortDown");

//2. filter confirm button
let FilterCloseBtn = document.getElementById("FilterCloseBtn");
let FilterCloseX = document.getElementById("FilterCloseX");

//3. filter checkers
let FilClsSaber = document.getElementById("FilClsSaber");
let FilClsArcher = document.getElementById("FilClsArcher");
let FilClsLancer = document.getElementById("FilClsLancer");
let FilClsRider = document.getElementById("FilClsRider");
let FilClsCaster = document.getElementById("FilClsCaster");
let FilClsAssassin = document.getElementById("FilClsAssassin");
let FilClsBerserker = document.getElementById("FilClsBerserker");
let FilClsRuler = document.getElementById("FilClsRuler");
let FilClsAvenger = document.getElementById("FilClsAvenger");
let FilClsMooncancer = document.getElementById("FilClsMooncancer");
let FilClsAlterego = document.getElementById("FilClsAlterego");
let FilClsForeigner = document.getElementById("FilClsForeigner");
let FilClsPretender = document.getElementById("FilClsPretender");
let FilClsAllCkd = document.getElementById("FilClsAllCkd");
let FilClsAllUnCkd = document.getElementById("FilClsAllUnCkd");

let FilRare1 = document.getElementById("FilRare1");
let FilRare2 = document.getElementById("FilRare2");
let FilRare3 = document.getElementById("FilRare3");
let FilRare4 = document.getElementById("FilRare4");
let FilRare5 = document.getElementById("FilRare5");
let FilRareAllCkd = document.getElementById("FilRareAllCkd");
let FilRareAllUnCkd = document.getElementById("FilRareAllUnCkd");

let FilNPLev1 = document.getElementById("FilNPLev1");
let FilNPLev2 = document.getElementById("FilNPLev2");
let FilNPLev3 = document.getElementById("FilNPLev3");
let FilNPLev4 = document.getElementById("FilNPLev4");
let FilNPLev5 = document.getElementById("FilNPLev5");
let FilNPLevInd = document.getElementById("FilNPLevInd");

let FilNPExtra = document.getElementById("FilNPExtra");
let FilNPExtraNot = document.getElementById("FilNPExtraNot");

let FourATK = document.getElementById("FourATK");
let CraftATK = document.getElementById("CraftATK");

let FourHP = document.getElementById("FourHP");
let CraftHP = document.getElementById("CraftHP");

let CraftBufBuster = document.getElementById("CraftBufBuster");
let CraftBufBusterAtk = document.getElementById("CraftBufBusterAtk");
let CraftBufBusterNp = document.getElementById("CraftBufBusterNp");

let CraftBufArts = document.getElementById("CraftBufArts");
let CraftBufArtsAtk = document.getElementById("CraftBufArtsAtk");
let CraftBufArtsNp = document.getElementById("CraftBufArtsNp");

let CraftBufQuick = document.getElementById("CraftBufQuick");
let CraftBufQuickAtk = document.getElementById("CraftBufQuickAtk");
let CraftBufQuickNp = document.getElementById("CraftBufQuickNp");

let RanNum = document.getElementById("RanNum");
let EnemyHidden = document.getElementById("EnemyHidden");
let EnemyClass = document.getElementById("EnemyClass");

let FilClsDmgMul = document.getElementById("FilClsDmgMul");
let FilClsExtraDmgMul = document.getElementById("FilClsExtraDmgMul");
let RewardServNpLev5 = document.getElementById("RewardServNpLev5");
let LowRareServNpLev5 = document.getElementById("LowRareServNpLev5");
let NameTooltipUse = document.getElementById("NameTooltipUse");


let GotoTop = document.getElementById("GotoTop");
let GotoMain = document.getElementById("GotoMain");


const CommIndex = {
    "buster": 0,
    "arts": 1,
    "quick": 2
}//커멘드 텍스트 인덱스 테이블
const NpTypeIndex = {
    "unit": 0,
    "army": 1
}//보구 타입 인덱스 테이블

const ClassIndex =
    {
        "saber": 0,
        "archer": 1,
        "lancer": 2,
        "rider": 3,
        "caster": 4,
        "assassin": 5,
        "berserker": 6,
        "sheilder": 7,
        "ruler": 8,
        "avenger": 9,
        "mooncancer": 10,
        "alterego": 11,
        "foreigner": 12,
        "pretender": 13,
        "draco": 14
    };//클래스 텍스트 인덱스 테이블

// 클래스 2배상성 관련 필터용
const generalClassNotBurseker = ["saber", "archer", "lancer", "rider", "caster", "assassin"];
const extraClassNotBeast = ["ruler", "avenger", "mooncancer", "alterego", "foreigner", "pretender"];

const ClassDmgMagTable = [1, 0.95, 1.05, 1, 0.9, 0.9, 1.1, 1, 1.1, 1.1, 1, 1, 1, 1, 1];//클래스 보정계수
const ClassNameKor = ["세이버", "아처", "랜서", "라이더", "캐스터", "어새신", "버서커", "실더", "룰러",
    "어벤저", "문캔서", "얼터에고", "포리너", "프리텐더", "비스트(드라코)"];
const CommTextHTML = [
    "<span style=\"color:#c00000; font-weight:bold; \">Buster</span>",
    "<span style=\"color:#0059da; font-weight:bold; \">Arts</span>",
    "<span style=\"color:#08be47; font-weight:bold; \">Quick</span>"
];

const NpDmTableBusterArmy = [
    [300, 400, 450, 475, 500],
    [400, 500, 550, 575, 600],
    [450, 550, 600, 625, 650],//흑밥
    [400, 550, 625, 662.5, 700],//세릴리
    [800, 1000, 1100, 1150, 1200],//아라쉬
    [300, 450, 525, 562.5, 600],//세릴리 노구퀘(한그오)
    [300 * 1.5, 400 * 1.75, 450 * 1.875, 475 * 1.938, 500 * 2]//알퀘이드 특공
];
const NpDmTableBusterUnit = [
    [600, 800, 900, 950, 1000],
    [800, 1000, 1100, 1150, 1200],
    [700, 900, 1000, 1050, 1100]//베오
];
const NpDmTableArtsArmy = [
    [450, 600, 675, 712.5, 750],
    [600, 750, 825, 862.5, 900],
    [400, 500, 550, 575, 600],//파라켈
    [900, 1200, 1350, 1425, 1500]//진궁
];
const NpDmTableArtsUnit = [
    [900, 1200, 1350, 1425, 1500],
    [1200, 1500, 1650, 1725, 1800],
    [1200, 1200, 1200, 1200, 1200],//에우리알레
    [150 * 12, 200 * 12, 225 * 12, 237 * 12, 250 * 12],//에우리알레 남성특공 계수
    [600, 750, 825, 862.5, 900],//메데이아
    [900 * 1.5, 1200 * 1.625, 1350 * 1.75, 1425 * 1.875, 1500 * 2]//드라코 특공
];
const NpDmTableQuickArmy = [
    [600, 800, 900, 950, 1000],
    [800, 1000, 1100, 1150, 1200],
    [900, 1100, 1200, 1250, 1300]//프랑
];
const NpDmTableQuickUnit = [
    [1200, 1600, 1800, 1900, 2000],
    [1600, 2000, 2200, 2300, 2400],
    [1400, 1800, 2000, 2100, 2200]//잭
];
const NpDmTableHpproNP = [
    [[600, 800], [0, 0], [1200, 1200]],//대인버아퀵 (노구퀘,보구퀘)
    [[0, 0], [0, 0], [0, 0]]//대군버아퀵(dummy)
];
//보구 계수 대군대인 [NpTypeIndex[보구유형문자],CommIndex[커멘드문자],npmul,보구레벨]
const NpDmTable = [
    [NpDmTableBusterUnit, NpDmTableArtsUnit, NpDmTableQuickUnit],
    [NpDmTableBusterArmy, NpDmTableArtsArmy, NpDmTableQuickArmy]
];

//클래스 상성계수 출력 배열 : [공격][방어] ClassIndexTable 활용
const ClassDefMag =
    [
        [1, 0.5, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1],//saber
        [2, 1, 0.5, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1],//archer
        [0.5, 2, 1, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1],//lancer
        [1, 1, 1, 1, 2, 0.5, 2, 1, 0.5, 1, 1, 1, 1],//rider
        [1, 1, 1, 0.5, 1, 2, 2, 1, 0.5, 1, 1, 1, 1],//caster
        [1, 1, 1, 2, 0.5, 1, 2, 1, 0.5, 1, 1, 1, 1],//assassin
        [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1, 1.5, 1.5, 1.5, 1.5, 0.5],//berserker
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//sheilder
        [1, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 2, 1, 1],//ruler
        [1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0.5, 1, 1],//avenger
        [1, 1, 1, 1, 1, 1, 2, 1, 0.5, 2, 1, 1, 1],//mooncancer
        [0.5, 0.5, 0.5, 1.5, 1.5, 1.5, 2, 1, 1, 1, 1, 1, 2],//alterego
        [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0.5, 2]//foreigner

    ];

const CommMagTable = [1.5, 1, 0.8];//커멘드 보정계수


let ResultTbl = document.getElementById("ResultTbl");
let colserv = document.getElementById("colserv");
let colclass = document.getElementById("colclass");
let colcmd = document.getElementById("colcmd");

let NpTable;

let ServDataBase;

let ClassScoreData = {};

function getData() {
    Papa.parse("https://raw.githubusercontent.com/Cass07/FgoCalc/master/Data/NpTableServData.csv", {
        delimiter: ",",
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            NpTable = results.data;


            for (let i = 0; i < NpTable.length - 1; i++) {
                if (IsServFilt(NpTable[i])) {
                    let gRows = ResultTbl.insertRow();
                    let oCell = [];
                    for (let j = 0; j < ResultTbl.rows[0].cells.length; j++) {
                        oCell[j] = gRows.insertCell();
                    }
                    oCell[0].innerHTML = NameTooltipAdder(NpTable[i]);//NpTable[i]["name"];
                    oCell[1].innerHTML = ClassNameKor[ClassIndex[NpTable[i]["class"]]];
                    oCell[2].innerHTML = CommTextHTML[CommIndex[NpTable[i]["npcmd"]]];
                    for (j = 1; j < 6; j++) {
                        oCell[j + 2].innerHTML = NpDamageCalcFin(NpTable[i], j);
                    }
                    oCell[10].innerHTML = NpTable[i]["name"];

                }
            }

            TableSortingDown(ResultTbl, 3);

            $('#ResultTbl tr > *:nth-child(9)').hide();
            $('#ResultTbl tr > *:nth-child(10)').hide();
            $('#ResultTbl tr > *:nth-child(11)').hide();

        }
    });
    Papa.parse("https://raw.githubusercontent.com/Cass07/FgoCalc/master/Data/ServDataBase.csv", {
        delimiter: ",",
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            ServDataBase = results.data;
        }
    });
}

function getClassScoreData() {
    let normalClassArray = [ "saber", "archer", "lancer", "rider","caster", "assassin", "berserker"];
    let extra1ClassArray = ["sheilder", "ruler", "avenger", "mooncancer"]; //sheilder shielder 오타 주의
    let extra2ClassArray = ["alterego", "foreigner", "pretender"];
    let beastClassArray = ["draco"];
    let emptyClassData = {"buster" : 0, "arts" : 0, "quick" : 0, "np" : 0};

    normalClassArray.forEach(className => {
        let classData = {};
        classData["buster"] = Number($("#Score" + className + "Buster").val());
        classData["arts"] = Number($("#Score" + className + "Arts").val());
        classData["quick"] = Number($("#Score" + className + "Quick").val());
        classData["np"] = Number($("#Score" + className + "NP").val());
        ClassScoreData[className] = classData;
    });

    let extra1ClassData = {
        "buster" : Number($("#Scoreextra1Buster").val()),
        "arts" : Number($("#Scoreextra1Arts").val()),
        "quick" : Number($("#Scoreextra1Quick").val()),
        "np" : Number($("#Scoreextra1NP").val())
    }

    extra1ClassArray.forEach(className => {
        if($('#extra1'+className).is(":checked")) {
            ClassScoreData[className] = extra1ClassData;
        } else {
            ClassScoreData[className] = emptyClassData;
        }
    });

    let extra2ClassData = {
        "buster" : Number($("#Scoreextra2Buster").val()),
        "arts" : Number($("#Scoreextra2Arts").val()),
        "quick" : Number($("#Scoreextra2Quick").val()),
        "np" : Number($("#Scoreextra2NP").val())
    }


    extra2ClassArray.forEach(className => {
        if($('#extra2'+className).is(":checked")) {
            ClassScoreData[className] = extra2ClassData;
        } else {
            ClassScoreData[className] = emptyClassData;
        }
    });

    //beast는 따로 또 체크
    beastClassArray.forEach(className => {
        if($('#extra2beast').is(":checked")) {
            ClassScoreData[className] = extra2ClassData;
        } else {
            ClassScoreData[className] = emptyClassData;
        }
    });
}

// 서번트 데이터 테이블 참조해서 히든속성 데이터 받아올것 (add? 100렙 데이터 추가해서 100렙데이터 비교해버리기
// 이후 히든적용 체크, 히든선택 - 히든속성적용 (계산식은 라이브러리에 적용완료)

document.addEventListener('DOMContentLoaded', function () {
    getClassScoreData();

    getData();
    printDate(UpdateDate);
    //$('#ResultTbl tr > *:nth-child(9)').hide();

}, false);

FilClsAllCkd.addEventListener("click", function () {
    $('#FilClsSaber').prop('checked', true);
    $('#FilClsArcher').prop('checked', true);
    $('#FilClsLancer').prop('checked', true);
    $('#FilClsRider').prop('checked', true);
    $('#FilClsCaster').prop('checked', true);
    $('#FilClsAssassin').prop('checked', true);
    $('#FilClsBerserker').prop('checked', true);
    $('#FilClsRuler').prop('checked', true);
    $('#FilClsAvenger').prop('checked', true);
    $('#FilClsMooncancer').prop('checked', true);
    $('#FilClsAlterego').prop('checked', true);
    $('#FilClsForeigner').prop('checked', true);
    $('#FilClsPretender').prop('checked', true);
    $('#FilClsDraco').prop('checked', true);
})//클래스 필터 전체 선택 버튼 이벤트

FilClsAllUnCkd.addEventListener("click", function () {
    $('#FilClsSaber').prop('checked', false);
    $('#FilClsArcher').prop('checked', false);
    $('#FilClsLancer').prop('checked', false);
    $('#FilClsRider').prop('checked', false);
    $('#FilClsCaster').prop('checked', false);
    $('#FilClsAssassin').prop('checked', false);
    $('#FilClsBerserker').prop('checked', false);
    $('#FilClsRuler').prop('checked', false);
    $('#FilClsAvenger').prop('checked', false);
    $('#FilClsMooncancer').prop('checked', false);
    $('#FilClsAlterego').prop('checked', false);
    $('#FilClsForeigner').prop('checked', false);
    $('#FilClsPretender').prop('checked', false);
    $('#FilClsDraco').prop('checked', false);
})//클래스 필터 전체 선택해제 버튼 이벤트

FilRareAllCkd.addEventListener("click", function () {
    $('#FilRare1').prop('checked', true);
    $('#FilRare2').prop('checked', true);
    $('#FilRare3').prop('checked', true);
    $('#FilRare4').prop('checked', true);
    $('#FilRare5').prop('checked', true);
})//레어도 필터 전체 선택 버튼 이벤트

FilRareAllUnCkd.addEventListener("click", function () {
    $('#FilRare1').prop('checked', false);
    $('#FilRare2').prop('checked', false);
    $('#FilRare3').prop('checked', false);
    $('#FilRare4').prop('checked', false);
    $('#FilRare5').prop('checked', false);
})//레어도 필터 전체 선택해제 버튼 이벤트


FilNPLevInd.addEventListener("change", function () {
    if ($('#FilNPLevInd').is(":checked")) {
        $('#FilNPLev1').prop('disabled', true);
        $('#FilNPLev2').prop('disabled', true);
        $('#FilNPLev3').prop('disabled', true);
        $('#FilNPLev4').prop('disabled', true);
        $('#FilNPLev5').prop('disabled', true);
    } else {
        $('#FilNPLev1').prop('disabled', false);
        $('#FilNPLev2').prop('disabled', false);
        $('#FilNPLev3').prop('disabled', false);
        $('#FilNPLev4').prop('disabled', false);
        $('#FilNPLev5').prop('disabled', false);
    }
})

RanNum.addEventListener("change", function () {
    if (RanNum.value < 0.9)
        RanNum.value = 0.9;
    if (RanNum.value > 1.1)
        RanNum.value = 1.1;
});

EnemyClass.addEventListener("change", function () {
    //클래스 항목으로 옮기고 기존 체크 지울것
    if (EnemyClass.value != "-1") {
        $('#FilClsDmgMul').prop('checked', false);
        $('#FilClsDmgMul').prop('disabled', true);
        $('#FilClsExtraDmgMul').prop('checked', false);
        $('#FilClsExtraDmgMul').prop('disabled', true);
    } else {
        $('#FilClsDmgMul').prop('disabled', false);
        $('#FilClsExtraDmgMul').prop('disabled', false);
    }
});


function TableDeleteAll(table)//1열빼고 다지우기
{
    while (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
    }
}

function NpDamageCalcFin(Serv, NpLev)//NpTable[i] 형식의 입력, 추가버프 같이 계산
{
    let ServFinalATK = Number(Serv["atk"]) + Number(FourATK.value) + Number(CraftATK.value);
    let ServFinalHP = 0;

    if ($('#StatGrailed').is(":checked")) {
        let grailedLevel = Number(document.getElementById("GrailedLevel").value);
        ServFinalHP = FGOcal.GetGrailStat(Number(ServDataBase[Serv["id"]]["hp_init"]), Number(ServDataBase[Serv["id"]]["hp"]),
            Number(Serv["rare"]), grailedLevel) + Number(FourHP.value) + Number(CraftHP.value);
        ServFinalATK = FGOcal.GetGrailStat(Number(ServDataBase[Serv["id"]]["atk_init"]), Number(Serv["atk"]),
            Number(Serv["rare"]), grailedLevel) + Number(FourATK.value) + Number(CraftATK.value);
        //console.log("성배" + Serv["name"] + " 체 : " + ServFinalHP + "공 : " + ServFinalATK);
    } else if (Number(FourHP.value) + Number(CraftHP.value) != 1000) {
        ServFinalHP = Number(ServDataBase[Serv["id"]]["hp"]) + Number(FourHP.value) + Number(CraftHP.value);
    }


    let ClassMagMul = 1;
    if ((Number(Serv["isclassmul"]) === 1) || (Serv["class"] === "berserker"))
        ClassMagMul = 1.5;
    if ($('#FilClsDmgMul').is(":checked")) {
        if(generalClassNotBurseker.includes(Serv["class"])) {
            ClassMagMul = 2;
        }
    }
    if ($('#FilClsExtraDmgMul').is(":checked")) {
        if(extraClassNotBeast.includes(Serv["class"])) {
            ClassMagMul = 2;
        }
    }
    if (EnemyClass.value !== "-1") {
        ClassMagMul = FGOcal.GetClassMagMul(Serv["class"], Number(EnemyClass.value));
    }
    let AtkBuf = Number(Serv["atkbuf"]);
    let CmdBuf = Number(Serv["cmdbuf"]);
    /*
    npbuf - 보뻥
    npspebuf - 특공뻥
    npbufmul - 보뻥 N배 계수 (오베론)

    클래스스코어 같이 합산
     */
    let NpBuf = Number(Serv["npbuf"]);
    NpBuf += ClassScoreData[Serv['class']]['np'];
    let NpSpeBuf = Number(Serv["npspebuf"]);
    if (Serv["npcmd"] === "buster") {
        AtkBuf += Number(CraftBufBusterAtk.value);
        CmdBuf += (Number(CraftBufBuster.value) + ClassScoreData[Serv['class']]['buster']);
        NpBuf += Number(CraftBufBusterNp.value);
    } else if (Serv["npcmd"] === "arts") {
        AtkBuf += Number(CraftBufArtsAtk.value);
        CmdBuf += (Number(CraftBufArts.value) + ClassScoreData[Serv['class']]['arts']);
        NpBuf += Number(CraftBufArtsNp.value);
    } else if (Serv["npcmd"] === "quick") {
        AtkBuf += Number(CraftBufQuickAtk.value);
        CmdBuf += (Number(CraftBufQuick.value) + ClassScoreData[Serv['class']]['quick']);
        NpBuf += Number(CraftBufQuickNp.value);
    }

    let NpBufMul = Number(Serv["npbufmul"]);

    //보뻥계수가 0도 아니고 1도 아니라면 보뻥배수연산이 있는것
    if (NpBufMul > 1) {
        NpBuf *= NpBufMul;
    } else if (Serv["npcmd"] === "buster" && $('#FilNpBufMulBuster').is(":checked")) {
        NpBuf *= 2;
    } else if (Serv["npcmd"] === "arts" && $('#FilNpBufMulArts').is(":checked")) {
        NpBuf *= 2;
    } else if (Serv["npcmd"] === "quick" && $('#FilNpBufMulQuick').is(":checked")) {
        NpBuf *= 2;
    }

    //보뻥계수 연산 끝난 후 특공뻥을 더해준다
    if (NpSpeBuf > 0) {
        NpBuf += NpSpeBuf;
    }


    if ($('#RewardServNpLev5').is(":checked") && !($('#FilNPLevInd').is(":checked"))) {
        if (Serv["isreward"] == 1)
            NpLev = 5;
    }
    if ($('#LowRareServNpLev5').is(":checked") && !($('#FilNPLevInd').is(":checked"))) {
        if (Number(Serv["rare"]) < 4)
            NpLev = 5;
    }

    let HiddenDefMagMul = 1;


    if (Number(EnemyHidden.value) > 0) {
        HiddenDefMagMul = FGOcal.GetHiddenMagMul(ServDataBase[Serv["id"]]["hidden"], Number(EnemyHidden.value) - 1);
    }

    let HpproNp = Number(Serv["hppronp"]);

    if (($('#StatGrailed').is(":checked") || (Number(FourHP.value) + Number(CraftHP.value) != 1000)) && (HpproNp > 0)) {

        let HpproNp_init = NpDmTableHpproNP[NpTypeIndex[Serv["nptype"]]][CommIndex[Serv["npcmd"]]][Number(Serv["npmul"])];
        if ((HpproNp / HpproNp_init) > 0.5) // HP 1남은 상태
        {
            HpproNp = HpproNp_init * (1 - 1 / ServFinalHP);
        } else//피깎스킬
        {
            HpproNp = Math.round(HpproNp * ((Number(ServDataBase[Serv["id"]]["hp"]) + 1000) / ServFinalHP) * 10000) / 10000;
        }
    }


    //console.log("최종공 : "+ServFinalATK + "상성배율 : "+ ClassMagMul + Serv["npcmd"]+Serv["nptype"]+Number(Serv["npmul"])+"보렙 : "+NpLev
    //+"공벞 : "+AtkBuf+"색벞" +CmdBuf + "보벞"+NpBuf+ "특공보구 : "+Number(Serv["npextramul"]));

    return FGOcal.NpDamageCalc(ServFinalATK, Serv["class"], ClassMagMul, Serv["npcmd"],
        NpDmTable[NpTypeIndex[Serv["nptype"]]][CommIndex[Serv["npcmd"]]][Number(Serv["npmul"])][NpLev - 1], AtkBuf, CmdBuf, NpBuf,
        Number(Serv["npextramul"]), Number(Serv["dmgplus"]), HpproNp, Number(RanNum.value), HiddenDefMagMul);
}

/**
 * @return {boolean}
 */
function IsServFilt(Serv)//NpTable[i]형식의 입력, 필터 처리 함수
{
    //클래스
    if (!$('#FilClsSaber').is(":checked") && (Serv["class"] == "saber"))
        return false;
    if (!$('#FilClsArcher').is(":checked") && (Serv["class"] == "archer"))
        return false;
    if (!$('#FilClsLancer').is(":checked") && (Serv["class"] == "lancer"))
        return false;
    if (!$('#FilClsRider').is(":checked") && (Serv["class"] == "rider"))
        return false;
    if (!$('#FilClsCaster').is(":checked") && (Serv["class"] == "caster"))
        return false;
    if (!$('#FilClsAssassin').is(":checked") && (Serv["class"] == "assassin"))
        return false;
    if (!$('#FilClsBerserker').is(":checked") && (Serv["class"] == "berserker"))
        return false;
    if (!$('#FilClsRuler').is(":checked") && (Serv["class"] == "ruler"))
        return false;
    if (!$('#FilClsAvenger').is(":checked") && (Serv["class"] == "avenger"))
        return false;
    if (!$('#FilClsMooncancer').is(":checked") && (Serv["class"] == "mooncancer"))
        return false;
    if (!$('#FilClsAlterego').is(":checked") && (Serv["class"] == "alterego"))
        return false;
    if (!$('#FilClsForeigner').is(":checked") && (Serv["class"] == "foreigner"))
        return false;
    if (!$('#FilClsPretender').is(":checked") && (Serv["class"] == "pretender"))
        return false;
    if (!$('#FilClsDraco').is(":checked") && (Serv["class"] == "draco"))
        return false;
    //레어
    if (!$('#FilRare1').is(":checked") && (Serv["rare"] == "1"))
        return false;
    if (!$('#FilRare2').is(":checked") && (Serv["rare"] == "2"))
        return false;
    if (!$('#FilRare3').is(":checked") && (Serv["rare"] == "3"))
        return false;
    if (!$('#FilRare4').is(":checked") && (Serv["rare"] == "4"))
        return false;
    if (!$('#FilRare5').is(":checked") && (Serv["rare"] == "5"))
        return false;
    //보구커멘
    if (!$('#FilNPCommBuster').is(":checked") && (Serv["npcmd"] == "buster"))
        return false;
    if (!$('#FilNPCommArts').is(":checked") && (Serv["npcmd"] == "arts"))
        return false;
    if (!$('#FilNPCommQuick').is(":checked") && (Serv["npcmd"] == "quick"))
        return false;
    //보구타입
    if (!$('#FilNPTypeArmy').is(":checked") && (Serv["nptype"] == "army"))
        return false;
    if (!$('#FilNPTypeUnit').is(":checked") && (Serv["nptype"] == "unit"))
        return false;
    //특공보구여부
    if (!$('#FilNPExtra').is(":checked") && (Serv["isextranp"] == "1"))
        return false;
    if (!$('#FilNPExtraNot').is(":checked") && (Serv["isextranp"] == "0"))
        return false;

    //조건부보구여부
    if (!$('#FilDebuf').is(":checked") && (Serv["isdebuf"] == "1"))
        return false;
    if (!$('#FilDebufNot').is(":checked") && (Serv["isdebuf"] == "0"))
        return false;

    //NP범위필터
    if(Serv["charge"] < $('#npChargeMin').val() || Serv["charge"] > $('#npChargeMax').val()) {
        return false;
    }

    //엑스트라 상성 적용시 얼터에고 1.5배 필터링 (드라코 제외)
    if ($('#FilClsExtraDmgMul').is(":checked") && (Number(Serv["isclassmul"]) === 1) && extraClassNotBeast.includes(Serv["class"])) {
        return false;
    }
    //적 서번트 클래스 적용시 얼터에고 1.5배 필터링
    if ((EnemyClass.value !== "-1") && (Number(Serv["isclassmul"]) === 1)){
        return false;
    }

    return true;

}

function NameTooltipAdder(Serv)//이름 툴팁 출력
{
    let tmp = "<span data-toggle=\"tooltip\" data-placement=\"top\" data-html=\"true\" title=\"";
    //아뻥
    if (Serv["cmdbuf"] > 0) {
        if (CommIndex[Serv["npcmd"]] == 0) {
            tmp += "버스터";
        } else if (CommIndex[Serv["npcmd"]] == 1) {
            tmp += "아츠";
        } else {
            tmp += "퀵";
        }
        tmp += ` 커멘드 버프 ${Serv["cmdbuf"]}%<br>`;
    }
    //퀵뻥
    if (Serv["atkbuf"] > 0)
        tmp += `공격력 버프 ${Serv["atkbuf"]}%<br>`;
    //보구뻥
    if (Serv["npbuf"] > 0) {
        tmp += `보구 위력 버프 ${Serv["npbuf"]}%`;
        if (Serv["npbufmul"] > 1) {
            tmp += `* 보구 위력 버프 ${Serv["npbufmul"]}배`;
        }
        tmp += "<br>";

    }
    if (Serv["npspebuf"] > 0)
        tmp += `특공 버프 ${Serv["npspebuf"]}%<br>`;
    if (Serv["npextramul"] > 0)
        tmp += `특공보구 특공 배율 ${Serv["npextramul"]}%<br>`;
    if (Serv["dmgplus"] > 0)
        tmp += `대미지 플러스 ${Serv["dmgplus"]}<br>`;
    if (Serv["hppronp"] > 0)
        tmp += `HP 반비례 추가 대미지 배율 ${Math.floor(Number(Serv["hppronp"] * 100)) / 100 }%<br>`;
    if (Serv["npmul"] == 0)//보구퀘 여부
    {
        tmp += "보구퀘 X<br>";
    } else if (Serv["npmul"] == 1) {
        tmp += "보구퀘 O<br>";
    } else {
        tmp += `보구퀘 O : 특수배율<br>${NpDmTable[NpTypeIndex[Serv["nptype"]]][CommIndex[Serv["npcmd"]]][Number(Serv["npmul"])][0]}% ~ `
            + `${NpDmTable[NpTypeIndex[Serv["nptype"]]][CommIndex[Serv["npcmd"]]][Number(Serv["npmul"])][4]}%<br>`;

    }
    if (Serv["charge"] > 0) {
        tmp += `최대 즉발 차지 ${Serv["charge"]}%<br>`;
    }

    if (Serv["dmgNpPierce"] === 1) {
        tmp += `방어무시 보구<br>`;
    }

    if (Serv["memo"] !== "" && Serv["memo"] !== null) {
        tmp += `메모 : ${Serv["memo"]}<br>`;
    }

    return `${tmp}\">${Serv["name"]}</span>`;
}

function PrintName(Serv) {
    if ($('#NameTooltipUse').is(":checked"))
        return NameTooltipAdder(Serv);
    return Serv["name"];
}

function GetFilteredResult() {
    for (let i = 0; i < NpTable.length - 1; i++) {
        if ($('#FilNPLevInd').is(":checked")) {
            if (IsServFilt(NpTable[i])) {
                for (let j = 0; j < 5; j++) {
                    let gRows = ResultTbl.insertRow();
                    let oCell = [];
                    for (let k = 0; k < ResultTbl.rows[0].cells.length; k++) {
                        oCell[k] = gRows.insertCell();
                    }
                    oCell[0].innerHTML = PrintName(NpTable[i]);
                    oCell[1].innerHTML = ClassNameKor[ClassIndex[NpTable[i]["class"]]];
                    oCell[2].innerHTML = CommTextHTML[CommIndex[NpTable[i]["npcmd"]]];
                    oCell[8].innerHTML = Number(j + 1);
                    oCell[9].innerHTML = NpDamageCalcFin(NpTable[i], j + 1);
                    oCell[10].innerHTML = NpTable[i]["name"];
                }
            }
        } else {
            if (IsServFilt(NpTable[i])) {
                let gRows = ResultTbl.insertRow();
                let oCell = [];
                for (let j = 0; j < ResultTbl.rows[0].cells.length; j++) {
                    oCell[j] = gRows.insertCell();
                }
                oCell[0].innerHTML = PrintName(NpTable[i]);
                oCell[1].innerHTML = ClassNameKor[ClassIndex[NpTable[i]["class"]]];
                oCell[2].innerHTML = CommTextHTML[CommIndex[NpTable[i]["npcmd"]]];
                for (j = 1; j < 6; j++) {
                    oCell[j + 2].innerHTML = NpDamageCalcFin(NpTable[i], j);
                }
                oCell[10].innerHTML = NpTable[i]["name"];
            }
        }
    }


}

function GetNpLevFilteredResult() {
    $('#ResultTbl tr > *:nth-child(4)').show();
    $('#ResultTbl tr > *:nth-child(5)').show();
    $('#ResultTbl tr > *:nth-child(6)').show();
    $('#ResultTbl tr > *:nth-child(7)').show();
    $('#ResultTbl tr > *:nth-child(8)').show();
    $('#ResultTbl tr > *:nth-child(9)').hide();
    $('#ResultTbl tr > *:nth-child(10)').hide();
    $('#ResultTbl tr > *:nth-child(11)').hide();

    ResultTbl.style.width = 100 + "%";
    colserv.style.width = 17 + "%";
    colclass.style.width = 8 + "%";
    colcmd.style.width = 8 + "%";
    let cnt = 0;

    if ($('#FilNPLevInd').is(":checked")) {
        $('#ResultTbl tr > *:nth-child(4)').hide();
        $('#ResultTbl tr > *:nth-child(5)').hide();
        $('#ResultTbl tr > *:nth-child(6)').hide();
        $('#ResultTbl tr > *:nth-child(7)').hide();
        $('#ResultTbl tr > *:nth-child(8)').hide();
        $('#ResultTbl tr > *:nth-child(9)').show();
        $('#ResultTbl tr > *:nth-child(10)').show();
        $('#ResultTbl tr > *:nth-child(11)').hide();

        ResultTbl.style.width = 60 + "%";
        colserv.style.width = 28 + "%";
        colclass.style.width = 12 + "%";
        colcmd.style.width = 12 + "%";


    }
    if (!$('#FilNPLev1').is(":checked")) {
        $('#ResultTbl tr > *:nth-child(4)').hide();
        cnt++;
    }
    if (!$('#FilNPLev2').is(":checked")) {
        $('#ResultTbl tr > *:nth-child(5)').hide();
        cnt++;
    }
    if (!$('#FilNPLev3').is(":checked")) {
        $('#ResultTbl tr > *:nth-child(6)').hide();
        cnt++;
    }
    if (!$('#FilNPLev4').is(":checked")) {
        $('#ResultTbl tr > *:nth-child(7)').hide();
        cnt++;
    }
    if (!$('#FilNPLev5').is(":checked")) {
        $('#ResultTbl tr > *:nth-child(8)').hide();
        cnt++;
    }

    if (cnt > 2) {
        ResultTbl.style.width = 60 + "%";
        colserv.style.width = 28 + "%";
        colclass.style.width = 12 + "%";
        colcmd.style.width = 12 + "%";
    }
}

function wrapWindowLoadingMask() {

    let maskHeight = $(document).height();
    let maskWidth = window.document.body.clientWidth;

    let mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    let loadingImg = '';

    loadingImg += "<div id='loadingImg' style='position:absolute; left:50%; top:40%; display:none; z-index:10000;'>";
    loadingImg += "<img src='../Data/image/loading.gif'/>";
    loadingImg += "</div>";


    $('body')
        .append(mask)
        .append(loadingImg)

    $("#mask").css({
        'width': maskWidth,
        'height': maskHeight,
        'opacity': '0.3'
    });

    $('#mask').show();
    $('#loadingImg').show();

}

function closeLoadingMask() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').empty();
}

function loadFile(filePath)//날짜
{
    let result = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status === 200)
        result = xmlhttp.responseText;
    return result;
}

function printDate(dateid)//UpdateDate
{
    let date = loadFile("https://raw.githubusercontent.com/Cass07/FgoCalc/master/Data/updateDate.txt")
    dateid.innerHTML = "업데이트 날짜 : " + date;
}

$("#HiddenModal, #modalClassScore").on('hidden.bs.modal', function () {

    getClassScoreData();

    TableDeleteAll(ResultTbl);

    GetFilteredResult();
    GetNpLevFilteredResult();
    if ($('#FilNPLevInd').is(":checked")) {
        TableSortingDown(ResultTbl, 9);
    } else {
        TableSortingDown(ResultTbl, 3);
    }

});

$('#colserv').on('click', function () {
    TableSortingUpText(ResultTbl, 10);
});

//기타
$('body').tooltip({
    selector: '[data-toggle="tooltip"]'
});

GotoTop.addEventListener("click", function () {
    let body = document.getElementsByTagName("body")[0];
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: body.offsetTop
    });
});

//main버튼 클릭 이벤트 함수
GotoMain.addEventListener("click", function () {
    window.location = '../';
});