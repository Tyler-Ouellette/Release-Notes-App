import React from "react";
import { Link } from "react-router-dom";
import { AppHeader } from "@dynatrace/strato-components-preview";

export const Header = () => {
  return (
    <AppHeader>
      <AppHeader.NavItems>
        <AppHeader.AppNavLink as={Link} to="/" />
        <AppHeader.NavItem as={Link} to="/saas">
          Releases
        </AppHeader.NavItem>
        <AppHeader.NavItem as={Link} to="/oneagent">
          OneAgent
        </AppHeader.NavItem>
        <AppHeader.NavItem as={Link} to="/activegate">
          ActiveGate
        </AppHeader.NavItem>
        {/* <AppHeader.NavItem as={Link} to="/dynatrace-operator">
          Dynatrace Operator
        </AppHeader.NavItem> */}
      </AppHeader.NavItems>
    </AppHeader>
  );
};
