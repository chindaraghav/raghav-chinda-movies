import AsyncStorage from '@react-native-community/async-storage';

class StorageUtil {
    constructor(dataKey) {
        this.key = dataKey;
    }

    async saveData(value) {
        return await AsyncStorage.setItem(this.key, value);
    }

    async getData() {
        try {
            const value = await AsyncStorage.getItem(this.key);
            return value;
        } catch (e) {
            return null;
        }
    }

    async deleteData() {
        try {
            const result = await AsyncStorage.removeItem(this.key);
            return result;
        } catch (e) {
            return null;
        }
    }

    async clear() {
        return await AsyncStorage.clear();
    }
}

export default StorageUtil;
