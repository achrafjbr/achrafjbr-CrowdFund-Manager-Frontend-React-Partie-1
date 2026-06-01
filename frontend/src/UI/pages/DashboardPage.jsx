import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";
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
  Chip,
  LinearProgress,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { decodedToken } = useSelector(
  (state) => state.authentication
);
console.log("decodedToken:", decodedToken)
  const { projects, loading, error } = useSelector((state) => state.projects);
  console.log("PROJECTS:", projects);

  const data = projects;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  if (loading)
    return <CircularProgress color="secondary" aria-label="Loading…" />;
  if (error) return <p>{error}</p>;
  const totalProject = data.length;
  const projectIsOpen = data.filter(
    (project) => project.status === "open",
  ).length;
  const projectIsClose = data.filter(
    (project) => project.status === "closed",
  ).length;
  const totalCapitalRaised = data.reduce(
    (sum, project) => sum + project.raisedAmount,
    0,
  );
  return (
    <div className="dashboard-page">
      <Typography
        variant="h3"
        gutterBottom
        sx={{ color: "white", marginLeft: "40px", marginTop: "15px" }}
      >
        CrowdFund
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ color: "white", marginLeft: "40px" }}
      >
        Welcome back, {decodedToken?.name}! Here's an overview of your projects.
      </Typography>
      <Grid container spacing={3} direction="row">
        <Card
          sx={{
            width: "200px",
            marginTop: "20px",
            marginLeft: "40px",
            background: "#1a1f35",
            color: "white",
            border: "1px solid #b39ddb",
            
          }}
        >
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid size={4}>
                <Avatar sx={{ bgcolor: "#1a1f35" }}>
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
            background: "#1a1f35",
            color: "white",
            border: "1px solid #b39ddb",
          }}
        >
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid size={4}>
                <Avatar sx={{ bgcolor: "#1a1f35" }}>
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
            background: "#1a1f35",
            color: "white",
            border: "1px solid #b39ddb",
          }}
        >
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid size={4}>
                <Avatar sx={{ bgcolor: "#1a1f35" }}>
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
            background: "#1a1f35",
            color: "white",
            border: "1px solid #b39ddb",
          }}
        >
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid size={4}>
                <Avatar sx={{ bgcolor: "#1a1f35" }}>
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
          background: "#1a1f35",
          color: "white",
          border: "1px solid #b39ddb",
        }}
      >
        <CardContent>
          <Grid container spacing={100} >
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Projects Overview
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ color: "#bd76ff" }}>
              <Link to="/home/projects">
                <span>View all projects →</span>
              </Link>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2, bgcolor: "white" }} />
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
                    <TableRow
                      key={project._id}
                      onClick={() => navigate(`/home/projects/${project._id}`)}
                    >
                      <TableCell component="th" scope="row">
                        {project.title}
                      </TableCell>

                      <TableCell align="right">
                        <Chip
                          size="small"
                          label={project.status}
                          color={
                            project.status === "open" ? "success" : "default"
                          }
                          variant={
                            project.status === "close" ? "filled" : "outlined"
                          }
                          sx={{ color: "white" }}
                        />
                      </TableCell>

                      <TableCell align="right">${project.capital}</TableCell>

                      <TableCell align="right">${invested}</TableCell>

                      <TableCell align="right">
                        <LinearProgress
                          variant="determinate"
                          value={project.maxInvestPercent}
                          sx={{
                            height: 8,
                            borderRadius: 5,

                            backgroundColor: "#2b3142",

                            "& .MuiLinearProgress-bar": {
                              background:
                                "linear-gradient(90deg, #c84dff, #7b2ff7)",
                              borderRadius: 5,
                            },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardPage;
