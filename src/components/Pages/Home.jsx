import React from 'react';
import Popular from '../Popular';
import Veggie from '../Veggie';
import {motion} from 'framer-motion'
const Home = () => {

    return (
        <motion.div
        animate={{opacity: 1}}
        intial={{opacity:0}}
        exit={{opacity:0}}
        transition={{duration:0.5}}
        >
            <Veggie></Veggie>
            <Popular></Popular>
        </motion.div>
    );
};

export default Home;