import L from 'leaflet';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet/dist/leaflet.css";
import React from 'react';
import { Mapa } from './style';
  
class Map extends React.Component {
    getIcon(kingdom){
        let iconURL = iconMarker;
          
        if(kingdom === 'Plantae') iconURL = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
        else if(kingdom === 'Animalia') iconURL = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
        else if(kingdom === 'Fungi') iconURL = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png'
        else if(kingdom === 'Chromista') iconURL = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'
        else if(kingdom === 'Protozoa') iconURL = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png'
        else if(kingdom === 'Bacteria') iconURL = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png'
        
        return L.icon({ 
            iconRetinaUrl:iconRetina, 
            iconUrl: iconURL, 
            shadowUrl: iconShadow,
            iconSize: [25,41],
            iconAnchor: [12,41],
            popupAnchor: [0, -41]
        });
    }

    componentDidMount(){
        // LEAFLET ----------------------------------------------------------------------
        const position = this.props.post.latlng ? [this.props.post.latlng.coordinates[1], this.props.post.latlng.coordinates[0]] : [-15,-48];                    
        
        var map = L.map('map').setView(position, 13);
          
        L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
            attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases">CyclOSM</a> | <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker(position, {icon: this.getIcon(this.props.post.kingdom)})
            .addTo(map)
            .bindPopup(`<h5 style='margin: 0 0 .5em 0'>${this.props.post.title}</h5>
                        <p style='margin: 0'>Lat: ${position[0].toFixed(5)}<br/>
                        Lng: ${position[1].toFixed(5)}</p>`)
            .openPopup();
        
        map.on('click', () => {        
            map.setView(position, 13);      
        });
        // LEAFLET ----------------------------------------------------------------------
    }

    render(){
        return(
            <Mapa id='map'/>
        );
    }
}
  
  export default Map;