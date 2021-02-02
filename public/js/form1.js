var field1=document.getElementById("input1");
var field2=document.getElementById("input2");
var field3=document.getElementById("input3");
var field4=document.getElementById("input4");
var submit=document.getElementById("submit1");
function validate(){
    if(field1.value==""){
        return false;
    }
    else if(field2.value==""){
        return false;
    }
    else if(field3.value==""){
        return false;
    }
    else if(field4.value==""){
        return false;
    }
    else{
        alert("added book successfully");
        return true;
    }
}