import React from 'react'
import {animateScroll as scroll} from 'react-scroll';
import {FooterContainer, FooterWrap, FooterLinksContainer, FooterLinksWrapper,
FooterLinkItems, FooterLinkTitle, FooterLink, SocialMedia,
SocialMediaWrap, SocialLogo, WebsiteRights} from './FooterElements'


const Footer = () => {
    const toggleHome = () => {
        scroll.scrollToTop();
    };
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>About Us</FooterLinkTitle>
                                <FooterLink to="/signin"> How it Works </FooterLink>
                                <FooterLink to="/signin"> Feedback </FooterLink>
                                <FooterLink to="/signin"> More Info </FooterLink>
                                <FooterLink to="/signin"> Terms of Service </FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                            <FooterLinkTitle>Contact Us</FooterLinkTitle>
                                <FooterLink to="/signin">Contact</FooterLink>
                                <FooterLink to="/signin"> Support </FooterLink>
                                
                            </FooterLinkItems>
                    </FooterLinksWrapper>

                </FooterLinksContainer>
                <SocialMedia>
                <SocialMediaWrap>
                    <SocialLogo to='/' onClick= {toggleHome}>WristIndex</SocialLogo>
                    <WebsiteRights>WristIndex © {new Date().getFullYear()}
                    All Rights reserved</WebsiteRights>
                </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
            
        </FooterContainer>
    )
}

export default Footer
