// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  Token:'e090c25187ee2b3f9f1f8a02747356641',
  LoginUrl: 'https://rnfi.co.in/latest-backup/api/app/task/login/login',
  OTPUrl: 'https://rnfi.co.in/latest-backup/api/app/task/login/verifyOtp',
  GetDataUrl:'https://paysprint.in/service-api/testangular/api/TestAngular/getDynamicform',
  UpdateUrl:'https://paysprint.in/service-api/testangular/api/TestAngular/createDynamicform',
	TempStorage: 'LoginReminder',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
