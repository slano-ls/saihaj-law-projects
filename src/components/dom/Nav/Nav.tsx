import Link from "next/link";
import styles from "./Nav.module.scss";
import { ColorSchemeSwitch } from "./ColorSchemeSwitch";
import { useRouter } from "next/router";
import { hoverHandlers } from "@/utils";
import { MuteButton } from "./MuteButton";
import { useEffect } from "react";

export function Nav() {
  const router = useRouter();
  const path = router.asPath;

  useEffect(() => {
    // Ensure that navigation links don't trigger a full page reload
    const handleLinkClick = (event) => {
      if (event.target.tagName === "A") {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        if (href && href !== "#") {
          router.push(href);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [router]);

  return (
    <nav className={styles.navbar}>
      <MuteButton />
      <ul>
        <li>
          <Link href="/" passHref>
            <div className={path === "/" ? styles.active : ""} {...hoverHandlers}>
              home
            </div>
          </Link>
        </li>
        <li>
          <Link href="/work" passHref>
            <div className={path === "/work" ? styles.active : ""} {...hoverHandlers}>
              work
            </div>
          </Link>
        </li>
        <li>
          <Link href="/contact" passHref>
            <div className={path === "/contact" ? styles.active : ""} {...hoverHandlers}>
              contact
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
