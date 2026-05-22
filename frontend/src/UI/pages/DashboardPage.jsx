import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../store/slices/projectsSlice";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Avatar,
} from "@mui/material";

// import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FolderIcon from "@mui/icons-material/Folder";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { Link } from "react-router-dom";


function DashboardPage() {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.projects);
  console.log(data);
  
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  if (loading)
    return <CircularProgress color="secondary" aria-label="Loading…" />;
  if (error) return <p>{error}</p>;
  const totalProject = data.length
  const projectIsOpen =data.filter((project) => project.status === "open").length
  const projectIsClose =data.filter((project) => project.status === "closed").length
  const totalCapitalRaised = data.reduce((sum , project)=> sum + project.raisedAmount , 0)
  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ color: "white", marginLeft: "40px" }}
      >
        CrowdFund
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ color: "white", marginLeft: "40px" }}
      >
        Welcome back, John! Here's an overview of your projects.
      </Typography>
      <Grid container spacing={3} direction="row">
        <Card
          sx={{
            width: "200px",
            marginTop: "20px",
            marginLeft: "40px",
            background:
              "linear-gradient(180deg, rgba(22, 26, 39, .96), rgba(11, 13, 21, .96))",
            color: "white",
            border: "1px solid #b39ddb",
          }}
        >
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid size={4}>
                <Avatar sx={{ bgcolor: "#35106e" }}>
                  <FolderIcon />
                </Avatar>
              </Grid>
              <Grid size={4} sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body1">Total Projects</Typography>
              </Grid>
              <Grid size={4}>{totalProject}</Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: "200px",
            marginTop: "20px",
            marginLeft: "40px",
            background:
              "linear-gradient(180deg, rgba(22, 26, 39, .96), rgba(11, 13, 21, .96))",
            color: "white",
            border: "1px solid #b39ddb",
          }}
        >
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid size={4}>
                <Avatar sx={{ bgcolor: "#35106e" }}>
                  <LockOpenIcon />
                </Avatar>
              </Grid>
              <Grid size={4} sx={{ whiteSpace: "nowrap" }}>
                Open Projects
              </Grid>
              <Grid size={4}>{projectIsOpen}</Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: "200px",
            marginTop: "20px",
            marginLeft: "40px",
            background:
              "linear-gradient(180deg, rgba(22, 26, 39, .96), rgba(11, 13, 21, .96))",
            color: "white",
            border: "1px solid #b39ddb",
          }}
        >
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid size={4}>
                <Avatar sx={{ bgcolor: "#35106e" }}>
                  <LockIcon />
                </Avatar>
              </Grid>
              <Grid size={4} sx={{ whiteSpace: "nowrap" }}>
                Closed Projects
              </Grid>
              <Grid size={4}>{projectIsClose}</Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: "200px",
            marginTop: "20px",
            marginLeft: "40px",
            background:
              "linear-gradient(180deg, rgba(22, 26, 39, .96), rgba(11, 13, 21, .96))",
            color: "white",
            border: "1px solid #b39ddb",
          }}
        >
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid size={4}>
                <Avatar sx={{ bgcolor: "#35106e" }}>
                  <AccountBalanceWalletIcon />
                </Avatar>
              </Grid>
              <Grid size={4} sx={{ whiteSpace: "nowrap" }}>
                Total Capital Raised
              </Grid>
              <Grid size={4}> {totalCapitalRaised} </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Card
        sx={{
          mt: 5,
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          marginLeft: "40px",
          background:
            "linear-gradient(180deg, rgba(22, 26, 39, .96), rgba(11, 13, 21, .96))",
          color: "white",
          border: "1px solid #b39ddb",
        }}
      >
        <CardContent>
          <Grid container spacing={100} sx={{}}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Projects Overview
              </Typography>
            </Grid>
            
            <Grid item xs={12} sx={{ color: "#bd76ff" }}>
              <Link to = "/home/projects">
              <span>View all projects →</span>
              </Link>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <TableContainer sx={{ color: "white" }}>
            <Table
              sx={{
                minWidth: 650,
                "& .MuiTableCell-root": {
                  color: "white",
                },
              }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Target Capital</TableCell>
                  <TableCell align="right">Invested</TableCell>
                  <TableCell align="right">Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((project) => {
                  const invested = project.capital - project.remainingCapital;

                  return (
                    <TableRow key={project._id}>
                      <TableCell component="th" scope="row">
                        {project.title}
                      </TableCell>

                      <TableCell align="right">{project.status}</TableCell>

                      <TableCell align="right">${project.capital}</TableCell>

                      <TableCell align="right">${invested}</TableCell>

                      <TableCell align="right">ligne</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
}

export default DashboardPage;
