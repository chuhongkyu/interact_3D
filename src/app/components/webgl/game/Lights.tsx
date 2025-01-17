function Lights() {
    return (
        <>
            <directionalLight
                castShadow
                intensity={2}
                shadow-bias={0}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-mapSize-height={2048}
                shadow-mapSize-width={2048}
                position={[3, 8, -8]}
                color="#fff"
            />
            <ambientLight intensity={1.4}/>
        </>
    )
}

export default Lights