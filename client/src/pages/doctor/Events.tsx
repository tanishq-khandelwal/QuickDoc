import { Button } from "@/components/ui/button";
import Layout from "@/Layout"
import { Navbar } from "@/Navbar";
import { CalendarPlus } from "lucide-react";

const Events=()=>{
    return(
        <Layout>
            <Navbar/>
        <div className="px-10 py-6 mt-14"> 
            <Button><CalendarPlus/>Add Events</Button>
        </div>
        </Layout>
    )
}

export default Events;