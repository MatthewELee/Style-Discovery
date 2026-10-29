import { AnimatePresence, motion } from "motion/react";
import { Suspense, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { conceptIndex, concepts, neighbour } from "../concepts/registry";
import { galleryPath } from "./galleryFilter";
import NavBar from "./NavBar";
import StyleCard from "./StyleCard";

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  );
}

export default function ConceptViewer() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const index = conceptIndex(slug);
  const concept = concepts[index];
  // Which concept the style card is open for, so it closes itself on navigation.
  const [cardOpenFor, setCardOpenFor] = useState<string | null>(null);
  const cardOpen = cardOpenFor === slug;

  useEffect(() => {
    if (concept) document.title = `${concept.brand} · ${concept.style} — Style Discovery`;
  }, [concept]);

  // ← / → move between concepts, Esc returns to the gallery.
  // A concept that uses these keys itself (a game, a carousel) calls preventDefault().
  useEffect(() => {
    if (index < 0 || cardOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (isTyping(e.target)) return;
      if (e.key === "ArrowLeft") navigate(`/c/${neighbour(index, -1).slug}`);
      else if (e.key === "ArrowRight") navigate(`/c/${neighbour(index, 1).slug}`);
      else if (e.key === "Escape") navigate(galleryPath());
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, cardOpen, navigate]);

  if (!concept) return <Navigate to="/" replace />;

  const { Page } = concept;

  return (
    <>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.div
          key={concept.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
            <Page />
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <NavBar
        concept={concept}
        prev={neighbour(index, -1)}
        next={neighbour(index, 1)}
        onOpenCard={() => setCardOpenFor(concept.slug)}
      />
      <StyleCard concept={concept} open={cardOpen} onClose={() => setCardOpenFor(null)} />
    </>
  );
}
