// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/moodData')
//     .then(response => response.json())
//     .then(data => {
//     console.log("data", data)
//     try{
        
// if(typeof CalHeatMap !== undefined) {

// const cal = new CalHeatMap();
// console.log("cal heat map init", data)

// // const data = {
// //     "1719893579": 2, // 2024-07-01
// //     "1719878400": 3, // 2024-07-02
// //     "1719964800": 4, // 2024-07-03
// //   };

// // const startDate = new Date('2024-01-01');
// // const endDate = new Date('2024-12-31');

// console.log("data", data)

// cal.init({
//     itemSelector: '#cal-heatmap',
//     domain: 'month',
//     subDomain: 'x_day',
//     data: data,
//     cellSize: 20,
//     cellRadius: 5,
//     tooltip: true,
//     domainGutter: 10,
//     range: 12,
//     subDomainTextFormat: '%d',
//     legend: [1, 2, 3, 4],
//     legendColors: {
//         min: '#fbffbe',
//         max: '#305920',
//         base: 'blue'
//     },
//     itemName: ['entry', 'entries'],
//     subDomainTitleFormat: {
//         empty: 'No entries on {date}',
//         filled: 'Mood Value is {count} on {date}'
//     }

// });

// } else {
// console.log("map is not defined")
// }
// } catch (error) {
// console.log(error)
// }
// }) 
// })