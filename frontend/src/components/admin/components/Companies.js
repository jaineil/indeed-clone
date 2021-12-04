import axios from "axios";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Typography, Card, CardContent } from "@material-ui/core";
import { Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import endPointObj from "../../../endPointUrl";

const useStyles = makeStyles((theme) => ({
  pointer: {
    cursor: "pointer",
  },
  tabContent: {
    paddingTop: "10px",
    paddingLeft: "25px",
    paddingRight: "15px",
    minHeight: "90vh",
  },
  flex: {
    display: "flex",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  row: {
    margin: "0",
  },
  col: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
  menuItem: {
    borderBottom: "1px solid grey",
  },
  tabCol: {
    paddingLeft: "0px",
    paddingRight: "0px",
    background: "#ebeef2",
  },
}));

export const Companies = () => {
  const classes = useStyles();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchName, setSearchName] = useState("");
  const searchChange = (e) => {
    e.preventDefault();
    setSearchName(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchName === "") {
      setFilteredCompanies(companies);
    } else {
      const searchedCompanies = companies.filter(
        (company) => company.companyName === searchName
      );
      setFilteredCompanies(searchedCompanies);
    }
  };

  useEffect(() => {
    axios.get(`${endPointObj.url}/admin/get-companies`).then((res) => {
      if (res.status === 200) {
        setCompanies(res.data);
        setFilteredCompanies(res.data);
      }
    });
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ color: "#05164d" }}>
          <em>Companies</em>
        </h3>
        <Form className="d-flex" onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Search Company"
            className="me-2"
            aria-label="Search"
            value={searchName}
            onChange={searchChange}
          />
          <Button type="submit" variant="outline-success">
            Search
          </Button>
        </Form>
      </div>
      <div>
        {filteredCompanies?.map((company) => {
          return company?.companyName ? (
            <Card
              variant="outlined"
              style={{
                margin: "10px",
              }}
              key={company._id}
            >
              <CardContent
                style={{
                  paddingBottom: "0px",
                }}
              >
                <div className={classes.flexSpaceBetween}>
                  <Typography
                    variant="body1"
                    component="div"
                    style={{ fontSize: "1.2rem", fontWeight: "bold" }}
                  >
                    <Link
                      to={{
                        pathname: "/companystats",
                        state: { company: company },
                      }}
                      style={{ textDecoration: "none" }}
                    >{`${company.companyName}`}</Link>
                  </Typography>
                  <Typography
                    variant="body1"
                    component="div"
                    style={{ fontSize: "1rem" }}
                  >
                    <em>{`${company.websiteUrl}`}</em>
                  </Typography>
                </div>
                <Typography variant="body1" component="div">
                  <p>{`${company.averageRating} rating`}</p>
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <div></div>
          );
        })}
      </div>
    </div>
  );
};
