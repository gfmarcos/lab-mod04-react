import React from "react";
import { useParams } from "react-router-dom";
import { Card, makeStyles, Button } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

interface MemberDetailEntity {
  id: string;
  login: string;
  name: string;
  company: string;
  bio: string;
  avatar_url: string;
}

const createDefaultMemberDetail = () => ({
  id: "",
  login: "",
  name: "",
  company: "",
  bio: "",
  avatar_url: "",
});

const useStyles = makeStyles(() => ({
  card: {
    padding: "2rem",
    display: "flex",
    "& h2": {
      marginBottom: ".2rem",
    },
  },
  imgAvatar: {
    flexBasis: "30%",
    "& img": {
      borderRadius: "100%",
      width: "100%",
    },
  },
  data: {
    flexGrow: 1,
    paddingLeft: "2rem",
  },
  idLogin: {
    fontSize: ".9rem",
    color: "#757575",
    margin: 0,
  },
  link: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
}));

export const DetailPage: React.FC = () => {
  const [member, setMember] = React.useState<MemberDetailEntity>(createDefaultMemberDetail());
  const { id } = useParams();
  const classes = useStyles();

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => setMember(json));
  }, []);

  return (
    <>
      <h1>Hello from Detail page</h1>
      <Card className={classes.card}>
        <div className={classes.imgAvatar}>
          <img src={member.avatar_url} alt="" />{" "}
        </div>
        <div className={classes.data}>
          <h2>{member.name}</h2>
          <p className={classes.idLogin}>
            id: {member.id} | login: {member.login}
          </p>
          <p>
            <strong>{member.company}</strong>{" "}
          </p>
          <p>{member.bio}</p>
        </div>
        <div className={classes.link}>
          <Button href="/list" variant="contained" color="primary" size="small" startIcon={<NavigateBeforeIcon />}>List page</Button>
        </div>
      </Card>
    </>
  );
};
