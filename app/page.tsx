import Link from "next/link";

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
              <span role="text">
                <span className="as-designstudio-intro-collectionname">
                  Apple Watch Studio
                </span>
                <span className="as-designstudio-intro-casemsg">
                  Choose a case.
                </span>
                <span className="as-designstudio-intro-bandmsg">
                  Pick a band.
                </span>
                <span className="as-designstudio-intro-stylemsg">
                  Create your own style.
                </span>
              </span>
            </h1>
            <Link href={"/watch-studio"}>
              <button
                tabIndex={0}
                type="button"
                className="button button-elevated rf-designstudio-customize"
                data-autom="getStarted"
              >
                <span>Get started</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
