import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'controle-lotes-ionic',
  webDir: 'www',
  server: {
    cleartext: true,
    hostname: '192.168.0.2', 
    androidScheme: 'http'
  }
};


export default config;
