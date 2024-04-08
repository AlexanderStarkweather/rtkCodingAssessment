import { Attraction } from './attraction';
import { City, State, Country } from './location';

export interface EventStart {
  localDate: string;
  localTime: string;
  dateTime: string;
  dateTBD: boolean;
  dateTBA: boolean;
  timeTBA: boolean;
  noSpecificTime: boolean;
}

export interface EventDate {
  start: EventStart;
  timezone?: string;
  status?: any;
  spanMultipleDays?: boolean;
}

export interface EventSubClass {
  id: string;
  name: string;
}

export interface EventClassification {
  primary?: boolean;
  segment: {};
  genre: EventSubClass;
  subGenre: EventSubClass;
  type: EventSubClass;
  subType: EventSubClass;
  family?: boolean;
}

export interface EventVenue {
  name: string;
  type: string;
  id: string;
  url: string;
  locale: string;
  postalCode: string;
  timezone: string;
  city: City;
  state: State;
  country: Country;
}

export interface EventImage {
  ratio: string;
  url: string;
  width: number;
  height: number;
  fallback: boolean;
}

export interface EventEntry {
  name?: string;
  aliases?: string;
  id?: string;
  url?: string;
  dates?: EventDate;
  attractions?: Attraction[];
  venues?: EventVenue[];
  images?: EventImage[];
}
