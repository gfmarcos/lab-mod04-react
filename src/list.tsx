import React from "react";
import { Link, generatePath } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles(() => ({
  company: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h2": {
      flexGrow: "1",
    },
    "& div": {
      marginRight: ".5rem",
    },
  },
  link: {
    display: "flex",
    textDecoration: "none",
  },
}));

const organizations: string[] = ["lemoncode", "adobe", "netflix", "microsoft", "google", "twitter"];

export const ListPage: React.FC = () => {
  const classes = useStyles();
  const [organization, setOrganization] = React.useState("lemoncode");
  const [searchOrganization, setSearchOrganization] = React.useState("");
  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${organization}/members`).then((response) => {
      if (response.ok) {
        response.json().then((json) => setMembers(json));
      } else {
        alert(`The company "${organization}" does not exist.`);
      }
    });
  }, [organization]);

  const handleChange = (event) => setOrganization(event.target.value);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchOrganization) setOrganization(searchOrganization.toLowerCase());
  };

  /*  const uppercaseFirstLetter = ([first, ...rest]:string[]) => [first.toUpperCase(), ...rest].join(""); */

  const uppercaseFirstLetter = (s: string): string => s.charAt(0).toLocaleUpperCase() + s.slice(1);

  return (
    <>
      <h1>Hello from List page</h1>
      <div className={classes.company}>
        <h2>{uppercaseFirstLetter(organization)}</h2>
        <div>
          <form action=""></form>
          <FormControl>
            <InputLabel>Company</InputLabel>
            <Select value={organization} onChange={handleChange}>
              {organizations.map((organization, i) => (
                <MenuItem key={i} value={organization}>
                  {uppercaseFirstLetter(organization)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <form onSubmit={handleSearch}>
            <TextField label="Search company" value={searchOrganization} onChange={(e) => setSearchOrganization(e.target.value)} />
            <Button variant="contained" color="primary" type="submit">
              <SearchIcon />
            </Button>
          </form>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <img src={member.avatar_url} style={{ width: "5rem" }} />
                </TableCell>
                <TableCell>{member.id}</TableCell>
                <TableCell>
                  <Link to={generatePath("/detail/:id", { id: member.login })} className={classes.link}>
                    {member.login} <NavigateNextIcon color="primary" fontSize="small" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
