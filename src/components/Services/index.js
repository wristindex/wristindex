import React from 'react'
import Icon1 from '../../images/img5.svg'
import Icon2 from '../../images/img6.svg'
import Icon3 from '../../images/img7.svg'
import {ServicesContainer,ServicesH1,
    ServicesWrapper,ServicesCard,ServicesIcon,
    ServicesH2, ServicesP
} from './ServicesElements'


const Services = () => {
    return (
        <ServicesContainer id="services">
            <ServicesH1>Our Services</ServicesH1>
            <ServicesWrapper>
                <ServicesCard>
                    <ServicesIcon src={Icon1}/>
                    <ServicesH2>Check Tool</ServicesH2>
                    <ServicesP>Trial Tool</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                    <ServicesH2>Feedback</ServicesH2>
                    <ServicesP>Provide Feedback</ServicesP>
                </ServicesCard>
                <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                    <ServicesH2>Contactl</ServicesH2>
                    <ServicesP>Contact Us</ServicesP>
                </ServicesCard>
            </ServicesWrapper>
            
        </ServicesContainer>
    )
}

export default Services
