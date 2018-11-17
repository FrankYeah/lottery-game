let app = {};
let numSelect = [];
let historySelect = [];
let chartSelect = [];

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
    if(numSelect.length == 4){
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
            console.log(historySelect);
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

// chart 

var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: 'Win rate'
    },
    tooltip: {},
    legend: {
        data:['lottery number']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子", '哈哈']
    },
    yAxis: {},
    series: [{
        name: 'lottery number',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20, 99]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

