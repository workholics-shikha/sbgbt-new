"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Swiper from "swiper/bundle";

const homepageFiles = new Set(["index.html", "Home.html"]);

const homepageVideoCards = [
  {
    href: "https://www.youtube.com/embed/3RjwYoCyWrI",
    title: "सोच बदलो गाँव बदलो यात्रा",
    meta: "सोच बदलो गाँव बदलो",
    image: "/images/vid3.png"
  },
  {
    href: "https://www.youtube.com/embed/mycj-BJ08Wk",
    title: "स्थापना दिवस की शुभकामनाएँ व बधाइयाँ।",
    meta: "स्थापना दिवस",
    image: "/images/vid1.png"
  },
  {
    href: "https://www.youtube.com/embed/DH3KPEHgAA4",
    title: "स्मार्ट विलेज कॉन्सेप्ट एंड अचीवमेंट्स",
    meta: "स्मार्ट विलेज योजना",
    image: "/images/vid2.png"
  },
  {
    href: "https://www.youtube.com/embed/wy3rBd3F-hg",
    title: "ज़िंदगी को ऐसे जिया कि लोगों के लिए प्रेरण...",
    meta: "प्रेरणादायक वीडियो",
    image: "/images/vid3.png"
  },
  {
    href: "https://www.youtube.com/embed/Mqw26LHHR9E",
    title: "शिक्षा का मंदिर_ उत्थान भवन सरमथुरा",
    meta: "उत्थान पुस्तकालय",
    image: "/images/vid1.png"
  },
  {
    href: "https://www.youtube.com/embed/kUMosORZmOo",
    title: "मानवता की सेवा ही ईश्वर की सेवा है",
    meta: "आओ पढ़ें-आगे बढ़ें कार्यक्रम",
    image: "/images/yatra1.png"
  }
];

function normalizeClientUrl(url) {
  if (!url) {
    return url;
  }

  if (url.startsWith("images/")) {
    return `/${url}`;
  }

  if (homepageFiles.has(url)) {
    return "/";
  }

  if (url.endsWith(".html")) {
    return `/${url.replace(/\.html$/i, "")}`;
  }

  return url;
}

function initSwiper(selector, config) {
  if (typeof window === "undefined") {
    return null;
  }

  const element = document.querySelector(selector);

  if (!element || element.dataset.swiperReady === "true") {
    return null;
  }

  element.dataset.swiperReady = "true";
  return new Swiper(selector, config);
}

function ensureAnchorTarget(selector, id) {
  const element = document.querySelector(selector);

  if (element && !element.id) {
    element.id = id;
  }
}

function ensureMenuItems() {
  const menuGroups = [
    {
      selector: ".navbar-nav.gap-lg-4",
      linkClassName: "nav-link nav-border-top"
    },
    {
      selector: ".nav.flex-column.mb-4",
      linkClassName: "nav-link"
    }
  ];
  const itemsToInsert = [
    { href: "/#our-work", label: "हमारे कार्य" },
    { href: "/#success-stories", label: "सफलता की कहानी" }
  ];

  menuGroups.forEach(({ selector, linkClassName }) => {
    document.querySelectorAll(selector).forEach((menuList) => {
      const aboutLink = Array.from(menuList.querySelectorAll("a")).find((link) => {
        const href = link.getAttribute("href") || "";
        return href === "/about-us" || href === "about-us.html";
      });

      if (!aboutLink) {
        return;
      }

      let insertAfter = aboutLink.closest("li");

      itemsToInsert.forEach((item) => {
        const existingLink = Array.from(menuList.querySelectorAll("a")).find(
          (link) =>
            link.textContent?.replace(/\s+/g, " ").trim() === item.label ||
            link.getAttribute("href") === item.href
        );

        if (existingLink) {
          insertAfter = existingLink.closest("li") || insertAfter;
          return;
        }

        const listItem = document.createElement("li");
        const link = document.createElement("a");

        listItem.className = "nav-item";
        link.className = linkClassName;
        link.href = item.href;
        link.textContent = item.label;
        listItem.appendChild(link);

        insertAfter?.insertAdjacentElement("afterend", listItem);
        insertAfter = listItem;
      });
    });
  });
}

const LegacyMarkup = memo(function LegacyMarkup({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
});

export default function LegacyHome({ html }) {
  const router = useRouter();
  const [activeVideo, setActiveVideo] = useState(null);
  const videoSwiperRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("video-lightbox-open", Boolean(activeVideo));

    return () => {
      document.body.classList.remove("video-lightbox-open");
    };
  }, [activeVideo]);

  useEffect(() => {
    document
      .querySelectorAll("a[href], img[src], form[action], source[src]")
      .forEach((element) => {
        const attributeName = element.hasAttribute("href")
          ? "href"
          : element.hasAttribute("src")
            ? "src"
            : "action";
        const currentValue = element.getAttribute(attributeName);
        const normalizedValue = normalizeClientUrl(currentValue);

        if (normalizedValue && normalizedValue !== currentValue) {
          element.setAttribute(attributeName, normalizedValue);
        }
      });

    ensureAnchorTarget(".section2", "our-work");
    ensureAnchorTarget(".section3Video", "success-stories");
    ensureMenuItems();

    document.querySelectorAll(".mySwiper .swiper-slide").forEach((slide, index) => {
      const videoCard = homepageVideoCards[index];

      if (!videoCard) {
        return;
      }

      slide.style.cursor = "pointer";
      slide.dataset.videoHref = videoCard.href;
      slide.dataset.videoTitle = videoCard.title;

      const titleElement = slide.querySelector("h6.fw-semibold");
      const metaElement = slide.querySelector("h6.fs-13 span.ms-1");
      const imageElement = slide.querySelector("img");

      if (titleElement) {
        titleElement.textContent = videoCard.title;
      }

      if (metaElement) {
        metaElement.textContent = videoCard.meta;
      }

      if (imageElement) {
        imageElement.setAttribute("src", videoCard.image);
        imageElement.setAttribute("alt", videoCard.title);
      }
    });

    const handleDocumentClick = (event) => {
      const videoSlide = event.target.closest(".mySwiper .swiper-slide");

      if (videoSlide) {
        const videoHref = videoSlide.dataset.videoHref;
        const videoTitle = videoSlide.dataset.videoTitle || "SBGBT video";

        if (!videoHref) {
          return;
        }

        event.preventDefault();
        setActiveVideo({
          title: videoTitle,
          url: `${videoHref}?autoplay=1&rel=0`
        });
        return;
      }

      const anchor = event.target.closest("a[href]");

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      const normalizedHref = normalizeClientUrl(href);

      if (!normalizedHref || !normalizedHref.startsWith("/")) {
        return;
      }

      event.preventDefault();
      router.push(normalizedHref);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    document.addEventListener("keydown", handleEscape);

    videoSwiperRef.current = initSwiper(".mySwiper", {
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".swiper-button-next-video",
        prevEl: ".swiper-button-prev-video"
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1366: { slidesPerView: 4 }
      }
    });

    initSwiper(".mySwiperPhoto", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      },
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination"
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1366: { slidesPerView: 3 }
      }
    });

    initSwiper(".mySwiperMedia", {
      loop: true,
      spaceBetween: 20,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".swiper-button-next-media",
        prevEl: ".swiper-button-prev-media"
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
        1366: { slidesPerView: 4 }
      }
    });

    const container = document.querySelector(".updateCard-content");
    let autoScrollId;

    if (container) {
      autoScrollId = window.setInterval(() => {
        container.scrollTop += 1;

        if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
          container.scrollTop = 0;
        }
      }, 50);

      const pauseScroll = () => window.clearInterval(autoScrollId);
      const resumeScroll = () => {
        window.clearInterval(autoScrollId);
        autoScrollId = window.setInterval(() => {
          container.scrollTop += 1;

          if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            container.scrollTop = 0;
          }
        }, 50);
      };

      container.addEventListener("mouseenter", pauseScroll);
      container.addEventListener("mouseleave", resumeScroll);

      return () => {
        document.removeEventListener("click", handleDocumentClick, true);
        document.removeEventListener("keydown", handleEscape);
        window.clearInterval(autoScrollId);
        container.removeEventListener("mouseenter", pauseScroll);
        container.removeEventListener("mouseleave", resumeScroll);
      };
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      document.removeEventListener("keydown", handleEscape);
      if (autoScrollId) {
        window.clearInterval(autoScrollId);
      }
    };
  }, [router]);

  return (
    <>
      <LegacyMarkup html={html} />
      {activeVideo ? (
        <div
          className="video-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="video-lightbox-dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="video-lightbox-header">
              <h3 className="video-lightbox-title">{activeVideo.title}</h3>
            </div>
            <button
              type="button"
              className="video-lightbox-close"
              aria-label="Close video"
              onClick={() => setActiveVideo(null)}
            >
              x
            </button>
            <div className="video-lightbox-frame">
              <iframe
                src={activeVideo.url}
                title={activeVideo.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
