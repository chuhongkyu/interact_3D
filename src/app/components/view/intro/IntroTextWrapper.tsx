"use client"

import React from 'react'
import TextWrapper from '../TextWrapper'
import { introTexts } from '@/app/utils/textData'
import { useIntroStore } from '@/app/store/useIntroStore'

function IntroTextWrapper() {
    const { introStart, setTextOrder } = useIntroStore()
    return (
        <TextWrapper text={introTexts} start={introStart} cb={()=> setTextOrder(1)}/>
    )
}

export default IntroTextWrapper