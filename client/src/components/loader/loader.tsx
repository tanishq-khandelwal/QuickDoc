import { Loader} from "lucide-react";

const Loading=()=>{
    return(
        <div className="h-full items-center text-center">
            <Loader className="w-6 h-6 animate-spin text-muted-foreground"/>
        </div>
    )
}

export default Loading;