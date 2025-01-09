function Lights() {
    return (
        <>
            <directionalLight
                castShadow
                intensity={2}
                shadow-bias={-0.001}
                shadow-camera-top={30}
                shadow-camera-bottom={-30}
                shadow-camera-left={-30}
                shadow-camera-right={30}
                shadow-mapSize-height={2048}
                shadow-mapSize-width={2048}
                position={[5, 5, 5]}
                color="#fff"
            />
            <ambientLight intensity={1}/>
        </>
    )
}

export default Lights