import SpotFloor from "../../common/SpotFloor"
import { Box } from "../Box"
import { Tool } from "./Tool"

function Spot(props: JSX.IntrinsicElements["group"]) {
    return (
        <group {...props} dispose={null}>
            <Box position={[-2.5,0.5,2]}/>
            <Box position={[-1.5,0.5,2]}/>
            <Box position={[0,0.5,2]}/>
            <Box position={[1,0.5,2]}/>
            <Box position={[2.5,0.5,2]}/>
            <SpotFloor/>
            <Tool rotation={[Math.PI/2,-0.25,0]} position={[-1,0,-1]} />
        </group>
    )
}

export default Spot