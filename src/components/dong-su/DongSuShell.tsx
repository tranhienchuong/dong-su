import type { ReactNode } from "react";

type DongSuShellProps = {
  backgroundImage: string;
  backgroundOpacityClass?: string;
  backgroundGradient: string;
  children: ReactNode;
  showHorizontalShade?: boolean;
};

export function DongSuShell({
  backgroundImage,
  backgroundOpacityClass = "opacity-35",
  backgroundGradient,
  children,
  showHorizontalShade = false,
}: DongSuShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-parchment">
      <div
        aria-hidden="true"
        className={`dong-su-bg-drift pointer-events-none absolute inset-0 ${backgroundOpacityClass}`}
        style={{
          backgroundImage: `${backgroundGradient}, url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      {showHorizontalShade ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,6,4,0.9),rgba(21,16,12,0.44),rgba(9,6,4,0.9))]"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="dong-su-vignette pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="dong-su-dust pointer-events-none absolute inset-0"
      />

      {children}
    </main>
  );
}
