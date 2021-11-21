/** ApplicationProvider.tsx */
// ========== Imports ========== //
import React from "react";
import AuthProvider from "./AuthProvider";
import PdfProvider from "./PdfProvider";

// ========== propsTypes ========== //
export type propsTypes = {};

/** MainFunction */
let ApplicationProvider: React.FC<propsTypes> = (props) => {
  // ==== RETURN METHOD ==== //
  return (
    <AuthProvider>
      <PdfProvider>{props.children}</PdfProvider>
    </AuthProvider>
  );
};

export default ApplicationProvider;
