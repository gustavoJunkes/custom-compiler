import type { WindowStorage } from "@sharedTypes/storage";


/**
 * The default window storage applied at first startup.
 */
const defaultWindowsStorage: { [windowName: string]: WindowStorage } = {
    main: {
        initialized: false,
        monitor: "",
        x: 0,
        y: 0,
        width: 1024,
        height: 768,
        maximized: false
    }
};

export default defaultWindowsStorage;