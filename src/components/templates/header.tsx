"use client";

import React, { useState, useEffect } from "react";
import Logo from "@/components/(assets)/logo";
import { usePathname } from "next/navigation";
import Navigation from "@/components/templates/navigation";

export default function NavigationHeader() {
  const pathname = usePathname();
  const [isActive, setActive] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const [isNavActive, setNavActive] = useState(false);
  const [isServiceOpen, setServiceOpen] = useState(false);

  function handleServiceOnClick() {
    setServiceOpen(!isServiceOpen);
  }

  function handleMoreOptionClick() {
    setNavActive(!isNavActive);
    if (!isNavActive && !isScrolled) {
      setActive(true);
    } else if (!isScrolled) {
      setActive(false);
    }
    if (isServiceOpen) {
      setServiceOpen(false);
    }
  }

  function handleNavClick() {
    setNavActive(false);
  }

  const checkScrollOnReload = () => {
    const scrolled = window.scrollY > 0;
    setScrolled(scrolled);
    setActive(scrolled);
  };

  useEffect(() => {
    checkScrollOnReload();
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("load", checkScrollOnReload);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pathname === "/" && !isScrolled && isNavActive === false) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [pathname, isScrolled, isNavActive]);

  const handleOnClickReload = () => {
    window.location.reload();
    window.location.href = pathname;
  };

  return (
    <header id="nav-header" className={isActive ? "nav active" : "nav"}>
      <div onClick={handleOnClickReload} className="logo-wrapper">
        <Logo />
        <h1 id="logo-full-text">
          Himpunan Mahasiswa&nbsp;<span>Sistem Informasi</span> <br />
          Universitas&nbsp;<span>Multimedia Nusantara</span>
        </h1>
        <h1 id="logo-crop-text">
          <span>HIMSI</span>
          <span>&nbsp;UMN</span>
        </h1>
      </div>
      <Navigation
        handleNavClick={handleNavClick}
        handleMoreOptionOnClick={handleMoreOptionClick}
        handleServiceOnClick={handleServiceOnClick}
        isServiceOpen={isServiceOpen}
        isActive={isNavActive}
        pathname={pathname}
      />
    </header>
  );
}
