export interface Reminder {
  title: string;
  color: string;
  id: string;
  city: string;
  dateTime: Date;
  date: string;
  forecastDesc?: string;
  forecast?: string;
}