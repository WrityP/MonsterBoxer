// Health
// --------------------------------------
ECS.Components.Health = function ComponentHealth ( params = {} ){
	this.value = params.health*1 || roll(params.min_health,params.max_health) || 10; // Health can be an integer or a roll, otherwise it's 10 to punish your lack of data

	return this;
};
ECS.Components.Health.prototype.name = 'health';


// Appearance
// --------------------------------------
ECS.Components.Appearance = function ComponentAppearance ( params = {} ){
	this.noun = params.noun || 'nothing'; // If it has no name, it's nothing
	this.element_type = params.element_type || '<div>';
	this.element = $(this.element_type);

	return this;
};
ECS.Components.Appearance.prototype.name = 'appearance';


// playerControlled 
// --------------------------------------
ECS.Components.PlayerControlled = function ComponentPlayerControlled ( params ){
	this.pc = true;
	return this;
};
ECS.Components.PlayerControlled.prototype.name = 'playerControlled';



// option
// --------------------------------------
ECS.Components.Option = function ComponentOption ( params = {} ){
	this.type = params.type;
	return this;
};
ECS.Components.Option.prototype.name = 'option';

// log
// --------------------------------------
ECS.Components.Log = function ComponentLog ( params = {} ){
	this.type = params.type;
	this.successful = params.successful || false;
	this.data = params.data || {};
	return this;
};
ECS.Components.Log.prototype.name = 'log';

// Attack
// --------------------------------------
ECS.Components.Attack = function ComponentAttack ( params = {} ){
	this.accuracy = params.accuracy || 50;
	this.min_damage = params.min_damage || 0;
	this.max_damage = params.max_damage || this.min_damage+1;
	return this;
};
ECS.Components.Attack.prototype.name = 'attack';

// Suicide
// --------------------------------------
ECS.Components.Suicide = function ComponentSuicide ( params = {} ){
	this.suicide = true;
	return this;
};
ECS.Components.Suicide.prototype.name = 'suicide';

// spectate
// --------------------------------------
ECS.Components.Spectate = function ComponentSpectate ( params = {} ){
	
	return this;
};
ECS.Components.Spectate.prototype.name = 'spectate';
