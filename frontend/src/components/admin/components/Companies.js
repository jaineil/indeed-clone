import React, { useState, useEffect } from "react";

export const Companies = (props) => {
  const [companies, setCompanies] = useState();
  //   setCompanies(props);
  return (
    <div>
      <h3 style={{ color: "#343a40" }}>Companies</h3>
      <div>
        {console.log({ companies })}
        <div>Company 1</div>
      </div>
    </div>
  );
};
