/* eslint-disable */
class AudioPlayer {
  constructor(element) {
    const thisAudio = this;

    thisAudio.initPlugin(element);
  }
  initPlugin(element) {
    var audioPlayer = GreenAudioPlayer.init({
      selector: element,
      stopOtherOnPlay: true,
    });
  }
}

export default AudioPlayer;
