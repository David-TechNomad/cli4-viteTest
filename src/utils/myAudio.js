class MyAudio extends Audio {
  constructor(url) {
    super(url);
    if (!MyAudio._instance) {
      this.isPlaying = false;
      this.src = url || "";
      this.autoplay = true;
      this.muted = false;
      MyAudio._instance = this;
    }
    return MyAudio._instance;
  }
  setSrc(url) {
    this.src = url;
    // MyAudio._instance.src = url;
  }
  setMuted(isMuted) {
    this.muted = isMuted;
  }
  addListener(eventName, callback) {
    MyAudio._instance.addEventListener(eventName, callback);
  }
  removeListener(eventName, callback) {
    MyAudio._instance.removeEventListener(eventName, callback);
  }
}

export default function getMyAudio(url) {
  return new MyAudio(url);
}
