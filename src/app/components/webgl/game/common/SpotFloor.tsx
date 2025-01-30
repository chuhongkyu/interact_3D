import { useTexture } from "@react-three/drei";

function SpotFloor({textureUrl = "/assets/textures/spot1.jpg"}:{textureUrl?:string}) {
    const texture = useTexture(textureUrl);
    return (
        <mesh receiveShadow position={[0,-0.04,0]} rotation={[-Math.PI/2,0,0]}>
            <planeGeometry args={[6, 6]}/>
            <meshStandardMaterial map={texture} transparent opacity={0.6}/>
        </mesh>
    )
}

export default SpotFloor