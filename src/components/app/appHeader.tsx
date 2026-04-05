import React from "react";

import { Container } from "../layout";
import { Alert } from "../misc/alert";
import { AlertTitle, styled } from "@mui/material";

const StyledUl = styled("ul")(({ theme }) => ({
  margin: "1rem -2rem 1rem 0",
  padding: 0,

  [theme.breakpoints.down("md")]: {
    margin: "1rem -3rem 1rem -1rem",
  },
}));

export function AppHeader() {
  return (
    <Alert container={Container} stateName="topNote20211211">
      <AlertTitle>説明</AlertTitle>
      <StyledUl>
        <li>身内対戦のものに限って集計しています。</li>
        <li>対象IDへの追加はどらくまで連絡ください。</li>
        <li>追加取り込みの機能は開発中です。</li>
      </StyledUl>
    </Alert>
  );
}
