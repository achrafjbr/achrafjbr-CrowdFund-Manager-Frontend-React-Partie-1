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
  Divider,
  Avatar,
  Chip,
  LinearProgress,
} from "@mui/material";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaidIcon from "@mui/icons-material/Paid";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function InvistorDashboard() {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.authentication.decodedToken);
  console.log(name);

  const {
    investors,
    loading: investorsLoading,
    error: investorsError,
  } = useSelector((state) => state.investors);
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useSelector((state) => state.projects);
  const dataInvest = investors;
  const dataProject = projects;
  console.log("invest", dataInvest);
  console.log("project", dataProject);

  useEffect(() => {
    dispatch(fetchInvestors());
  }, [dispatch]);
  if (investorsLoading || projectsLoading)
    return <CircularProgress color="secondary" aria-label="Loading…" />;
  //   const gettprojectIsOpen = dataProject.;
  if (investorsError || projectsError)
    return <p> {investorsError || projectsError} </p>;
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
              <Grid size={4}>total Invested</Grid>
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
              <Grid size={4}>projects funded</Grid>
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
                  <TrendingUpIcon />
                </Avatar>
              </Grid>
              <Grid size={4} sx={{ whiteSpace: "nowrap" }}>
                Total Return
              </Grid>
              <Grid size={4}>total return</Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
