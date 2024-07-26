module.exports = {

get_heatmap: () => {
    
document.addEventListener('DOMContentLoaded', function() {

    try{
if(typeof CalHeatMap !== undefined) {

const cal = new CalHeatMap();

const data = {
    '2023-07-01': 1,
    '2023-07-02': 2,
    '2023-07-03': 3,

};

const startDate = new Date('2023-01-01');
const endDate = new Date('2023-12-31');

cal.init({
    itemSelector: '#cal-heatmap',
    domain: 'month',
    subDomain: 'day',
    data: data,
    start: startDate,
    end: endDate,
    cellSize: 20,
    domainGutter: 10,
    range: 12,
    legend: [1, 2, 3, 4, 5],
    legendColors: {
        min: '#d6e685',
        max: '#1e6823',
        empty: '#eeeeee'
    },
    itemName: ['commit', 'commits'],
    subDomainTitleFormat: {
        empty: 'No commits on {date}',
        filled: '{count} {name} on {date}'
    }

});

} else {
console.log("map is not defined")
}
} catch (error) {
console.log(error)
}
})}};