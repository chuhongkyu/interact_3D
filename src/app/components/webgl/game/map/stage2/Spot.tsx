import SpotFloor from "../../common/SpotFloor"

function Spot(props: JSX.IntrinsicElements["group"]) {
    return (
        <group {...props} dispose={null}>
            <SpotFloor/>
        </group>
    )
}

export default Spot