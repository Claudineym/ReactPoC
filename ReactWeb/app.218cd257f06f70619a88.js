webpackJsonp([1],{

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_BeerList__ = __webpack_require__(17);




__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__components_BeerList__["a" /* default */], null), document.getElementById('app'));

/***/ }),

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__GiphyImage__ = __webpack_require__(18);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




class BeerList extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      isLoading: false
    };
  }

  componentDidMount() {
    var _this = this;

    return _asyncToGenerator(function* () {
      _this.setState({ isLoading: true });
      fetch('http://localhost:8080/good-beers').then(function (response) {
        return response.json();
      }).then(function (data) {
        return _this.setState({ beers: data, isLoading: false });
      });
    })();
  }

  render() {
    const { beers, isLoading } = this.state;

    if (isLoading) {
      return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](
        'p',
        null,
        'Loading...'
      );
    }

    return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](
        'h2',
        null,
        'Beer List do Marc\xE3o - party two weeks ::: '
      ),
      beers.map(beer => __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](
        'div',
        { key: beer.id },
        beer.name,
        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]('br', null),
        __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1__GiphyImage__["a" /* default */], { name: beer.name })
      ))
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BeerList);

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


class GiphyImage extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(props) {
    super(props);

    this.state = {
      giphyUrl: '',
      isLoading: false
    };
  }

  componentDidMount() {
    const giphyApi = '//api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=1&q=';

    fetch(giphyApi + this.props.name).then(response => response.json()).then(response => {
      if (response.data.length > 0) {
        this.setState({ giphyUrl: response.data[0].images.original.url });
      } else {
        // dancing cat for no images found
        this.setState({ giphyUrl: '//media.giphy.com/media/YaOxRsmrv9IeA/giphy.gif' });
      }
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { giphyUrl, isLoading } = this.state;
    if (isLoading) {
      return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"](
        'p',
        null,
        'Loading image...'
      );
    }
    return __WEBPACK_IMPORTED_MODULE_0_react__["createElement"]('img', { src: giphyUrl, alt: this.props.name, width: '200' });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GiphyImage);

/***/ })

},[16]);