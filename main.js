var Yamaha = require('./yamaha');

var ip = process.argv[2];
var cmd = process.argv[3];
var params = process.argv[4];

if (ip.length == 1){
  ip = null;
  cmd = process.argv[2];
  params = process.argv[3];
}

var yamaha = new Yamaha(ip);

yamaha.discover()
  .then(function(ip){
    console.log("Connecting to: " + ip);
    return yamaha.isOnline();
  })
  .then(function(isOnline){
    if (isOnline === false){
      console.log("Device returned unknown response");
    }
    else{
      switch(cmd)
      {
        case 's':
          GetState();
          break;
        case 'c':
          GetSystemConfig();
          break;
        case 'm':
          console.log("Mute to: " + params);
          yamaha.setMute(params);
          break;
        case 'p':
          console.log("Power to: " + params);
          yamaha.setPower(params);
          break;
        case 'v':
          console.log("Volume to: " + params);
          yamaha.setVolume(parseInt(params));
          break;
        case 'i':
          console.log("Set intput to: " + params);
          yamaha.setInput(params);
          break;
        case 'e':
          console.log("Set scene to: " + params);
          yamaha.setScene(params);
          break;
        case 'n':
          GetPlayInfo();
          break;
        case 'l':
          console.log("Play");
          yamaha.getInput().then(function(input){
            return yamaha.play(input);
          });
          break;
        case 'u':
          console.log("Pause");
          yamaha.getInput().then(function(input){
            return yamaha.pause(input);
          });
          break;
        case 'f':
          console.log("Skipping forward");
          yamaha.getInput().then(function(input){
            return yamaha.skipFwd(input);
          });
          break;
        case 'r':
          console.log("Skipping reverse");
          yamaha.getInput().then(function(input){
            return yamaha.skipRev(input);
          });
          break;
        default:
          console.log("Unknown command");
          break;
      }
    }
  })
  .catch(function(error){
    console.log("Amplifier not online");
  });

function GetState(){
  yamaha.isOn()
    .then(function(result){
      console.log("Power on:", result);
      return yamaha.getVolume();
    })
    .then(function(result){
      console.log("Volume:", result);
      return yamaha.getInput();
    })
    .then(function(result){
      console.log("Input:", result);
      return yamaha.getStatus();
    })
    .then(function(result){
      console.log("Status: %j", result);
    });
}

function GetSystemConfig(){
  yamaha.getSystemConfig().then(function(result){
    console.log("System: %j", result);
  });
}

function GetPlayInfo(){
  var input;
  yamaha.getInput()
    .then(function(result){
      input = result;
      return yamaha.getPlayInfo(input);
    })
    .then(function(result){
      var meta = result.YAMAHA_AV[input][0].Play_Info[0].Meta_Info[0];
      console.log("Artist:", meta.Artist[0]);
      console.log("Album:", meta.Album[0]);
      if (meta.Song !== undefined) {
        console.log("Song:", meta.Song[0]);
      } else if (meta.Track !== undefined) {
        console.log("Track:", meta.Track[0]);
      }
    });
}
