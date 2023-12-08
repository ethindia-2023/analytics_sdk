import { useEffect } from "react";

function TrackableComponent({ element }) {
    useEffect(() => {
        console.log("AnalRoute");
        console.log(element);
        // setup function
        return () => {
            // cleanup function
        }
    }, [
        //props
        element
    ]);

    return (
        element
    );
}

export default TrackableComponent;