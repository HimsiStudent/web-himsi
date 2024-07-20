import Link from "next/link";
import BurgerBtn from "../(assets)/burgerBtn";
import XSymbol from "../(assets)/x-symbol";
import ChevronDown from "../(assets)/chevronDown";
import { useState, useEffect } from "react";

export default function Navigation({
  handleMoreOptionOnClick,
  handleNavClick,
  handleServiceOnClick,
  isServiceOpen,
  isActive,
  pathname,
}: {
  handleMoreOptionOnClick: () => void;
  handleNavClick: () => void;
  handleServiceOnClick: () => void;
  isServiceOpen: boolean;
  isActive: boolean;
  pathname: string;
}) {
  const [isPageActive, setPageActive] = useState(false);
  const [isHomePage, setHomePage] = useState(true);

  useEffect(() => {
    if (pathname !== "/") {
      setPageActive(true);
      setHomePage(false);
    } else {
      setHomePage(true);
    }
  }, [pathname]);

  const getLinkStyle = (page: any) => {
    const style =
      isPageActive && !isActive && pathname === `/${page}`
        ? { color: "var(--blue-himsi)", fontWeight: "800" }
        : {};
    return style;
  };

  return (
    <>
      <span
        onClick={handleMoreOptionOnClick}
        className={isActive ? "active" : ""}
        title="More Option"
        id="nav-more-option"
      >
        <BurgerBtn />
        <XSymbol />
      </span>
      <nav>
        <Link title="Home" href="/" onClick={handleNavClick}>
          Home
        </Link>
        <Link
          title="About"
          href={isHomePage ? "/#about" : "/about"}
          style={getLinkStyle("about")}
          onClick={handleNavClick}
        >
          About
        </Link>
        <Link
          title="Event"
          href={isHomePage ? "/#event" : "/event"}
          style={getLinkStyle("event")}
          onClick={handleNavClick}
        >
          Events
        </Link>
        <a onClick={handleServiceOnClick} title="Services" id="services">
          Services
          <ChevronDown isServiceOpen={isServiceOpen} />
        </a>
        <div className={isServiceOpen ? "services active" : "services"}>
          <Link
            title="HIMFACT"
            href={isHomePage ? "/#himfact" : "/himfact"}
            style={getLinkStyle("himfact")}
            onClick={handleNavClick}
          >
            SIBE
          </Link>
          <Link
            title="BIMSI"
            href={isHomePage ? "/#bimsi" : "/bimsi"}
            style={getLinkStyle("bimsi")}
            onClick={handleNavClick}
          >
            BIMSI
          </Link>
          <Link
            title="Aspiration"
            href={isHomePage ? "/#aspiration" : "/aspiration"}
            style={getLinkStyle("aspiration")}
            onClick={handleNavClick}
          >
            Aspiration
          </Link>
        </div>
      </nav>
    </>
  );
}
