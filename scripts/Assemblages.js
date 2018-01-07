var monsters = [
	{noun:'ork',min_health:70,max_health:100},
	{noun:'kobold',min_health:20,max_health:50},
	{noun:'ogre',min_health:100,max_health:200},
	{noun:'gnoll',health:50}, // Can specify exact health
	{} // If it doesn't have a name, it'll be a goblin, if health isn't specified, it'll be 10
];

ECS.Assemblages = {

	Monster:function Monster(){
		var entity = new ECS.Entity();
		var monster = randomItem(monsters);
		monster.noun = monster.noun || 'goblin'; // A monster with no name is a goblin
		entity.addComponent(new ECS.Components.Health(monster) );
		entity.addComponent(new ECS.Components.Appearance(monster) );
		
		return entity;
	},

	Option:function Option(parameters){
		var entity = new ECS.Entity();
		parameters.element_type = '<input type="button" />';
		if(parameters.type == 'attack'){
			entity.addComponent(new ECS.Components.Attack(parameters) );
		}
		else if(parameters.type == 'suicide'){
			entity.addComponent(new ECS.Components.Suicide() );
		}
		parameters.noun = parameters.noun || parameters.type;
		entity.addComponent(new ECS.Components.Option(parameters) );
		entity.addComponent(new ECS.Components.Appearance(parameters) );
		return entity;
	}
};
