/**
 * The environment object for the app.
 */
export type Environment = {
    env: "production" | "development";
    appName: string;
    appStage: "pre-alpha" | "alpha" | "beta" | "rc" | "stable";
    appVersion: string;
    appIcon: string;
    appPath: string;
};

/**
 * System information returned by the `/api/sys-info` route.
 */
export type SysInfo = {
    cpu: {
        percentage: string;
        str: string;
    },
    memory: {
        available: string;
        used: string;
        total: string;
        percentage: string;
        str: string;
    };
};