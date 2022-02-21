import React from "react";

const MessagePanel = ({ loading, noItem }) => (
  <div style={{ padding: 15, textAlign: "center", fontStyle: "italic" }}>
    {loading && <div>Loading...</div>}
    {noItem && !loading && <div>No Item</div>}
  </div>
);

export default MessagePanel;
