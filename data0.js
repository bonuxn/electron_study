// データ範囲 左右別
var leftRange = [-20, 40];
var rightRange = [-5, 105];
// 初期データ
var data = [
        {
            label: "layer1",
            range: leftRange,
            values: [],
        },
        {
            label: "layer2",
            range: rightRange,
            values: [],
        }
    ]
;
// 初期化
let chart = $('#myChart').epoch({
    type: 'time.line',                         //グラフの種類
    data: data,                                  //初期値
    axes: ['bottom', 'left', 'right'],       //利用軸の選択
    fps: 24,                                     //フレームレート
    range: {                                     //軸の範囲
        left: leftRange,
        right: rightRange
    },
    queueSize: 1,   // キューサイズ ※push時、キューからあふれたデータは破棄される
    windowSize: 20, // 表示から見切れるまでいくつデータを表示させるか

    // 目盛りの設定。 timeは間隔秒数、他は目盛りの数
    ticks: {time: 5, right: 5, left: 5},
    // 目盛りの書式
    tickFormats: {
        bottom: function (d) {
            return moment(d * 1000).format('HH:mm:ss');
        },
        left: function (d) {
            return (d).toFixed(1) + " ℃";
        },
        right: function (d) {
            return (d).toFixed(0) + " %";
        }

    }
});

// リアルタイム表示処理
setInterval(function () {
    chart.push(
        [
            {time: Date.now() / 1000, y: $("#temperature")[0].value,},
            {time: Date.now() / 1000, y: $("#humidity")[0].value,},
        ],
    );
}, 1000);
