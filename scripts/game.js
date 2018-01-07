var options = [
    {type:'attack',noun:'punch',accuracy:75,min_damage:3,max_damage:10},
    {type:'attack',noun:'kick',accuracy:50,min_damage:5,max_damage:20},
    {type:'suicide',noun:'fall on your sword'},
    {type:'suicide',noun:'jump in the well'}
];

var option_catalogue = [];
var game_over = false;
var user_input;



ECS.Game = function Game (){
	var entities = {}; // object containing { id: entity  }
	var entity;

	// Setup options
	options.forEach(function(option){
		entity = new ECS.Assemblages.Option(option);
		entities[entity.id] = entity;
	});

	// Create the player character
	entity = new ECS.Entity();
	entity.addComponent(new ECS.Components.Health({health:100}) );
	entity.addComponent(new ECS.Components.Appearance({noun:'hero'}) );
	entity.addComponent(new ECS.Components.PlayerControlled() );
	entities[entity.id] = entity;
	player = entities[entity.id];

	// Create your adversary
	entity = new ECS.Assemblages.Monster();
	entities[entity.id] = entity;
	adversary = entities[entity.id];

	// Create 2 to 5 monster spectators
	for(i = 0; i < roll(2,5); i++){
		entity = new ECS.Assemblages.Monster();
		entity.addComponent(new ECS.Components.Spectate() );
		entities[entity.id] = entity;
	}

	ECS.entities = entities;

	// Display initial state
	ECS.systems.render(ECS.entities);

	// On user input
	$(document).on('click','#options_display input',function(){
		user_input = $(this).data('id');
		ECS.systems.userInput(ECS.entities);
		ECS.systems.render(ECS.entities);
	});

	return this;
}

$(document).ready(function(){
	// Kick off the game
	ECS.game = new ECS.Game();
});