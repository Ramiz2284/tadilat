import { useEffect } from "react";
import { DEFAULT_OG_IMAGE, DEFAULT_SITE_URL, SITE_NAME } from "../../app/seo/routes";

type SeoMeta = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
  alternates?: Array<{
    hrefLang: string;
    path: string;
  }>;
};

function upsertMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    if (hreflang) {
      element.hreflang = hreflang;
    }
    document.head.appendChild(element);
  }
  element.href = href;
}

export function useSeo(meta: SeoMeta) {
  useEffect(() => {
    const siteUrl = window.location.origin.includes("localhost")
      ? window.location.origin
      : DEFAULT_SITE_URL;
    const canonical = new URL(meta.path ?? window.location.pathname, siteUrl).toString();
    const fullTitle = meta.title.includes(SITE_NAME) ? meta.title : `${meta.title} | ${SITE_NAME}`;

    document.title = fullTitle;

    upsertMeta('meta[name="description"]', () => {
      const el = document.createElement("meta");
      el.name = "description";
      return el;
    }, meta.description);

    upsertMeta('meta[property="og:title"]', () => {
      const el = document.createElement("meta");
      el.setAttribute("property", "og:title");
      return el;
    }, fullTitle);

    upsertMeta('meta[property="og:description"]', () => {
      const el = document.createElement("meta");
      el.setAttribute("property", "og:description");
      return el;
    }, meta.description);

    upsertMeta('meta[property="og:type"]', () => {
      const el = document.createElement("meta");
      el.setAttribute("property", "og:type");
      return el;
    }, meta.type ?? "website");

    upsertMeta('meta[property="og:url"]', () => {
      const el = document.createElement("meta");
      el.setAttribute("property", "og:url");
      return el;
    }, canonical);

    upsertMeta('meta[name="twitter:card"]', () => {
      const el = document.createElement("meta");
      el.name = "twitter:card";
      return el;
    }, meta.image ? "summary_large_image" : "summary");

    upsertMeta('meta[name="twitter:title"]', () => {
      const el = document.createElement("meta");
      el.name = "twitter:title";
      return el;
    }, fullTitle);

    upsertMeta('meta[name="twitter:description"]', () => {
      const el = document.createElement("meta");
      el.name = "twitter:description";
      return el;
    }, meta.description);

    const imageUrl = new URL(meta.image ?? DEFAULT_OG_IMAGE, siteUrl).toString();
    if (imageUrl) {
      upsertMeta('meta[property="og:image"]', () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:image");
        return el;
      }, imageUrl);
      upsertMeta('meta[name="twitter:image"]', () => {
        const el = document.createElement("meta");
        el.name = "twitter:image";
        return el;
      }, imageUrl);
    }

    upsertMeta('meta[name="robots"]', () => {
      const el = document.createElement("meta");
      el.name = "robots";
      return el;
    }, meta.noindex ? "noindex, nofollow" : "index, follow");

    upsertLink("canonical", canonical);

    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((element) => element.remove());

    meta.alternates?.forEach((alternate) => {
      upsertLink("alternate", new URL(alternate.path, siteUrl).toString(), alternate.hrefLang);
    });

    const scriptId = "seo-structured-data";
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (meta.structuredData) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(meta.structuredData);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        script.remove();
      }
    };
  }, [
    meta.alternates,
    meta.description,
    meta.image,
    meta.noindex,
    meta.path,
    meta.structuredData,
    meta.title,
    meta.type,
  ]);
}
