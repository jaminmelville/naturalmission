import $ from 'jquery'

let GoogleMapsLoader = require('google-maps')

GoogleMapsLoader.KEY = 'AIzaSyDId3kWjcDVdlFOzosFkm78XaFAH8PWiYQ'

if ($('.js-map')[0]) {
    GoogleMapsLoader.load((google) => {
        var mapProperties = {
            zoom: 15,
            styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#b77d79"
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#c9b2a6"
                }]
            }, {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#dcd2be"
                }]
            }, {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ae9e90"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#93817c"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#a5b076"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#447530"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fdfcf8"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f8c967"
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#e9bc62"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e98d58"
                }]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#db8555"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#806b63"
                }]
            }, {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            }, {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8f7d77"
                }]
            }, {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            }, {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#b9d3c2"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#92998d"
                }]
            }],
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            scrollwheel: false
        }
        var map = new google.maps.Map($('.js-map')[0], mapProperties)

        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + window.address, (data) => {
            let position = new google.maps.LatLng(
                data.results[0].geometry.location.lat,
                data.results[0].geometry.location.lng
            );

            map.setCenter(position);

            new google.maps.Marker({
                position: position,
                map: map,
                icon: '/themes/custom/naturalmission/images/pin.png'
            });

            $('.js-map-link').attr('href', 'https://www.google.com.au/maps/@' + data.results[0].geometry.location.lat + ',' + data.results[0].geometry.location.lng + ',17.86z')
        })

    })
}
