class Queue {
  constructor(arr) {
    if (!Queue._instance) {
      this.queue = arr || [];
      this.isNeedSort = false;
      this.queueLength = this.queue.length;
      Queue._instance = this;
    }
    return Queue._instance;
  }
  add(item) {
    this.queue.push(item);
    this.isNeedSort = true;
    this.queueLength = this.getLength();
  }
  get() {
    let item = null;
    if (this.queue.length) {
      if (this.isNeedSort) {
        this.sortQueue();
        this.isNeedSort = false;
      }
      item = this.queue.shift();
    }
    this.queueLength = this.getLength();
    return item;
  }
  sortQueue() {
    this.queue.sort((a, b) => {
      const aLevel = levelMap[a.alarm.alarmLevel];
      const bLevel = levelMap[b.alarm.alarmLevel];
      if (aLevel > bLevel) {
        return -1;
      } else if (aLevel < bLevel) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  getAll() {
    return this.queue;
  }
  getLength() {
    return this.queue.length;
  }
}

const levelMap = {
  INFO: 0,
  SLIGHT: 1,
  GENERAL: 2,
  SERIOUS: 3,
  VERY_SERIOUS: 4,
};
export default function useAudioQueue() {
  return new Queue();
}
