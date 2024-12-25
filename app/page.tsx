import Link from "next/link";
import Image from "next/image";
import { TransitionLink } from "@/components/TransitionLink";

export default function Home() {
  return (
    <div
      data-core-fade-transition-wrapper=""
      className="rf-designstudio-intromat r-fade-transition-enter-done"
      data-autom="introMat"
    >
      <div className="rf-designstudio-intro">
        <div className="rf-designstudio-greeting-wrapper">
          <div className="rf-designstudio-greeting">
            <h1
              tabIndex={-1}
              className="rf-designstudio-headline typography-headline-elevated"
              id="rf-designstudio-a11yoverlaydesc"
            >
              <span
                role="text"
                className="font-sans text-[64px] font-semibold tracking-tighter"
                style={{ lineHeight: "1" }}
              >
                <span className="as-designstudio-intro-collectionname">
                  Apple Watch Studio
                </span>
                <span>Choose a case.</span>
                <span>Pick a band.</span>
                <span>Create your own style.</span>
              </span>
            </h1>
            <TransitionLink href={"/watch-studio"}>
              <button
                tabIndex={0}
                type="button"
                className={`mt-10 px-4 py-2 text-pretty rounded-3xl bg-blue-500 text-white font-semibold`}
                data-autom="getStarted"
              >
                <span>Get started</span>
              </button>
            </TransitionLink>

            <div
              className="rf-designstudio-combinedimage"
              tabIndex={-1}
              aria-hidden="false"
              aria-label="46mm Jet Black Aluminum Case with Black Solo Loop Front view"
            >
              <Image
                alt=""
                className="rf-designstudio-topimage rf-designstudio-caseimage"
                aria-hidden="true"
                width="500"
                height="500"
                src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/watch-case-46-aluminum-jetblack-nc-s10_VW_PF+watch-face-46-aluminum-jetblack-s10_VW_PF?wid=1000&amp;hei=1000&amp;fmt=png-alpha&amp;.v=ZkpvU2VZQXB3RnNRVENEZS9Wb2Y3NkVmS05vWHBxQ1hNMzNlZ1l5V3RQRm0xR2lBNEhDZ3RrRjNEOTloOGpFekM4bU8yL1REVmF4VUkrMW5QRGtKeWZZdXM3S3c2TnF5czBINnVYaTd4cVVFV3ZkVVErQ2lxQjUvY3lWaGtLb0N0ellxUDB4dVliN1NPTHhYUld4M0p5am05N0NVWnlUTTNBaW9WT3lDS2lvbmYzRTFGU1cyNFdtdUoxcXBXVFAv"
              />
              <Image
                alt=""
                className="rf-designstudio-bottomimage rf-designstudio-bandmage"
                aria-hidden="true"
                width="500"
                height="500"
                src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MYA33ref_SR_S10_VW_PF?wid=1000&amp;hei=1000&amp;fmt=p-jpg&amp;qlt=95&amp;.v=czdWc1FNWHZRRGZrVTlpcjVQTEJxVHVkcStXUmxwTmtpV2dxUWV1ZU5xeXkvYVhHUzZnbTdlRlQ4aGhRUUYyVXZ6RVMwQXJHUjF3MlcvZ3RFeXhMRDVzaDNYQm9FT2pIMkdXYzlEUEliVWM"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
