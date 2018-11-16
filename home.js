let app = {};
let numSelect = [];
let historySelect = [];

// select lettery number
let element= document.getElementsByClassName('circle');
 for(let i=0; i<element.length; i++){
    element[i].addEventListener('click', function(){
        if(numSelect.length < 3){
            numSelect.push(element[i].textContent);
            element[i].style.backgroundColor = 'red';
        }else if(numSelect.length == 3){
            numSelect.push(element[i].textContent);
            element[i].style.backgroundColor = 'orange';
        }
    });   
 }

 app.draw = document.getElementsByClassName('left-down-paddle')[0];
 app.draw.addEventListener('click', function(){

    // draw on up 
    if(numSelect.length == 4){
        document.getElementById('rightUpPaddle').innerHTML = '';
        for(let i=0; i<4 ; i++){
            app.drawOn(numSelect[i], 'rightUpPaddle');
            historySelect.push(numSelect[i]);
        }
        for(let i=0; i<16 ; i++){
            element[i].style.backgroundColor = 'white';
        }
        numSelect = [];
    }

    // history draw
    if(historySelect.length<=16){
        document.getElementById('rihtDownPaddle').innerHTML = '';
        for(let i=0; i<historySelect.length ; i++){
            app.drawOn(historySelect[i], 'rihtDownPaddle');
        }
    }

 })

 app.drawOn = function(text, append){
    let newElement = document.createElement('div');
    newElement.className = 'circle2';
    newElement.textContent = text;
    document.getElementById(append).appendChild(newElement);
}