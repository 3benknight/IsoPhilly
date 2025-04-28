import React from 'react';
import { connect } from "react-redux";
import { setCensusRegion } from "./Store";
import { Container, Row } from "react-bootstrap";
import './css/Dashboard.css';
import LeafletDashboard from './mapping/Leaflet';
import "leaflet/dist/leaflet.css";

function Dashboard({selectedRegion, setCensusRegion}) {
  return (
    <div className="dashboard-background">
      <Container fluid>
        <Row title="Change selected parameter" className="dashboard-selection">
          <div className="dashboard-selection-text">
            CURRENTLY SELECTED REGION: {selectedRegion === "none" ? 
            "No Census Block Selected. Click a region on the map to select one." : selectedRegion}
          </div>
        </Row>
        <Row className="dashboard-map-wrapper">
          <LeafletDashboard
            mapId={"map"}
            selectedCensusBlock={selectedRegion}
            setCensusBlock={setCensusRegion}
          />
        </Row>
      </Container>
    </div>
  );
}

/**
 * Maps the state from the Redux store to the component props.
 * 
 * @param {object} state - The current state.
 * @returns {object} The mapped props.
 */
function mapStateToProps(state) {
  return {
    selectedRegion: state.censusRegion
  };
}

/**
 * Maps the dispatch functions to the component props.
 * 
 * @param {Function} dispatch - The dispatch function.
 * @returns {object} The mapped props.
 */
function mapDispatchToProps(dispatch) {
  return {
    setCensusRegion: (region) => dispatch(setCensusRegion(region))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
