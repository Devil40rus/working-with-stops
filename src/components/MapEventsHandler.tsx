import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface IMapEventsHandlerProps {
  onMapClick: () => void;
}

const MapEventsHandler = (props: IMapEventsHandlerProps) => {
  const { onMapClick } = props;

  const map = useMap();
  
  useEffect(() => {
    const handleClick = () => {
      onMapClick();
    };
    
    map.on('click', handleClick);
    
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onMapClick]);
  
  return null;
}

export default MapEventsHandler;
