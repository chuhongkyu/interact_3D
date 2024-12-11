"use client"

import React, { useEffect, useState } from 'react'
import TextWrapper from '../TextWrapper'
import { useIntroStore } from '@/app/store/useIntroStore'
import IntroCustomContainer from './IntroCustomContainer'

function IntroViewContainer() {
    const { mode } = useIntroStore()
    return (
        <>
            <TextWrapper/>
            {mode === "CUSTOM" && <IntroCustomContainer/>}
        </>
    )
}

export default IntroViewContainer