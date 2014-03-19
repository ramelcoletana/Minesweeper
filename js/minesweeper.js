/**
 * Created by Coletana on 3/17/14.
 */
/////////////////////////////////////////////
// Minesweeper game algorithm
// Authors: Argie Abedejos & Ramel Coletana
// March 17   14
//
// Tanan pwedi mugamit ani kai
// Open source ni hahaha..
// Mura bag android open source pud.
// Pwedi ni nimo ma'modify as long as you want
// but please make sure that it will be more #AWESOME
//
////////////////////////////////////////////


var globalX = 1;
var globalY = 9;
var mines = 0;
var minesFound = 0;

function init(){
    var str = "<table border='1' id='myTbl'>";
    var ctr = 0;
    var board = document.getElementById('select-board').value.split(",")
    globalX = board[0]
    globalY = board[1]
    mines = board[2]
    document.getElementById("mines").value = mines

    for(var i = 1; i <= globalX; i ++ ){
        ctr = 0;
        str+="<tr>";
        for(var j = 1; j <= globalY; j ++ ){
            str+="<td onclick='clickM(this.id)' id='"+i+"_"+ j +"' data-flag='false' data-open='false'> <input type='hidden' value='0' id='i"+i+"_"+j +"'/></td>";
        }
        str+="</tr>";
    }
    str+="</table>";
    document.getElementById('container').innerHTML = str;
    setBomb(mines);
}

function clickM(id){
    if(!isFlagged(id)){
        document.getElementById(id).style.backgroundColor = "#ccc";
        var stat = document.getElementById("i"+id).value;
        var iTA = id.split("_")
        if(stat=='0'){
            var tae = checkBomb(iTA[0], iTA[1]);
            $("#"+id).data("open", true)
            $("#"+id).css('background-image','none').append("<center><label class='label"+tae+"'>"+tae+"</label></center>");

            document.getElementById("i"+id).value = '6';
			
            if(tae==""){
                // alert(id);
                neighborBombChecker(iTA[0], iTA[1]);
            }
        }
        else if(stat=='1'){

            $("#"+id).css('background-image','url(default.PNG)');
            $("#"+id).data("open", true)
            document.getElementById("i"+id).value = '3';
        }
        else if(stat=='2'){

            //show all bomb;
            for(var s = 1; s<=globalX; s++){
                for(var w = 1; w<=globalY; w++){
                    if(document.getElementById("i"+s+"_"+w).value=='2'){
                        $("#"+s+"_"+w).css('background-image','url(images/boom1.png)');
                        //playSound("sound/button-1.wav")
                    }
                }
            }
            mines = 0;
            minesFound = 0;
           /* $('#overlay').fadeIn(500);
            $('#gameOver').fadeIn(500);*/
        }
    }

}

function playSound(soundfile) {
    document.getElementById("dummy").innerHTML= "<embed src=\""
        +soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
}

function checkBomb(x1,y1){
    var tae = 0;
    var max = parseInt(globalY);
	var max4x = parseInt(globalX);
    var min = 1;
	var x = parseInt(x1);
	var y = parseInt(y1);
	//alert(globalY+""+globalX+""+y1+""+x1);
    /*------ [1] ------*/
    if((x == min && y == min) || (x == min && y == max) || ((parseInt(x1)>min && parseInt(x1) < max4x) && (parseInt(y1)>min && parseInt(y1) < max))
        || ((x == min) && (parseInt(y1)>min && parseInt(y1) < max)) || ((y==min && (x>min && x <max4x)))
        || (y==max && (x>min && x <max4x))){
		
        if(document.getElementById("i"+(parseInt(x1)+1)+"_"+(parseInt(y1))).value=='2'){
            tae++;
        }

    }
    /*------ [2] ------*/
    if((x == min && y == min) || ((parseInt(x1)>min && parseInt(x1) < max4x) && (parseInt(y1)>min && parseInt(y1) < max))
        || ((x == min) && (parseInt(y1)>min && parseInt(y1) < max)) || ((y==min && (x>min && x <max4x))) ){
        if(document.getElementById("i"+(parseInt(x1)+1)+"_"+(parseInt(y1)+1)).value=='2'){
            tae++;
        }
    }
    /*------ [3] ------*/
    if((x == min && y == min) || (x==max4x && y== min) || ((parseInt(x1)>min && parseInt(x1) < max4x) && (parseInt(y1)>min && parseInt(y1) < max))
        || ((x == min) && (parseInt(y1)>min && parseInt(y1) < max)) || ((y==min && (x>min && x <max4x)))
        || (x==max4x && (y>min && y <max))){
        if(document.getElementById("i"+(parseInt(x1))+"_"+(parseInt(y1)+1)).value=='2'){
            tae++;
        }
    }
    /*------ [4] ------*/
    if((x==max4x && y== min) || (x==max4x && y==max) || ((parseInt(x1)>min && parseInt(x1) < max4x) && (parseInt(y1)>min && parseInt(y1) < max))
        || ((y==min && (x>min && x <max4x))) || (y==max && (x>min && x <max4x)) || (x==max4x && (y>min && y <max)) ){
		
        if(document.getElementById("i"+(parseInt(x1)-1)+"_"+(parseInt(y1))).value=='2'){
            tae++;
        }
    }
    /*------ [5] ------*/
    if((x==max4x && y== min) || ((parseInt(x1)>min && parseInt(x1) < max4x) && (parseInt(y1)>min && parseInt(y1) < max))
        || ((y==min && (x>min && x <max4x))) || (x==max4x && (y>min && y <max)) ){
        if(document.getElementById("i"+(parseInt(x1)-1)+"_"+(parseInt(y1)+1)).value=='2'){
            tae++;
        }
    }
    /*------ [6] ------*/
    if((x==max4x && y==max) || (x == min && y == max) || ((parseInt(x1)>min && parseInt(x1) < max4x) && (parseInt(y1)>min && parseInt(y1) < max))
        || ((x == min) && (parseInt(y1)>min && parseInt(y1) < max)) || (y==max && (x>min && x <max4x))
        || (x==max4x && (y>min && y <max))){
        if(document.getElementById("i"+(parseInt(x1))+"_"+(parseInt(y1)-1)).value=='2'){
            tae++;
        }
    }
    /*------ [7] ------*/
    if((x==max4x && y==max) || ((parseInt(x1)>min && parseInt(x1) < max4x) && (parseInt(y1)>min && parseInt(y1) < max))
        || (y==max && (x>min && x <max4x)) || (x==max4x && (y>min && y <max))){
        if(document.getElementById("i"+(parseInt(x1)-1)+"_"+(parseInt(y1)-1)).value=='2'){
            tae++;
        }
    }
    /*------ [8] ------*/
    if((x == min && y == max) ||  ((parseInt(x1)>min && parseInt(x1) < max4x) && (parseInt(y1)>min && parseInt(y1) < max))
        || ((x == min) && (parseInt(y1)>min && parseInt(y1) < max)) || (y==max && (x>min && x <max4x)) ){
        if(document.getElementById("i"+(parseInt(x1)+1)+"_"+(parseInt(y1)-1)).value=='2'){
            tae++;
        }
    }
    if(tae==0){
        tae = "";
    }
    return tae;

}
function neighborBombChecker(x,y){
    var coordinate = bombCoordinateChecker(x, y);
    /*------- [1] -------*/
	//alert(coordinate);
    if((coordinate=="center")||(coordinate=="drc")||(coordinate=="rs")||(coordinate=="bs")){
        clickM((parseInt(x)-1)+"_"+(parseInt(y)-1));
    }
    /*------- [2] -------*/
    if((coordinate=="center")||(coordinate=="dlc")||(coordinate=="drc")||(coordinate=="ls")||(coordinate=="rs")||(coordinate=="bs")){
        clickM((parseInt(x)-1)+"_"+(parseInt(y)));
    }
    /*------- [3] -------*/
    if((coordinate=="center")||(coordinate=="dlc")||(coordinate=="ls")||(coordinate=="bs")){
        clickM((parseInt(x)-1)+"_"+(parseInt(y)+1));
    }
    /*------- [4] -------*/
    if((coordinate=="center")||(coordinate=="ulc")||(coordinate=="dlc")||(coordinate=="ts")||(coordinate=="ls")||(coordinate=="bs")){
        clickM((parseInt(x))+"_"+(parseInt(y)+1));
    }
    /*------- [5] -------*/
    if((coordinate=="center")||(coordinate=="ulc")||(coordinate=="ts")||(coordinate=="ls")){
        clickM((parseInt(x)+1)+"_"+(parseInt(y)+1));
    }
    /*------- [6] -------*/
    if((coordinate=="center")||(coordinate=="ulc")||(coordinate=="urc")||(coordinate=="ts")||(coordinate=="ls")||(coordinate=="rs")){
        clickM((parseInt(x)+1)+"_"+(parseInt(y)));
    }
    /*------- [7] -------*/
    if((coordinate=="center")||(coordinate=="urc")||(coordinate=="ts")||(coordinate=="rs")){
        clickM((parseInt(x)+1)+"_"+(parseInt(y)-1));
    }
    /*------- [8] -------*/
    if((coordinate=="center")||(coordinate=="drc")||(coordinate=="urc")||(coordinate=="ts")||(coordinate=="rs")||(coordinate=="bs")){
        clickM((parseInt(x))+"_"+(parseInt(y)-1));
    }
}
function bombCoordinateChecker(x1,y1){
    var min = 1;
    var max = parseInt(globalY);
	var max4X =  parseInt(globalX);
    var ctrl = "";
	var x = parseInt(x1);
	var y = parseInt(y1);
    if(((parseInt(x1)>min && parseInt(x1) < max4X) && (parseInt(y1)>min && parseInt(y1) < max)) ){
        ctrl = "center";
    }
    else if((x == min && y == min)){
        ctrl = "ulc";
    }
    else if((x==max4X && y== min)){
        ctrl = "dlc";
    }
    else if((x == min && y == max)){
        ctrl = "urc";
    }
    else if((x==max4X && y==max)){
        ctrl = "drc";
    }
    else if(((x == min) && (parseInt(y1)>min && parseInt(y1) < max))){
        ctrl = "ts";
    }
    else if(((y==min && (x>min && x <max4X)))){
        ctrl = "ls";
    }
    else if((x==max4X && (y>min && y <max)) ){
        ctrl = "bs";
    }
    else if((y==max && (x>min && x <max4X))){
        ctrl = "rs";
    }
	
    return ctrl;
}

function setBomb(b){
    var bomb = 0;
    while(bomb<b){
        var max = globalY;
		var bisagUnsa = globalX;
        var min = 1;
        var y = Math.floor(Math.random()*(max-min+1))+min;
        var x = Math.floor(Math.random()*(bisagUnsa-min+1))+min;
        if(document.getElementById("i"+x+"_"+y).value != "2"){
            document.getElementById("i"+x+"_"+y).value = "2";
            bomb++;
        }
    }
}

function isFlagged(id) {
    return ($('#'+id).data("flag") == true) ? true : false
}

function isOpened(id) {
    return ($('#'+id).data("open") == true) ? true : false
}

/* ASK CONFIRMATION TO THE USER TO ABANDON THE SHIP.. HAHA... */
/*var dont_confirm_leave = 0; //set dont_confirm_leave to 1 when you want the user to be able to leave without confirmation
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
window.onbeforeunload=goodbye;*/


$(document).ready(function(){
    document.oncontextmenu = function(){return false};

    $("body").on("mousedown", "td", function(e){
        var id = this.id
        var val = document.getElementById("i" + id).value
        if (e.which == 3) {

            if(!isOpened(id)) {
                if(!isFlagged(id)){
                    $("#"+id).data("flag", true)
                    $("#"+id).css('background-image','url(images/flag.png)');
                    $("#"+id).css('background-repeat','no-repeat');

                    minesFound++
                    mines = parseInt(mines) - 1
                }else {
                    minesFound--
                    mines = parseInt(mines) + 1
                    $("#"+id).data("flag", false)
                    $("#"+id).css('background-image','url(images/Square_gradient.png)');
                    $("#"+id).css('background-repeat','no-repeat');
                }
            }
            document.getElementById("mines").value = mines
            mines = document.getElementById("mines").value
        }
    })

    $('#select-board').change(function(){
        init()
    })

    $("#btnGO").click(function(){
        $('#overlay').fadeOut(500);
        $('#gameOver').fadeOut(500);
        init();
    });
});
