import { Page } from "@dynatrace/strato-components-preview";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Releases } from "./pages/Releases";
import { Header } from "./components/Header";

export const App = () => {
  return (
    <Page>
      <Page.Header>
        <Header />
      </Page.Header>
      <Page.Main>
        <Routes>
          <Route path="/" element={<Releases />} />
          <Route path="/saas" element={<Releases />} />
          <Route path="/oneagent" element={<Releases />} />
          <Route path="/activegate" element={<Releases />} />
          {/* <Route path="/dynatrace-operator" element={<Releases />} /> */}
        </Routes>
      </Page.Main>
    </Page>
  );
};
