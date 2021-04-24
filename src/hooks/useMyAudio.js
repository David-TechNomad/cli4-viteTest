class MyAudio extends Audio {
  constructor(url) {
    super(url);
    if (!MyAudio._instance) {
      this.isPlaying = false;
      this.src = url || null;
      this.autoplay = true;
      this.muted = false;
      MyAudio._instance = this;
    }
    return MyAudio._instance;
  }
  setMuted(value) {
    this.muted = value;
  }
  setSrc(url) {
    this.src = url;
    // MyAudio._instance.src = url;
  }
  addListener(eventName, callback) {
    MyAudio._instance.addEventListener(eventName, callback);
  }
  removeListener(eventName, callback) {
    MyAudio._instance.removeEventListener(eventName, callback);
  }
}

export default function useMyAudio(url) {
  return new MyAudio(url);
}
