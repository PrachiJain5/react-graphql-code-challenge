import React from "react";
import { useQuery, gql } from "@apollo/client";
import ApolloClient from "apollo-boost";
import { render } from "react-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import { AppBar } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 350,
    display: "inline-block",
    margin: "20px 120px 20px 120px;",
    borderRadius: "20px;",
  },
  card: {
    maxWidth: 550,
    height: 300,
  },
  media: {
    height: 300,
  },
  icons: {
    paddingTop: "10px;",
    display: "inherit",
  },
  font: {
    fontStyle: "italic",
  },
  banner: {
    backgroundColor: "#f3eaa9e0",
    margin: "0 0 40px 0",
  },
  title: {
    fontStyle: "italic",
    color: "black",
  },
  topPadding: {
    paddingTop: "100px",
  },
});

const FEED_QUERY = gql`
  query users {
    users {
      id
      name
      position
      email
      phone
      password
      image
    }
  }
`;

export default function GetUsers() {
  const { loading, error, data } = useQuery(FEED_QUERY);
  const classes = useStyles();

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <AppBar className={classes.banner}>
        <Typography variant="h2" align="center" className={classes.title}>
          Meet our Team!
        </Typography>
      </AppBar>

      <div className={classes.topPadding}>
        {data.users.map((data) => (
          <Card key={data.id} spacing={20} className={classes.root}>
            <CardMedia className={classes.media} image={data.image} />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {data.name}
              </Typography>
              <Typography
                className={classes.font}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {data.position}
              </Typography>
              <span>
                <EmailIcon className={classes.icons} />
                <Button color="primary" href={"mailto:" + data.email}>
                  {data.email}
                </Button>
                <Divider />
                <PhoneIcon className={classes.icons} />
                <Button color="primary" href={"tel:" + data.phone}>
                  {data.phone}
                </Button>
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
