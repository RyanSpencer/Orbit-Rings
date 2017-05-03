"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
MIT License

Copyright (c) 2011 Max Kueng, George Crabtree
 
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
!function (e) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports))) module.exports = e();else if ("function" == typeof define && define.amd) define(e);else {
    var f;"undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.Victor = e();
  }
}(function () {
  var define, module, exports;return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
        }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, f, f.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (_dereq_, module, exports) {
      exports = module.exports = Victor;

      /**
       * # Victor - A JavaScript 2D vector class with methods for common vector operations
       */

      /**
       * Constructor. Will also work without the `new` keyword
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = Victor(42, 1337);
       *
       * @param {Number} x Value of the x axis
       * @param {Number} y Value of the y axis
       * @return {Victor}
       * @api public
       */
      function Victor(x, y) {
        if (!(this instanceof Victor)) {
          return new Victor(x, y);
        }

        /**
         * The X axis
         *
         * ### Examples:
         *     var vec = new Victor.fromArray(42, 21);
         *
         *     vec.x;
         *     // => 42
         *
         * @api public
         */
        this.x = x || 0;

        /**
         * The Y axis
         *
         * ### Examples:
         *     var vec = new Victor.fromArray(42, 21);
         *
         *     vec.y;
         *     // => 21
         *
         * @api public
         */
        this.y = y || 0;
      };

      /**
       * # Static
       */

      /**
       * Creates a new instance from an array
       *
       * ### Examples:
       *     var vec = Victor.fromArray([42, 21]);
       *
       *     vec.toString();
       *     // => x:42, y:21
       *
       * @name Victor.fromArray
       * @param {Array} array Array with the x and y values at index 0 and 1 respectively
       * @return {Victor} The new instance
       * @api public
       */
      Victor.fromArray = function (arr) {
        return new Victor(arr[0] || 0, arr[1] || 0);
      };

      /**
       * Creates a new instance from an object
       *
       * ### Examples:
       *     var vec = Victor.fromObject({ x: 42, y: 21 });
       *
       *     vec.toString();
       *     // => x:42, y:21
       *
       * @name Victor.fromObject
       * @param {Object} obj Object with the values for x and y
       * @return {Victor} The new instance
       * @api public
       */
      Victor.fromObject = function (obj) {
        return new Victor(obj.x || 0, obj.y || 0);
      };

      /**
       * # Manipulation
       *
       * These functions are chainable.
       */

      /**
       * Adds another vector's X axis to this one
       *
       * ### Examples:
       *     var vec1 = new Victor(10, 10);
       *     var vec2 = new Victor(20, 30);
       *
       *     vec1.addX(vec2);
       *     vec1.toString();
       *     // => x:30, y:10
       *
       * @param {Victor} vector The other vector you want to add to this one
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.addX = function (vec) {
        this.x += vec.x;
        return this;
      };

      /**
       * Adds another vector's Y axis to this one
       *
       * ### Examples:
       *     var vec1 = new Victor(10, 10);
       *     var vec2 = new Victor(20, 30);
       *
       *     vec1.addY(vec2);
       *     vec1.toString();
       *     // => x:10, y:40
       *
       * @param {Victor} vector The other vector you want to add to this one
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.addY = function (vec) {
        this.y += vec.y;
        return this;
      };

      /**
       * Adds another vector to this one
       *
       * ### Examples:
       *     var vec1 = new Victor(10, 10);
       *     var vec2 = new Victor(20, 30);
       *
       *     vec1.add(vec2);
       *     vec1.toString();
       *     // => x:30, y:40
       *
       * @param {Victor} vector The other vector you want to add to this one
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.add = function (vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
      };

      /**
       * Adds the given scalar to both vector axis
       *
       * ### Examples:
       *     var vec = new Victor(1, 2);
       *
       *     vec.addScalar(2);
       *     vec.toString();
       *     // => x: 3, y: 4
       *
       * @param {Number} scalar The scalar to add
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.addScalar = function (scalar) {
        this.x += scalar;
        this.y += scalar;
        return this;
      };

      /**
       * Adds the given scalar to the X axis
       *
       * ### Examples:
       *     var vec = new Victor(1, 2);
       *
       *     vec.addScalarX(2);
       *     vec.toString();
       *     // => x: 3, y: 2
       *
       * @param {Number} scalar The scalar to add
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.addScalarX = function (scalar) {
        this.x += scalar;
        return this;
      };

      /**
       * Adds the given scalar to the Y axis
       *
       * ### Examples:
       *     var vec = new Victor(1, 2);
       *
       *     vec.addScalarY(2);
       *     vec.toString();
       *     // => x: 1, y: 4
       *
       * @param {Number} scalar The scalar to add
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.addScalarY = function (scalar) {
        this.y += scalar;
        return this;
      };

      /**
       * Subtracts the X axis of another vector from this one
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(20, 30);
       *
       *     vec1.subtractX(vec2);
       *     vec1.toString();
       *     // => x:80, y:50
       *
       * @param {Victor} vector The other vector you want subtract from this one
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.subtractX = function (vec) {
        this.x -= vec.x;
        return this;
      };

      /**
       * Subtracts the Y axis of another vector from this one
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(20, 30);
       *
       *     vec1.subtractY(vec2);
       *     vec1.toString();
       *     // => x:100, y:20
       *
       * @param {Victor} vector The other vector you want subtract from this one
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.subtractY = function (vec) {
        this.y -= vec.y;
        return this;
      };

      /**
       * Subtracts another vector from this one
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(20, 30);
       *
       *     vec1.subtract(vec2);
       *     vec1.toString();
       *     // => x:80, y:20
       *
       * @param {Victor} vector The other vector you want subtract from this one
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.subtract = function (vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
      };

      /**
       * Subtracts the given scalar from both axis
       *
       * ### Examples:
       *     var vec = new Victor(100, 200);
       *
       *     vec.subtractScalar(20);
       *     vec.toString();
       *     // => x: 80, y: 180
       *
       * @param {Number} scalar The scalar to subtract
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.subtractScalar = function (scalar) {
        this.x -= scalar;
        this.y -= scalar;
        return this;
      };

      /**
       * Subtracts the given scalar from the X axis
       *
       * ### Examples:
       *     var vec = new Victor(100, 200);
       *
       *     vec.subtractScalarX(20);
       *     vec.toString();
       *     // => x: 80, y: 200
       *
       * @param {Number} scalar The scalar to subtract
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.subtractScalarX = function (scalar) {
        this.x -= scalar;
        return this;
      };

      /**
       * Subtracts the given scalar from the Y axis
       *
       * ### Examples:
       *     var vec = new Victor(100, 200);
       *
       *     vec.subtractScalarY(20);
       *     vec.toString();
       *     // => x: 100, y: 180
       *
       * @param {Number} scalar The scalar to subtract
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.subtractScalarY = function (scalar) {
        this.y -= scalar;
        return this;
      };

      /**
       * Divides the X axis by the x component of given vector
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *     var vec2 = new Victor(2, 0);
       *
       *     vec.divideX(vec2);
       *     vec.toString();
       *     // => x:50, y:50
       *
       * @param {Victor} vector The other vector you want divide by
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.divideX = function (vector) {
        this.x /= vector.x;
        return this;
      };

      /**
       * Divides the Y axis by the y component of given vector
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *     var vec2 = new Victor(0, 2);
       *
       *     vec.divideY(vec2);
       *     vec.toString();
       *     // => x:100, y:25
       *
       * @param {Victor} vector The other vector you want divide by
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.divideY = function (vector) {
        this.y /= vector.y;
        return this;
      };

      /**
       * Divides both vector axis by a axis values of given vector
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *     var vec2 = new Victor(2, 2);
       *
       *     vec.divide(vec2);
       *     vec.toString();
       *     // => x:50, y:25
       *
       * @param {Victor} vector The vector to divide by
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.divide = function (vector) {
        this.x /= vector.x;
        this.y /= vector.y;
        return this;
      };

      /**
       * Divides both vector axis by the given scalar value
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.divideScalar(2);
       *     vec.toString();
       *     // => x:50, y:25
       *
       * @param {Number} The scalar to divide by
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.divideScalar = function (scalar) {
        if (scalar !== 0) {
          this.x /= scalar;
          this.y /= scalar;
        } else {
          this.x = 0;
          this.y = 0;
        }

        return this;
      };

      /**
       * Divides the X axis by the given scalar value
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.divideScalarX(2);
       *     vec.toString();
       *     // => x:50, y:50
       *
       * @param {Number} The scalar to divide by
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.divideScalarX = function (scalar) {
        if (scalar !== 0) {
          this.x /= scalar;
        } else {
          this.x = 0;
        }
        return this;
      };

      /**
       * Divides the Y axis by the given scalar value
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.divideScalarY(2);
       *     vec.toString();
       *     // => x:100, y:25
       *
       * @param {Number} The scalar to divide by
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.divideScalarY = function (scalar) {
        if (scalar !== 0) {
          this.y /= scalar;
        } else {
          this.y = 0;
        }
        return this;
      };

      /**
       * Inverts the X axis
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.invertX();
       *     vec.toString();
       *     // => x:-100, y:50
       *
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.invertX = function () {
        this.x *= -1;
        return this;
      };

      /**
       * Inverts the Y axis
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.invertY();
       *     vec.toString();
       *     // => x:100, y:-50
       *
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.invertY = function () {
        this.y *= -1;
        return this;
      };

      /**
       * Inverts both axis
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.invert();
       *     vec.toString();
       *     // => x:-100, y:-50
       *
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.invert = function () {
        this.invertX();
        this.invertY();
        return this;
      };

      /**
       * Multiplies the X axis by X component of given vector
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *     var vec2 = new Victor(2, 0);
       *
       *     vec.multiplyX(vec2);
       *     vec.toString();
       *     // => x:200, y:50
       *
       * @param {Victor} vector The vector to multiply the axis with
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.multiplyX = function (vector) {
        this.x *= vector.x;
        return this;
      };

      /**
       * Multiplies the Y axis by Y component of given vector
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *     var vec2 = new Victor(0, 2);
       *
       *     vec.multiplyX(vec2);
       *     vec.toString();
       *     // => x:100, y:100
       *
       * @param {Victor} vector The vector to multiply the axis with
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.multiplyY = function (vector) {
        this.y *= vector.y;
        return this;
      };

      /**
       * Multiplies both vector axis by values from a given vector
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *     var vec2 = new Victor(2, 2);
       *
       *     vec.multiply(vec2);
       *     vec.toString();
       *     // => x:200, y:100
       *
       * @param {Victor} vector The vector to multiply by
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.multiply = function (vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
      };

      /**
       * Multiplies both vector axis by the given scalar value
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.multiplyScalar(2);
       *     vec.toString();
       *     // => x:200, y:100
       *
       * @param {Number} The scalar to multiply by
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.multiplyScalar = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
      };

      /**
       * Multiplies the X axis by the given scalar
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.multiplyScalarX(2);
       *     vec.toString();
       *     // => x:200, y:50
       *
       * @param {Number} The scalar to multiply the axis with
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.multiplyScalarX = function (scalar) {
        this.x *= scalar;
        return this;
      };

      /**
       * Multiplies the Y axis by the given scalar
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.multiplyScalarY(2);
       *     vec.toString();
       *     // => x:100, y:100
       *
       * @param {Number} The scalar to multiply the axis with
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.multiplyScalarY = function (scalar) {
        this.y *= scalar;
        return this;
      };

      /**
       * Normalize
       *
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.normalize = function () {
        var length = this.length();

        if (length === 0) {
          this.x = 1;
          this.y = 0;
        } else {
          this.divide(Victor(length, length));
        }
        return this;
      };

      Victor.prototype.norm = Victor.prototype.normalize;

      /**
       * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.limit(80, 0.9);
       *     vec.toString();
       *     // => x:90, y:50
       *
       * @param {Number} max The maximum value for both x and y axis
       * @param {Number} factor Factor by which the axis are to be multiplied with
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.limit = function (max, factor) {
        if (Math.abs(this.x) > max) {
          this.x *= factor;
        }
        if (Math.abs(this.y) > max) {
          this.y *= factor;
        }
        return this;
      };

      /**
       * Randomizes both vector axis with a value between 2 vectors
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
       *     vec.toString();
       *     // => x:67, y:73
       *
       * @param {Victor} topLeft first vector
       * @param {Victor} bottomRight second vector
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.randomize = function (topLeft, bottomRight) {
        this.randomizeX(topLeft, bottomRight);
        this.randomizeY(topLeft, bottomRight);

        return this;
      };

      /**
       * Randomizes the y axis with a value between 2 vectors
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
       *     vec.toString();
       *     // => x:55, y:50
       *
       * @param {Victor} topLeft first vector
       * @param {Victor} bottomRight second vector
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.randomizeX = function (topLeft, bottomRight) {
        var min = Math.min(topLeft.x, bottomRight.x);
        var max = Math.max(topLeft.x, bottomRight.x);
        this.x = random(min, max);
        return this;
      };

      /**
       * Randomizes the y axis with a value between 2 vectors
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
       *     vec.toString();
       *     // => x:100, y:66
       *
       * @param {Victor} topLeft first vector
       * @param {Victor} bottomRight second vector
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.randomizeY = function (topLeft, bottomRight) {
        var min = Math.min(topLeft.y, bottomRight.y);
        var max = Math.max(topLeft.y, bottomRight.y);
        this.y = random(min, max);
        return this;
      };

      /**
       * Randomly randomizes either axis between 2 vectors
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
       *     vec.toString();
       *     // => x:100, y:77
       *
       * @param {Victor} topLeft first vector
       * @param {Victor} bottomRight second vector
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
        if (!!Math.round(Math.random())) {
          this.randomizeX(topLeft, bottomRight);
        } else {
          this.randomizeY(topLeft, bottomRight);
        }
        return this;
      };

      /**
       * Rounds both axis to an integer value
       *
       * ### Examples:
       *     var vec = new Victor(100.2, 50.9);
       *
       *     vec.unfloat();
       *     vec.toString();
       *     // => x:100, y:51
       *
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.unfloat = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
      };

      /**
       * Rounds both axis to a certain precision
       *
       * ### Examples:
       *     var vec = new Victor(100.2, 50.9);
       *
       *     vec.unfloat();
       *     vec.toString();
       *     // => x:100, y:51
       *
       * @param {Number} Precision (default: 8)
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.toFixed = function (precision) {
        if (typeof precision === 'undefined') {
          precision = 8;
        }
        this.x = this.x.toFixed(precision);
        this.y = this.y.toFixed(precision);
        return this;
      };

      /**
       * Performs a linear blend / interpolation of the X axis towards another vector
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 100);
       *     var vec2 = new Victor(200, 200);
       *
       *     vec1.mixX(vec2, 0.5);
       *     vec.toString();
       *     // => x:150, y:100
       *
       * @param {Victor} vector The other vector
       * @param {Number} amount The blend amount (optional, default: 0.5)
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.mixX = function (vec, amount) {
        if (typeof amount === 'undefined') {
          amount = 0.5;
        }

        this.x = (1 - amount) * this.x + amount * vec.x;
        return this;
      };

      /**
       * Performs a linear blend / interpolation of the Y axis towards another vector
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 100);
       *     var vec2 = new Victor(200, 200);
       *
       *     vec1.mixY(vec2, 0.5);
       *     vec.toString();
       *     // => x:100, y:150
       *
       * @param {Victor} vector The other vector
       * @param {Number} amount The blend amount (optional, default: 0.5)
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.mixY = function (vec, amount) {
        if (typeof amount === 'undefined') {
          amount = 0.5;
        }

        this.y = (1 - amount) * this.y + amount * vec.y;
        return this;
      };

      /**
       * Performs a linear blend / interpolation towards another vector
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 100);
       *     var vec2 = new Victor(200, 200);
       *
       *     vec1.mix(vec2, 0.5);
       *     vec.toString();
       *     // => x:150, y:150
       *
       * @param {Victor} vector The other vector
       * @param {Number} amount The blend amount (optional, default: 0.5)
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.mix = function (vec, amount) {
        this.mixX(vec, amount);
        this.mixY(vec, amount);
        return this;
      };

      /**
       * # Products
       */

      /**
       * Creates a clone of this vector
       *
       * ### Examples:
       *     var vec1 = new Victor(10, 10);
       *     var vec2 = vec1.clone();
       *
       *     vec2.toString();
       *     // => x:10, y:10
       *
       * @return {Victor} A clone of the vector
       * @api public
       */
      Victor.prototype.clone = function () {
        return new Victor(this.x, this.y);
      };

      /**
       * Copies another vector's X component in to its own
       *
       * ### Examples:
       *     var vec1 = new Victor(10, 10);
       *     var vec2 = new Victor(20, 20);
       *     var vec2 = vec1.copyX(vec1);
       *
       *     vec2.toString();
       *     // => x:20, y:10
       *
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.copyX = function (vec) {
        this.x = vec.x;
        return this;
      };

      /**
       * Copies another vector's Y component in to its own
       *
       * ### Examples:
       *     var vec1 = new Victor(10, 10);
       *     var vec2 = new Victor(20, 20);
       *     var vec2 = vec1.copyY(vec1);
       *
       *     vec2.toString();
       *     // => x:10, y:20
       *
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.copyY = function (vec) {
        this.y = vec.y;
        return this;
      };

      /**
       * Copies another vector's X and Y components in to its own
       *
       * ### Examples:
       *     var vec1 = new Victor(10, 10);
       *     var vec2 = new Victor(20, 20);
       *     var vec2 = vec1.copy(vec1);
       *
       *     vec2.toString();
       *     // => x:20, y:20
       *
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.copy = function (vec) {
        this.copyX(vec);
        this.copyY(vec);
        return this;
      };

      /**
       * Sets the vector to zero (0,0)
       *
       * ### Examples:
       *     var vec1 = new Victor(10, 10);
       *		 var1.zero();
       *     vec1.toString();
       *     // => x:0, y:0
       *
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.zero = function () {
        this.x = this.y = 0;
        return this;
      };

      /**
       * Calculates the dot product of this vector and another
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(200, 60);
       *
       *     vec1.dot(vec2);
       *     // => 23000
       *
       * @param {Victor} vector The second vector
       * @return {Number} Dot product
       * @api public
       */
      Victor.prototype.dot = function (vec2) {
        return this.x * vec2.x + this.y * vec2.y;
      };

      Victor.prototype.cross = function (vec2) {
        return this.x * vec2.y - this.y * vec2.x;
      };

      /**
       * Projects a vector onto another vector, setting itself to the result.
       *
       * ### Examples:
       *     var vec = new Victor(100, 0);
       *     var vec2 = new Victor(100, 100);
       *
       *     vec.projectOnto(vec2);
       *     vec.toString();
       *     // => x:50, y:50
       *
       * @param {Victor} vector The other vector you want to project this vector onto
       * @return {Victor} `this` for chaining capabilities
       * @api public
       */
      Victor.prototype.projectOnto = function (vec2) {
        var coeff = (this.x * vec2.x + this.y * vec2.y) / (vec2.x * vec2.x + vec2.y * vec2.y);
        this.x = coeff * vec2.x;
        this.y = coeff * vec2.y;
        return this;
      };

      Victor.prototype.horizontalAngle = function () {
        return Math.atan2(this.y, this.x);
      };

      Victor.prototype.horizontalAngleDeg = function () {
        return radian2degrees(this.horizontalAngle());
      };

      Victor.prototype.verticalAngle = function () {
        return Math.atan2(this.x, this.y);
      };

      Victor.prototype.verticalAngleDeg = function () {
        return radian2degrees(this.verticalAngle());
      };

      Victor.prototype.angle = Victor.prototype.horizontalAngle;
      Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
      Victor.prototype.direction = Victor.prototype.horizontalAngle;

      Victor.prototype.rotate = function (angle) {
        var nx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        var ny = this.x * Math.sin(angle) + this.y * Math.cos(angle);

        this.x = nx;
        this.y = ny;

        return this;
      };

      Victor.prototype.rotateDeg = function (angle) {
        angle = degrees2radian(angle);
        return this.rotate(angle);
      };

      Victor.prototype.rotateTo = function (rotation) {
        return this.rotate(rotation - this.angle());
      };

      Victor.prototype.rotateToDeg = function (rotation) {
        rotation = degrees2radian(rotation);
        return this.rotateTo(rotation);
      };

      Victor.prototype.rotateBy = function (rotation) {
        var angle = this.angle() + rotation;

        return this.rotate(angle);
      };

      Victor.prototype.rotateByDeg = function (rotation) {
        rotation = degrees2radian(rotation);
        return this.rotateBy(rotation);
      };

      /**
       * Calculates the distance of the X axis between this vector and another
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(200, 60);
       *
       *     vec1.distanceX(vec2);
       *     // => -100
       *
       * @param {Victor} vector The second vector
       * @return {Number} Distance
       * @api public
       */
      Victor.prototype.distanceX = function (vec) {
        return this.x - vec.x;
      };

      /**
       * Same as `distanceX()` but always returns an absolute number
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(200, 60);
       *
       *     vec1.absDistanceX(vec2);
       *     // => 100
       *
       * @param {Victor} vector The second vector
       * @return {Number} Absolute distance
       * @api public
       */
      Victor.prototype.absDistanceX = function (vec) {
        return Math.abs(this.distanceX(vec));
      };

      /**
       * Calculates the distance of the Y axis between this vector and another
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(200, 60);
       *
       *     vec1.distanceY(vec2);
       *     // => -10
       *
       * @param {Victor} vector The second vector
       * @return {Number} Distance
       * @api public
       */
      Victor.prototype.distanceY = function (vec) {
        return this.y - vec.y;
      };

      /**
       * Same as `distanceY()` but always returns an absolute number
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(200, 60);
       *
       *     vec1.distanceY(vec2);
       *     // => 10
       *
       * @param {Victor} vector The second vector
       * @return {Number} Absolute distance
       * @api public
       */
      Victor.prototype.absDistanceY = function (vec) {
        return Math.abs(this.distanceY(vec));
      };

      /**
       * Calculates the euclidean distance between this vector and another
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(200, 60);
       *
       *     vec1.distance(vec2);
       *     // => 100.4987562112089
       *
       * @param {Victor} vector The second vector
       * @return {Number} Distance
       * @api public
       */
      Victor.prototype.distance = function (vec) {
        return Math.sqrt(this.distanceSq(vec));
      };

      /**
       * Calculates the squared euclidean distance between this vector and another
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(200, 60);
       *
       *     vec1.distanceSq(vec2);
       *     // => 10100
       *
       * @param {Victor} vector The second vector
       * @return {Number} Distance
       * @api public
       */
      Victor.prototype.distanceSq = function (vec) {
        var dx = this.distanceX(vec),
            dy = this.distanceY(vec);

        return dx * dx + dy * dy;
      };

      /**
       * Calculates the length or magnitude of the vector
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.length();
       *     // => 111.80339887498948
       *
       * @return {Number} Length / Magnitude
       * @api public
       */
      Victor.prototype.length = function () {
        return Math.sqrt(this.lengthSq());
      };

      /**
       * Squared length / magnitude
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *
       *     vec.lengthSq();
       *     // => 12500
       *
       * @return {Number} Length / Magnitude
       * @api public
       */
      Victor.prototype.lengthSq = function () {
        return this.x * this.x + this.y * this.y;
      };

      Victor.prototype.magnitude = Victor.prototype.length;

      /**
       * Returns a true if vector is (0, 0)
       *
       * ### Examples:
       *     var vec = new Victor(100, 50);
       *     vec.zero();
       *
       *     // => true
       *
       * @return {Boolean}
       * @api public
       */
      Victor.prototype.isZero = function () {
        return this.x === 0 && this.y === 0;
      };

      /**
       * Returns a true if this vector is the same as another
       *
       * ### Examples:
       *     var vec1 = new Victor(100, 50);
       *     var vec2 = new Victor(100, 50);
       *     vec1.isEqualTo(vec2);
       *
       *     // => true
       *
       * @return {Boolean}
       * @api public
       */
      Victor.prototype.isEqualTo = function (vec2) {
        return this.x === vec2.x && this.y === vec2.y;
      };

      /**
       * # Utility Methods
       */

      /**
       * Returns an string representation of the vector
       *
       * ### Examples:
       *     var vec = new Victor(10, 20);
       *
       *     vec.toString();
       *     // => x:10, y:20
       *
       * @return {String}
       * @api public
       */
      Victor.prototype.toString = function () {
        return 'x:' + this.x + ', y:' + this.y;
      };

      /**
       * Returns an array representation of the vector
       *
       * ### Examples:
       *     var vec = new Victor(10, 20);
       *
       *     vec.toArray();
       *     // => [10, 20]
       *
       * @return {Array}
       * @api public
       */
      Victor.prototype.toArray = function () {
        return [this.x, this.y];
      };

      /**
       * Returns an object representation of the vector
       *
       * ### Examples:
       *     var vec = new Victor(10, 20);
       *
       *     vec.toObject();
       *     // => { x: 10, y: 20 }
       *
       * @return {Object}
       * @api public
       */
      Victor.prototype.toObject = function () {
        return { x: this.x, y: this.y };
      };

      var degrees = 180 / Math.PI;

      function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

      function radian2degrees(rad) {
        return rad * degrees;
      }

      function degrees2radian(deg) {
        return deg / degrees;
      }
    }, {}] }, {}, [1])(1);
});
'use strict';

var acknowledgeUser = function acknowledgeUser(data) {
  console.log('New User:');
  console.log(data.hash);
  hosted[data.hash] = data;
  cars[data.hash] = data;
};

var movementUpdate = function movementUpdate(data) {
  hosted[data.hash] = data;
  hosted[data.hash].lastUpdate = new Date().getTime();

  var car = cars[data.hash];

  if (!car) {
    return;
  }

  car.prevX = data.prevX;
  car.prevY = data.prevY;
  car.destX = data.destX;
  car.destY = data.destY;
  car.x = data.x;
  car.y = data.y;
  car.moveLeft = data.moveLeft;
  car.moveRight = data.moveRight;
  car.moveDown = data.moveDown;
  car.moveUp = data.moveUp;
  car.alpha = 0.05;
  car.velocity = data.velocity;
  car.acceleration = data.acceleration;
  car.drag = data.drag;
  car.state = data.state;
  car.fillStyle = data.fillStyle;
  car.size = data.size;
  car.health = data.health;
  car.pull = data.pull;

  socket.emit('hostUpdatedMovement', hosted[data.hash]);
};
"use strict";

//Array of colors for the cars to be
var colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink", "cyan"];

//Universal Constants for cars
var CAR = Object.freeze({
    //Max Accel used to accelerate
    MAX_ACCELERATION: 2.5,
    //Max velocity used to clamp speed
    MAX_VELOCITY: 7,
    //Number of cars that are spawned
    NUMB_CARS: 2
});

var CAR_STATE = Object.freeze({
    DEFAULT: 0,
    EXPLODING: 1,
    DEAD: 2
});

//Used for FPS and dt
var lastTime = 0;

//to display who won
var lastAlive = 0;

//Array of Characters to chose
var character = [
//Name of the planet
//Size is the radius of each planet
//Health will represent in game as Millions of people
//Gravitational pull which is multipled by gravitational algorthims
//Note: Planets will ignore the effects of planets with gravitational pulls less than them
{
    name: "earth",
    size: 12.5,
    health: 30,
    pull: 2
}, {
    name: "mars",
    size: 20,
    health: 40,
    pull: 3
}, {
    name: "mercury",
    size: 8,
    health: 20,
    pull: 1
}];

var moveCar = function moveCar(dt, car) {

    car.velocity.x += car.acceleration.x * dt;
    car.velocity.y += car.acceleration.y * dt;

    //Velocity is slowed by drag
    if (car.velocity.x > 0) {
        car.velocity.x -= car.drag;
    } else if (car.velocity.x < 0) {
        car.velocity.x += car.drag;
    }
    if (car.velocity.y > 0) {
        car.velocity.y -= car.drag;
    } else if (car.velocity.y < 0) {
        car.velocity.y += car.drag;
    }

    //to check gravitational pull towards the sun
    var length = distance(car, sun);
    //If its inside the area of the effect then continue
    if (length > sun.core && length < sun.size) {
        //Get vectors of the suns position and the cars position and subtract them,
        //then normalize it and rotate at a 90 degree angle to create a quasi gravitational field
        var vec = new Victor(car.x + car.size, car.y + car.size);
        var vec2 = new Victor(sun.x, sun.y);
        vec = vec.subtract(vec2);
        vec = vec.normalize();
        vec = vec.rotate(Math.PI / 2);
        //Using the standard gravational equation of F = Gm1 + gm2 / length squared and applys it to the velocity
        var force = sun.pull * (car.size * sun.core) / Math.pow(length, 2);
        car.velocity.x += vec.x * force;
        car.velocity.y += vec.y * force;
    }
    //Clamp the velocity based on the max velocity
    car.velocity.x = clamp(car.velocity.x, -CAR.MAX_VELOCITY, CAR.MAX_VELOCITY);
    car.velocity.y = clamp(car.velocity.y, -CAR.MAX_VELOCITY, CAR.MAX_VELOCITY);

    //move based on velocity
    car.x += car.velocity.x;
    car.y += car.velocity.y;
};

//Move all the cars
var moveCars = function moveCars(dt) {
    var car = cars[hash];

    //First car is controlled using arrow keys
    var accel = false;
    //Acceleration is set to a constant while keys are down and then reset to zero when not
    if (car.moveUp) {
        car.acceleration.y = -CAR.MAX_ACCELERATION;
        accel = true;
    }
    if (car.moveDown) {
        car.acceleration.y = CAR.MAX_ACCELERATION;
        accel = true;
    }
    if (car.moveLeft) {
        car.acceleration.x = -CAR.MAX_ACCELERATION;;
        accel = true;
    }
    if (car.moveRight) {
        car.acceleration.x = CAR.MAX_ACCELERATION;;
        accel = true;
    }
    if (!accel) {
        car.acceleration.x = 0;
        car.acceleration.y = 0;
    }

    moveCar(dt, car);

    if (isHost) {
        car.lastUpdate = new Date().getTime();
        socket.emit('hostUpdatedMovement', car);
    } else {
        socket.emit('movementUpdate', car);
    }
};

//Collision detection oooooooh boi
var checkCollisions = function checkCollisions(dt) {

    var keys = Object.keys(cars);
    //Loop through all cars
    for (var i = 0; i < keys.length; i++) {
        var car = cars[keys[i]];
        //If they are dead ignore em
        if (car.state === CAR_STATE.DEAD) {
            continue;
        }
        //If cars are at any of the screen edges they bounce a little bit and can't move past them
        if (car.x <= 0) {
            car.velocity.x *= -0.4;
            car.x = 0;
            moveCar(dt, car);
        }
        if (car.x + car.size * 2 >= WIDTH) {
            car.velocity.x *= -0.4;
            car.x = WIDTH - car.size * 2;
            moveCar(dt, car);
        }
        if (car.y <= 0) {
            car.velocity.y *= -0.4;
            car.y = 0;
            moveCar(dt, car);
        }
        if (car.y + car.size * 2 >= HEIGHT) {
            car.velocity.y *= -0.4;
            car.y = HEIGHT - car.size * 2;
            moveCar(dt, car);
        }

        //They also bounce off the sun
        if (distance(car, sun) < car.size + sun.core) {
            car.velocity.y *= -0.8;
            car.velocity.x *= -0.8;
            moveCar(dt, car);
        }
        //loop through the cars a second time to check car on car action
        for (var j = 0; j < keys.length; j++) {
            var car2 = cars[keys[j]];

            //skip through if the car is dead or its the same car
            if (car2.state === CAR_STATE.DEAD) continue;
            if (i == j) {
                continue;
            }

            //Call collision on the two cars
            if (aabb(car, car2)) {

                //make them bounce off of each other
                car.velocity.y *= -0.8;
                car.velocity.x *= -0.8;
                car2.velocity.y *= -0.8;
                car2.velocity.x *= -0.8;

                //Cody created code to stop them from going inside one another
                //Basically move them slightly in the x or y direciton when they collide
                if (car.x > car2.x) {
                    car.x++;
                } else {
                    car2.x++;
                }

                if (car.y > car2.y) {
                    car.y++;
                } else {
                    car2.y++;
                }

                //Call move once to make sure actions actualy take palce
                moveCar(dt, car);
                moveCar(dt, car2);

                //Calculate health loss
                //Larger cars take less damage agaisnt smaller cars and vice versa
                var sizeDif = car2.size / car.size;
                //Cars which have a slower x velocity do bad agasint ones with faster x velocity
                var xVelDif = Math.abs(car2.velocity.x) - Math.abs(car.velocity.x);
                //If its too small change it to prevent odd corner cases
                if (xVelDif <= 0.5) xVelDif = 0.5;
                //Same thing with y velocity
                var yVelDif = Math.abs(car2.velocity.y) - Math.abs(car.velocity.y);
                if (yVelDif <= 0.5) yVelDif = 0.5;

                //Subtract from overall health based on all factors
                car.health -= sizeDif * xVelDif * yVelDif;

                //Same thing for the other car colliding
                sizeDif = car.size / car2.size;
                xVelDif = Math.abs(car.velocity.x) - Math.abs(car2.velocity.x);
                if (xVelDif <= 0.5) xVelDif = 0.5;
                yVelDif = Math.abs(car.velocity.y) - Math.abs(car2.velocity.y);
                if (yVelDif <= 0.5) yVelDif = 0.5;

                car2.health -= sizeDif * xVelDif * yVelDif;

                //If either car drops to zero health or less they die
                if (car.health <= 0) {
                    car.state = CAR_STATE.DEAD;
                }
                if (car2.health <= 0) {
                    car2.state = CAR_STATE.DEAD;
                }
            }
        }
    }
};
//Take from boomshine to smooth animation
var calculateDeltaTime = function calculateDeltaTime() {
    var now = void 0,
        fps = void 0;
    now = performance.now();
    fps = 1000 / (now - lastTime);
    fps = clamp(fps, 12, 60);
    lastTime = now;
    return 1 / fps;
};
"use strict";

/*
Function Name: clamp(val, min, max)
Author: Web - various sources
Return Value: the constrained value
Description: returns a value that is
constrained between min and max (inclusive) 
*/
function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

//Distance formula
function distance(vectorA, vectorB) {
    return Math.sqrt(Math.pow(vectorB.x - vectorA.x, 2) + Math.pow(vectorB.y - vectorA.y, 2));
}
//Simple bounding box aka AABB collision
function aabb(vectorA, vectorB) {
    //console.dir(vectorA);
    //console.dir(vectorB);
    if (vectorA.x + vectorA.size * 2 < vectorB.x || vectorA.x > vectorB.x + vectorB.size * 2) {
        return false;
    } else if (vectorA.y > vectorB.y + vectorB.size * 2 || vectorA.y + vectorA.size * 2 < vectorB.y) {
        return false;
    }
    return true;
}
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
"use strict";

//Enable for live debug
var debug = false;

//Draws everthing to the screen
var drawCars = function drawCars() {

  if (gameState === GAME_STATE.LOBBY) {

    ctx.save();
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (isHost) {
      fillText("Start when ready", WIDTH / 2, HEIGHT / 2, "20pt Jura", "white");
    } else {
      fillText("Waiting for host to start the game", WIDTH / 2, HEIGHT / 2, "20pt Jura", "white");
    }
    ctx.restore();
  } else {
    var deltaTime = calculateDeltaTime();

    moveCars(deltaTime);

    checkCollisions(deltaTime);

    //Draw background
    ctx.save();
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    //Draw the sun
    ctx.translate(sun.x, sun.y);
    if (debug) {
      //Draw the area of gravitational effect if in debug
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(0, 0, sun.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
    //Draw the acual sun
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(0, 0, sun.core, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    if (debug) {
      //If in debug, draw arrows to show direction of gravitational field
      for (var i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(-20, -60);
        ctx.lineTo(20, -60);
        ctx.lineTo(17, -63);
        ctx.moveTo(20, -60);
        ctx.lineTo(17, -57);
        ctx.stroke();
        ctx.closePath();
      }
    }

    ctx.restore();

    var keys = Object.keys(cars);

    //console.log(cars[keys[0]]);

    for (var _i = 0; _i < keys.length; _i++) {
      var car = cars[keys[_i]];

      //If the car is dead don't draw it
      if (car.state === CAR_STATE.DEAD) continue;
      //Otherwise draw the car
      ctx.save();
      ctx.fillStyle = car.fillStyle;
      ctx.fillRect(car.x, car.y, car.size * 2, car.size * 2);
      ctx.restore();
      if (debug) {
        //Show the origin of each rectangle for developer aid
        ctx.save();
        ctx.translate(car.x, car.y);
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(0, 0, 3, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        //Show velocity
        ctx.beginPath();
        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = "blue";
        ctx.translate(car.size, car.size);
        ctx.moveTo(0, 0);
        ctx.lineTo(car.velocity.x * 10, car.velocity.y * 10);
        ctx.closePath();
        ctx.stroke();

        //show accleration
        ctx.beginPath();
        ctx.strokeStyle = "Red";
        ctx.moveTo(0, 0);
        ctx.lineTo(car.acceleration.x * 10, car.acceleration.y * 10);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
    }

    drawHUD();
  }

  animationFrame = requestAnimationFrame(drawCars);
};

var drawHUD = function drawHUD() {

  ctx.save();
  //Text for debug information
  if (debug) {
    fillText("Debug Info:Press N to toggle Debug", 10, 30, "20pt 'Exo 2'", "white");
  }
  //Car health stacked from the bottom dynamically so the last player will always next to the bottom of the canvas
  var keys = Object.keys(cars);
  for (var i = keys.length - 1; i >= 0; i--) {
    if (cars[keys[i]].state === CAR_STATE.DEAD) continue;
    fillText("Player " + (i + 1) + " Population: " + cars[keys[i]].health.toFixed(1) + " million", 10, HEIGHT - (keys.length - i) * 30, "20pt 'Exo 2'", cars[keys[i]].fillStyle);
  }

  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  ctx.restore();
};

//Taken from Boomshine to display text easily
var fillText = function fillText(string, x, y, css, color) {

  ctx.save();
  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  ctx.font = css;
  ctx.fillStyle = color;
  ctx.fillText(string, x, y);
  ctx.restore();
};

var drawIntroScreen = function drawIntroScreen() {
  setTimeout(function () {
    ctx.save();
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    fillText("Start or Join a Battle to Begin Playing", WIDTH / 2, HEIGHT / 2, "20pt Jura", "white");
    ctx.restore();
  }, 300);
};

var drawWaitingScreen = function drawWaitingScreen() {
  setTimeout(function () {
    ctx.save();
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    fillText("Waiting", WIDTH / 2, HEIGHT / 2, "20pt Jura", "white");
    ctx.restore();
  }, 300);
};
'use strict';

var WIDTH = 1280;
var HEIGHT = 720;
var canvas = undefined;
var ctx = undefined;
var socket = void 0;
var hash = void 0;
var isHost = false;
var animationFrame = void 0;
var bgImage = new Image();

var hosted = {};
//The Various Game States and Car States
var GAME_STATE = Object.freeze({
  BEGIN: 0,
  STORY: 1,
  CHOOSEROOM: 2,
  WAITING: 3,
  INGAME: 4,
  TACTICS: 5,
  DEFAULT: 6,
  ROUND_END: 7,
  END: 8,
  LOBBY: 9
});

//Object at center of the screen
var sun = Object.seal({
  x: 0,
  y: 0,
  size: 100,
  core: 30,
  pull: 4
});

//Active gamestate
var gameState = undefined;

//Array of car
var cars = {};

var keyDownHandler = function keyDownHandler(e) {
  var keyPressed = e.which;
  var car = cars[hash];

  // W OR UP
  if (keyPressed === 87 || keyPressed === 38) {
    car.moveUp = true;
  }
  // A OR LEFT
  else if (keyPressed === 65 || keyPressed === 37) {
      car.moveLeft = true;
    }
    // S OR DOWN
    else if (keyPressed === 83 || keyPressed === 40) {
        car.moveDown = true;
      }
      // D OR RIGHT
      else if (keyPressed === 68 || keyPressed === 39) {
          car.moveRight = true;
        }

  return false;
};

var keyUpHandler = function keyUpHandler(e) {
  var keyPressed = e.which;
  var car = cars[hash];

  // W OR UP
  if (keyPressed === 87 || keyPressed === 38) {
    car.moveUp = false;
  }
  // A OR LEFT
  else if (keyPressed === 65 || keyPressed === 37) {
      car.moveLeft = false;
    }
    // S OR DOWN
    else if (keyPressed === 83 || keyPressed === 40) {
        car.moveDown = false;
      }
      // D OR RIGHT
      else if (keyPressed === 68 || keyPressed === 39) {
          car.moveRight = false;
        }

  return false;
};

var eventHandler = function eventHandler() {
  //set up keys
  document.body.addEventListener('keydown', keyDownHandler);
  document.body.addEventListener('keyup', keyUpHandler);

  //set up host button
  var hostButton = document.querySelector("#hostButton");
  hostButton.addEventListener('click', function (e) {
    console.log('clicked host battle, roomName: ' + document.querySelector("#hostName").value);
    onJoin(document.querySelector("#hostName").value);
  });
};

var updateJoinableRoomsC = function updateJoinableRoomsC(data) {
  if (gameState === GAME_STATE.CHOOSEROOM) {
    var battleList = document.querySelector("#battleList");
    console.log('In updateJoinableRoomsC');
    console.dir(data);
    battleList.innerHTML = "";
    if (data.message) {
      battleList.innerHTML = data.message;
    } else {
      (function () {
        var keys = Object.keys(data);

        var _loop = function _loop(i) {
          console.log(data[keys[i]]);
          var numInRoom = Object.keys(data[keys[i]]).length;
          console.log(Object.keys(data[keys[i]]));

          //create button for each existing room 
          var roomButton = document.createElement('input');

          roomButton.setAttribute('class', 'button');
          roomButton.setAttribute('type', 'button');
          roomButton.setAttribute('value', keys[i] + '(' + numInRoom + '/8)');

          //add a click event that will add them to the room
          roomButton.addEventListener('click', function (e) {
            console.log("clicked a battle to join");
            onJoin(keys[i]);
          });

          //append it to battleList
          battleList.appendChild(roomButton);
        };

        for (var i = 0; i < keys.length; i++) {
          _loop(i);
        }
      })();
    }
  }
};

var updateRoomStatusC = function updateRoomStatusC(data) {
  if (gameState === GAME_STATE.WAITING || gameState === GAME_STATE.LOBBY || gameState === GAME_STATE.INGAME) {

    console.log('In updateRoomStatusC IF');
    console.dir(data);

    var roomSetupDiv = document.querySelector("#roomSetup");
    roomSetupDiv.innerHTML = '<h2><em>Battle of</br>' + data.roomName + '</em></h2>';

    //start button for host
    if (isHost) {
      roomSetupDiv.innerHTML += '<input id="startButton" class="button" type="button" value="Start the Game">';

      var startButton = document.querySelector("#startButton");
      startButton.addEventListener('click', function (e) {
        console.log('host clicked start');
        socket.emit('hostStart');
        roomSetupDiv.removeChild(startButton);
      });
    }

    var keys = Object.keys(data.roomObj);
    for (var i = 0; i < keys.length; i++) {

      var currentSocket = data.roomObj[keys[i]];
      console.log('currentSocket: ' + currentSocket);

      var playerAvatar = document.createElement("div");
      roomSetupDiv.appendChild(playerAvatar);

      playerAvatar.style.backgroundColor = currentSocket.color;

      if (currentSocket.host) {
        playerAvatar.innerHTML += "<p id='host'>Host</p>";
      }
      playerAvatar.setAttribute("class", "playerAvatar");
    }
  }
};

var hostStart = function hostStart() {
  gameState = GAME_STATE.INGAME;
};

var onJoin = function onJoin(roomName) {
  socket.emit('onJoin', { roomName: roomName });
  gameState = GAME_STATE.LOBBY;
  socket.on('hostConfirm', confirmHost);
  socket.on('joined', setUser);
  socket.on('updateRoomStatusC', updateRoomStatusC);
  socket.on('updatedMovement', update);
  socket.on('left', removeUser);
  socket.on('hostLeft', hostLeft);
  socket.on('hostStart', hostStart);
};

//Opening function
var init = function init() {
  //Create and access canvas
  canvas = document.querySelector('canvas');

  ctx = canvas.getContext('2d');

  //Set overall canvas size
  canvas.height = HEIGHT; //window.innerHeight * .979;
  canvas.width = WIDTH; //window.innerWidth * .99;   

  //Sun should be center
  sun.x = canvas.width / 2;
  sun.y = canvas.height / 2;

  //set backgroundImage
  bgImage.src = "./assets/media/background.jpg";
  //SOURCE -> https://pixabay.com/en/star-points-stains-effect-space-1626550/

  drawIntroScreen();
  eventHandler();

  socket = io.connect();

  gameState = GAME_STATE.CHOOSEROOM;

  socket.on('updateJoinableRoomsC', updateJoinableRoomsC);
};

window.onload = init;
"use strict";

var update = function update(data) {
  if (!cars[data.hash]) {
    cars[data.hash] = data;
    return;
  }

  if (cars[data.hash].lastUpdate >= data.lastUpdate || data.hash === hash) {
    return;
  }

  var car = cars[data.hash];
  car.x = data.x;
  car.y = data.y;
  car.prevX = data.prevX;
  car.prevY = data.prevY;
  car.destX = data.destX;
  car.destY = data.destY;
  car.moveLeft = data.moveLeft;
  car.moveRight = data.moveRight;
  car.moveDown = data.moveDown;
  car.moveUp = data.moveUp;
  car.alpha = 0.05;
  car.velocity = data.velocity;
  car.acceleration = data.acceleration;
  car.drag = car.drag;
  car.state = car.state;
  car.fillStyle = car.fillStyle;
  car.size = car.size;
  car.health = car.health;
  car.pull = car.pull;
};

var hostLeft = function hostLeft() {
  socket.disconnect();
  cancelAnimationFrame(animationFrame);
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  fillText("Host left.", WIDTH / 2, HEIGHT / 2 - 210, "20pt Jura", "white");
  fillText("Reload for a new game.", WIDTH / 2, HEIGHT / 2 - 170, "20pt Jura", "white");
  ctx.restore();
};

var removeUser = function removeUser(data) {
  if (cars[data]) {
    console.log('Removed User: ');
    console.log(cars[data]);
    delete cars[data];
  }
};

var confirmHost = function confirmHost() {
  isHost = true;

  socket.on('movementUpdate', movementUpdate);
  socket.on('hostAcknowledge', acknowledgeUser);
};

var setUser = function setUser(data) {
  hash = data.hash;
  cars[hash] = data;
  console.log('This User:');
  console.log(cars[hash]);

  if (isHost) {
    hosted[hash] = data;
  }
  gameState === GAME_STATE.INGAME;
  requestAnimationFrame(drawCars);
};

var playerDeath = function playerDeath(data) {
  delete cars[data];

  if (data === hash) {
    socket.disconnect();
    cancelAnimationFrame(animationFrame);
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = 'white';
    ctx.font = '48px serif';
    ctx.fillText('You died', 20, 100);
    ctx.fillText('Reload for a new game.', 20, 200);
  }
};
