import { CircularProgress } from '@mui/material';
import L from 'leaflet';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { LoadingContainer, Mapa } from './style';

const icon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    // LEAFLET ----------------------------------------------------------------------
    // Verifica se já existe uma localização definida
    const initialLatlng = this.props.latlngControls.getLatlng();

    if (initialLatlng) {
      // Se existe localização definida, foca nela
      this.map = L.map('map').setView(
        [
          parseFloat(initialLatlng.lat) || 0,
          parseFloat(initialLatlng.lng) || 0,
        ],
        15
      );
    } else {
      // Se não existe localização definida, tenta pegar a localização do usuário
      this.map = L.map('map')
        .locate({ setView: true, maxZoom: 9, enableHighAccuracy: true })
        .setView([-24.9, -50.5], 6.5);
    }

    const tileLayer = L.tileLayer(
      'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      {
        attribution:
          '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases">CyclOSM</a> | <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(this.map);

    // Se existe localização definida, adiciona o marcador
    if (initialLatlng) {
      const pos = [
        parseFloat(initialLatlng.lat) || 0,
        parseFloat(initialLatlng.lng) || 0,
      ];
      this.marker = L.marker(pos, { icon: icon, draggable: true }).addTo(
        this.map
      );

      this.marker.on('dragend', e => {
        this.props.latlngControls.changeLatlng(e.target._latlng);
      });
    }

    this.map.on('click', e => {
      if (!this.marker) {
        this.marker = L.marker(e.latlng, { icon: icon, draggable: true }).addTo(
          this.map
        );

        this.marker.on('dragend', e => {
          this.props.latlngControls.changeLatlng(e.target._latlng);
        });
      } else {
        this.marker.setLatLng(e.latlng);
      }
      this.props.latlngControls.changeLatlng({
        lat: e.latlng.lat.toFixed(6),
        lng: e.latlng.lng.toFixed(6),
      });
    });

    // Quando o mapa estiver pronto, atualiza o estado
    tileLayer.on('load', () => {
      this.setState({ isLoading: false });
    });
    // LEAFLET ----------------------------------------------------------------------
  }

  componentDidUpdate() {
    if (this.props.latlngControls.getLatlng()) {
      const pos = [
        parseFloat(this.props.latlngControls.getLatlng().lat) || 0,
        parseFloat(this.props.latlngControls.getLatlng().lng) || 0,
      ];
      if (!this.marker) {
        this.marker = L.marker(pos, { icon: icon, draggable: true }).addTo(
          this.map
        );

        this.marker.on('dragend', e => {
          this.props.latlngControls.changeLatlng(e.target._latlng);
        });
      } else {
        this.marker.setLatLng(pos);
      }
    }
  }

  render() {
    return (
      <div
        style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}
      >
        <Mapa id="map" />
        {this.state.isLoading && (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        )}
      </div>
    );
  }
}

export default Map;
