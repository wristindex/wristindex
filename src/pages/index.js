import React, {useState} from 'react';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import Info from '../components/Info';
import { homeObjOne, homeObjThree, homeObjTwo } from '../components/Info/Data';
import Navbar from '../components/Navbar'
import Services from '../components/Services';
import Sidebar from '../components/Sidebar'

const Home = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <HeroSection />
            <Info {...homeObjOne}/>
            <Info {...homeObjTwo}/>
            <Services />
            <Info {...homeObjThree}/>
            <Footer />
        </>
    );
};

export default Home
