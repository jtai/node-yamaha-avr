var StringFormat = require('string-format');

function YamahaCommands()
{
  this.getParam = 'GetParam';

  this.commandWrapper = '<YAMAHA_AV cmd="{command}">{payload}</YAMAHA_AV>';
  this.mainZoneWrapper = '<Main_Zone>{request_text}</Main_Zone>';

  this.basicStatus = '<Basic_Status>GetParam</Basic_Status>';
  this.systemConfig = '<System><Config>GetParam</Config></System>';

  this.powerControl = '<Power_Control><Power>{state}</Power></Power_Control>';

  this.volumeLevel = '<Volume><Lvl>{value}</Lvl></Volume>';
  this.setVolumeValue = '<Val>{val}</Val><Exp>{exp}</Exp><Unit>{unit}</Unit>';

  this.muteControl = '<Volume><Mute>{state}</Mute></Volume>';

  this.setInput = '<Input><Input_Sel>{input}</Input_Sel></Input>';
  this.setScene = '<Scene><Scene_Sel>Scene {scene}</Scene_Sel></Scene>';
  this.setSoundProgram = '<Surround><Program_Sel><Current><Sound_Program>{program}</Sound_Program></Current></Program_Sel></Surround>';
  this.setStraight = '<Surround><Program_Sel><Current><Straight>{state}</Straight></Current></Program_Sel></Surround>';

  this.playInfo = '<{input}><Play_Info>GetParam</Play_Info></{input}>';

  this.play = '<{input}><Play_Control><Playback>Play</Playback></Play_Control></{input}>';
  this.pause = '<{input}><Play_Control><Playback>Pause</Playback></Play_Control></{input}>';
  this.skipFwd = '<{input}><Play_Control><Playback>Skip Fwd</Playback></Play_Control></{input}>';
  this.skipRev = '<{input}><Play_Control><Playback>Skip Rev</Playback></Play_Control></{input}>';
}

YamahaCommands.prototype.basicStatusCommand = function(){
  var cmd = 'GET';

  var pload = this.mainZoneWrapper.format({request_text : this.basicStatus});
  return this.commandWrapper.format({command : cmd, payload : pload});
};

YamahaCommands.prototype.systemConfigCommand = function(){
  var cmd = 'GET';

  return this.commandWrapper.format({command : cmd, payload : this.systemConfig});
};

YamahaCommands.prototype.powerOnCommand = function(){
  return this.powerCommand('On');
};

YamahaCommands.prototype.powerOffCommand = function(){
  return this.powerCommand('Standby');
};

YamahaCommands.prototype.powerCommand = function(selectedState){
  var cmd = 'PUT';
  var request = this.powerControl.format({state : selectedState});

  var pload = this.mainZoneWrapper.format({request_text : request});
  return this.commandWrapper.format({command : cmd, payload : pload});
};

YamahaCommands.prototype.getVolumeCommand = function(){
  var cmd = 'GET';
  var request = this.volumeLevel.format({value : this.getParam});

  var pload = this.mainZoneWrapper.format({request_text : request});
  return this.commandWrapper.format({command : cmd, payload : pload});
};

YamahaCommands.prototype.setVolumeCommand = function(volume){
  var cmd = 'PUT';
  var volPayload = this.setVolumeValue.format({val : volume, exp : '1', unit : 'dB'});
  var request = this.volumeLevel.format({value : volPayload});

  var pload = this.mainZoneWrapper.format({request_text : request});
  return this.commandWrapper.format({command : cmd, payload : pload});
};

YamahaCommands.prototype.muteOnCommand = function(){
  return this.muteCommand('On');
};

YamahaCommands.prototype.muteOffCommand = function(){
  return this.muteCommand('Off');
};

YamahaCommands.prototype.muteCommand = function(selectedState){
  var cmd = 'PUT';
  var request = this.muteControl.format({state : selectedState});
  var pload = this.mainZoneWrapper.format({request_text : request});

  return this.commandWrapper.format({command : cmd, payload : pload});
};

YamahaCommands.prototype.setInputCommand = function(input_name){
  var cmd = 'PUT';
  var request = this.setInput.format({input : input_name});
  var pload = this.mainZoneWrapper.format({request_text : request});

  return this.commandWrapper.format({command : cmd, payload : pload});
};

YamahaCommands.prototype.setSceneCommand = function(scene_num){
  var cmd = 'PUT';
  var request = this.setScene.format({scene : scene_num});
  var pload = this.mainZoneWrapper.format({request_text : request});

  return this.commandWrapper.format({command : cmd, payload : pload});
};

YamahaCommands.prototype.setSoundProgramCommand = function(sound_program){
  var cmd = 'PUT';
  var request = this.setSoundProgram.format({program : sound_program});
  var pload = this.mainZoneWrapper.format({request_text : request});

  return this.commandWrapper.format({command : cmd, payload : pload});
};

YamahaCommands.prototype.setStraightCommand = function(selectedState){
  var cmd = 'PUT';
  var request = this.setStraight.format({state : selectedState});
  var pload = this.mainZoneWrapper.format({request_text : request});

  return this.commandWrapper.format({command : cmd, payload : pload});
};

YamahaCommands.prototype.playInfoCommand = function(input){
  var cmd = 'GET';
  var pload = this.playInfo.format({input : input});

  return this.commandWrapper.format({command : cmd, payload : pload});
}

YamahaCommands.prototype.playCommand = function(input){
  var cmd = 'PUT';
  var pload = this.play.format({input : input});

  return this.commandWrapper.format({command : cmd, payload : pload});
}

YamahaCommands.prototype.pauseCommand = function(input){
  var cmd = 'PUT';
  var pload = this.pause.format({input : input});

  return this.commandWrapper.format({command : cmd, payload : pload});
}

YamahaCommands.prototype.skipFwdCommand = function(input){
  var cmd = 'PUT';
  var pload = this.skipFwd.format({input : input});

  return this.commandWrapper.format({command : cmd, payload : pload});
}

YamahaCommands.prototype.skipRevCommand = function(input){
  var cmd = 'PUT';
  var pload = this.skipRev.format({input : input});

  return this.commandWrapper.format({command : cmd, payload : pload});
}

module.exports = YamahaCommands;
