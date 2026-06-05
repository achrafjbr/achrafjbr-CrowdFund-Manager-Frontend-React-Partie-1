import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvestment,
  getInvestorBalance,
} from "../../store/slices/investmentSlice";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  LinearProgress,
  CircularProgress,
} from "@mui/material";

import PaidIcon from "@mui/icons-material/Paid";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function InvistorDashboard() {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.authentication.decodedToken);

  const {
    investment,
    investor,
    loading: investmentLoading,
    error: investmentError,
  } = useSelector((state) => state.investment);

  useEffect(() => {
    dispatch(fetchInvestment());
    dispatch(getInvestorBalance());
  }, [dispatch]);

  if (investmentLoading) {
    return <CircularProgress color="secondary" />;
  }

  if (investmentError) {
    return <p>{investmentError}</p>;
  }

  const uniqueProjects = [
    ...new Map(
      investment.map((item) => [item.project._id, item.project])
    ).values(),
  ];

  const projectsFunded = uniqueProjects.length;

  const totalInvested = investment.reduce((sum, item) => {
    return sum + item.amount;
  }, 0);

  return (
    <Box sx={{ minHeight: "100vh", p: 4 }}>
      <Typography variant="h3" gutterBottom>
        CrowdFund
      </Typography>

      <Typography variant="body2" gutterBottom>
        Welcome back,{" "}
        <Box component="span" sx={{ color: "#7c3aed", fontWeight: "bold" }}>
          {name}
        </Box>
        ! Track your investments and discover new opportunities
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Avatar sx={avatarStyle}>
                <AccountBalanceWalletIcon />
              </Avatar>

              <Typography sx={{ mt: 2 }}>Available Balance</Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                {investor?.balance || 0} MAD
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Avatar sx={avatarStyle}>
                <PaidIcon />
              </Avatar>

              <Typography sx={{ mt: 2 }}>Total Invested</Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                {totalInvested} MAD
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Avatar sx={avatarStyle}>
                <TaskAltIcon />
              </Avatar>

              <Typography sx={{ mt: 2 }}>Projects Funded</Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                {projectsFunded}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 5 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={projectsCardStyle}>
            <CardContent>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  borderBottom: "1px solid #1e293b",
                  pb: 2,
                  mb: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Open Projects
                </Typography>
              </Grid>

              {uniqueProjects.map((project) => (
                <Grid
                  key={project._id}
                  container
                  alignItems="center"
                  spacing={2}
                  sx={rowStyle}
                >
                  <Grid size={2}>
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                      alt={project.title}
                      sx={projectImgStyle}
                    />
                  </Grid>

                  <Grid size={5}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {project.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                      {project.raisedAmount} MAD raised
                    </Typography>
                  </Grid>

                  <Grid size={3}>
                    <LinearProgress
                      variant="determinate"
                      value={project.fundingPercentage}
                      sx={progressStyle}
                    />
                  </Grid>

                  <Grid size={2}>
                    <Typography
                      align="right"
                      sx={{ fontWeight: "bold", fontSize: "22px" }}
                    >
                      {project.fundingPercentage}%
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={projectsCardStyle}>
            <CardContent>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  borderBottom: "1px solid #1e293b",
                  pb: 2,
                  mb: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  My Recent Investments
                </Typography>
              </Grid>

              {investment.map((item) => (
                <Grid
                  key={item._id}
                  container
                  alignItems="center"
                  spacing={2}
                  sx={rowStyle}
                >
                  <Grid size={1}>
                    <Box
                      component="img"
                      src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                      alt={item.project.title}
                      sx={smallImgStyle}
                    />
                  </Grid>

                  <Grid size={5}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item.project.title}
                    </Typography>
                  </Grid>

                  <Grid size={3}>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {item.amount} MAD
                    </Typography>
                  </Grid>

                  <Grid size={3}>
                    <Typography sx={{ color: "#94a3b8" }}>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

const cardStyle = {
  outline: "1px solid #e0e0e0",
  borderRadius: "16px",
};

const avatarStyle = {
  bgcolor: "#7c3aed",
};

const projectsCardStyle = {
  borderRadius: "16px",
  // border: " solid #1e293b",
  // boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  outline : "1px solid #e0e0e0"
};

// const viewAllStyle = {
//   color: "#a855f7",
//   fontWeight: "bold",
//   cursor: "pointer",
// };

const rowStyle = {
  py: 2,
  borderBottom: "1px solid #1e293b",
};

const projectImgStyle = {
  width: "90px",
  height: "65px",
  borderRadius: "8px",
  objectFit: "cover",
};

const smallImgStyle = {
  width: "35px",
  height: "35px",
  borderRadius: "6px",
  objectFit: "cover",
};

const progressStyle = {
  height: 8,
  borderRadius: 5,
  backgroundColor: "#1e293b",
  "& .MuiLinearProgress-bar": {
    background: "linear-gradient(90deg, #c84dff, #7b2ff7)",
    borderRadius: 5,
  },
};