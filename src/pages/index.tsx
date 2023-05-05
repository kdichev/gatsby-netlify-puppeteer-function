import React from "react";

const IndexPage = () => {
  const [loading, setLoading] = React.useState(false);
  const getPdf = async () => {
    setLoading(true);
    // gatsby function
    await fetch("./api/create-pdf");
    // netlify function
    // await fetch("/.netlify/functions/test");
    setLoading(false);
  };
  return (
    <div>
      <button disabled={loading} onClick={getPdf}>
        trigger puppeteer
      </button>
      {loading && "loading..."}
    </div>
  );
};

export default IndexPage;
