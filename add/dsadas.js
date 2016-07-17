$(document).ready(function(){
   
   /*案例效果*/  
   $(".wrapper ul li").hover(function(){

   $(this).addClass("butf")

   },function(){

    $(this).removeClass("butf")
   })
  
   $(".wrapper ul li").hover(function(){

   $(this).find("p").stop().animate({top:"15px"})

   },function(){

   $(this).find("p").stop().animate({top:"0px"})

   })

   $(".wrapper ul li").hover(function(){

   $(this).find("span").stop().animate({top:"-8px",opacity:"0"})

   },function(){

   $(this).find("span").stop().animate({top:"0px",opacity:"1"})

   })

   /*案例效果*/
    $(".main_visual").hover(function(){
        $("#btn_prev,#btn_next").fadeIn()     //箭头渐渐显示出来
    },function(){
        $("#btn_prev,#btn_next").fadeOut()    //渐渐隐藏
    });

    $dragBln = false;                    

    $(".main_image").touchSlider({          //所有图片
        flexible : true,
        speed : 1000,                        //速度
        btn_prev : $("#btn_prev"),            //按钮
        btn_next : $("#btn_next"),            //按钮
        paging : $(".flicking_con a"),        //12345
        counter : function (e){           
            $(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
        }
    });                                                                                //添加和移除样式

    $(".main_image").bind("mousedown", function() {                  //添加处理事件
        $dragBln = false;                                            //开关
    });

    $(".main_image").bind("dragstart", function() {                 //添加处理事件
        $dragBln = true;                                           //开关  
    });

    $(".main_image a").click(function(){                        // 鼠标点击事件
        if($dragBln) {                                              
            return false;                                  
        }
    });

    timer = setInterval(function(){              //定时器
        $("#btn_next").click();
    }, 5000);                        

    $(".main_visual").hover(function(){
        clearInterval(timer);                      
    },function(){
        timer = setInterval(function(){
            $("#btn_next").click();                
        },5000);
    });

    $(".main_image").bind("touchstart",function(){
        clearInterval(timer);
    }).bind("touchend", function(){
        timer = setInterval(function(){
            $("#btn_next").click();
        }, 5000);
    });
/*轮播结束*/
   function donghua(){
              
              var hea=$(".head")

              $(window).scroll(function(){

               var Scrollheight=$(window).height();

               var Scrolltop=$(window).scrollTop();
        
               Scrolltop > 50 ? hea.addClass("mini") : hea.removeClass("mini") 

               })
   }
   donghua()   
/*顶部导航效果结束*/
   

  $(".viewm").hover(function(){

  $(this).find("p").stop().animate({right:"30px"})

  },function(){

  $(this).find("p").stop().animate({right:"0px"})

  })
  
  /*MORE按键动画*/
    $(".viewm span").hover(function(){

  $(this).find("i>img").stop().animate({left:"20px"})

  },function(){

  $(this).find("i>img").stop().animate({left:"0px"})

  })
 /*MORE按键动画结束*/
 /*MORE按键变色效果*/
    $(".viewm").hover(function(){

    $(this).find("span").stop().fadeIn(200);

    },function(){

    $(this).find("span").stop().fadeOut(200);

    })

 /*MORE按键变色效果*/
/*UEMO后台初步完成动画开始*/
  $(".nav-neri").hover(function(){

  $(this).stop().animate({right:"50px"})

  },function(){

  $(this).stop().animate({right:"0px"})

  })


 $(".nav-spur").hover(function(){

 $(this).find("p").css({"color":"#fff"})

 },function(){

 $(this).find("p").css({"color":""})

 })

 $(".nav-spur").hover(function(){

 $(this).css({"background":"#03d522"})

},function(){

  $(this).css({"background":"#f8f8f8"})

})
/*UEMO后台初步完成动画结束*/
/*scrollReveal.js插件开始*/
window.scrollReveal = (function (window) {

  'use strict';

  // generator (increments) for the next scroll-reveal-id
  var nextId = 1;

  /**
   * RequestAnimationFrame polyfill
   * @function
   * @private
   */
  var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
  }());

  function scrollReveal(options) {

      this.options = this.extend(this.defaults, options);
      this.docElem = this.options.elem;
      this.styleBank = {};

      if (this.options.init == true) this.init();
  }

  scrollReveal.prototype = {

    defaults: {
      after:   '0s',
      enter:   'bottom',
      move:    '24px',
      over:    '0.66s',
      easing:  'ease-in-out',
      opacity: 0,
      complete: function() {},

  //  if 0, the element is considered in the viewport as soon as it enters
  //  if 1, the element is considered in the viewport when it's fully visible
      viewportFactor: 0.33,

  // if false, animations occur only once
  // if true, animations occur each time an element enters the viewport
      reset: false,

  // if true, scrollReveal.init() is automaticaly called upon instantiation
      init: true,
      elem: window.document.documentElement
    },

    /*=============================================================================*/

    init: function () {

      this.scrolled = false;

      var self = this;

  //  Check DOM for the data-scrollReveal attribute
  //  and initialize all found elements.
      this.elems = Array.prototype.slice.call(this.docElem.querySelectorAll('[data-scroll-reveal]'));
      this.elems.forEach(function (el, i) {

    //  Capture original style attribute
        var id = el.getAttribute("data-scroll-reveal-id");
        if (!id) {
            id = nextId++;
            el.setAttribute("data-scroll-reveal-id", id);
        }
        if (!self.styleBank[id]) {
          self.styleBank[id] = el.getAttribute('style');
        }

        self.update(el);
      });

      var scrollHandler = function (e) {
        // No changing, exit
        if (!self.scrolled) {
          self.scrolled = true;
          requestAnimFrame(function () {
            self._scrollPage();
          });
        }
      };

      var resizeHandler = function () {

    //  If we’re still waiting for settimeout, reset the timer.
        if (self.resizeTimeout) {
          clearTimeout(self.resizeTimeout);
        }
        function delayed() {
          self._scrollPage();
          self.resizeTimeout = null;
        }
        self.resizeTimeout = setTimeout(delayed, 200);
      };

      // captureScroll
      if (this.docElem == window.document.documentElement) {
            window.addEventListener('scroll', scrollHandler, false);
            window.addEventListener('resize', resizeHandler, false);
        }
        else {
            this.docElem.addEventListener('scroll', scrollHandler, false);
        }
    },

    /*=============================================================================*/

    _scrollPage: function () {
        var self = this;

        this.elems.forEach(function (el, i) {
          self.update(el);
        });
        this.scrolled = false;
    },

    /*=============================================================================*/

    parseLanguage: function (el) {

  //  Splits on a sequence of one or more commas or spaces.
      var words = el.getAttribute('data-scroll-reveal').split(/[, ]+/),
          parsed = {};

      function filter (words) {
        var ret = [],

            blacklist = [
              "from",
              "the",
              "and",
              "then",
              "but",
              "with"
            ];

        words.forEach(function (word, i) {
          if (blacklist.indexOf(word) > -1) {
            return;
          }
          ret.push(word);
        });

        return ret;
      }

      words = filter(words);

      words.forEach(function (word, i) {

        switch (word) {
          case "enter":
            parsed.enter = words[i + 1];
            return;

          case "after":
            parsed.after = words[i + 1];
            return;

          case "wait":
            parsed.after = words[i + 1];
            return;

          case "move":
            parsed.move = words[i + 1];
            return;

          case "ease":
            parsed.move = words[i + 1];
            parsed.ease = "ease";
            return;

          case "ease-in":
            parsed.move = words[i + 1];
            parsed.easing = "ease-in";
            return;

          case "ease-in-out":
            parsed.move = words[i + 1];
            parsed.easing = "ease-in-out";
            return;

          case "ease-out":
            parsed.move = words[i + 1];
            parsed.easing = "ease-out";
            return;

          case "over":
            parsed.over = words[i + 1];
            return;

          default:
            return;
        }
      });

      return parsed;
    },


    /*=============================================================================*/

    update: function (el) {

      var that = this;
      var css   = this.genCSS(el);
      var style = this.styleBank[el.getAttribute("data-scroll-reveal-id")];

      if (style != null) style += ";"; else style = "";

      if (!el.getAttribute('data-scroll-reveal-initialized')) {
        el.setAttribute('style', style + css.initial);
        el.setAttribute('data-scroll-reveal-initialized', true);
      }

      if (!this.isElementInViewport(el, this.options.viewportFactor)) {
        if (this.options.reset) {
          el.setAttribute('style', style + css.initial + css.reset);
        }
        return;
      }

      if (el.getAttribute('data-scroll-reveal-complete')) return;

      if (this.isElementInViewport(el, this.options.viewportFactor)) {
        el.setAttribute('style', style + css.target + css.transition);
    //  Without reset enabled, we can safely remove the style tag
    //  to prevent CSS specificy wars with authored CSS.
        if (!this.options.reset) {
          setTimeout(function () {
            if (style != "") {
              el.setAttribute('style', style);
            } else {
              el.removeAttribute('style');
            }
            el.setAttribute('data-scroll-reveal-complete',true);
            that.options.complete(el);
          }, css.totalDuration);
        }
      return;
      }
    },

    /*=============================================================================*/

    genCSS: function (el) {
      var parsed = this.parseLanguage(el),
          enter,
          axis;

      if (parsed.enter) {

        if (parsed.enter == "top" || parsed.enter == "bottom") {
          enter = parsed.enter;
          axis = "y";
        }

        if (parsed.enter == "left" || parsed.enter == "right") {
          enter = parsed.enter;
          axis = "x";
        }

      } else {

        if (this.options.enter == "top" || this.options.enter == "bottom") {
          enter = this.options.enter
          axis = "y";
        }

        if (this.options.enter == "left" || this.options.enter == "right") {
          enter = this.options.enter
          axis = "x";
        }
      }

  //  After all values are parsed, let’s make sure our our
  //  pixel distance is negative for top and left entrances.
  //
  //  ie. "move 25px from top" starts at 'top: -25px' in CSS.

      if (enter == "top" || enter == "left") {
        if (parsed.move) {
          parsed.move = "-" + parsed.move;
        }
        else {
          parsed.move = "-" + this.options.move;
        }
      }

      var dist    = parsed.move    || this.options.move,
          dur     = parsed.over    || this.options.over,
          delay   = parsed.after   || this.options.after,
          easing  = parsed.easing  || this.options.easing,
          opacity = parsed.opacity || this.options.opacity;

      var transition = "-webkit-transition: -webkit-transform " + dur + " " + easing + " " + delay + ",  opacity " + dur + " " + easing + " " + delay + ";" +
                               "transition: transform " + dur + " " + easing + " " + delay + ", opacity " + dur + " " + easing + " " + delay + ";" +
                      "-webkit-perspective: 1000;" +
              "-webkit-backface-visibility: hidden;";

  //  The same as transition, but removing the delay for elements fading out.
      var reset = "-webkit-transition: -webkit-transform " + dur + " " + easing + " 0s,  opacity " + dur + " " + easing + " " + delay + ";" +
                          "transition: transform " + dur + " " + easing + " 0s,  opacity " + dur + " " + easing + " " + delay + ";" +
                 "-webkit-perspective: 1000;" +
         "-webkit-backface-visibility: hidden;";

      var initial = "-webkit-transform: translate" + axis + "(" + dist + ");" +
                            "transform: translate" + axis + "(" + dist + ");" +
                              "opacity: " + opacity + ";";

      var target = "-webkit-transform: translate" + axis + "(0);" +
                           "transform: translate" + axis + "(0);" +
                             "opacity: 1;";
      return {
        transition: transition,
        initial: initial,
        target: target,
        reset: reset,
        totalDuration: ((parseFloat(dur) + parseFloat(delay)) * 1000)
      };
    },

    getViewportH : function () {
      var client = this.docElem['clientHeight'],
        inner = window['innerHeight'];

      if (this.docElem == window.document.documentElement)
                return (client < inner) ? inner : client;
            else
                return client;
    },

    getOffset : function(el) {
      var offsetTop = 0,
          offsetLeft = 0;

      do {
        if (!isNaN(el.offsetTop)) {
          offsetTop += el.offsetTop;
        }
        if (!isNaN(el.offsetLeft)) {
          offsetLeft += el.offsetLeft;
        }
      } while (el = el.offsetParent)

      return {
        top: offsetTop,
        left: offsetLeft
      }
    },

    isElementInViewport : function(el, h) {
      var scrolled = this.docElem.scrollTop + this.docElem.offsetTop;
        if (this.docElem == window.document.documentElement)scrolled = window.pageYOffset;
        var
            viewed = scrolled + this.getViewportH(),
          elH = el.offsetHeight,
          elTop = this.getOffset(el).top,
          elBottom = elTop + elH,
          h = h || 0;

      return (elTop + elH * h) <= viewed
          && (elBottom) >= scrolled
          || (el.currentStyle? el.currentStyle : window.getComputedStyle(el, null)).position == 'fixed';
    },

    extend: function (a, b){
      for (var key in b) {
        if (b.hasOwnProperty(key)) {
          a[key] = b[key];
        }
      }
      return a;
    }
  }; // end scrollReveal.prototype

  return scrollReveal;
})(window);
/*scrollReveal.js插件开始*/
/*scrollReveal.js插件调用*/
if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        (function(){
        window.scrollReveal = new scrollReveal({reset: false});
    })();
};
/*scrollReveal.js插件调用*/
});