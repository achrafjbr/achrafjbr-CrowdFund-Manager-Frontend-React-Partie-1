import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestors } from "../../store/slices/investorsSlice";
import CircularProgress from "@mui/material/CircularProgress";
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
  // Divider,
  Avatar,
  Chip,
  LinearProgress,
} from "@mui/material";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaidIcon from "@mui/icons-material/Paid";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function InvistorDashboard() {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.authentication.decodedToken);
  console.log(name);

  const {
    investors,
    loading: investorsLoading,
    error: investorsError,
  } = useSelector((state) => state.investors);
console.log("investors" , investors);

  useEffect(() => {
    dispatch(fetchInvestors());
  }, [dispatch]);
  if (investorsLoading)
    return <CircularProgress color="secondary" aria-label="Loading…" />;

  //   fiha project li mam3awdinx
  const uniqueProjects = [
    ...new Map(
      investors.map((item) => [item.project._id, item.project]),
    ).values(),
  ];
  console.log("uniqP", uniqueProjects);
  const projectsFunded = uniqueProjects.length;
  // had hana
  // project li open
  // const openProject = uniqueProjects.filter(
  //   (project) => project.status === "open",
  // );

  if (investorsError) return <p> {investorsError} </p>;
  return (
    <div>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ marginLeft: "40px", marginTop: "15px" }}
      >
        CrowdFund
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ marginLeft: "40px" }}>
        Welcome back, {name}! Track your investments and discover new
        opportunities
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
                  <PaidIcon />
                </Avatar>
              </Grid>
              <Grid size={4} sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body1">Available Balace</Typography>
              </Grid>
              <Grid size={4}>Available Balace</Grid>
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
                  {/* <LockOpenIcon /> */}
                </Avatar>
              </Grid>
              <Grid size={4} sx={{ whiteSpace: "nowrap" }}>
                Total Invested
              </Grid>
              <Grid size={4}> {investors[0]?.project?.raisedAmount} </Grid>
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
                  <TaskAltIcon />
                </Avatar>
              </Grid>
              <Grid size={4} sx={{ whiteSpace: "nowrap" }}>
                Projects Funded
              </Grid>
              <Grid size={4}>{projectsFunded}</Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2} sx={{justifyContent :"center", marginTop :"40px"}}>
        <Grid size={5} >
                    <TableContainer sx={{ color: "white" }}>
            <Table
              sx={{
                minWidth: 650,
                "& .MuiTableCell-root": {
                  
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
                </TableRow>
              </TableHead>
              <TableBody>
                {uniqueProjects.map((project) => {
                  const invested = project.capital - project.remainingCapital;

                  return (
                    <TableRow
                      key={project._id}
                    //   onClick={() => navigate(`/home/projects/${project._id}`)}
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
        </Grid>
        <Grid size={5} >
          4
        </Grid>
      </Grid>
    </div>
  );
}
