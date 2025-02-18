function kiertekeles(){

    var elertPontok = 0;
    var radioButtons = document.getElementsByName("radiokerdes");
    var radioValue;
    for(var i = 0; i< radioButtons.length; i++){
        if( radioButtons[i].checked){
            radioValue = radioButtons[i].value;
        }
    }

    if(radioValue == "asd"){
        elertPontok++;
    }

    var selection = document.getElementById("cars");
    
    if(selection.value == "volvo"){
        elertPontok++;
    }

    var selection2 = document.getElementById("cars2");
    
    if(selection2.value == "saab"){
        elertPontok++;
    }

    var checkboxes = document.getElementsByName("valassz");
    
    if(checkboxes[0].checked && checkboxes[2].checked){
        elertPontok++;
    }
    
    

    var szam = document.getElementById("szam");

    if(+szam.value == 2000){
        elertPontok++;
    }

    alert(elertPontok);


    
}



