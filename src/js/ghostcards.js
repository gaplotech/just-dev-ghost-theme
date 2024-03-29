/* eslint-disable */
/**
 * Workaround for ghost is not loading /public/cards.min.js in correctly in 4.35.0
 * ```
 *    <script defer="" src="/public/cards.min.js?v=54f4de8228" type="text/javascript"></script>
 * ```
 * Can remove it after the bug has fixed
 */
export function initGhostCards() {
  (function() {
    const e = function(e) {
      const t = e.querySelector(".kg-audio-player-container")
        , a = e.querySelector(".kg-audio-play-icon")
        , o = e.querySelector(".kg-audio-pause-icon")
        , i = e.querySelector(".kg-audio-seek-slider")
        , d = e.querySelector(".kg-audio-playback-rate")
        , r = e.querySelector(".kg-audio-mute-icon")
        , s = e.querySelector(".kg-audio-unmute-icon")
        , n = e.querySelector(".kg-audio-volume-slider")
        , l = e.querySelector("audio")
        , c = e.querySelector(".kg-audio-duration")
        , u = e.querySelector(".kg-audio-current-time");
      let g = [{
        rate: .75,
        label: "0.7×"
      }, {
        rate: 1,
        label: "1×"
      }, {
        rate: 1.25,
        label: "1.2×"
      }, {
        rate: 1.75,
        label: "1.7×"
      }, {
        rate: 2,
        label: "2×"
      }]
        , v = null
        , m = 1;
      const k = ()=>{
          i.value = Math.floor(l.currentTime),
            u.textContent = p(i.value),
            t.style.setProperty("--seek-before-width", i.value / i.max * 100 + "%"),
            v = requestAnimationFrame(k)
        }
        , y = e=>{
          e === i ? t.style.setProperty("--seek-before-width", e.value / e.max * 100 + "%") : t.style.setProperty("--volume-before-width", e.value / e.max * 100 + "%")
        }
        , p = e=>{
          const t = Math.floor(e / 60)
            , a = Math.floor(e % 60);
          return `${t}:${a < 10 ? `0${a}` : `${a}`}`
        }
        , h = ()=>{
          c.textContent = p(l.duration)
        }
        , L = ()=>{
          i.max = Math.floor(l.duration)
        }
        , f = ()=>{
          if (l.buffered.length > 0) {
            const e = Math.floor(l.buffered.end(l.buffered.length - 1));
            t.style.setProperty("--buffered-width", e / i.max * 100 + "%")
          }
        }
      ;
      l.readyState > 0 ? (h(),
        L(),
        f()) : l.addEventListener("loadedmetadata", (()=>{
          h(),
            L(),
            f()
        }
      )),
        a.addEventListener("click", (()=>{
            a.classList.add("kg-audio-hide"),
              o.classList.remove("kg-audio-hide"),
              l.play(),
              requestAnimationFrame(k)
          }
        )),
        o.addEventListener("click", (()=>{
            o.classList.add("kg-audio-hide"),
              a.classList.remove("kg-audio-hide"),
              l.pause(),
              cancelAnimationFrame(v)
          }
        )),
        r.addEventListener("click", (()=>{
            r.classList.add("kg-audio-hide"),
              s.classList.remove("kg-audio-hide"),
              l.muted = !1
          }
        )),
        s.addEventListener("click", (()=>{
            s.classList.add("kg-audio-hide"),
              r.classList.remove("kg-audio-hide"),
              l.muted = !0
          }
        )),
        d.addEventListener("click", (()=>{
            let e = g[(m + 1) % 5];
            m += 1,
              l.playbackRate = e.rate,
              d.textContent = e.label
          }
        )),
        l.addEventListener("progress", f),
        i.addEventListener("input", (e=>{
            y(e.target),
              u.textContent = p(i.value),
            l.paused || cancelAnimationFrame(v)
          }
        )),
        i.addEventListener("change", (()=>{
            l.currentTime = i.value,
            l.paused || requestAnimationFrame(k)
          }
        )),
        n.addEventListener("input", (e=>{
            const t = e.target.value;
            y(e.target),
              l.volume = t / 100
          }
        ))
    }
      , t = document.querySelectorAll(".kg-audio-card");
    for (let a = 0; a < t.length; a++)
      e(t[a])
  })();
  (function() {
    const e = [...document.querySelectorAll(".kg-before-after-card")];
    for (let o of e) {
      const e = o.querySelector("input")
        , i = o.querySelector(".kg-before-after-card-image-before")
        , d = o.querySelector(".kg-before-after-card-slider-button")
        , r = [...o.querySelectorAll("img")];
      function t() {
        i.setAttribute("style", `width: ${e.value}%`),
          d.setAttribute("style", `left: calc(${e.value}% - 18px`)
      }
      function a() {
        const e = getComputedStyle(r[0]).getPropertyValue("width");
        r[1].setAttribute("style", `width: ${e}`)
      }
      e.addEventListener("input", (function() {
          t()
        }
      )),
        e.addEventListener("change", (function() {
            e.blur()
          }
        )),
        window.addEventListener("resize", (function() {
            a()
          }
        )),
        a(),
        t()
    }
  })();
  (function() {
    const e = document.getElementsByClassName("kg-toggle-heading")
      , t = function(e) {
      const t = e.target.closest(".kg-toggle-card");
      "close" === t.getAttribute("data-kg-toggle-state") ? t.setAttribute("data-kg-toggle-state", "open") : t.setAttribute("data-kg-toggle-state", "close")
    };
    for (let a = 0; a < e.length; a++)
      e[a].addEventListener("click", t, !1)
  })();
  (function() {
    const e = function(e) {
      const t = e.querySelector(".kg-video-player")
        , a = e.querySelector(".kg-video-player-container")
        , o = e.querySelector(".kg-video-play-icon")
        , i = e.querySelector(".kg-video-pause-icon")
        , d = e.querySelector(".kg-video-seek-slider")
        , r = e.querySelector(".kg-video-playback-rate")
        , s = e.querySelector(".kg-video-mute-icon")
        , n = e.querySelector(".kg-video-unmute-icon")
        , l = e.querySelector(".kg-video-volume-slider")
        , c = e.querySelector("video")
        , u = e.querySelector(".kg-video-duration")
        , g = e.querySelector(".kg-video-current-time")
        , v = e.querySelector(".kg-video-large-play-icon")
        , m = e.querySelector(".kg-video-overlay");
      let k = [{
        rate: .75,
        label: "0.7×"
      }, {
        rate: 1,
        label: "1×"
      }, {
        rate: 1.25,
        label: "1.2×"
      }, {
        rate: 1.75,
        label: "1.7×"
      }, {
        rate: 2,
        label: "2×"
      }]
        , y = null
        , p = 1;
      c.loop && (v.classList.add("kg-video-hide-animated"),
        m.classList.add("kg-video-hide-animated"));
      const h = ()=>{
          d.value = Math.floor(c.currentTime),
            g.textContent = f(d.value),
            t.style.setProperty("--seek-before-width", d.value / d.max * 100 + "%"),
            y = requestAnimationFrame(h)
        }
        , L = e=>{
          e === d ? t.style.setProperty("--seek-before-width", e.value / e.max * 100 + "%") : t.style.setProperty("--volume-before-width", e.value / e.max * 100 + "%")
        }
        , f = e=>{
          const t = Math.floor(e / 60)
            , a = Math.floor(e % 60);
          return `${t}:${a < 10 ? `0${a}` : `${a}`}`
        }
        , b = ()=>{
          u.textContent = f(c.duration)
        }
        , q = ()=>{
          d.max = Math.floor(c.duration)
        }
        , S = ()=>{
          if (c.buffered.length > 0) {
            const e = Math.floor(c.buffered.end(c.buffered.length - 1));
            t.style.setProperty("--buffered-width", e / d.max * 100 + "%")
          }
        }
      ;
      c.readyState > 0 ? (b(),
        q(),
        S(),
      c.autoplay && (y = requestAnimationFrame(h),
        o.classList.add("kg-video-hide"),
        i.classList.remove("kg-video-hide")),
      c.muted && (n.classList.add("kg-video-hide"),
        s.classList.remove("kg-video-hide"))) : c.addEventListener("loadedmetadata", (()=>{
          b(),
            q(),
            S(),
          c.autoplay && (y = requestAnimationFrame(h),
            o.classList.add("kg-video-hide"),
            i.classList.remove("kg-video-hide")),
          c.muted && (n.classList.add("kg-video-hide"),
            s.classList.remove("kg-video-hide"))
        }
      )),
        e.onmouseover = ()=>{
          c.loop || a.classList.remove("kg-video-hide-animated")
        }
        ,
        e.onmouseleave = ()=>{
          !!(c.currentTime > 0 && !c.paused && !c.ended && c.readyState > 2) && a.classList.add("kg-video-hide-animated")
        }
        ,
        e.addEventListener("click", (()=>{
            if (!c.loop) {
              !!(c.currentTime > 0 && !c.paused && !c.ended && c.readyState > 2) ? A() : E()
            }
          }
        )),
        c.onplay = ()=>{
          v.classList.add("kg-video-hide-animated"),
            m.classList.add("kg-video-hide-animated"),
            o.classList.add("kg-video-hide"),
            i.classList.remove("kg-video-hide")
        }
      ;
      const E = ()=>{
          v.classList.add("kg-video-hide-animated"),
            m.classList.add("kg-video-hide-animated"),
            o.classList.add("kg-video-hide"),
            i.classList.remove("kg-video-hide"),
            c.play(),
            y = requestAnimationFrame(h)
        }
        , A = ()=>{
          i.classList.add("kg-video-hide"),
            o.classList.remove("kg-video-hide"),
            c.pause(),
            cancelAnimationFrame(y)
        }
      ;
      v.addEventListener("click", (e=>{
          e.stopPropagation(),
            E()
        }
      )),
        o.addEventListener("click", (e=>{
            e.stopPropagation(),
              E()
          }
        )),
        i.addEventListener("click", (e=>{
            e.stopPropagation(),
              A()
          }
        )),
        s.addEventListener("click", (e=>{
            e.stopPropagation(),
              s.classList.add("kg-video-hide"),
              n.classList.remove("kg-video-hide"),
              c.muted = !1
          }
        )),
        n.addEventListener("click", (e=>{
            e.stopPropagation(),
              n.classList.add("kg-video-hide"),
              s.classList.remove("kg-video-hide"),
              c.muted = !0
          }
        )),
        r.addEventListener("click", (e=>{
            e.stopPropagation();
            let t = k[(p + 1) % 5];
            p += 1,
              c.playbackRate = t.rate,
              r.textContent = t.label
          }
        )),
        c.addEventListener("progress", S),
        d.addEventListener("input", (e=>{
            e.stopPropagation(),
              L(e.target),
              g.textContent = f(d.value),
            c.paused || cancelAnimationFrame(y)
          }
        )),
        d.addEventListener("change", (e=>{
            e.stopPropagation(),
              c.currentTime = d.value,
            c.paused || requestAnimationFrame(h)
          }
        )),
        l.addEventListener("click", (e=>{
            e.stopPropagation()
          }
        )),
        d.addEventListener("click", (e=>{
            e.stopPropagation()
          }
        )),
        l.addEventListener("input", (e=>{
            e.stopPropagation();
            const t = e.target.value;
            L(e.target),
              c.volume = t / 100
          }
        ))
    }
      , t = document.querySelectorAll(".kg-video-card");
    for (let a = 0; a < t.length; a++)
      e(t[a])
  })();
}
