//테이블에 table-sort-itself class 붙인다
//소팅할 thead th에 소팅종류 class 붙인다
//소팅종류 클래스 : none - 소팅안함
//number, string -> 숫자 혹은 문자열
//이외 : tr data의 아이디 -> 해당 data로 저장된 문자열 비교
//weapon : 무기 지정 인덱스순 정렬


$(document).ready(function(){

    let $tablesort_head = $('.table-sort-itself').find('th').not('.none');
    let tablesort_head_length = $tablesort_head.length;
    for( var i = 0; i < tablesort_head_length; i++)
    {
        $tablesort_head.eq(i).html($tablesort_head.eq(i).text() + " <i class=\"fa fa-sort\"></i>");
    }

});

$('.table-sort-itself').on('click', 'th', function(e)
{

    if($(this).attr('class').indexOf("number") != -1)
    {
        sort_number($(this).closest('.table-sort-itself')[0],this);
    }else if($(this).attr('class').indexOf("string") != -1)
    {
        if($(this).index() == 0)
        {
            sort_string($(this).closest('.table-sort-itself')[0], this, 10);
        }else {
            sort_string($(this).closest('.table-sort-itself')[0], this);
        }
    }else if($(this).attr('class').indexOf("weapon") != -1)
    {
        sort_weapon($(this).closest('.table-sort-itself')[0],this, $(this).attr('class'));
    }else if($(this).attr('class').indexOf("none") == -1)
    {
        sort_data($(this).closest('.table-sort-itself')[0],this, $(this).attr('class'));
    }
});

function sort_number(table,th)
{
    var index = $(th).index();
    console.log(index);
    sort_reset_all(table,th);
    if (th.innerHTML.indexOf("fa-sort-down") != -1)//소트다운 되어있으면
    {
        TableSortingUp(table, index);
        th.innerHTML = th.innerHTML.replace("fa-sort-down", "fa-sort-up");
    }else
    {
        TableSortingDown(table, index);
        if(th.innerHTML.indexOf("fa-sort-up") != -1)
        {
            th.innerHTML = th.innerHTML.replace("fa-sort-up", "fa-sort-down");
        }else
        {
            th.innerHTML = th.innerHTML.replace("fa-sort", "fa-sort-down");
        }
    }
}

function sort_string(table,th, index_spe = -1)
{
    var index = (index_spe == -1 ? $(th).index() : index_spe);
    sort_reset_all(table,th);
    if (th.innerHTML.indexOf("fa-sort-up") != -1)//소트업 되어있으면
    {
        TableSortingDownText(table, index);
        th.innerHTML = th.innerHTML.replace("fa-sort-up", "fa-sort-down");
    }else
    {
        TableSortingUpText(table, index);
        if(th.innerHTML.indexOf("fa-sort-down") != -1)
        {
            th.innerHTML = th.innerHTML.replace("fa-sort-down", "fa-sort-up");
        }else
        {
            th.innerHTML = th.innerHTML.replace("fa-sort", "fa-sort-up");
        }
    }
}

function sort_data(table,th, datastring)
{
    sort_reset_all(table,th);
    if (th.innerHTML.indexOf("fa-sort-up") != -1)//소트업 되어있으면
    {
        TableSortingDownData(table, datastring);
        th.innerHTML = th.innerHTML.replace("fa-sort-up", "fa-sort-down");
    }else
    {
        TableSortingUpData(table, datastring);
        if(th.innerHTML.indexOf("fa-sort-down") != -1)
        {
            th.innerHTML = th.innerHTML.replace("fa-sort-down", "fa-sort-up");
        }else
        {
            th.innerHTML = th.innerHTML.replace("fa-sort", "fa-sort-up");
        }
    }
}
function sort_weapon(table,th, datastring)
{
    sort_reset_all(table,th);
    if (th.innerHTML.indexOf("fa-sort-up") != -1)//소트업 되어있으면
    {
        TableSortingDownDataW(table, datastring);
        th.innerHTML = th.innerHTML.replace("fa-sort-up", "fa-sort-down");
    }else
    {
        TableSortingUpDataW(table, datastring);
        if(th.innerHTML.indexOf("fa-sort-down") != -1)
        {
            th.innerHTML = th.innerHTML.replace("fa-sort-down", "fa-sort-up");
        }else
        {
            th.innerHTML = th.innerHTML.replace("fa-sort", "fa-sort-up");
        }
    }
}

function sort_reset_all(table, th)
{
    var $th_parent = $(th).parent();
    var th_length = th.parentNode.childElementCount;
    var th_index = $(th).index();
    for(var i = 0 ;i < th_length; i++)
    {
        if(i != th_index)
        {
            $th_parent.children().eq(i).html($th_parent.children().eq(i).html().replace(/\<i.*i\>/,"<i class=\"fa fa-sort\"></i>"));
        }
    }
}

const WtypeIndex = {
    "Red Sword" : 1,
    "Red Tome" : 2,
    "Red Beast" : 3,
    "Red Breath" : 4,
    "Red Bow" : 5,
    "Red Dagger": 6,
    "Blue Lance" : 7,
    "Blue Tome" : 8,
    "Blue Beast" : 9,
    "Blue Breath" : 10,
    "Blue Bow" : 11,
    "Blue Dagger": 12,
    "Green Axe" : 13,
    "Green Tome" : 14,
    "Green Beast" : 15,
    "Green Breath" : 16,
    "Green Bow" : 17,
    "Green Dagger": 18,
    "Colorless Staff": 19,
    "Colorless Tome" : 20,
    "Colorless Beast" : 21,
    "Colorless Breath" : 22,
    "Colorless Bow" : 23,
    "Colorless Dagger" : 24,
    "Staff" : 19,
    "Beast" : 25,
    "Breath" : 26,
    "Bow" : 27,
    "Dagger" : 28
}


var index = 0;
var indexSTR = "";
var isSortDown = true;
function compareCellsText(a,b) {
    var aVal = a.cells[index].innerHTML;
    var bVal = b.cells[index].innerHTML;

    if (isSortDown) {
        var tmp = aVal;
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
function compareCells(a,b){
    var aVal = Number(a.cells[index].innerHTML);
    var bVal = Number(b.cells[index].innerHTML);

    //console.log(aVal + " " + bVal);

    if(isSortDown)
    {
        var tmp = aVal;
        aVal = bVal;
        bVal = tmp;
    }

    if(aVal> bVal)
        return 1;
    else if(aVal<bVal)
        return -1;
    else
        return 0;

}
function compareData(a,b){
    var aVal = $(a).data(indexSTR);
    var bVal = $(b).data(indexSTR);

    //console.log(aVal + " " + bVal);

    if (isSortDown) {
        var tmp = aVal;
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
function compareDataWeapon(a,b){
    var aVal = $(a).data(indexSTR);
    var bVal = $(b).data(indexSTR);

    aVal = WtypeIndex[aVal];
    bVal = WtypeIndex[bVal];

    //console.log(aVal + " " + bVal);

    if (isSortDown) {
        var tmp = aVal;
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


function TableSortingUpText(table, colindex)
{
    var tablerows = table.rows.length;//행 크기

    index = colindex;
    isSortDown = false;

    var datas = new Array();
    for(var i = 1; i < tablerows; i++)
    {
        datas[i-1] = table.rows[i];
    }
    datas.sort(compareCellsText);
    for(var i = 1; i < tablerows; i++)
    {
        table.appendChild(datas[i-1]);
    }

}
function TableSortingDownText(table, colindex)
{
    var tablerows = table.rows.length;//행 크기

    index = colindex;
    isSortDown = true;

    var datas = new Array();
    for(var i = 1; i < tablerows; i++)
    {
        datas[i-1] = table.rows[i];
    }
    console.log(datas[10]);
    datas.sort(compareCellsText);
    for(var i = 1; i < tablerows; i++)
    {
        table.appendChild(datas[i-1]);
    }

}
function TableSortingUp(table, colindex)
{
    var tablerows = table.rows.length;//행 크기

    index = colindex;
    isSortDown = false;

    var datas = new Array();
    for(var i = 1; i < tablerows; i++)
    {
        datas[i-1] = table.rows[i];
    }
    datas.sort(compareCells);
    for(var i = 1; i < tablerows; i++)
    {
        table.appendChild(datas[i-1]);
    }

}
function TableSortingDown(table, colindex)
{
    var tablerows = table.rows.length;//행 크기

    index = colindex;
    isSortDown = true;

    var datas = new Array();
    for(var i = 1; i < tablerows; i++)
    {
        datas[i-1] = table.rows[i];
    }

    datas.sort(compareCells);
    for(var i = 1; i < tablerows; i++)
    {
        table.appendChild(datas[i-1]);
    }

}
function TableSortingUpData(table, datastr)
{
    var tablerows = table.rows.length;//행 크기

    indexSTR = datastr;
    isSortDown = false;

    var datas = new Array();
    for(var i = 1; i < tablerows; i++)
    {
        datas[i-1] = table.rows[i];
    }
    datas.sort(compareData);
    for(var i = 1; i < tablerows; i++)
    {
        table.appendChild(datas[i-1]);
    }
}
function TableSortingDownData(table, datastr)
{
    var tablerows = table.rows.length;//행 크기

    indexSTR = datastr;
    isSortDown = true;

    var datas = new Array();
    for(var i = 1; i < tablerows; i++)
    {
        datas[i-1] = table.rows[i];
    }
    datas.sort(compareData);
    for(var i = 1; i < tablerows; i++)
    {
        table.appendChild(datas[i-1]);
    }
}
function TableSortingUpDataW(table, datastr)
{
    var tablerows = table.rows.length;//행 크기

    indexSTR = datastr;
    isSortDown = false;

    var datas = new Array();
    for(var i = 1; i < tablerows; i++)
    {
        datas[i-1] = table.rows[i];
    }
    datas.sort(compareDataWeapon);
    for(var i = 1; i < tablerows; i++)
    {
        table.appendChild(datas[i-1]);
    }
}
function TableSortingDownDataW(table, datastr)
{
    var tablerows = table.rows.length;//행 크기

    indexSTR = datastr;
    isSortDown = true;

    var datas = new Array();
    for(var i = 1; i < tablerows; i++)
    {
        datas[i-1] = table.rows[i];
    }
    datas.sort(compareDataWeapon);
    for(var i = 1; i < tablerows; i++)
    {
        table.appendChild(datas[i-1]);
    }
}
