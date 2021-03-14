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