

import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography
    
} from "@mui/material";

import DataTable from "../components/tables/DataTable";

import {
    BarChart,

    Bar,

    ResponsiveContainer,

    LineChart,

    Line,

    PieChart,

    Pie,

    Cell,

    CartesianGrid,

    XAxis,

    YAxis,

    Tooltip,

    Legend

} from "recharts";

import {

    useProductKPIs,
    useProductRevenue,
    useBrandRevenue,
    useCategoryRevenue,
    useInventoryValue,
    useLowStockProducts,
    useTopProductsAnalytics,
    useProductPricing

} from "../hooks/useAnalytics";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";





function ProductAnalytics(){


    const {

        data:kpis={},
        isLoading

    }=useProductKPIs();

    const {

        data:monthlyRevenue=[]

    }=useProductRevenue();



    const {

        data:brandRevenue=[]

    }=useBrandRevenue();

    const {

    data:categoryRevenue=[]

    }=useCategoryRevenue();



    const {

        data:inventoryValue=[]

    }=useInventoryValue();


    const {

    data:topProducts=[]

    }=useTopProductsAnalytics();



    const {

    data:lowStock=[]

    }=useLowStockProducts();



    const {

    data:pricing=[]

    }=useProductPricing();



    if(isLoading){

        return(

            <Typography>

                Loading Product Analytics...

            </Typography>

        );

    }



    const cardStyle={

        borderRadius:4,

        boxShadow:"0 10px 30px rgba(0,0,0,.08)",

        height:"100%"

    };



    const iconStyle={

        color:"#4f46e5",

        fontSize:34

    };



    const kpiCards=[

        {
            title:"Total Products",

            value:Number(
                kpis.total_products
            ).toLocaleString(),

            icon:<Inventory2RoundedIcon sx={iconStyle}/>

        },

        {

            title:"Categories",

            value:Number(
                kpis.categories
            ).toLocaleString(),

            icon:<CategoryRoundedIcon sx={iconStyle}/>

        },

        {

            title:"Average Price",

            value:`€${Number(
                kpis.average_price
            ).toFixed(2)}`,

            icon:<EuroRoundedIcon sx={iconStyle}/>

        },

        {

            title:"Inventory Value",

            value:`€${Number(
                kpis.inventory_value
            ).toLocaleString(undefined,{
                minimumFractionDigits:2,
                maximumFractionDigits:2
            })}`,

            icon:<WarehouseRoundedIcon sx={iconStyle}/>

        }

    ];

const COLORS = [

    "#2563EB", // Blue

    "#10B981", // Emerald

    "#F59E0B", // Amber

    "#EF4444", // Red

    "#8B5CF6", // Violet

    "#14B8A6", // Teal

    "#EC4899", // Pink

    "#84CC16", // Lime

    "#F97316", // Orange

    "#6B7280"  // Slate Gray

];
    const revenueData =

    monthlyRevenue.map(item=>({

        ...item,

        revenue:Number(item.revenue)

    }));


    const brandData = brandRevenue.map((item: any) => ({

    ...item,

    revenue: Number(item.revenue)

    }));

    const categoryData = categoryRevenue.map(
    (item:any)=>({

        ...item,

        revenue:Number(item.revenue)

        })
    );



    const inventoryData = inventoryValue.map(
        (item:any)=>({

            ...item,

            inventory_value:Number(
                item.inventory_value
            )

        })
    );

    const pricingData =
    pricing.map((item:any)=>({

        ...item,

        products:Number(item.products)

    }));



    return(

        <Box>

            <Typography

                variant="h4"
                fontWeight={800}
                mb={4}

            >

                Product Analytics

            </Typography>



            <Grid
                container
                spacing={3}
                mb={4}
            >

                {

                    kpiCards.map((card)=>(

                        <Grid

                            item
                            xs={12}
                            sm={6}
                            lg={3}

                            key={card.title}

                        >

                            <Card sx={cardStyle}>

                                <CardContent>

                                    <Box

                                        display="flex"

                                        justifyContent="space-between"

                                        alignItems="center"

                                    >

                                        <Typography

                                            color="text.secondary"

                                            fontWeight={600}

                                        >

                                            {card.title}

                                        </Typography>

                                        <Box

                                            sx={{

                                                background:"#EEF2FF",

                                                borderRadius:"50%",

                                                p:1.2

                                            }}

                                        >

                                            {card.icon}

                                        </Box>

                                    </Box>



                                    <Typography

                                        variant="h4"

                                        fontWeight={800}

                                        mt={2}

                                    >

                                        {card.value}

                                    </Typography>

                                </CardContent>

                            </Card>

                        </Grid>

                    ))

                }

            </Grid>



            <Box
                display="grid"
                gridTemplateColumns={{
                    xs: "1fr",
                    lg: "2fr 1fr"
                }}
                gap={3}
                mb={4}
                >

                    <Card sx={cardStyle}>

                        <CardContent>

                            <Typography

                                variant="h6"

                                fontWeight={700}

                                mb={3}

                            >

                                Monthly Product Revenue

                            </Typography>

                            <ResponsiveContainer

                                width="100%"

                                height={350}

                            >

                                <LineChart

                                    data={revenueData}

                                >

                                    <CartesianGrid

                                        strokeDasharray="3 3"

                                    />

                                    <XAxis

                                        dataKey="month"

                                    />

                                    <YAxis

                                        tickFormatter={

                                            value=>`€${value/1000000}M`

                                        }

                                    />

                                    <Tooltip

                                        formatter={(v:any)=>

                                            `€${Number(v).toLocaleString()}`

                                        }

                                    />

                                    <Line

                                        dataKey="revenue"

                                        type="monotone"

                                        stroke="#4F46E5"

                                        strokeWidth={3}

                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </CardContent>

                    </Card>



                    <Card sx={cardStyle}>

                            <CardContent>

                                <Typography

                                    variant="h6"

                                    fontWeight={700}

                                    mb={3}

                                >

                                    Brand Revenue

                                </Typography>

                                <ResponsiveContainer

                                    width="100%"

                                    height={350}

                                >

                                    <PieChart>

                                        <Pie

                                            data={brandData}

                                            dataKey="revenue"

                                            nameKey="brand"

                                            outerRadius={110}

                                            label

                                        >

                                            {

                                                brandData.map(

                                                    (_:any,index:number)=>(

                                                        <Cell

                                                            key={index}

                                                            fill={

                                                                COLORS[

                                                                    index%

                                                                    COLORS.length

                                                                ]

                                                            }

                                                        />

                                                    )

                                                )

                                            }

                                        </Pie>

                                        <Tooltip

                                            formatter={(v:any)=>

                                                `€${Number(v).toLocaleString()}`

                                            }

                                        />

                                        <Legend/>

                                    </PieChart>

                                </ResponsiveContainer>

                            </CardContent>

                    </Card>


            </Box>



            <Box

                display="grid"

                gridTemplateColumns={{

                    xs:"1fr",

                    lg:"1fr 1fr"

                }}

                gap={3}

                mt={4}

            >



            <Card sx={cardStyle}>

            <CardContent>


            <Typography

                variant="h6"

                fontWeight={700}

                mb={3}

            >

            Category Revenue

            </Typography>



            <ResponsiveContainer

                width="100%"

                height={350}

            >


            <BarChart

                data={categoryData}

                layout="vertical"

            >


            <CartesianGrid

                strokeDasharray="3 3"

            />


            <XAxis

                type="number"

                tickFormatter={

                    value=>`€${value/1000000}M`

                }

            />


            <YAxis

                dataKey="category"

                type="category"

            />


            <Tooltip

            formatter={(value:any)=>

            `€${Number(value).toLocaleString()}`

            }

            />


            <Bar

                dataKey="revenue"

                fill="#2563EB"

                radius={[0,8,8,0]}

            />


            </BarChart>


            </ResponsiveContainer>


            </CardContent>

            </Card>





            <Card sx={cardStyle}>

            <CardContent>


            <Typography

                variant="h6"

                fontWeight={700}

                mb={3}

            >

            Inventory Value

            </Typography>



            <ResponsiveContainer

                width="100%"

                height={350}

            >


            <BarChart

                data={inventoryData}

            >


            <CartesianGrid

                strokeDasharray="3 3"

            />


            <XAxis

                dataKey="category"

            />


            <YAxis

            tickFormatter={

            value=>`€${value/1000000}M`

            }

            />


            <Tooltip

            formatter={(value:any)=>

            `€${Number(value).toLocaleString()}`

            }

            />


            <Bar

            dataKey="inventory_value"

            fill="#10B981"

            radius={[8,8,0,0]}

            />


            </BarChart>


            </ResponsiveContainer>


            </CardContent>

            </Card>



            </Box>



            <Box

            display="grid"

            gridTemplateColumns={{

            xs:"1fr",

            lg:"1fr 1fr"

            }}

            gap={3}

            mt={4}

            >


            <Card sx={cardStyle}>

            <CardContent>

            <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
            >
            Top Products
            </Typography>


            <DataTable

            columns={[
            "name",
            "brand",
            "category",
            "units_sold",
            "orders",
            "revenue"
            ]}

            rows={

            topProducts.map((p:any)=>({

            ...p,

            revenue:

            `€${Number(p.revenue)
            .toLocaleString(undefined,{
            minimumFractionDigits:2
            })}`

            }))

            }

            />


            </CardContent>

            </Card>





            <Card sx={cardStyle}>

            <CardContent>

            <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
            >
            Low Stock Products
            </Typography>


            <DataTable

            columns={[
            "name",
            "brand",
            "quantity"
            ]}

            rows={lowStock}

            />


            </CardContent>

            </Card>


            </Box>


       </Box>

    );

}



export default ProductAnalytics;