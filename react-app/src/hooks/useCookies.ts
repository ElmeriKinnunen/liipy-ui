import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { inject } from "@vercel/analytics";

export const useCookieConsent = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean | null>(null);
  const [cookiesSettingSaved, setCookiesSettingSaved] = useState(false);

  useEffect(() => {
    const cookieValue = Cookies.get("cookiesAccepted");
    if (cookieValue === "true") {
      setCookiesAccepted(true);
      setCookiesSettingSaved(true);
    } else if (cookieValue === "false") {
      setCookiesAccepted(false);
      setCookiesSettingSaved(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookiesAccepted", "true", { expires: 365 });
    setCookiesAccepted(true);
    setCookiesSettingSaved(true);
    loadGoogleTagManager();
    inject();
  };

  const rejectCookies = () => {
    Cookies.set("cookiesAccepted", "false", { expires: 365 });
    setCookiesAccepted(false);
    setCookiesSettingSaved(true);
    console.log("Rejected cookies");
  };

  const loadGoogleTagManager = () => {
    const gtmScript = document.createElement("script");
    gtmScript.async = true;
    gtmScript.src = "https://www.googletagmanager.com/gtag/js?id=G-QEL95JZETR";

    gtmScript.onload = () => {
      const gtmConfigScript = document.createElement("script");
      gtmConfigScript.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QEL95JZETR');
      `;
      document.head.append(gtmConfigScript);
    };

    document.head.append(gtmScript);
  };

  return {
    cookiesAccepted,
    cookiesSettingSaved,
    acceptCookies,
    rejectCookies,
  };
};
