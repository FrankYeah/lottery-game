let app = {};
let numSelect = [];
let numToString;
let historySelect = [];
let chartSelect = [];
let chartAll = [];
let selectValue =[];
let selectCount =[];
let secondObj ={value:0,name:''};
let secondChart = [];

console.log('hi')
// restart
const restart = document.getElementById('restart');
let element= document.getElementsByClassName('circle');
restart.addEventListener('click', function(){
    numSelect = [];
    historySelect = [];
    chartSelect = [];
    chartAll = [];
    selectValue =[];
    selectCount =[];
    secondObj ={value:0,name:''};
    secondChart = [];
    document.getElementById('rightUpPaddle').innerHTML = '';
    document.getElementById('rihtDownPaddle').innerHTML = '';
    for(let i=0; i<16 ; i++){
        element[i].style.background = `url("c-01.png") 0% 0% / cover no-repeat`;
    }
    app.drawChart();
})

// select lettery number
 app.draw = document.getElementsByClassName('left-down-paddle')[0];
 app.draw.addEventListener('click', function(){
    for(let i=0; i<16 ; i++){
        element[i].style.background = `url("c-01.png") 0% 0% / cover no-repeat`;
    }
    app.randomNum();
    let map1 = numSelect.map(x => x - 1);
    element[map1[0]].style.background = `url("c-03.png") 0% 0% / cover no-repeat`;
    element[map1[1]].style.background = `url("c-03.png") 0% 0% / cover no-repeat`;
    element[map1[2]].style.background = `url("c-03.png") 0% 0% / cover no-repeat`;
    element[map1[3]].style.background = `url("c-02.png") 0% 0% / cover no-repeat`;

    // draw current on 
    if(numSelect.length == 4){
        document.getElementById('rightUpPaddle').innerHTML = '';
        for(let i=0; i<4 ; i++){
            chartAll.push(Number(numSelect[i]));
            if(chartAll.length>20){
                chartAll.shift();
            }
            app.drawOn(numSelect[i], 'rightUpPaddle');
            let select = document.querySelector('.right-up-paddle');
            let inner = select.querySelectorAll('.circle2');
            if(i<3){
                inner[i].style.background = `url("c-03.png") 0% 0% / cover no-repeat`;
            }else if(i==3){
                inner[i].style.background = `url("c-02.png") 0% 0% / cover no-repeat`;
            }
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

 app.randomNum = function(){
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let count = arr.length;
    for (var i = 0; i < 4; i++) {
        let index = ~~(Math.random() * count) + i;
        numSelect[i] = arr[index];
        arr[index] = arr[i];
        count--;
    }
 }

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

    // draw first chart 
    var myChart = echarts.init(document.getElementById('main'));
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
            data: selectCount,
            animationDelay: function (idx) {
                return idx * 10;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };
    myChart.setOption(option);

//-----------------------------------------------------------------------------------------------------//
    // draw second chart
    var mainTwo = echarts.init(document.getElementById('mainTwo'));
    secondChart =[];
    for(let i=0; i<selectValue.length; i++){
        secondObj.value = selectCount[i];
        secondObj.name = selectValue[i];
        secondChart.push(secondObj);
        secondObj ={value:0,name:''};
    }
    mainTwo.setOption({
        backgroundColor: '#2c343c',
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data:secondChart,
                animationDelay: function (idx) {
                    return idx * 10;
                },
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }              
            }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    })
}