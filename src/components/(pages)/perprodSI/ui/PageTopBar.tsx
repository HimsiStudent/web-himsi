import { BackLink } from "@/components/(pages)/perprodSI/ui/BackLink";

/**
 * Slim chrome strip at the top of standalone pages (FAQ, Rules, ...). Gives
 * the back-to-home link a real edge to anchor to — a full-width hairline bar
 * instead of a lone link floating in the page's whitespace. Deliberately
 * skips <Container>: that component caps at max-w-[72rem] and centers itself,
 * which on wide screens leaves the link stranded far from the true viewport
 * edge instead of flush against it.
 */
export function PageTopBar() {
  return (
    <div className="relative z-10 flex items-center border-b border-gold/20 bg-cream/80 px-[var(--spacing-site-x)] py-4 backdrop-blur-sm">
      <BackLink />
    </div>
  );
}
