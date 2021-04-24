// Creating reusable components for different sections on the website.

export const homeObjOne = {
    id: 'about',
    lightBg: false,
    lightText: true,
    lightTextDesc: true,
    topLine: 'Wrist Index',
    headline: 'Visualizing Wrist Data',
    description: 'Access to the tool that allows users to input data and see the Visualizing',
    buttonLabel: 'Get Started',
    // imgStart defines the position of the images in different section (left or right) True sets
    // the image to the left of the text and false to the right
    imgStart: true, 
img: require('../../images/img3.svg').default,
    alt: 'Bg',
    dark: true,
    primary: true,
    darkText: false
};

export const homeObjTwo = {
    id: 'discover',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Tool',
    headline: 'Revisions',
    description: 'The tool includes: the comparison of pronation and supination strength measurements as individual data points, the ability to enter up to three sets of data to allow for comparison over time, creating a mean of items for the PSFS score',
    buttonLabel: 'Learn More',
    imgStart: false,
img: require('../../images/img4.svg').default,
    alt: 'discover',
    dark: false,
    primary: false,
    darkText: true,
     
};

export const homeObjThree = {
    id: 'signup',
    lightBg: true,
    lightText: false,
    lightTextDesc: false,
    topLine: 'Wrist Index',
    headline: 'Visualizing Wrist Data',
    description: 'Access to the tool that allows users to input data and see the Visualizing',
    buttonLabel: 'More Information',
    imgStart: false,
img: require('../../images/img5.svg').default,
    alt: 'signup',
    dark: false,
    primary: false,
    darkText: true
};