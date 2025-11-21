//Series duration of my life


const seriesDurations = [
  {
    title: "Suits",
    days: 3,
    hours: 21,
    minutes: 48,
  },
  {
    title: "The Man in the High Castle",
    days: 5,
    hours: 10,
    minutes: 28,
  },
  {
    title: "The Good Doctor",
    days: 9,
    hours: 4,
    minutes: 46,
  },
];function logOutSeriesText() {
  // write code here
  const lifespanYears = 80;
  let totalPercentage = 0;
  const lifespanHours = lifespanYears * 365 * 24;
  for (let i=0; i < seriesDurations.length; i++){
    const series = seriesDurations[i];

    const seriesHours = series.days * 24 +
    series.hours +
    series.minutes / 60;
    const percentage = (seriesHours / lifespanHours) * 100;
    totalPercentage += percentage;
    console.log(
      `${series.title} took ${percentage.toFixed(3)}% of my life`
    );
  }
  }
   logOutSeriesText(); 
