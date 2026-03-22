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
exports.id = "app/api/transactions/summary/report/route";
exports.ids = ["app/api/transactions/summary/report/route"];
exports.modules = {

/***/ "(rsc)/./app/api/transactions/summary/report/route.ts":
/*!******************************************************!*\
  !*** ./app/api/transactions/summary/report/route.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var _lib_backend_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/backend-api */ \"(rsc)/./lib/backend-api.ts\");\n\nasync function GET(request) {\n    return (0,_lib_backend_api__WEBPACK_IMPORTED_MODULE_0__.proxyToBackend)(request, '/transactions/summary/report');\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3RyYW5zYWN0aW9ucy9zdW1tYXJ5L3JlcG9ydC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUNtRDtBQUU1QyxlQUFlQyxJQUFJQyxPQUFvQjtJQUM1QyxPQUFPRixnRUFBY0EsQ0FBQ0UsU0FBUztBQUNqQyIsInNvdXJjZXMiOlsiL1VzZXJzL29zYW1hL0Rvd25sb2Fkcy9mdWxsLXN0YWNrLXRhc2svcWFzaGlvLWZyb250ZW5kLWFzc2lnbm1lbnQvYXBwL2FwaS90cmFuc2FjdGlvbnMvc3VtbWFyeS9yZXBvcnQvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBwcm94eVRvQmFja2VuZCB9IGZyb20gJ0AvbGliL2JhY2tlbmQtYXBpJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICByZXR1cm4gcHJveHlUb0JhY2tlbmQocmVxdWVzdCwgJy90cmFuc2FjdGlvbnMvc3VtbWFyeS9yZXBvcnQnKTtcbn1cbiJdLCJuYW1lcyI6WyJwcm94eVRvQmFja2VuZCIsIkdFVCIsInJlcXVlc3QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/transactions/summary/report/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/backend-api.ts":
/*!****************************!*\
  !*** ./lib/backend-api.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   proxyToBackend: () => (/* binding */ proxyToBackend)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\nconst backendBaseUrl = process.env.BACKEND_API_URL || 'http://localhost:3000';\nfunction buildBackendUrl(pathname, searchParams) {\n    const trimmedBase = backendBaseUrl.replace(/\\/$/, '');\n    const trimmedPath = pathname.replace(/^\\//, '');\n    const url = new URL(`${trimmedBase}/${trimmedPath}`);\n    if (searchParams) {\n        searchParams.forEach((value, key)=>{\n            if (value !== '') {\n                url.searchParams.set(key, value);\n            }\n        });\n    }\n    return url;\n}\nasync function parseBody(request) {\n    const contentType = request.headers.get('content-type') || '';\n    if (!contentType.includes('application/json')) {\n        return undefined;\n    }\n    try {\n        const text = await request.text();\n        if (!text.trim()) {\n            return undefined;\n        }\n        return JSON.parse(text);\n    } catch  {\n        return undefined;\n    }\n}\nasync function proxyToBackend(request, pathname, init) {\n    const backendUrl = buildBackendUrl(pathname, request.nextUrl.searchParams);\n    const body = init?.body ?? await parseBody(request);\n    const response = await fetch(backendUrl, {\n        method: init?.method || request.method,\n        headers: {\n            Accept: 'application/json',\n            ...body ? {\n                'Content-Type': 'application/json'\n            } : {},\n            ...init?.headers\n        },\n        body: typeof body === 'undefined' ? undefined : JSON.stringify(body),\n        cache: 'no-store'\n    });\n    const text = await response.text();\n    return new next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse(text, {\n        status: response.status,\n        headers: {\n            'Content-Type': response.headers.get('content-type') || 'application/json'\n        }\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYmFja2VuZC1hcGkudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBd0Q7QUFFeEQsTUFBTUMsaUJBQWlCQyxRQUFRQyxHQUFHLENBQUNDLGVBQWUsSUFBSTtBQUV0RCxTQUFTQyxnQkFBZ0JDLFFBQWdCLEVBQUVDLFlBQThCO0lBQ3ZFLE1BQU1DLGNBQWNQLGVBQWVRLE9BQU8sQ0FBQyxPQUFPO0lBQ2xELE1BQU1DLGNBQWNKLFNBQVNHLE9BQU8sQ0FBQyxPQUFPO0lBQzVDLE1BQU1FLE1BQU0sSUFBSUMsSUFBSSxHQUFHSixZQUFZLENBQUMsRUFBRUUsYUFBYTtJQUVuRCxJQUFJSCxjQUFjO1FBQ2hCQSxhQUFhTSxPQUFPLENBQUMsQ0FBQ0MsT0FBT0M7WUFDM0IsSUFBSUQsVUFBVSxJQUFJO2dCQUNoQkgsSUFBSUosWUFBWSxDQUFDUyxHQUFHLENBQUNELEtBQUtEO1lBQzVCO1FBQ0Y7SUFDRjtJQUVBLE9BQU9IO0FBQ1Q7QUFFQSxlQUFlTSxVQUFVQyxPQUFvQjtJQUMzQyxNQUFNQyxjQUFjRCxRQUFRRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUI7SUFFM0QsSUFBSSxDQUFDRixZQUFZRyxRQUFRLENBQUMscUJBQXFCO1FBQzdDLE9BQU9DO0lBQ1Q7SUFFQSxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNTixRQUFRTSxJQUFJO1FBQy9CLElBQUksQ0FBQ0EsS0FBS0MsSUFBSSxJQUFJO1lBQ2hCLE9BQU9GO1FBQ1Q7UUFDQSxPQUFPRyxLQUFLQyxLQUFLLENBQUNIO0lBQ3BCLEVBQUUsT0FBTTtRQUNOLE9BQU9EO0lBQ1Q7QUFDRjtBQUVPLGVBQWVLLGVBQ3BCVixPQUFvQixFQUNwQlosUUFBZ0IsRUFDaEJ1QixJQUFrQjtJQUVsQixNQUFNQyxhQUFhekIsZ0JBQWdCQyxVQUFVWSxRQUFRYSxPQUFPLENBQUN4QixZQUFZO0lBQ3pFLE1BQU15QixPQUFPSCxNQUFNRyxRQUFTLE1BQU1mLFVBQVVDO0lBRTVDLE1BQU1lLFdBQVcsTUFBTUMsTUFBTUosWUFBWTtRQUN2Q0ssUUFBUU4sTUFBTU0sVUFBVWpCLFFBQVFpQixNQUFNO1FBQ3RDZixTQUFTO1lBQ1BnQixRQUFRO1lBQ1IsR0FBSUosT0FBTztnQkFBRSxnQkFBZ0I7WUFBbUIsSUFBSSxDQUFDLENBQUM7WUFDdEQsR0FBR0gsTUFBTVQsT0FBTztRQUNsQjtRQUNBWSxNQUFNLE9BQU9BLFNBQVMsY0FBY1QsWUFBWUcsS0FBS1csU0FBUyxDQUFDTDtRQUMvRE0sT0FBTztJQUNUO0lBRUEsTUFBTWQsT0FBTyxNQUFNUyxTQUFTVCxJQUFJO0lBRWhDLE9BQU8sSUFBSXhCLHFEQUFZQSxDQUFDd0IsTUFBTTtRQUM1QmUsUUFBUU4sU0FBU00sTUFBTTtRQUN2Qm5CLFNBQVM7WUFDUCxnQkFBZ0JhLFNBQVNiLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLG1CQUFtQjtRQUMxRDtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy9vc2FtYS9Eb3dubG9hZHMvZnVsbC1zdGFjay10YXNrL3Fhc2hpby1mcm9udGVuZC1hc3NpZ25tZW50L2xpYi9iYWNrZW5kLWFwaS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xuXG5jb25zdCBiYWNrZW5kQmFzZVVybCA9IHByb2Nlc3MuZW52LkJBQ0tFTkRfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDozMDAwJztcblxuZnVuY3Rpb24gYnVpbGRCYWNrZW5kVXJsKHBhdGhuYW1lOiBzdHJpbmcsIHNlYXJjaFBhcmFtcz86IFVSTFNlYXJjaFBhcmFtcykge1xuICBjb25zdCB0cmltbWVkQmFzZSA9IGJhY2tlbmRCYXNlVXJsLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG4gIGNvbnN0IHRyaW1tZWRQYXRoID0gcGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sICcnKTtcbiAgY29uc3QgdXJsID0gbmV3IFVSTChgJHt0cmltbWVkQmFzZX0vJHt0cmltbWVkUGF0aH1gKTtcblxuICBpZiAoc2VhcmNoUGFyYW1zKSB7XG4gICAgc2VhcmNoUGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGlmICh2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwYXJzZUJvZHkocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgY29uc3QgY29udGVudFR5cGUgPSByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSB8fCAnJztcblxuICBpZiAoIWNvbnRlbnRUeXBlLmluY2x1ZGVzKCdhcHBsaWNhdGlvbi9qc29uJykpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVxdWVzdC50ZXh0KCk7XG4gICAgaWYgKCF0ZXh0LnRyaW0oKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodGV4dCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByb3h5VG9CYWNrZW5kKFxuICByZXF1ZXN0OiBOZXh0UmVxdWVzdCxcbiAgcGF0aG5hbWU6IHN0cmluZyxcbiAgaW5pdD86IFJlcXVlc3RJbml0LFxuKSB7XG4gIGNvbnN0IGJhY2tlbmRVcmwgPSBidWlsZEJhY2tlbmRVcmwocGF0aG5hbWUsIHJlcXVlc3QubmV4dFVybC5zZWFyY2hQYXJhbXMpO1xuICBjb25zdCBib2R5ID0gaW5pdD8uYm9keSA/PyAoYXdhaXQgcGFyc2VCb2R5KHJlcXVlc3QpKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGJhY2tlbmRVcmwsIHtcbiAgICBtZXRob2Q6IGluaXQ/Lm1ldGhvZCB8fCByZXF1ZXN0Lm1ldGhvZCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIC4uLihib2R5ID8geyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0gOiB7fSksXG4gICAgICAuLi5pbml0Py5oZWFkZXJzLFxuICAgIH0sXG4gICAgYm9keTogdHlwZW9mIGJvZHkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgY2FjaGU6ICduby1zdG9yZScsXG4gIH0pO1xuXG4gIGNvbnN0IHRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG5cbiAgcmV0dXJuIG5ldyBOZXh0UmVzcG9uc2UodGV4dCwge1xuICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykgfHwgJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImJhY2tlbmRCYXNlVXJsIiwicHJvY2VzcyIsImVudiIsIkJBQ0tFTkRfQVBJX1VSTCIsImJ1aWxkQmFja2VuZFVybCIsInBhdGhuYW1lIiwic2VhcmNoUGFyYW1zIiwidHJpbW1lZEJhc2UiLCJyZXBsYWNlIiwidHJpbW1lZFBhdGgiLCJ1cmwiLCJVUkwiLCJmb3JFYWNoIiwidmFsdWUiLCJrZXkiLCJzZXQiLCJwYXJzZUJvZHkiLCJyZXF1ZXN0IiwiY29udGVudFR5cGUiLCJoZWFkZXJzIiwiZ2V0IiwiaW5jbHVkZXMiLCJ1bmRlZmluZWQiLCJ0ZXh0IiwidHJpbSIsIkpTT04iLCJwYXJzZSIsInByb3h5VG9CYWNrZW5kIiwiaW5pdCIsImJhY2tlbmRVcmwiLCJuZXh0VXJsIiwiYm9keSIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJBY2NlcHQiLCJzdHJpbmdpZnkiLCJjYWNoZSIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/backend-api.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute&page=%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute.ts&appDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute&page=%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute.ts&appDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_osama_Downloads_full_stack_task_qashio_frontend_assignment_app_api_transactions_summary_report_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/transactions/summary/report/route.ts */ \"(rsc)/./app/api/transactions/summary/report/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/transactions/summary/report/route\",\n        pathname: \"/api/transactions/summary/report\",\n        filename: \"route\",\n        bundlePath: \"app/api/transactions/summary/report/route\"\n    },\n    resolvedPagePath: \"/Users/osama/Downloads/full-stack-task/qashio-frontend-assignment/app/api/transactions/summary/report/route.ts\",\n    nextConfigOutput,\n    userland: _Users_osama_Downloads_full_stack_task_qashio_frontend_assignment_app_api_transactions_summary_report_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ0cmFuc2FjdGlvbnMlMkZzdW1tYXJ5JTJGcmVwb3J0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZ0cmFuc2FjdGlvbnMlMkZzdW1tYXJ5JTJGcmVwb3J0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdHJhbnNhY3Rpb25zJTJGc3VtbWFyeSUyRnJlcG9ydCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm9zYW1hJTJGRG93bmxvYWRzJTJGZnVsbC1zdGFjay10YXNrJTJGcWFzaGlvLWZyb250ZW5kLWFzc2lnbm1lbnQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGb3NhbWElMkZEb3dubG9hZHMlMkZmdWxsLXN0YWNrLXRhc2slMkZxYXNoaW8tZnJvbnRlbmQtYXNzaWdubWVudCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDOEQ7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9vc2FtYS9Eb3dubG9hZHMvZnVsbC1zdGFjay10YXNrL3Fhc2hpby1mcm9udGVuZC1hc3NpZ25tZW50L2FwcC9hcGkvdHJhbnNhY3Rpb25zL3N1bW1hcnkvcmVwb3J0L3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS90cmFuc2FjdGlvbnMvc3VtbWFyeS9yZXBvcnQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS90cmFuc2FjdGlvbnMvc3VtbWFyeS9yZXBvcnRcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3RyYW5zYWN0aW9ucy9zdW1tYXJ5L3JlcG9ydC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9vc2FtYS9Eb3dubG9hZHMvZnVsbC1zdGFjay10YXNrL3Fhc2hpby1mcm9udGVuZC1hc3NpZ25tZW50L2FwcC9hcGkvdHJhbnNhY3Rpb25zL3N1bW1hcnkvcmVwb3J0L3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute&page=%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute.ts&appDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute&page=%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftransactions%2Fsummary%2Freport%2Froute.ts&appDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fosama%2FDownloads%2Ffull-stack-task%2Fqashio-frontend-assignment&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();