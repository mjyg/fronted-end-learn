(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["books-list"],{

/***/ "./src/web/components/banner/banner.js":
/*!*********************************************!*\
  !*** ./src/web/components/banner/banner.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst banner = {\n  init() {\n    console.log('banner');\n  },\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (banner);\n\n\n//# sourceURL=webpack:///./src/web/components/banner/banner.js?");

/***/ }),

/***/ "./src/web/components/list/list.js":
/*!*****************************************!*\
  !*** ./src/web/components/list/list.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst list = {\n  init() {\n    $(document).on('click', '#js-btn', function (event) {\n      // $('#js-btn').click(function () {\n      alert('数据加载成功');\n    });\n    console.log('list');\n  },\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (list);\n\n\n//# sourceURL=webpack:///./src/web/components/list/list.js?");

/***/ }),

/***/ "./src/web/views/books/books-list.entry.js":
/*!*************************************************!*\
  !*** ./src/web/views/books/books-list.entry.js ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_banner_banner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/banner/banner.js */ \"./src/web/components/banner/banner.js\");\n/* harmony import */ var _components_list_list_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/list/list.js */ \"./src/web/components/list/list.js\");\n\n\n_components_banner_banner_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n_components_list_list_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n\n\n//# sourceURL=webpack:///./src/web/views/books/books-list.entry.js?");

/***/ })

},[["./src/web/views/books/books-list.entry.js","runtime"]]]);