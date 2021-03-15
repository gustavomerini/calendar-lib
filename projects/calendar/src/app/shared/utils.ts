export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
export const weatherApi = {
    url: 'http://api.openweathermap.org/data/2.5',
    key: '58b6f7c78582bffab3936dac99c31b25'
}
export const sortByDateAdc = (a: any, b: any) => {
    return a - b;
}

export const testReminders: any = [{"dateTime": new Date("2021-03-08T11:00:00.000Z"),"title":"Sprint review","city":"Blumenau","color":"#5e35b1","date":"3/8/2021","id":"3/8/2021, 8:00:00 AM","forecast":"04n","forecastDesc":"broken clouds"},{"dateTime": new Date("2021-03-08T13:00:00.000Z"),"title":"Sprint planing","city":"Blumenau","color":"#5e35b1","date":"3/8/2021","id":"3/8/2021, 10:00:00 AM","forecast":"04n","forecastDesc":"broken clouds"},{"dateTime": new Date("2021-03-08T14:45:00.000Z"),"title":"Lunch","city":"Indaial","color":"#3F51B5","date":"3/8/2021","id":"3/8/2021, 11:45:00 AM","forecast":"04n","forecastDesc":"overcast clouds"},{"dateTime": new Date("2021-03-08T16:00:00.000Z"),"title":"Interview","city":"New York","color":"#3F51B5","date":"3/8/2021","id":"3/8/2021, 1:00:00 PM","forecast":"03n","forecastDesc":"scattered clouds"},{"dateTime": new Date("2021-03-19T03:00:00.000Z"),"title":"Pizza 🍕","city":"Quebec","color":"#3F51B5","date":"3/19/2021","id":"3/19/2021, 12:00:00 AM","forecast":"01d","forecastDesc":"clear sky"},{"dateTime": new Date("2021-03-08T10:30:00.000Z"),"title":"Daily","city":"Blumenau","color":"#5e35b1","date":"3/8/2021","id":"3/8/2021, 7:30:00 AM","forecast":"04d","forecastDesc":"overcast clouds"},{"dateTime": new Date("2021-03-10T03:00:00.000Z"),"title":"Very long title test overflow","city":"New York","color":"#1b5e20","date":"3/10/2021","id":"3/10/2021, 12:00:00 AM","forecast":"01d","forecastDesc":"clear sky"},{"dateTime": new Date("2021-03-30T03:00:00.000Z"),"title":"My Birthday 🎉","city":"Indaial","color":"#e53935","date":"3/30/2021","id":"3/30/2021, 12:00:00 AM","forecast":"04d","forecastDesc":"overcast clouds"},{"dateTime": new Date("2021-03-17T14:00:00.000Z"),"title":"Spa","city":"New York","color":"#3F51B5","date":"3/17/2021","id":"3/17/2021, 11:00:00 AM","forecast":"01d","forecastDesc":"clear sky"}];