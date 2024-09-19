import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ok.todo',
  appName: 'Ok! Todo',
  webDir: 'dist',
  "plugins": {
    // "SplashScreen": {
    //   "launchShowDuration": 2000,
    //   "launchAutoHide": true,
    //   "launchFadeOutDuration": 1000,
    //   "backgroundColor": "#FFFFF",
    //   "androidSplashResourceName": "splash",
    //   "androidScaleType": "CENTER_CROP",
    //   "showSpinner": true,
    //   "androidSpinnerStyle": "large",
    //   "iosSpinnerStyle": "small",
    //   "spinnerColor": "#383838",
    //   "splashFullScreen": true,
    //   "splashImmersive": true,
    //   "layoutName": "launch_screen",
    //   "useDialog": true
    // },
    "LocalNotifications": {
      "icon": "notif_icon",
      "smallIcon": "notif_icon",
      "largeIcon": "ic_launcher",
      "iconColor": "#39AFEA",
    }
  }
};

export default config;
