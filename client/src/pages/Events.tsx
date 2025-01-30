import { Button } from "@/components/ui/button";
import Layout from "@/Layout"
import { CalendarPlus } from "lucide-react";

const Events=()=>{
    return(
        <Layout>
        <div className="px-10 py-6"> 
            <Button><CalendarPlus/>Add Events</Button>
        </div>
        </Layout>
    )
}

export default Events;