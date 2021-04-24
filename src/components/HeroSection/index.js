import React, {useState} from 'react'
// import { FaArrowRight } from 'react-icons/fa'
import Video from '../../videos/video1.mp4'
import { Button } from '../ButtonElement';
import {HeroContainer, HeroBg, VideoBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper,  ArrowForward, ArrowRight } from './HeroElements'


const HeroSection = () => {
const [hover, setHover] = useState(false)

const onHover = () => {
    setHover(!hover)
}

    return (
        <HeroContainer id='home'>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />

            </HeroBg>
            <HeroContent>
                <HeroH1>Consensus Wrist Index Assessment Tool</HeroH1>
                <HeroP>
                    Tool to assess wrist movement
                {/* The tool was created using patient rated outcome measures (PROMs), objective tests, basic
                set of measures and a general concept for combining these that could be clinically utilized. */}
                </HeroP>
                <HeroBtnWrapper>
                    <Button to="signup" onMouseEnter = {onHover}
                    onMouseLeave={onHover}
                    primary = "true"
                    dark = "true"
                    smooth={true}
                    duration={600} 
                    spy={true}
                    exact='true'
                    offset={-80}>
                        Request Tool {hover ? <ArrowForward /> : <ArrowRight />} 
                        </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer >
    )
}

export default HeroSection
