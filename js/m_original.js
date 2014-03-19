/**
 * Created by Coletana on 3/17/14.
 */
/////////////////////////////////////////////
// Minesweeper game algorithm
// By Argie Abedejos
// March 17   14
//
// Tanan pwedi mugamit ani kai
// Open source ni hahaha..
// Mura bag android open source pud.
// Pwedi ni nimo ma'modify as long as you want
// but please make sure that it will be more #AWESOME
//
////////////////////////////////////////////



var firstclickM = 0;
var globalX = 1;
var globalY = 9;
function getValue(id){
    return document.getElementById(id).value;
}
function clickM(id){
    document.getElementById(id).style.backgroundColor = "#ccc";

    var stat = document.getElementById("i"+id).value;
    if(stat=='0'){
        var tae = checkBomb(id[0], id[1]);

        $("#"+id).css('background-image','none').append("<center><label class='label"+tae+"'>"+tae+"</label></center>");

        document.getElementById("i"+id).value = '6';
        if(tae==""){
            // alert(id);
            silingangTaeChecker(id[0], id[1]);
        }
    }
    else if(stat=='1'){

        $("#"+id).css('background-image','url(default.PNG)');
        document.getElementById("i"+id).value = '3';
    }
    else if(stat=='2'){

        //show all bomb;
        for(var s = 1; s<=globalY; s++){
            for(var w = 1; w<=globalY; w++){
                if(document.getElementById("i"+s+""+w).value=='2'){
                    $("#"+s+""+w).css('background-image','url(images/red.PNG)');
                }
            }
        }
        $('#overlay').fadeIn(500);
        $('#gameOver').fadeIn(500);
    }
}
$(document).ready(function(){
    $("#btnGO").click(function(){
        $('#overlay').fadeOut(500);
        $('#gameOver').fadeOut(500);
        init();
    });
});

function checkBomb(x,y){
    var tae = 0;
    var max = globalY;
    var min = 1;
    /*------ [1] ------*/
    if((x == min && y == min) || (x == min && y == max) || ((parseInt(x)>min && parseInt(x) < max) && (parseInt(y)>min && parseInt(y) < max))
        || ((x == min) && (parseInt(y)>min && parseInt(y) < max)) || ((y==min && (x>min && x <max)))
        || (y==max && (x>min && x <max))){
        if(document.getElementById("i"+(parseInt(x)+1)+""+(parseInt(y))).value=='2'){
            tae++;
        }

    }
    /*------ [2] ------*/
    if((x == min && y == min) || ((parseInt(x)>min && parseInt(x) < max) && (parseInt(y)>min && parseInt(y) < max))
        || ((x == min) && (parseInt(y)>min && parseInt(y) < max)) || ((y==min && (x>min && x <max))) ){
        if(document.getElementById("i"+(parseInt(x)+1)+""+(parseInt(y)+1)).value=='2'){
            tae++;
        }
    }
    /*------ [3] ------*/
    if((x == min && y == min) || (x==max && y== min) || ((parseInt(x)>min && parseInt(x) < max) && (parseInt(y)>min && parseInt(y) < max))
        || ((x == min) && (parseInt(y)>min && parseInt(y) < max)) || ((y==min && (x>min && x <max)))
        || (x==max && (y>min && y <max))){
        if(document.getElementById("i"+(parseInt(x))+""+(parseInt(y)+1)).value=='2'){
            tae++;
        }
    }
    /*------ [4] ------*/
    if((x==max && y== min) || (x==max && y==max) || ((parseInt(x)>min && parseInt(x) < max) && (parseInt(y)>min && parseInt(y) < max))
        || ((y==min && (x>min && x <max))) || (y==max && (x>min && x <max)) || (x==max && (y>min && y <max)) ){
        if(document.getElementById("i"+(parseInt(x)-1)+""+(parseInt(y))).value=='2'){
            tae++;
        }
    }
    /*------ [5] ------*/
    if((x==max && y== min) || ((parseInt(x)>min && parseInt(x) < max) && (parseInt(y)>min && parseInt(y) < max))
        || ((y==min && (x>min && x <max))) || (x==max && (y>min && y <max)) ){
        if(document.getElementById("i"+(parseInt(x)-1)+""+(parseInt(y)+1)).value=='2'){
            tae++;
        }
    }
    /*------ [6] ------*/
    if((x==max && y==max) || (x == min && y == max) || ((parseInt(x)>min && parseInt(x) < max) && (parseInt(y)>min && parseInt(y) < max))
        || ((x == min) && (parseInt(y)>min && parseInt(y) < max)) || (y==max && (x>min && x <max))
        || (x==max && (y>min && y <max))){
        if(document.getElementById("i"+(parseInt(x))+""+(parseInt(y)-1)).value=='2'){
            tae++;
        }
    }
    /*------ [7] ------*/
    if((x==max && y==max) || ((parseInt(x)>min && parseInt(x) < max) && (parseInt(y)>min && parseInt(y) < max))
        || (y==max && (x>min && x <max)) || (x==max && (y>min && y <max))){
        if(document.getElementById("i"+(parseInt(x)-1)+""+(parseInt(y)-1)).value=='2'){
            tae++;
        }
    }
    /*------ [8] ------*/
    if((x == min && y == max) ||  ((parseInt(x)>min && parseInt(x) < max) && (parseInt(y)>min && parseInt(y) < max))
        || ((x == min) && (parseInt(y)>min && parseInt(y) < max)) || (y==max && (x>min && x <max)) ){
        if(document.getElementById("i"+(parseInt(x)+1)+""+(parseInt(y)-1)).value=='2'){
            tae++;
        }
    }
    if(tae==0){
        tae = "";
    }
    return tae;

}
function silingangTaeChecker(x,y){
    var coordinate = bombCoordinateChecker(x, y);
    /*------- [1] -------*/
    if((coordinate=="center")||(coordinate=="drc")||(coordinate=="rs")||(coordinate=="bs")){
        clickM((parseInt(x)-1)+""+(parseInt(y)-1));
    }
    /*------- [2] -------*/
    if((coordinate=="center")||(coordinate=="dlc")||(coordinate=="drc")||(coordinate=="ls")||(coordinate=="rs")||(coordinate=="bs")){
        clickM((parseInt(x)-1)+""+(parseInt(y)));
    }
    /*------- [3] -------*/
    if((coordinate=="center")||(coordinate=="dlc")||(coordinate=="ls")||(coordinate=="bs")){
        clickM((parseInt(x)-1)+""+(parseInt(y)+1));
    }
    /*------- [4] -------*/
    if((coordinate=="center")||(coordinate=="ulc")||(coordinate=="dlc")||(coordinate=="ts")||(coordinate=="ls")||(coordinate=="bs")){
        clickM((parseInt(x))+""+(parseInt(y)+1));
    }
    /*------- [5] -------*/
    if((coordinate=="center")||(coordinate=="ulc")||(coordinate=="ts")||(coordinate=="ls")){
        clickM((parseInt(x)+1)+""+(parseInt(y)+1));
    }
    /*------- [6] -------*/
    if((coordinate=="center")||(coordinate=="ulc")||(coordinate=="urc")||(coordinate=="ts")||(coordinate=="ls")||(coordinate=="rs")){
        clickM((parseInt(x)+1)+""+(parseInt(y)));
    }
    /*------- [7] -------*/
    if((coordinate=="center")||(coordinate=="urc")||(coordinate=="ts")||(coordinate=="rs")){
        clickM((parseInt(x)+1)+""+(parseInt(y)-1));
    }
    /*------- [8] -------*/
    if((coordinate=="center")||(coordinate=="drc")||(coordinate=="urc")||(coordinate=="ts")||(coordinate=="rs")||(coordinate=="bs")){
        clickM((parseInt(x))+""+(parseInt(y)-1));
    }
}
function bombCoordinateChecker(x,y){
    var min = 1;
    var max = globalY;
    var ctrl = "";
    if(((parseInt(x)>min && parseInt(x) < max) && (parseInt(y)>min && parseInt(y) < max)) ){
        ctrl = "center";
    }
    else if((x == min && y == min)){
        ctrl = "ulc";
    }
    else if((x==max && y== min)){
        ctrl = "dlc";
    }
    else if((x == min && y == max)){
        ctrl = "urc";
    }
    else if((x==max && y==max)){
        ctrl = "drc";
    }
    else if(((x == min) && (parseInt(y)>min && parseInt(y) < max))){
        ctrl = "ts";
    }
    else if(((y==min && (x>min && x <max)))){
        ctrl = "ls";
    }
    else if((x==max && (y>min && y <max)) ){
        ctrl = "bs";
    }
    else if((y==max && (x>min && x <max))){
        ctrl = "rs";
    }

    return ctrl;
}
$(document).ready(function(){
    document.oncontextmenu = function(){return false};
    $(document).mousedown(function(e){
        /*$("#11").click(function(){
         *//*if(e.button==2){
         alert("ok na!!");
         return false;
         }*//*

         });*/
        if(e.button==2){
            alert("Right click on the road!!");
            return false;
        }
        else{
            //alert("return true;");
            return true;
        }
    });
    /* $("#sample").mousedown(function(e){
     switch(e.which){
     case 2:
     alert("rigth click!!");
     break;
     default:
     alert("default in switch");

     }); */
    $('#select-board').change(function(){
        init()
    })
});
function sample(value){
    for(var i = 0; i<value;i++){
        if(value[value.length-1]==">"){
            alert("value:"+value);
        }
    }
}
function alert(id) {
    console.log("Ok: " + id)
}
function init(){
    var str = "<table border='1' id='myTbl'>";
    var ctr = 0;
    var rowCol = globalY;
    var board = document.getElementById('select-board').value.split(",")
    console.log(board)
    globalY = board[0]
    globalX = board[1]
    var mines = board[2]

    for(var i = 1; i <= globalY; i ++ ){
        ctr = 0;
        str+="<tr>";
        for(var j = 1; j <= globalX; j ++ ){
            str+="<td onclick='clickM(this.id)' id='"+i+""+ j +"'> <input type='hidden' value='0' id='i"+i+""+j +"'/></td>";
        }
        str+="</tr>";
    }


    str+="</table>";
    document.getElementById('container').innerHTML = str;
    setBomb(mines);
}
function setBomb(b){
    var bomb = 0;
    while(bomb<b){
        var max = globalY;
        var min = 1;
        var x = Math.floor(Math.random()*(max-min+1))+min;
        var y = Math.floor(Math.random()*(max-min+1))+min;
        if(document.getElementById("i"+x+""+y).value != "2"){
            document.getElementById("i"+x+""+y).value = "2";
            bomb++;
        }
    }
}

/* ASK CONFIRMATION TO THE USER TO ABANDON THE SHIP.. HAHA... */
var dont_confirm_leave = 0; //set dont_confirm_leave to 1 when you want the user to be able to leave without confirmation
var leave_message = 'You sure you want to leave?';
function goodbye(e) {
    if (dont_confirm_leave!==1) {
        if(!e) e = window.event;
        //e.cancelBubble is supported by IE - this will kill the bubbling process.
        e.cancelBubble = false;
        e.returnValue = leave_message;
        //e.stopPropagation works in Firefox.
        if (e.stopPropagation) {

            e.stopPropagation();
            e.preventDefault();
        }
        //return works for Chrome and Safari
        return leave_message;
    }
}
window.onbeforeunload=goodbye;
