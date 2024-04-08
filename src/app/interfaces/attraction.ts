import { EventImage } from './event';
import { EventClassification } from './event';
export interface Attraction {
  name: string;
  type: string;
  id: string;
  test?: boolean;
  url: string;
  locale?: string;
  images?: EventImage[];
  classifications?: EventClassification[];
  aliases?: string[];
}
