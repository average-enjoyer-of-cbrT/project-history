import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { events as allEvents } from '../data/events';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

interface EventLocation {
  id: string;
  title: string;
  date: string;
  coordinates?: [number, number];
  coverImage?: string;
}

interface EventMapProps {
  events: EventLocation[];
  currentEventId?: string;
}

const EventMap: React.FC<EventMapProps> = ({ events = allEvents, currentEventId }) => {
  const navigate = useNavigate();
  const mapRef = useRef<Map | null>(null);
  const mapElement = useRef<HTMLDivElement>(null);
  const popupElement = useRef<HTMLDivElement>(null);
  const popupContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current || !popupElement.current || !popupContent.current) return;

    // Используем все события, если явно не переданы
    const mapEvents = events && events.length > 0 ? events : allEvents;

    // Создаем источник для маркеров
    const vectorSource = new VectorSource();

    // Создаем слой для маркеров
    const markerLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const isActive = feature.get('id') === currentEventId;
        return new Style({
          image: new Circle({
            radius: isActive ? 12 : 8,
            fill: new Fill({ color: isActive ? '#ffffff' : '#888888' }),
            stroke: new Stroke({ color: '#ffffff', width: 2 })
          })
        });
      }
    });

    // Создаем карту если она еще не создана
    if (!mapRef.current) {
      mapRef.current = new Map({
        target: mapElement.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
              attributions: '© OpenStreetMap contributors, © CARTO'
            })
          }),
          markerLayer
        ],
        view: new View({
          center: fromLonLat([30, 54.5]),
          zoom: 4,
          minZoom: 3,
          maxZoom: 12 // увеличиваем максимальный zoom
        })
      });

      // Создаем попап
      const overlay = new Overlay({
        element: popupElement.current,
        positioning: 'bottom-center',
        offset: [0, -10],
        autoPan: true
      });

      mapRef.current.addOverlay(overlay);

      // Обработчики событий
      mapRef.current.on('pointermove', (e) => {
        const feature = mapRef.current?.forEachFeatureAtPixel(e.pixel, (f) => f);
        
        if (feature) {
          const coords = (feature.getGeometry() as Point).getCoordinates();
          const title = feature.get('title');
          const date = feature.get('date');
          const coverImage = feature.get('coverImage');
          popupContent.current!.innerHTML = `
            <div class="bg-black/90 px-3 py-2 rounded-lg border border-gray-700 flex items-center gap-3 max-w-xs">
              <img src="${coverImage}" alt="${title}" class="w-16 h-16 object-cover rounded-md border border-gray-700" />
              <div>
                <div class="font-medium text-sm text-white mb-1">${title}</div>
                <div class="text-xs text-gray-300 mb-1">${date}</div>
              </div>
            </div>
          `;
          overlay.setPosition(coords);
        } else {
          overlay.setPosition(undefined);
        }
      });

      mapRef.current.on('click', (e) => {
        const feature = mapRef.current?.forEachFeatureAtPixel(e.pixel, (f) => f);
        if (feature) {
          navigate(`/events/${feature.get('id')}`);
        }
      });
    }

    // Добавляем маркеры для всех событий
    vectorSource.clear();
    mapEvents.forEach(event => {
      if (!event.coordinates) return;
      const [lat, lon] = event.coordinates;
      if (typeof lat !== 'number' || typeof lon !== 'number') return;
      const feature = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
        id: event.id,
        title: event.title,
        date: event.date,
        coverImage: event.coverImage || ''
      });
      vectorSource.addFeature(feature);
    });

    // Центрируем на активном событии
    if (currentEventId) {
      const currentEvent = mapEvents.find(e => e.id === currentEventId);
      if (currentEvent && currentEvent.coordinates && mapRef.current) {
        const [lat, lon] = currentEvent.coordinates;
        mapRef.current.getView().animate({
          center: fromLonLat([lon, lat]),
          zoom: 6,
          duration: 1000
        });
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  }, [events, currentEventId, navigate]);

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
      <div ref={mapElement} className="w-full h-full" />
      <div ref={popupElement} className="absolute z-10 pointer-events-none">
        <div ref={popupContent} />
      </div>
    </div>
  );
};

export default EventMap;
