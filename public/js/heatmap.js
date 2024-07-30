document.addEventListener('DOMContentLoaded', function() {
    fetch('/moodData')
      .then(response => response.json())
      .then(data => {
        console.log("Heatmap data:", data);
        if (typeof CalHeatMap === 'undefined') {
          console.log("CalHeatMap is not defined");
          return;
        }
        try {
          const cal = new CalHeatMap();
          console.log("Initializing CalHeatMap with data:", data);
          cal.init({
            itemSelector: '#cal-heatmap',
            domain: 'month',
            subDomain: 'x_day',
            data: data,
            cellSize: 20,
            cellRadius: 5,
            tooltip: true,
            domainGutter: 10,
            range: 12,
            subDomainTextFormat: '%d',
            legend: [1, 2, 3, 4, 5, 6],
            legendColors: {
              min: '#FBFFBE',
              max: '#305920',
              base: 'white'
            },
            itemName: ['entry', 'entries'],
            subDomainTitleFormat: {
              empty: 'No entries on {date}',
              filled: 'Mood Value is {count} on {date}'
            }
          });
          console.log("CalHeatMap initialized successfully");
        } catch (error) {
          console.error("Error initializing heatmap:", error);
        }
      })
      .catch(error => {
        console.error("Error fetching mood data:", error);
      });
  });