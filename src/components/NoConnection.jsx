/**
 * Created by Siddhant Gupta on 2018-03-20.
 */

import React from "react";

export default function NoConnection() {
    return <div className="no-connection">
        <h5>⚠️ Error! No connection found</h5>
        <p>We recommend checking Internet Connection or API key, and then try reloading.</p>
    </div>;
}