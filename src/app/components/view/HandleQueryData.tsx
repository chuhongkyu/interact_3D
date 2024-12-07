"use client"

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryDataStore } from "@/app/store/useQueryData";

function HandleQueryData() {
    const { career } = useQueryDataStore();
    const searchParams = useSearchParams();

    // useEffect(() => {
    //     const careerParam = searchParams.get("career");
    //     if (careerParam && careerParam !== career) {
    //         setCareer(careerParam);
    //     }
    // }, [searchParams, setCareer]);

    function updateSorting(career: string) {
        const params = new URLSearchParams(searchParams.toString())
        params.set("career", career)
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    useEffect(() => {
        updateSorting(career)
    }, [career]);

    return null;
}

export default HandleQueryData;
