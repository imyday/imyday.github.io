"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub:data", []).provider("DataService", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "$get",
      value: function $get() {
        return {
          webpub: webpub //externalized webpub variable
        };
      }
    }]);

    return _class;
  }());
  angular.module("webpub:config", []).provider("ConfigService", function () {
    function _class2() {
      _classCallCheck(this, _class2);
    } // externalized config variable


    _createClass(_class2, [{
      key: "$get",
      value: function $get() {
        return config;
      }
    }]);

    return _class2;
  }());
  angular.module("webpub:additional-pages", []).provider("AdditionalPagesService", function () {
    function _class3() {
      _classCallCheck(this, _class3);
    } // externalized config variable


    _createClass(_class3, [{
      key: "$get",
      value: function $get() {
        return additionalPages;
      }
    }]);

    return _class3;
  }());

  angular.module("webpub", [
  // Start: Misc. Dependencies
  "ngRoute", "ngAnimate", "ui.router", "ui.tree", "ui.bootstrap", "ui.select", "angular.filter", "dibari.angular-ellipsis", "growlNotifications", "angularMoment", "angular-jwt", "webpub:data", "webpub:config", "webpub:additional-pages"]).config(["$stateProvider", "$locationProvider", "$urlRouterProvider", "DataServiceProvider", "AdditionalPagesServiceProvider", function ($stateProvider, $locationProvider, $urlRouterProvider, DataServiceProvider, AdditionalPagesServiceProvider) {
    $locationProvider.html5Mode(false);

    $urlRouterProvider.otherwise("/");

    var webpubData = DataServiceProvider.$get().webpub.data;

    function jwtGuard($state, jwt, $timeout, ConfigService) {
      var authEnabled = ConfigService.services && ConfigService.services.authEnabled;

      if (authEnabled && !jwt) {
        $timeout(function () {
          return $state.go("login", null);
        });
      }
    }

    $stateProvider.state("empty", {
      url: "",
      controller: function controller($state) {
        return $state.go("home");
      }
    }).state("index", {
      url: "/",
      controller: function controller($state) {
        return $state.go("home");
      }
    }).state("home", {
      url: "/home",
      templateProvider: function templateProvider(TemplateService) {
        return TemplateService.getIframeTemplate();
      },
      controller: "extraPageController",
      controllerAs: "$ctrl",
      resolve: {
        jwt: function jwt(LoginService, $stateParams) {
          return LoginService.checkAndResolveJWT("home", $stateParams);
        },
        pageName: function pageName($stateParams) {
          return "home";
        },
        location: function location($stateParams) {
          return "content/start.html";
        },
        pages: function pages() {
          return [];
        }
      },
      onEnter: jwtGuard
    }).state("toc", {
      url: "/toc/:index",
      templateProvider: function templateProvider(TemplateService) {
        return TemplateService.getToc();
      },
      controller: "tocController",
      controllerAs: "$ctrl",
      resolve: {
        jwt: function jwt(LoginService, $stateParams) {
          return LoginService.checkAndResolveJWT("toc", $stateParams);
        },
        conference: function conference($stateParams) {
          return webpubData.conferences[$stateParams.index];
        }
      },
      onEnter: jwtGuard
    }).state("author-index", {
      url: "/author-index",
      templateProvider: function templateProvider(TemplateService) {
        return TemplateService.getAuthorIndex();
      },
      controller: "authorIndexController",
      controllerAs: "$ctrl",
      resolve: {
        jwt: function jwt(LoginService, $stateParams) {
          return LoginService.checkAndResolveJWT("author-index", $stateParams);
        },
        authors: function authors() {
          return webpubData.authors;
        }
      },
      onEnter: jwtGuard
    }).state("affiliation-index", {
      url: "/affiliation-index",
      templateProvider: function templateProvider(TemplateService) {
        return TemplateService.getAffiliationIndex();
      },
      controller: "affiliationIndexController",
      controllerAs: "$ctrl",
      resolve: {
        jwt: function jwt(LoginService, $stateParams) {
          return LoginService.checkAndResolveJWT("affiliation-index", $stateParams);
        },
        affiliations: function affiliations() {
          return webpubData.affiliations;
        }
      },
      onEnter: jwtGuard
    }).state("search", {
      url: "/search",
      templateProvider: function templateProvider(TemplateService) {
        return TemplateService.getSearch();
      },
      controller: "searchController",
      controllerAs: "$ctrl",
      resolve: {
        jwt: function jwt(LoginService, $stateParams) {
          return LoginService.checkAndResolveJWT("search", $stateParams);
        },
        conferences: function conferences() {
          return webpubData.conferences;
        }
      },
      onEnter: jwtGuard
    }).state("login", {
      url: "/login",
      templateProvider: function templateProvider(TemplateService) {
        return TemplateService.getLogin();
      },
      controller: "loginController",
      controllerAs: "$ctrl"
    }).state("extra-page", {
      params: {
        pageName: null,
        location: null
      },
      url: "/pages/:pageName",
      templateProvider: function templateProvider(TemplateService) {
        return TemplateService.getIframeTemplate();
      },
      controller: "extraPageController",
      controllerAs: "$ctrl",
      resolve: {
        jwt: function jwt(LoginService, $stateParams) {
          return LoginService.checkAndResolveJWT("extra-page", $stateParams);
        },
        pageName: function pageName($stateParams) {
          return $stateParams.pageName;
        },
        location: function location($stateParams) {
          return $stateParams.location;
        },
        pages: function pages() {
          return AdditionalPagesServiceProvider;
        }
      },
      onEnter: jwtGuard
    });
  }]).run(["$rootScope", function ($rootScope) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
  }])
  // GDPR
  .run(["$window", "ConfigService", function ($window, ConfigService) {
    if (ConfigService.enableGDPR) {
      $window.cookieconsent.initialise(json);
    }
  }]);
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").controller("affiliationIndexController", function () {
    function affiliationIndexController(affiliations, FileService, $anchorScroll, $location, jwt) {
      _classCallCheck(this, affiliationIndexController);

      this.affiliations = affiliations;
      this.FileService = FileService;
      this.$anchorScroll = $anchorScroll;
      this.$location = $location;
      this.jwt = jwt;
    }

    _createClass(affiliationIndexController, [{
      key: "affiliationStartsWithLetter",
      value: function affiliationStartsWithLetter(affiliation, letter) {
        if (letter === "#") {
          // get alphabet letters
          var alphabet = _.tail(this.alphabet);

          // If there is no match for any alphabet letter then consider this a digit
          return !_.some(alphabet, function (nextLetter) {
            return affiliation.slice(0, 1).localeCompare(nextLetter, "en", {
              usage: "search",
              sensitivity: "base",
              ignorePunctuation: true
            }) === 0;
          });
        } else {
          // check if the string matches the current letter
          return affiliation.slice(0, 1).localeCompare(letter, "en", {
            usage: "search",
            sensitivity: "base",
            ignorePunctuation: true
          }) === 0;
        }
      }
    }, {
      key: "$onInit",
      value: function $onInit() {
        var _this = this;

        this.alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        var startIdx = 0;
        this.affiliationMap = this.alphabet.reduce(function (affiliationMap, letter) {
          // get the cutoff index
          // this is the start index of the next affiliations
          // the affiliations under the final alphabet listing with have cutoff = -1
          var cutOff = _this.affiliations.findIndex(function (a, idx) {
            return idx >= startIdx && !_this.affiliationStartsWithLetter(a.affiliation, letter);
          });

          if (cutOff >= 0) {
            // console.log(
            //   letter,
            //   startIdx,
            //   cutOff,
            //   this.affiliations.slice(startIdx, cutOff)
            // );
            affiliationMap[letter] = _this.affiliations.slice(startIdx, cutOff);
            startIdx = cutOff;
          }

          // handle the final affiliations
          else {
              // console.log(
              //   letter,
              //   startIdx,
              //   cutOff,
              //   this.affiliations.slice(startIdx)
              // );
              affiliationMap[letter] = _this.affiliations.slice(startIdx);
            }
          return affiliationMap;
        }, {});
        // console.log("affiliationMap: ", this.affiliationMap);
      }
    }, {
      key: "checkPdf",
      value: function checkPdf(location) {
        this.FileService.checkPdf(location);
      }
    }, {
      key: "scrollToAnchor",
      value: function scrollToAnchor(letter) {
        this.$location.hash(letter);
        this.$anchorScroll();
      }
    }]);

    return affiliationIndexController;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").controller("appController", function () {
    function AppController(ConfigService) {
      _classCallCheck(this, AppController);

      this.config = ConfigService;
    }

    _createClass(AppController, [{
      key: "$onInit",
      value: function $onInit() {
        this.title = this.config.proceeding.acronym + " " + this.config.proceeding.year;
      }
    }]);

    return AppController;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").controller("authorIndexController", function () {
    function authorIndexController(authors, FileService, $anchorScroll, $location, $state, jwt) {
      _classCallCheck(this, authorIndexController);

      this.authors = authors;
      this.FileService = FileService;
      this.$anchorScroll = $anchorScroll;
      this.$location = $location;
      this.$state = $state;
      this.jwt = jwt;
    }

    _createClass(authorIndexController, [{
      key: "authorNameStartsWithLetter",
      value: function authorNameStartsWithLetter(name, letter) {
        if (letter === "#") {
          // get alphabet letters
          var alphabet = _.tail(this.alphabet);

          // If there is no match for any alphabet letter then consider this a digit
          return !_.some(alphabet, function (nextLetter) {
            return name.slice(0, 1).localeCompare(nextLetter, "en", {
              usage: "search",
              sensitivity: "base",
              ignorePunctuation: true
            }) === 0;
          });
        } else {
          // check if the string matches the current letter
          return name.slice(0, 1).localeCompare(letter, "en", {
            usage: "search",
            sensitivity: "base",
            ignorePunctuation: true
          }) === 0;
        }
      }
    }, {
      key: "$onInit",
      value: function $onInit() {
        var _this = this;

        this.alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        var startIdx = 0;
        this.authorMap = this.alphabet.reduce(function (authorMap, letter) {
          // get the cutoff index
          // this is the start index of the next authors
          // the authors under the final alphabet listing with have cutoff = -1
          var cutOff = _this.authors.findIndex(function (a, idx) {
            return idx >= startIdx && !_this.authorNameStartsWithLetter(a.authorName, letter);
          });

          // apply the cutoff
          if (cutOff >= 0) {
            // console.log(
            //   "Building author map: letter: %s, startIdx: %s, cutOff: %s, authors: %s",
            //   letter,
            //   startIdx,
            //   cutOff,
            //   this.authors.slice(startIdx, cutOff)
            // );
            authorMap[letter] = _this.authors.slice(startIdx, cutOff);
            startIdx = cutOff;
          }
          // handle the final authors
          else {
              // console.log(
              //   "Adding final authors: letter: %s, startIdx: %s, cutOff: %s, authors: %s",
              //   letter,
              //   startIdx,
              //   cutOff,
              //   this.authors.slice(startIdx)
              // );
              authorMap[letter] = _this.authors.slice(startIdx);
            }
          return authorMap;
        }, {});
        this.authorMap["A"] = (this.authorMap["#"] || []).concat(this.authorMap["A"]);
        delete this.authorMap["#"];
        this.alphabet = this.alphabet.slice(1);
        // console.log("Final author map: %o", this.authorMap);
      }
    }, {
      key: "checkPdf",
      value: function checkPdf(location) {
        this.FileService.checkPdf(location);
      }
    }, {
      key: "scrollToAnchor",
      value: function scrollToAnchor(letter) {
        this.$location.hash(letter);
        this.$anchorScroll();
      }
    }]);

    return authorIndexController;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").controller("bannerController", function () {
    function bannerController(ConfigService) {
      _classCallCheck(this, bannerController);

      this.config = ConfigService;
    }

    _createClass(bannerController, [{
      key: "$onInit",
      value: function $onInit() {
        this.bannerFile = this.config.bannerFile;
      }
    }]);

    return bannerController;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").controller("extraPageController", function () {
    function extraPageController($state, pages, pageName, location, jwt) {
      _classCallCheck(this, extraPageController);

      this.$state = $state;
      this.pages = pages;
      this.pageName = pageName;
      this.location = location;
      this.jwt = jwt;
    }

    _createClass(extraPageController, [{
      key: "$onInit",
      value: function $onInit() {
        console.log("pageName: ", this.pageName);
        console.log("location: ", this.location);
        console.log("pages: ", this.pages);
      }
    }]);

    return extraPageController;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").controller("loginController", function () {
    function loginController(LoginService) {
      _classCallCheck(this, loginController);

      this.LoginService = LoginService;
    }

    _createClass(loginController, [{
      key: "$onInit",
      value: function $onInit() {}
    }, {
      key: "login",
      value: function login() {
        var _this = this;

        this.LoginService.login(this.username, this.password).catch(function (err) {
          _this.loading = false;
        });
        this.loading = true;
      }
    }]);

    return loginController;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").controller("navController", function () {
    function navController(DataService, ConfigService, AdditionalPagesService, NotificationService, LoginService, HTTPService) {
      _classCallCheck(this, navController);

      this.DataService = DataService;
      this.config = ConfigService;
      this.additionalPages = AdditionalPagesService;
      this.NotificationService = NotificationService;
      this.LoginService = LoginService;
      this.HTTPService = HTTPService;
    }

    _createClass(navController, [{
      key: "$onInit",
      value: function $onInit() {
        this.conferences = this.DataService.webpub.data.conferences;
        this.webpubDownloadEnabled = this.config.webpubDownload && this.config.webpubDownload.enabled;
        this.authEnabled = this.config.services && this.config.services.authEnabled;
      }
    }, {
      key: "onWebpubDownloadClicked",
      value: function onWebpubDownloadClicked($event) {
        $event.preventDefault();

        var downloadParams = "";
        var jwt = null;
        if (this.webpubDownloadEnabled) {
          if (this.authEnabled) {
            jwt = this.LoginService.checkAndResolveJWT();
            downloadParams = jwt ? "?token=" + jwt.token : "";
          }
        }
        var webpubDownloadLocation = "" + this.config.webpubDownload.location + downloadParams;

        // check if auth needed
        if (this.authEnabled && !jwt) {
          this.NotificationService.send("danger", "You must be logged in to do that.");
          return;
        }

        // track download if enabled
        // TODO move to service
        if (this.config.services && this.config.services.trackingEnabled) {
          var trackingURL = this.config.services && this.config.services.trackingURL;
          if (!trackingURL) {
            console.error("trackingURL not defined in config.services");
            return;
          }
          var strategy = this.config.services && this.config.services.strategy;
          if (!strategy) {
            console.error("strategy not defined in config.services");
            return;
          }

          this.HTTPService.post(trackingURL, {
            action: "webpub download",
            strategy: strategy
          }, jwt).catch(function (error) {
            console.error("Webpub download tracking error: ", error);
          });
        }

        window.open(webpubDownloadLocation, "_blank");
      }
    }]);

    return navController;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  var RESERVED_OBJECT_PROPERTIES = new Set(Object.getOwnPropertyNames(Object.prototype));

  angular.module("webpub").controller("searchController", function () {
    function searchController(conferences, FileService, jwt) {
      _classCallCheck(this, searchController);

      this.conferences = conferences;
      this.FileService = FileService;
      this.jwt = jwt;
    }

    _createClass(searchController, [{
      key: "$onInit",
      value: function $onInit() {
        this.searchMap = this.conferences.reduce(function (searchMap, conference) {
          conference.sections.forEach(function (section) {
            section.lineItems.forEach(function (entry) {
              entry.searchText.toLowerCase().split(" ").forEach(function (token) {
                var isTokenReserved = RESERVED_OBJECT_PROPERTIES.has(token);
                token = isTokenReserved ? "___" + token : token;
                var entryList = searchMap[token] || [];
                entryList.push(entry);
                searchMap[token] = entryList;
              });
            });
          });
          return searchMap;
        }, {});

        this.eidMap = this.conferences.reduce(function (eidMap, conference) {
          conference.sections.forEach(function (section) {
            section.lineItems.forEach(function (entry) {
              eidMap[entry.eid] = entry;
            });
          });
          return eidMap;
        }, {});
      }
    }, {
      key: "checkPdf",
      value: function checkPdf(item) {
        this.FileService.checkPdf(item.articleLocation);
      }
    }, {
      key: "getAbstract",
      value: function getAbstract(entry) {
        return entry.abstract || "No abstract provided";
      }
    }, {
      key: "searchInput",
      value: function searchInput() {
        var _this = this;

        if (this.searchTerm.length < 3) return;

        var hitMap = this.searchTerm.split(" ").filter(function (token) {
          return token;
        }).reduce(function (hitMap, token) {
          var isTokenReserved = RESERVED_OBJECT_PROPERTIES.has(token.toLowerCase());
          token = (isTokenReserved ? "___" + token : token).toLowerCase();
          if (!_this.searchMap[token]) return hitMap;

          _this.searchMap[token].forEach(function (entry) {
            var hits = hitMap[entry.eid] || 0;
            hits += 1;
            hitMap[entry.eid] = hits;
          });

          return hitMap;
        }, {});

        this.searchResults = Object.keys(hitMap).map(function (eid) {
          return {
            entry: _this.eidMap[eid],
            hits: hitMap[eid]
          };
        }).sort(function (a, b) {
          return b.hits - a.hits;
        }).map(function (result) {
          return result.entry;
        });

        console.log("results: ", this.searchResults);
      }
    }]);

    return searchController;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").controller("tocController", function () {
    function tocController(conference, FileService, $scope, $location, $anchorScroll, VideoPlayerService, ConfigService, jwt) {
      _classCallCheck(this, tocController);

      this.conference = conference;
      this.FileService = FileService;
      this.$scope = $scope;
      this.$location = $location;
      this.$anchorScroll = $anchorScroll;
      this.VideoPlayerService = VideoPlayerService;
      this.ConfigService = ConfigService;
      this.jwt = jwt;
    }

    _createClass(tocController, [{
      key: "$onInit",
      value: function $onInit() {
        var _this = this;

        this.playerSetting = this.ConfigService.videoPlayer || "default";
        this.conference.backMatter = this.conference.backMatter.filter(function (entry) {
          return entry.type !== "BM_ROSTER";
        });
        this.anchors = [{ name: "Jump to Section...", value: "jump" }, { name: "\u2022 Front Matter", value: "FrontMatter" }].concat(this.conference.sections.map(function (s) {
          var indent = s.type === "SD_TRACK" ? "" : s.type === "SD_SESSION" ? "\xA0\xA0\xA0" : "\xA0\xA0\xA0\xA0\xA0\xA0";
          console.log(s);
          return {
            name: indent + "\u2022\xA0" + s.title,
            value: _this.getTitleId(s.title)
          };
        })).concat([{ name: "\u2022 Back Matter", value: "BackMatter" }]);
        this.selectedAnchor = "jump";

        this.$scope.$watch(function () {
          return _this.selectedAnchor;
        }, function () {
          if (_this.selectedAnchor !== "jump") {
            _this.$location.hash(_this.selectedAnchor);
            _this.$anchorScroll();
          }
        });
      }
    }, {
      key: "checkPdf",
      value: function checkPdf(item) {
        this.FileService.checkPdf(item.articleLocation);
      }
    }, {
      key: "handleExtraClick",
      value: function handleExtraClick(entry, extra, $event) {
        // if the extra is a video -> defer to the video player service
        if (this.useVideoPlayer(extra)) {
          $event.preventDefault();
          this.VideoPlayerService.openVideo(entry, extra, this.jwt).catch(function (err) {
            return console.error(err);
          });
        }
        // Otherwise check that the file exists -> display a notification if not found
        else {
            this.FileService.checkExtra(extra.location);
          }
      }
    }, {
      key: "useVideoPlayer",
      value: function useVideoPlayer(extra) {
        return this.VideoPlayerService.isMP4(extra.location) && this.playerSetting !== "link";
      }
    }, {
      key: "getTitleId",
      value: function getTitleId(title) {
        return title.replace(/ /g, "");
      }
    }, {
      key: "getSectionClass",
      value: function getSectionClass(section) {
        if (section.class === "SD") if (section.type === "SD_SESSION") {
          return "h4";
        } else if (section.type === "SD_SUBSESSION") {
          return "h5";
        } else if (section.type === "SD_TRACK") {
          return "h3";
        }
      }
    }, {
      key: "chairName",
      value: function chairName(section) {
        return section.chair && section.chair.title && section.chair.name ? section.chair.title + ": " + section.chair.name : "";
      }
    }]);

    return tocController;
  }());
})();
"use strict";

(function () {
  "use strict";

  angular.module("webpub").filter("entryPageNumberFilter", function () {
    return function (entry) {
      if (!entry) return entry;
      if (!entry.pageNumber) return entry.pageNumber;
      if (entry.isPageNumberRoman) {
        return toRoman(entry.pageNumber);
      } else {
        return entry.pageNumber;
      }
    };
  });

  function toRoman(num) {
    var result = "";
    var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var roman = ["m", "cm", "d", "cd", "c", "xc", "l", "xl", "x", "ix", "v", "iv", "i"];
    for (var i = 0; i <= decimal.length; i++) {
      while (num % decimal[i] < num) {
        result += roman[i];
        num -= decimal[i];
      }
    }
    return result;
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("webpub").filter("extraLinkFilter", ["ConfigService", "VideoPlayerService", function (ConfigService, VideoPlayerService) {
    var playerSetting = ConfigService.videoPlayer || "default";
    return function (extra) {
      // if its an MP4 video and we're not using "link" mode
      // return an empty link
      if (VideoPlayerService.isMP4(extra.location) && playerSetting !== "link") {
        return "#";
      }
      // otherwise return a link to the extra file
      else {
          return extra.location;
        }
    };
  }]);
})();
"use strict";

(function () {
  "use strict";

  angular.module("webpub").filter("fileUrlFilter", [function () {
    return function (url, jwt) {
      var tokenParam = jwt ? "?token=" + jwt.token : "";
      return "" + url + tokenParam;
    };
  }]);
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").provider("FileService", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "$get",
      value: function $get($window, NotificationService) {
        function checkFile(type, location) {
          if (!location) {
            NotificationService.send("danger", type + " file not found for article");
          }
        }

        function checkPdf(location) {
          return checkFile("PDF", location);
        }

        function checkExtra(location) {
          return checkFile("Extra", location);
        }

        return {
          checkPdf: checkPdf,
          checkExtra: checkExtra
        };
      }
    }]);

    return _class;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").provider("HTTPService", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "$get",
      value: function $get($http) {
        var get = function get(url) {
          return $http({
            url: url,
            method: "GET"
            // headers: {
            //   'Content-Type': 'application/json; charset=utf-8'
            // }
          });
        };

        var post = function post(url, body, jwt) {
          var postOptions = {
            url: url,
            method: "POST",
            data: body,
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          };
          if (jwt) {
            postOptions.headers.Authorization = "Bearer " + jwt.token;
          }
          return $http(postOptions);
        };

        return {
          get: get,
          post: post
        };
      }
    }]);

    return _class;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").provider("LoginService", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "verifyConfigHasFields",
      value: function verifyConfigHasFields(config, fields) {
        if (!config.services) {
          throw new Error("Services not defined in config");
        }
        fields.forEach(function (fieldName) {
          if (!config.services[fieldName]) {
            throw new Error(fieldName + " is not defined in config.services");
          }
        });
        return config.services;
      }
    }, {
      key: "$get",
      value: function $get(moment, $state, ConfigService, HTTPService, NotificationService, jwtHelper) {
        var _this = this;

        // this will only hold one element, but we want to use the push and pop methods
        var returnState = [];

        var login = function login(username, password) {
          var _verifyConfigHasField = _this.verifyConfigHasFields(ConfigService, ["confId", "strategy", "loginURL"]),
              confId = _verifyConfigHasField.confId,
              strategy = _verifyConfigHasField.strategy,
              loginURL = _verifyConfigHasField.loginURL;

          return HTTPService.post(loginURL, {
            username: username,
            password: password,
            confId: confId,
            strategy: strategy
          }).then(function (response) {
            storeJWTtoLocalStorage(response.data.jwt);

            var _ref = returnState.pop() || {
              state: "home",
              stateParams: {}
            },
                state = _ref.state,
                stateParams = _ref.stateParams;

            $state.go(state, stateParams);
          }).catch(function (error) {
            console.error("Login Error: ", error);
            NotificationService.send("danger", "Invalid username or password");
            throw error;
          });
        };

        var checkAndResolveJWT = function checkAndResolveJWT(currentState, stateParams) {
          if (!ConfigService.services || !ConfigService.services.authEnabled) {
            return null;
          }

          var _verifyConfigHasField2 = _this.verifyConfigHasFields(ConfigService, ["confId"]),
              confId = _verifyConfigHasField2.confId;

          var jwtString = localStorage.getItem(confId + "_JWT");

          // check if a JWT exists
          if (!jwtString) {
            console.error("JWT not found");
            if (currentState) {
              returnState.push({ state: currentState, stateParams: stateParams });
            }
            return null;
          }

          // check the expiration date
          if (jwtHelper.isTokenExpired(jwtString)) {
            console.error("JWT is expired");
            if (currentState) {
              returnState.push({ state: currentState, stateParams: stateParams });
            }
            return null;
          }

          // return the jwtString and decodedJWT if the above checks pass
          return {
            token: jwtString,
            data: jwtHelper.decodeToken(jwtString)
          };
        };

        var storeJWTtoLocalStorage = function storeJWTtoLocalStorage(jwtToken) {
          var _verifyConfigHasField3 = _this.verifyConfigHasFields(ConfigService, ["confId"]),
              confId = _verifyConfigHasField3.confId;

          localStorage.setItem(confId + "_JWT", jwtToken);
        };

        return {
          login: login,
          checkAndResolveJWT: checkAndResolveJWT
        };
      }
    }]);

    return _class;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").provider("NotificationService", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "$get",
      value: function $get() {
        var notifications = [];
        var send = function send(type, message) {
          notifications.push({
            type: type,
            message: message
          });
        };
        return {
          notifications: notifications,
          send: send
        };
      }
    }]);

    return _class;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").provider("TemplateService", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "$get",
      value: function $get(helloTemplate, tocTemplate, authorIndexTemplate, iframeTemplate, searchTemplate, affiliationIndexTemplate, videoPlayerModalTemplate, loginTemplate) {
        return {
          getHello: function getHello() {
            return helloTemplate.content();
          },
          getToc: function getToc() {
            return tocTemplate.content();
          },
          getAuthorIndex: function getAuthorIndex() {
            return authorIndexTemplate.content();
          },
          getAffiliationIndex: function getAffiliationIndex() {
            return affiliationIndexTemplate.content();
          },
          getIframeTemplate: function getIframeTemplate() {
            return iframeTemplate.content();
          },
          getSearch: function getSearch() {
            return searchTemplate.content();
          },
          getVideoPlayer: function getVideoPlayer() {
            return videoPlayerModalTemplate.content();
          },
          getLogin: function getLogin() {
            return loginTemplate.content();
          }
        };
      }
    }]);

    return _class;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").provider("VideoPlayerService", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "$get",
      value: function $get($uibModal, ConfigService) {
        function isMP4(filename) {
          return filename.split(".").slice(-1)[0].toLowerCase() === "mp4";
        }

        function openVideo(_entry, _extra, _jwt) {
          var modal = $uibModal.open({
            component: "webpubVideoPlayerModal",
            size: "lg",
            resolve: {
              entry: function entry() {
                return _entry;
              },
              extra: function extra() {
                return _extra;
              },
              jwt: function jwt() {
                return _jwt;
              },
              playerSetting: getPlayerSetting
            }
          });

          return modal.result;
        }

        function getPlayerSetting() {
          var configSetting = ConfigService.videoPlayer;
          console.log("player configuration setting: ", configSetting);
          if (configSetting && configSetting !== "default") {
            return configSetting;
          } else {
            var proto = window.location.protocol;
            if (proto.toLowerCase().startsWith("file")) {
              console.log("Detected file protocol");
              return "native";
            } else {
              console.log("Detected hosted protocol");
              return "native";
            }
          }
        }

        return {
          openVideo: openVideo,
          isMP4: isMP4
        };
      }
    }]);

    return _class;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").component("webpubNotifications", {
    bindings: {},
    controller: function () {
      function controller(NotificationService) {
        _classCallCheck(this, controller);

        this.NotificationService = NotificationService;
      }

      _createClass(controller, [{
        key: "$onInit",
        value: function $onInit() {
          this.notifications = this.NotificationService.notifications;
        }
      }]);

      return controller;
    }(),
    template: "<!-- Hide the notifications module until the application loads. -->\n                <div data-ng-cloak>\n                    <div class=\"notifications\"\n                         data-growl-notifications\n                         data-ng-if=\"$ctrl.notifications\">\n                \n                        <!-- (notifications) Notifications list -->\n                        <div data-ng-repeat=\"notification in $ctrl.notifications\">\n                            <div class=\"notification fading\"\n                                 data-growl-notification\n                                 data-ng-class=\"notification.type\">{{ notification.message }}</div>\n                        </div>                \n                    </div>\n                </div>\n                "
  });
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").component("webpubVideoPlayerModal", {
    bindings: {
      close: "&",
      dismiss: "&",
      size: "@",
      resolve: "<"
    },
    template: function template(TemplateService) {
      return TemplateService.getVideoPlayer();
    },
    controller: function () {
      function controller($scope) {
        _classCallCheck(this, controller);

        this.$scope = $scope;
      }

      _createClass(controller, [{
        key: "$onInit",
        value: function $onInit() {
          var _this = this;

          // handle resolves
          this.entry = this.resolve.entry;
          this.extra = this.resolve.extra;
          this.playerSetting = this.resolve.playerSetting;
          this.jwt = this.resolve.jwt;

          // declare helper variables
          var playerSetting = this.playerSetting;
          this.isNative = false;
          this.isVideoJs = false;
          this.isMediaElement = false;

          // set player type variables
          if (playerSetting === "videojs") {
            this.isVideoJs = true;
          } else if (playerSetting === "mediaelement") {
            this.isMediaElement = true;
          } else {
            this.isNative = true;
          }

          // clean up non-native player objects when modal closes
          this.$scope.$on("modal.closing", function (event, reason, closed) {
            console.log("modal closing: ", event, reason, closed);
            if (_this.isVideoJs) {
              // call dispose if player type is videoJs
              _this.videoPlayer.dispose();
            } else if (_this.isMediaElement) {
              // pause then remove player if type is MediaElement
              if (!_this.videoPlayer.paused) {
                _this.videoPlayer.pause();
              }
              _this.videoPlayer.remove();
            }
          });
        }

        // $postLink is called after components and children are added to DOM

      }, {
        key: "$postLink",
        value: function $postLink() {
          this.setSource();
          // initialize MediaElement player
          if (this.isMediaElement) {
            this.videoPlayer = new MediaElementPlayer("videoPlayer", {
              defaultVideoHeight: 480,
              autoplay: true,
              success: function success(mediaElement, node, instance) {
                console.log("Media element player is loaded: ", mediaElement, node, instance);
                node.classList.add("height-width-100");
              },
              error: function error(_error, mediaElement, node) {
                console.error("Error loading media element player: ", _error, media, node);
              }
            });
          }
          // initialize videoJs player
          else if (this.isVideoJs) {
              this.setSource();
              this.setVideoClasses();
              this.videoPlayer = videojs("videoPlayer");
            }
            // initialize Native Video Source
            else {
                this.setVideoClasses();
                this.setSource();
              }
        }
      }, {
        key: "onClose",
        value: function onClose() {
          this.close();
        }

        /** The videoJs API seemed to not set the video source properly when using the usual angular handlebars
         * Good ol' JQuery should do the trick
         */

      }, {
        key: "setSource",
        value: function setSource() {
          var videoSource = angular.element("#videoSource");
          var jwtParam = this.jwt ? "?token=" + this.jwt.token : "";
          videoSource.attr("src", "" + this.extra.location + jwtParam);
        }

        /**
         * Set classes specific to the video player being used
         * This seems to work better in JQuery for some players
         */

      }, {
        key: "setVideoClasses",
        value: function setVideoClasses() {
          var videoPlayer = angular.element("#videoPlayer");
          var videoWrapper = angular.element("#videoWrapper");
          if (this.isVideoJs) {
            videoPlayer.addClass("video-js vjs-16-9");
          } else if (this.isMediaElement) {
            videoPlayer.addClass("height-width-100");
          } else {
            videoPlayer.attr("height", 480);
            videoPlayer.css({ width: "100%", outline: "none" });
            videoWrapper.css("background-color", "#000");
          }
        }
      }]);

      return controller;
    }()
  });
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    "use strict";

    angular.module("webpub").provider("affiliationIndexTemplate", function () {
        function _class() {
            _classCallCheck(this, _class);
        }

        _createClass(_class, [{
            key: "$get",
            value: function $get() {
                var content = function content() {
                    return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"btn-toolbar pt\" role=\"toolbar\">\n            <div class=\"btn-group\">\n                <button class=\"btn btn-default\" data-ng-repeat=\"letter in $ctrl.alphabet\" data-ng-click=\"$ctrl.scrollToAnchor(letter)\">{{letter}}</button>\n            </div>\n        </div>\n    </div>    \n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <h1>Affiliation Index</h1>\n        <div data-ng-repeat=\"letter in $ctrl.alphabet\">\n            <h3 id=\"{{letter}}\">{{letter}}</h3>\n            <div data-ng-repeat=\"aff in $ctrl.affiliationMap[letter]\">\n                <p style=\"margin-bottom: 0\">{{aff.affiliation}}</p>\n                <div data-ng-repeat=\"article in aff.articleRefs\"\n                     style=\"margin-bottom: 5px\">\n                    <p data-ng-if=\"!article.articleLocation\" style=\"color: #23527c;\">{{article.articleName}}</p>\n                    <a data-ng-if=\"article.articleLocation\" data-ng-href=\"{{article.articleLocation | fileUrlFilter : $ctrl.jwt}}\" target=\"_blank\" data-ng-click=\"$ctrl.checkPdf(article.articleLocation)\">{{article.articleName}}</a>\n                </div>\n            </div>\n        </div>        \n    </div>\n</div>\n\n";
                };

                return {
                    content: content
                };
            }
        }]);

        return _class;
    }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    "use strict";

    angular.module("webpub").provider("authorIndexTemplate", function () {
        function _class() {
            _classCallCheck(this, _class);
        }

        _createClass(_class, [{
            key: "$get",
            value: function $get() {
                var content = function content() {
                    return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"btn-toolbar pt\" role=\"toolbar\">\n            <div class=\"btn-group\">\n                <button class=\"btn btn-default\" data-ng-repeat=\"letter in $ctrl.alphabet\" data-ng-click=\"$ctrl.scrollToAnchor(letter)\">{{letter}}</button>\n            </div>\n        </div>\n    </div>    \n</div>\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <h1>Author Index</h1>\n        <div data-ng-repeat=\"letter in $ctrl.alphabet\">\n            <h3 id=\"{{letter}}\">{{letter}}</h3>\n            <div data-ng-repeat=\"author in $ctrl.authorMap[letter]\">\n                <p style=\"margin-bottom: 0\">{{author.authorName}}</p>\n                <div data-ng-repeat=\"article in author.articleRefs\"\n                     style=\"margin-bottom: 5px\">\n                    <p data-ng-if=\"!article.articleLocation\" style=\"color: #23527c;\">{{article.articleName}}</p>\n                    <a data-ng-if=\"article.articleLocation\" data-ng-href=\"{{article.articleLocation | fileUrlFilter : $ctrl.jwt}}\" target=\"_blank\" data-ng-click=\"$ctrl.checkPdf(article.articleLocation)\">{{article.articleName}}</a>\n                </div>\n            </div>\n        </div>        \n    </div>\n</div>\n\n";
                };

                return {
                    content: content
                };
            }
        }]);

        return _class;
    }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").provider("helloTemplate", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "$get",
      value: function $get() {
        var content = function content() {
          return "\n                        <div>{{$ctrl.hello()}}</div>\n                    ";
        };

        return {
          content: content
        };
      }
    }]);

    return _class;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").provider("iframeTemplate", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "$get",
      value: function $get() {
        var content = function content() {
          return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"embed-responsive embed-responsive-16by9\">\n            <iframe class=\"embed-responsive-item\" data-ng-src=\"{{$ctrl.location}}\"></iframe>\n        </div>        \n    </div>\n</div>";
        };

        return {
          content: content
        };
      }
    }]);

    return _class;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").provider("loginTemplate", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "$get",
      value: function $get() {
        var content = function content() {
          return "\n          <div class=\"login-wrapper\">\n            <div class=\"login-formContent\">\n              <!-- Title -->\n              <div>\n                <h1 class=\"login-title\">Sign In</h1>\n              </div>\n        \n              <!-- Login Form -->\n              <form data-ng-hide=\"$ctrl.loading\" ng-submit=\"$ctrl.login()\">\n                <input type=\"text\" id=\"login\" name=\"login\" placeholder=\"Username\" class=\"login-input\" data-ng-model=\"$ctrl.username\">\n                <input type=\"password\" id=\"password\" name=\"login\" placeholder=\"Password\" class=\"login-input\" data-ng-model=\"$ctrl.password\">\n                <input data-ng-hide=$ctrl.loading type=\"submit\" class=\"login-button\" value=\"Sign In\">\n              </form>\n              \n              <div data-ng-show=\"$ctrl.loading\" class=\"pv-lg\">\n                <i class=\"fa fa-circle-o-notch fa-spin fa-3x fa-fw loading\"></i>\n                <span class=\"sr-only\">Loading...</span>\n              </div>\n              \n        \n              <!-- Remind Passowrd -->\n              <!-- <div class=\"login-formFooter\">\n                <a class=\"underlineHover\" href=\"#\">Go to the Site</a>\n              </div> -->\n        \n            </div>\n          </div>";
        };

        return {
          content: content
        };
      }
    }]);

    return _class;
  }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    "use strict";

    angular.module("webpub").provider("searchTemplate", function () {
        function _class() {
            _classCallCheck(this, _class);
        }

        _createClass(_class, [{
            key: "$get",
            value: function $get() {
                var content = function content() {
                    return "<div class=\"row mt-lg\">\n    <div class=\"col-md-12\">\n        <div class=\"input-group custom-search-form\">\n            <input type=\"text\" class=\"form-control\" data-ng-change=\"$ctrl.searchInput()\" data-ng-model=\"$ctrl.searchTerm\" placeholder=\"Search...\">\n            <span class=\"input-group-btn\">\n                <button class=\"btn btn-default\" type=\"button\">\n                    <i class=\"fa fa-search\"></i>\n                </button>\n            </span>\n        </div>\n        <hr>\n        <h3 data-ng-if=\"$ctrl.searchResults && $ctrl.searchResults.length\">Results:</h3>\n        <div data-ng-repeat=\"result in $ctrl.searchResults\">\n            <p data-ng-if=\"!result.articleLocation\" class=\"text-bold\" style=\"color: #23527c;\">{{result.text}}</p>\n            <a data-ng-if=\"result.articleLocation\" class=\"text-bold\" data-ng-href=\"{{result.articleLocation | fileUrlFilter : $ctrl.jwt}}\" target=\"_blank\" ng-click=\"$ctrl.checkPdf(result)\">{{result.text}}</a>\n            <p class=\"pl-lg\"><em>{{result.authorNames}}</em></p>\n            <p class=\"pl-lg search-result\" data-ng-bind=\"$ctrl.getAbstract(result)\" data-ellipsis></p>\n        </div>\n    </div>\n</div>";
                };

                return {
                    content: content
                };
            }
        }]);

        return _class;
    }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
    "use strict";

    angular.module("webpub").provider("tocTemplate", function () {
        function _class() {
            _classCallCheck(this, _class);
        }

        _createClass(_class, [{
            key: "$get",
            value: function $get() {
                var content = function content() {
                    return "<div class=\"row\">\n    <div class=\"col-md-12\">\n        <div class=\"row\">\n            <div class=\"col-xs-8\">\n                <h1 class=\"text-bold\">{{$ctrl.conference.acronym}} {{$ctrl.conference.year}}</h1>\n            </div>\n            <div class=\"col-xs-4\">\n                <select class=\"form-control mt-xl\"\n                    data-ng-model=\"$ctrl.selectedAnchor\"\n                    data-ng-options=\"anchor.value as anchor.name for anchor in $ctrl.anchors\">                    \n                </select>\n            </div>\n        </div>        \n        <h2>{{$ctrl.conference.title}}</h2>\n        <h3>Table of Contents</h3>\n        <h3 class=\"text-bold\" id=\"FrontMatter\">Front Matter<span class=\"pull-right text-normal\">Page Number</span></h3>\n        <div data-ng-repeat=\"fm in $ctrl.conference.frontMatter\">\n            <p data-ng-if=\"!fm.articleLocation\" class=\"text-bold\" style=\"color: #23527c;\">{{fm.text}}<span class=\"pull-right\">{{fm | entryPageNumberFilter}}</p>\n            <a data-ng-if=\"fm.articleLocation\" class=\"text-bold\" data-ng-href=\"{{fm.articleLocation | fileUrlFilter : $ctrl.jwt}}\" target=\"_blank\" ng-click=\"$ctrl.checkPdf(fm)\">{{fm.text}}<span class=\"pull-right\">{{fm | entryPageNumberFilter}}</span></a>\n            <div data-ng-repeat=\"extra in fm.extraLocations\" class=\"pb\">\n                <a class=\"pl-lg\" data-ng-href=\"{{extra | extraLinkFilter | fileUrlFilter : $ctrl.jwt}}\" target=\"_blank\" data-ng-click=\"$ctrl.handleExtraClick(fm, extra, $event)\">\n                  <span data-ng-if=\"$ctrl.useVideoPlayer(extra)\" class=\"fa fa-video-camera mr-sm\"></span>\n                  {{extra.name}}\n                </a>\n            </div>\n        </div>\n        <div data-ng-repeat=\"section in $ctrl.conference.sections\">\n            <hr>\n            <h3 class=\"text-bold\" data-ng-class=\"$ctrl.getSectionClass(section)\" id=\"{{$ctrl.getTitleId(section.title)}}\">{{section.title}}</h3>\n            <p class=\"text-bold\">{{$ctrl.chairName(section)}}</p>\n            <div data-ng-repeat=\"item in section.lineItems\">\n                <p data-ng-if=\"!item.articleLocation\" class=\"text-bold\" style=\"color: #23527c;\">{{item.text}}<span class=\"pull-right\">{{item | entryPageNumberFilter}}</span></p>\n                <a data-ng-if=\"item.articleLocation\" class=\"text-bold\" data-ng-href=\"{{item.articleLocation | fileUrlFilter : $ctrl.jwt}}\" target=\"_blank\" ng-click=\"$ctrl.checkPdf(item)\">{{item.text}}<span class=\"pull-right\">{{item | entryPageNumberFilter}}</span></a>\n                <p class=\"pl-lg\"><em>{{item.authorNames}}</em></p>\n                <div data-ng-repeat=\"extra in item.extraLocations\" class=\"pb\">\n                    <a class=\"pl-lg\" data-ng-href=\"{{extra | extraLinkFilter | fileUrlFilter : $ctrl.jwt}}\" target=\"_blank\" data-ng-click=\"$ctrl.handleExtraClick(item, extra, $event)\">\n                      <span data-ng-if=\"$ctrl.useVideoPlayer(extra)\" class=\"fa fa-video-camera mr-sm\"></span>\n                      {{extra.name}}\n                    </a>                    \n                </div>\n                \n            </div>\n        </div>\n        <hr>\n        <h3 class=\"text-bold\" id=\"BackMatter\"></h3>\n        <div data-ng-repeat=\"bm in $ctrl.conference.backMatter\">\n            <p data-ng-if=\"!bm.articleLocation\" class=\"text-bold\" style=\"color: #23527c;\">{{bm.text}}<span class=\"pull-right\">{{bm | entryPageNumberFilter}}</span></p>\n            <a data-ng-if=\"bm.articleLocation\" class=\"text-bold\" data-ng-href=\"{{bm.articleLocation | fileUrlFilter : $ctrl.jwt}}\" target=\"_blank\" ng-click=\"$ctrl.checkPdf(bm)\">{{bm.text}}<span class=\"pull-right\">{{bm | entryPageNumberFilter}}</span></a>\n            <div data-ng-repeat=\"extra in bm.extraLocations\" class=\"pb\">\n                <a class=\"pl-lg\" data-ng-href=\"{{extra | extraLinkFilter | fileUrlFilter : $ctrl.jwt}}\" target=\"_blank\" data-ng-click=\"$ctrl.handleExtraClick(bm, extra, $event)\">\n                    <span data-ng-if=\"$ctrl.useVideoPlayer(extra)\" class=\"fa fa-video-camera mr-sm\"></span>\n                    {{extra.name}}\n                </a>\n            </div>\n        </div>\n    </div>\n</div>\n";
                };

                return {
                    content: content
                };
            }
        }]);

        return _class;
    }());
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  angular.module("webpub").provider("videoPlayerModalTemplate", function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    _createClass(_class, [{
      key: "$get",
      value: function $get() {
        var content = function content() {
          return "\n<div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" data-ng-click=\"$ctrl.onClose()\"><span>&times;</span></button>\n    <h4 class=\"modal-title\">{{$ctrl.entry.text}}&nbsp;{{$ctrl.playerSetting}}</h4>\n</div>\n<div class=\"modal-body\" id=\"modal-body\">\n    <div id=\"videoWrapper\">\n        <video id=\"videoPlayer\" controls=\"controls\" autoplay>\n            <source id=videoSource src=\"\" type=\"video/mp4\" />\n        </video> \n    </div>          \n</div>\n";
        };

        return {
          content: content
        };
      }
    }]);

    return _class;
  }());
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzL2FmZmlsaWF0aW9uLWluZGV4LmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9hcHAuY29udHJvbGxlci5qcyIsImNvbnRyb2xsZXJzL2F1dGhvci1pbmRleC5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvYmFubmVyLmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9leHRyYS1wYWdlLmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy9sb2dpbi5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvbmF2bWVudS5jb250cm9sbGVyLmpzIiwiY29udHJvbGxlcnMvc2VhcmNoLmNvbnRyb2xsZXIuanMiLCJjb250cm9sbGVycy90b2MuY29udHJvbGxlci5qcyIsImZpbHRlcnMvZW50cnktcGFnZS1udW1iZXItZmlsdGVyLmpzIiwiZmlsdGVycy9leHRyYS1saW5rLWZpbHRlci5qcyIsImZpbHRlcnMvZmlsZS11cmwtZmlsdGVyLmpzIiwic2VydmljZXMvZmlsZS5zZXJ2aWNlLmpzIiwic2VydmljZXMvaHR0cC5zZXJ2aWNlLmpzIiwic2VydmljZXMvbG9naW4uc2VydmljZS5qcyIsInNlcnZpY2VzL25vdGlmaWNhdGlvbi5zZXJ2aWNlLmpzIiwic2VydmljZXMvdGVtcGxhdGUuc2VydmljZS5qcyIsInNlcnZpY2VzL3ZpZGVvLXBsYXllci5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9ub3RpZmljYXRpb25zL25vdGlmaWNhdGlvbnMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy92aWRlby1wbGF5ZXIvdmlkZW8tcGxheWVyLW1vZGFsLmNvbXBvbmVudC5qcyIsInNlcnZpY2VzL3RlbXBsYXRlcy9hZmZpbGlhdGlvbi1pbmRleC50ZW1wbGF0ZS5qcyIsInNlcnZpY2VzL3RlbXBsYXRlcy9hdXRob3ItaW5kZXgudGVtcGxhdGUuanMiLCJzZXJ2aWNlcy90ZW1wbGF0ZXMvaGVsbG8udGVtcGxhdGUuanMiLCJzZXJ2aWNlcy90ZW1wbGF0ZXMvaWZyYW1lLnRlbXBsYXRlLmpzIiwic2VydmljZXMvdGVtcGxhdGVzL2xvZ2luLnRlbXBsYXRlLmpzIiwic2VydmljZXMvdGVtcGxhdGVzL3NlYXJjaC50ZW1wbGF0ZS5qcyIsInNlcnZpY2VzL3RlbXBsYXRlcy90b2MudGVtcGxhdGUuanMiLCJzZXJ2aWNlcy90ZW1wbGF0ZXMvdmlkZW8tcGxheWVyLW1vZGFsLnRlbXBsYXRlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJwcm92aWRlciIsIndlYnB1YiIsImNvbmZpZyIsImFkZGl0aW9uYWxQYWdlcyIsIiRzdGF0ZVByb3ZpZGVyIiwiJGxvY2F0aW9uUHJvdmlkZXIiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJEYXRhU2VydmljZVByb3ZpZGVyIiwiQWRkaXRpb25hbFBhZ2VzU2VydmljZVByb3ZpZGVyIiwiaHRtbDVNb2RlIiwib3RoZXJ3aXNlIiwid2VicHViRGF0YSIsIiRnZXQiLCJkYXRhIiwiand0R3VhcmQiLCIkc3RhdGUiLCJqd3QiLCIkdGltZW91dCIsIkNvbmZpZ1NlcnZpY2UiLCJhdXRoRW5hYmxlZCIsInNlcnZpY2VzIiwiZ28iLCJzdGF0ZSIsInVybCIsImNvbnRyb2xsZXIiLCJ0ZW1wbGF0ZVByb3ZpZGVyIiwiVGVtcGxhdGVTZXJ2aWNlIiwiZ2V0SWZyYW1lVGVtcGxhdGUiLCJjb250cm9sbGVyQXMiLCJyZXNvbHZlIiwiTG9naW5TZXJ2aWNlIiwiJHN0YXRlUGFyYW1zIiwiY2hlY2tBbmRSZXNvbHZlSldUIiwicGFnZU5hbWUiLCJsb2NhdGlvbiIsInBhZ2VzIiwib25FbnRlciIsImdldFRvYyIsImNvbmZlcmVuY2UiLCJjb25mZXJlbmNlcyIsImluZGV4IiwiZ2V0QXV0aG9ySW5kZXgiLCJhdXRob3JzIiwiZ2V0QWZmaWxpYXRpb25JbmRleCIsImFmZmlsaWF0aW9ucyIsImdldFNlYXJjaCIsImdldExvZ2luIiwicGFyYW1zIiwicnVuIiwiJHJvb3RTY29wZSIsIiRvbiIsImNvbnNvbGUiLCJsb2ciLCJiaW5kIiwiJHdpbmRvdyIsImVuYWJsZUdEUFIiLCJjb29raWVjb25zZW50IiwiaW5pdGlhbGlzZSIsImpzb24iLCJGaWxlU2VydmljZSIsIiRhbmNob3JTY3JvbGwiLCIkbG9jYXRpb24iLCJhZmZpbGlhdGlvbiIsImxldHRlciIsImFscGhhYmV0IiwiXyIsInRhaWwiLCJzb21lIiwic2xpY2UiLCJsb2NhbGVDb21wYXJlIiwibmV4dExldHRlciIsInVzYWdlIiwic2Vuc2l0aXZpdHkiLCJpZ25vcmVQdW5jdHVhdGlvbiIsInNwbGl0Iiwic3RhcnRJZHgiLCJhZmZpbGlhdGlvbk1hcCIsInJlZHVjZSIsImN1dE9mZiIsImZpbmRJbmRleCIsImEiLCJpZHgiLCJhZmZpbGlhdGlvblN0YXJ0c1dpdGhMZXR0ZXIiLCJjaGVja1BkZiIsImhhc2giLCJ0aXRsZSIsInByb2NlZWRpbmciLCJhY3JvbnltIiwieWVhciIsIm5hbWUiLCJhdXRob3JNYXAiLCJhdXRob3JOYW1lU3RhcnRzV2l0aExldHRlciIsImF1dGhvck5hbWUiLCJjb25jYXQiLCJiYW5uZXJGaWxlIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiY2F0Y2giLCJsb2FkaW5nIiwiRGF0YVNlcnZpY2UiLCJBZGRpdGlvbmFsUGFnZXNTZXJ2aWNlIiwiTm90aWZpY2F0aW9uU2VydmljZSIsIkhUVFBTZXJ2aWNlIiwid2VicHViRG93bmxvYWRFbmFibGVkIiwid2VicHViRG93bmxvYWQiLCJlbmFibGVkIiwiJGV2ZW50IiwicHJldmVudERlZmF1bHQiLCJkb3dubG9hZFBhcmFtcyIsInRva2VuIiwid2VicHViRG93bmxvYWRMb2NhdGlvbiIsInNlbmQiLCJ0cmFja2luZ0VuYWJsZWQiLCJ0cmFja2luZ1VSTCIsImVycm9yIiwic3RyYXRlZ3kiLCJwb3N0IiwiYWN0aW9uIiwid2luZG93Iiwib3BlbiIsIlJFU0VSVkVEX09CSkVDVF9QUk9QRVJUSUVTIiwiU2V0IiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsInByb3RvdHlwZSIsInNlYXJjaE1hcCIsInNlY3Rpb25zIiwiZm9yRWFjaCIsInNlY3Rpb24iLCJsaW5lSXRlbXMiLCJlbnRyeSIsInNlYXJjaFRleHQiLCJ0b0xvd2VyQ2FzZSIsImlzVG9rZW5SZXNlcnZlZCIsImhhcyIsImVudHJ5TGlzdCIsInB1c2giLCJlaWRNYXAiLCJlaWQiLCJpdGVtIiwiYXJ0aWNsZUxvY2F0aW9uIiwiYWJzdHJhY3QiLCJzZWFyY2hUZXJtIiwibGVuZ3RoIiwiaGl0TWFwIiwiZmlsdGVyIiwiaGl0cyIsInNlYXJjaFJlc3VsdHMiLCJrZXlzIiwibWFwIiwic29ydCIsImIiLCJyZXN1bHQiLCIkc2NvcGUiLCJWaWRlb1BsYXllclNlcnZpY2UiLCJwbGF5ZXJTZXR0aW5nIiwidmlkZW9QbGF5ZXIiLCJiYWNrTWF0dGVyIiwidHlwZSIsImFuY2hvcnMiLCJ2YWx1ZSIsImluZGVudCIsInMiLCJnZXRUaXRsZUlkIiwic2VsZWN0ZWRBbmNob3IiLCIkd2F0Y2giLCJleHRyYSIsInVzZVZpZGVvUGxheWVyIiwib3BlblZpZGVvIiwiZXJyIiwiY2hlY2tFeHRyYSIsImlzTVA0IiwicmVwbGFjZSIsImNsYXNzIiwiY2hhaXIiLCJwYWdlTnVtYmVyIiwiaXNQYWdlTnVtYmVyUm9tYW4iLCJ0b1JvbWFuIiwibnVtIiwiZGVjaW1hbCIsInJvbWFuIiwiaSIsInRva2VuUGFyYW0iLCJjaGVja0ZpbGUiLCIkaHR0cCIsImdldCIsIm1ldGhvZCIsImJvZHkiLCJwb3N0T3B0aW9ucyIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiZmllbGRzIiwiRXJyb3IiLCJmaWVsZE5hbWUiLCJtb21lbnQiLCJqd3RIZWxwZXIiLCJyZXR1cm5TdGF0ZSIsInZlcmlmeUNvbmZpZ0hhc0ZpZWxkcyIsImNvbmZJZCIsImxvZ2luVVJMIiwidGhlbiIsInN0b3JlSldUdG9Mb2NhbFN0b3JhZ2UiLCJyZXNwb25zZSIsInBvcCIsInN0YXRlUGFyYW1zIiwiY3VycmVudFN0YXRlIiwiand0U3RyaW5nIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImlzVG9rZW5FeHBpcmVkIiwiZGVjb2RlVG9rZW4iLCJzZXRJdGVtIiwiand0VG9rZW4iLCJub3RpZmljYXRpb25zIiwibWVzc2FnZSIsImhlbGxvVGVtcGxhdGUiLCJ0b2NUZW1wbGF0ZSIsImF1dGhvckluZGV4VGVtcGxhdGUiLCJpZnJhbWVUZW1wbGF0ZSIsInNlYXJjaFRlbXBsYXRlIiwiYWZmaWxpYXRpb25JbmRleFRlbXBsYXRlIiwidmlkZW9QbGF5ZXJNb2RhbFRlbXBsYXRlIiwibG9naW5UZW1wbGF0ZSIsImdldEhlbGxvIiwiY29udGVudCIsImdldFZpZGVvUGxheWVyIiwiJHVpYk1vZGFsIiwiZmlsZW5hbWUiLCJtb2RhbCIsImNvbXBvbmVudCIsInNpemUiLCJnZXRQbGF5ZXJTZXR0aW5nIiwiY29uZmlnU2V0dGluZyIsInByb3RvIiwicHJvdG9jb2wiLCJzdGFydHNXaXRoIiwiYmluZGluZ3MiLCJ0ZW1wbGF0ZSIsImNsb3NlIiwiZGlzbWlzcyIsImlzTmF0aXZlIiwiaXNWaWRlb0pzIiwiaXNNZWRpYUVsZW1lbnQiLCJldmVudCIsInJlYXNvbiIsImNsb3NlZCIsImRpc3Bvc2UiLCJwYXVzZWQiLCJwYXVzZSIsInJlbW92ZSIsInNldFNvdXJjZSIsIk1lZGlhRWxlbWVudFBsYXllciIsImRlZmF1bHRWaWRlb0hlaWdodCIsImF1dG9wbGF5Iiwic3VjY2VzcyIsIm1lZGlhRWxlbWVudCIsIm5vZGUiLCJpbnN0YW5jZSIsImNsYXNzTGlzdCIsImFkZCIsIm1lZGlhIiwic2V0VmlkZW9DbGFzc2VzIiwidmlkZW9qcyIsInZpZGVvU291cmNlIiwiZWxlbWVudCIsImp3dFBhcmFtIiwiYXR0ciIsInZpZGVvV3JhcHBlciIsImFkZENsYXNzIiwiY3NzIiwid2lkdGgiLCJvdXRsaW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxDQUFDLFlBQU07QUFDTDs7QUFFQUEsVUFBUUMsTUFBUixDQUFlLGFBQWYsRUFBOEIsRUFBOUIsRUFBa0NDLFFBQWxDLENBQ0UsYUFE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QUFBLGlCQUFkOztBQTREQSx1QkFBTztBQUNMQTtBQURLLGlCQUFQO0FBR0Q7QUFyRUw7O0FBQUE7QUFBQTtBQXdFRCxDQTNFRDs7Ozs7OztBQ0FBLENBQUMsWUFBTTtBQUNMOztBQUVBbk8sVUFBUUMsTUFBUixDQUFlLFFBQWYsRUFBeUJDLFFBQXpCLENBQ0UsMEJBREY7QUFHSSxzQkFBYztBQUFBO0FBQUU7O0FBSHBCO0FBQUE7QUFBQSw2QkFLVztBQUNMLFlBQUlpTyxVQUFVLFNBQVZBLE9BQVU7QUFBQTtBQUFBLFNBQWQ7O0FBY0EsZUFBTztBQUNMQTtBQURLLFNBQVA7QUFHRDtBQXZCTDs7QUFBQTtBQUFBO0FBMEJELENBN0JEIiwiZmlsZSI6IndlYnB1Yi1hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoKCkgPT4ge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YjpkYXRhXCIsIFtdKS5wcm92aWRlcihcbiAgICBcIkRhdGFTZXJ2aWNlXCIsXG4gICAgY2xhc3Mge1xuICAgICAgJGdldCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB3ZWJwdWIgLy9leHRlcm5hbGl6ZWQgd2VicHViIHZhcmlhYmxlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICApO1xuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1Yjpjb25maWdcIiwgW10pLnByb3ZpZGVyKFxuICAgIFwiQ29uZmlnU2VydmljZVwiLFxuICAgIGNsYXNzIHtcbiAgICAgICRnZXQoKSB7XG4gICAgICAgIHJldHVybiBjb25maWc7IC8vIGV4dGVybmFsaXplZCBjb25maWcgdmFyaWFibGVcbiAgICAgIH1cbiAgICB9XG4gICk7XG4gIGFuZ3VsYXIubW9kdWxlKFwid2VicHViOmFkZGl0aW9uYWwtcGFnZXNcIiwgW10pLnByb3ZpZGVyKFxuICAgIFwiQWRkaXRpb25hbFBhZ2VzU2VydmljZVwiLFxuICAgIGNsYXNzIHtcbiAgICAgICRnZXQoKSB7XG4gICAgICAgIHJldHVybiBhZGRpdGlvbmFsUGFnZXM7IC8vIGV4dGVybmFsaXplZCBjb25maWcgdmFyaWFibGVcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoXCJ3ZWJwdWJcIiwgW1xuICAgICAgLy8gU3RhcnQ6IE1pc2MuIERlcGVuZGVuY2llc1xuICAgICAgXCJuZ1JvdXRlXCIsXG4gICAgICBcIm5nQW5pbWF0ZVwiLFxuICAgICAgXCJ1aS5yb3V0ZXJcIixcbiAgICAgIFwidWkudHJlZVwiLFxuICAgICAgXCJ1aS5ib290c3RyYXBcIixcbiAgICAgIFwidWkuc2VsZWN0XCIsXG4gICAgICBcImFuZ3VsYXIuZmlsdGVyXCIsXG4gICAgICBcImRpYmFyaS5hbmd1bGFyLWVsbGlwc2lzXCIsXG4gICAgICBcImdyb3dsTm90aWZpY2F0aW9uc1wiLFxuICAgICAgXCJhbmd1bGFyTW9tZW50XCIsXG4gICAgICBcImFuZ3VsYXItand0XCIsXG4gICAgICBcIndlYnB1YjpkYXRhXCIsXG4gICAgICBcIndlYnB1Yjpjb25maWdcIixcbiAgICAgIFwid2VicHViOmFkZGl0aW9uYWwtcGFnZXNcIlxuICAgIF0pXG4gICAgLmNvbmZpZyhbXG4gICAgICBcIiRzdGF0ZVByb3ZpZGVyXCIsXG4gICAgICBcIiRsb2NhdGlvblByb3ZpZGVyXCIsXG4gICAgICBcIiR1cmxSb3V0ZXJQcm92aWRlclwiLFxuICAgICAgXCJEYXRhU2VydmljZVByb3ZpZGVyXCIsXG4gICAgICBcIkFkZGl0aW9uYWxQYWdlc1NlcnZpY2VQcm92aWRlclwiLFxuICAgICAgKFxuICAgICAgICAkc3RhdGVQcm92aWRlcixcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIsXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlcixcbiAgICAgICAgRGF0YVNlcnZpY2VQcm92aWRlcixcbiAgICAgICAgQWRkaXRpb25hbFBhZ2VzU2VydmljZVByb3ZpZGVyXG4gICAgICApID0+IHtcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKGZhbHNlKTtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL1wiKTtcblxuICAgICAgICBsZXQgd2VicHViRGF0YSA9IERhdGFTZXJ2aWNlUHJvdmlkZXIuJGdldCgpLndlYnB1Yi5kYXRhO1xuXG4gICAgICAgIGZ1bmN0aW9uIGp3dEd1YXJkKCRzdGF0ZSwgand0LCAkdGltZW91dCwgQ29uZmlnU2VydmljZSkge1xuICAgICAgICAgIGNvbnN0IGF1dGhFbmFibGVkID1cbiAgICAgICAgICAgIENvbmZpZ1NlcnZpY2Uuc2VydmljZXMgJiYgQ29uZmlnU2VydmljZS5zZXJ2aWNlcy5hdXRoRW5hYmxlZDtcblxuICAgICAgICAgIGlmIChhdXRoRW5hYmxlZCAmJiAhand0KSB7XG4gICAgICAgICAgICAkdGltZW91dCgoKSA9PiAkc3RhdGUuZ28oXCJsb2dpblwiLCBudWxsKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAuc3RhdGUoXCJlbXB0eVwiLCB7XG4gICAgICAgICAgICB1cmw6IFwiXCIsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAkc3RhdGUgPT4gJHN0YXRlLmdvKFwiaG9tZVwiKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnN0YXRlKFwiaW5kZXhcIiwge1xuICAgICAgICAgICAgdXJsOiBcIi9cIixcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICRzdGF0ZSA9PiAkc3RhdGUuZ28oXCJob21lXCIpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc3RhdGUoXCJob21lXCIsIHtcbiAgICAgICAgICAgIHVybDogXCIvaG9tZVwiLFxuICAgICAgICAgICAgdGVtcGxhdGVQcm92aWRlcjogVGVtcGxhdGVTZXJ2aWNlID0+XG4gICAgICAgICAgICAgIFRlbXBsYXRlU2VydmljZS5nZXRJZnJhbWVUZW1wbGF0ZSgpLFxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJleHRyYVBhZ2VDb250cm9sbGVyXCIsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6IFwiJGN0cmxcIixcbiAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgand0OiAoTG9naW5TZXJ2aWNlLCAkc3RhdGVQYXJhbXMpID0+XG4gICAgICAgICAgICAgICAgTG9naW5TZXJ2aWNlLmNoZWNrQW5kUmVzb2x2ZUpXVChcImhvbWVcIiwgJHN0YXRlUGFyYW1zKSxcbiAgICAgICAgICAgICAgcGFnZU5hbWU6ICRzdGF0ZVBhcmFtcyA9PiBcImhvbWVcIixcbiAgICAgICAgICAgICAgbG9jYXRpb246ICRzdGF0ZVBhcmFtcyA9PiBcImNvbnRlbnQvc3RhcnQuaHRtbFwiLFxuICAgICAgICAgICAgICBwYWdlczogKCkgPT4gW11cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkVudGVyOiBqd3RHdWFyZFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnN0YXRlKFwidG9jXCIsIHtcbiAgICAgICAgICAgIHVybDogXCIvdG9jLzppbmRleFwiLFxuICAgICAgICAgICAgdGVtcGxhdGVQcm92aWRlcjogVGVtcGxhdGVTZXJ2aWNlID0+IFRlbXBsYXRlU2VydmljZS5nZXRUb2MoKSxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwidG9jQ29udHJvbGxlclwiLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiBcIiRjdHJsXCIsXG4gICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgIGp3dDogKExvZ2luU2VydmljZSwgJHN0YXRlUGFyYW1zKSA9PlxuICAgICAgICAgICAgICAgIExvZ2luU2VydmljZS5jaGVja0FuZFJlc29sdmVKV1QoXCJ0b2NcIiwgJHN0YXRlUGFyYW1zKSxcbiAgICAgICAgICAgICAgY29uZmVyZW5jZTogJHN0YXRlUGFyYW1zID0+XG4gICAgICAgICAgICAgICAgd2VicHViRGF0YS5jb25mZXJlbmNlc1skc3RhdGVQYXJhbXMuaW5kZXhdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25FbnRlcjogand0R3VhcmRcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zdGF0ZShcImF1dGhvci1pbmRleFwiLCB7XG4gICAgICAgICAgICB1cmw6IFwiL2F1dGhvci1pbmRleFwiLFxuICAgICAgICAgICAgdGVtcGxhdGVQcm92aWRlcjogVGVtcGxhdGVTZXJ2aWNlID0+XG4gICAgICAgICAgICAgIFRlbXBsYXRlU2VydmljZS5nZXRBdXRob3JJbmRleCgpLFxuICAgICAgICAgICAgY29udHJvbGxlcjogXCJhdXRob3JJbmRleENvbnRyb2xsZXJcIixcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCIkY3RybFwiLFxuICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICBqd3Q6IChMb2dpblNlcnZpY2UsICRzdGF0ZVBhcmFtcykgPT5cbiAgICAgICAgICAgICAgICBMb2dpblNlcnZpY2UuY2hlY2tBbmRSZXNvbHZlSldUKFwiYXV0aG9yLWluZGV4XCIsICRzdGF0ZVBhcmFtcyksXG4gICAgICAgICAgICAgIGF1dGhvcnM6ICgpID0+IHdlYnB1YkRhdGEuYXV0aG9yc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRW50ZXI6IGp3dEd1YXJkXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc3RhdGUoXCJhZmZpbGlhdGlvbi1pbmRleFwiLCB7XG4gICAgICAgICAgICB1cmw6IFwiL2FmZmlsaWF0aW9uLWluZGV4XCIsXG4gICAgICAgICAgICB0ZW1wbGF0ZVByb3ZpZGVyOiBUZW1wbGF0ZVNlcnZpY2UgPT5cbiAgICAgICAgICAgICAgVGVtcGxhdGVTZXJ2aWNlLmdldEFmZmlsaWF0aW9uSW5kZXgoKSxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiYWZmaWxpYXRpb25JbmRleENvbnRyb2xsZXJcIixcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCIkY3RybFwiLFxuICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICBqd3Q6IChMb2dpblNlcnZpY2UsICRzdGF0ZVBhcmFtcykgPT5cbiAgICAgICAgICAgICAgICBMb2dpblNlcnZpY2UuY2hlY2tBbmRSZXNvbHZlSldUKFxuICAgICAgICAgICAgICAgICAgXCJhZmZpbGlhdGlvbi1pbmRleFwiLFxuICAgICAgICAgICAgICAgICAgJHN0YXRlUGFyYW1zXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgYWZmaWxpYXRpb25zOiAoKSA9PiB3ZWJwdWJEYXRhLmFmZmlsaWF0aW9uc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRW50ZXI6IGp3dEd1YXJkXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuc3RhdGUoXCJzZWFyY2hcIiwge1xuICAgICAgICAgICAgdXJsOiBcIi9zZWFyY2hcIixcbiAgICAgICAgICAgIHRlbXBsYXRlUHJvdmlkZXI6IFRlbXBsYXRlU2VydmljZSA9PiBUZW1wbGF0ZVNlcnZpY2UuZ2V0U2VhcmNoKCksXG4gICAgICAgICAgICBjb250cm9sbGVyOiBcInNlYXJjaENvbnRyb2xsZXJcIixcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCIkY3RybFwiLFxuICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICBqd3Q6IChMb2dpblNlcnZpY2UsICRzdGF0ZVBhcmFtcykgPT5cbiAgICAgICAgICAgICAgICBMb2dpblNlcnZpY2UuY2hlY2tBbmRSZXNvbHZlSldUKFwic2VhcmNoXCIsICRzdGF0ZVBhcmFtcyksXG4gICAgICAgICAgICAgIGNvbmZlcmVuY2VzOiAoKSA9PiB3ZWJwdWJEYXRhLmNvbmZlcmVuY2VzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25FbnRlcjogand0R3VhcmRcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5zdGF0ZShcImxvZ2luXCIsIHtcbiAgICAgICAgICAgIHVybDogXCIvbG9naW5cIixcbiAgICAgICAgICAgIHRlbXBsYXRlUHJvdmlkZXI6IFRlbXBsYXRlU2VydmljZSA9PiBUZW1wbGF0ZVNlcnZpY2UuZ2V0TG9naW4oKSxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwibG9naW5Db250cm9sbGVyXCIsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6IFwiJGN0cmxcIlxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnN0YXRlKFwiZXh0cmEtcGFnZVwiLCB7XG4gICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgcGFnZU5hbWU6IG51bGwsXG4gICAgICAgICAgICAgIGxvY2F0aW9uOiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXJsOiBcIi9wYWdlcy86cGFnZU5hbWVcIixcbiAgICAgICAgICAgIHRlbXBsYXRlUHJvdmlkZXI6IFRlbXBsYXRlU2VydmljZSA9PlxuICAgICAgICAgICAgICBUZW1wbGF0ZVNlcnZpY2UuZ2V0SWZyYW1lVGVtcGxhdGUoKSxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiZXh0cmFQYWdlQ29udHJvbGxlclwiLFxuICAgICAgICAgICAgY29udHJvbGxlckFzOiBcIiRjdHJsXCIsXG4gICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgIGp3dDogKExvZ2luU2VydmljZSwgJHN0YXRlUGFyYW1zKSA9PlxuICAgICAgICAgICAgICAgIExvZ2luU2VydmljZS5jaGVja0FuZFJlc29sdmVKV1QoXCJleHRyYS1wYWdlXCIsICRzdGF0ZVBhcmFtcyksXG4gICAgICAgICAgICAgIHBhZ2VOYW1lOiAkc3RhdGVQYXJhbXMgPT4gJHN0YXRlUGFyYW1zLnBhZ2VOYW1lLFxuICAgICAgICAgICAgICBsb2NhdGlvbjogJHN0YXRlUGFyYW1zID0+ICRzdGF0ZVBhcmFtcy5sb2NhdGlvbixcbiAgICAgICAgICAgICAgcGFnZXM6ICgpID0+IEFkZGl0aW9uYWxQYWdlc1NlcnZpY2VQcm92aWRlclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRW50ZXI6IGp3dEd1YXJkXG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgXSlcblxuICAgIC5ydW4oW1xuICAgICAgXCIkcm9vdFNjb3BlXCIsXG4gICAgICAkcm9vdFNjb3BlID0+IHtcbiAgICAgICAgJHJvb3RTY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VFcnJvclwiLCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpKTtcbiAgICAgIH1cbiAgICBdKVxuICAgIC8vIEdEUFJcbiAgICAucnVuKFtcbiAgICAgIFwiJHdpbmRvd1wiLFxuICAgICAgXCJDb25maWdTZXJ2aWNlXCIsXG4gICAgICAoJHdpbmRvdywgQ29uZmlnU2VydmljZSkgPT4ge1xuICAgICAgICBpZiAoQ29uZmlnU2VydmljZS5lbmFibGVHRFBSKSB7XG4gICAgICAgICAgJHdpbmRvdy5jb29raWVjb25zZW50LmluaXRpYWxpc2UoanNvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdKTtcbn0pKCk7XG4iLCIoKCkgPT4ge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgYW5ndWxhci5tb2R1bGUoXCJ3ZWJwdWJcIikuY29udHJvbGxlcihcbiAgICBcImFmZmlsaWF0aW9uSW5kZXhDb250cm9sbGVyXCIsXG4gICAgY2xhc3MgYWZmaWxpYXRpb25JbmRleENvbnRyb2xsZXIge1xuICAgICAgY29uc3RydWN0b3IoYWZmaWxpYXRpb25zLCBGaWxlU2VydmljZSwgJGFuY2hvclNjcm9sbCwgJGxvY2F0aW9uLCBqd3QpIHtcbiAgICAgICAgdGhpcy5hZmZpbGlhdGlvbnMgPSBhZmZpbGlhdGlvbnM7XG4gICAgICAgIHRoaXMuRmlsZVNlcnZpY2UgPSBGaWxlU2VydmljZTtcbiAgICAgICAgdGhpcy4kYW5jaG9yU2Nyb2xsID0gJGFuY2hvclNjcm9sbDtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgIHRoaXMuand0ID0gand0O1xuICAgICAgfVxuXG4gICAgICBhZmZpbGlhdGlvblN0YXJ0c1dpdGhMZXR0ZXIoYWZmaWxpYXRpb24sIGxldHRlcikge1xuICAgICAgICBpZiAobGV0dGVyID09PSBcIiNcIikge1xuICAgICAgICAgIC8vIGdldCBhbHBoYWJldCBsZXR0ZXJzXG4gICAgICAgICAgY29uc3QgYWxwaGFiZXQgPSBfLnRhaWwodGhpcy5hbHBoYWJldCk7XG5cbiAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBtYXRjaCBmb3IgYW55IGFscGhhYmV0IGxldHRlciB0aGVuIGNvbnNpZGVyIHRoaXMgYSBkaWdpdFxuICAgICAgICAgIHJldHVybiAhXy5zb21lKGFscGhhYmV0LCBuZXh0TGV0dGVyID0+IHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIGFmZmlsaWF0aW9uLnNsaWNlKDAsIDEpLmxvY2FsZUNvbXBhcmUobmV4dExldHRlciwgXCJlblwiLCB7XG4gICAgICAgICAgICAgICAgdXNhZ2U6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgICAgc2Vuc2l0aXZpdHk6IFwiYmFzZVwiLFxuICAgICAgICAgICAgICAgIGlnbm9yZVB1bmN0dWF0aW9uOiB0cnVlXG4gICAgICAgICAgICAgIH0pID09PSAwXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBzdHJpbmcgbWF0Y2hlcyB0aGUgY3VycmVudCBsZXR0ZXJcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgYWZmaWxpYXRpb24uc2xpY2UoMCwgMSkubG9jYWxlQ29tcGFyZShsZXR0ZXIsIFwiZW5cIiwge1xuICAgICAgICAgICAgICB1c2FnZTogXCJzZWFyY2hcIixcbiAgICAgICAgICAgICAgc2Vuc2l0aXZpdHk6IFwiYmFzZVwiLFxuICAgICAgICAgICAgICBpZ25vcmVQdW5jdHVhdGlvbjogdHJ1ZVxuICAgICAgICAgICAgfSkgPT09IDBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICRvbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYWxwaGFiZXQgPSBcIiNBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiLnNwbGl0KFwiXCIpO1xuICAgICAgICBsZXQgc3RhcnRJZHggPSAwO1xuICAgICAgICB0aGlzLmFmZmlsaWF0aW9uTWFwID0gdGhpcy5hbHBoYWJldC5yZWR1Y2UoKGFmZmlsaWF0aW9uTWFwLCBsZXR0ZXIpID0+IHtcbiAgICAgICAgICAvLyBnZXQgdGhlIGN1dG9mZiBpbmRleFxuICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHN0YXJ0IGluZGV4IG9mIHRoZSBuZXh0IGFmZmlsaWF0aW9uc1xuICAgICAgICAgIC8vIHRoZSBhZmZpbGlhdGlvbnMgdW5kZXIgdGhlIGZpbmFsIGFscGhhYmV0IGxpc3Rpbmcgd2l0aCBoYXZlIGN1dG9mZiA9IC0xXG4gICAgICAgICAgbGV0IGN1dE9mZiA9IHRoaXMuYWZmaWxpYXRpb25zLmZpbmRJbmRleCgoYSwgaWR4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICBpZHggPj0gc3RhcnRJZHggJiZcbiAgICAgICAgICAgICAgIXRoaXMuYWZmaWxpYXRpb25TdGFydHNXaXRoTGV0dGVyKGEuYWZmaWxpYXRpb24sIGxldHRlcilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoY3V0T2ZmID49IDApIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgLy8gICBsZXR0ZXIsXG4gICAgICAgICAgICAvLyAgIHN0YXJ0SWR4LFxuICAgICAgICAgICAgLy8gICBjdXRPZmYsXG4gICAgICAgICAgICAvLyAgIHRoaXMuYWZmaWxpYXRpb25zLnNsaWNlKHN0YXJ0SWR4LCBjdXRPZmYpXG4gICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgYWZmaWxpYXRpb25NYXBbbGV0dGVyXSA9IHRoaXMuYWZmaWxpYXRpb25zLnNsaWNlKHN0YXJ0SWR4LCBjdXRPZmYpO1xuICAgICAgICAgICAgc3RhcnRJZHggPSBjdXRPZmY7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gaGFuZGxlIHRoZSBmaW5hbCBhZmZpbGlhdGlvbnNcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgLy8gICBsZXR0ZXIsXG4gICAgICAgICAgICAvLyAgIHN0YXJ0SWR4LFxuICAgICAgICAgICAgLy8gICBjdXRPZmYsXG4gICAgICAgICAgICAvLyAgIHRoaXMuYWZmaWxpYXRpb25zLnNsaWNlKHN0YXJ0SWR4KVxuICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgIGFmZmlsaWF0aW9uTWFwW2xldHRlcl0gPSB0aGlzLmFmZmlsaWF0aW9ucy5zbGljZShzdGFydElkeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhZmZpbGlhdGlvbk1hcDtcbiAgICAgICAgfSwge30pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImFmZmlsaWF0aW9uTWFwOiBcIiwgdGhpcy5hZmZpbGlhdGlvbk1hcCk7XG4gICAgICB9XG5cbiAgICAgIGNoZWNrUGRmKGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMuRmlsZVNlcnZpY2UuY2hlY2tQZGYobG9jYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBzY3JvbGxUb0FuY2hvcihsZXR0ZXIpIHtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24uaGFzaChsZXR0ZXIpO1xuICAgICAgICB0aGlzLiRhbmNob3JTY3JvbGwoKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59KSgpO1xuIiwiKCgpID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIGFuZ3VsYXIubW9kdWxlKFwid2VicHViXCIpLmNvbnRyb2xsZXIoXG4gICAgXCJhcHBDb250cm9sbGVyXCIsXG4gICAgY2xhc3MgQXBwQ29udHJvbGxlciB7XG4gICAgICBjb25zdHJ1Y3RvcihDb25maWdTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gQ29uZmlnU2VydmljZTtcbiAgICAgIH1cblxuICAgICAgJG9uSW5pdCgpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9XG4gICAgICAgICAgdGhpcy5jb25maWcucHJvY2VlZGluZy5hY3JvbnltICsgXCIgXCIgKyB0aGlzLmNvbmZpZy5wcm9jZWVkaW5nLnllYXI7XG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTtcbiIsIigoKSA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5jb250cm9sbGVyKFxuICAgIFwiYXV0aG9ySW5kZXhDb250cm9sbGVyXCIsXG4gICAgY2xhc3MgYXV0aG9ySW5kZXhDb250cm9sbGVyIHtcbiAgICAgIGNvbnN0cnVjdG9yKGF1dGhvcnMsIEZpbGVTZXJ2aWNlLCAkYW5jaG9yU2Nyb2xsLCAkbG9jYXRpb24sICRzdGF0ZSwgand0KSB7XG4gICAgICAgIHRoaXMuYXV0aG9ycyA9IGF1dGhvcnM7XG4gICAgICAgIHRoaXMuRmlsZVNlcnZpY2UgPSBGaWxlU2VydmljZTtcbiAgICAgICAgdGhpcy4kYW5jaG9yU2Nyb2xsID0gJGFuY2hvclNjcm9sbDtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgIHRoaXMuJHN0YXRlID0gJHN0YXRlO1xuICAgICAgICB0aGlzLmp3dCA9IGp3dDtcbiAgICAgIH1cblxuICAgICAgYXV0aG9yTmFtZVN0YXJ0c1dpdGhMZXR0ZXIobmFtZSwgbGV0dGVyKSB7XG4gICAgICAgIGlmIChsZXR0ZXIgPT09IFwiI1wiKSB7XG4gICAgICAgICAgLy8gZ2V0IGFscGhhYmV0IGxldHRlcnNcbiAgICAgICAgICBjb25zdCBhbHBoYWJldCA9IF8udGFpbCh0aGlzLmFscGhhYmV0KTtcblxuICAgICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIG1hdGNoIGZvciBhbnkgYWxwaGFiZXQgbGV0dGVyIHRoZW4gY29uc2lkZXIgdGhpcyBhIGRpZ2l0XG4gICAgICAgICAgcmV0dXJuICFfLnNvbWUoXG4gICAgICAgICAgICBhbHBoYWJldCxcbiAgICAgICAgICAgIG5leHRMZXR0ZXIgPT5cbiAgICAgICAgICAgICAgbmFtZS5zbGljZSgwLCAxKS5sb2NhbGVDb21wYXJlKG5leHRMZXR0ZXIsIFwiZW5cIiwge1xuICAgICAgICAgICAgICAgIHVzYWdlOiBcInNlYXJjaFwiLFxuICAgICAgICAgICAgICAgIHNlbnNpdGl2aXR5OiBcImJhc2VcIixcbiAgICAgICAgICAgICAgICBpZ25vcmVQdW5jdHVhdGlvbjogdHJ1ZVxuICAgICAgICAgICAgICB9KSA9PT0gMFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHN0cmluZyBtYXRjaGVzIHRoZSBjdXJyZW50IGxldHRlclxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBuYW1lLnNsaWNlKDAsIDEpLmxvY2FsZUNvbXBhcmUobGV0dGVyLCBcImVuXCIsIHtcbiAgICAgICAgICAgICAgdXNhZ2U6IFwic2VhcmNoXCIsXG4gICAgICAgICAgICAgIHNlbnNpdGl2aXR5OiBcImJhc2VcIixcbiAgICAgICAgICAgICAgaWdub3JlUHVuY3R1YXRpb246IHRydWVcbiAgICAgICAgICAgIH0pID09PSAwXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAkb25Jbml0KCkge1xuICAgICAgICB0aGlzLmFscGhhYmV0ID0gXCIjQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIi5zcGxpdChcIlwiKTtcbiAgICAgICAgbGV0IHN0YXJ0SWR4ID0gMDtcbiAgICAgICAgdGhpcy5hdXRob3JNYXAgPSB0aGlzLmFscGhhYmV0LnJlZHVjZSgoYXV0aG9yTWFwLCBsZXR0ZXIpID0+IHtcbiAgICAgICAgICAvLyBnZXQgdGhlIGN1dG9mZiBpbmRleFxuICAgICAgICAgIC8vIHRoaXMgaXMgdGhlIHN0YXJ0IGluZGV4IG9mIHRoZSBuZXh0IGF1dGhvcnNcbiAgICAgICAgICAvLyB0aGUgYXV0aG9ycyB1bmRlciB0aGUgZmluYWwgYWxwaGFiZXQgbGlzdGluZyB3aXRoIGhhdmUgY3V0b2ZmID0gLTFcbiAgICAgICAgICBsZXQgY3V0T2ZmID0gdGhpcy5hdXRob3JzLmZpbmRJbmRleChcbiAgICAgICAgICAgIChhLCBpZHgpID0+XG4gICAgICAgICAgICAgIGlkeCA+PSBzdGFydElkeCAmJlxuICAgICAgICAgICAgICAhdGhpcy5hdXRob3JOYW1lU3RhcnRzV2l0aExldHRlcihhLmF1dGhvck5hbWUsIGxldHRlcilcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gYXBwbHkgdGhlIGN1dG9mZlxuICAgICAgICAgIGlmIChjdXRPZmYgPj0gMCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgICAgICAvLyAgIFwiQnVpbGRpbmcgYXV0aG9yIG1hcDogbGV0dGVyOiAlcywgc3RhcnRJZHg6ICVzLCBjdXRPZmY6ICVzLCBhdXRob3JzOiAlc1wiLFxuICAgICAgICAgICAgLy8gICBsZXR0ZXIsXG4gICAgICAgICAgICAvLyAgIHN0YXJ0SWR4LFxuICAgICAgICAgICAgLy8gICBjdXRPZmYsXG4gICAgICAgICAgICAvLyAgIHRoaXMuYXV0aG9ycy5zbGljZShzdGFydElkeCwgY3V0T2ZmKVxuICAgICAgICAgICAgLy8gKTtcbiAgICAgICAgICAgIGF1dGhvck1hcFtsZXR0ZXJdID0gdGhpcy5hdXRob3JzLnNsaWNlKHN0YXJ0SWR4LCBjdXRPZmYpO1xuICAgICAgICAgICAgc3RhcnRJZHggPSBjdXRPZmY7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGhhbmRsZSB0aGUgZmluYWwgYXV0aG9yc1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXG4gICAgICAgICAgICAvLyAgIFwiQWRkaW5nIGZpbmFsIGF1dGhvcnM6IGxldHRlcjogJXMsIHN0YXJ0SWR4OiAlcywgY3V0T2ZmOiAlcywgYXV0aG9yczogJXNcIixcbiAgICAgICAgICAgIC8vICAgbGV0dGVyLFxuICAgICAgICAgICAgLy8gICBzdGFydElkeCxcbiAgICAgICAgICAgIC8vICAgY3V0T2ZmLFxuICAgICAgICAgICAgLy8gICB0aGlzLmF1dGhvcnMuc2xpY2Uoc3RhcnRJZHgpXG4gICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgYXV0aG9yTWFwW2xldHRlcl0gPSB0aGlzLmF1dGhvcnMuc2xpY2Uoc3RhcnRJZHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYXV0aG9yTWFwO1xuICAgICAgICB9LCB7fSk7XG4gICAgICAgIHRoaXMuYXV0aG9yTWFwW1wiQVwiXSA9ICh0aGlzLmF1dGhvck1hcFtcIiNcIl0gfHwgW10pLmNvbmNhdChcbiAgICAgICAgICB0aGlzLmF1dGhvck1hcFtcIkFcIl1cbiAgICAgICAgKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuYXV0aG9yTWFwW1wiI1wiXTtcbiAgICAgICAgdGhpcy5hbHBoYWJldCA9IHRoaXMuYWxwaGFiZXQuc2xpY2UoMSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRmluYWwgYXV0aG9yIG1hcDogJW9cIiwgdGhpcy5hdXRob3JNYXApO1xuICAgICAgfVxuXG4gICAgICBjaGVja1BkZihsb2NhdGlvbikge1xuICAgICAgICB0aGlzLkZpbGVTZXJ2aWNlLmNoZWNrUGRmKGxvY2F0aW9uKTtcbiAgICAgIH1cblxuICAgICAgc2Nyb2xsVG9BbmNob3IobGV0dGVyKSB7XG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLmhhc2gobGV0dGVyKTtcbiAgICAgICAgdGhpcy4kYW5jaG9yU2Nyb2xsKCk7XG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTtcbiIsIigoKSA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5jb250cm9sbGVyKFxuICAgIFwiYmFubmVyQ29udHJvbGxlclwiLFxuICAgIGNsYXNzIGJhbm5lckNvbnRyb2xsZXIge1xuICAgICAgY29uc3RydWN0b3IoQ29uZmlnU2VydmljZSkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IENvbmZpZ1NlcnZpY2U7XG4gICAgICB9XG5cbiAgICAgICRvbkluaXQoKSB7XG4gICAgICAgIHRoaXMuYmFubmVyRmlsZSA9IHRoaXMuY29uZmlnLmJhbm5lckZpbGU7XG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTtcbiIsIigoKSA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5jb250cm9sbGVyKFxuICAgIFwiZXh0cmFQYWdlQ29udHJvbGxlclwiLFxuICAgIGNsYXNzIGV4dHJhUGFnZUNvbnRyb2xsZXIge1xuICAgICAgY29uc3RydWN0b3IoJHN0YXRlLCBwYWdlcywgcGFnZU5hbWUsIGxvY2F0aW9uLCBqd3QpIHtcbiAgICAgICAgdGhpcy4kc3RhdGUgPSAkc3RhdGU7XG4gICAgICAgIHRoaXMucGFnZXMgPSBwYWdlcztcbiAgICAgICAgdGhpcy5wYWdlTmFtZSA9IHBhZ2VOYW1lO1xuICAgICAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgICAgIHRoaXMuand0ID0gand0O1xuICAgICAgfVxuXG4gICAgICAkb25Jbml0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInBhZ2VOYW1lOiBcIiwgdGhpcy5wYWdlTmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9jYXRpb246IFwiLCB0aGlzLmxvY2F0aW9uKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJwYWdlczogXCIsIHRoaXMucGFnZXMpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn0pKCk7XG4iLCIoKCkgPT4ge1xuICBcInVzZSBzdHJpY3RcIjtcbiAgYW5ndWxhci5tb2R1bGUoXCJ3ZWJwdWJcIikuY29udHJvbGxlcihcbiAgICBcImxvZ2luQ29udHJvbGxlclwiLFxuICAgIGNsYXNzIGxvZ2luQ29udHJvbGxlciB7XG4gICAgICBjb25zdHJ1Y3RvcihMb2dpblNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5Mb2dpblNlcnZpY2UgPSBMb2dpblNlcnZpY2U7XG4gICAgICB9XG5cbiAgICAgICRvbkluaXQoKSB7fVxuXG4gICAgICBsb2dpbigpIHtcbiAgICAgICAgdGhpcy5Mb2dpblNlcnZpY2UubG9naW4odGhpcy51c2VybmFtZSwgdGhpcy5wYXNzd29yZCkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTtcbiIsIigoKSA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5jb250cm9sbGVyKFxuICAgIFwibmF2Q29udHJvbGxlclwiLFxuICAgIGNsYXNzIG5hdkNvbnRyb2xsZXIge1xuICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgIERhdGFTZXJ2aWNlLFxuICAgICAgICBDb25maWdTZXJ2aWNlLFxuICAgICAgICBBZGRpdGlvbmFsUGFnZXNTZXJ2aWNlLFxuICAgICAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBMb2dpblNlcnZpY2UsXG4gICAgICAgIEhUVFBTZXJ2aWNlXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5EYXRhU2VydmljZSA9IERhdGFTZXJ2aWNlO1xuICAgICAgICB0aGlzLmNvbmZpZyA9IENvbmZpZ1NlcnZpY2U7XG4gICAgICAgIHRoaXMuYWRkaXRpb25hbFBhZ2VzID0gQWRkaXRpb25hbFBhZ2VzU2VydmljZTtcbiAgICAgICAgdGhpcy5Ob3RpZmljYXRpb25TZXJ2aWNlID0gTm90aWZpY2F0aW9uU2VydmljZTtcbiAgICAgICAgdGhpcy5Mb2dpblNlcnZpY2UgPSBMb2dpblNlcnZpY2U7XG4gICAgICAgIHRoaXMuSFRUUFNlcnZpY2UgPSBIVFRQU2VydmljZTtcbiAgICAgIH1cblxuICAgICAgJG9uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25mZXJlbmNlcyA9IHRoaXMuRGF0YVNlcnZpY2Uud2VicHViLmRhdGEuY29uZmVyZW5jZXM7XG4gICAgICAgIHRoaXMud2VicHViRG93bmxvYWRFbmFibGVkID1cbiAgICAgICAgICB0aGlzLmNvbmZpZy53ZWJwdWJEb3dubG9hZCAmJiB0aGlzLmNvbmZpZy53ZWJwdWJEb3dubG9hZC5lbmFibGVkO1xuICAgICAgICB0aGlzLmF1dGhFbmFibGVkID1cbiAgICAgICAgICB0aGlzLmNvbmZpZy5zZXJ2aWNlcyAmJiB0aGlzLmNvbmZpZy5zZXJ2aWNlcy5hdXRoRW5hYmxlZDtcbiAgICAgIH1cblxuICAgICAgb25XZWJwdWJEb3dubG9hZENsaWNrZWQoJGV2ZW50KSB7XG4gICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCBkb3dubG9hZFBhcmFtcyA9IFwiXCI7XG4gICAgICAgIGxldCBqd3QgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy53ZWJwdWJEb3dubG9hZEVuYWJsZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5hdXRoRW5hYmxlZCkge1xuICAgICAgICAgICAgand0ID0gdGhpcy5Mb2dpblNlcnZpY2UuY2hlY2tBbmRSZXNvbHZlSldUKCk7XG4gICAgICAgICAgICBkb3dubG9hZFBhcmFtcyA9IGp3dCA/IGA/dG9rZW49JHtqd3QudG9rZW59YCA6IFwiXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdlYnB1YkRvd25sb2FkTG9jYXRpb24gPSBgJHt0aGlzLmNvbmZpZy53ZWJwdWJEb3dubG9hZC5sb2NhdGlvbn0ke2Rvd25sb2FkUGFyYW1zfWA7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgYXV0aCBuZWVkZWRcbiAgICAgICAgaWYgKHRoaXMuYXV0aEVuYWJsZWQgJiYgIWp3dCkge1xuICAgICAgICAgIHRoaXMuTm90aWZpY2F0aW9uU2VydmljZS5zZW5kKFxuICAgICAgICAgICAgXCJkYW5nZXJcIixcbiAgICAgICAgICAgIFwiWW91IG11c3QgYmUgbG9nZ2VkIGluIHRvIGRvIHRoYXQuXCJcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyYWNrIGRvd25sb2FkIGlmIGVuYWJsZWRcbiAgICAgICAgLy8gVE9ETyBtb3ZlIHRvIHNlcnZpY2VcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnNlcnZpY2VzICYmIHRoaXMuY29uZmlnLnNlcnZpY2VzLnRyYWNraW5nRW5hYmxlZCkge1xuICAgICAgICAgIGNvbnN0IHRyYWNraW5nVVJMID1cbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnNlcnZpY2VzICYmIHRoaXMuY29uZmlnLnNlcnZpY2VzLnRyYWNraW5nVVJMO1xuICAgICAgICAgIGlmICghdHJhY2tpbmdVUkwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0cmFja2luZ1VSTCBub3QgZGVmaW5lZCBpbiBjb25maWcuc2VydmljZXNcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHN0cmF0ZWd5ID1cbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnNlcnZpY2VzICYmIHRoaXMuY29uZmlnLnNlcnZpY2VzLnN0cmF0ZWd5O1xuICAgICAgICAgIGlmICghc3RyYXRlZ3kpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdHJhdGVneSBub3QgZGVmaW5lZCBpbiBjb25maWcuc2VydmljZXNcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5IVFRQU2VydmljZS5wb3N0KFxuICAgICAgICAgICAgdHJhY2tpbmdVUkwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGFjdGlvbjogXCJ3ZWJwdWIgZG93bmxvYWRcIixcbiAgICAgICAgICAgICAgc3RyYXRlZ3lcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBqd3RcbiAgICAgICAgICApLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJXZWJwdWIgZG93bmxvYWQgdHJhY2tpbmcgZXJyb3I6IFwiLCBlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cub3Blbih3ZWJwdWJEb3dubG9hZExvY2F0aW9uLCBcIl9ibGFua1wiKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59KSgpO1xuIiwiKCgpID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgY29uc3QgUkVTRVJWRURfT0JKRUNUX1BST1BFUlRJRVMgPSBuZXcgU2V0KFxuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE9iamVjdC5wcm90b3R5cGUpXG4gICk7XG5cbiAgYW5ndWxhci5tb2R1bGUoXCJ3ZWJwdWJcIikuY29udHJvbGxlcihcbiAgICBcInNlYXJjaENvbnRyb2xsZXJcIixcbiAgICBjbGFzcyBzZWFyY2hDb250cm9sbGVyIHtcbiAgICAgIGNvbnN0cnVjdG9yKGNvbmZlcmVuY2VzLCBGaWxlU2VydmljZSwgand0KSB7XG4gICAgICAgIHRoaXMuY29uZmVyZW5jZXMgPSBjb25mZXJlbmNlcztcbiAgICAgICAgdGhpcy5GaWxlU2VydmljZSA9IEZpbGVTZXJ2aWNlO1xuICAgICAgICB0aGlzLmp3dCA9IGp3dDtcbiAgICAgIH1cblxuICAgICAgJG9uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hNYXAgPSB0aGlzLmNvbmZlcmVuY2VzLnJlZHVjZSgoc2VhcmNoTWFwLCBjb25mZXJlbmNlKSA9PiB7XG4gICAgICAgICAgY29uZmVyZW5jZS5zZWN0aW9ucy5mb3JFYWNoKHNlY3Rpb24gPT4ge1xuICAgICAgICAgICAgc2VjdGlvbi5saW5lSXRlbXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICAgIGVudHJ5LnNlYXJjaFRleHRcbiAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIiBcIilcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCh0b2tlbiA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1Rva2VuUmVzZXJ2ZWQgPSBSRVNFUlZFRF9PQkpFQ1RfUFJPUEVSVElFUy5oYXModG9rZW4pO1xuICAgICAgICAgICAgICAgICAgdG9rZW4gPSBpc1Rva2VuUmVzZXJ2ZWQgPyBgX19fJHt0b2tlbn1gIDogdG9rZW47XG4gICAgICAgICAgICAgICAgICBsZXQgZW50cnlMaXN0ID0gc2VhcmNoTWFwW3Rva2VuXSB8fCBbXTtcbiAgICAgICAgICAgICAgICAgIGVudHJ5TGlzdC5wdXNoKGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgIHNlYXJjaE1hcFt0b2tlbl0gPSBlbnRyeUxpc3Q7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gc2VhcmNoTWFwO1xuICAgICAgICB9LCB7fSk7XG5cbiAgICAgICAgdGhpcy5laWRNYXAgPSB0aGlzLmNvbmZlcmVuY2VzLnJlZHVjZSgoZWlkTWFwLCBjb25mZXJlbmNlKSA9PiB7XG4gICAgICAgICAgY29uZmVyZW5jZS5zZWN0aW9ucy5mb3JFYWNoKHNlY3Rpb24gPT4ge1xuICAgICAgICAgICAgc2VjdGlvbi5saW5lSXRlbXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgICAgIGVpZE1hcFtlbnRyeS5laWRdID0gZW50cnk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZWlkTWFwO1xuICAgICAgICB9LCB7fSk7XG4gICAgICB9XG5cbiAgICAgIGNoZWNrUGRmKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5GaWxlU2VydmljZS5jaGVja1BkZihpdGVtLmFydGljbGVMb2NhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGdldEFic3RyYWN0KGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBlbnRyeS5hYnN0cmFjdCB8fCBcIk5vIGFic3RyYWN0IHByb3ZpZGVkXCI7XG4gICAgICB9XG5cbiAgICAgIHNlYXJjaElucHV0KCkge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hUZXJtLmxlbmd0aCA8IDMpIHJldHVybjtcblxuICAgICAgICBsZXQgaGl0TWFwID0gdGhpcy5zZWFyY2hUZXJtXG4gICAgICAgICAgLnNwbGl0KFwiIFwiKVxuICAgICAgICAgIC5maWx0ZXIodG9rZW4gPT4gdG9rZW4pXG4gICAgICAgICAgLnJlZHVjZSgoaGl0TWFwLCB0b2tlbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNUb2tlblJlc2VydmVkID0gUkVTRVJWRURfT0JKRUNUX1BST1BFUlRJRVMuaGFzKFxuICAgICAgICAgICAgICB0b2tlbi50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdG9rZW4gPSAoaXNUb2tlblJlc2VydmVkID8gYF9fXyR7dG9rZW59YCA6IHRva2VuKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNlYXJjaE1hcFt0b2tlbl0pIHJldHVybiBoaXRNYXA7XG5cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoTWFwW3Rva2VuXS5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgbGV0IGhpdHMgPSBoaXRNYXBbZW50cnkuZWlkXSB8fCAwO1xuICAgICAgICAgICAgICBoaXRzICs9IDE7XG4gICAgICAgICAgICAgIGhpdE1hcFtlbnRyeS5laWRdID0gaGl0cztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gaGl0TWFwO1xuICAgICAgICAgIH0sIHt9KTtcblxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSBPYmplY3Qua2V5cyhoaXRNYXApXG4gICAgICAgICAgLm1hcChlaWQgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgZW50cnk6IHRoaXMuZWlkTWFwW2VpZF0sXG4gICAgICAgICAgICAgIGhpdHM6IGhpdE1hcFtlaWRdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGIuaGl0cyAtIGEuaGl0cylcbiAgICAgICAgICAubWFwKHJlc3VsdCA9PiByZXN1bHQuZW50cnkpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0czogXCIsIHRoaXMuc2VhcmNoUmVzdWx0cyk7XG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTtcbiIsIigoKSA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5jb250cm9sbGVyKFxuICAgIFwidG9jQ29udHJvbGxlclwiLFxuICAgIGNsYXNzIHRvY0NvbnRyb2xsZXIge1xuICAgICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNvbmZlcmVuY2UsXG4gICAgICAgIEZpbGVTZXJ2aWNlLFxuICAgICAgICAkc2NvcGUsXG4gICAgICAgICRsb2NhdGlvbixcbiAgICAgICAgJGFuY2hvclNjcm9sbCxcbiAgICAgICAgVmlkZW9QbGF5ZXJTZXJ2aWNlLFxuICAgICAgICBDb25maWdTZXJ2aWNlLFxuICAgICAgICBqd3RcbiAgICAgICkge1xuICAgICAgICB0aGlzLmNvbmZlcmVuY2UgPSBjb25mZXJlbmNlO1xuICAgICAgICB0aGlzLkZpbGVTZXJ2aWNlID0gRmlsZVNlcnZpY2U7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgdGhpcy4kYW5jaG9yU2Nyb2xsID0gJGFuY2hvclNjcm9sbDtcbiAgICAgICAgdGhpcy5WaWRlb1BsYXllclNlcnZpY2UgPSBWaWRlb1BsYXllclNlcnZpY2U7XG4gICAgICAgIHRoaXMuQ29uZmlnU2VydmljZSA9IENvbmZpZ1NlcnZpY2U7XG4gICAgICAgIHRoaXMuand0ID0gand0O1xuICAgICAgfVxuXG4gICAgICAkb25Jbml0KCkge1xuICAgICAgICB0aGlzLnBsYXllclNldHRpbmcgPSB0aGlzLkNvbmZpZ1NlcnZpY2UudmlkZW9QbGF5ZXIgfHwgXCJkZWZhdWx0XCI7XG4gICAgICAgIHRoaXMuY29uZmVyZW5jZS5iYWNrTWF0dGVyID0gdGhpcy5jb25mZXJlbmNlLmJhY2tNYXR0ZXIuZmlsdGVyKFxuICAgICAgICAgIGVudHJ5ID0+IGVudHJ5LnR5cGUgIT09IFwiQk1fUk9TVEVSXCJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hbmNob3JzID0gW1xuICAgICAgICAgIHsgbmFtZTogXCJKdW1wIHRvIFNlY3Rpb24uLi5cIiwgdmFsdWU6IFwianVtcFwiIH0sXG4gICAgICAgICAgeyBuYW1lOiBcIlxcdTIwMjIgRnJvbnQgTWF0dGVyXCIsIHZhbHVlOiBcIkZyb250TWF0dGVyXCIgfVxuICAgICAgICBdXG4gICAgICAgICAgLmNvbmNhdChcbiAgICAgICAgICAgIHRoaXMuY29uZmVyZW5jZS5zZWN0aW9ucy5tYXAocyA9PiB7XG4gICAgICAgICAgICAgIGxldCBpbmRlbnQgPVxuICAgICAgICAgICAgICAgIHMudHlwZSA9PT0gXCJTRF9UUkFDS1wiXG4gICAgICAgICAgICAgICAgICA/IFwiXCJcbiAgICAgICAgICAgICAgICAgIDogcy50eXBlID09PSBcIlNEX1NFU1NJT05cIlxuICAgICAgICAgICAgICAgICAgPyBcIlxcdTAwQTBcXHUwMEEwXFx1MDBBMFwiXG4gICAgICAgICAgICAgICAgICA6IFwiXFx1MDBBMFxcdTAwQTBcXHUwMEEwXFx1MDBBMFxcdTAwQTBcXHUwMEEwXCI7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHMpO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIG5hbWU6IGAke2luZGVudH1cXHUyMDIyXFx1MDBBMCR7cy50aXRsZX1gLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmdldFRpdGxlSWQocy50aXRsZSlcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgIC5jb25jYXQoW3sgbmFtZTogXCJcXHUyMDIyIEJhY2sgTWF0dGVyXCIsIHZhbHVlOiBcIkJhY2tNYXR0ZXJcIiB9XSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBbmNob3IgPSBcImp1bXBcIjtcblxuICAgICAgICB0aGlzLiRzY29wZS4kd2F0Y2goXG4gICAgICAgICAgKCkgPT4gdGhpcy5zZWxlY3RlZEFuY2hvcixcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEFuY2hvciAhPT0gXCJqdW1wXCIpIHtcbiAgICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24uaGFzaCh0aGlzLnNlbGVjdGVkQW5jaG9yKTtcbiAgICAgICAgICAgICAgdGhpcy4kYW5jaG9yU2Nyb2xsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjaGVja1BkZihpdGVtKSB7XG4gICAgICAgIHRoaXMuRmlsZVNlcnZpY2UuY2hlY2tQZGYoaXRlbS5hcnRpY2xlTG9jYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBoYW5kbGVFeHRyYUNsaWNrKGVudHJ5LCBleHRyYSwgJGV2ZW50KSB7XG4gICAgICAgIC8vIGlmIHRoZSBleHRyYSBpcyBhIHZpZGVvIC0+IGRlZmVyIHRvIHRoZSB2aWRlbyBwbGF5ZXIgc2VydmljZVxuICAgICAgICBpZiAodGhpcy51c2VWaWRlb1BsYXllcihleHRyYSkpIHtcbiAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGlzLlZpZGVvUGxheWVyU2VydmljZS5vcGVuVmlkZW8oZW50cnksIGV4dHJhLCB0aGlzLmp3dCkuY2F0Y2goZXJyID0+XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIE90aGVyd2lzZSBjaGVjayB0aGF0IHRoZSBmaWxlIGV4aXN0cyAtPiBkaXNwbGF5IGEgbm90aWZpY2F0aW9uIGlmIG5vdCBmb3VuZFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLkZpbGVTZXJ2aWNlLmNoZWNrRXh0cmEoZXh0cmEubG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHVzZVZpZGVvUGxheWVyKGV4dHJhKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgdGhpcy5WaWRlb1BsYXllclNlcnZpY2UuaXNNUDQoZXh0cmEubG9jYXRpb24pICYmXG4gICAgICAgICAgdGhpcy5wbGF5ZXJTZXR0aW5nICE9PSBcImxpbmtcIlxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBnZXRUaXRsZUlkKHRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aXRsZS5yZXBsYWNlKC8gL2csIFwiXCIpO1xuICAgICAgfVxuXG4gICAgICBnZXRTZWN0aW9uQ2xhc3Moc2VjdGlvbikge1xuICAgICAgICBpZiAoc2VjdGlvbi5jbGFzcyA9PT0gXCJTRFwiKVxuICAgICAgICAgIGlmIChzZWN0aW9uLnR5cGUgPT09IFwiU0RfU0VTU0lPTlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJoNFwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbi50eXBlID09PSBcIlNEX1NVQlNFU1NJT05cIikge1xuICAgICAgICAgICAgcmV0dXJuIFwiaDVcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNlY3Rpb24udHlwZSA9PT0gXCJTRF9UUkFDS1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJoM1wiO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2hhaXJOYW1lKHNlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlY3Rpb24uY2hhaXIgJiYgc2VjdGlvbi5jaGFpci50aXRsZSAmJiBzZWN0aW9uLmNoYWlyLm5hbWVcbiAgICAgICAgICA/IGAke3NlY3Rpb24uY2hhaXIudGl0bGV9OiAke3NlY3Rpb24uY2hhaXIubmFtZX1gXG4gICAgICAgICAgOiBcIlwiO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwid2VicHViXCIpLmZpbHRlcihcImVudHJ5UGFnZU51bWJlckZpbHRlclwiLCAoKSA9PiB7XG4gICAgcmV0dXJuIGVudHJ5ID0+IHtcbiAgICAgIGlmICghZW50cnkpIHJldHVybiBlbnRyeTtcbiAgICAgIGlmICghZW50cnkucGFnZU51bWJlcikgcmV0dXJuIGVudHJ5LnBhZ2VOdW1iZXI7XG4gICAgICBpZiAoZW50cnkuaXNQYWdlTnVtYmVyUm9tYW4pIHtcbiAgICAgICAgcmV0dXJuIHRvUm9tYW4oZW50cnkucGFnZU51bWJlcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW50cnkucGFnZU51bWJlcjtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuICBmdW5jdGlvbiB0b1JvbWFuKG51bSkge1xuICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgIHZhciBkZWNpbWFsID0gWzEwMDAsIDkwMCwgNTAwLCA0MDAsIDEwMCwgOTAsIDUwLCA0MCwgMTAsIDksIDUsIDQsIDFdO1xuICAgIHZhciByb21hbiA9IFtcbiAgICAgIFwibVwiLFxuICAgICAgXCJjbVwiLFxuICAgICAgXCJkXCIsXG4gICAgICBcImNkXCIsXG4gICAgICBcImNcIixcbiAgICAgIFwieGNcIixcbiAgICAgIFwibFwiLFxuICAgICAgXCJ4bFwiLFxuICAgICAgXCJ4XCIsXG4gICAgICBcIml4XCIsXG4gICAgICBcInZcIixcbiAgICAgIFwiaXZcIixcbiAgICAgIFwiaVwiXG4gICAgXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBkZWNpbWFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICB3aGlsZSAobnVtICUgZGVjaW1hbFtpXSA8IG51bSkge1xuICAgICAgICByZXN1bHQgKz0gcm9tYW5baV07XG4gICAgICAgIG51bSAtPSBkZWNpbWFsW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5maWx0ZXIoXCJleHRyYUxpbmtGaWx0ZXJcIiwgW1xuICAgIFwiQ29uZmlnU2VydmljZVwiLFxuICAgIFwiVmlkZW9QbGF5ZXJTZXJ2aWNlXCIsXG4gICAgKENvbmZpZ1NlcnZpY2UsIFZpZGVvUGxheWVyU2VydmljZSkgPT4ge1xuICAgICAgY29uc3QgcGxheWVyU2V0dGluZyA9IENvbmZpZ1NlcnZpY2UudmlkZW9QbGF5ZXIgfHwgXCJkZWZhdWx0XCI7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oZXh0cmEpIHtcbiAgICAgICAgLy8gaWYgaXRzIGFuIE1QNCB2aWRlbyBhbmQgd2UncmUgbm90IHVzaW5nIFwibGlua1wiIG1vZGVcbiAgICAgICAgLy8gcmV0dXJuIGFuIGVtcHR5IGxpbmtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIFZpZGVvUGxheWVyU2VydmljZS5pc01QNChleHRyYS5sb2NhdGlvbikgJiZcbiAgICAgICAgICBwbGF5ZXJTZXR0aW5nICE9PSBcImxpbmtcIlxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gXCIjXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gb3RoZXJ3aXNlIHJldHVybiBhIGxpbmsgdG8gdGhlIGV4dHJhIGZpbGVcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGV4dHJhLmxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgXSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5maWx0ZXIoXCJmaWxlVXJsRmlsdGVyXCIsIFtcbiAgICAoKSA9PiB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24odXJsLCBqd3QpIHtcbiAgICAgICAgY29uc3QgdG9rZW5QYXJhbSA9IGp3dCA/IGA/dG9rZW49JHtqd3QudG9rZW59YCA6IFwiXCI7XG4gICAgICAgIHJldHVybiBgJHt1cmx9JHt0b2tlblBhcmFtfWA7XG4gICAgICB9O1xuICAgIH1cbiAgXSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5wcm92aWRlcihcbiAgICBcIkZpbGVTZXJ2aWNlXCIsXG4gICAgY2xhc3Mge1xuICAgICAgY29uc3RydWN0b3IoKSB7fVxuICAgICAgJGdldCgkd2luZG93LCBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrRmlsZSh0eXBlLCBsb2NhdGlvbikge1xuICAgICAgICAgIGlmICghbG9jYXRpb24pIHtcbiAgICAgICAgICAgIE5vdGlmaWNhdGlvblNlcnZpY2Uuc2VuZChcbiAgICAgICAgICAgICAgXCJkYW5nZXJcIixcbiAgICAgICAgICAgICAgYCR7dHlwZX0gZmlsZSBub3QgZm91bmQgZm9yIGFydGljbGVgXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrUGRmKGxvY2F0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrRmlsZShcIlBERlwiLCBsb2NhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjaGVja0V4dHJhKGxvY2F0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrRmlsZShcIkV4dHJhXCIsIGxvY2F0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2hlY2tQZGYsXG4gICAgICAgICAgY2hlY2tFeHRyYVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwid2VicHViXCIpLnByb3ZpZGVyKFxuICAgIFwiSFRUUFNlcnZpY2VcIixcbiAgICBjbGFzcyB7XG4gICAgICBjb25zdHJ1Y3RvcigpIHt9XG4gICAgICAkZ2V0KCRodHRwKSB7XG4gICAgICAgIGNvbnN0IGdldCA9IHVybCA9PiB7XG4gICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiXG4gICAgICAgICAgICAvLyBoZWFkZXJzOiB7XG4gICAgICAgICAgICAvLyAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBwb3N0ID0gKHVybCwgYm9keSwgand0KSA9PiB7XG4gICAgICAgICAgY29uc3QgcG9zdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhOiBib2R5LFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGp3dCkge1xuICAgICAgICAgICAgcG9zdE9wdGlvbnMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke2p3dC50b2tlbn1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJGh0dHAocG9zdE9wdGlvbnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZ2V0LFxuICAgICAgICAgIHBvc3RcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5wcm92aWRlcihcbiAgICBcIkxvZ2luU2VydmljZVwiLFxuICAgIGNsYXNzIHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge31cblxuICAgICAgdmVyaWZ5Q29uZmlnSGFzRmllbGRzKGNvbmZpZywgZmllbGRzKSB7XG4gICAgICAgIGlmICghY29uZmlnLnNlcnZpY2VzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VydmljZXMgbm90IGRlZmluZWQgaW4gY29uZmlnXCIpO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkTmFtZSA9PiB7XG4gICAgICAgICAgaWYgKCFjb25maWcuc2VydmljZXNbZmllbGROYW1lXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke2ZpZWxkTmFtZX0gaXMgbm90IGRlZmluZWQgaW4gY29uZmlnLnNlcnZpY2VzYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5zZXJ2aWNlcztcbiAgICAgIH1cblxuICAgICAgJGdldChcbiAgICAgICAgbW9tZW50LFxuICAgICAgICAkc3RhdGUsXG4gICAgICAgIENvbmZpZ1NlcnZpY2UsXG4gICAgICAgIEhUVFBTZXJ2aWNlLFxuICAgICAgICBOb3RpZmljYXRpb25TZXJ2aWNlLFxuICAgICAgICBqd3RIZWxwZXJcbiAgICAgICkge1xuICAgICAgICAvLyB0aGlzIHdpbGwgb25seSBob2xkIG9uZSBlbGVtZW50LCBidXQgd2Ugd2FudCB0byB1c2UgdGhlIHB1c2ggYW5kIHBvcCBtZXRob2RzXG4gICAgICAgIGNvbnN0IHJldHVyblN0YXRlID0gW107XG5cbiAgICAgICAgY29uc3QgbG9naW4gPSAodXNlcm5hbWUsIHBhc3N3b3JkKSA9PiB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY29uZklkLFxuICAgICAgICAgICAgc3RyYXRlZ3ksXG4gICAgICAgICAgICBsb2dpblVSTFxuICAgICAgICAgIH0gPSB0aGlzLnZlcmlmeUNvbmZpZ0hhc0ZpZWxkcyhDb25maWdTZXJ2aWNlLCBbXG4gICAgICAgICAgICBcImNvbmZJZFwiLFxuICAgICAgICAgICAgXCJzdHJhdGVneVwiLFxuICAgICAgICAgICAgXCJsb2dpblVSTFwiXG4gICAgICAgICAgXSk7XG5cbiAgICAgICAgICByZXR1cm4gSFRUUFNlcnZpY2UucG9zdChsb2dpblVSTCwge1xuICAgICAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgIGNvbmZJZCxcbiAgICAgICAgICAgIHN0cmF0ZWd5XG4gICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgc3RvcmVKV1R0b0xvY2FsU3RvcmFnZShyZXNwb25zZS5kYXRhLmp3dCk7XG5cbiAgICAgICAgICAgICAgY29uc3QgeyBzdGF0ZSwgc3RhdGVQYXJhbXMgfSA9IHJldHVyblN0YXRlLnBvcCgpIHx8IHtcbiAgICAgICAgICAgICAgICBzdGF0ZTogXCJob21lXCIsXG4gICAgICAgICAgICAgICAgc3RhdGVQYXJhbXM6IHt9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICRzdGF0ZS5nbyhzdGF0ZSwgc3RhdGVQYXJhbXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJMb2dpbiBFcnJvcjogXCIsIGVycm9yKTtcbiAgICAgICAgICAgICAgTm90aWZpY2F0aW9uU2VydmljZS5zZW5kKFxuICAgICAgICAgICAgICAgIFwiZGFuZ2VyXCIsXG4gICAgICAgICAgICAgICAgXCJJbnZhbGlkIHVzZXJuYW1lIG9yIHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjaGVja0FuZFJlc29sdmVKV1QgPSAoY3VycmVudFN0YXRlLCBzdGF0ZVBhcmFtcykgPT4ge1xuICAgICAgICAgIGlmICghQ29uZmlnU2VydmljZS5zZXJ2aWNlcyB8fCAhQ29uZmlnU2VydmljZS5zZXJ2aWNlcy5hdXRoRW5hYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgeyBjb25mSWQgfSA9IHRoaXMudmVyaWZ5Q29uZmlnSGFzRmllbGRzKENvbmZpZ1NlcnZpY2UsIFtcbiAgICAgICAgICAgIFwiY29uZklkXCJcbiAgICAgICAgICBdKTtcblxuICAgICAgICAgIGNvbnN0IGp3dFN0cmluZyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGAke2NvbmZJZH1fSldUYCk7XG5cbiAgICAgICAgICAvLyBjaGVjayBpZiBhIEpXVCBleGlzdHNcbiAgICAgICAgICBpZiAoIWp3dFN0cmluZykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkpXVCBub3QgZm91bmRcIik7XG4gICAgICAgICAgICBpZiAoY3VycmVudFN0YXRlKSB7XG4gICAgICAgICAgICAgIHJldHVyblN0YXRlLnB1c2goeyBzdGF0ZTogY3VycmVudFN0YXRlLCBzdGF0ZVBhcmFtcyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNoZWNrIHRoZSBleHBpcmF0aW9uIGRhdGVcbiAgICAgICAgICBpZiAoand0SGVscGVyLmlzVG9rZW5FeHBpcmVkKGp3dFN0cmluZykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJKV1QgaXMgZXhwaXJlZFwiKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RhdGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuU3RhdGUucHVzaCh7IHN0YXRlOiBjdXJyZW50U3RhdGUsIHN0YXRlUGFyYW1zIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmV0dXJuIHRoZSBqd3RTdHJpbmcgYW5kIGRlY29kZWRKV1QgaWYgdGhlIGFib3ZlIGNoZWNrcyBwYXNzXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRva2VuOiBqd3RTdHJpbmcsXG4gICAgICAgICAgICBkYXRhOiBqd3RIZWxwZXIuZGVjb2RlVG9rZW4oand0U3RyaW5nKVxuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc3RvcmVKV1R0b0xvY2FsU3RvcmFnZSA9IGp3dFRva2VuID0+IHtcbiAgICAgICAgICBjb25zdCB7IGNvbmZJZCB9ID0gdGhpcy52ZXJpZnlDb25maWdIYXNGaWVsZHMoQ29uZmlnU2VydmljZSwgW1xuICAgICAgICAgICAgXCJjb25mSWRcIlxuICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oYCR7Y29uZklkfV9KV1RgLCBqd3RUb2tlbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBsb2dpbixcbiAgICAgICAgICBjaGVja0FuZFJlc29sdmVKV1RcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5wcm92aWRlcihcbiAgICBcIk5vdGlmaWNhdGlvblNlcnZpY2VcIixcbiAgICBjbGFzcyB7XG4gICAgICBjb25zdHJ1Y3RvcigpIHt9XG4gICAgICAkZ2V0KCkge1xuICAgICAgICBsZXQgbm90aWZpY2F0aW9ucyA9IFtdO1xuICAgICAgICBsZXQgc2VuZCA9ICh0eXBlLCBtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgbm90aWZpY2F0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbm90aWZpY2F0aW9uczogbm90aWZpY2F0aW9ucyxcbiAgICAgICAgICBzZW5kOiBzZW5kXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTtcbiIsIigoKSA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwid2VicHViXCIpLnByb3ZpZGVyKFxuICAgIFwiVGVtcGxhdGVTZXJ2aWNlXCIsXG4gICAgY2xhc3Mge1xuICAgICAgJGdldChcbiAgICAgICAgaGVsbG9UZW1wbGF0ZSxcbiAgICAgICAgdG9jVGVtcGxhdGUsXG4gICAgICAgIGF1dGhvckluZGV4VGVtcGxhdGUsXG4gICAgICAgIGlmcmFtZVRlbXBsYXRlLFxuICAgICAgICBzZWFyY2hUZW1wbGF0ZSxcbiAgICAgICAgYWZmaWxpYXRpb25JbmRleFRlbXBsYXRlLFxuICAgICAgICB2aWRlb1BsYXllck1vZGFsVGVtcGxhdGUsXG4gICAgICAgIGxvZ2luVGVtcGxhdGVcbiAgICAgICkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGdldEhlbGxvOiAoKSA9PiBoZWxsb1RlbXBsYXRlLmNvbnRlbnQoKSxcbiAgICAgICAgICBnZXRUb2M6ICgpID0+IHRvY1RlbXBsYXRlLmNvbnRlbnQoKSxcbiAgICAgICAgICBnZXRBdXRob3JJbmRleDogKCkgPT4gYXV0aG9ySW5kZXhUZW1wbGF0ZS5jb250ZW50KCksXG4gICAgICAgICAgZ2V0QWZmaWxpYXRpb25JbmRleDogKCkgPT4gYWZmaWxpYXRpb25JbmRleFRlbXBsYXRlLmNvbnRlbnQoKSxcbiAgICAgICAgICBnZXRJZnJhbWVUZW1wbGF0ZTogKCkgPT4gaWZyYW1lVGVtcGxhdGUuY29udGVudCgpLFxuICAgICAgICAgIGdldFNlYXJjaDogKCkgPT4gc2VhcmNoVGVtcGxhdGUuY29udGVudCgpLFxuICAgICAgICAgIGdldFZpZGVvUGxheWVyOiAoKSA9PiB2aWRlb1BsYXllck1vZGFsVGVtcGxhdGUuY29udGVudCgpLFxuICAgICAgICAgIGdldExvZ2luOiAoKSA9PiBsb2dpblRlbXBsYXRlLmNvbnRlbnQoKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwid2VicHViXCIpLnByb3ZpZGVyKFxuICAgIFwiVmlkZW9QbGF5ZXJTZXJ2aWNlXCIsXG4gICAgY2xhc3Mge1xuICAgICAgJGdldCgkdWliTW9kYWwsIENvbmZpZ1NlcnZpY2UpIHtcbiAgICAgICAgZnVuY3Rpb24gaXNNUDQoZmlsZW5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgZmlsZW5hbWVcbiAgICAgICAgICAgICAgLnNwbGl0KFwiLlwiKVxuICAgICAgICAgICAgICAuc2xpY2UoLTEpWzBdXG4gICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSBcIm1wNFwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9wZW5WaWRlbyhlbnRyeSwgZXh0cmEsIGp3dCkge1xuICAgICAgICAgIGNvbnN0IG1vZGFsID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgY29tcG9uZW50OiBcIndlYnB1YlZpZGVvUGxheWVyTW9kYWxcIixcbiAgICAgICAgICAgIHNpemU6IFwibGdcIixcbiAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgZW50cnk6ICgpID0+IGVudHJ5LFxuICAgICAgICAgICAgICBleHRyYTogKCkgPT4gZXh0cmEsXG4gICAgICAgICAgICAgIGp3dDogKCkgPT4gand0LFxuICAgICAgICAgICAgICBwbGF5ZXJTZXR0aW5nOiBnZXRQbGF5ZXJTZXR0aW5nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gbW9kYWwucmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0UGxheWVyU2V0dGluZygpIHtcbiAgICAgICAgICBjb25zdCBjb25maWdTZXR0aW5nID0gQ29uZmlnU2VydmljZS52aWRlb1BsYXllcjtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllciBjb25maWd1cmF0aW9uIHNldHRpbmc6IFwiLCBjb25maWdTZXR0aW5nKTtcbiAgICAgICAgICBpZiAoY29uZmlnU2V0dGluZyAmJiBjb25maWdTZXR0aW5nICE9PSBcImRlZmF1bHRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZ1NldHRpbmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3RvID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICAgICAgaWYgKHByb3RvLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChcImZpbGVcIikpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZXRlY3RlZCBmaWxlIHByb3RvY29sXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gXCJuYXRpdmVcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGV0ZWN0ZWQgaG9zdGVkIHByb3RvY29sXCIpO1xuICAgICAgICAgICAgICByZXR1cm4gXCJuYXRpdmVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9wZW5WaWRlbyxcbiAgICAgICAgICBpc01QNFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwid2VicHViXCIpLmNvbXBvbmVudChcIndlYnB1Yk5vdGlmaWNhdGlvbnNcIiwge1xuICAgIGJpbmRpbmdzOiB7fSxcbiAgICBjb250cm9sbGVyOiBjbGFzcyB7XG4gICAgICBjb25zdHJ1Y3RvcihOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuTm90aWZpY2F0aW9uU2VydmljZSA9IE5vdGlmaWNhdGlvblNlcnZpY2U7XG4gICAgICB9XG5cbiAgICAgICRvbkluaXQoKSB7XG4gICAgICAgIHRoaXMubm90aWZpY2F0aW9ucyA9IHRoaXMuTm90aWZpY2F0aW9uU2VydmljZS5ub3RpZmljYXRpb25zO1xuICAgICAgfVxuICAgIH0sXG4gICAgdGVtcGxhdGU6IGA8IS0tIEhpZGUgdGhlIG5vdGlmaWNhdGlvbnMgbW9kdWxlIHVudGlsIHRoZSBhcHBsaWNhdGlvbiBsb2Fkcy4gLS0+XG4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLW5nLWNsb2FrPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1ncm93bC1ub3RpZmljYXRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1uZy1pZj1cIiRjdHJsLm5vdGlmaWNhdGlvbnNcIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gKG5vdGlmaWNhdGlvbnMpIE5vdGlmaWNhdGlvbnMgbGlzdCAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1uZy1yZXBlYXQ9XCJub3RpZmljYXRpb24gaW4gJGN0cmwubm90aWZpY2F0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJub3RpZmljYXRpb24gZmFkaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtZ3Jvd2wtbm90aWZpY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLW5nLWNsYXNzPVwibm90aWZpY2F0aW9uLnR5cGVcIj57eyBub3RpZmljYXRpb24ubWVzc2FnZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBgXG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoXCJ3ZWJwdWJcIikuY29tcG9uZW50KFwid2VicHViVmlkZW9QbGF5ZXJNb2RhbFwiLCB7XG4gICAgYmluZGluZ3M6IHtcbiAgICAgIGNsb3NlOiBcIiZcIixcbiAgICAgIGRpc21pc3M6IFwiJlwiLFxuICAgICAgc2l6ZTogXCJAXCIsXG4gICAgICByZXNvbHZlOiBcIjxcIlxuICAgIH0sXG4gICAgdGVtcGxhdGU6IFRlbXBsYXRlU2VydmljZSA9PiBUZW1wbGF0ZVNlcnZpY2UuZ2V0VmlkZW9QbGF5ZXIoKSxcbiAgICBjb250cm9sbGVyOiBjbGFzcyB7XG4gICAgICBjb25zdHJ1Y3Rvcigkc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICB9XG5cbiAgICAgICRvbkluaXQoKSB7XG4gICAgICAgIC8vIGhhbmRsZSByZXNvbHZlc1xuICAgICAgICB0aGlzLmVudHJ5ID0gdGhpcy5yZXNvbHZlLmVudHJ5O1xuICAgICAgICB0aGlzLmV4dHJhID0gdGhpcy5yZXNvbHZlLmV4dHJhO1xuICAgICAgICB0aGlzLnBsYXllclNldHRpbmcgPSB0aGlzLnJlc29sdmUucGxheWVyU2V0dGluZztcbiAgICAgICAgdGhpcy5qd3QgPSB0aGlzLnJlc29sdmUuand0O1xuXG4gICAgICAgIC8vIGRlY2xhcmUgaGVscGVyIHZhcmlhYmxlc1xuICAgICAgICBjb25zdCBwbGF5ZXJTZXR0aW5nID0gdGhpcy5wbGF5ZXJTZXR0aW5nO1xuICAgICAgICB0aGlzLmlzTmF0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNWaWRlb0pzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNZWRpYUVsZW1lbnQgPSBmYWxzZTtcblxuICAgICAgICAvLyBzZXQgcGxheWVyIHR5cGUgdmFyaWFibGVzXG4gICAgICAgIGlmIChwbGF5ZXJTZXR0aW5nID09PSBcInZpZGVvanNcIikge1xuICAgICAgICAgIHRoaXMuaXNWaWRlb0pzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXJTZXR0aW5nID09PSBcIm1lZGlhZWxlbWVudFwiKSB7XG4gICAgICAgICAgdGhpcy5pc01lZGlhRWxlbWVudCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pc05hdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjbGVhbiB1cCBub24tbmF0aXZlIHBsYXllciBvYmplY3RzIHdoZW4gbW9kYWwgY2xvc2VzXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihcIm1vZGFsLmNsb3NpbmdcIiwgKGV2ZW50LCByZWFzb24sIGNsb3NlZCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwibW9kYWwgY2xvc2luZzogXCIsIGV2ZW50LCByZWFzb24sIGNsb3NlZCk7XG4gICAgICAgICAgaWYgKHRoaXMuaXNWaWRlb0pzKSB7XG4gICAgICAgICAgICAvLyBjYWxsIGRpc3Bvc2UgaWYgcGxheWVyIHR5cGUgaXMgdmlkZW9Kc1xuICAgICAgICAgICAgdGhpcy52aWRlb1BsYXllci5kaXNwb3NlKCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTWVkaWFFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBwYXVzZSB0aGVuIHJlbW92ZSBwbGF5ZXIgaWYgdHlwZSBpcyBNZWRpYUVsZW1lbnRcbiAgICAgICAgICAgIGlmICghdGhpcy52aWRlb1BsYXllci5wYXVzZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy52aWRlb1BsYXllci5wYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52aWRlb1BsYXllci5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyAkcG9zdExpbmsgaXMgY2FsbGVkIGFmdGVyIGNvbXBvbmVudHMgYW5kIGNoaWxkcmVuIGFyZSBhZGRlZCB0byBET01cbiAgICAgICRwb3N0TGluaygpIHtcbiAgICAgICAgdGhpcy5zZXRTb3VyY2UoKTtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBNZWRpYUVsZW1lbnQgcGxheWVyXG4gICAgICAgIGlmICh0aGlzLmlzTWVkaWFFbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy52aWRlb1BsYXllciA9IG5ldyBNZWRpYUVsZW1lbnRQbGF5ZXIoXCJ2aWRlb1BsYXllclwiLCB7XG4gICAgICAgICAgICBkZWZhdWx0VmlkZW9IZWlnaHQ6IDQ4MCxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB0cnVlLFxuICAgICAgICAgICAgc3VjY2VzczogKG1lZGlhRWxlbWVudCwgbm9kZSwgaW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgXCJNZWRpYSBlbGVtZW50IHBsYXllciBpcyBsb2FkZWQ6IFwiLFxuICAgICAgICAgICAgICAgIG1lZGlhRWxlbWVudCxcbiAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgIGluc3RhbmNlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZChcImhlaWdodC13aWR0aC0xMDBcIik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IChlcnJvciwgbWVkaWFFbGVtZW50LCBub2RlKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJFcnJvciBsb2FkaW5nIG1lZGlhIGVsZW1lbnQgcGxheWVyOiBcIixcbiAgICAgICAgICAgICAgICBlcnJvcixcbiAgICAgICAgICAgICAgICBtZWRpYSxcbiAgICAgICAgICAgICAgICBub2RlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB2aWRlb0pzIHBsYXllclxuICAgICAgICBlbHNlIGlmICh0aGlzLmlzVmlkZW9Kcykge1xuICAgICAgICAgIHRoaXMuc2V0U291cmNlKCk7XG4gICAgICAgICAgdGhpcy5zZXRWaWRlb0NsYXNzZXMoKTtcbiAgICAgICAgICB0aGlzLnZpZGVvUGxheWVyID0gdmlkZW9qcyhcInZpZGVvUGxheWVyXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGluaXRpYWxpemUgTmF0aXZlIFZpZGVvIFNvdXJjZVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldFZpZGVvQ2xhc3NlcygpO1xuICAgICAgICAgIHRoaXMuc2V0U291cmNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb25DbG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgfVxuXG4gICAgICAvKiogVGhlIHZpZGVvSnMgQVBJIHNlZW1lZCB0byBub3Qgc2V0IHRoZSB2aWRlbyBzb3VyY2UgcHJvcGVybHkgd2hlbiB1c2luZyB0aGUgdXN1YWwgYW5ndWxhciBoYW5kbGViYXJzXG4gICAgICAgKiBHb29kIG9sJyBKUXVlcnkgc2hvdWxkIGRvIHRoZSB0cmlja1xuICAgICAgICovXG4gICAgICBzZXRTb3VyY2UoKSB7XG4gICAgICAgIGNvbnN0IHZpZGVvU291cmNlID0gYW5ndWxhci5lbGVtZW50KFwiI3ZpZGVvU291cmNlXCIpO1xuICAgICAgICBjb25zdCBqd3RQYXJhbSA9IHRoaXMuand0ID8gYD90b2tlbj0ke3RoaXMuand0LnRva2VufWAgOiBcIlwiO1xuICAgICAgICB2aWRlb1NvdXJjZS5hdHRyKFwic3JjXCIsIGAke3RoaXMuZXh0cmEubG9jYXRpb259JHtqd3RQYXJhbX1gKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBTZXQgY2xhc3NlcyBzcGVjaWZpYyB0byB0aGUgdmlkZW8gcGxheWVyIGJlaW5nIHVzZWRcbiAgICAgICAqIFRoaXMgc2VlbXMgdG8gd29yayBiZXR0ZXIgaW4gSlF1ZXJ5IGZvciBzb21lIHBsYXllcnNcbiAgICAgICAqL1xuICAgICAgc2V0VmlkZW9DbGFzc2VzKCkge1xuICAgICAgICBjb25zdCB2aWRlb1BsYXllciA9IGFuZ3VsYXIuZWxlbWVudChcIiN2aWRlb1BsYXllclwiKTtcbiAgICAgICAgY29uc3QgdmlkZW9XcmFwcGVyID0gYW5ndWxhci5lbGVtZW50KFwiI3ZpZGVvV3JhcHBlclwiKTtcbiAgICAgICAgaWYgKHRoaXMuaXNWaWRlb0pzKSB7XG4gICAgICAgICAgdmlkZW9QbGF5ZXIuYWRkQ2xhc3MoXCJ2aWRlby1qcyB2anMtMTYtOVwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTWVkaWFFbGVtZW50KSB7XG4gICAgICAgICAgdmlkZW9QbGF5ZXIuYWRkQ2xhc3MoXCJoZWlnaHQtd2lkdGgtMTAwXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZpZGVvUGxheWVyLmF0dHIoXCJoZWlnaHRcIiwgNDgwKTtcbiAgICAgICAgICB2aWRlb1BsYXllci5jc3MoeyB3aWR0aDogXCIxMDAlXCIsIG91dGxpbmU6IFwibm9uZVwiIH0pO1xuICAgICAgICAgIHZpZGVvV3JhcHBlci5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiIzAwMFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KSgpO1xuIiwiKCgpID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoXCJ3ZWJwdWJcIikucHJvdmlkZXIoXG4gICAgXCJhZmZpbGlhdGlvbkluZGV4VGVtcGxhdGVcIixcbiAgICBjbGFzcyB7XG4gICAgICBjb25zdHJ1Y3RvcigpIHt9XG4gICAgICAkZ2V0KCkge1xuICAgICAgICBsZXQgY29udGVudCA9ICgpID0+XG4gICAgICAgICAgYDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tdG9vbGJhciBwdFwiIHJvbGU9XCJ0b29sYmFyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIGRhdGEtbmctcmVwZWF0PVwibGV0dGVyIGluICRjdHJsLmFscGhhYmV0XCIgZGF0YS1uZy1jbGljaz1cIiRjdHJsLnNjcm9sbFRvQW5jaG9yKGxldHRlcilcIj57e2xldHRlcn19PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+ICAgIFxuPC9kaXY+XG48ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICA8aDE+QWZmaWxpYXRpb24gSW5kZXg8L2gxPlxuICAgICAgICA8ZGl2IGRhdGEtbmctcmVwZWF0PVwibGV0dGVyIGluICRjdHJsLmFscGhhYmV0XCI+XG4gICAgICAgICAgICA8aDMgaWQ9XCJ7e2xldHRlcn19XCI+e3tsZXR0ZXJ9fTwvaDM+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtbmctcmVwZWF0PVwiYWZmIGluICRjdHJsLmFmZmlsaWF0aW9uTWFwW2xldHRlcl1cIj5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDBcIj57e2FmZi5hZmZpbGlhdGlvbn19PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1uZy1yZXBlYXQ9XCJhcnRpY2xlIGluIGFmZi5hcnRpY2xlUmVmc1wiXG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDVweFwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLW5nLWlmPVwiIWFydGljbGUuYXJ0aWNsZUxvY2F0aW9uXCIgc3R5bGU9XCJjb2xvcjogIzIzNTI3YztcIj57e2FydGljbGUuYXJ0aWNsZU5hbWV9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS1uZy1pZj1cImFydGljbGUuYXJ0aWNsZUxvY2F0aW9uXCIgZGF0YS1uZy1ocmVmPVwie3thcnRpY2xlLmFydGljbGVMb2NhdGlvbiB8IGZpbGVVcmxGaWx0ZXIgOiAkY3RybC5qd3R9fVwiIHRhcmdldD1cIl9ibGFua1wiIGRhdGEtbmctY2xpY2s9XCIkY3RybC5jaGVja1BkZihhcnRpY2xlLmFydGljbGVMb2NhdGlvbilcIj57e2FydGljbGUuYXJ0aWNsZU5hbWV9fTwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4gICAgICAgIFxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbmA7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb250ZW50XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTtcbiIsIigoKSA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwid2VicHViXCIpLnByb3ZpZGVyKFxuICAgIFwiYXV0aG9ySW5kZXhUZW1wbGF0ZVwiLFxuICAgIGNsYXNzIHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICAgICRnZXQoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gKCkgPT5cbiAgICAgICAgICBgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi10b29sYmFyIHB0XCIgcm9sZT1cInRvb2xiYXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgZGF0YS1uZy1yZXBlYXQ9XCJsZXR0ZXIgaW4gJGN0cmwuYWxwaGFiZXRcIiBkYXRhLW5nLWNsaWNrPVwiJGN0cmwuc2Nyb2xsVG9BbmNob3IobGV0dGVyKVwiPnt7bGV0dGVyfX08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4gICAgXG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgIDxoMT5BdXRob3IgSW5kZXg8L2gxPlxuICAgICAgICA8ZGl2IGRhdGEtbmctcmVwZWF0PVwibGV0dGVyIGluICRjdHJsLmFscGhhYmV0XCI+XG4gICAgICAgICAgICA8aDMgaWQ9XCJ7e2xldHRlcn19XCI+e3tsZXR0ZXJ9fTwvaDM+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtbmctcmVwZWF0PVwiYXV0aG9yIGluICRjdHJsLmF1dGhvck1hcFtsZXR0ZXJdXCI+XG4gICAgICAgICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAwXCI+e3thdXRob3IuYXV0aG9yTmFtZX19PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1uZy1yZXBlYXQ9XCJhcnRpY2xlIGluIGF1dGhvci5hcnRpY2xlUmVmc1wiXG4gICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDVweFwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBkYXRhLW5nLWlmPVwiIWFydGljbGUuYXJ0aWNsZUxvY2F0aW9uXCIgc3R5bGU9XCJjb2xvcjogIzIzNTI3YztcIj57e2FydGljbGUuYXJ0aWNsZU5hbWV9fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPGEgZGF0YS1uZy1pZj1cImFydGljbGUuYXJ0aWNsZUxvY2F0aW9uXCIgZGF0YS1uZy1ocmVmPVwie3thcnRpY2xlLmFydGljbGVMb2NhdGlvbiB8IGZpbGVVcmxGaWx0ZXIgOiAkY3RybC5qd3R9fVwiIHRhcmdldD1cIl9ibGFua1wiIGRhdGEtbmctY2xpY2s9XCIkY3RybC5jaGVja1BkZihhcnRpY2xlLmFydGljbGVMb2NhdGlvbilcIj57e2FydGljbGUuYXJ0aWNsZU5hbWV9fTwvYT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4gICAgICAgIFxuICAgIDwvZGl2PlxuPC9kaXY+XG5cbmA7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb250ZW50XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTtcbiIsIigoKSA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwid2VicHViXCIpLnByb3ZpZGVyKFxuICAgIFwiaGVsbG9UZW1wbGF0ZVwiLFxuICAgIGNsYXNzIHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICAgICRnZXQoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gKCkgPT4gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj57eyRjdHJsLmhlbGxvKCl9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29udGVudFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn0pKCk7XG4iLCIoKCkgPT4ge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5wcm92aWRlcihcbiAgICBcImlmcmFtZVRlbXBsYXRlXCIsXG4gICAgY2xhc3Mge1xuICAgICAgY29uc3RydWN0b3IoKSB7fVxuICAgICAgJGdldCgpIHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSAoKSA9PlxuICAgICAgICAgIGA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZW1iZWQtcmVzcG9uc2l2ZSBlbWJlZC1yZXNwb25zaXZlLTE2Ynk5XCI+XG4gICAgICAgICAgICA8aWZyYW1lIGNsYXNzPVwiZW1iZWQtcmVzcG9uc2l2ZS1pdGVtXCIgZGF0YS1uZy1zcmM9XCJ7eyRjdHJsLmxvY2F0aW9ufX1cIj48L2lmcmFtZT5cbiAgICAgICAgPC9kaXY+ICAgICAgICBcbiAgICA8L2Rpdj5cbjwvZGl2PmA7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb250ZW50XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTtcbiIsIigoKSA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGFuZ3VsYXIubW9kdWxlKFwid2VicHViXCIpLnByb3ZpZGVyKFxuICAgIFwibG9naW5UZW1wbGF0ZVwiLFxuICAgIGNsYXNzIHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICAgICRnZXQoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gKCkgPT5cbiAgICAgICAgICBgXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImxvZ2luLXdyYXBwZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2dpbi1mb3JtQ29udGVudFwiPlxuICAgICAgICAgICAgICA8IS0tIFRpdGxlIC0tPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cImxvZ2luLXRpdGxlXCI+U2lnbiBJbjwvaDE+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgICAgICAgPCEtLSBMb2dpbiBGb3JtIC0tPlxuICAgICAgICAgICAgICA8Zm9ybSBkYXRhLW5nLWhpZGU9XCIkY3RybC5sb2FkaW5nXCIgbmctc3VibWl0PVwiJGN0cmwubG9naW4oKVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibG9naW5cIiBuYW1lPVwibG9naW5cIiBwbGFjZWhvbGRlcj1cIlVzZXJuYW1lXCIgY2xhc3M9XCJsb2dpbi1pbnB1dFwiIGRhdGEtbmctbW9kZWw9XCIkY3RybC51c2VybmFtZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgbmFtZT1cImxvZ2luXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIGNsYXNzPVwibG9naW4taW5wdXRcIiBkYXRhLW5nLW1vZGVsPVwiJGN0cmwucGFzc3dvcmRcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgZGF0YS1uZy1oaWRlPSRjdHJsLmxvYWRpbmcgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwibG9naW4tYnV0dG9uXCIgdmFsdWU9XCJTaWduIEluXCI+XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgZGF0YS1uZy1zaG93PVwiJGN0cmwubG9hZGluZ1wiIGNsYXNzPVwicHYtbGdcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLWNpcmNsZS1vLW5vdGNoIGZhLXNwaW4gZmEtM3ggZmEtZncgbG9hZGluZ1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHlcIj5Mb2FkaW5nLi4uPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAgICAgICA8IS0tIFJlbWluZCBQYXNzb3dyZCAtLT5cbiAgICAgICAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwibG9naW4tZm9ybUZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwidW5kZXJsaW5lSG92ZXJcIiBocmVmPVwiI1wiPkdvIHRvIHRoZSBTaXRlPC9hPlxuICAgICAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+YDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59KSgpO1xuIiwiKCgpID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoXCJ3ZWJwdWJcIikucHJvdmlkZXIoXG4gICAgXCJzZWFyY2hUZW1wbGF0ZVwiLFxuICAgIGNsYXNzIHtcbiAgICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICAgICRnZXQoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gKCkgPT5cbiAgICAgICAgICBgPGRpdiBjbGFzcz1cInJvdyBtdC1sZ1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwIGN1c3RvbS1zZWFyY2gtZm9ybVwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBkYXRhLW5nLWNoYW5nZT1cIiRjdHJsLnNlYXJjaElucHV0KClcIiBkYXRhLW5nLW1vZGVsPVwiJGN0cmwuc2VhcmNoVGVybVwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoLi4uXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtc2VhcmNoXCI+PC9pPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGhyPlxuICAgICAgICA8aDMgZGF0YS1uZy1pZj1cIiRjdHJsLnNlYXJjaFJlc3VsdHMgJiYgJGN0cmwuc2VhcmNoUmVzdWx0cy5sZW5ndGhcIj5SZXN1bHRzOjwvaDM+XG4gICAgICAgIDxkaXYgZGF0YS1uZy1yZXBlYXQ9XCJyZXN1bHQgaW4gJGN0cmwuc2VhcmNoUmVzdWx0c1wiPlxuICAgICAgICAgICAgPHAgZGF0YS1uZy1pZj1cIiFyZXN1bHQuYXJ0aWNsZUxvY2F0aW9uXCIgY2xhc3M9XCJ0ZXh0LWJvbGRcIiBzdHlsZT1cImNvbG9yOiAjMjM1MjdjO1wiPnt7cmVzdWx0LnRleHR9fTwvcD5cbiAgICAgICAgICAgIDxhIGRhdGEtbmctaWY9XCJyZXN1bHQuYXJ0aWNsZUxvY2F0aW9uXCIgY2xhc3M9XCJ0ZXh0LWJvbGRcIiBkYXRhLW5nLWhyZWY9XCJ7e3Jlc3VsdC5hcnRpY2xlTG9jYXRpb24gfCBmaWxlVXJsRmlsdGVyIDogJGN0cmwuand0fX1cIiB0YXJnZXQ9XCJfYmxhbmtcIiBuZy1jbGljaz1cIiRjdHJsLmNoZWNrUGRmKHJlc3VsdClcIj57e3Jlc3VsdC50ZXh0fX08L2E+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInBsLWxnXCI+PGVtPnt7cmVzdWx0LmF1dGhvck5hbWVzfX08L2VtPjwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwicGwtbGcgc2VhcmNoLXJlc3VsdFwiIGRhdGEtbmctYmluZD1cIiRjdHJsLmdldEFic3RyYWN0KHJlc3VsdClcIiBkYXRhLWVsbGlwc2lzPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5gO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29udGVudFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn0pKCk7XG4iLCIoKCkgPT4ge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBhbmd1bGFyLm1vZHVsZShcIndlYnB1YlwiKS5wcm92aWRlcihcbiAgICBcInRvY1RlbXBsYXRlXCIsXG4gICAgY2xhc3Mge1xuICAgICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgICAkZ2V0KCkge1xuICAgICAgICBsZXQgY29udGVudCA9ICgpID0+XG4gICAgICAgICAgYDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtOFwiPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cInRleHQtYm9sZFwiPnt7JGN0cmwuY29uZmVyZW5jZS5hY3JvbnltfX0ge3skY3RybC5jb25mZXJlbmNlLnllYXJ9fTwvaDE+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtNFwiPlxuICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2wgbXQteGxcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhLW5nLW1vZGVsPVwiJGN0cmwuc2VsZWN0ZWRBbmNob3JcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhLW5nLW9wdGlvbnM9XCJhbmNob3IudmFsdWUgYXMgYW5jaG9yLm5hbWUgZm9yIGFuY2hvciBpbiAkY3RybC5hbmNob3JzXCI+ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4gICAgICAgIFxuICAgICAgICA8aDI+e3skY3RybC5jb25mZXJlbmNlLnRpdGxlfX08L2gyPlxuICAgICAgICA8aDM+VGFibGUgb2YgQ29udGVudHM8L2gzPlxuICAgICAgICA8aDMgY2xhc3M9XCJ0ZXh0LWJvbGRcIiBpZD1cIkZyb250TWF0dGVyXCI+RnJvbnQgTWF0dGVyPHNwYW4gY2xhc3M9XCJwdWxsLXJpZ2h0IHRleHQtbm9ybWFsXCI+UGFnZSBOdW1iZXI8L3NwYW4+PC9oMz5cbiAgICAgICAgPGRpdiBkYXRhLW5nLXJlcGVhdD1cImZtIGluICRjdHJsLmNvbmZlcmVuY2UuZnJvbnRNYXR0ZXJcIj5cbiAgICAgICAgICAgIDxwIGRhdGEtbmctaWY9XCIhZm0uYXJ0aWNsZUxvY2F0aW9uXCIgY2xhc3M9XCJ0ZXh0LWJvbGRcIiBzdHlsZT1cImNvbG9yOiAjMjM1MjdjO1wiPnt7Zm0udGV4dH19PHNwYW4gY2xhc3M9XCJwdWxsLXJpZ2h0XCI+e3tmbSB8IGVudHJ5UGFnZU51bWJlckZpbHRlcn19PC9wPlxuICAgICAgICAgICAgPGEgZGF0YS1uZy1pZj1cImZtLmFydGljbGVMb2NhdGlvblwiIGNsYXNzPVwidGV4dC1ib2xkXCIgZGF0YS1uZy1ocmVmPVwie3tmbS5hcnRpY2xlTG9jYXRpb24gfCBmaWxlVXJsRmlsdGVyIDogJGN0cmwuand0fX1cIiB0YXJnZXQ9XCJfYmxhbmtcIiBuZy1jbGljaz1cIiRjdHJsLmNoZWNrUGRmKGZtKVwiPnt7Zm0udGV4dH19PHNwYW4gY2xhc3M9XCJwdWxsLXJpZ2h0XCI+e3tmbSB8IGVudHJ5UGFnZU51bWJlckZpbHRlcn19PC9zcGFuPjwvYT5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1uZy1yZXBlYXQ9XCJleHRyYSBpbiBmbS5leHRyYUxvY2F0aW9uc1wiIGNsYXNzPVwicGJcIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInBsLWxnXCIgZGF0YS1uZy1ocmVmPVwie3tleHRyYSB8IGV4dHJhTGlua0ZpbHRlciB8IGZpbGVVcmxGaWx0ZXIgOiAkY3RybC5qd3R9fVwiIHRhcmdldD1cIl9ibGFua1wiIGRhdGEtbmctY2xpY2s9XCIkY3RybC5oYW5kbGVFeHRyYUNsaWNrKGZtLCBleHRyYSwgJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1uZy1pZj1cIiRjdHJsLnVzZVZpZGVvUGxheWVyKGV4dHJhKVwiIGNsYXNzPVwiZmEgZmEtdmlkZW8tY2FtZXJhIG1yLXNtXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAge3tleHRyYS5uYW1lfX1cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgZGF0YS1uZy1yZXBlYXQ9XCJzZWN0aW9uIGluICRjdHJsLmNvbmZlcmVuY2Uuc2VjdGlvbnNcIj5cbiAgICAgICAgICAgIDxocj5cbiAgICAgICAgICAgIDxoMyBjbGFzcz1cInRleHQtYm9sZFwiIGRhdGEtbmctY2xhc3M9XCIkY3RybC5nZXRTZWN0aW9uQ2xhc3Moc2VjdGlvbilcIiBpZD1cInt7JGN0cmwuZ2V0VGl0bGVJZChzZWN0aW9uLnRpdGxlKX19XCI+e3tzZWN0aW9uLnRpdGxlfX08L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZXh0LWJvbGRcIj57eyRjdHJsLmNoYWlyTmFtZShzZWN0aW9uKX19PC9wPlxuICAgICAgICAgICAgPGRpdiBkYXRhLW5nLXJlcGVhdD1cIml0ZW0gaW4gc2VjdGlvbi5saW5lSXRlbXNcIj5cbiAgICAgICAgICAgICAgICA8cCBkYXRhLW5nLWlmPVwiIWl0ZW0uYXJ0aWNsZUxvY2F0aW9uXCIgY2xhc3M9XCJ0ZXh0LWJvbGRcIiBzdHlsZT1cImNvbG9yOiAjMjM1MjdjO1wiPnt7aXRlbS50ZXh0fX08c3BhbiBjbGFzcz1cInB1bGwtcmlnaHRcIj57e2l0ZW0gfCBlbnRyeVBhZ2VOdW1iZXJGaWx0ZXJ9fTwvc3Bhbj48L3A+XG4gICAgICAgICAgICAgICAgPGEgZGF0YS1uZy1pZj1cIml0ZW0uYXJ0aWNsZUxvY2F0aW9uXCIgY2xhc3M9XCJ0ZXh0LWJvbGRcIiBkYXRhLW5nLWhyZWY9XCJ7e2l0ZW0uYXJ0aWNsZUxvY2F0aW9uIHwgZmlsZVVybEZpbHRlciA6ICRjdHJsLmp3dH19XCIgdGFyZ2V0PVwiX2JsYW5rXCIgbmctY2xpY2s9XCIkY3RybC5jaGVja1BkZihpdGVtKVwiPnt7aXRlbS50ZXh0fX08c3BhbiBjbGFzcz1cInB1bGwtcmlnaHRcIj57e2l0ZW0gfCBlbnRyeVBhZ2VOdW1iZXJGaWx0ZXJ9fTwvc3Bhbj48L2E+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwbC1sZ1wiPjxlbT57e2l0ZW0uYXV0aG9yTmFtZXN9fTwvZW0+PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1uZy1yZXBlYXQ9XCJleHRyYSBpbiBpdGVtLmV4dHJhTG9jYXRpb25zXCIgY2xhc3M9XCJwYlwiPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInBsLWxnXCIgZGF0YS1uZy1ocmVmPVwie3tleHRyYSB8IGV4dHJhTGlua0ZpbHRlciB8IGZpbGVVcmxGaWx0ZXIgOiAkY3RybC5qd3R9fVwiIHRhcmdldD1cIl9ibGFua1wiIGRhdGEtbmctY2xpY2s9XCIkY3RybC5oYW5kbGVFeHRyYUNsaWNrKGl0ZW0sIGV4dHJhLCAkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1uZy1pZj1cIiRjdHJsLnVzZVZpZGVvUGxheWVyKGV4dHJhKVwiIGNsYXNzPVwiZmEgZmEtdmlkZW8tY2FtZXJhIG1yLXNtXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHt7ZXh0cmEubmFtZX19XG4gICAgICAgICAgICAgICAgICAgIDwvYT4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aHI+XG4gICAgICAgIDxoMyBjbGFzcz1cInRleHQtYm9sZFwiIGlkPVwiQmFja01hdHRlclwiPjwvaDM+XG4gICAgICAgIDxkaXYgZGF0YS1uZy1yZXBlYXQ9XCJibSBpbiAkY3RybC5jb25mZXJlbmNlLmJhY2tNYXR0ZXJcIj5cbiAgICAgICAgICAgIDxwIGRhdGEtbmctaWY9XCIhYm0uYXJ0aWNsZUxvY2F0aW9uXCIgY2xhc3M9XCJ0ZXh0LWJvbGRcIiBzdHlsZT1cImNvbG9yOiAjMjM1MjdjO1wiPnt7Ym0udGV4dH19PHNwYW4gY2xhc3M9XCJwdWxsLXJpZ2h0XCI+e3tibSB8IGVudHJ5UGFnZU51bWJlckZpbHRlcn19PC9zcGFuPjwvcD5cbiAgICAgICAgICAgIDxhIGRhdGEtbmctaWY9XCJibS5hcnRpY2xlTG9jYXRpb25cIiBjbGFzcz1cInRleHQtYm9sZFwiIGRhdGEtbmctaHJlZj1cInt7Ym0uYXJ0aWNsZUxvY2F0aW9uIHwgZmlsZVVybEZpbHRlciA6ICRjdHJsLmp3dH19XCIgdGFyZ2V0PVwiX2JsYW5rXCIgbmctY2xpY2s9XCIkY3RybC5jaGVja1BkZihibSlcIj57e2JtLnRleHR9fTxzcGFuIGNsYXNzPVwicHVsbC1yaWdodFwiPnt7Ym0gfCBlbnRyeVBhZ2VOdW1iZXJGaWx0ZXJ9fTwvc3Bhbj48L2E+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtbmctcmVwZWF0PVwiZXh0cmEgaW4gYm0uZXh0cmFMb2NhdGlvbnNcIiBjbGFzcz1cInBiXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJwbC1sZ1wiIGRhdGEtbmctaHJlZj1cInt7ZXh0cmEgfCBleHRyYUxpbmtGaWx0ZXIgfCBmaWxlVXJsRmlsdGVyIDogJGN0cmwuand0fX1cIiB0YXJnZXQ9XCJfYmxhbmtcIiBkYXRhLW5nLWNsaWNrPVwiJGN0cmwuaGFuZGxlRXh0cmFDbGljayhibSwgZXh0cmEsICRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1uZy1pZj1cIiRjdHJsLnVzZVZpZGVvUGxheWVyKGV4dHJhKVwiIGNsYXNzPVwiZmEgZmEtdmlkZW8tY2FtZXJhIG1yLXNtXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7e2V4dHJhLm5hbWV9fVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNvbnRlbnRcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59KSgpO1xuIiwiKCgpID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgYW5ndWxhci5tb2R1bGUoXCJ3ZWJwdWJcIikucHJvdmlkZXIoXG4gICAgXCJ2aWRlb1BsYXllck1vZGFsVGVtcGxhdGVcIixcbiAgICBjbGFzcyB7XG4gICAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAgICRnZXQoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gKCkgPT4gYFxuPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLW5nLWNsaWNrPVwiJGN0cmwub25DbG9zZSgpXCI+PHNwYW4+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj5cbiAgICA8aDQgY2xhc3M9XCJtb2RhbC10aXRsZVwiPnt7JGN0cmwuZW50cnkudGV4dH19Jm5ic3A7e3skY3RybC5wbGF5ZXJTZXR0aW5nfX08L2g0PlxuPC9kaXY+XG48ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiIGlkPVwibW9kYWwtYm9keVwiPlxuICAgIDxkaXYgaWQ9XCJ2aWRlb1dyYXBwZXJcIj5cbiAgICAgICAgPHZpZGVvIGlkPVwidmlkZW9QbGF5ZXJcIiBjb250cm9scz1cImNvbnRyb2xzXCIgYXV0b3BsYXk+XG4gICAgICAgICAgICA8c291cmNlIGlkPXZpZGVvU291cmNlIHNyYz1cIlwiIHR5cGU9XCJ2aWRlby9tcDRcIiAvPlxuICAgICAgICA8L3ZpZGVvPiBcbiAgICA8L2Rpdj4gICAgICAgICAgXG48L2Rpdj5cbmA7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjb250ZW50XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTtcbiJdfQ==
