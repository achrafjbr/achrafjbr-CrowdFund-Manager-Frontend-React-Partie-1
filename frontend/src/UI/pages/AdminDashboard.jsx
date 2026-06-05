import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestors } from "../../store/slices/investorsSlice";
import {fetchOwner} from "../../store/slices/ownerSlice"
import { Link } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
//   LinearProgress,
  CircularProgress,
} from "@mui/material";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PieChartIcon from "@mui/icons-material/PieChart";

export default function AdminDashboard() {
    const dispatch = useDispatch();

    const { name } = useSelector((state) => state.authentication.decodedToken);
    console.log("name", name);

    const { owners, ownersLoding, ownersError } = useSelector((state) => state.owners)
    const {investors , investorsLoding ,investorsError} = useSelector((state) => state.investors)
    console.log("owners", owners);
    console.log("investors", investors);



  useEffect(() => {
    dispatch(fetchOwner());
    dispatch(fetchInvestors());
  }, []);


  if (ownersLoding  ||investorsLoding ) {
    return <CircularProgress color="secondary" />;
  }
  if (ownersError || investorsError ) {
    return <p>{ownersError ||investorsError }</p>;
  }


  const totalOWners = owners.length
//   console.log( "owners", totalOWners);
  const totalinvestors = investors.length
//   console.log( "totalinvestors",totalinvestors);

  
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
        ! Her's an overview of the platform
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Avatar sx={avatarStyle}>
                <GroupsIcon />
              </Avatar>

              <Typography sx={{ mt: 2 }}>Total Owner</Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                {totalOWners}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Avatar sx={avatarStyle}>
                <TrendingUpIcon />
              </Avatar>

              <Typography sx={{ mt: 2 }}>Total Investors</Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                {totalinvestors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Avatar sx={avatarStyle}>
                <BusinessCenterIcon />
              </Avatar>

              <Typography sx={{ mt: 2 }}>Owner Protfolios</Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                {totalOWners}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={cardStyle}>
            <CardContent>
              <Avatar sx={avatarStyle}>
                <PieChartIcon />
              </Avatar>

              <Typography sx={{ mt: 2 }}>Investors Protfolios</Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                {totalinvestors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

{/* ----------------------------------------------------------------- */}
<Grid container spacing={3} sx={{ mt: 5 }}>

  {/* TOP OWNERS */}
  <Grid size={{ xs: 12, md: 6 }}>
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Top Owners
        </Typography>
{/* slice(0, 5) */}
        {owners.map((owner) => (
          <Box
            key={owner._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.5,
              borderBottom: "1px solid #eee",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar src={owner.avatar} />
              <Typography>{owner.name}</Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  </Grid>

  {/* TOP INVESTORS */}
  <Grid size={{ xs: 12, md: 6 }}>
    <Card sx={cardStyle}>
      <CardContent>
        <Grid container spacing={28} >
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Top Investors
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ color: "#bd76ff" }}>
              <Link to="/home/investors">
                <span>View all Investors →</span>
              </Link>
            </Grid>
            </Grid>
        {investors.slice(0, 5).map((inv) => (
          <Box
            key={inv._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              py: 1.5,
              borderBottom: "1px solid #eee",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar src={inv.avatar} />
              <Typography>{inv.name}</Typography>
            </Box>

            <Typography>{inv.investments}</Typography>

            <Typography sx={{ fontWeight: "bold" }}>
              {inv.balance} MAD
            </Typography>
          </Box>
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


