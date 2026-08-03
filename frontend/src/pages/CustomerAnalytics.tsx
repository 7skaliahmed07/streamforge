import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import {
  People,
  WorkspacePremium,
  PersonAdd,
  Euro,
} from "@mui/icons-material";

import {
  useCustomerKPIs,
  useCustomerGrowth,
  useCustomerSegments,
  useCustomerCities,
  useTopCustomers,
} from "../hooks/useAnalytics";

const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
];

const cardStyle = {
  borderRadius: 4,
  boxShadow: "0 12px 32px rgba(15,23,42,0.08)",
  height: "100%",
};

export default function CustomerAnalytics() {
  const { data: kpis = {}, isLoading } = useCustomerKPIs();

  const { data: growth = [] } = useCustomerGrowth();

  const { data: segments = [] } = useCustomerSegments();

  const { data: cities = [] } = useCustomerCities();

  const { data: topCustomers = [] } = useTopCustomers();

  if (isLoading) {
    return (
      <Typography variant="h5">
        Loading Customer Analytics...
      </Typography>
    );
  }

  const growthData = growth.map((item: any) => ({
    month: item.month,
    customers: Number(item.customers),
  }));

  const segmentData = segments.map((item: any) => ({
    name: item.customer_segment,
    value: Number(item.customers),
  }));

  const cityData = cities.map((item: any) => ({
    city: item.city,
    customers: Number(item.customers),
  }));

  const cards = [
    {
      title: "Total Customers",
      value: Number(kpis.total_customers).toLocaleString(),
      icon: <People sx={{ color: "#4F46E5" }} />,
      bg: "#EEF2FF",
    },
    {
      title: "Premium Customers",
      value: Number(kpis.premium_customers).toLocaleString(),
      icon: <WorkspacePremium sx={{ color: "#F59E0B" }} />,
      bg: "#FEF3C7",
    },
    {
      title: "New Customers",
      value: Number(kpis.new_customers).toLocaleString(),
      icon: <PersonAdd sx={{ color: "#10B981" }} />,
      bg: "#DCFCE7",
    },
    {
      title: "Average Customer Value",
      value:
        "€" +
        Number(kpis.average_customer_value).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      icon: <Euro sx={{ color: "#EC4899" }} />,
      bg: "#FCE7F3",
    },
  ];
  console.log(growthData);

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight={800}
        mb={4}
      >
        Customer Analytics
      </Typography>

      <Grid container spacing={3} mb={4}>

        {cards.map((card) => (

          <Grid
            key={card.title}
            item
            xs={12}
            md={3}
          >

            <Card sx={cardStyle}>

              <CardContent>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >

                  <Box>

                    <Typography
                      color="text.secondary"
                      fontWeight={600}
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={800}
                      mt={2}
                    >
                      {card.value}
                    </Typography>

                  </Box>

                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: card.bg,
                    }}
                  >
                    {card.icon}
                  </Avatar>

                </Box>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>


      {/* ===========================
    CUSTOMER GROWTH
=========================== */}

<Box mb={4}>

    <Card sx={cardStyle}>

        <CardContent>

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                Customer Growth
            </Typography>

            <ResponsiveContainer
                width="100%"
                height={360}
            >

                <LineChart data={growthData}>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                    />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="customers"
                        stroke="#4F46E5"
                        strokeWidth={4}
                        dot={{
                            r:5,
                            fill:"#4F46E5"
                        }}
                        activeDot={{
                            r:8
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </CardContent>

    </Card>

</Box>





{/* ===========================
    CUSTOMER SEGMENTS
=========================== */}

<Box mb={4}>

    <Card sx={cardStyle}>

        <CardContent>

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                Customer Segments
            </Typography>

            <ResponsiveContainer
                width="100%"
                height={360}
            >

                <PieChart>

                    <Pie
                        data={segmentData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                        label
                    >

                        {

                            segmentData.map(
                                (_:any,index:number)=>(

                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[
                                                index % COLORS.length
                                            ]
                                        }
                                    />

                                )
                            )

                        }

                    </Pie>

                    <Tooltip />

                </PieChart>

            </ResponsiveContainer>

            <Box mt={3}>

                {

                    segmentData.map(
                        (segment:any,index:number)=>(

                            <Box
                                key={segment.name}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={1.5}
                            >

                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                >

                                    <Box
                                        sx={{
                                            width:12,
                                            height:12,
                                            borderRadius:"50%",
                                            background:
                                                COLORS[
                                                    index % COLORS.length
                                                ]
                                        }}
                                    />

                                    <Typography>

                                        {segment.name}

                                    </Typography>

                                </Box>

                                <Chip
                                    label={
                                        segment.value.toLocaleString()
                                    }
                                    size="small"
                                    sx={{
                                        fontWeight:700
                                    }}
                                />

                            </Box>

                        )
                    )

                }

            </Box>

        </CardContent>

    </Card>

</Box>

{/* ===========================
    CUSTOMER CITIES
=========================== */}

<Box mb={4}>

    <Card sx={cardStyle}>

        <CardContent>

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                Customers by City
            </Typography>

            <ResponsiveContainer
                width="100%"
                height={420}
            >

                <BarChart
                    data={cityData}
                    margin={{
                        top:20,
                        right:30,
                        left:10,
                        bottom:10
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                    />

                    <XAxis
                        dataKey="city"
                    />

                    <YAxis />

                    <Tooltip
                        formatter={(value:any)=>
                            Number(value).toLocaleString()
                        }
                    />

                    <Bar
                        dataKey="customers"
                        radius={[10,10,0,0]}
                        fill="#4F46E5"
                    />

                </BarChart>

            </ResponsiveContainer>

        </CardContent>

    </Card>

</Box>




      {/* ===========================
            TOP CUSTOMERS
      ============================ */}

      <Card sx={cardStyle}>

        <CardContent>

          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Top Customers
          </Typography>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  Customer
                </TableCell>

                <TableCell>
                  City
                </TableCell>

                <TableCell>
                  Segment
                </TableCell>

                <TableCell align="right">
                  Orders
                </TableCell>

                <TableCell align="right">
                  Revenue
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {topCustomers.map((customer:any,index:number)=>(

                <TableRow
                  key={index}
                  hover
                >

                  <TableCell>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >

                      <Avatar
                        sx={{
                          bgcolor:"#EEF2FF",
                          color:"#4F46E5",
                          fontWeight:700
                        }}
                      >
                        {customer.first_name[0]}
                      </Avatar>

                      <Box>

                        <Typography
                          fontWeight={700}
                        >
                          {customer.first_name} {customer.last_name}
                        </Typography>

                      </Box>

                    </Box>

                  </TableCell>

                  <TableCell>

                    {customer.city}

                  </TableCell>

                  <TableCell>

                    <Chip
                      label={customer.customer_segment}
                      color={
                        customer.customer_segment==="Premium"
                          ? "warning"
                          : customer.customer_segment==="Regular"
                          ? "primary"
                          : "success"
                      }
                      size="small"
                    />

                  </TableCell>

                  <TableCell align="right">

                    {Number(customer.orders).toLocaleString()}

                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      fontWeight:700
                    }}
                  >

                    €

                    {Number(customer.revenue).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits:2,
                        maximumFractionDigits:2
                      }
                    )}

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>
    </Box>

  );

}