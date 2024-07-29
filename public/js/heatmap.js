document.addEventListener('DOMContentLoaded', function() {

    try{
        
if(typeof CalHeatMap !== undefined) {


const cal = new CalHeatMap();

// const data = {
    
// }

// const data = [
//     {date: '2024-01-01', value: 1},
//     {date: '2024-01-02', value: 2},
//     {date: '2024-01-03', value: 3}
    
// ]

// const data = [
//     { year: 2024, month: 1, day: 1, value: 10 }
// ];

const data = {
    "1719792000": 1, // 2024-07-01
    "1719878400": 2, // 2024-07-02
    "1719964800": 3, // 2024-07-03
  };

const startDate = new Date('2024-01-01');
const endDate = new Date('2024-12-31');

console.log("data", data)

cal.init({
    itemSelector: '#cal-heatmap',
    domain: 'month',
    subDomain: 'x_day',
    data: data,
    start: startDate,
    end: endDate,
    cellSize: 20,
    cellRadius: 5,
    tooltip: true,
    domainGutter: 10,
    range: 12,
    subDomainTextFormat: '%d',
    legend: [1, 2, 3, 4],
    legendColors: {
        min: '#fbffbe',
        max: '#305920',
        base: 'blue'
    },
    itemName: ['entry', 'entries'],
    subDomainTitleFormat: {
        empty: 'No entries on {date}',
        filled: 'Mood Value is {count} on {date}'
    }

});

} else {
console.log("map is not defined")
}
} catch (error) {
console.log(error)
}
});