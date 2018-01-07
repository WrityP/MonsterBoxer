// Setup
var display = $('<div>').attr('id','display');
var characters_display = $('<div>').attr('id','characters_display');
var options_display = $('<div>').attr('id','options_display');
var logs_display = $('<div>').attr('id','logs_display');

display.append(characters_display).append(options_display).append(logs_display);

$(document).ready(function(){
	$('body').append(display);
});

var getHealthColor = function(health){
	return 'hsl('+Math.ceil(health*1.2)+',100%,75%)';
}

ECS.systems.render = function systemRender ( entities ) {
	var curEntity;

	for( var entityId in entities ){
		curEntity = entities[entityId];
		if(curEntity.components.appearance){
			curElement = curEntity.components.appearance.element;
			if(curEntity.components.health){
				if(curElement.is(':empty')){ // Check if the element needs to be set up
					// Set basic html for a character
					curElement.html('The <span class="noun">noun</span> has <span class="health">0</span> HP, <span class="action">action</span>.');

					// Update name
					curElement.find('.noun').text(curEntity.components.appearance.noun);

					// Underline player
					if(curEntity.components.playerControlled){
						curElement.find('.noun').css({'text-decoration':'underline','text-decoration-color':'gold'});
					}

					// Differentiate spectators
					if(curEntity.components.spectate){
						curElement.find('.action').text('but he is just watching');
					}
					else{
						curElement.find('.action').text('and he is fighting');
						curElement.css('margin','1% 0');
					}
					characters_display.append(curElement);
				}

				// Update health display
				curElement.find('.health').text(curEntity.components.health.value).css('color',getHealthColor(curEntity.components.health.value));
				if(curEntity.components.health.value < 1){
					curElement.addClass('dead');
					curElement.find('.action').text('he seems quite dead');
				}

			}
			else if(curEntity.components.option){
				if(!curElement.val()){
					curElement.val(curEntity.components.appearance.noun);
					curElement.data('id',curEntity.id);
					options_display.append(curElement);
				}
				if(game_over){ // Hide options if game is over
					options_display.empty();
				}
			}
			if(curEntity.components.log){
				if(curElement.is(':empty')){
					log = curEntity.components.log;
					if(log.type == 'attack'){
						if(log.successful){
							curElement.html("The hero inflicted "+log.data.damage+" damage to the "+entities[log.data.target].components.appearance.noun+".");
						}
						else{
							curElement.html("The hero missed the "+entities[log.data.target].components.appearance.noun+".");
						}
					}
					if(log.type == 'suicide'){
						curElement.html("The hero suicided.");
						curElement.css('color','red');
					}
					if(log.type == 'win'){
						curElement.html("The hero won!");
						curElement.css('color','gold');
					}
					logs_display.append(curElement);
				}
			}
		}
	}

	logs_display.scrollTop(logs_display.height());

};
