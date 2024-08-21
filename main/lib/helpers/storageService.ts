import Store from "electron-store";

import defaultPreferences from "@main/lib/defaults/preferences.default";
import defaultWindowsStorage from "@main/lib/defaults/windowStorage.default";
import type { Storage } from "@sharedTypes/storage";


/**
 * The storage manager class.
 */
export default class StorageService {
    private store: Store<Storage>;

    constructor() {
        this.store = new Store<Storage>({
            name: "storage",
            defaults: {
                windowsStorage: defaultWindowsStorage,
                preferences: defaultPreferences
            }
        });
    }

    /**
     * Get a value from the storage.
     * @param key The key of the value to get (supports dot notation).
     * @returns The value.
     */
    public get(key: keyof Storage | string): Storage[keyof Storage] | undefined {
        return this.store.get(key, undefined);
    }

    /**
     * Set a value in the storage.
     * @param key The key of the value to set (supports dot notation).
     * @param value The value to set.
     */
    public set(key: keyof Storage | string, value: Storage[keyof Storage]): void {
        this.store.set(key, value);
    }
}