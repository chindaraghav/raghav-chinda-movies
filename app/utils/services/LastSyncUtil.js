import StorageUtil from './StorageUtil';

class LasySyncedUtil extends StorageUtil {
  constructor() {
    super(LasySyncedUtil.DATA_KEY);
  }
  static DATA_KEY = 'lastSynced';

  save(user) {
    return super.saveData(JSON.stringify(user));
  }

  async get() {
    return JSON.parse(await super.getData());
  }
}

export default LasySyncedUtil;
