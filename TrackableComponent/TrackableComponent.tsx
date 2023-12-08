import { useEffect } from "react";

interface RequireType {
    element: JSX.Element;
}

function TrackableComponent({element}: RequireType): JSX.Element {
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