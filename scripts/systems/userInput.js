ECS.systems.userInput = function userInput ( entities ) {
	var curEntity = entities[user_input]; // Get option

	var log = {};
	log.type = curEntity.components.option.type;

	if(curEntity.components.attack){
		attack = curEntity.components.attack;
		if(Math.random()<(attack.accuracy/100)){
			log.successful = true;
			damage = (Math.min(roll(attack.min_damage,attack.max_damage),adversary.components.health.value)); // Roll damage and make sure you can't overkill the enemy
			adversary.components.health.value -= damage;
			log.data = {'target':adversary.id,'damage':damage};
		}
		else{
			log.successful = false;
			log.data = {'target':adversary.id};
		}
	}
	else if(curEntity.components.suicide){
		log.successful = true;
		player.components.health.value = 0;
	}
	// Add log
	entity = new ECS.Entity();
	entity.addComponent(new ECS.Components.Appearance());
	entity.addComponent(new ECS.Components.Log(log));
	ECS.entities[entity.id] = entity;
	game_over = !(player.components.health.value > 0 && adversary.components.health.value > 0); // Update game_over status
	if(adversary.components.health.value < 1){ // Add a winning entry to the log
		entity = new ECS.Entity();
		entity.addComponent(new ECS.Components.Appearance());
		entity.addComponent(new ECS.Components.Log({type:'win'}));
		ECS.entities[entity.id] = entity;
	}
};