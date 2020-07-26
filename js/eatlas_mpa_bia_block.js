// Allow selection of multiple layers.
// Show hide layer on click (toggle).
// Check element class to know if it's loaded.
(function ($) {
	$(document).ready(
		function() {
			var mapId = $('.eatlas-map-client-map').attr('id');
			mapClient = window.eatlasMapClient.instances[mapId];

			$('.specie_card_block .clickable').click(function() {
				target = $(this);
				var isSelected = target.hasClass('selected');

				var mapAPI = mapClient.getOverlayLayersAPI();
				var layerId = target.attr('layer');
				if (isSelected) {
					target.removeClass('selected');
					if (layerId) {
						mapAPI.removeActiveLayer(layerId);
						mapAPI.removeAvailableLayer(layerId);
					}
				} else {
					target.addClass('selected');
					if (layerId) {
						// Find the marine park boundary layer index (assume it's always the top one)
						var boundaryLayerIndex = 0;
						var layerList = mapAPI.getAvailableLayers();
						if (layerList && layerList.length > 0) {
							boundaryLayerIndex = layerList.length-1;
						}
						// Insert the layer on top, just bellow the marine park boundary layer
						mapAPI.insertAvailableLayer(layerId, boundaryLayerIndex)
              .then(function() {
                mapAPI.addActiveLayer(layerId);
              });
					}
				}
			});
		}
	);
}(jQuery));
