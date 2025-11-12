function getEventWeekday(daysLeft) {
  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const today = new Date().getDay(); // Get today's day number (0–6)
  const todayName = week[today];     // Convert to weekday name
  
  const eventDayNumber = (today + daysLeft) % week.length; // Wrap around the week
  const eventDayName = week[eventDayNumber];               // Get event weekday name

  console.log(`Today is ${todayName} and the event will be on ${eventDayName}.`);
  
  return eventDayName;
}

getEventWeekday(5);
getEventWeekday(9);