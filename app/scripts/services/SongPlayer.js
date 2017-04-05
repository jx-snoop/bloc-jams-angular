(function() {
    function SongPlayer() {
		var SongPlayer = {};
		
		/**
		* @desc Currently playing audio file
		* @type {Object}
		*/
		var currentSong = null;
		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
     	var currentBuzzObject = null;
		
		/**
		* @function setSong
		* @desc Stops currently playing audio file and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if (currentBuzzObject) {
				currentBuzzObject.stop();
				currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
		};
		
		/**
		* @function playSong
		* @desc Plays new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};
		
		/**
		* @function SongPlayer.play
		* @desc If currently playing audio file is not the same as selected, plays new audio file. If it is, and is paused, it will play
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			if (currentSong !== song) {
            	setSong(song);
				playSong(song);				
			} else if (currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
		};
		
		/**
		* @function SongPlayer.pause
		* @desc Pauses currently playing audio file
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
		};
		
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();