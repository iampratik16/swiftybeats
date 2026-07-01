import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-eyebrow uppercase text-gold">404</p>
      <h1 className="mt-6 text-hero font-semibold">Lost the beat.</h1>
      <p className="mt-6 max-w-md text-muted">
        That page is not here. Let us get you back to the music.
      </p>
      <div className="mt-10">
        <MagneticButton href="/" cursorLabel="home">
          Back home
        </MagneticButton>
      </div>
    </section>
  );
}
