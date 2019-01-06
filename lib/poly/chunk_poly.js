// let baseUrl = null

// const getBasePath = function () {
//   if (baseUrl === null) {
//     let src = "";
//     if (document.currentScript) {
//       src = document.currentScript.src
//     } else {
//       var script = document.querySelectorAll("script")
//       if (script.length) {
//         src = script[script.length - 1].src;
//       }
//     }
//     if (src.indexOf('http') != 0) {
//       src = location.origin + src
//     }
//     var lastPoint = src.lastIndexOf("/js/")
//     if (lastPoint >= 0) {
//       src = src.substring(0, lastPoint + 1)
//     }
//     baseUrl = src;
//   }
//   return baseUrl
// }

// __webpack_public_path__ = getBasePath()
// console.log(__webpack_public_path__)

// module.exports = __webpack_public_path__