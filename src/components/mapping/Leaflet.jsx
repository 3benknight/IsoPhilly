import censusBlocks from "../../assets/data/census_blocks.json";
import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';

const LeafletDashboard = ({ mapId, selectedCensusBlock, setCensusBlock }) => {
  const [map, setMap]      = useState(null);
  const geoJsonLayer       = useRef(null);
  const tileLayer          = useRef(
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    })
  );

  // our dynamic style
  function style(feature) {
    return {
      fillColor: feature.id === selectedCensusBlock ? '#33425c' : '#97b8d1',
      weight: 2,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  function highlightFeature(e) {
    e.target.setStyle({ weight: 5, color: '#666', dashArray: '', fillOpacity: 0.7 });
    e.target.bringToFront();
  }

  function resetHighlight(e) {
    geoJsonLayer.current.resetStyle(e.target);
  }

  function onFeatureClick(e) {
    setCensusBlock(e.target.feature.id);
  }

  // 1) Initialize map once
  useEffect(() => {
    if (map) return;
    const m = L.map(mapId, {
      center: [39.98, -75.125],
      zoom: 11.5,
      zoomControl: false,
      minZoom: 11
    });
    tileLayer.current.addTo(m);
    setMap(m);
  }, [map, mapId]);

  // 2) (Re-)build the GeoJSON layer any time map or selectedCensusBlock changes
  useEffect(() => {
    if (!map) return;

    // remove old layer
    if (geoJsonLayer.current) {
      geoJsonLayer.current.remove();
    }

    // add new layer with fresh style/onEachFeature closures
    geoJsonLayer.current = L.geoJSON(censusBlocks, {
      style,
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: highlightFeature,
          mouseout:  resetHighlight,
          click:     onFeatureClick
        });
      }
    }).addTo(map);

  }, [map, selectedCensusBlock]);

  return <div id={mapId} style={{ width: '100%', height: '100%' }} />;
};

export default LeafletDashboard;
