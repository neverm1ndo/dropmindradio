;(function() {
  'use strict';
  angular.module('dropmind').controller('playerCtrl', ['$scope','$http' , playerCtrl]);
   function playerCtrl($scope, $http) {
     console.log("WORK");
     var trackDuration;
     var date = new Date();
     var deltaTime = (((date.getUTCHours() * 60) + date.getUTCMinutes()) / 1440).toFixed(2);
     console.log(deltaTime);
     $scope.tracks = [''];
     $scope.playerPlay = false;
     $scope.trackDuration = "0:00";
     $scope.trackCurrTime = "0:00";
     document.getElementById("curtime").innerHTML = '0:00';
    //  $scope.trackAutor = autor;
    //  $dcope.trackName = trackName;
     var player = document.getElementById('player');
     var volume = document.getElementById('volume');
     volume.value = 30;
     player.volume = 0.3;
     player.addEventListener('loadedmetadata', function () {
       var trackDurationMins,
         trackDurationSecs;
         trackDuration = player.duration;
         trackDurationMins = Math.floor(Math.round(trackDuration) / 60);
         trackDurationSecs = Math.round(trackDuration) % 60;
         if (trackDurationSecs < 10) {
           trackDurationSecs = '0' + trackDurationSecs;
         };
         trackDuration = trackDurationMins + ":" + trackDurationSecs;
        //  console.log("trackDuration: " + trackDuration);
         document.getElementById("duration").innerHTML = trackDuration;
     });
     volume.addEventListener('change', function() {
      //  console.log(volume.value);
       player.volume = volume.value / 100;
     });
     function trackParse() {
       $scope.trackAutor = $scope.tracks[$scope.trackId]['autor'];
       $scope.trackName = $scope.tracks[$scope.trackId]['title'];
       $scope.trackAlbum = $scope.tracks[$scope.trackId]['album'];
       $scope.trackSrc = 'tracks/' + $scope.trackAutor + ' - ' + $scope.trackName + '.mp3';
       $scope.trackLabel = 'tracks/' + $scope.trackAutor + ' - ' + $scope.trackAlbum + '.jpg';
       player.load();
     };
     $http.get('/tracks/rotation.json').then(function successCallback(response) {
        $scope.tracks = response['data']['tracks'];
        var deltaTrackId = Math.round(deltaTime * $scope.tracks.length);
        $scope.trackId = deltaTrackId;
        trackParse();
     },
      function errorCallback(response) {
        console.log("ERROR");
      });
      $scope.playForw = function() {
        if ($scope.tracks.length-1 !== $scope.trackId) {
          $scope.trackId++;
        } else {
           $scope.trackId = '0';
        };
        trackParse();
        console.log(">>");
        player.play();
        $scope.playerPlay = true;
      };
      $scope.playBack = function() {
        if ($scope.trackId == 0) {
          $scope.trackId = $scope.tracks.length-1;
        } else {
           $scope.trackId--;
        };
        trackParse();
        player.play();
        $scope.playerPlay = true;
      };
      $scope.playPause = function() {
        if ($scope.playerPlay == false) {
          $scope.playerPlay = true;
          player.play();
        } else {
          player.pause();
          $scope.playerPlay = false;
        };
      };
      player.addEventListener('timeupdate', function () {
        var trackCurr = player.currentTime;
        var trackCurrMins,
          trackCurrSecs,
          trackTimeline;
          trackTimeline = (Math.round(trackCurr) / Math.round(player.duration) * 100);
          trackCurrMins = Math.floor(Math.round(trackCurr) / 60);
          trackCurrSecs = Math.round(trackCurr) % 60;
          if (trackCurrSecs < 10) {
            trackCurrSecs = '0' + trackCurrSecs;
          };
          trackCurr = trackCurrMins + ":" + trackCurrSecs;
        document.getElementById("curtime").innerHTML = trackCurr;
        document.getElementById("timeline").style.width = trackTimeline + '%';
        if (player.ended == true) {
            document.getElementById("playForw").click();
        };
      });
      // Visuals //
function playerVisual() {
  console.log("Running Visuals");
  var audio, canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
  function initPlayer(){
    console.log("Initialize Player");
    context = new AudioContext();
    audio = document.getElementById('player');
    canvas = document.getElementById('canvas');
    analyser = context.createAnalyser();
    ctx = canvas.getContext('2d');
    // Re-route audio playback into the processing graph of the AudioContext
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
  };
  initPlayer();
  // Looping at the default frame rate that the browser provides(approx. 60 FPS)
  function frameLooper(){
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    bars = 100;
    for (var i = 0; i < bars; i++) {
      bar_x = i * 12;
      bar_width = 10;
      bar_height = -(fbc_array[i] / 1);
      ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
  }
};
playerVisual();
   };
})();
