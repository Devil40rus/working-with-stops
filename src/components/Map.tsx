import { MapContainer, TileLayer } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../store';
import { selectSite, clearSelection } from '../store/appSlice';
import { getCostColor } from '../utils/colorUtils';
import { ICost } from '../types';

import MapEventsHandler from './MapEventsHandler';
import StopMarker from './StopMarker';

import 'leaflet/dist/leaflet.css';
import '../styles/Map.scss';

const Map = () => {
  const { sites, costs, selectedSiteId } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch<AppDispatch>();

  const handleMarkerClick = (siteId: number) => {
    dispatch(selectSite(siteId));
  };

  const handleMapClick = () => {
    dispatch(clearSelection());
  };

  const getCostInfo = (selectedId: number | null, id: number): ICost | null => {
    if (!selectedId || selectedId === id) {
      return null;
    };

    const cost = costs.find(cost => cost.from_id === selectedId && cost.to_id === id) || null;

    return cost;
  };

  const center: [number, number] = [55.7558, 37.6176];

  return (
    <div className="map-container">
       <MapContainer
        center={center}
        zoom={12}
        className="map-leaflet"
        zoomControl={true}
     >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapEventsHandler onMapClick={handleMapClick} />
        
          {sites.map((site) => {
            const isSelected = site.id === selectedSiteId;
            const costInfo = getCostInfo(selectedSiteId, site.id);
            const color = selectedSiteId && !isSelected ? getCostColor(costInfo?.cost || null) : '#3b82f6';
             
            return (
              <StopMarker
                key={site.id}
                site={site}
                isSelected={isSelected}
                color={color}
                costInfo={costInfo}
                selectedSiteId={selectedSiteId}
                onMarkerClick={handleMarkerClick}
              />
            );
          })}
      </MapContainer>
    </div>
  );
}

export default Map;
