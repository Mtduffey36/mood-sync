document.addEventListener('DOMContentLoaded', function() {

    try{
        
if(typeof CalHeatMap !== undefined) {


const cal = new CalHeatMap();

const data = {
    '2024-07-01': 10,
    '2024-07-02': 20,
    '2024-07-03': 30,

};

const startDate = new Date('2024-01-01');
const endDate = new Date('2024-12-31');



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
    legend: [10, 20, 30, 40],
    legendColors: {
        min: '#fbffbe',
        max: '#305920',
        empty: 'black',
        base: 'blue'
    },
    itemName: ['entry', 'entries'],
    subDomainTitleFormat: {
        empty: 'No entries on {date}',
        filled: '{count} {name} on {date}'
    }

});

} else {
console.log("map is not defined")
}
} catch (error) {
console.log(error)
}
});