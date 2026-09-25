"use client";

import { AgendaSection } from "@/components/AgendaSection";
import { BackgroundMusic, type BackgroundMusicHandle } from "@/components/BackgroundMusic";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { CountdownTimer } from "@/components/CountdownTimer";
import { GallerySection } from "@/components/GallerySection";
import { InviteChrome } from "@/components/InviteChrome";
import { RSVPModal } from "@/components/RSVPModal";
import { ThemeWrapper } from "@/components/ThemeWrapper";
import { VenueMapSection } from "@/components/VenueMapSection";
import {
  WeddingLoadBackdrop,
  weddingSectionVariants,
  weddingStaggerContainer,
} from "@/components/WeddingPageLoad";
import { TemplateRouter } from "@/components/templates/TemplateRouter";
import type { CoupleInvite, WeddingTheme } from "@/lib/data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

type InvitationClientProps = {
  couple: CoupleInvite;
  theme: WeddingTheme;
  inviteeName: string;
};

export function InvitationClient({ couple, theme, inviteeName }: InvitationClientProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const surface = theme.colors.surface ?? theme.colors.background;
  const reducedMotion = useReducedMotion();
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const handleEnvelopeOpened = useCallback(() => setEnvelopeOpened(true), []);
  const musicRef = useRef<BackgroundMusicHandle>(null);

  return (
    <>
      <ThemeWrapper theme={theme}>
        {envelopeOpened ? (
          <WeddingLoadBackdrop
            accent={theme.colors.accent}
            reducedMotion={!!reducedMotion}
          />
        ) : null}
        <motion.main
          id="main"
          className="relative z-[1] pb-28 md:pb-0"
          variants={weddingStaggerContainer}
          initial="hidden"
          animate={envelopeOpened ? "show" : "hidden"}
        >
          <motion.div variants={weddingSectionVariants} className="w-full">
            <TemplateRouter
              templateId={couple.templateId}
              theme={theme}
              couple={couple}
              inviteeName={inviteeName}
              onOpenRSVP={() => setRsvpOpen(true)}
            />
          </motion.div>
          <motion.div variants={weddingSectionVariants} className="w-full">
            <CountdownTimer theme={theme} templateId={couple.templateId} couple={couple} />
          </motion.div>
          <motion.div variants={weddingSectionVariants} className="w-full">
            <AgendaSection theme={theme} templateId={couple.templateId} couple={couple} />
          </motion.div>
          <motion.div variants={weddingSectionVariants} className="w-full">
            <VenueMapSection theme={theme} templateId={couple.templateId} couple={couple} />
          </motion.div>
          <motion.div variants={weddingSectionVariants} className="w-full">
            <GallerySection theme={theme} templateId={couple.templateId} couple={couple} />
          </motion.div>
        </motion.main>
      </ThemeWrapper>
      <InviteChrome
        accentColor={theme.colors.accent}
        surfaceColor={surface}
        coupleLabel={`${couple.partnerA} & ${couple.partnerB}`}
        inviteeName={inviteeName}
        onRSVP={() => setRsvpOpen(true)}
      />
      <AnimatePresence>
        {envelopeOpened ? null : (
          <EnvelopeIntro
            key="envelope"
            theme={theme}
            partnerA={couple.partnerA}
            partnerB={couple.partnerB}
            inviteeName={inviteeName}
            reducedMotion={!!reducedMotion}
            onOpenStart={() => musicRef.current?.start()}
            onOpened={handleEnvelopeOpened}
          />
        )}
      </AnimatePresence>
      <BackgroundMusic
        ref={musicRef}
        accentColor={theme.colors.accent}
        showToggle={envelopeOpened}
      />
      <RSVPModal
        open={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        accentColor={theme.colors.accent}
        foreground={theme.colors.foreground}
        surface={theme.colors.surface}
        inviteeName={inviteeName}
        coupleSlug={couple.slug}
      />
    </>
  );
}
