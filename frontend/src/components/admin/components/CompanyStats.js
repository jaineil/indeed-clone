import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from "@material-ui/core";
import theme from "../../common/MenuTheme";
import AdminHeader from "../AdminHeader";
import endPointObj from "../../../endPointUrl";

export const CompanyStats = (props) => {
  const [company, setCompany] = useState();
  useEffect(() => {
    const company = props.location.state.company;
    console.log({ company }, props);
    setCompany(company);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <AdminHeader />
      <hr style={{ margin: "0" }} />
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            //   backgroundImage: `url(${image_url})`,
            backgroundColor: "grey",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "40vh",
            padding: "20px",
          }}
        >
          <div>
            <div className="store-name b f3 white">
              {`${company?.companyName} (${company?.websiteUrl})`}
            </div>
            <div className="contact-details white em">
              <span className="ma2">{`${company?.headquarters}`}</span>
              <br />
              <span className="ma2">{`${company?.companyLocation.city}, ${company?.companyLocation.state}`}</span>
              <br />
            </div>
          </div>
          <br />
        </div>
      </div>
    </ThemeProvider>
  );
};
