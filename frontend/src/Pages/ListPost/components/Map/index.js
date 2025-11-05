import L from 'leaflet';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Mapa } from './style';

class Map extends React.Component {
  getIcon(kingdom) {
    let iconURL = iconMarker;

    if (kingdom === 'plantae')
      iconURL =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
    else if (kingdom === 'animalia')
      iconURL =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
    else if (kingdom === 'fungi')
      iconURL =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png';
    else if (kingdom === 'Chromista')
      iconURL =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
    else if (kingdom === 'protozoa')
      iconURL =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png';
    else if (kingdom === 'monera')
      iconURL =
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png';

    return L.icon({
      iconRetinaUrl: iconRetina,
      iconUrl: iconURL,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -41],
    });
  }

  componentDidMount() {
    try {
      // LEAFLET ----------------------------------------------------------------------
      this.map = L.map('map').locate({
        setView: true,
        maxZoom: 9,
        enableHighAccuracy: true,
      });

      L.tileLayer(
        'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
        {
          attribution:
            '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases">CyclOSM</a> | ' +
            '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(this.map);

      // ▶️ Adicionar borda do Paraná
      fetch(
        'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson'
      )
        .then(res => res.json())
        .then(data => {
          try {
            const parana = data.features.find(f => {
              const name = (
                f.properties.name ||
                f.properties.NAME_1 ||
                ''
              ).toLowerCase();
              return name === 'paraná' || name === 'parana';
            });

            if (parana) {
              const paranaLayer = L.geoJSON(parana, {
                style: {
                  color: 'var(--primary-gray)', // borda amarela
                  weight: 2,
                  opacity: 0.9,
                  fill: false, // só contorno
                },
              }).addTo(this.map);

              // centraliza o mapa no Paraná
              const bounds = paranaLayer.getBounds();
              this.map.fitBounds(bounds);
            }
          } catch (err) {
            console.warn('Erro ao processar GeoJSON do Paraná:', err);
          }
        })
        .catch(err => {
          console.warn('Erro ao carregar GeoJSON do Brasil:', err);
        });

      // caso a localização do pc esteja desativada
      this.map.once('locationerror', () => {
        try {
          this.map.setView([-24.7, -51.9], 6.5);
        } catch (err) {
          console.warn('Map not ready (locationerror):', err);
        }
      });

      // setar map center no início
      this.map.once('locationfound', () => {
        try {
          this.props.mapControls?.setMapCenter([
            this.map.getCenter().lat,
            this.map.getCenter().lng,
          ]);
          this.props.mapControls?.setSearchRadius(7);
        } catch (err) {
          console.warn('Map not ready (locationfound):', err);
        }
      });

      // ao mover o mapa de lugar
      this.map.on('dragend', () => {
        try {
          this.props.mapControls?.setMapCenter([
            this.map.getCenter().lat,
            this.map.getCenter().lng,
          ]);
        } catch (err) {
          console.warn('Map not ready (dragend):', err);
        }
      });
      // LEAFLET ----------------------------------------------------------------------
    } catch (err) {
      console.warn('Map initialization failed:', err);
    }
  }

  componentDidUpdate() {
    try {
      // update markers de cada posts (add se não existe)
      if (this.posts !== this.props.posts) {
        this.posts = this.props.posts;

        // se existe markers, remove tudo. Se não existe, cria
        if (this.markers) {
          while (this.markers?.length) {
            this.markers.pop().remove(); // remove da array e do mapa
          }
        } else {
          this.markers = [];
        }

        // adicionar markers
        this.props.posts?.forEach(post => {
          try {
            const position = post.latlng
              ? [post.latlng.coordinates[1], post.latlng.coordinates[0]]
              : [0, 0];

            this.markers.push(
              L.marker(position, { icon: this.getIcon(post.kingdom) })
                .addTo(this.map)
                .bindPopup(
                  `<h5 style='margin: 0 0 .5em 0'>
                     <a href='/posts/${post.id}'>${post.title}</a>
                   </h5>
                   <p style='margin: 0'>
                     Lat: ${position[1].toFixed(5)}<br/>
                     Lng: ${position[0].toFixed(5)}
                   </p>`
                )
            );
          } catch (err) {
            console.warn('Marker creation failed:', err);
          }
        });
      }

      // se é pra mostrar o radius
      try {
        if (this.props.mapControls?.getShowRadius()) {
          if (this.radius) this.radius.remove(); // remover círculo pré-existente se tiver
          this.radius = L.circle(this.props.mapControls?.getMapCenter(), {
            color: '#14aa6b33',
            fillColor: '#14aa6b',
            fillOpacity: 0.25,
            radius: 1000 * 2 ** this.props.mapControls?.getSearchRadius(),
          }).addTo(this.map);
        } else {
          if (this.radius) this.radius.remove();
        }
      } catch (err) {
        console.warn('Radius update failed:', err);
      }
    } catch (err) {
      console.warn('Map update failed:', err);
    }
  }

  render() {
    return <Mapa id="map" />;
  }
}

export default Map;
