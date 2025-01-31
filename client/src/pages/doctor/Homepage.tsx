
import Layout from "@/Layout"
import { Navbar } from "@/Navbar";

const Homepage=()=>{

    return(
        <Layout>
            <Navbar/>
            <div className="mt-16">
                This is the homepage
            </div>
        </Layout>
    )
}

export default Homepage;