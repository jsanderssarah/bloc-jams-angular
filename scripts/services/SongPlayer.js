(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    var currentAlbum = Fixtures.getAlbum();      
    var currentBuzzObject= null;  
          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      SongPlayer.currentSong = song;
    };
    
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };
    var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    };
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };
    SongPlayer.currentSong = null;
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
      /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
    SongPlayer.currentTime = null;
        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);      
        playSong(song); 
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
        /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;  
        if (currentSongIndex < 0) {
          stopSong(song);
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
        }
    };
         /**
         * @function previous
         * @desc set current song to song previous in index
         * @param {Object} song
         */
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;     
        if (currentBuzzObject > 5) {
          stopSong(song);
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
        }
    };
         /**
         * @function next
         * @desc set current song to next song in index
         * @param {Object} song
         */   
         
      /**
      * @function setCurrentTime
      * @desc set current time (in seconds) of current song
      * @param {Number} time
      */
    SongPlayer.setCurrentTime = function(time) {
        if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
        }          
    };
      
    return SongPlayer;
  }
 
  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
    /**
    * @desc 
    * @type {}
    */
 })();