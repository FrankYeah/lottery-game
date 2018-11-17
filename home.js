let app = {};
let numSelect = [];
let historySelect = [];
let chartSelect = [];
let chartAll = [];
let selectValue =[];
let selectCount =[];

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

    // draw current on 
    if(numSelect.length == 4){
        document.getElementById('rightUpPaddle').innerHTML = '';
        for(let i=0; i<4 ; i++){

            chartAll.push(Number(numSelect[i]));
            if(chartAll.length>20){
                chartAll.shift();
            }
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

    app.drawChart();
 })

 app.drawOn = function(text, append){
    let newElement = document.createElement('div');
    newElement.className = 'circle2';
    newElement.textContent = text;
    document.getElementById(append).appendChild(newElement);
}

// chart 
app.drawChart = function(){
    chartSelect = [];
    chartSelect = chartSelect.concat(chartAll);
    chartSelect.sort(function (a, b) {
        return a - b;
    });

    // get count
    selectValue =[];
    selectCount =[];
    
    for(let i=0 ; i<chartSelect.length; i++){
      if(chartSelect[i] != chartSelect[i-1]){
        selectValue.push(chartSelect[i]);
        selectCount.push(1);
        
      }
      if(i>0 && chartSelect[i] == chartSelect[i-1]){
        selectCount[selectCount.length-1] = selectCount[selectCount.length-1] +1
      }
    }

    // draw chart
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
            data: selectValue
        },
        yAxis: {},
        series: [{
            name: 'lottery number',
            type: 'bar',
            data: selectCount
        }]
    };
    
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}