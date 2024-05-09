$('body').tooltip({
    selector: '[data-toggle="tooltip"]'
});

let GotoTop = document.getElementById("GotoTop");
let GotoMain = document.getElementById("GotoMain");

let ResultTbl = document.getElementById("ResultTbl")

let UpdateDate = document.getElementById("UpdateDate");

let ServDataBase = new Array();
let CmdNpChargeData = new Array();


function getData() {
    Papa.parse("https://raw.githubusercontent.com/Cass07/FgoCalc/master/Data/ServDataBase.csv", {
        delimiter: ",",
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            ServDataBase = results.data;

            Papa.parse("https://raw.githubusercontent.com/Cass07/FgoCalc/master/Data/CmdNpChargeData.csv", {
                delimiter: ",",
                download: true,
                header: true,
                dynamicTyping: true,
                complete: function (results) {
                    CmdNpChargeData = results.data;

                    for (let i = 0; i < CmdNpChargeData.length - 1; i++) {
                        let gRows = ResultTbl.insertRow();
                        let oCell = new Array();
                        for (let j = 0; j < 22; j++) {
                            oCell[j] = gRows.insertCell();
                        }
                        oCell[0].innerHTML = i + 1;
                        //oCell[1].innerHTML = ServDataBase[Number(CmdNpChargeData[i]["id"])]["name"];
                        oCell[1].innerHTML = NameTooltipAdder(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i]);
                        oCell[2].innerHTML = Number(CmdNpChargeData[i]["id"]);
                        oCell[3].innerHTML = ClassNameIndex[ServDataBase[Number(CmdNpChargeData[i]["id"])]["class"]];
                        oCell[4].innerHTML = CmdNpChargeData[i]["skill"];
                        oCell[5].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], true,
                            "arts", 1, 1, false, false);
                        oCell[6].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], true,
                            "arts", 2, 1, false, false);
                        oCell[7].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], true,
                            "arts", 3, 1, false, false);
                        oCell[8].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], true,
                            "quick", 1, 1, false, false);
                        oCell[9].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], true,
                            "quick", 2, 1, false, false);
                        oCell[10].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], true,
                            "quick", 3, 1, false, false);
                        oCell[11].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], true,
                            "buster", 2, 1, false, false);
                        oCell[12].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], true,
                            "extra", 1, 1, false, false);
                        oCell[13].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], false,
                            "arts", 2, 1, false, false);
                        oCell[14].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], false,
                            "arts", 3, 1, false, false);
                        oCell[15].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], false,
                            "quick", 1, 1, false, false);
                        oCell[16].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], false,
                            "quick", 2, 1, false, false);
                        oCell[17].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], false,
                            "quick", 3, 1, false, false);
                        oCell[18].innerHTML = CmdNpGainCalcFin(ServDataBase[Number(CmdNpChargeData[i]["id"])], CmdNpChargeData[i], false,
                            "extra", 1, 1, false, false);
                        oCell[19].innerHTML = getCmdStringFin(ServDataBase[Number(CmdNpChargeData[i]["id"])]);
                        let res = getGreatCmd(ServDataBase[Number(CmdNpChargeData[i]["id"])], oCell, CmdNpChargeData[i]);
                        oCell[20].innerHTML = res[1];
                        oCell[21].innerHTML = res[0];


                    }

                    TableSortingUp(ResultTbl, 2);

                    //let res = getGreatCmd(ServDataBase[Number(CmdNpChargeData[1]["id"])], ResultTbl.rows[1+2],CmdNpChargeData[1]);
                    //console.log(res[0]+" : "+res[1]);
                }
            });

        }
    });

}

document.addEventListener('DOMContentLoaded', function () {
    getData();//parsing 진행 1회
    printDate(UpdateDate);

}, false);


const ClassNameIndex =
    {
        "saber": "세이버",
        "archer": "아처",
        "lancer": "랜서",
        "rider": "라이더",
        "caster": "캐스터",
        "assassin": "어새신",
        "berserker": "버서커",
        "sheilder": "실더",
        "ruler": "룰러",
        "avenger": "어벤저",
        "mooncancer": "문캔서",
        "alterego": "얼터에고",
        "foreigner": "포리너",
        "pretender": "프리텐더",
        "draco": "비스트(드라코)"
    };

const ClassIndexTable =//클래스 텍스트 인덱스 테이블
    {
        "세이버": 0,
        "아처": 1,
        "랜서": 2,
        "라이더": 3,
        "캐스터": 4,
        "어새신": 5,
        "버서커": 6,
        "실더": 7,
        "룰러": 8,
        "어벤저": 9,
        "문캔서": 10,
        "얼터에고": 11,
        "포리너": 12,
        "프리텐더": 13,
        "비스트(드라코)": 14,
    };

function NameTooltipAdder(Serv, NpChargeTableData) {
    let tmp = "<span data-toggle=\"tooltip\" data-placement=\"top\" data-html=\"true\" title=\"";
    //아뻥
    if (NpChargeTableData["artsbuf"] > 0)
        tmp += "아츠 커멘드 버프 " + NpChargeTableData["artsbuf"] + "%" + "<br>";
    //퀵뻥
    if (NpChargeTableData["quickbuf"] > 0)
        tmp += "퀵 커멘드 버프 " + NpChargeTableData["quickbuf"] + "%" + "<br>";
    //수급뻥
    if (NpChargeTableData["npgainbuf"] > 0)
        tmp += "수급량 버프 " + NpChargeTableData["npgainbuf"] + "%";
    return tmp + "\">" + Serv["name"] + "</span>"


}

function CmdNpGainCalcFin(Serv, NpChargeTableData, IsFirstCmdArts, Cmd, CmdOrder, EnemyMul, IsCrit, IsOverKill) {
    if (IsFirstCmdArts) {
        IsFirstCmdArts = 1;
    } else
        IsFirstCmdArts = 0;
    let IsFifthform = false;
    if (Number(NpChargeTableData["fifthform"]) == 1) {
        IsFifthform = true;
    }
    if ((Number(NpChargeTableData["fifthform"]) == 2) && (Cmd == "arts")) {
        IsFifthform = true;
    }

    IsCrit = false;
    IsOverKill = false;
    EnemyMul = 1;

    let NpGainBuf = NpChargeTableData["npgainbuf"];

    let Na, CmdBuf, Hits;

    CmdBuf = 0;

    if (Cmd == "arts") {
        Na = Serv["naa"];
        CmdBuf = NpChargeTableData["artsbuf"];
        Hits = Serv["hita"];
    } else if (Cmd == "quick") {
        Na = Serv["naq"];
        CmdBuf = NpChargeTableData["quickbuf"];
        Hits = Serv["hitq"];

    } else if (Cmd == "buster") {
        Na = Serv["nab"];
        Hits = Serv["hitb"];

    } else if (Cmd == "extra") {
        Na = Serv["naex"];
        Hits = Serv["hitex"];
    }

    return FGOcal.CmdNpGainCalc(IsFirstCmdArts, Cmd, CmdOrder, Na, CmdBuf, NpGainBuf, IsFifthform, EnemyMul, Hits, IsCrit, IsOverKill);
}

function getCmdString(NumA, NumB, NumQ) {
    let tmp = "<span style=\"color:#08be47; font-weight:bold; \">";
    for (let i = 0; i < NumQ; i++) {
        tmp += "Q"
    }
    tmp += "</span><span style=\"color:#0059da; font-weight:bold; \">";
    for (let i = 0; i < NumA; i++) {
        tmp += "A";
    }
    tmp += "</span><span style=\"color:#c00000; font-weight:bold; \">";
    for (let i = 0; i < NumB; i++) {
        tmp += "B";
    }
    tmp += "</span>";
    return tmp;
}

function getCmdStringFin(Serv) {
    return getCmdString(Serv["numa"], Serv["numb"], Serv["numq"]);
}

function TableDeleteAll(table)//head빼고 다지우기
{
    while (table.rows.length > 2) {
        table.deleteRow(table.rows.length - 1);
    }
}

let index = 0;
let isSortDown = true;

function compareCellsText(a, b) {
    let aVal = a.cells[index].innerHTML;
    let bVal = b.cells[index].innerHTML;

    if (isSortDown) {
        let tmp = aVal;
        aVal = bVal;
        bVal = tmp;
    }

    if (aVal > bVal)
        return 1;
    else if (aVal < bVal)
        return -1;
    else
        return 0;
}

function compareCells(a, b) {
    let aVal = Number(a.cells[index].innerHTML);
    let bVal = Number(b.cells[index].innerHTML);

    if (isSortDown) {
        let tmp = aVal;
        aVal = bVal;
        bVal = tmp;
    }

    if (aVal > bVal)
        return 1;
    else if (aVal < bVal)
        return -1;
    else
        return 0;
}

function compareCellsClass(a, b) {
    let aVal = ClassIndexTable[a.cells[index].innerHTML];
    let bVal = ClassIndexTable[b.cells[index].innerHTML];

    if (isSortDown) {
        let tmp = aVal;
        aVal = bVal;
        bVal = tmp;
    }

    if (aVal > bVal)
        return 1;
    else if (aVal < bVal)
        return -1;
    else
        return 0;
}

function TableSortingUp(table, colindex) {
    let tablerows = table.rows.length;//행 크기

    index = colindex;
    isSortDown = false;

    let datas = new Array();
    for (let i = 2; i < tablerows; i++) {
        datas[i - 2] = table.rows[i];
    }
    datas.sort(compareCells);
    for (let i = 2; i < tablerows; i++) {
        table.appendChild(datas[i - 2]);
    }
    for (let i = 2; i < tablerows; i++) {
        table.rows[i].cells[0].innerHTML = i - 1;
    }
}

function TableSortingUpText(table, colindex) {
    let tablerows = table.rows.length;//행 크기

    index = colindex;
    isSortDown = false;

    let datas = new Array();
    for (let i = 2; i < tablerows; i++) {
        datas[i - 2] = table.rows[i];
    }
    datas.sort(compareCellsText);
    for (let i = 2; i < tablerows; i++) {
        table.appendChild(datas[i - 2]);
    }
    for (let i = 2; i < tablerows; i++) {
        table.rows[i].cells[0].innerHTML = i - 1;
    }
}

function TableSortingUpClass(table, colindex) {
    let tablerows = table.rows.length;//행 크기

    index = colindex;
    isSortDown = false;

    let datas = new Array();

    for (let i = 2; i < tablerows; i++) {
        datas[i - 2] = table.rows[i];
    }
    datas.sort(compareCellsClass);
    for (let i = 2; i < tablerows; i++) {
        table.appendChild(datas[i - 2]);
    }
    for (let i = 2; i < tablerows; i++) {
        table.rows[i].cells[0].innerHTML = i - 1;
    }
}

function TableSortingDown(table, colindex) {
    let tablerows = table.rows.length;//행 크기

    index = colindex;
    isSortDown = true;

    let datas = new Array();
    for (let i = 2; i < tablerows; i++) {
        datas[i - 2] = table.rows[i];
    }
    datas.sort(compareCells);
    for (let i = 2; i < tablerows; i++) {
        table.appendChild(datas[i - 2]);
    }

    for (let i = 2; i < tablerows; i++) {
        table.rows[i].cells[0].innerHTML = i - 1;
    }
}

function TableSortingDownText(table, colindex) {
    let tablerows = table.rows.length;//행 크기

    index = colindex;
    isSortDown = true;

    let datas = new Array();
    for (let i = 2; i < tablerows; i++) {
        datas[i - 2] = table.rows[i];
    }
    datas.sort(compareCellsText);
    for (let i = 2; i < tablerows; i++) {
        table.appendChild(datas[i - 2]);
    }

    for (let i = 2; i < tablerows; i++) {
        table.rows[i].cells[0].innerHTML = i - 1;
    }
}

function TableSortingDownClass(table, colindex) {
    let tablerows = table.rows.length;//행 크기

    index = colindex;
    isSortDown = true;

    let datas = new Array();
    for (let i = 2; i < tablerows; i++) {
        datas[i - 2] = table.rows[i];
    }
    datas.sort(compareCellsClass);
    for (let i = 2; i < tablerows; i++) {
        table.appendChild(datas[i - 2]);
    }

    for (let i = 2; i < tablerows; i++) {
        table.rows[i].cells[0].innerHTML = i - 1;
    }
}

function getGreatCmd(Serv, tablerow, NpChargeTableData) {
    /*
    let A1 = Number(tablerow.cells[5].innerHTML);
    let Aa2 = Number(tablerow.cells[6].innerHTML);
    let Aa3 = Number(tablerow.cells[7].innerHTML);
    let Aq2 = Number(tablerow.cells[8].innerHTML);
    let Aq3 = Number(tablerow.cells[9].innerHTML);
    let Ab = Number(tablerow.cells[10].innerHTML);

     */

    let A1 = Number(tablerow[5].innerHTML);
    let Aa2 = Number(tablerow[6].innerHTML);
    let Aa3 = Number(tablerow[7].innerHTML);
    let Aq1 = Number(tablerow[8].innerHTML);
    let Aq2 = Number(tablerow[9].innerHTML);
    let Aq3 = Number(tablerow[10].innerHTML);
    let Ab = Number(tablerow[11].innerHTML);

    let Aex = Number(tablerow[12].innerHTML);

    let a2 = Number(tablerow[13].innerHTML);
    let a3 = Number(tablerow[14].innerHTML);
    let q1 = Number(tablerow[15].innerHTML);
    let q2 = Number(tablerow[16].innerHTML);
    let q3 = Number(tablerow[17].innerHTML);

    let ex = Number(tablerow[18].innerHTML);

    let na = [Serv["numa"], Serv["numb"], Serv["numq"]];

    //아츠 첫수
    let A1HighNpValue = [
        [A1 + Aa2 + Aa3 + Aex + 20, 0, 0, 0],
        [A1 + Aa2 + Ab + Aex, 0, 0, 1],
        [A1 + Aa2 + Aq3 + Aex, 0, 0, 2],
        [A1 + Ab + Aa3 + Aex, 0, 1, 0],
        [A1 + Ab + Ab + Aex, 0, 1, 1],
        [A1 + Ab + Aq3 + Aex, 0, 1, 2], //마이티
        [A1 + Aq2 + Aa3 + Aex, 0, 2, 0],
        [A1 + Aq2 + Ab + Aex, 0, 2, 1], //마이티
        [A1 + Aq2 + Aq3 + Aex, 0, 2, 2],
    ];
    //버스터 첫수
    let B1HighNpValue = [
        [a2 + a3 + ex, 1, 0, 0],
        [a2 + ex, 1, 0, 1],
        [Ab + Aa2 + Aq3 + Aex, 1, 0, 2], //마이티
        [a3 + ex, 1, 1, 0],
        [ex, 1, 1, 1],
        [q3 + ex, 1, 1, 2],
        [Ab + Aq2 + Aa3 + Aex, 1, 2, 0], //마이티
        [q2 + ex, 1, 2, 1],
        [q2 + q3 + ex, 1, 2, 2],
    ];
    //퀵첫수
    let Q1HighNpValue = [
        [q1 + a2 + a3 + ex, 2, 0, 0],
        [Aq1 + Aa2 + Ab + Aex, 2, 0, 1], //마이티
        [q1 + a2 + q3 + ex, 2, 0, 2],
        [Aq1 + Ab + Aa3 + Aex, 2, 1, 0], //마이티
        [q1 + ex, 2, 1, 1],
        [q1 + q3 + ex, 2, 1, 2],
        [q1 + q2 + a3 + ex, 2, 2, 0],
        [q1 + q2 + ex, 2, 2, 1],
        [q1 + q2 + q3 + ex, 2, 2, 2],
    ];

    for (let i = 0; i < 9; i++) {
        A1HighNpValue[i][0] = Math.round(A1HighNpValue[i][0] * 100) / 100;
        B1HighNpValue[i][0] = Math.round(B1HighNpValue[i][0] * 100) / 100;
        Q1HighNpValue[i][0] = Math.round(Q1HighNpValue[i][0] * 100) / 100;
    }

    for (let i = 0; i < 9; i++) {
        if (!IsCmdAvail(na, A1HighNpValue[i])) {
            A1HighNpValue[i][0] = 0;
        }
        if (!IsCmdAvail(na, B1HighNpValue[i])) {
            B1HighNpValue[i][0] = 0;
        }
        if (!IsCmdAvail(na, Q1HighNpValue[i])) {
            Q1HighNpValue[i][0] = 0;
        }
    }

    A1HighNpValue.sort(compareCmdArr);
    B1HighNpValue.sort(compareCmdArr);
    Q1HighNpValue.sort(compareCmdArr);

    let result = [A1HighNpValue[0][0], getCmdStringHigh(A1HighNpValue[0])];
    if (result[0] < B1HighNpValue[0][0])
        result = [B1HighNpValue[0][0], getCmdStringHigh(B1HighNpValue[0])];
    if (result[0] < Q1HighNpValue[0][0])
        result = [Q1HighNpValue[0][0], getCmdStringHigh(Q1HighNpValue[0])];
    return result;
}

function getCmdStringHigh(NpValueArr) {
    let tmp = "";
    for (let i = 1; i < 4; i++) {
        if (NpValueArr[i] == 0) {
            tmp += "<span style=\"color:#0059da; font-weight:bold; \">A</span>";
        } else if (NpValueArr[i] == 1) {
            tmp += "<span style=\"color:#c00000; font-weight:bold; \">B</span>";
        } else if (NpValueArr[i] == 2) {
            tmp += "<span style=\"color:#08be47; font-weight:bold; \">Q</span>"
        }

    }
    return tmp + "<span style=\"color:rgb(40,40,40); font-weight:bold; \">Ex</span>";
}

function compareCmdArr(a, b) {
    let aVal = Number(a[0]);
    let bVal = Number(b[0]);

    if (aVal > bVal)
        return -1;
    else if (aVal < bVal)
        return 1;
    else
        return 0;
}

function IsCmdAvail(na, NpValueArr) {
    let natmp = [0, 0, 0];
    for (let i = 1; i < 4; i++) {
        natmp[NpValueArr[i]]++;
    }
    for (let i = 0; i < 3; i++) {
        if (natmp[i] > na[i])
            return false;
    }
    return true;
}

//textSorting
document.getElementById('index2SortUp').addEventListener('click', function () {
    TableSortingUpText(ResultTbl, 1);
})
document.getElementById('index2SortDown').addEventListener('click', function () {
    TableSortingDownText(ResultTbl, 1);
})
document.getElementById('index5SortUp').addEventListener('click', function () {
    TableSortingUpText(ResultTbl, 4);
})
document.getElementById('index5SortDown').addEventListener('click', function () {
    TableSortingDownText(ResultTbl, 4);
})
//classSorting
document.getElementById('index4SortUp').addEventListener('click', function () {
    TableSortingUpClass(ResultTbl, 3);
})
document.getElementById('index4SortDown').addEventListener('click', function () {
    TableSortingDownClass(ResultTbl, 3);
})

//NumberSorting
document.getElementById('index3SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 2);
})
document.getElementById('index3SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 2);
})
document.getElementById('index6SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 5);
})
document.getElementById('index6SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 5);
})
document.getElementById('index7SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 6);
})
document.getElementById('index7SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 6);
})
document.getElementById('index8SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 7);
})
document.getElementById('index8SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 7);
})
document.getElementById('index9SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 8);
})
document.getElementById('index9SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 8);
})
document.getElementById('index10SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 9);
})
document.getElementById('index10SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 9);
})
document.getElementById('index11SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 10);
})
document.getElementById('index11SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 10);
})
document.getElementById('index12SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 11);
})
document.getElementById('index12SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 11);
})
document.getElementById('index13SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 12);
})
document.getElementById('index13SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 12);
})
document.getElementById('index14SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 13);
})
document.getElementById('index14SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 13);
})
document.getElementById('index15SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 14);
})
document.getElementById('index15SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 14);
})
document.getElementById('index16SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 15);
})
document.getElementById('index16SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 15);
})
document.getElementById('index17SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 16);
})
document.getElementById('index17SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 16);
})
document.getElementById('index18SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 17);
})
document.getElementById('index18SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 17);
})
document.getElementById('index19SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 18);
})
document.getElementById('index19SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 18);
})
document.getElementById('index22SortUp').addEventListener('click', function () {
    TableSortingUp(ResultTbl, 21);
})
document.getElementById('index22SortDown').addEventListener('click', function () {
    TableSortingDown(ResultTbl, 21);
})


function loadFile(filePath)//날짜
{
    let result = null;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200)
        result = xmlhttp.responseText;
    return result;
}

function printDate(dateid)//UpdateDate
{
    let date = loadFile("https://raw.githubusercontent.com/Cass07/FgoCalc/master/Data/updateDate.txt")
    dateid.innerHTML = "업데이트 날짜 : " + date;
}


GotoTop.addEventListener("click", function () {
    let body = document.getElementsByTagName("body")[0];
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: body.offsetTop
    });
})

//main버튼 클릭 이벤트 함수
GotoMain.addEventListener("click", function () {
    window.location = '../';
})
