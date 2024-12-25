// Header Component
import Image from "next/image";
import Link from "next/link";

const Header = () => (

  <div className="rf-designstudio-title">
    <Link
      href="/"
      data-slot-name="designStudioAssets"
      data-feature-name="Astro Link"
      data-display-name="AOS: home/shop_watch/family/apple_watch"
      className="as-watch-logo-link"
    >
      <Image
        src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-design-studio-logo?wid=236&amp;hei=52&amp;fmt=jpeg&amp;qlt=90&amp;.v=1566849941844"
        alt="Apple Watch"
        width={118}
        height={26}
        className="ir"
      />
    </Link>
  </div>
)

export default Header;
