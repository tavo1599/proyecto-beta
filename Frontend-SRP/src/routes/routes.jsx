import App from "../App"
import Home from "../Pages/home/Home"
import Package from "../package/Package"
import Reservas from "../Reservas/Reservas"
import FormaPago from "../formapago/Formapago"
import Dashboard from "../dashboard/dashboard"
import Estado from "../estados/estado"

const routes = [
    {
        path: "/",
        element: <App />
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "start",
                element: <Home />
            },
            {
                path: "package",
                element: <Package />
            },
            {
                path: "reservas",
                element: <Reservas />
            },
            {
                path: "formapago",
                element: <FormaPago />
            },
            {
                path: "estado",
                element: <Estado />
            },
            {
                path: "loro",
                element: <div>hOME</div>
            }
        ]
    }
]

export default routes