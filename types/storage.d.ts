/**
 * The window storage object.
 */
export type WindowStorage = {
    initialized: boolean;
    monitor: string;
    x: number;
    y: number;
    width: number;
    height: number;
    maximized: boolean;
};

/**
 * The preferences object.
 */
export type PreferencesObj = {
    security: {
        screenshotProtection: boolean;
    }
    window: {
        startMaximized: boolean;
        restoreCoordinates: boolean;
    },
    sysInfo: {
        refreshInterval: number;
    };
}

/**
 * Current and default preferences.
 */
export type Preferences = {
    current: PreferencesObj;
    default: PreferencesObj;
}

/**
 * The main store object.
 * Note: We don't pass default preferences and storage to the store as they are
 * statically imported from the default TS files.
 */
export type Storage = {
    windowsStorage: { [windowName: string]: WindowStorage; };
    preferences: PreferencesObj;
}