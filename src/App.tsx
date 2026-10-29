import { MotionConfig } from "motion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ConceptViewer from "./shell/ConceptViewer";
import Gallery from "./shell/Gallery";

export default function App() {
  return (
    // Respect the visitor's "reduce motion" setting in every concept.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/c/:slug" element={<ConceptViewer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
