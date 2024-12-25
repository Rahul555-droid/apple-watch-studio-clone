// Header Component
import Image from "next/image";

const Header = () => (

  <div className="rf-designstudio-title">
    <a
      href="/shop/buy-watch/apple-watch"
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
    </a>
  </div>
)

export default Header;
