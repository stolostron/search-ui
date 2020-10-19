/* istanbul ignore file */

import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import { AcmHeader, NavItemE } from "@open-cluster-management/ui-components";
import { SearchPage } from "./SearchPage/SearchPage";

function App() {
    return (
        <AcmHeader activeItem={NavItemE.clusterManagement}>
            <SearchPage />
        </AcmHeader>
    );
}

export default App;
