(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*************************!*\
  !*** ./main/preload.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);


async function ipcBridge(url, options) {
  if (!url) throw new Error("URL is required.");
  if (typeof url !== "string") throw new Error("URL must be a string.");
  if (options) {
    if (options.method === "GET" && options.body) throw new Error("GET requests cannot have a body.");
    if (options.method !== "GET" && !options.body) throw new Error("Non-GET requests must have a body.");
  }
  const response = await electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("ipc::router", {
    url,
    options
  });
  return response;
}
async function openFileDialog() {
  const result = await electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("open-file-dialog");
  return result;
}
async function saveFileDialog(defaultName) {
  const result = await electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke("save-file-dialog", defaultName);
  return result;
}
function readFile(filePath) {
  return fs__WEBPACK_IMPORTED_MODULE_1__.readFileSync(filePath, "utf-8");
}
function writeFile(filePath, content) {
  fs__WEBPACK_IMPORTED_MODULE_1__.writeFileSync(filePath, content, "utf-8");
}
async function isAppPackaged() {
  const isPackaged = await electron__WEBPACK_IMPORTED_MODULE_0__.ipcRenderer.invoke('get-app-is-packaged');
  return isPackaged;
}
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld("ipcBridge", ipcBridge);
electron__WEBPACK_IMPORTED_MODULE_0__.contextBridge.exposeInMainWorld("electronAPI", {
  openFileDialog,
  saveFileDialog,
  readFile,
  writeFile,
  isAppPackaged
});
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlbG9hZC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7OztBQ1ZBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNEO0FBQzdCO0FBR3pCLGVBQWVHLFNBQVNBLENBQ3RCQyxHQUFXLEVBQ1hDLE9BQTJCLEVBQ0w7RUFDdEIsSUFBSSxDQUFDRCxHQUFHLEVBQUUsTUFBTSxJQUFJRSxLQUFLLENBQUMsa0JBQWtCLENBQUM7RUFDN0MsSUFBSSxPQUFPRixHQUFHLEtBQUssUUFBUSxFQUFFLE1BQU0sSUFBSUUsS0FBSyxDQUFDLHVCQUF1QixDQUFDO0VBRXJFLElBQUlELE9BQU8sRUFBRTtJQUNYLElBQUlBLE9BQU8sQ0FBQ0UsTUFBTSxLQUFLLEtBQUssSUFBSUYsT0FBTyxDQUFDRyxJQUFJLEVBQUUsTUFBTSxJQUFJRixLQUFLLENBQUMsa0NBQWtDLENBQUM7SUFDakcsSUFBSUQsT0FBTyxDQUFDRSxNQUFNLEtBQUssS0FBSyxJQUFJLENBQUNGLE9BQU8sQ0FBQ0csSUFBSSxFQUFFLE1BQU0sSUFBSUYsS0FBSyxDQUFDLG9DQUFvQyxDQUFDO0VBQ3RHO0VBRUEsTUFBTUcsUUFBUSxHQUFHLE1BQU1SLGlEQUFXLENBQUNTLE1BQU0sQ0FBQyxhQUFhLEVBQUU7SUFBRU4sR0FBRztJQUFFQztFQUFRLENBQUMsQ0FBQztFQUMxRSxPQUFPSSxRQUFRO0FBQ2pCO0FBRUEsZUFBZUUsY0FBY0EsQ0FBQSxFQUFzQjtFQUNqRCxNQUFNQyxNQUFNLEdBQUcsTUFBTVgsaURBQVcsQ0FBQ1MsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0VBQzNELE9BQU9FLE1BQU07QUFDZjtBQUVBLGVBQWVDLGNBQWNBLENBQUNDLFdBQW1CLEVBQStCO0VBQzlFLE1BQU1GLE1BQU0sR0FBRyxNQUFNWCxpREFBVyxDQUFDUyxNQUFNLENBQUMsa0JBQWtCLEVBQUVJLFdBQVcsQ0FBQztFQUN4RSxPQUFPRixNQUFNO0FBQ2Y7QUFFQSxTQUFTRyxRQUFRQSxDQUFDQyxRQUFnQixFQUFVO0VBQzFDLE9BQU9kLDRDQUFlLENBQUNjLFFBQVEsRUFBRSxPQUFPLENBQUM7QUFDM0M7QUFFQSxTQUFTRSxTQUFTQSxDQUFDRixRQUFnQixFQUFFRyxPQUFlLEVBQVE7RUFDMURqQiw2Q0FBZ0IsQ0FBQ2MsUUFBUSxFQUFFRyxPQUFPLEVBQUUsT0FBTyxDQUFDO0FBQzlDO0FBR0UsZUFBZUUsYUFBYUEsQ0FBQSxFQUFxQjtFQUMvQyxNQUFNQyxVQUFVLEdBQUcsTUFBTXJCLGlEQUFXLENBQUNTLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztFQUNsRSxPQUFPWSxVQUFVO0FBQ25CO0FBRUZ0QixtREFBYSxDQUFDdUIsaUJBQWlCLENBQUMsV0FBVyxFQUFFcEIsU0FBUyxDQUFDO0FBQ3ZESCxtREFBYSxDQUFDdUIsaUJBQWlCLENBQUMsYUFBYSxFQUFFO0VBQzdDWixjQUFjO0VBQ2RFLGNBQWM7RUFDZEUsUUFBUTtFQUNSRyxTQUFTO0VBQ1RHO0FBQ0YsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pZGUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2lkZS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9pZGUvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vaWRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2lkZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9pZGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2lkZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2lkZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2lkZS8uL21haW4vcHJlbG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkoZ2xvYmFsLCAoKSA9PiB7XG5yZXR1cm4gIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNvbnRleHRCcmlkZ2UsIGlwY1JlbmRlcmVyIH0gZnJvbSBcImVsZWN0cm9uXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB0eXBlIHsgSXBjUmVxdWVzdE9wdGlvbnMsIElwY1Jlc3BvbnNlIH0gZnJvbSBcIkBzaGFyZWRUeXBlcy9pcGNcIjtcblxuYXN5bmMgZnVuY3Rpb24gaXBjQnJpZGdlKFxuICB1cmw6IHN0cmluZyxcbiAgb3B0aW9ucz86IElwY1JlcXVlc3RPcHRpb25zXG4pOiBQcm9taXNlPElwY1Jlc3BvbnNlPiB7XG4gIGlmICghdXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJVUkwgaXMgcmVxdWlyZWQuXCIpO1xuICBpZiAodHlwZW9mIHVybCAhPT0gXCJzdHJpbmdcIikgdGhyb3cgbmV3IEVycm9yKFwiVVJMIG11c3QgYmUgYSBzdHJpbmcuXCIpO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMubWV0aG9kID09PSBcIkdFVFwiICYmIG9wdGlvbnMuYm9keSkgdGhyb3cgbmV3IEVycm9yKFwiR0VUIHJlcXVlc3RzIGNhbm5vdCBoYXZlIGEgYm9keS5cIik7XG4gICAgaWYgKG9wdGlvbnMubWV0aG9kICE9PSBcIkdFVFwiICYmICFvcHRpb25zLmJvZHkpIHRocm93IG5ldyBFcnJvcihcIk5vbi1HRVQgcmVxdWVzdHMgbXVzdCBoYXZlIGEgYm9keS5cIik7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGlwY1JlbmRlcmVyLmludm9rZShcImlwYzo6cm91dGVyXCIsIHsgdXJsLCBvcHRpb25zIH0pO1xuICByZXR1cm4gcmVzcG9uc2U7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9wZW5GaWxlRGlhbG9nKCk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgaXBjUmVuZGVyZXIuaW52b2tlKFwib3Blbi1maWxlLWRpYWxvZ1wiKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZUZpbGVEaWFsb2coZGVmYXVsdE5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGlwY1JlbmRlcmVyLmludm9rZShcInNhdmUtZmlsZS1kaWFsb2dcIiwgZGVmYXVsdE5hbWUpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByZWFkRmlsZShmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgXCJ1dGYtOFwiKTtcbn1cblxuZnVuY3Rpb24gd3JpdGVGaWxlKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IHZvaWQge1xuICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCBjb250ZW50LCBcInV0Zi04XCIpO1xufVxuXG5cbiAgYXN5bmMgZnVuY3Rpb24gaXNBcHBQYWNrYWdlZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBpc1BhY2thZ2VkID0gYXdhaXQgaXBjUmVuZGVyZXIuaW52b2tlKCdnZXQtYXBwLWlzLXBhY2thZ2VkJyk7XG4gICAgcmV0dXJuIGlzUGFja2FnZWQ7XG4gIH1cblxuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZChcImlwY0JyaWRnZVwiLCBpcGNCcmlkZ2UpO1xuY29udGV4dEJyaWRnZS5leHBvc2VJbk1haW5Xb3JsZChcImVsZWN0cm9uQVBJXCIsIHtcbiAgb3BlbkZpbGVEaWFsb2csXG4gIHNhdmVGaWxlRGlhbG9nLFxuICByZWFkRmlsZSxcbiAgd3JpdGVGaWxlLFxuICBpc0FwcFBhY2thZ2VkXG59KTtcbiJdLCJuYW1lcyI6WyJjb250ZXh0QnJpZGdlIiwiaXBjUmVuZGVyZXIiLCJmcyIsImlwY0JyaWRnZSIsInVybCIsIm9wdGlvbnMiLCJFcnJvciIsIm1ldGhvZCIsImJvZHkiLCJyZXNwb25zZSIsImludm9rZSIsIm9wZW5GaWxlRGlhbG9nIiwicmVzdWx0Iiwic2F2ZUZpbGVEaWFsb2ciLCJkZWZhdWx0TmFtZSIsInJlYWRGaWxlIiwiZmlsZVBhdGgiLCJyZWFkRmlsZVN5bmMiLCJ3cml0ZUZpbGUiLCJjb250ZW50Iiwid3JpdGVGaWxlU3luYyIsImlzQXBwUGFja2FnZWQiLCJpc1BhY2thZ2VkIiwiZXhwb3NlSW5NYWluV29ybGQiXSwic291cmNlUm9vdCI6IiJ9