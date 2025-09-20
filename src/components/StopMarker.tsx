import { CircleMarker, Popup } from "react-leaflet";
import { useRef, useEffect } from "react";
import { LeafletMouseEvent, CircleMarker as LeafletCircleMarker } from "leaflet";

import { formatCostInfo } from "../utils/colorUtils";
import { ICost, ISite } from "../types";

interface IStopMarkerProps {
  site: ISite;
  isSelected: boolean;
  color: string;
  costInfo: ICost | null;
  selectedSiteId: number | null;
  onMarkerClick: (siteId: number) => void;
}

const StopMarker = (props: IStopMarkerProps) => {
  const { site, isSelected, color, costInfo, selectedSiteId, onMarkerClick } = props;
  
  const markerRef = useRef<LeafletCircleMarker>(null);
  
  const handleClick = (e: LeafletMouseEvent) => {
    e.originalEvent?.stopPropagation();

    onMarkerClick(site.id);
  };

  useEffect(() => {
    if (markerRef.current) {
      const marker = markerRef.current;
      marker.setStyle({
        fillColor: color,
        color: isSelected ? '#ffffff' : color,
        weight: isSelected ? 3 : 2,
        radius: isSelected ? 10 : 8
      });
    }
  }, [color, isSelected]);

  return (
    <CircleMarker
      ref={markerRef}
      center={[site.lat, site.lng]}
      radius={isSelected ? 10 : 8}
      fillColor={color}
      color={isSelected ? '#ffffff' : color}
      weight={isSelected ? 3 : 2}
      opacity={1}
      fillOpacity={0.8}
      eventHandlers={{
        click: handleClick
      }}
    >
      <Popup>
        <div>
          <strong>{site.name}</strong><br />
          ID: {site.id}<br />
          {isSelected && (
            <div className="popup-parameters">
              <strong>Начальная точка маршрута</strong><br />
              <small>Другие остановки окрасились по затратам на перемещение.<br/>
              Кликните на цветные остановки для подробностей.</small>
            </div>
          )}
          {costInfo && !isSelected && (
            <div className="popup-parameters">
              <strong>Параметры перемещения:</strong><br />
              <pre className="popup-parameters-code">
                {formatCostInfo({
                  cost: costInfo.cost,
                  iwait: costInfo.iwait,
                  inveht: costInfo.inveht,
                  xnum: costInfo.xnum,
                  xpen: costInfo.xpen
                })}
              </pre>
            </div>
          )}
          {!selectedSiteId && !isSelected && (
            <div className="popup-parameters">
              <small>Кликните на эту остановку, чтобы выбрать её как начальную точку</small>
            </div>
          )}
        </div>
      </Popup>
    </CircleMarker>
  );
}

export default StopMarker;
