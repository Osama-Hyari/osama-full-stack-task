/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/session/route";
exports.ids = ["app/api/session/route"];
exports.modules = {

/***/ "(rsc)/./app/api/session/route.ts":
/*!**********************************!*\
  !*** ./app/api/session/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n\n\nasync function GET() {\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n    const token = cookieStore.get(\"expense-tracker-token\")?.value;\n    console.log(\"[/api/session] Cookie token:\", token ? token.slice(0, 30) + \"...\" : \"none\");\n    if (!token) {\n        console.log(\"[/api/session] No token found\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            authenticated: false\n        }, {\n            status: 200\n        });\n    }\n    try {\n        const payload = JSON.parse(Buffer.from(token.split(\".\")[1], \"base64\").toString());\n        console.log(\"[/api/session] Decoded payload:\", payload);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            authenticated: true,\n            email: payload.email\n        }, {\n            status: 200\n        });\n    } catch (e) {\n        console.log(\"[/api/session] JWT decode error:\", e);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            authenticated: false\n        }, {\n            status: 200\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Nlc3Npb24vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJDO0FBQ0o7QUFFaEMsZUFBZUU7SUFDcEIsTUFBTUMsY0FBYyxNQUFNRixxREFBT0E7SUFDakMsTUFBTUcsUUFBUUQsWUFBWUUsR0FBRyxDQUFDLDBCQUEwQkM7SUFDeERDLFFBQVFDLEdBQUcsQ0FBQyxnQ0FBZ0NKLFFBQVFBLE1BQU1LLEtBQUssQ0FBQyxHQUFHLE1BQU0sUUFBUTtJQUNqRixJQUFJLENBQUNMLE9BQU87UUFDVkcsUUFBUUMsR0FBRyxDQUFDO1FBQ1osT0FBT1IscURBQVlBLENBQUNVLElBQUksQ0FBQztZQUFFQyxlQUFlO1FBQU0sR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDbkU7SUFDQSxJQUFJO1FBQ0YsTUFBTUMsVUFBVUMsS0FBS0MsS0FBSyxDQUFDQyxPQUFPQyxJQUFJLENBQUNiLE1BQU1jLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFVBQVVDLFFBQVE7UUFDOUVaLFFBQVFDLEdBQUcsQ0FBQyxtQ0FBbUNLO1FBQy9DLE9BQU9iLHFEQUFZQSxDQUFDVSxJQUFJLENBQUM7WUFBRUMsZUFBZTtZQUFNUyxPQUFPUCxRQUFRTyxLQUFLO1FBQUMsR0FBRztZQUFFUixRQUFRO1FBQUk7SUFDeEYsRUFBRSxPQUFPUyxHQUFHO1FBQ1ZkLFFBQVFDLEdBQUcsQ0FBQyxvQ0FBb0NhO1FBQ2hELE9BQU9yQixxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUVDLGVBQWU7UUFBTSxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNuRTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvb3NhbWEvRG93bmxvYWRzL2Z1bGwtc3RhY2stdGFzay9xYXNoaW8tZnJvbnRlbmQtYXNzaWdubWVudC9hcHAvYXBpL3Nlc3Npb24vcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyBjb29raWVzIH0gZnJvbSBcIm5leHQvaGVhZGVyc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcbiAgY29uc3QgdG9rZW4gPSBjb29raWVTdG9yZS5nZXQoXCJleHBlbnNlLXRyYWNrZXItdG9rZW5cIik/LnZhbHVlO1xuICBjb25zb2xlLmxvZyhcIlsvYXBpL3Nlc3Npb25dIENvb2tpZSB0b2tlbjpcIiwgdG9rZW4gPyB0b2tlbi5zbGljZSgwLCAzMCkgKyBcIi4uLlwiIDogXCJub25lXCIpO1xuICBpZiAoIXRva2VuKSB7XG4gICAgY29uc29sZS5sb2coXCJbL2FwaS9zZXNzaW9uXSBObyB0b2tlbiBmb3VuZFwiKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBhdXRoZW50aWNhdGVkOiBmYWxzZSB9LCB7IHN0YXR1czogMjAwIH0pO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IEpTT04ucGFyc2UoQnVmZmVyLmZyb20odG9rZW4uc3BsaXQoXCIuXCIpWzFdLCBcImJhc2U2NFwiKS50b1N0cmluZygpKTtcbiAgICBjb25zb2xlLmxvZyhcIlsvYXBpL3Nlc3Npb25dIERlY29kZWQgcGF5bG9hZDpcIiwgcGF5bG9hZCk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgYXV0aGVudGljYXRlZDogdHJ1ZSwgZW1haWw6IHBheWxvYWQuZW1haWwgfSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKFwiWy9hcGkvc2Vzc2lvbl0gSldUIGRlY29kZSBlcnJvcjpcIiwgZSk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgYXV0aGVudGljYXRlZDogZmFsc2UgfSwgeyBzdGF0dXM6IDIwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNvb2tpZXMiLCJHRVQiLCJjb29raWVTdG9yZSIsInRva2VuIiwiZ2V0IiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwic2xpY2UiLCJqc29uIiwiYXV0aGVudGljYXRlZCIsInN0YXR1cyIsInBheWxvYWQiLCJKU09OIiwicGFyc2UiLCJCdWZmZXIiLCJmcm9tIiwic3BsaXQiLCJ0b1N0cmluZyIsImVtYWlsIiwiZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/session/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsession%2Froute&page=%2Fapi%2Fsession%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsession%2Froute.ts&appDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsession%2Froute&page=%2Fapi%2Fsession%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsession%2Froute.ts&appDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_osama_Downloads_full_stack_task_qashio_frontend_assignment_app_api_session_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/session/route.ts */ \"(rsc)/./app/api/session/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/session/route\",\n        pathname: \"/api/session\",\n        filename: \"route\",\n        bundlePath: \"app/api/session/route\"\n    },\n    resolvedPagePath: \"/Users/osama/Downloads/full-stack-task/qashio-frontend-assignment/app/api/session/route.ts\",\n    nextConfigOutput,\n    userland: _Users_osama_Downloads_full_stack_task_qashio_frontend_assignment_app_api_session_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzZXNzaW9uJTJGcm91dGUmcGFnZT0lMkZhcGklMkZzZXNzaW9uJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGc2Vzc2lvbiUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm9zYW1hJTJGRG93bmxvYWRzJTJGZnVsbC1zdGFjay10YXNrJTJGcWFzaGlvLWZyb250ZW5kLWFzc2lnbm1lbnQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGb3NhbWElMkZEb3dubG9hZHMlMkZmdWxsLXN0YWNrLXRhc2slMkZxYXNoaW8tZnJvbnRlbmQtYXNzaWdubWVudCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDMEM7QUFDdkg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9vc2FtYS9Eb3dubG9hZHMvZnVsbC1zdGFjay10YXNrL3Fhc2hpby1mcm9udGVuZC1hc3NpZ25tZW50L2FwcC9hcGkvc2Vzc2lvbi9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc2Vzc2lvbi9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3Nlc3Npb25cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Nlc3Npb24vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvb3NhbWEvRG93bmxvYWRzL2Z1bGwtc3RhY2stdGFzay9xYXNoaW8tZnJvbnRlbmQtYXNzaWdubWVudC9hcHAvYXBpL3Nlc3Npb24vcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsession%2Froute&page=%2Fapi%2Fsession%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsession%2Froute.ts&appDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsession%2Froute&page=%2Fapi%2Fsession%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsession%2Froute.ts&appDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();