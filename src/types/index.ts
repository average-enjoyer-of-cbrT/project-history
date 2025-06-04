export interface Photo {
  url: string;
  caption: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  shortDescription: string;
  description: string[];
  photos?: string[];
  timeline?: TimelineEvent[];
  significance?: string[];
  casualties?: {
    soviet: string;
    german: string;
  };
  coordinates?: [number, number]; // Добавляем координаты
}