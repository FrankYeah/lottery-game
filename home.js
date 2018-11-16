let app = {};
let numSelect = [];
let historySelect = [];

// select lettery number
let element= document.getElementsByClassName('circle');
 for(let i=0; i<element.length; i++){
    element[i].addEventListener('click', function(){
        if(numSelect.length < 3 && historySelect.length<16){
            numSelect.push(element[i].textContent);
            element[i].style.background = `url("c-02.png") 0% 0% / cover no-repeat`;
        }else if(numSelect.length == 3 && historySelect.length<16){
            numSelect.push(element[i].textContent);
            element[i].style.background = `url("c-03.png") 0% 0% / cover no-repeat`;

        }
    });   
 }

 app.draw = document.getElementsByClassName('left-down-paddle')[0];
 app.draw.addEventListener('click', function(){

    // draw on up 
    if(numSelect.length == 4 && historySelect.length<16){
        document.getElementById('rightUpPaddle').innerHTML = '';
        for(let i=0; i<4 ; i++){
            app.drawOn(numSelect[i], 'rightUpPaddle');
            var select = document.querySelector('.right-up-paddle');
            var inner = select.querySelectorAll('.circle2');
            if(i<3){
                inner[i].style.background = `url("c-02.png") 0% 0% / cover no-repeat`;
            }else if(i==3){
                inner[i].style.background = `url("c-03.png") 0% 0% / cover no-repeat`;
            }
        }
        for(let i=0; i<16 ; i++){
            element[i].style.background = `url(c-01.png)`;
            element[i].style.backgroundRepeat = `no-repeat`;
            element[i].style.backgroundSize = `cover`;
        }
        historySelect.push(numSelect);
        numSelect = [];
    }

    // history draw
    if(historySelect.length>1){
        if(historySelect.length==6){
            historySelect.shift();
        }
        document.getElementById('rihtDownPaddle').innerHTML = '';
        for(let i=0; i<historySelect.length-1; i++){
            for(let j=0; j<4; j++){
            app.drawOn(historySelect[historySelect.length-2-i][j], 'rihtDownPaddle');
            }
        }
    }


 })

 app.drawOn = function(text, append){
    let newElement = document.createElement('div');
    newElement.className = 'circle2';
    newElement.textContent = text;
    document.getElementById(append).appendChild(newElement);
}