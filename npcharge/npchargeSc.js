$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

var Var1 = 1;
//../Data/npRecharge.csv
function getData() {
    var data = Papa.parse("https://raw.githubusercontent.com/gitnod/fgocalc/gh-pages/data/exp/servantExpTable.csv",{
        delimiter : ",",
        download: true,
        header:true,
        dynamicTyping:true,
        complete: function(results){
            servTable = results.data;
            Var1 = servTable[1]["Cumul"];
        }
    });
    console.log(data);
}


var ATK = document.getElementById("ATK");
var Testvar = document.getElementById("Testvar")

var calcBtn = document.getElementById("calc");

calc.addEventListener("click",function(){
    Testvar.innerHTML = Var1;
    getData();
    Testvar.innerHTML = Var1;
})