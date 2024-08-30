import type { PreferencesObj } from "@sharedTypes/storage";


/**
 * The default preferences applied at first startup.
 */
const defaultPreferences: PreferencesObj = {
    security: {
        screenshotProtection: false
    },
    window: {
        startMaximized: false,
        restoreCoordinates: true
    },
    sysInfo: {
        refreshInterval: 1500
    }
};

export default defaultPreferences;